import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { db } from "../../../../../../db";
import { cardTemplates, cardTemplateMedia } from "../../../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_PER_TEMPLATE = 6;
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const templateId = Number.parseInt(params.id, 10);
  if (!Number.isFinite(templateId) || templateId <= 0)
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const [exists] = await db
    .select({ id: cardTemplates.id })
    .from(cardTemplates)
    .where(eq(cardTemplates.id, templateId))
    .limit(1);
  if (!exists) return NextResponse.json({ error: "Modelo não encontrado" }, { status: 404 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Esperado multipart/form-data" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return NextResponse.json({ error: "Nenhum arquivo" }, { status: 400 });

  const [{ maxPos, count } = { maxPos: -1, count: 0 }] = await db
    .select({
      maxPos: cardTemplateMedia.position,
      count: cardTemplateMedia.id,
    })
    .from(cardTemplateMedia)
    .where(eq(cardTemplateMedia.templateId, templateId))
    .orderBy(desc(cardTemplateMedia.position))
    .limit(1);

  // count via separate query for accuracy
  const existing = await db
    .select({ id: cardTemplateMedia.id })
    .from(cardTemplateMedia)
    .where(eq(cardTemplateMedia.templateId, templateId));
  if (existing.length + files.length > MAX_PER_TEMPLATE) {
    return NextResponse.json(
      { error: `Máximo de ${MAX_PER_TEMPLATE} imagens por modelo` },
      { status: 400 }
    );
  }

  for (const f of files) {
    if (!ALLOWED_MIME.has(f.type))
      return NextResponse.json({ error: `Tipo não suportado: ${f.type}` }, { status: 400 });
    if (f.size > MAX_FILE_BYTES)
      return NextResponse.json({ error: `${f.name} excede 5 MB` }, { status: 400 });
  }

  void count; // silence unused
  let nextPos = (maxPos ?? -1) + 1;
  const inserted: { id: number }[] = [];
  for (const f of files) {
    const buf = Buffer.from(await f.arrayBuffer());
    const [row] = await db
      .insert(cardTemplateMedia)
      .values({
        templateId,
        position: nextPos++,
        fileName: f.name || `imagem-${nextPos}.png`,
        mimeType: f.type,
        sizeBytes: buf.length,
        bytes: buf,
      })
      .returning({ id: cardTemplateMedia.id });
    if (row) inserted.push(row);
  }

  await db
    .update(cardTemplates)
    .set({ updatedAt: new Date() })
    .where(eq(cardTemplates.id, templateId));

  return NextResponse.json({ ok: true, inserted: inserted.map((r) => r.id) });
}
