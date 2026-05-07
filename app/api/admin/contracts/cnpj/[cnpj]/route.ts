import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../lib/auth";
import { fetchCnpjData, isValidCnpj, onlyDigits } from "../../../../../../lib/contracts/cnpj";

type Params = { params: Promise<{ cnpj: string }> };

/**
 * GET /api/admin/contracts/cnpj/:cnpj
 * Proxy para BrasilAPI — autopreenchimento do formulário a partir de CNPJ.
 * Faz cache pela borda (BrasilAPI já retorna ETag).
 */
export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { cnpj } = await params;
  const d = onlyDigits(cnpj);
  if (!isValidCnpj(d)) {
    return NextResponse.json({ error: "CNPJ inválido" }, { status: 400 });
  }

  const data = await fetchCnpjData(d);
  if (!data) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }

  return NextResponse.json(data);
}
