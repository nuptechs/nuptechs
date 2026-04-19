import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = request.nextUrl;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { audit } = getContainer();
  const [items, total] = await Promise.all([
    audit.findAll(undefined, limit, offset),
    audit.count(),
  ]);

  return NextResponse.json({ items, total });
}
