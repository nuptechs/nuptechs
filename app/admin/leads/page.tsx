import { db } from "../../../db";
import { contacts } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export default async function LeadsPage() {
  let leads: (typeof contacts.$inferSelect)[] = [];

  try {
    leads = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(100);
  } catch {
    // DB not available
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Leads</h1>
        <p className="admin-subtitle">
          Contatos recebidos pelo formulário de diagnóstico
        </p>
      </header>

      {leads.length === 0 ? (
        <div className="admin-empty-state">
          <p>Nenhum lead registrado.</p>
          <p className="admin-subtle">
            Leads aparecem aqui quando alguém preenche o formulário de contato.
          </p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Desafio</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="font-medium">{lead.name}</td>
                <td>
                  <a href={`mailto:${lead.email}`} className="admin-link">
                    {lead.email}
                  </a>
                </td>
                <td>{lead.company ?? "—"}</td>
                <td className="admin-cell-truncate">{lead.challenge}</td>
                <td>
                  <span className={`admin-badge badge-${lead.status}`}>
                    {lead.status}
                  </span>
                </td>
                <td>{lead.createdAt.toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
