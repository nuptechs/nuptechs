import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";
import type { LeadStatus } from "../../../../lib/core/ports/lead.port";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as LeadStatus | null;
  const search = searchParams.get("search") || undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { leads } = getContainer();
  const [items, total, stats] = await Promise.all([
    leads.findAll({ status: status || undefined, search }, limit, offset),
    leads.count({ status: status || undefined, search }),
    leads.getStats(),
  ]);

  return NextResponse.json({ items, total, stats });
}
