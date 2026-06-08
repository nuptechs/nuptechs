"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#0e0f13", color: "#e8e8ea", margin: 0 }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "32rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8b7cff", marginBottom: "0.75rem" }}>
              Erro
            </p>
            <h1 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Algo deu errado.
            </h1>
            <p style={{ opacity: 0.7, marginBottom: "1.75rem", lineHeight: 1.6 }}>
              Tivemos um problema inesperado. Tente novamente ou volte ao início.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{ background: "#6c5ce7", color: "#fff", border: 0, borderRadius: "0.6rem", padding: "0.7rem 1.3rem", fontWeight: 600, cursor: "pointer" }}
              >
                Tentar novamente
              </button>
              <a
                href="/"
                style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: "0.6rem", padding: "0.7rem 1.3rem", fontWeight: 600, textDecoration: "none", color: "#e8e8ea" }}
              >
                Voltar ao início
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
