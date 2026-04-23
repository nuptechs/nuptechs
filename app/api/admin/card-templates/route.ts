import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { getSession, hasPermission } from "../../../../lib/auth";
import { db } from "../../../../db";
import { cardTemplates, cardTemplateMedia } from "../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 6;
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const templates = await db
    .select({
      id: cardTemplates.id,
      name: cardTemplates.name,
      caption: cardTemplates.caption,
      includeContact: cardTemplates.includeContact,
      contactName: cardTemplates.contactName,
      contactPhone: cardTemplates.contactPhone,
      contactEmail: cardTemplates.contactEmail,
      contactOrg: cardTemplates.contactOrg,
      isActive: cardTemplates.isActive,
      createdAt: cardTemplates.createdAt,
      updatedAt: cardTemplates.updatedAt,
    })
    .from(cardTemplates)
    .orderBy(asc(cardTemplates.name));

  if (templates.length === 0) {
    return NextResponse.json({ templates: [] });
  }

  const media = await db
    .select({
      id: cardTemplateMedia.id,
      templateId: cardTemplateMedia.templateId,
      position: cardTemplateMedia.position,
      fileName: cardTemplateMedia.fileName,
      mimeType: cardTemplateMedia.mimeType,
      sizeBytes: cardTemplateMedia.sizeBytes,
    })
    .from(cardTemplateMedia)
    .orderBy(asc(cardTemplateMedia.templateId), asc(cardTemplateMedia.position), asc(cardTemplateMedia.id));

  const byTemplate = new Map<number, typeof media>();
  for (const m of media) {
    const arr = byTemplate.get(m.templateId) ?? [];
    arr.push(m);
    byTemplate.set(m.templateId, arr);
  }

  return NextResponse.json({
    templates: templates.map((t) => ({ ...t, media: byTemplate.get(t.id) ?? [] })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Payload inválido (esperado multipart/form-data)" }, { status: 400 });
  }

  const name = String(form.get("name") || "").trim();
  const caption = String(form.get("caption") || "");
  const includeContact = String(form.get("includeContact") || "true") !== "false";
  const contactName = (String(form.get("contactName") || "").trim() || null) as string | null;
  const contactPhone = (String(form.get("contactPhone") || "").trim() || null) as string | null;
  const contactEmail = (String(form.get("contactEmail") || "").trim() || null) as string | null;
  const contactOrg = (String(form.get("contactOrg") || "").trim() || null) as string | null;
  const activateNow = String(form.get("activate") || "false") === "true";

  if (!name) return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
  if (name.length > 80) return NextResponse.json({ error: "Nome muito longo" }, { status: 400 });
  if (caption.length > 2000)
    return NextResponse.json({ error: "Mensagem muito longa (máx 2000 caracteres)" }, { status: 400 });
  for (const [label, val] of [
    ["Nome do contato", contactName],
    ["Telefone do contato", contactPhone],
    ["E-mail do contato", contactEmail],
    ["Empresa do contato", contactOrg],
  ] as const) {
    if (val && val.length > 120)
      return NextResponse.json({ error: `${label} muito longo` }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Máximo de ${MAX_FILES} imagens por modelo` }, { status: 400 });
  }
  for (const f of files) {
    if (!ALLOWED_MIME.has(f.type)) {
      return NextResponse.json({ error: `Tipo de arquivo não suportado: ${f.type}` }, { status: 400 });
    }
    if (f.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: `${f.name} excede 5 MB` }, { status: 400 });
    }
  }

  const result = await db.transaction(async (tx) => {
    if (activateNow) {
      await tx
        .update(cardTemplates)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(cardTemplates.isActive, true));
    }
    const [tpl] = await tx
      .insert(cardTemplates)
      .values({
        name,
        caption,
        includeContact,
        contactName,
        contactPhone,
        contactEmail,
        contactOrg,
        isActive: activateNow,
        createdBy: session.user.sub,
      })
      .returning({ id: cardTemplates.id });

    if (!tpl) throw new Error("insert failed");

    for (let i = 0; i < files.length; i++) {
      const f = files[i]!;
      const buf = Buffer.from(await f.arrayBuffer());
      await tx.insert(cardTemplateMedia).values({
        templateId: tpl.id,
        position: i,
        fileName: f.name || `imagem-${i + 1}.png`,
        mimeType: f.type,
        sizeBytes: buf.length,
        bytes: buf,
      });
    }
    return tpl.id;
  });

  return NextResponse.json({ ok: true, id: result }, { status: 201 });
}
