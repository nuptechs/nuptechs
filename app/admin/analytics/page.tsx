import { db } from "../../../db";
import { pageViews } from "../../../db/schema";
import { sql, desc, count } from "drizzle-orm";

async function getAnalytics() {
  const [totalViews] = await db.select({ count: count() }).from(pageViews);

  const [todayViews] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= CURRENT_DATE`);

  const [weekViews] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '7 days'`);

  const topPages = await db
    .select({
      path: pageViews.path,
      views: count(),
    })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '30 days'`)
    .groupBy(pageViews.path)
    .orderBy(desc(count()))
    .limit(10);

  return {
    total: totalViews?.count ?? 0,
    today: todayViews?.count ?? 0,
    week: weekViews?.count ?? 0,
    topPages,
  };
}

export default async function AnalyticsPage() {
  let analytics = { total: 0, today: 0, week: 0, topPages: [] as { path: string; views: number }[] };

  try {
    analytics = await getAnalytics();
  } catch {
    // DB not available
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Analytics</h1>
        <p className="admin-subtitle">Métricas de visitação do site</p>
      </header>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-value">
            {analytics.today.toLocaleString("pt-BR")}
          </span>
          <span className="admin-stat-label">Visitas Hoje</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">
            {analytics.week.toLocaleString("pt-BR")}
          </span>
          <span className="admin-stat-label">Últimos 7 dias</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">
            {analytics.total.toLocaleString("pt-BR")}
          </span>
          <span className="admin-stat-label">Total</span>
        </div>
      </div>

      <section className="admin-section">
        <h2>Páginas Mais Visitadas (30 dias)</h2>
        {analytics.topPages.length === 0 ? (
          <p className="admin-empty">Nenhum dado de analytics ainda.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Página</th>
                <th style={{ textAlign: "right" }}>Visitas</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topPages.map((page) => (
                <tr key={page.path}>
                  <td>
                    <code>{page.path}</code>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {page.views.toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
