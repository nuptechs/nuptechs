/**
 * Lookup de CEP — proxy server-side para contornar CSP do navegador.
 * Tenta BrasilAPI v2 (combina ViaCEP/WideNet/Correios) e cai para ViaCEP
 * direto se a primeira falhar.
 */

export interface CepData {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  source: "brasilapi" | "viacep";
}

function onlyDigits(s: string): string {
  return (s || "").replace(/\D+/g, "");
}

export function isValidCep(cep: string): boolean {
  return onlyDigits(cep).length === 8;
}

async function tryBrasilApi(cep: string): Promise<CepData | null> {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
      next: { revalidate: 60 * 60 * 24 }, // 24h cache na borda
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.cep) return null;
    return {
      cep: data.cep,
      street: data.street || "",
      neighborhood: data.neighborhood || "",
      city: data.city || "",
      state: data.state || "",
      source: "brasilapi",
    };
  } catch {
    return null;
  }
}

async function tryViaCep(cep: string): Promise<CepData | null> {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.erro) return null;
    return {
      cep: (data.cep || "").replace(/\D/g, ""),
      street: data.logradouro || "",
      neighborhood: data.bairro || "",
      city: data.localidade || "",
      state: data.uf || "",
      source: "viacep",
    };
  } catch {
    return null;
  }
}

export async function fetchCepData(cep: string): Promise<CepData | null> {
  const d = onlyDigits(cep);
  if (d.length !== 8) return null;
  return (await tryBrasilApi(d)) ?? (await tryViaCep(d));
}
