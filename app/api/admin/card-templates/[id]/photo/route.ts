import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { db } from "../../../../../../db";
import { cardTemplates } from "../../../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_PHOTO_MIME = new Set(["image/jpeg", "image/png"]);
const MAX_PHOTO_BYTES = 1024 * 1024;

async function guard() {
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

function parseId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Payload inválido (multipart/form-data)" }, { status: 400 });
  }

  const file = form.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Foto obrigatória" }, { status: 400 });
  }
  if (!ALLOWED_PHOTO_MIME.has(file.type)) {
    return NextResponse.json({ error: "Foto deve ser JPEG ou PNG" }, { status: 400 });
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return NextResponse.json({ error: "Foto excede 1 MB" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const updated = await db
    .update(cardTemplates)
    .set({ contactPhotoBytes: bytes, contactPhotoMime: file.type, updatedAt: new Date() })
    .where(eq(cardTemplates.id, id))
    .returning({ id: cardTemplates.id });

  if (updated.length === 0) {
    return NextResponse.json({ error: "Modelo não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const updated = await db
    .update(cardTemplates)
    .set({ contactPhotoBytes: null, contactPhotoMime: null, updatedAt: new Date() })
    .where(eq(cardTemplates.id, id))
    .returning({ id: cardTemplates.id });

  if (updated.length === 0) {
    return NextResponse.json({ error: "Modelo não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
