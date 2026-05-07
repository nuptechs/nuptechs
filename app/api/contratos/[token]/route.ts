import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getContainer } from "../../../../lib/core/container";
import { renderContractHtml } from "../../../../lib/contracts/contract-template";

type Params = { params: Promise<{ token: string }> };

/**
 * GET /api/contratos/:token
 * Endpoint público que retorna o HTML do contrato pelo token compartilhável.
 * Sem autenticação — token é o segredo.
 */
export async function GET(_request: NextRequest, { params }: Params) {
  const { token } = await params;

  if (!token || token.length < 16) {
    return new NextResponse("Token inválido", { status: 400 });
  }

  const { contracts } = getContainer();
  const contract = await contracts.findByToken(token);
  if (!contract) {
    return new NextResponse("Contrato não encontrado", { status: 404 });
  }

  // Bloqueia visualização pública de contratos cancelados
  if (contract.status === "cancelled") {
    return new NextResponse("Contrato indisponível", { status: 410 });
  }

  const systems = await contracts.listSystems(false);

  // Registra evento de visualização (fire-and-forget)
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0] ||
    hdrs.get("x-real-ip") ||
    "unknown";
  const userAgent = hdrs.get("user-agent") || "unknown";
  contracts
    .addTimelineEntry({
      contractId: contract.id,
      action: "viewed",
      detail: `Visualização pública (${ip})`,
      performedBy: "client",
      performedByName: null,
      metadata: { ip, userAgent },
    })
    .catch(() => {});

  // Promove status draft → sent automaticamente quando o cliente acessa
  if (contract.status === "draft") {
    contracts
      .updateStatus(contract.id, "sent", "system", "Sistema")
      .catch(() => {});
  }

  const html = renderContractHtml(contract, systems, {
    draft: contract.status === "draft",
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
