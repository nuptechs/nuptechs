import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../../db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const expected = process.env.EVOLUTION_WEBHOOK_TOKEN || "";
  const provided = req.nextUrl.searchParams.get("token") || "";
  if (!expected || provided !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db.execute(sql`
      SELECT id, phone_prefix, status, error_message, message_ids, created_at, updated_at
      FROM card_shares ORDER BY id DESC LIMIT 10
    `);
    return NextResponse.json({ ok: true, rows });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown" },
      { status: 500 }
    );
  }
}
