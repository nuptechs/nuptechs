export default function SettingsPage() {
  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Configurações</h1>
        <p className="admin-subtitle">Configurações gerais do site</p>
      </header>

      <div className="admin-empty-state">
        <p>Configurações em construção.</p>
        <p className="admin-subtle">
          Aqui você poderá editar textos do site, logos, informações de contato,
          SEO e integrações (Resend, Evolution API, Pinecone).
        </p>
      </div>
    </div>
  );
}
