import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { cardTemplateMedia } from "../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public endpoint — Evolution API fetches the image from here by URL when
// sending `sendMedia`. IDs are sequential integers (not a secret), but the
// content is promotional material intended to be broadly shared.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const [row] = await db
    .select({
      mimeType: cardTemplateMedia.mimeType,
      bytes: cardTemplateMedia.bytes,
      fileName: cardTemplateMedia.fileName,
    })
    .from(cardTemplateMedia)
    .where(eq(cardTemplateMedia.id, id))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });
  }

  // Ensure we have a Node Buffer for Response body.
  const buf: Buffer = Buffer.isBuffer(row.bytes) ? row.bytes : Buffer.from(row.bytes);

  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": row.mimeType || "application/octet-stream",
      "Content-Length": String(buf.length),
      "Content-Disposition": `inline; filename="${row.fileName.replace(/"/g, "")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
