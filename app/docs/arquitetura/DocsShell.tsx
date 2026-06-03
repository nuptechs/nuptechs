"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./nav";
import { DOCS_BASE } from "./links";
import DocsSearch from "./DocsSearch";
import type { TocItem } from "./lib";

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="docs-nav" aria-label="Sumário da arquitetura">
      <Link
        href={DOCS_BASE}
        className={`docs-nav-home ${pathname === DOCS_BASE ? "is-active" : ""}`}
        onClick={onNavigate}
      >
        🏛️ Início — Arquitetura Corporativa
      </Link>
      {NAV.map((g) => (
        <div className="docs-nav-group" key={g.title}>
          <div className="docs-nav-group-title">
            {g.title}
            {g.hint && <span className="docs-nav-hint">{g.hint}</span>}
          </div>
          <ul>
            {g.items.map((it) => {
              const href = `${DOCS_BASE}/${it.slug}`;
              const active = pathname === href;
              return (
                <li key={it.slug}>
                  <Link href={href} className={active ? "is-active" : ""} onClick={onNavigate}>
                    {it.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DocsShell({
  children,
  toc,
}: {
  children: React.ReactNode;
  toc?: TocItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="docs-root">
      <header className="docs-topbar">
        <button
          className="docs-burger"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>
        <Link href="/" className="docs-brand">
          <span className="docs-brand-dot" />
          <span className="docs-brand-text">NuPtechs</span>
          <span className="docs-brand-sep">/</span>
          <span className="docs-brand-section">Arquitetura</span>
        </Link>
        <div className="docs-topbar-spacer" />
        <DocsSearch />
        <a className="docs-topbar-link" href="/arquitetura" title="Dashboard visual">
          Mapa visual ↗
        </a>
      </header>

      <div className="docs-grid">
        <aside className={`docs-sidebar ${mobileOpen ? "is-open" : ""}`}>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </aside>
        {mobileOpen && <div className="docs-scrim" onClick={() => setMobileOpen(false)} />}

        <main className="docs-main">
          <article className="docs-article">{children}</article>
        </main>

        <aside className="docs-toc">
          {toc && toc.length > 1 && (
            <>
              <div className="docs-toc-title">Nesta página</div>
              <ul>
                {toc.map((t, i) => (
                  <li key={`${t.id}-${i}`} className={t.depth === 3 ? "depth-3" : "depth-2"}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
