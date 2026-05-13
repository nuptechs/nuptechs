import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { fetchCepData, isValidCep } from "../../../../../../lib/contracts/cep";

type Params = { params: Promise<{ cep: string }> };

/**
 * GET /api/admin/contracts/cep/:cep
 * Proxy server-side para consulta de CEP — necessário porque o CSP
 * do site bloqueia chamadas diretas do navegador para hosts externos.
 * Tenta BrasilAPI v2 (multi-provedor) e cai para ViaCEP em caso de falha.
 */
export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { cep } = await params;
  if (!isValidCep(cep)) {
    return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
  }

  const data = await fetchCepData(cep);
  if (!data) {
    return NextResponse.json({ error: "CEP não encontrado" }, { status: 404 });
  }

  return NextResponse.json(data);
}
