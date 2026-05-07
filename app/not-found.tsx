import type { Metadata } from "next";
import NavLinks from "./components/NavLinks";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não existe. Volte ao início e descubra o que a NuPtechs pode construir para você.",
  robots: { index: false, follow: true }
};

const suggestions = [
  {
    href: "/#servicos",
    label: "Serviços",
    desc: "Automação, BI, apps e mais",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    href: "/#produtos",
    label: "Produtos",
    desc: "Soluções prontas para implantar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
        <path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    href: "/blog",
    label: "Blog",
    desc: "Artigos técnicos e guias práticos",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h11l3 3v13H5V4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
        <path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    href: "/#contato",
    label: "Diagnóstico",
    desc: "Grátis em 24h, sem compromisso",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    )
  }
];

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

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]"
          aria-hidden="true"
        >
          Erro 404
        </span>

        <h1 className="display-title mb-4">
          Página não<br />
          <em>encontrada</em>.
        </h1>

        <p className="lead mx-auto mb-10 max-w-md">
          Parece que essa URL não existe. Mas o que você precisa construir, certamente existe — e a
          NuPtechs pode fazer por você.
        </p>

        <div className="mb-16 flex flex-wrap justify-center gap-3">
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

        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Talvez você procurava
        </p>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {suggestions.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="card card-sm group flex flex-col items-start text-left transition-all"
            >
              <span className="card-icon" aria-hidden="true">
                {link.icon}
              </span>
              <p className="card-title mb-1 group-hover:text-[var(--accent)] transition-colors">
                {link.label}
              </p>
              <p className="card-body">{link.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
