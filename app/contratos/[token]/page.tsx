import { redirect } from "next/navigation";

/**
 * Visualização pública: redireciona para o endpoint que serve o HTML standalone
 * do contrato (sem layout do site, otimizado para impressão A4).
 */
export default async function PublicContractPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  redirect(`/api/contratos/${token}`);
}
