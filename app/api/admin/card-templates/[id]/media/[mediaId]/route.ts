import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getSession, hasPermission } from "../../../../../../../lib/auth";
import { db } from "../../../../../../../db";
import { cardTemplates, cardTemplateMedia } from "../../../../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; mediaId: string } }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const templateId = Number.parseInt(params.id, 10);
  const mediaId = Number.parseInt(params.mediaId, 10);
  if (!Number.isFinite(templateId) || !Number.isFinite(mediaId))
    return NextResponse.json({ error: "IDs inválidos" }, { status: 400 });

  const deleted = await db
    .delete(cardTemplateMedia)
    .where(
      and(
        eq(cardTemplateMedia.templateId, templateId),
        eq(cardTemplateMedia.id, mediaId)
      )
    )
    .returning({ id: cardTemplateMedia.id });

  if (deleted.length === 0)
    return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });

  await db
    .update(cardTemplates)
    .set({ updatedAt: new Date() })
    .where(eq(cardTemplates.id, templateId));

  return NextResponse.json({ ok: true });
}
