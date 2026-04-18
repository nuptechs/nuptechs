export default function BlogAdminPage() {
  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>Blog</h1>
        <p className="admin-subtitle">
          Gerenciar posts, gerar conteúdo com IA e indexar no Pinecone
        </p>
      </header>

      <div className="admin-empty-state">
        <p>Gerenciamento de blog em construção.</p>
        <p className="admin-subtle">
          Aqui você poderá criar, editar e publicar posts, além de acionar a
          pipeline de IA (mind maps, flashcards, indexação semântica).
        </p>
      </div>
    </div>
  );
}
