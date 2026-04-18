import { db } from "../../../db";
import { contacts, schedules, pageViews } from "../../../db/schema";
import { sql, desc, eq, count } from "drizzle-orm";
import { StatsCard } from "../components/StatsCard";

async function getStats() {
  const [contactCount] = await db
    .select({ count: count() })
    .from(contacts);

  const [newLeads] = await db
    .select({ count: count() })
    .from(contacts)
    .where(eq(contacts.status, "new"));

  const [scheduleCount] = await db
    .select({ count: count() })
    .from(schedules);

  const [viewsToday] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(
      sql`${pageViews.createdAt} >= CURRENT_DATE`
    );

  return {
    totalLeads: contactCount?.count ?? 0,
    newLeads: newLeads?.count ?? 0,
    totalSchedules: scheduleCount?.count ?? 0,
    viewsToday: viewsToday?.count ?? 0,
  };
}

async function getRecentLeads() {
  return db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt))
    .limit(5);
}

export default async function AdminDashboard() {
  let stats = { totalLeads: 0, newLeads: 0, totalSchedules: 0, viewsToday: 0 };
  let recentLeads: Awaited<ReturnType<typeof getRecentLeads>> = [];

  try {
    [stats, recentLeads] = await Promise.all([getStats(), getRecentLeads()]);
  } catch {
    // DB not available yet — show empty state
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Dashboard</h1>
        <p className="admin-subtitle">Visão geral do site NuPtechs</p>
      </header>

      <div className="admin-stats-grid">
        <StatsCard label="Total de Leads" value={stats.totalLeads} />
        <StatsCard label="Leads Novos" value={stats.newLeads} accent />
        <StatsCard label="Agendamentos" value={stats.totalSchedules} />
        <StatsCard label="Visitas Hoje" value={stats.viewsToday} />
      </div>

      <section className="admin-section">
        <h2>Leads Recentes</h2>
        {recentLeads.length === 0 ? (
          <p className="admin-empty">Nenhum lead registrado ainda.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.company ?? "—"}</td>
                  <td>
                    <span className={`admin-badge badge-${lead.status}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    {lead.createdAt.toLocaleDateString("pt-BR")}
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
