"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════════
   InteractiveMindMap v6 — Research-backed design

   Research sources:
   ─ XMind (4.8★, 100M users): "Polished to perfection",
     "structures bring clarity", "holistic view for complex systems"
   ─ Whimsical: "Automatic layouts and colors",
     "Big ideas need space — infinite canvas"
   ─ Coggle: "Mind maps that flow like your ideas",
     organic curves, join branches
   ─ Emberly (6 ways to effective mind maps):
     • Harmonious palette — NOT clashing colors
     • Labels > branches — text is the star, connectors are subtle
     • Never truncate text
     • Branches shouldn't be too dark (eyes must scan labels fast)
   ─ Reddit r/mindmapping + r/productivity:
     • Common complaints: "too cluttered", "nodes lost in space",
       "looks like a list not a map", "text cut off"
     • Common praise: "intuitive", "clean", "I can see everything
       at a glance", "organic feel"

   Implementation:
   ─ Layout: Horizontal tree — Left ← CENTER → Right (XMind default)
   ─ Connectors: Organic cubic Bézier curves (Coggle-style)
   ─ Colors: Harmonious palette with subtle branch tints
   ─ Text: Always readable, generously padded, never truncated
   ─ Interaction: Click to expand leaves, tags to filter/focus
   ─ No SVG canvas — HTML+CSS with tiny inline SVG curves
   ═══════════════════════════════════════════════════════════════ */

/* Harmonious palette — close hues, not rainbow.
   Following Emberly's research: closely related colors reduce visual noise. */
const PALETTE = [
  { hex: "#6366f1", bg: "rgba(99,102,241,0.07)",  border: "rgba(99,102,241,0.25)" },
  { hex: "#8b5cf6", bg: "rgba(139,92,246,0.07)",  border: "rgba(139,92,246,0.25)" },
  { hex: "#0ea5e9", bg: "rgba(14,165,233,0.07)",  border: "rgba(14,165,233,0.25)" },
  { hex: "#10b981", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.25)" },
  { hex: "#f59e0b", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.25)" },
  { hex: "#ec4899", bg: "rgba(236,72,153,0.07)",  border: "rgba(236,72,153,0.25)" },
  { hex: "#14b8a6", bg: "rgba(20,184,166,0.07)",  border: "rgba(20,184,166,0.25)" },
  { hex: "#ef4444", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.25)" },
];

function countAll(n: MindMapNode): number {
  return (n.children ?? []).reduce((s, c) => s + 1 + countAll(c), 0);
}

/* ── Slugify helper: converts label text to a potential section anchor ─ */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Find the best matching section on the page ────────────── */
function findSectionId(label: string): string | null {
  if (typeof document === "undefined") return null;
  const sections = document.querySelectorAll<HTMLElement>(".article-section");
  if (!sections.length) return null;

  const needle = slugify(label);
  /* 1. Exact slug match */
  for (const el of sections) {
    if (el.id && slugify(el.id).includes(needle)) return el.id;
  }
  /* 2. Heading text includes label */
  const lowerLabel = label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const el of sections) {
    const heading = el.querySelector("h2, h3");
    if (!heading) continue;
    const headingText = (heading.textContent ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (headingText.includes(lowerLabel) || lowerLabel.includes(headingText.slice(0, 12))) return el.id;
  }
  /* 3. Partial keyword match (first 2+ words) */
  const keywords = needle.split("-").filter(w => w.length > 2);
  if (keywords.length >= 1) {
    for (const el of sections) {
      const headText = slugify(el.querySelector("h2, h3")?.textContent ?? el.id);
      if (keywords.some(k => headText.includes(k))) return el.id;
    }
  }
  return null;
}

/* ── Scroll to section ─────────────────────────────────────── */
function scrollToSection(label: string, closeFullscreen?: () => void) {
  const sectionId = findSectionId(label);
  if (!sectionId) return;
  if (closeFullscreen) closeFullscreen();
  /* Small delay so fullscreen closes before scrolling */
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, closeFullscreen ? 350 : 0);
}

/* ── Organic curved connector ─────────────────────────────────
   Full-width horizontal Bézier that connects pill to center.
   Start and end at vertical midpoint so lines are complete. */
function Curve({ color, side }: { color: string; side: "left" | "right" }) {
  const w = 56, h = 16;
  const mid = h / 2;
  /* Gentle S-curve: starts horizontal, dips slightly, ends horizontal */
  const path = side === "right"
    ? `M0,${mid} C${w * 0.4},${mid} ${w * 0.6},${mid + 2} ${w},${mid}`
    : `M${w},${mid} C${w * 0.6},${mid} ${w * 0.4},${mid + 2} 0,${mid}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mm6__curve" aria-hidden>
      <path d={path} stroke={color} strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

/* ── Small leaf connector ─── */
function LeafCurve({ color, side }: { color: string; side: "left" | "right" }) {
  const w = 28, h = 10;
  const mid = h / 2;
  const path = side === "right"
    ? `M0,${mid} C${w * 0.45},${mid} ${w * 0.55},${mid + 1} ${w},${mid}`
    : `M${w},${mid} C${w * 0.55},${mid} ${w * 0.45},${mid + 1} 0,${mid}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mm6__leaf-curve" aria-hidden>
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function InteractiveMindMap({ data }: { data: MindMapNode; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());
  const [focus, setFocus] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const branches = useMemo(() => data.children ?? [], [data]);
  const total = useMemo(() => countAll(data), [data]);

  /* Entrance animation on scroll */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Escape to close fullscreen */
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  /* Lock body scroll in fullscreen */
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      /* In fullscreen, auto-expand all branches for full visibility */
      setExpanded(new Set(branches.map((_, i) => i)));
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [fullscreen, branches]);

  const toggle = useCallback((i: number) => {
    setExpanded(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }, []);

  const allOpen = branches.every((_, i) => expanded.has(i));
  const toggleAll = useCallback(() => {
    setExpanded(allOpen ? new Set() : new Set(branches.map((_, i) => i)));
    setFocus(null);
  }, [allOpen, branches]);

  /* Balance: split branches left/right for horizontal tree layout */
  const mid = Math.ceil(branches.length / 2);
  const leftIdxs = useMemo(() => branches.map((_, i) => i).slice(0, mid), [branches, mid]);
  const rightIdxs = useMemo(() => branches.map((_, i) => i).slice(mid), [branches, mid]);

  /* ── Render one branch arm ── */
  const closeFs = fullscreen ? () => setFullscreen(false) : undefined;

  const renderArm = (idx: number, side: "left" | "right") => {
    const branch = branches[idx];
    const p = PALETTE[idx % PALETTE.length];
    const isOpen = expanded.has(idx);
    const isDim = focus !== null && focus !== idx;
    const leaves = branch.children ?? [];

    /* Pill — click label to navigate, click count to expand */
    const pill = (
      <div
        className={`mm6__pill${isOpen ? " mm6__pill--open" : ""}`}
        style={{ borderColor: p.border, background: p.bg }}
      >
        <span className="mm6__pill-dot" style={{ background: p.hex }} />
        <button
          className="mm6__pill-text mm6__pill-link"
          style={{ color: p.hex }}
          onClick={() => scrollToSection(branch.label, closeFs)}
          title={`Ir para "${branch.label}"`}
        >
          {branch.label}
        </button>
        {leaves.length > 0 && (
          <button
            className="mm6__pill-count"
            style={{ color: p.hex, background: `${p.hex}12` }}
            onClick={() => toggle(idx)}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Recolher" : "Expandir"} ${branch.label}`}
          >
            {isOpen ? "−" : `${leaves.length}`}
          </button>
        )}
      </div>
    );

    /* Leaves — each one is a clickable link */
    const leafPanel = isOpen && leaves.length > 0 && (
      <div className={`mm6__leaves mm6__leaves--${side}`}>
        {leaves.map((leaf, li) => (
          <button
            key={li}
            className="mm6__leaf mm6__leaf--clickable"
            style={{ animationDelay: `${li * 60}ms` }}
            onClick={() => scrollToSection(leaf.label, closeFs)}
            title={`Ir para "${leaf.label}"`}
          >
            {side === "right" && <LeafCurve color={p.hex} side="right" />}
            <span className="mm6__leaf-text">{leaf.label}</span>
            {side === "left" && <LeafCurve color={p.hex} side="left" />}
          </button>
        ))}
      </div>
    );

    return (
      <div
        key={idx}
        className={`mm6__arm${isDim ? " mm6__arm--dim" : ""}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "none"
            : side === "left" ? "translateX(16px)" : "translateX(-16px)",
          transitionDelay: `${idx * 80 + 150}ms`,
        }}
      >
        <div className={`mm6__arm-row mm6__arm-row--${side}`}>
          {side === "left" && leafPanel}
          {side === "left" && pill}
          <Curve color={p.hex} side={side} />
          {side === "right" && pill}
          {side === "right" && leafPanel}
        </div>
      </div>
    );
  };

  /* ── Fullscreen expand icon ── */
  const ExpandIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
  const ShrinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 14h6v6M14 4h-6v-6M14 10l7-7M4 20l7-7" />
    </svg>
  );

  const mapContent = (
    <div
      ref={fullscreen ? undefined : ref}
      className={`mm6${fullscreen ? " mm6--fullscreen" : ""}`}
      style={fullscreen ? undefined : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
      }}
    >
      {/* ── Header ─────────────────────────── */}
      <div className="mm6__header">
        <div className="mm6__header-left">
          <div className="mm6__header-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="2.5" />
              <path d="M12 2v7M12 15v7M2 12h7M15 12h7" opacity=".35" />
            </svg>
          </div>
          <div>
            <h3 className="mm6__header-title">Mapa Mental</h3>
            <p className="mm6__header-meta">{branches.length} ramos · {total} conceitos · Ferramenta de revisão</p>
          </div>
        </div>
        <div className="mm6__header-actions">
          <button className="mm6__toggle-btn" onClick={toggleAll}>
            {allOpen ? "Recolher" : "Expandir tudo"}
          </button>
          <button
            className="mm6__toggle-btn mm6__fullscreen-btn"
            onClick={() => setFullscreen(f => !f)}
            aria-label={fullscreen ? "Fechar tela cheia" : "Abrir em tela cheia"}
            title={fullscreen ? "Fechar (Esc)" : "Tela cheia"}
          >
            {fullscreen ? <ShrinkIcon /> : <ExpandIcon />}
            <span>{fullscreen ? "Fechar" : "Tela cheia"}</span>
          </button>
        </div>
      </div>

      {/* ── Mind map canvas ────────────────── */}
      <div className="mm6__canvas">
        {/* Left branches */}
        <div className="mm6__side mm6__side--left">
          {leftIdxs.map(i => renderArm(i, "left"))}
        </div>

        {/* Center node — THE dominant element */}
        <div
          className="mm6__center"
          style={{
            opacity: visible || fullscreen ? 1 : 0,
            transform: visible || fullscreen ? "scale(1)" : "scale(0.8)",
            transitionDelay: "80ms",
          }}
        >
          <div className="mm6__center-glow" />
          <div className="mm6__center-node">
            <span className="mm6__center-text">{data.label}</span>
          </div>
        </div>

        {/* Right branches */}
        <div className="mm6__side mm6__side--right">
          {rightIdxs.map(i => renderArm(i, "right"))}
        </div>
      </div>

      {/* ── Legend / filter tags ────────────── */}
      <div className="mm6__footer">
        <div className="mm6__tags">
          {branches.map((b, i) => {
            const p = PALETTE[i % PALETTE.length];
            const active = focus === i;
            return (
              <button
                key={i}
                className={`mm6__tag${active ? " mm6__tag--active" : ""}`}
                style={{
                  borderColor: active ? p.hex : undefined,
                  background: active ? p.bg : undefined,
                  color: active ? p.hex : undefined,
                }}
                onClick={() => setFocus(f => f === i ? null : i)}
              >
                <span className="mm6__tag-dot" style={{ background: p.hex }} />
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="mm6__hint">
          Clique nos nomes para navegar ao texto · Números para expandir
          {!fullscreen && " · Tela cheia para ver tudo"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline version (always rendered for scroll-into-view ref) */}
      {!fullscreen && mapContent}

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div className="mm6__overlay" onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false); }}>
          {mapContent}
        </div>
      )}

      {/* Hidden ref anchor when in fullscreen */}
      {fullscreen && <div ref={ref} />}
    </>
  );
}
