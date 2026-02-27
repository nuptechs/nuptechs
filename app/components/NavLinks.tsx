"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Serviços", href: "/servicos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Produtos", href: "/produtos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

export default function NavLinks() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Fecha com Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Bloqueia scroll do body quando aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop links ── */}
      <nav className="nav-links" aria-label="Navegação principal">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
        ))}
      </nav>

      {/* ── Mobile trigger ── */}
      <button
        className="nav-hamburger"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`nav-hamburger__bar ${open ? "nav-hamburger__bar--open-1" : ""}`} />
        <span className={`nav-hamburger__bar ${open ? "nav-hamburger__bar--open-2" : ""}`} />
        <span className={`nav-hamburger__bar ${open ? "nav-hamburger__bar--open-3" : ""}`} />
      </button>

      {/* ── Backdrop ── */}
      <div
        className={`nav-backdrop ${open ? "nav-backdrop--visible" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* ── Mobile panel ── */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`nav-mobile-panel ${open ? "nav-mobile-panel--open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Panel header */}
        <div className="nav-mobile-panel__header">
          <a href="/" className="nav-logo" onClick={() => setOpen(false)}>
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <button
            className="nav-mobile-panel__close"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="nav-mobile-panel__links" aria-label="Links de navegação">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-mobile-panel__link"
              onClick={() => setOpen(false)}
            >
              {l.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="nav-mobile-panel__footer">
          <a
            href="mailto:nuptechs@nuptechs.com"
            className="btn btn-primary w-full justify-center"
            onClick={() => setOpen(false)}
          >
            Falar com especialista
          </a>
          <p className="text-center text-xs text-[var(--subtle)] mt-2">
            Resposta em até 24h · Sem compromisso
          </p>
        </div>
      </div>
    </>
  );
}
