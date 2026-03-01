"use client";

import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   DepthExpander — Inline expandable card for deeper content
   Shows a teaser card "🔍 Aprofundar: {heading}" that
   expands inline to show the deeper section content.
   ═══════════════════════════════════════════════════════════ */

const DEPTH_STYLE: Record<number, { icon: string; label: string; className: string }> = {
  1: { icon: "🔍", label: "Aprofundar",         className: "depth-expander--1" },
  2: { icon: "⚙️", label: "Detalhe técnico",    className: "depth-expander--2" },
  3: { icon: "🔬", label: "Profundidade total",  className: "depth-expander--3" },
};

interface DepthExpanderProps {
  depth: number;
  heading: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function DepthExpander({
  depth,
  heading,
  content,
  isExpanded,
  onToggle,
}: DepthExpanderProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [content, isExpanded]);

  const style = DEPTH_STYLE[depth] ?? DEPTH_STYLE[1];

  return (
    <div className={`depth-expander ${style.className}${isExpanded ? " depth-expander--open" : ""}`}>
      <button
        className="depth-expander__trigger"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`depth-content-${heading.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="depth-expander__icon" aria-hidden="true">{style.icon}</span>
        <span className="depth-expander__label">
          {style.label}: <strong>{heading}</strong>
        </span>
        <svg
          className={`depth-expander__chevron${isExpanded ? " depth-expander__chevron--open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div
        className="depth-expander__content"
        id={`depth-content-${heading.replace(/\s+/g, "-").toLowerCase()}`}
        style={{ maxHeight: isExpanded ? `${height + 32}px` : "0px" }}
      >
        <div ref={contentRef} className="depth-expander__inner">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}
