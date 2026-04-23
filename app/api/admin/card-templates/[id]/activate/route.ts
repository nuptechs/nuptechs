import { NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { activateTemplate } from "../../../../../../lib/card-templates";
import { db } from "../../../../../../db";
import { cardTemplates } from "../../../../../../db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id) || id <= 0)
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const [exists] = await db
    .select({ id: cardTemplates.id })
    .from(cardTemplates)
    .where(eq(cardTemplates.id, id))
    .limit(1);
  if (!exists) return NextResponse.json({ error: "Modelo não encontrado" }, { status: 404 });

  await activateTemplate(id);
  return NextResponse.json({ ok: true, active: id });
}
