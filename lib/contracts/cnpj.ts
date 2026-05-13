/**
 * Utilitários de CNPJ — validação de checksum, formatação e lookup BrasilAPI.
 */

/** Remove tudo que não é dígito. */
export function onlyDigits(s: string): string {
  return (s || "").replace(/\D+/g, "");
}

/** Formata um CNPJ "12345678000190" como "12.345.678/0001-90". */
export function formatCnpj(cnpj: string): string {
  const d = onlyDigits(cnpj);
  if (d.length !== 14) return cnpj;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

/** Formata um CPF "12345678901" como "123.456.789-01". */
export function formatCpf(cpf: string): string {
  const d = onlyDigits(cpf);
  if (d.length !== 11) return cpf;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** Formata CEP "70790050" → "70.790-050". */
export function formatCep(cep: string): string {
  const d = onlyDigits(cep);
  if (d.length !== 8) return cep;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

/** Valida o checksum oficial de um CNPJ (14 dígitos). */
export function isValidCnpj(cnpj: string): boolean {
  const d = onlyDigits(cnpj);
  if (d.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(d)) return false; // todos iguais

  const calcDigit = (slice: string, factors: number[]): number => {
    const sum = slice
      .split("")
      .reduce((acc, ch, i) => acc + Number(ch) * factors[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const f1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const f2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const dig1 = calcDigit(d.slice(0, 12), f1);
  if (dig1 !== Number(d[12])) return false;
  const dig2 = calcDigit(d.slice(0, 13), f2);
  return dig2 === Number(d[13]);
}

/** Valida o checksum oficial de um CPF (11 dígitos). */
export function isValidCpf(cpf: string): boolean {
  const d = onlyDigits(cpf);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;

  const calcDigit = (slice: string, start: number): number => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += Number(slice[i]) * (start - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  const dig1 = calcDigit(d.slice(0, 9), 10);
  if (dig1 !== Number(d[9])) return false;
  const dig2 = calcDigit(d.slice(0, 10), 11);
  return dig2 === Number(d[10]);
}

/** Resposta da BrasilAPI (subset usado). */
export type BrasilApiCnpj = {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  natureza_juridica: string;
  cnae_fiscal_descricao: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  email: string | null;
  ddd_telefone_1: string;
  descricao_situacao_cadastral: string;
  qsa: Array<{
    nome_socio: string;
    qualificacao_socio: string;
  }>;
};

async function tryBrasilApi(d: string): Promise<BrasilApiCnpj | null> {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${d}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    return (await res.json()) as BrasilApiCnpj;
  } catch {
    return null;
  }
}

async function tryOpenCnpj(d: string): Promise<BrasilApiCnpj | null> {
  try {
    const res = await fetch(`https://api.opencnpj.org/${d}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.cnpj) return null;
    return {
      cnpj: data.cnpj,
      razao_social: data.razao_social || "",
      nome_fantasia: data.nome_fantasia || "",
      natureza_juridica: data.natureza_juridica || "",
      cnae_fiscal_descricao: "", // OpenCNPJ retorna apenas o código, não a descrição
      logradouro: data.logradouro || "",
      numero: data.numero || "",
      complemento: data.complemento || "",
      bairro: data.bairro || "",
      municipio: data.municipio || "",
      uf: data.uf || "",
      cep: (data.cep || "").replace(/\D/g, ""),
      email: data.email || null,
      ddd_telefone_1: data.telefones?.[0]
        ? `${data.telefones[0].ddd}${data.telefones[0].numero}`
        : "",
      descricao_situacao_cadastral: data.situacao_cadastral || "",
      qsa: Array.isArray(data.QSA)
        ? data.QSA.map((s: { nome_socio?: string; qualificacao_socio?: string }) => ({
            nome_socio: s.nome_socio || "",
            qualificacao_socio: s.qualificacao_socio || "",
          }))
        : [],
    };
  } catch {
    return null;
  }
}

async function tryReceitaWs(d: string): Promise<BrasilApiCnpj | null> {
  try {
    const res = await fetch(`https://receitaws.com.br/v1/cnpj/${d}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.status === "ERROR" || !data?.cnpj) return null;
    return {
      cnpj: (data.cnpj || "").replace(/\D/g, ""),
      razao_social: data.nome || "",
      nome_fantasia: data.fantasia || "",
      natureza_juridica: data.natureza_juridica || "",
      cnae_fiscal_descricao: data.atividade_principal?.[0]?.text || "",
      logradouro: data.logradouro || "",
      numero: data.numero || "",
      complemento: data.complemento || "",
      bairro: data.bairro || "",
      municipio: data.municipio || "",
      uf: data.uf || "",
      cep: (data.cep || "").replace(/\D/g, ""),
      email: data.email || null,
      ddd_telefone_1: (data.telefone || "").replace(/\D/g, ""),
      descricao_situacao_cadastral: data.situacao || "",
      qsa: Array.isArray(data.qsa)
        ? data.qsa.map((s: { nome?: string; qual?: string }) => ({
            nome_socio: s.nome || "",
            qualificacao_socio: s.qual || "",
          }))
        : [],
    };
  } catch {
    return null;
  }
}

/**
 * Busca dados de um CNPJ com fallback em cascata:
 * BrasilAPI v1 → OpenCNPJ → ReceitaWS.
 * Retorna sempre no shape do BrasilAPI v1; os outros são normalizados.
 */
export async function fetchCnpjData(cnpj: string): Promise<BrasilApiCnpj | null> {
  const d = onlyDigits(cnpj);
  if (!isValidCnpj(d)) return null;
  return (
    (await tryBrasilApi(d)) ??
    (await tryOpenCnpj(d)) ??
    (await tryReceitaWs(d))
  );
}
