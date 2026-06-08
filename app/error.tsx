"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "32rem" }}>
        <p
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent, #6c5ce7)",
            marginBottom: "0.75rem",
          }}
        >
          Erro
        </p>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Algo deu errado.
        </h1>
        <p style={{ opacity: 0.7, marginBottom: "1.75rem", lineHeight: 1.6 }}>
          Tivemos um problema ao carregar esta página. Você pode tentar novamente
          ou voltar ao início.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              background: "var(--accent, #6c5ce7)",
              color: "#fff",
              border: 0,
              borderRadius: "0.6rem",
              padding: "0.7rem 1.3rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
          <a
            href="/"
            style={{
              border: "1px solid rgba(128,128,128,0.3)",
              borderRadius: "0.6rem",
              padding: "0.7rem 1.3rem",
              fontWeight: 600,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </main>
  );
}
