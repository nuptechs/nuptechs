"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";

interface Schedule {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  tool: string;
  status: string;
  notes: string | null;
  meetingUrl: string | null;
  confirmedAt: string | null;
  completedAt: string | null;
  cancelReason: string | null;
  createdAt: string;
}

interface ScheduleStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  no_show: number;
}

const STATUS_LABELS: Record<string, string> = {
  all: "Todos",
  pending: "Pendente",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
  no_show: "No-show",
};

const ACTIONS: Record<string, { label: string; btnClass: string; actionKey: string }[]> = {
  pending: [
    { label: "Confirmar", btnClass: "admin-btn-primary", actionKey: "confirm" },
    { label: "Cancelar", btnClass: "admin-btn-danger", actionKey: "cancel" },
  ],
  confirmed: [
    { label: "Concluir", btnClass: "admin-btn-success", actionKey: "complete" },
    { label: "No-show", btnClass: "admin-btn-secondary", actionKey: "no_show" },
    { label: "Cancelar", btnClass: "admin-btn-danger", actionKey: "cancel" },
  ],
};

export default function SchedulesPage() {
  const [items, setItems] = useState<Schedule[]>([]);
  const [stats, setStats] = useState<ScheduleStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [acting, setActing] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const fetchData = useCallback(() => {
    const params = new URLSearchParams({ limit: "50" });
    if (filter !== "all") params.set("status", filter);
    if (search.trim()) params.set("search", search.trim());

    fetch(`/api/admin/schedules?${params}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setItems(data.items);
          setStats(data.stats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter, search]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(fetchData, search ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [fetchData, search]);

  const performAction = async (id: number, action: string) => {
    setActing(id);
    try {
      const res = await fetch(`/api/admin/schedules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        showToast(`Agendamento ${action === "confirm" ? "confirmado" : action === "complete" ? "concluído" : action === "cancel" ? "cancelado" : "marcado como no-show"}`, "success");
        fetchData();
      } else {
        showToast("Erro ao atualizar agendamento", "error");
      }
    } catch {
      showToast("Erro de conexão", "error");
    } finally {
      setActing(null);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="admin-content">
      <AdminPageHeader
        title="Agendamentos"
        subtitle="Solicitações de reunião recebidas"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Pipeline" }, { label: "Agendamentos" }]}
      />

      {/* Stats */}
      {stats && (
        <div className="admin-stats-grid" style={{ marginBottom: "1.5rem" }}>
          <div className="admin-stat-card accent">
            <span className="admin-stat-value">{stats.pending}</span>
            <span className="admin-stat-label">Pendentes</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.confirmed}</span>
            <span className="admin-stat-label">Confirmados</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.completed}</span>
            <span className="admin-stat-label">Concluídos</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.total}</span>
            <span className="admin-stat-label">Total</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="admin-filters">
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`admin-filter-chip ${filter === key ? "active" : ""}`}
            onClick={() => setFilter(key)}
          >
            {label}
            {key !== "all" && stats && (
              <span className="admin-filter-count">{stats[key as keyof ScheduleStats] ?? 0}</span>
            )}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <input
            type="text"
            className="admin-input admin-search"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-card admin-skeleton" style={{ height: 320 }} />
      ) : items.length === 0 ? (
        <AdminEmptyState
          variant={filter !== "all" || search ? "search" : "calendar"}
          title={filter !== "all" || search ? "Nenhum agendamento encontrado" : "Nenhum agendamento registrado"}
          description="Agendamentos aparecem aqui quando alguém solicita uma reunião."
        />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ferramenta</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id}>
                <td className="font-medium">{s.name}</td>
                <td>
                  <a href={`mailto:${s.email}`} className="admin-link">{s.email}</a>
                </td>
                <td>{s.phone ?? "—"}</td>
                <td>{s.tool}</td>
                <td>
                  <span className={`admin-badge badge-${s.status}`}>{STATUS_LABELS[s.status] ?? s.status}</span>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{new Date(s.createdAt).toLocaleDateString("pt-BR")}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    {(ACTIONS[s.status] ?? []).map((a) => (
                      <button
                        key={a.actionKey}
                        className={`admin-btn ${a.btnClass} admin-btn-sm`}
                        disabled={acting === s.id}
                        onClick={(e) => { e.stopPropagation(); performAction(s.id, a.actionKey); }}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Toast */}
      {toast && (
        <div className="admin-toast-container">
          <div className={`admin-toast ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
