import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession, hasPermission } from "../../../../../lib/auth";
import { db } from "../../../../../db";
import { cardTemplates } from "../../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    caption?: string;
    includeContact?: boolean;
    contactName?: string | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
    contactOrg?: string | null;
  };

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.name === "string") {
    const trimmed = body.name.trim();
    if (!trimmed) return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
    if (trimmed.length > 80) return NextResponse.json({ error: "Nome muito longo" }, { status: 400 });
    updates.name = trimmed;
  }
  if (typeof body.caption === "string") {
    if (body.caption.length > 2000)
      return NextResponse.json({ error: "Mensagem muito longa" }, { status: 400 });
    updates.caption = body.caption;
  }
  if (typeof body.includeContact === "boolean") {
    updates.includeContact = body.includeContact;
  }
  for (const [col, label, raw] of [
    ["contactName", "Nome do contato", body.contactName],
    ["contactPhone", "Telefone do contato", body.contactPhone],
    ["contactEmail", "E-mail do contato", body.contactEmail],
    ["contactOrg", "Empresa do contato", body.contactOrg],
  ] as const) {
    if (raw === undefined) continue;
    if (raw === null) {
      updates[col] = null;
      continue;
    }
    const trimmed = String(raw).trim();
    if (trimmed.length > 120)
      return NextResponse.json({ error: `${label} muito longo` }, { status: 400 });
    updates[col] = trimmed || null;
  }

  const updated = await db
    .update(cardTemplates)
    .set(updates)
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

  const deleted = await db
    .delete(cardTemplates)
    .where(eq(cardTemplates.id, id))
    .returning({ id: cardTemplates.id });

  if (deleted.length === 0) {
    return NextResponse.json({ error: "Modelo não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
