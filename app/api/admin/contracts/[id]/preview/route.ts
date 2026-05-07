import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { getContainer } from "../../../../../../lib/core/container";
import { renderContractHtml } from "../../../../../../lib/contracts/contract-template";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const { contracts } = getContainer();
  const [contract, systems] = await Promise.all([
    contracts.findById(idNum),
    contracts.listSystems(false),
  ]);
  if (!contract) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  const html = renderContractHtml(contract, systems, {
    draft: contract.status === "draft",
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
