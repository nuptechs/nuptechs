import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../lib/auth";
import { getContainer } from "../../../../../lib/core/container";

/**
 * GET /api/admin/contracts/systems
 * Lista os sistemas SaaS disponíveis (catálogo).
 */
export async function GET(_request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { contracts } = getContainer();
  const items = await contracts.listSystems(true);
  return NextResponse.json({ items });
}
