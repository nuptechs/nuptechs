"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "../../components/AdminPageHeader";
import {
  Send,
  CheckCircle2,
  XCircle,
  Eye,
  Copy,
  FileDown,
  Trash2,
  Clock,
} from "lucide-react";

type Status =
  | "draft"
  | "sent"
  | "signed"
  | "active"
  | "cancelled"
  | "expired";

interface Contract {
  id: number;
  publicToken: string;
  status: Status;
  clientType: "pj" | "pf";
  clientName: string;
  clientFantasyName: string | null;
  clientDocument: string;
  clientEmail: string | null;
  clientPhone: string | null;
  clientAddress: string | null;
  clientCity: string | null;
  clientState: string | null;
  monthlyValueCents: number;
  paymentDay: number;
  loyaltyMonths: number;
  earlyTerminationFeeMonths: number;
  customizationDeadlineDays: number;
  systems: string[];
  customSystem: string | null;
  signedAt: string | null;
  startDate: string | null;
  loyaltyEndDate: string | null;
  createdAt: string;
  createdByName: string | null;
  notes: string | null;
}

interface TimelineEntry {
  id: number;
  action: string;
  detail: string | null;
  performedByName: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<Status, string> = {
  draft: "Rascunho",
  sent: "Enviado",
  signed: "Assinado",
  active: "Ativo",
  cancelled: "Cancelado",
  expired: "Expirado",
};

const STATUS_COLORS: Record<Status, string> = {
  draft: "#6b7280",
  sent: "#0ea5e9",
  signed: "#10b981",
  active: "#10b981",
  cancelled: "#ef4444",
  expired: "#f59e0b",
};

function brl(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/contracts/${id}`);
    if (res.ok) {
      const data = await res.json();
      setContract(data.contract);
      setTimeline(data.timeline || []);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (status: Status) => {
    setUpdating(true);
    await fetch(`/api/admin/contracts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(false);
    load();
  };

  const remove = async () => {
    if (!confirm("Excluir este contrato? Esta ação não pode ser desfeita.")) return;
    const res = await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/contratos");
  };

  const publicLink =
    typeof window !== "undefined" && contract
      ? `${window.location.origin}/contratos/${contract.publicToken}`
      : "";

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="admin-loading">Carregando…</div>;
  if (!contract) return <div className="admin-loading">Contrato não encontrado.</div>;

  return (
    <div>
      <AdminPageHeader
        title={contract.clientName}
        subtitle={
          contract.clientFantasyName
            ? `${contract.clientFantasyName} · #${contract.id}`
            : `Contrato #${contract.id}`
        }
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Contratos", href: "/admin/contratos" },
          { label: `#${contract.id}` },
        ]}
        actions={
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <a
              href={`/api/admin/contracts/${contract.id}/preview`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn"
            >
              <Eye size={16} strokeWidth={1.75} /> Pré-visualizar
            </a>
            <a
              href={`/api/admin/contracts/${contract.id}/preview`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn"
            >
              <FileDown size={16} strokeWidth={1.75} /> PDF
            </a>
          </div>
        }
      />

      {/* Status badge + ações de status */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          margin: "0.5rem 0 1rem 0",
        }}
      >
        <span
          className="admin-status-badge"
          style={{
            background: STATUS_COLORS[contract.status] + "20",
            color: STATUS_COLORS[contract.status],
            borderColor: STATUS_COLORS[contract.status] + "40",
            fontSize: 14,
            padding: "6px 12px",
          }}
        >
          {STATUS_LABELS[contract.status]}
        </span>
        {contract.status === "draft" && (
          <button
            onClick={() => changeStatus("sent")}
            className="admin-btn"
            disabled={updating}
          >
            <Send size={14} strokeWidth={1.75} /> Marcar como enviado
          </button>
        )}
        {(contract.status === "sent" || contract.status === "draft") && (
          <button
            onClick={() => changeStatus("signed")}
            className="admin-btn admin-btn-primary"
            disabled={updating}
          >
            <CheckCircle2 size={14} strokeWidth={1.75} /> Marcar como assinado
          </button>
        )}
        {contract.status !== "cancelled" && contract.status !== "signed" && (
          <button
            onClick={() => changeStatus("cancelled")}
            className="admin-btn"
            disabled={updating}
          >
            <XCircle size={14} strokeWidth={1.75} /> Cancelar
          </button>
        )}
        <button onClick={remove} className="admin-btn" style={{ color: "#dc2626" }}>
          <Trash2 size={14} strokeWidth={1.75} /> Excluir
        </button>
      </div>

      {/* Link público */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <h4 style={{ margin: 0, fontSize: 14 }}>Link público para o cliente</h4>
        <p
          style={{
            fontSize: 12,
            opacity: 0.7,
            margin: "4px 0 8px 0",
          }}
        >
          Envie esse link ao cliente por WhatsApp, e-mail ou outro canal. Ele
          poderá visualizar e imprimir/baixar em PDF.
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            value={publicLink}
            readOnly
            className="admin-input"
            style={{ flex: 1, fontFamily: "monospace", fontSize: 12 }}
            onFocus={(e) => e.currentTarget.select()}
          />
          <button onClick={copyLink} className="admin-btn">
            <Copy size={14} strokeWidth={1.75} />
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>

      {/* Resumo */}
      <div className="admin-grid" style={{ marginBottom: 16 }}>
        <div className="admin-card">
          <h4>Cliente</h4>
          <p>
            <b>{contract.clientName}</b>
            <br />
            {contract.clientFantasyName && (
              <>
                {contract.clientFantasyName}
                <br />
              </>
            )}
            {contract.clientType === "pj" ? "CNPJ" : "CPF"}: {contract.clientDocument}
            <br />
            {contract.clientEmail && (
              <>
                {contract.clientEmail}
                <br />
              </>
            )}
            {contract.clientPhone && contract.clientPhone}
          </p>
        </div>

        <div className="admin-card">
          <h4>Comercial</h4>
          <p>
            <b>{brl(contract.monthlyValueCents)}/mês</b>
            <br />
            Vencimento: dia {contract.paymentDay}
            <br />
            Fidelidade: {contract.loyaltyMonths} meses
            <br />
            Multa rescisória: {contract.earlyTerminationFeeMonths} mensalidades
          </p>
        </div>

        <div className="admin-card">
          <h4>Sistemas</h4>
          <p>
            {contract.systems.length > 0
              ? contract.systems.join(", ")
              : "—"}
            {contract.customSystem && (
              <>
                <br />
                + {contract.customSystem}
              </>
            )}
          </p>
        </div>

        <div className="admin-card">
          <h4>Datas</h4>
          <p>
            Criado: {new Date(contract.createdAt).toLocaleString("pt-BR")}
            <br />
            {contract.signedAt && (
              <>
                Assinado: {new Date(contract.signedAt).toLocaleDateString("pt-BR")}
                <br />
              </>
            )}
            {contract.loyaltyEndDate && (
              <>
                Fim fidelidade:{" "}
                {new Date(contract.loyaltyEndDate).toLocaleDateString("pt-BR")}
              </>
            )}
          </p>
        </div>
      </div>

      {contract.notes && (
        <div className="admin-card" style={{ marginBottom: 16 }}>
          <h4>Observações internas</h4>
          <p style={{ whiteSpace: "pre-wrap" }}>{contract.notes}</p>
        </div>
      )}

      {/* Timeline */}
      <div className="admin-card">
        <h4>Histórico</h4>
        <ul className="admin-timeline">
          {timeline.length === 0 && (
            <li style={{ opacity: 0.6 }}>Sem eventos registrados.</li>
          )}
          {timeline.map((t) => (
            <li key={t.id}>
              <Clock size={12} strokeWidth={1.75} />
              <div>
                <div>
                  <b>{t.action}</b>
                  {t.detail && ` — ${t.detail}`}
                </div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>
                  {new Date(t.createdAt).toLocaleString("pt-BR")}
                  {t.performedByName && ` · ${t.performedByName}`}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
