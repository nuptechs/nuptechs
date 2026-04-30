"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";

interface AuditEntry {
  id: number;
  action: string;
  entityType: string;
  entityId: string | null;
  detail: Record<string, unknown> | null;
  performedBy: string | null;
  performedByName: string | null;
  ipAddress: string | null;
  createdAt: string;
}

const ACTION_LABELS: Record<string, string> = {
  lead_status_change: "Status do lead alterado",
  lead_notes_update: "Notas do lead atualizadas",
  lead_score_update: "Score do lead atualizado",
  lead_assign: "Lead atribuído",
  lead_lost: "Lead marcado como perdido",
  schedule_confirm: "Agendamento confirmado",
  schedule_complete: "Agendamento concluído",
  schedule_cancel: "Agendamento cancelado",
  schedule_no_show: "No-show registrado",
  settings_update: "Configurações atualizadas",
  blog_create: "Post criado",
  blog_update: "Post atualizado",
  blog_delete: "Post deletado",
  blog_publish: "Post publicado",
  blog_unpublish: "Post despublicado",
  user_login: "Login realizado",
  user_logout: "Logout realizado",
};

export default function AuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 30;

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/audit?limit=${limit}&offset=${page * limit}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setEntries(data.items);
          setTotal(data.total);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="admin-content">
      <AdminPageHeader
        title="Auditoria"
        subtitle="Registro de todas as ações administrativas"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Sistema" }, { label: "Auditoria" }]}
      />

      {loading ? (
        <div className="admin-card admin-skeleton" style={{ height: 320 }} />
      ) : entries.length === 0 ? (
        <AdminEmptyState
          variant="search"
          title="Nenhum registro de auditoria"
          description="Ações administrativas serão registradas aqui automaticamente."
        />
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Entidade</th>
                <th>Detalhes</th>
                <th>Usuário</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <span className="admin-audit-action">{entry.action}</span>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                      {ACTION_LABELS[entry.action] ?? entry.action}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem", color: "var(--text)" }}>{entry.entityType}</span>
                    {entry.entityId && (
                      <span style={{ fontSize: "0.6875rem", color: "var(--muted)", marginLeft: "0.375rem" }}>#{entry.entityId}</span>
                    )}
                  </td>
                  <td className="admin-cell-truncate" style={{ maxWidth: 250 }}>
                    {entry.detail ? (
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                        {Object.entries(entry.detail).map(([k, v]) => `${k}: ${v}`).join(", ")}
                      </span>
                    ) : "—"}
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem" }}>
                      {entry.performedByName ?? entry.performedBy ?? "Sistema"}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.8125rem" }}>
                    {new Date(entry.createdAt).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
              <button
                className="admin-btn admin-btn-secondary admin-btn-sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Anterior
              </button>
              <span style={{ fontSize: "0.8125rem", color: "var(--muted)", display: "flex", alignItems: "center" }}>
                Página {page + 1} de {totalPages}
              </span>
              <button
                className="admin-btn admin-btn-secondary admin-btn-sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
