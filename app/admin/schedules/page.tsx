import { db } from "../../../db";
import { schedules } from "../../../db/schema";
import { desc } from "drizzle-orm";

export default async function SchedulesPage() {
  let items: (typeof schedules.$inferSelect)[] = [];

  try {
    items = await db
      .select()
      .from(schedules)
      .orderBy(desc(schedules.createdAt))
      .limit(100);
  } catch {
    // DB not available
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Agendamentos</h1>
        <p className="admin-subtitle">
          Solicitações de agendamento recebidas
        </p>
      </header>

      {items.length === 0 ? (
        <div className="admin-empty-state">
          <p>Nenhum agendamento registrado.</p>
          <p className="admin-subtle">
            Agendamentos aparecem aqui quando alguém solicita uma reunião.
          </p>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id}>
                <td className="font-medium">{s.name}</td>
                <td>
                  <a href={`mailto:${s.email}`} className="admin-link">
                    {s.email}
                  </a>
                </td>
                <td>{s.phone ?? "—"}</td>
                <td>{s.tool}</td>
                <td>
                  <span className={`admin-badge badge-${s.status}`}>
                    {s.status}
                  </span>
                </td>
                <td>{s.createdAt.toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
