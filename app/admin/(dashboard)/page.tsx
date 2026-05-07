"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, PenSquare, Calendar, Download } from "lucide-react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
  conversionRate: number;
}

interface ScheduleStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  no_show: number;
}

interface AnalyticsOverview {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  total: number;
  trend: number;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string | null;
  status: string;
  score: number | null;
  createdAt: string;
}

interface DashboardData {
  leadStats: LeadStats | null;
  scheduleStats: ScheduleStats | null;
  analytics: AnalyticsOverview | null;
  recentLeads: Lead[];
  dailyViews: { date: string; views: number }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    leadStats: null,
    scheduleStats: null,
    analytics: null,
    recentLeads: [],
    dailyViews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/leads?limit=5").then((r) => r.ok ? r.json() : null),
      fetch("/api/admin/schedules?limit=0").then((r) => r.ok ? r.json() : null),
      fetch("/api/admin/analytics").then((r) => r.ok ? r.json() : null),
    ]).then(([leadsRes, schedulesRes, analyticsRes]) => {
      setData({
        leadStats: leadsRes?.stats ?? null,
        scheduleStats: schedulesRes?.stats ?? null,
        analytics: analyticsRes?.overview ?? null,
        recentLeads: leadsRes?.items ?? [],
        dailyViews: analyticsRes?.dailyViews ?? [],
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-content">
        <AdminPageHeader title="Dashboard" subtitle="Visão geral do site NuPtechs" />
        <div className="admin-stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="admin-stat-card admin-skeleton" style={{ minHeight: 90 }} />
          ))}
        </div>
      </div>
    );
  }

  const { leadStats, scheduleStats, analytics, recentLeads, dailyViews } = data;
  const maxView = Math.max(...dailyViews.map((d) => d.views), 1);

  return (
    <div className="admin-content">
      <AdminPageHeader title="Dashboard" subtitle="Visão geral do site NuPtechs" />

      {/* Quick actions */}
      <div className="admin-quick-actions">
        <Link href="/admin/leads?new=1" className="admin-quick-action">
          <span className="admin-quick-action-icon">
            <Inbox size={18} strokeWidth={1.75} />
          </span>
          <span className="admin-quick-action-body">
            <span className="admin-quick-action-title">Novo lead</span>
            <span className="admin-quick-action-hint">Registrar contato manual</span>
          </span>
        </Link>
        <Link href="/admin/blog?new=1" className="admin-quick-action">
          <span className="admin-quick-action-icon">
            <PenSquare size={18} strokeWidth={1.75} />
          </span>
          <span className="admin-quick-action-body">
            <span className="admin-quick-action-title">Novo post</span>
            <span className="admin-quick-action-hint">Publicar no blog</span>
          </span>
        </Link>
        <Link href="/admin/schedules" className="admin-quick-action">
          <span className="admin-quick-action-icon">
            <Calendar size={18} strokeWidth={1.75} />
          </span>
          <span className="admin-quick-action-body">
            <span className="admin-quick-action-title">Agendamentos</span>
            <span className="admin-quick-action-hint">
              {scheduleStats?.pending ? `${scheduleStats.pending} pendente${scheduleStats.pending > 1 ? "s" : ""}` : "Calendário"}
            </span>
          </span>
        </Link>
        <Link href="/admin/downloads" className="admin-quick-action">
          <span className="admin-quick-action-icon">
            <Download size={18} strokeWidth={1.75} />
          </span>
          <span className="admin-quick-action-body">
            <span className="admin-quick-action-title">Downloads</span>
            <span className="admin-quick-action-hint">APKs dos apps</span>
          </span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card accent">
          <span className="admin-stat-value">{leadStats?.new ?? 0}</span>
          <span className="admin-stat-label">Leads novos</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{leadStats?.total ?? 0}</span>
          <span className="admin-stat-label">Total de leads</span>
          {leadStats && leadStats.conversionRate > 0 && (
            <span className="admin-stat-trend up">
              ↑ {leadStats.conversionRate.toFixed(1)}% conversão
            </span>
          )}
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{scheduleStats?.pending ?? 0}</span>
          <span className="admin-stat-label">Agendamentos pendentes</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{analytics?.today ?? 0}</span>
          <span className="admin-stat-label">Visitas hoje</span>
          {analytics && analytics.trend !== 0 && (
            <span className={`admin-stat-trend ${analytics.trend > 0 ? "up" : "down"}`}>
              {analytics.trend > 0 ? "↑" : "↓"} {Math.abs(analytics.trend).toFixed(0)}% vs semana anterior
            </span>
          )}
        </div>
      </div>

      {/* Pipeline Overview + Sparkline */}
      <div className="admin-grid-cols-2" style={{ marginBottom: "2.5rem" }}>
        {/* Lead Pipeline */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Pipeline de Leads</span>
            <Link href="/admin/leads" className="admin-btn admin-btn-ghost admin-btn-sm">
              Ver todos →
            </Link>
          </div>
          <div className="admin-card-body">
            {leadStats ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {(["new", "contacted", "qualified", "converted", "lost"] as const).map((status) => {
                  const val = leadStats[status] ?? 0;
                  const pct = leadStats.total > 0 ? (val / leadStats.total) * 100 : 0;
                  const labels: Record<string, string> = {
                    new: "Novo", contacted: "Contatado", qualified: "Qualificado",
                    converted: "Convertido", lost: "Perdido",
                  };
                  return (
                    <div key={status} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "0.75rem", width: 80, color: "var(--muted)" }}>{labels[status]}</span>
                      <div style={{ flex: 1, height: 6, background: "var(--surface-raised)", borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3 }} className={`admin-score-fill ${pct > 60 ? "high" : pct > 30 ? "mid" : "low"}`} />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)", minWidth: 20, textAlign: "right" }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="admin-empty">Sem dados disponíveis</p>
            )}
          </div>
        </div>

        {/* Daily Views Sparkline */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Visitas (últimos 30 dias)</span>
            <Link href="/admin/analytics" className="admin-btn admin-btn-ghost admin-btn-sm">
              Detalhes →
            </Link>
          </div>
          <div className="admin-card-body">
            {dailyViews.length > 0 ? (
              <>
                <div className="admin-sparkline" style={{ height: 80 }}>
                  {dailyViews.map((d, i) => (
                    <div
                      key={i}
                      className="admin-spark-bar"
                      style={{ height: `${(d.views / maxView) * 100}%` }}
                      title={`${d.date}: ${d.views} visitas`}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <span style={{ fontSize: "0.6875rem", color: "var(--subtle)" }}>
                    {dailyViews[0]?.date}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--subtle)" }}>
                    {dailyViews[dailyViews.length - 1]?.date}
                  </span>
                </div>
              </>
            ) : (
              <p className="admin-empty">Sem dados de visualização</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h2>Leads Recentes</h2>
          <Link href="/admin/leads" className="admin-btn admin-btn-ghost admin-btn-sm">Ver todos →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <AdminEmptyState
            variant="inbox"
            title="Nenhum lead registrado"
            description="Leads aparecerão aqui quando visitantes preencherem o formulário de contato."
          />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Score</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="clickable">
                  <td className="font-medium">{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.company ?? "—"}</td>
                  <td>
                    <span className={`admin-badge badge-${lead.status}`}>{lead.status}</span>
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
                  <td>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
