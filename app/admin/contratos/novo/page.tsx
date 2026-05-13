"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "../../components/AdminPageHeader";
import { Save, Loader2, Search } from "lucide-react";

interface SystemItem {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

function digits(s: string): string {
  return (s || "").replace(/\D+/g, "");
}

function formatCnpjMask(d: string): string {
  const x = digits(d).slice(0, 14);
  if (x.length <= 2) return x;
  if (x.length <= 5) return `${x.slice(0, 2)}.${x.slice(2)}`;
  if (x.length <= 8) return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5)}`;
  if (x.length <= 12)
    return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)}/${x.slice(8)}`;
  return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)}/${x.slice(8, 12)}-${x.slice(12)}`;
}
function formatCpfMask(d: string): string {
  const x = digits(d).slice(0, 11);
  if (x.length <= 3) return x;
  if (x.length <= 6) return `${x.slice(0, 3)}.${x.slice(3)}`;
  if (x.length <= 9) return `${x.slice(0, 3)}.${x.slice(3, 6)}.${x.slice(6)}`;
  return `${x.slice(0, 3)}.${x.slice(3, 6)}.${x.slice(6, 9)}-${x.slice(9)}`;
}
function formatCepMask(d: string): string {
  const x = digits(d).slice(0, 8);
  if (x.length <= 5) return x;
  return `${x.slice(0, 5)}-${x.slice(5)}`;
}

function brlInputToCents(s: string): number {
  // "1.250,50" → 125050
  const onlyNums = s.replace(/[^\d,.]/g, "").replace(/\./g, "").replace(",", ".");
  const f = parseFloat(onlyNums || "0");
  return Math.round(f * 100);
}

function centsToBrlInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export default function NewContractPage() {
  const router = useRouter();

  const [systems, setSystems] = useState<SystemItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cnpjLoading, setCnpjLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepMessage, setCepMessage] = useState<
    { kind: "success" | "warning" | "error"; text: string } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    clientType: "pj" as "pj" | "pf",
    clientName: "",
    clientFantasyName: "",
    clientDocument: "",
    clientEmail: "",
    clientPhone: "",
    clientZip: "",
    clientAddress: "",
    clientNumber: "",
    clientComplement: "",
    clientNeighborhood: "",
    clientCity: "",
    clientState: "",
    representativeName: "",
    representativeRg: "",
    representativeCpf: "",
    representativeRole: "",
    selectedSystems: [] as string[],
    customSystem: "",
    monthlyValue: "", // ex: "1.500,00"
    paymentDay: 10,
    loyaltyMonths: 12,
    earlyTerminationFeeMonths: 3,
    customizationDeadlineDays: 7,
    notes: "",
  });

  useEffect(() => {
    fetch("/api/admin/contracts/systems")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.items) setSystems(data.items);
      });
  }, []);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSystem = (slug: string) => {
    setForm((f) => ({
      ...f,
      selectedSystems: f.selectedSystems.includes(slug)
        ? f.selectedSystems.filter((s) => s !== slug)
        : [...f.selectedSystems, slug],
    }));
  };

  const lookupCnpj = async () => {
    const d = digits(form.clientDocument);
    if (d.length !== 14) {
      setError("Informe um CNPJ válido com 14 dígitos.");
      return;
    }
    setCnpjLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contracts/cnpj/${d}`);
      if (!res.ok) {
        setError("CNPJ não encontrado na base oficial.");
        return;
      }
      const data = await res.json();
      setForm((f) => ({
        ...f,
        clientName: data.razao_social || f.clientName,
        clientFantasyName: data.nome_fantasia || f.clientFantasyName,
        clientAddress: data.logradouro || f.clientAddress,
        clientNumber: data.numero || f.clientNumber,
        clientComplement: data.complemento || f.clientComplement,
        clientNeighborhood: data.bairro || f.clientNeighborhood,
        clientCity: data.municipio || f.clientCity,
        clientState: data.uf || f.clientState,
        clientZip: data.cep || f.clientZip,
        representativeName:
          data.qsa?.[0]?.nome_socio || f.representativeName,
        representativeRole:
          data.qsa?.[0]?.qualificacao_socio || f.representativeRole,
      }));
    } catch {
      setError("Erro ao consultar CNPJ.");
    } finally {
      setCnpjLoading(false);
    }
  };

  const lookupCep = async () => {
    const d = digits(form.clientZip);
    if (d.length === 0) {
      setCepMessage(null);
      return;
    }
    if (d.length !== 8) {
      setCepMessage({ kind: "warning", text: "CEP deve ter 8 dígitos." });
      return;
    }
    setCepLoading(true);
    setCepMessage(null);
    try {
      // Proxy server-side em /api/admin/contracts/cep — chamada direta
      // ao BrasilAPI/ViaCEP é bloqueada pelo CSP do site (connect-src 'self').
      const res = await fetch(`/api/admin/contracts/cep/${d}`);
      if (res.status === 404) {
        setCepMessage({ kind: "warning", text: "CEP não encontrado." });
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setForm((f) => ({
        ...f,
        clientAddress: data.street || f.clientAddress,
        clientNeighborhood: data.neighborhood || f.clientNeighborhood,
        clientCity: data.city || f.clientCity,
        clientState: data.state || f.clientState,
      }));
      setCepMessage({
        kind: "success",
        text: "Endereço preenchido automaticamente.",
      });
    } catch {
      setCepMessage({
        kind: "error",
        text: "Erro ao consultar CEP. Preencha manualmente.",
      });
    } finally {
      setCepLoading(false);
    }
  };

  const submit = async () => {
    setError(null);

    if (!form.clientName.trim()) return setError("Razão social/nome obrigatório.");
    const docLen = digits(form.clientDocument).length;
    if (form.clientType === "pj" && docLen !== 14)
      return setError("CNPJ deve ter 14 dígitos.");
    if (form.clientType === "pf" && docLen !== 11)
      return setError("CPF deve ter 11 dígitos.");
    if (form.selectedSystems.length === 0 && !form.customSystem.trim())
      return setError("Selecione ao menos um sistema (ou descreva em 'Outro').");
    const cents = brlInputToCents(form.monthlyValue);
    if (cents <= 0) return setError("Informe o valor da mensalidade.");

    setLoading(true);
    try {
      const res = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientType: form.clientType,
          clientName: form.clientName.trim(),
          clientFantasyName: form.clientFantasyName.trim() || null,
          clientDocument: digits(form.clientDocument),
          clientEmail: form.clientEmail.trim() || null,
          clientPhone: form.clientPhone.trim() || null,
          clientAddress: form.clientAddress.trim() || null,
          clientNumber: form.clientNumber.trim() || null,
          clientComplement: form.clientComplement.trim() || null,
          clientNeighborhood: form.clientNeighborhood.trim() || null,
          clientCity: form.clientCity.trim() || null,
          clientState: form.clientState.trim() || null,
          clientZip: digits(form.clientZip) || null,
          representativeName: form.representativeName.trim() || null,
          representativeRg: form.representativeRg.trim() || null,
          representativeCpf: digits(form.representativeCpf) || null,
          representativeRole: form.representativeRole.trim() || null,
          systems: form.selectedSystems,
          customSystem: form.customSystem.trim() || null,
          monthlyValueCents: cents,
          paymentDay: Number(form.paymentDay),
          loyaltyMonths: Number(form.loyaltyMonths),
          earlyTerminationFeeMonths: Number(form.earlyTerminationFeeMonths),
          customizationDeadlineDays: Number(form.customizationDeadlineDays),
          notes: form.notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao criar contrato");
      }
      const created = await res.json();
      router.push(`/admin/contratos/${created.id}`);
    } catch (e: any) {
      setError(e.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const docMask =
    form.clientType === "pj" ? formatCnpjMask : formatCpfMask;

  return (
    <div>
      <AdminPageHeader
        title="Fechar contrato"
        subtitle="Preencha os dados do cliente, escolha os sistemas e o valor."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Contratos", href: "/admin/contratos" },
          { label: "Novo" },
        ]}
      />

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="contract-form">
        {/* ── 1. Tipo + Documento ───────────────────────── */}
        <section className="contract-section">
          <h3>1. Identificação da Contratante</h3>

          <div className="contract-row">
            <label>
              <span>Tipo</span>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label className="contract-radio">
                  <input
                    type="radio"
                    checked={form.clientType === "pj"}
                    onChange={() => update("clientType", "pj")}
                  />
                  Pessoa Jurídica (CNPJ)
                </label>
                <label className="contract-radio">
                  <input
                    type="radio"
                    checked={form.clientType === "pf"}
                    onChange={() => update("clientType", "pf")}
                  />
                  Pessoa Física (CPF)
                </label>
              </div>
            </label>
          </div>

          <div className="contract-row">
            <label className="contract-field" style={{ flex: 2 }}>
              <span>{form.clientType === "pj" ? "CNPJ" : "CPF"}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={docMask(form.clientDocument)}
                  onChange={(e) => update("clientDocument", e.target.value)}
                  placeholder={
                    form.clientType === "pj"
                      ? "00.000.000/0000-00"
                      : "000.000.000-00"
                  }
                  className="admin-input"
                />
                {form.clientType === "pj" && (
                  <button
                    type="button"
                    onClick={lookupCnpj}
                    disabled={cnpjLoading}
                    className="admin-btn"
                    title="Auto-preencher dados do CNPJ via Receita Federal"
                  >
                    {cnpjLoading ? (
                      <Loader2 size={16} className="spin" strokeWidth={1.75} />
                    ) : (
                      <Search size={16} strokeWidth={1.75} />
                    )}
                    Buscar
                  </button>
                )}
              </div>
            </label>
          </div>

          <div className="contract-row">
            <label className="contract-field" style={{ flex: 2 }}>
              <span>{form.clientType === "pj" ? "Razão social" : "Nome completo"} *</span>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                className="admin-input"
              />
            </label>
            {form.clientType === "pj" && (
              <label className="contract-field">
                <span>Nome fantasia</span>
                <input
                  type="text"
                  value={form.clientFantasyName}
                  onChange={(e) =>
                    update("clientFantasyName", e.target.value)
                  }
                  className="admin-input"
                />
              </label>
            )}
          </div>

          <div className="contract-row">
            <label className="contract-field">
              <span>E-mail</span>
              <input
                type="email"
                value={form.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
                className="admin-input"
              />
            </label>
            <label className="contract-field">
              <span>Telefone</span>
              <input
                type="text"
                value={form.clientPhone}
                onChange={(e) => update("clientPhone", e.target.value)}
                className="admin-input"
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>
        </section>

        {/* ── 2. Endereço ───────────────────────────────── */}
        <section className="contract-section">
          <h3>2. Endereço</h3>
          <div className="contract-row">
            <label className="contract-field">
              <span>
                CEP
                {cepLoading && (
                  <Loader2
                    size={12}
                    className="spin"
                    strokeWidth={1.75}
                    style={{ marginLeft: 6, verticalAlign: "middle" }}
                  />
                )}
              </span>
              <input
                type="text"
                value={formatCepMask(form.clientZip)}
                onChange={(e) => {
                  update("clientZip", e.target.value);
                  if (cepMessage) setCepMessage(null);
                }}
                onBlur={lookupCep}
                disabled={cepLoading}
                className="admin-input"
                placeholder="00000-000"
                inputMode="numeric"
              />
              {cepMessage && (
                <span
                  style={{
                    fontSize: 11,
                    marginTop: 2,
                    color:
                      cepMessage.kind === "success"
                        ? "#10b981"
                        : cepMessage.kind === "warning"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                >
                  {cepMessage.text}
                </span>
              )}
            </label>
            <label className="contract-field" style={{ flex: 3 }}>
              <span>Logradouro</span>
              <input
                type="text"
                value={form.clientAddress}
                onChange={(e) => update("clientAddress", e.target.value)}
                className="admin-input"
              />
            </label>
            <label className="contract-field" style={{ flex: 1 }}>
              <span>Número</span>
              <input
                type="text"
                value={form.clientNumber}
                onChange={(e) => update("clientNumber", e.target.value)}
                className="admin-input"
              />
            </label>
          </div>
          <div className="contract-row">
            <label className="contract-field">
              <span>Complemento</span>
              <input
                type="text"
                value={form.clientComplement}
                onChange={(e) => update("clientComplement", e.target.value)}
                className="admin-input"
              />
            </label>
            <label className="contract-field">
              <span>Bairro</span>
              <input
                type="text"
                value={form.clientNeighborhood}
                onChange={(e) =>
                  update("clientNeighborhood", e.target.value)
                }
                className="admin-input"
              />
            </label>
            <label className="contract-field">
              <span>Cidade</span>
              <input
                type="text"
                value={form.clientCity}
                onChange={(e) => update("clientCity", e.target.value)}
                className="admin-input"
              />
            </label>
            <label className="contract-field" style={{ flex: 0.5 }}>
              <span>UF</span>
              <input
                type="text"
                value={form.clientState}
                maxLength={2}
                onChange={(e) =>
                  update("clientState", e.target.value.toUpperCase())
                }
                className="admin-input"
              />
            </label>
          </div>
        </section>

        {/* ── 3. Representante (PJ) ─────────────────────── */}
        {form.clientType === "pj" && (
          <section className="contract-section">
            <h3>3. Representante legal</h3>
            <div className="contract-row">
              <label className="contract-field" style={{ flex: 2 }}>
                <span>Nome completo</span>
                <input
                  type="text"
                  value={form.representativeName}
                  onChange={(e) =>
                    update("representativeName", e.target.value)
                  }
                  className="admin-input"
                />
              </label>
              <label className="contract-field">
                <span>Cargo</span>
                <input
                  type="text"
                  value={form.representativeRole}
                  onChange={(e) =>
                    update("representativeRole", e.target.value)
                  }
                  className="admin-input"
                  placeholder="Sócio, Diretor, ..."
                />
              </label>
            </div>
            <div className="contract-row">
              <label className="contract-field">
                <span>RG</span>
                <input
                  type="text"
                  value={form.representativeRg}
                  onChange={(e) => update("representativeRg", e.target.value)}
                  className="admin-input"
                />
              </label>
              <label className="contract-field">
                <span>CPF</span>
                <input
                  type="text"
                  value={formatCpfMask(form.representativeCpf)}
                  onChange={(e) =>
                    update("representativeCpf", e.target.value)
                  }
                  className="admin-input"
                  placeholder="000.000.000-00"
                />
              </label>
            </div>
          </section>
        )}

        {/* ── 4. Sistemas contratados ───────────────────── */}
        <section className="contract-section">
          <h3>{form.clientType === "pj" ? "4." : "3."} Sistemas contratados</h3>
          <p className="contract-help">
            Marque um ou mais sistemas que serão licenciados ao cliente.
          </p>
          <div className="contract-systems">
            {systems.length === 0 ? (
              <p className="contract-help">
                Nenhum sistema cadastrado ainda. Cadastre em
                /admin/settings/contract-systems.
              </p>
            ) : (
              systems.map((sys) => (
                <label
                  key={sys.slug}
                  className={`contract-system-card ${
                    form.selectedSystems.includes(sys.slug) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.selectedSystems.includes(sys.slug)}
                    onChange={() => toggleSystem(sys.slug)}
                  />
                  <div>
                    <div className="contract-system-name">{sys.name}</div>
                    {sys.description && (
                      <div className="contract-system-desc">
                        {sys.description}
                      </div>
                    )}
                  </div>
                </label>
              ))
            )}
          </div>
          <label className="contract-field" style={{ marginTop: 12 }}>
            <span>Outro sistema (descrever)</span>
            <input
              type="text"
              value={form.customSystem}
              onChange={(e) => update("customSystem", e.target.value)}
              className="admin-input"
              placeholder="Ex: Sistema customizado de gestão hospitalar"
            />
          </label>
        </section>

        {/* ── 5. Valores e prazos ───────────────────────── */}
        <section className="contract-section">
          <h3>{form.clientType === "pj" ? "5." : "4."} Valores e prazos</h3>
          <div className="contract-row">
            <label className="contract-field" style={{ flex: 2 }}>
              <span>Mensalidade (R$) *</span>
              <input
                type="text"
                inputMode="decimal"
                value={form.monthlyValue}
                onChange={(e) => update("monthlyValue", e.target.value)}
                className="admin-input"
                placeholder="0,00"
              />
            </label>
            <label className="contract-field">
              <span>Dia do vencimento</span>
              <input
                type="number"
                min={1}
                max={28}
                value={form.paymentDay}
                onChange={(e) => update("paymentDay", Number(e.target.value))}
                className="admin-input"
              />
            </label>
          </div>
          <div className="contract-row">
            <label className="contract-field">
              <span>Fidelidade (meses)</span>
              <input
                type="number"
                min={1}
                max={60}
                value={form.loyaltyMonths}
                onChange={(e) => update("loyaltyMonths", Number(e.target.value))}
                className="admin-input"
              />
            </label>
            <label className="contract-field">
              <span>Multa rescisória (mensalidades)</span>
              <input
                type="number"
                min={0}
                max={12}
                value={form.earlyTerminationFeeMonths}
                onChange={(e) =>
                  update("earlyTerminationFeeMonths", Number(e.target.value))
                }
                className="admin-input"
              />
            </label>
            <label className="contract-field">
              <span>Prazo de personalização (dias)</span>
              <input
                type="number"
                min={1}
                max={60}
                value={form.customizationDeadlineDays}
                onChange={(e) =>
                  update("customizationDeadlineDays", Number(e.target.value))
                }
                className="admin-input"
              />
            </label>
          </div>
        </section>

        {/* ── 6. Observações ────────────────────────────── */}
        <section className="contract-section">
          <h3>{form.clientType === "pj" ? "6." : "5."} Observações</h3>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="admin-input"
            placeholder="Anotações internas (não aparecem no contrato)"
          />
        </section>

        {/* ── Submit ───────────────────────────────────── */}
        <div className="contract-actions">
          <button
            type="button"
            onClick={() => router.back()}
            className="admin-btn admin-btn-ghost"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="admin-btn admin-btn-primary"
          >
            {loading ? (
              <Loader2 size={16} className="spin" strokeWidth={1.75} />
            ) : (
              <Save size={16} strokeWidth={1.75} />
            )}
            Gerar contrato
          </button>
        </div>
      </div>
    </div>
  );
}
