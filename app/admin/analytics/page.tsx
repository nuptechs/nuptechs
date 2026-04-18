"use client";

import { useEffect, useState } from "react";

interface AnalyticsOverview {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  total: number;
  trend: number;
}

interface PageStat { path: string; views: number; }
interface DailyStat { date: string; views: number; }
interface ReferrerStat { referrer: string; views: number; }

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topPages, setTopPages] = useState<PageStat[]>([]);
  const [dailyViews, setDailyViews] = useState<DailyStat[]>([]);
  const [referrers, setReferrers] = useState<ReferrerStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setOverview(data.overview);
          setTopPages(data.topPages ?? []);
          setDailyViews(data.dailyViews ?? []);
          setReferrers(data.topReferrers ?? []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-content">
        <header className="admin-page-header"><div><h1>Analytics</h1><p className="admin-subtitle">Métricas de visitação do site</p></div></header>
        <div className="admin-stats-grid">
          {[1, 2, 3, 4].map((i) => <div key={i} className="admin-stat-card" style={{ minHeight: 90, opacity: 0.5 }} />)}
        </div>
      </div>
    );
  }

  const maxView = Math.max(...dailyViews.map((d) => d.views), 1);
  const maxPageViews = Math.max(...topPages.map((p) => p.views), 1);

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <h1>Analytics</h1>
          <p className="admin-subtitle">Métricas de visitação do site</p>
        </div>
      </header>

      {/* KPI Cards */}
      {overview && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card accent">
            <span className="admin-stat-value">{overview.today.toLocaleString("pt-BR")}</span>
            <span className="admin-stat-label">Visitas hoje</span>
            {overview.yesterday > 0 && (
              <span className={`admin-stat-trend ${overview.today >= overview.yesterday ? "up" : "down"}`}>
                {overview.today >= overview.yesterday ? "↑" : "↓"} {overview.yesterday} ontem
              </span>
            )}
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{overview.thisWeek.toLocaleString("pt-BR")}</span>
            <span className="admin-stat-label">Esta semana</span>
            {overview.lastWeek > 0 && (
              <span className={`admin-stat-trend ${overview.trend >= 0 ? "up" : "down"}`}>
                {overview.trend >= 0 ? "↑" : "↓"} {Math.abs(overview.trend).toFixed(0)}% vs anterior
              </span>
            )}
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{overview.thisMonth.toLocaleString("pt-BR")}</span>
            <span className="admin-stat-label">Este mês</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{overview.total.toLocaleString("pt-BR")}</span>
            <span className="admin-stat-label">Total</span>
          </div>
        </div>
      )}

      {/* Daily Views Chart */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h2>Visitas por dia (últimos 30 dias)</h2>
        </div>
        {dailyViews.length > 0 ? (
          <div className="admin-card">
            <div className="admin-card-body">
              <div className="admin-sparkline" style={{ height: 120 }}>
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
                <span style={{ fontSize: "0.6875rem", color: "var(--subtle)" }}>{dailyViews[0]?.date}</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--subtle)" }}>{dailyViews[dailyViews.length - 1]?.date}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="admin-empty">Sem dados de visualização</p>
        )}
      </section>

      {/* Two columns: Top Pages + Referrers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* Top Pages */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Páginas mais visitadas</h2>
          </div>
          {topPages.length === 0 ? (
            <p className="admin-empty">Sem dados</p>
          ) : (
            <div className="admin-card">
              <div className="admin-card-body" style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {topPages.map((page) => (
                  <div key={page.path} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <code style={{ fontSize: "0.75rem", color: "var(--accent)", flex: "0 0 auto", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {page.path}
                    </code>
                    <div style={{ flex: 1, height: 6, background: "var(--surface-raised)", borderRadius: 3 }}>
                      <div style={{ width: `${(page.views / maxPageViews) * 100}%`, height: "100%", borderRadius: 3, background: "var(--accent)", opacity: 0.6, transition: "width 0.3s ease" }} />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)", minWidth: 36, textAlign: "right" }}>
                      {page.views.toLocaleString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Referrers */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Top referenciadores</h2>
          </div>
          {referrers.length === 0 ? (
            <p className="admin-empty">Sem dados de referência</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Origem</th>
                  <th style={{ textAlign: "right" }}>Visitas</th>
                </tr>
              </thead>
              <tbody>
                {referrers.map((ref) => (
                  <tr key={ref.referrer}>
                    <td style={{ fontSize: "0.8125rem" }}>{ref.referrer}</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>{ref.views.toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
