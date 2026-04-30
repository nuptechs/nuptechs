"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  challenge: string | null;
  status: string;
  notes: string | null;
  score: number | null;
  assignedTo: string | null;
  source: string | null;
  createdAt: string;
}

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
  conversionRate: number;
}

interface TimelineEntry {
  id: number;
  action: string;
  detail: string | null;
  performedBy: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  all: "Todos",
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  converted: "Convertido",
  lost: "Perdido",
};

const STATUS_FLOW: string[] = ["new", "contacted", "qualified", "converted"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const fetchLeads = useCallback(() => {
    const params = new URLSearchParams({ limit: "50" });
    if (filter !== "all") params.set("status", filter);
    if (search.trim()) params.set("search", search.trim());

    fetch(`/api/admin/leads?${params}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setLeads(data.items);
          setTotal(data.total);
          setStats(data.stats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter, search]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(fetchLeads, search ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [fetchLeads, search]);

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    fetch(`/api/admin/leads/${lead.id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setSelectedLead(data.lead);
          setTimeline(data.timeline);
        }
      });
  };

  const updateLead = async (id: number, body: Record<string, unknown>) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedLead(data.lead);
        showToast("Lead atualizado com sucesso", "success");
        fetchLeads();
        // Refresh timeline
        fetch(`/api/admin/leads/${id}`).then((r) => r.ok ? r.json() : null).then((d) => d && setTimeline(d.timeline));
      } else {
        showToast("Erro ao atualizar lead", "error");
      }
    } catch {
      showToast("Erro de conexão", "error");
    } finally {
      setUpdating(false);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const nextStatus = (current: string) => {
    const idx = STATUS_FLOW.indexOf(current);
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  return (
    <div className="admin-content">
      <AdminPageHeader
        title="Leads"
        subtitle="Pipeline de contatos recebidos"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Pipeline" }, { label: "Leads" }]}
      />

      {/* Stats */}
      {stats && (
        <div className="admin-stats-grid" style={{ marginBottom: "1.5rem" }}>
          <div className="admin-stat-card accent">
            <span className="admin-stat-value">{stats.new}</span>
            <span className="admin-stat-label">Novos</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.contacted}</span>
            <span className="admin-stat-label">Contatados</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.qualified}</span>
            <span className="admin-stat-label">Qualificados</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.converted}</span>
            <span className="admin-stat-label">Convertidos</span>
            {stats.conversionRate > 0 && (
              <span className="admin-stat-trend up">↑ {stats.conversionRate.toFixed(1)}%</span>
            )}
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
              <span className="admin-filter-count">{stats[key as keyof LeadStats] ?? 0}</span>
            )}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <input
            type="text"
            className="admin-input admin-search"
            placeholder="Buscar por nome, email ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-card admin-skeleton" style={{ height: 320 }} />
      ) : leads.length === 0 ? (
        <AdminEmptyState
          variant={filter !== "all" || search ? "search" : "inbox"}
          title={filter !== "all" || search ? "Nenhum lead encontrado para esses filtros" : "Nenhum lead registrado"}
          description="Leads aparecem aqui quando alguém preenche o formulário de contato."
        />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Desafio</th>
              <th>Status</th>
              <th>Score</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="clickable" onClick={() => openDetail(lead)}>
                <td className="font-medium">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.company ?? "—"}</td>
                <td className="admin-cell-truncate">{lead.challenge ?? "—"}</td>
                <td>
                  <span className={`admin-badge badge-${lead.status}`}>{STATUS_LABELS[lead.status] ?? lead.status}</span>
                </td>
                <td>
                  {lead.score != null ? (
                    <div className="admin-score">
                      <div className="admin-score-bar">
                        <div className={`admin-score-fill ${lead.score >= 70 ? "high" : lead.score >= 40 ? "mid" : "low"}`} style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="admin-score-label">{lead.score}</span>
                    </div>
                  ) : "—"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <>
          <div className="admin-drawer-overlay" onClick={() => setSelectedLead(null)} />
          <div className="admin-drawer">
            <div className="admin-drawer-header">
              <span className="admin-drawer-title">{selectedLead.name}</span>
              <button className="admin-btn admin-btn-ghost admin-btn-icon" onClick={() => setSelectedLead(null)}>✕</button>
            </div>
            <div className="admin-drawer-body">
              {/* Contact Info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>Email</div>
                    <a href={`mailto:${selectedLead.email}`} className="admin-link" style={{ fontSize: "0.875rem" }}>{selectedLead.email}</a>
                  </div>
                  {selectedLead.phone && (
                    <div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>Telefone</div>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{selectedLead.phone}</span>
                    </div>
                  )}
                  {selectedLead.company && (
                    <div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>Empresa</div>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{selectedLead.company}</span>
                    </div>
                  )}
                  {selectedLead.source && (
                    <div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>Origem</div>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{selectedLead.source}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status + Score */}
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
                <span className={`admin-badge badge-${selectedLead.status}`}>{STATUS_LABELS[selectedLead.status] ?? selectedLead.status}</span>
                {selectedLead.score != null && (
                  <div className="admin-score">
                    <div className="admin-score-bar" style={{ width: 80 }}>
                      <div className={`admin-score-fill ${selectedLead.score >= 70 ? "high" : selectedLead.score >= 40 ? "mid" : "low"}`} style={{ width: `${selectedLead.score}%` }} />
                    </div>
                    <span className="admin-score-label">Score: {selectedLead.score}</span>
                  </div>
                )}
              </div>

              {/* Challenge */}
              {selectedLead.challenge && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.375rem" }}>Desafio</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{selectedLead.challenge}</p>
                </div>
              )}

              {/* Notes */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.375rem" }}>Notas</div>
                <textarea
                  className="admin-input admin-textarea"
                  value={selectedLead.notes ?? ""}
                  placeholder="Adicione notas sobre este lead..."
                  onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                  onBlur={() => updateLead(selectedLead.id, { notes: selectedLead.notes })}
                />
              </div>

              {/* Score input */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.375rem" }}>Score (0-100)</div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="admin-input"
                  style={{ maxWidth: 120 }}
                  value={selectedLead.score ?? ""}
                  onChange={(e) => setSelectedLead({ ...selectedLead, score: e.target.value ? Number(e.target.value) : null })}
                  onBlur={() => {
                    if (selectedLead.score != null) updateLead(selectedLead.id, { score: selectedLead.score });
                  }}
                />
              </div>

              {/* Timeline */}
              {timeline.length > 0 && (
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>Histórico</div>
                  <div className="admin-timeline">
                    {timeline.map((entry) => (
                      <div key={entry.id} className="admin-timeline-entry">
                        <div className="admin-timeline-action">{entry.action}</div>
                        {entry.detail && <div className="admin-timeline-detail">{entry.detail}</div>}
                        <div className="admin-timeline-meta">
                          {entry.performedBy && `${entry.performedBy} · `}
                          {new Date(entry.createdAt).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="admin-drawer-footer">
              {selectedLead.status !== "lost" && (
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  disabled={updating}
                  onClick={() => updateLead(selectedLead.id, { status: "lost", lostReason: "Marcado como perdido" })}
                >
                  Marcar como Perdido
                </button>
              )}
              {nextStatus(selectedLead.status) && (
                <button
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  disabled={updating}
                  onClick={() => updateLead(selectedLead.id, { status: nextStatus(selectedLead.status) })}
                >
                  Avançar para {STATUS_LABELS[nextStatus(selectedLead.status)!]}
                </button>
              )}
            </div>
          </div>
        </>
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
