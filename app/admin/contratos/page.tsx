"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";
import { Plus, Search } from "lucide-react";

type ContractStatus =
  | "draft"
  | "sent"
  | "signed"
  | "active"
  | "cancelled"
  | "expired";

interface ContractItem {
  id: number;
  publicToken: string;
  status: ContractStatus;
  clientName: string;
  clientFantasyName: string | null;
  clientDocument: string;
  monthlyValueCents: number;
  createdAt: string;
  createdByName: string | null;
}

interface Stats {
  total: number;
  byStatus: Record<ContractStatus, number>;
  totalMonthlyRevenueCents: number;
  thisMonth: number;
}

const STATUS_LABELS: Record<ContractStatus | "all", string> = {
  all: "Todos",
  draft: "Rascunho",
  sent: "Enviado",
  signed: "Assinado",
  active: "Ativo",
  cancelled: "Cancelado",
  expired: "Expirado",
};

const STATUS_COLORS: Record<ContractStatus, string> = {
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

function formatDoc(doc: string): string {
  const d = (doc || "").replace(/\D/g, "");
  if (d.length === 14) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }
  if (d.length === 11) {
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }
  return doc;
}

export default function ContractsPage() {
  const [items, setItems] = useState<ContractItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<ContractStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/contracts?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.items || []);
      setStats(data.stats || null);
    }
    setLoading(false);
  }, [filter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const statusList: (ContractStatus | "all")[] = [
    "all",
    "draft",
    "sent",
    "signed",
    "active",
    "cancelled",
  ];

  return (
    <div>
      <AdminPageHeader
        title="Contratos"
        subtitle="Gestão de contratos SaaS — fechamento e acompanhamento."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Contratos" }]}
        actions={
          <Link
            href="/admin/contratos/novo"
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} strokeWidth={1.75} />
            Fechar contrato
          </Link>
        }
      />

      {/* Stats */}
      {stats && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total</div>
            <div className="admin-stat-value">{stats.total}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Ativos</div>
            <div className="admin-stat-value">
              {(stats.byStatus.active || 0) + (stats.byStatus.signed || 0)}
            </div>
          </div>
          <div className="admin-stat-card accent">
            <div className="admin-stat-label">Receita mensal recorrente</div>
            <div className="admin-stat-value">
              {brl(stats.totalMonthlyRevenueCents)}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Fechados este mês</div>
            <div className="admin-stat-value">{stats.thisMonth}</div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
          margin: "1rem 0",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1 1 240px",
            minWidth: 200,
          }}
        >
          <Search
            size={16}
            strokeWidth={1.75}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.5,
            }}
          />
          <input
            type="text"
            placeholder="Buscar por nome, CNPJ, e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input"
            style={{ paddingLeft: 32, width: "100%" }}
          />
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {statusList.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`admin-filter-chip ${filter === s ? "active" : ""}`}
            >
              {STATUS_LABELS[s]}
              {s !== "all" && stats?.byStatus[s as ContractStatus]
                ? ` · ${stats.byStatus[s as ContractStatus]}`
                : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="admin-loading">Carregando…</div>
      ) : items.length === 0 ? (
        <AdminEmptyState
          variant="edit"
          title="Nenhum contrato encontrado"
          description="Comece fechando o primeiro contrato SaaS para um cliente."
          action={
            <Link href="/admin/contratos/novo" className="admin-btn admin-btn-primary">
              <Plus size={16} strokeWidth={1.75} />
              Fechar contrato
            </Link>
          }
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Documento</th>
                <th>Mensalidade</th>
                <th>Status</th>
                <th>Comercial</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.clientName}</div>
                    {c.clientFantasyName && (
                      <div style={{ fontSize: 12, opacity: 0.7 }}>
                        {c.clientFantasyName}
                      </div>
                    )}
                  </td>
                  <td>{formatDoc(c.clientDocument)}</td>
                  <td>{brl(c.monthlyValueCents)}</td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{
                        background: STATUS_COLORS[c.status] + "20",
                        color: STATUS_COLORS[c.status],
                        borderColor: STATUS_COLORS[c.status] + "40",
                      }}
                    >
                      {STATUS_LABELS[c.status]}
                    </span>
                  </td>
                  <td>{c.createdByName || "—"}</td>
                  <td style={{ fontSize: 12, opacity: 0.8 }}>
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td>
                    <Link
                      href={`/admin/contratos/${c.id}`}
                      className="admin-btn admin-btn-ghost"
                    >
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
