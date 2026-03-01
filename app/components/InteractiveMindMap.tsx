"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════
   InteractiveMindMap v4 — HTML/CSS card-based layout.

   Design philosophy:
   • NO SVG — pure HTML flexbox/grid for reliable rendering
   • Dark gradient background with depth
   • Animated cards with glassmorphism
   • Progressive reveal with smooth transitions
   • Fully responsive, touch-friendly
   • Every node is large, readable, beautiful
   ═══════════════════════════════════════════════════════════ */

const COLORS = [
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", text: "#818cf8", solid: "#6366f1" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", text: "#34d399", solid: "#10b981" },
  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#fbbf24", solid: "#f59e0b" },
  { bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.35)", text: "#f472b6", solid: "#ec4899" },
  { bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.35)", text: "#38bdf8", solid: "#0ea5e9" },
  { bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.35)", text: "#a78bfa", solid: "#8b5cf6" },
  { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#f87171", solid: "#ef4444" },
  { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", text: "#2dd4bf", solid: "#14b8a6" },
];

function countAll(node: MindMapNode): number {
  if (!node.children) return 0;
  return node.children.reduce((s, c) => s + 1 + countAll(c), 0);
}

/* ═══ Branch Card ═════════════════════════════════════════ */
function BranchCard({
  branch,
  index,
  expanded,
  focused,
  dimmed,
  onToggle,
}: {
  branch: MindMapNode;
  index: number;
  expanded: boolean;
  focused: boolean;
  dimmed: boolean;
  onToggle: () => void;
}) {
  const c = COLORS[index % COLORS.length];
  const leaves = branch.children ?? [];
  const count = leaves.length;

  return (
    <div
      className="mm4-branch"
      style={{
        opacity: dimmed ? 0.3 : 1,
        transform: focused ? "scale(1.02)" : dimmed ? "scale(0.97)" : "scale(1)",
      }}
    >
      {/* Branch header */}
      <button
        className="mm4-branch__header"
        onClick={onToggle}
        style={{ borderColor: c.border, background: c.bg }}
        aria-expanded={expanded}
      >
        <span className="mm4-branch__dot" style={{ background: c.solid }} />
        <span className="mm4-branch__label" style={{ color: c.text }}>{branch.label}</span>
        <span className="mm4-branch__count" style={{ color: c.text, background: `${c.solid}22` }}>
          {count}
        </span>
        <svg
          className="mm4-branch__chevron"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", color: c.text }}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Leaves */}
      <div className="mm4-branch__leaves" style={{ maxHeight: expanded ? `${count * 52 + 16}px` : "0" }}>
        {leaves.map((leaf, li) => (
          <div key={li} className="mm4-leaf" style={{
            borderColor: c.border,
            transitionDelay: expanded ? `${li * 40}ms` : "0ms",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-8px)",
          }}>
            <span className="mm4-leaf__connector" style={{ background: c.border }} />
            <span className="mm4-leaf__text">{leaf.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ Main Component ═════════════════════════════════════ */
export default function InteractiveMindMap({ data, title }: { data: MindMapNode; title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSet, setExpandedSet] = useState<Set<number>>(() => new Set());
  const [focusIdx, setFocusIdx] = useState<number | null>(null);

  const branches = data.children ?? [];
  const totalNodes = useMemo(() => countAll(data), [data]);

  // Intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleBranch = useCallback((idx: number) => {
    setExpandedSet((prev) => {
      const n = new Set(prev);
      n.has(idx) ? n.delete(idx) : n.add(idx);
      return n;
    });
  }, []);

  const allExpanded = branches.every((_, i) => expandedSet.has(i));

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      setExpandedSet(new Set());
    } else {
      setExpandedSet(new Set(branches.map((_, i) => i)));
    }
    setFocusIdx(null);
  }, [allExpanded, branches]);

  return (
    <div
      ref={containerRef}
      className="mm4"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Header */}
      <div className="mm4__header">
        <div className="mm4__header-left">
          <div className="mm4__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="3.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="20.5" cy="12" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="12" cy="20.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="3.5" cy="12" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <path d="M12 8.5V5.5M15.5 12h3M12 15.5v3M8.5 12h-3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
          <div>
            <h3 className="mm4__title">{title ?? "Mapa Mental — Revisão"}</h3>
            <p className="mm4__subtitle">
              {branches.length} temas · {totalNodes} conceitos
            </p>
          </div>
        </div>
        <button className="mm4__btn" onClick={toggleAll}>
          {allExpanded ? "Recolher" : "Expandir tudo"}
        </button>
      </div>

      {/* Root node */}
      <div className="mm4__root">
        <div className="mm4__root-node">
          <div className="mm4__root-glow" />
          <span className="mm4__root-label">{data.label}</span>
        </div>
        <div className="mm4__root-line" />
      </div>

      {/* Branches grid */}
      <div className="mm4__grid">
        {branches.map((branch, i) => (
          <BranchCard
            key={i}
            branch={branch}
            index={i}
            expanded={expandedSet.has(i)}
            focused={focusIdx === i}
            dimmed={focusIdx !== null && focusIdx !== i}
            onToggle={() => toggleBranch(i)}
          />
        ))}
      </div>

      {/* Legend / quick filter */}
      <div className="mm4__footer">
        <div className="mm4__legend">
          {branches.map((b, i) => {
            const c = COLORS[i % COLORS.length];
            return (
              <button
                key={i}
                className={`mm4__tag${focusIdx === i ? " mm4__tag--active" : ""}`}
                style={{
                  borderColor: focusIdx === i ? c.solid : "var(--border)",
                  background: focusIdx === i ? c.bg : "transparent",
                  color: focusIdx === i ? c.text : "var(--muted)",
                }}
                onClick={() => setFocusIdx((p) => p === i ? null : i)}
              >
                <span className="mm4__tag-dot" style={{ background: c.solid }} />
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="mm4__hint">Clique nos temas para expandir · Tags filtram por ramo</p>
      </div>
    </div>
  );
}
