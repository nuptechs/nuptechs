"use client";

/* ═══════════════════════════════════════════════════════════
   DepthSelector — Global depth level picker for articles
   Shows pill buttons: Visão Geral / Prático / Técnico / Completo
   Persists selection in localStorage.
   ═══════════════════════════════════════════════════════════ */

const DEPTH_CONFIG = [
  { depth: 0, icon: "🎯", label: "Visão Geral",        shortLabel: "Geral" },
  { depth: 1, icon: "🔍", label: "Prático",             shortLabel: "Prático" },
  { depth: 2, icon: "⚙️", label: "Técnico",            shortLabel: "Técnico" },
  { depth: 3, icon: "🔬", label: "Profundidade Total",  shortLabel: "Completo" },
] as const;

interface DepthSelectorProps {
  maxDepth: number;
  activeDepth: number;
  onDepthChange: (depth: number) => void;
  readTimeByDepth?: Record<number, string>;
}

export default function DepthSelector({
  maxDepth,
  activeDepth,
  onDepthChange,
  readTimeByDepth,
}: DepthSelectorProps) {
  const availableDepths = DEPTH_CONFIG.filter((d) => d.depth <= maxDepth);

  return (
    <div className="depth-selector" role="radiogroup" aria-label="Nível de profundidade">
      <div className="depth-selector__header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Escolha a profundidade</span>
      </div>
      <div className="depth-selector__pills">
        {availableDepths.map((d) => (
          <button
            key={d.depth}
            role="radio"
            aria-checked={activeDepth === d.depth}
            className={`depth-selector__pill depth-selector__pill--${d.depth}${activeDepth === d.depth ? " depth-selector__pill--active" : ""}`}
            onClick={() => onDepthChange(d.depth)}
          >
            <span className="depth-selector__pill-icon" aria-hidden="true">{d.icon}</span>
            <span className="depth-selector__pill-label">{d.label}</span>
            <span className="depth-selector__pill-label--short">{d.shortLabel}</span>
            {readTimeByDepth?.[d.depth] && (
              <span className="depth-selector__pill-time">{readTimeByDepth[d.depth]}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export { DEPTH_CONFIG };
