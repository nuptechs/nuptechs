"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════
   InteractiveMindMap v5 — Horizontal tree mind map

   Design philosophy (Miro / Whimsical / MindMeister):
   • Center node DOMINATES — large, glowing, color-rich
   • Branches split LEFT and RIGHT (balanced tree)
   • Curved organic connectors via inline SVG paths
   • Color-coded branches — each branch owns a color
   • Leaves reveal on click with smooth animation
   • Text is ALWAYS readable — never truncated
   • Generous whitespace — breathes like Whimsical
   • Works flawlessly in any browser (no SVG layout bugs)
   
   Layout: Left branches ← [CENTER] → Right branches
   This is the "horizontal mind map" pattern used by 
   Miro, XMind, and MindMeister.
   ═══════════════════════════════════════════════════════════ */

const PALETTE = [
  { h: 239, s: 84, l: 67, hex: "#6366f1" },  // indigo
  { h: 160, s: 84, l: 39, hex: "#10b981" },  // emerald
  { h: 38,  s: 92, l: 50, hex: "#f59e0b" },  // amber
  { h: 330, s: 81, l: 60, hex: "#ec4899" },  // pink
  { h: 199, s: 89, l: 48, hex: "#0ea5e9" },  // sky
  { h: 263, s: 70, l: 50, hex: "#8b5cf6" },  // violet
  { h: 0,   s: 84, l: 60, hex: "#ef4444" },  // red
  { h: 174, s: 77, l: 40, hex: "#14b8a6" },  // teal
];

function countAll(n: MindMapNode): number {
  return (n.children ?? []).reduce((s, c) => s + 1 + countAll(c), 0);
}

/* ── Curved connector (branch → center) ── */
function BranchConnector({ color, side }: { color: string; side: "left" | "right" }) {
  const w = 56, h = 6;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mm5__curve" aria-hidden>
      <path
        d={`M0,${h/2} C${w*0.4},${h/2} ${w*0.6},${h/2} ${w},${h/2}`}
        stroke={color} strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Leaf connector (small horizontal line) ── */
function LeafLine({ color }: { color: string }) {
  return (
    <svg width="24" height="2" viewBox="0 0 24 2" className="mm5__leaf-line" aria-hidden>
      <line x1="0" y1="1" x2="24" y2="1" stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function InteractiveMindMap({ data }: { data: MindMapNode; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());
  const [focus, setFocus] = useState<number | null>(null);

  const branches = useMemo(() => data.children ?? [], [data]);
  const total = useMemo(() => countAll(data), [data]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback((i: number) => {
    setExpanded(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }, []);

  const allOpen = branches.every((_, i) => expanded.has(i));
  const toggleAll = useCallback(() => {
    setExpanded(allOpen ? new Set() : new Set(branches.map((_, i) => i)));
    setFocus(null);
  }, [allOpen, branches]);

  /* Split branches: left side and right side */
  const mid = Math.ceil(branches.length / 2);
  const leftIdxs = branches.map((_, i) => i).slice(0, mid);
  const rightIdxs = branches.map((_, i) => i).slice(mid);

  /* ── Render a single branch arm (for either side) ── */
  const renderArm = (idx: number, side: "left" | "right") => {
    const branch = branches[idx];
    const p = PALETTE[idx % PALETTE.length];
    const isOpen = expanded.has(idx);
    const isDim = focus !== null && focus !== idx;
    const leaves = branch.children ?? [];

    const pill = (
      <button
        className={`mm5__pill${isOpen ? " mm5__pill--open" : ""}`}
        style={{
          borderColor: `${p.hex}55`,
          background: `hsla(${p.h},${p.s}%,${p.l}%,0.08)`,
        }}
        onClick={() => toggle(idx)}
        aria-expanded={isOpen}
      >
        {side === "left" && leaves.length > 0 && (
          <span className="mm5__badge" style={{ background: `${p.hex}20`, color: p.hex }}>
            {isOpen ? "−" : leaves.length}
          </span>
        )}
        <span className="mm5__pill-dot" style={{ background: p.hex }} />
        <span className="mm5__pill-label" style={{ color: p.hex }}>{branch.label}</span>
        {side === "right" && leaves.length > 0 && (
          <span className="mm5__badge" style={{ background: `${p.hex}20`, color: p.hex }}>
            {isOpen ? "−" : leaves.length}
          </span>
        )}
      </button>
    );

    const leafList = isOpen && leaves.length > 0 && (
      <div className={`mm5__leaves mm5__leaves--${side}`}>
        {leaves.map((leaf, li) => (
          <div
            key={li}
            className="mm5__leaf"
            style={{ animationDelay: `${li * 50}ms`, borderColor: `${p.hex}40` }}
          >
            {side === "right" && <LeafLine color={p.hex} />}
            <span className="mm5__leaf-label">{leaf.label}</span>
            {side === "left" && <LeafLine color={p.hex} />}
          </div>
        ))}
      </div>
    );

    return (
      <div
        key={idx}
        className={`mm5__arm${isDim ? " mm5__arm--dim" : ""}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : (side === "left" ? "translateX(24px)" : "translateX(-24px)"),
          transitionDelay: `${idx * 90 + 200}ms`,
        }}
      >
        <div className={`mm5__arm-row mm5__arm-row--${side}`}>
          {side === "left" && leafList}
          {side === "left" && pill}
          {side === "left" && <BranchConnector color={p.hex} side="left" />}

          {side === "right" && <BranchConnector color={p.hex} side="right" />}
          {side === "right" && pill}
          {side === "right" && leafList}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="mm5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* ── Header ─────────────────────────── */}
      <div className="mm5__bar">
        <div className="mm5__bar-left">
          <div className="mm5__bar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="3" x2="12" y2="9" opacity=".4" />
              <line x1="12" y1="15" x2="12" y2="21" opacity=".4" />
              <line x1="3" y1="12" x2="9" y2="12" opacity=".4" />
              <line x1="15" y1="12" x2="21" y2="12" opacity=".4" />
              <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity=".3" />
              <circle cx="12" cy="21" r="1.5" fill="currentColor" opacity=".3" />
              <circle cx="3" cy="12" r="1.5" fill="currentColor" opacity=".3" />
              <circle cx="21" cy="12" r="1.5" fill="currentColor" opacity=".3" />
            </svg>
          </div>
          <div>
            <div className="mm5__bar-title">Mapa Mental</div>
            <div className="mm5__bar-meta">{branches.length} ramos · {total} conceitos</div>
          </div>
        </div>
        <button className="mm5__bar-btn" onClick={toggleAll}>
          {allOpen ? "Recolher" : "Expandir tudo"}
        </button>
      </div>

      {/* ── The mind map ───────────────────── */}
      <div className="mm5__canvas">
        {/* Left side */}
        <div className="mm5__side mm5__side--left">
          {leftIdxs.map(i => renderArm(i, "left"))}
        </div>

        {/* Center node */}
        <div className="mm5__center" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.6)",
          transitionDelay: "100ms",
        }}>
          <div className="mm5__center-glow" />
          <div className="mm5__center-ring" />
          <div className="mm5__center-node">
            <span className="mm5__center-label">{data.label}</span>
          </div>
        </div>

        {/* Right side */}
        <div className="mm5__side mm5__side--right">
          {rightIdxs.map(i => renderArm(i, "right"))}
        </div>
      </div>

      {/* ── Footer legend ──────────────────── */}
      <div className="mm5__footer">
        <div className="mm5__tags">
          {branches.map((b, i) => {
            const p = PALETTE[i % PALETTE.length];
            const active = focus === i;
            return (
              <button
                key={i}
                className={`mm5__tag${active ? " mm5__tag--on" : ""}`}
                style={{
                  borderColor: active ? p.hex : undefined,
                  background: active ? `${p.hex}15` : undefined,
                  color: active ? p.hex : undefined,
                }}
                onClick={() => setFocus(f => f === i ? null : i)}
              >
                <span className="mm5__tag-dot" style={{ background: p.hex }} />
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="mm5__tip">Clique nos ramos para expandir · Tags filtram por tema</p>
      </div>
    </div>
  );
}
