import type { Metadata } from "next";
import NavLinks from "./components/NavLinks";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não existe. Volte ao início e descubra o que a NuPtechs pode construir para você.",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <>
      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              Falar com especialista
            </a>
          </div>
        </div>
      </nav>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]"
          aria-hidden="true"
        >
          Erro 404
        </span>

        <h1 className="display-title mb-4 max-w-lg">
          Página não<br />
          <em>encontrada</em>.
        </h1>

        <p className="lead mx-auto mb-10 max-w-md">
          Parece que essa URL não existe. Mas o que você precisa construir, certamente existe — e a
          NuPtechs pode fazer por você.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a href="/" className="btn btn-primary">
            Voltar ao início
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="mailto:nuptechs@nuptechs.com" className="btn btn-secondary">
            Falar com especialista
          </a>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3 max-w-2xl">
          {[
            { href: "/#servicos",     label: "Serviços",       desc: "Automação, BI, apps móveis e mais" },
            { href: "/#produtos",     label: "Produtos",       desc: "Soluções prontas para implantar hoje" },
            { href: "/#contato",      label: "Diagnóstico",    desc: "Grátis em 24h, sem compromisso" }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="card card-sm group text-left transition-all hover:border-[var(--accent)]"
            >
              <p className="mb-1 text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-[var(--muted)]">{link.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
