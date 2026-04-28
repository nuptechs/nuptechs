import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { cardTemplates } from "../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public endpoint — admin preview + (potential future) public sharing.
// Returns 404 when template has no photo configured.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const [row] = await db
    .select({
      bytes: cardTemplates.contactPhotoBytes,
      mime: cardTemplates.contactPhotoMime,
      updatedAt: cardTemplates.updatedAt,
    })
    .from(cardTemplates)
    .where(eq(cardTemplates.id, id))
    .limit(1);

  if (!row || !row.bytes || !row.mime) {
    return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 });
  }

  const buf: Buffer = Buffer.isBuffer(row.bytes) ? row.bytes : Buffer.from(row.bytes);

  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": row.mime,
      "Content-Length": String(buf.length),
      "Cache-Control": "public, max-age=300",
    },
  });
}
