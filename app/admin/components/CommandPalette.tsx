"use client";

// app/admin/components/CommandPalette.tsx
// Cmd+K (Ctrl+K) abre uma palette pra navegar entre páginas e disparar
// ações rápidas. Filtra por substring no label, descrição ou trilha
// (ex.: "leads", "novo agendamento", "config").

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid, Inbox, Calendar, MessageCircle, CreditCard,
  PenSquare, BarChart3, Download, ShieldAlert, Settings,
  ArrowLeft, Search, ArrowRight,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description?: string;
  /** Trilha mostrada ao lado (ex.: "Pipeline · Leads"). */
  group: string;
  /** href OU action — uma das duas. */
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
  /** Termos extras pra busca (sinônimos). */
  keywords?: string[];
}

const ICON = { size: 16, strokeWidth: 1.75 } as const;

const COMMANDS: Command[] = [
  // Navegação
  { id: "go-dashboard",   group: "Geral",         label: "Dashboard",      href: "/admin",            icon: <LayoutGrid {...ICON} />, keywords: ["home", "início"] },
  { id: "go-leads",       group: "Pipeline",      label: "Leads",          href: "/admin/leads",      icon: <Inbox {...ICON} /> },
  { id: "go-schedules",   group: "Pipeline",      label: "Agendamentos",   href: "/admin/schedules",  icon: <Calendar {...ICON} />,   keywords: ["reunião", "meeting"] },
  { id: "go-whatsapp",    group: "Pipeline",      label: "WhatsApp",       href: "/admin/whatsapp",   icon: <MessageCircle {...ICON} /> },
  { id: "go-cartoes",     group: "Pipeline",      label: "Cartões",        href: "/admin/cartoes",    icon: <CreditCard {...ICON} /> },
  { id: "go-blog",        group: "Conteúdo",      label: "Blog",           href: "/admin/blog",       icon: <PenSquare {...ICON} />,  keywords: ["posts", "artigos"] },
  { id: "go-analytics",   group: "Conteúdo",      label: "Analytics",      href: "/admin/analytics",  icon: <BarChart3 {...ICON} />,  keywords: ["métricas", "visitas"] },
  { id: "go-downloads",   group: "Distribuição",  label: "Downloads",      href: "/admin/downloads",  icon: <Download {...ICON} />,   keywords: ["apk", "apps"] },
  { id: "go-audit",       group: "Sistema",       label: "Auditoria",      href: "/admin/audit",      icon: <ShieldAlert {...ICON} />, keywords: ["log", "logs"] },
  { id: "go-settings",    group: "Sistema",       label: "Configurações",  href: "/admin/settings",   icon: <Settings {...ICON} /> },
  // Ações rápidas
  { id: "go-blog-new",    group: "Ações",         label: "Novo post",         href: "/admin/blog?new=1",            icon: <PenSquare {...ICON} />, keywords: ["criar", "publicar"] },
  { id: "go-leads-new",   group: "Ações",         label: "Novo lead",         href: "/admin/leads?new=1",           icon: <Inbox {...ICON} /> },
  { id: "go-public",      group: "Navegação",     label: "Voltar ao site",    href: "/",                            icon: <ArrowLeft {...ICON} /> },
  { id: "logout",         group: "Sistema",       label: "Sair",              action: () => { window.location.href = "/api/auth/logout"; }, icon: <ArrowRight {...ICON} />, keywords: ["logout", "exit"] },
];

function score(cmd: Command, q: string): number {
  if (!q) return 1;
  const needle = q.toLowerCase().trim();
  if (!needle) return 1;
  const haystack = [
    cmd.label,
    cmd.description ?? "",
    cmd.group,
    ...(cmd.keywords ?? []),
  ].join(" ").toLowerCase();
  if (haystack.includes(needle)) {
    // labels que começam com a query ranqueiam mais.
    return cmd.label.toLowerCase().startsWith(needle) ? 3 : 2;
  }
  return 0;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Atalho global Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isOpen = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
      if (isOpen) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Foca o input ao abrir
  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    return COMMANDS
      .map((c) => ({ c, s: score(c, q) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ c }) => c);
  }, [q]);

  // Re-clamp do índice ativo quando o filtro encolhe
  useEffect(() => {
    if (active >= filtered.length) setActive(Math.max(0, filtered.length - 1));
  }, [filtered.length, active]);

  function run(cmd: Command) {
    setOpen(false);
    if (cmd.action) cmd.action();
    else if (cmd.href) router.push(cmd.href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) run(filtered[active]);
    }
  }

  if (!open) return null;

  // Agrupa por `group` mantendo a ordem do filtered (já ordenado por score)
  const groups: { name: string; items: Command[] }[] = [];
  for (const cmd of filtered) {
    const last = groups[groups.length - 1];
    if (last && last.name === cmd.group) last.items.push(cmd);
    else groups.push({ name: cmd.group, items: [cmd] });
  }

  return (
    <div
      className="cmdk-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar e ações"
      onClick={() => setOpen(false)}
      onKeyDown={onKeyDown}
    >
      <div className="cmdk-shell" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-wrap">
          <Search size={16} strokeWidth={1.75} className="cmdk-input-icon" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar páginas, ações…"
            className="cmdk-input"
            spellCheck={false}
          />
          <kbd className="cmdk-kbd">esc</kbd>
        </div>

        <div className="cmdk-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="cmdk-empty">Nada encontrado para “{q}”.</div>
          ) : (
            groups.map((g) => (
              <div key={g.name} className="cmdk-group">
                <div className="cmdk-group-title">{g.name}</div>
                {g.items.map((cmd) => {
                  const idx = filtered.indexOf(cmd);
                  const isActive = idx === active;
                  return (
                    <button
                      key={cmd.id}
                      className={`cmdk-item ${isActive ? "active" : ""}`}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => run(cmd)}
                      role="option"
                      aria-selected={isActive}
                    >
                      <span className="cmdk-item-icon">{cmd.icon}</span>
                      <span className="cmdk-item-label">{cmd.label}</span>
                      {isActive && (
                        <span className="cmdk-item-hint">
                          <ArrowRight size={13} strokeWidth={1.75} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmdk-footer">
          <span><kbd className="cmdk-kbd">↑</kbd><kbd className="cmdk-kbd">↓</kbd> navegar</span>
          <span><kbd className="cmdk-kbd">↵</kbd> abrir</span>
          <span className="cmdk-footer-hint">Cmd+K para abrir</span>
        </div>
      </div>
    </div>
  );
}
