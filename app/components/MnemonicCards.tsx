"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   MnemonicCards — Animated flashcard-based mnemonic system
   Features:
   • Visual acronym strip with color-coded letters
   • Flip cards with front (letter) / back (explanation)
   • Auto-play mode with timed reveals
   • Progress tracking
   • Keyboard navigation (← → Space)
   ═══════════════════════════════════════════════════════════ */

interface MnemonicBreakdown {
  letter: string;
  word: string;
  hint: string;
}

interface MnemonicData {
  acronym: string;
  breakdown: MnemonicBreakdown[];
}

const CARD_COLORS = [
  { bg: "#6366f1", light: "rgba(99,102,241,0.12)" },
  { bg: "#10b981", light: "rgba(16,185,129,0.12)" },
  { bg: "#f59e0b", light: "rgba(245,158,11,0.12)" },
  { bg: "#ec4899", light: "rgba(236,72,153,0.12)" },
  { bg: "#0ea5e9", light: "rgba(14,165,233,0.12)" },
  { bg: "#8b5cf6", light: "rgba(139,92,246,0.12)" },
  { bg: "#ef4444", light: "rgba(239,68,68,0.12)" },
  { bg: "#14b8a6", light: "rgba(20,184,166,0.12)" },
];

export default function MnemonicCards({ data }: { data: MnemonicData }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = data.breakdown.length;
  const allRevealed = revealedSet.size === total;

  // Visibility observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Toggle card
  const toggleCard = useCallback((idx: number) => {
    if (activeIndex === idx) {
      setActiveIndex(null);
    } else {
      setActiveIndex(idx);
      setRevealedSet((prev) => new Set(prev).add(idx));
    }
  }, [activeIndex]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    let currentIdx = 0;
    setActiveIndex(0);
    setRevealedSet(new Set([0]));

    autoPlayRef.current = setInterval(() => {
      currentIdx++;
      if (currentIdx >= total) {
        setIsAutoPlaying(false);
        return;
      }
      setActiveIndex(currentIdx);
      setRevealedSet((prev) => new Set(prev).add(currentIdx));
    }, 2000);

    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying, total]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isVisible) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev === null ? 0 : Math.min(prev + 1, total - 1);
          setRevealedSet((rs) => new Set(rs).add(next));
          return next;
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => prev === null ? 0 : Math.max(prev - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        if (activeIndex !== null) toggleCard(activeIndex);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isVisible, activeIndex, toggleCard, total]);

  const reset = () => {
    setActiveIndex(null);
    setRevealedSet(new Set());
    setIsAutoPlaying(false);
  };

  return (
    <div
      ref={containerRef}
      className={`mnemonic-v2${isVisible ? " mnemonic-v2--visible" : ""}`}
    >
      {/* Header */}
      <div className="mnemonic-v2__header">
        <div className="mnemonic-v2__header-left">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 21h6M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Técnica mnemônica</span>
        </div>
        <div className="mnemonic-v2__controls">
          <button
            className="mnemonic-v2__btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pausar" : "Auto-play"}
          >
            {isAutoPlaying ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1" /><rect x="9" y="2" width="4" height="12" rx="1" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z" /></svg>
            )}
            {isAutoPlaying ? "Pausar" : "Auto-play"}
          </button>
          {revealedSet.size > 0 && (
            <button className="mnemonic-v2__btn mnemonic-v2__btn--ghost" onClick={reset} aria-label="Resetar">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 2v5h5M14 14V9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.5 6.5A6 6 0 003 4l-1 3M2.5 9.5A6 6 0 0013 12l1-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Resetar
            </button>
          )}
        </div>
      </div>

      {/* Acronym strip */}
      <div className="mnemonic-v2__acronym" aria-label={`Acrônimo: ${data.acronym}`}>
        {data.breakdown.map((b, i) => {
          const color = CARD_COLORS[i % CARD_COLORS.length];
          const isActive = activeIndex === i;
          const isRevealed = revealedSet.has(i);

          return (
            <button
              key={i}
              className={`mnemonic-v2__acronym-letter${isActive ? " mnemonic-v2__acronym-letter--active" : ""}${isRevealed ? " mnemonic-v2__acronym-letter--revealed" : ""}`}
              style={{
                "--letter-color": color.bg,
                "--letter-light": color.light,
                animationDelay: `${i * 100 + 200}ms`,
              } as React.CSSProperties}
              onClick={() => toggleCard(i)}
              aria-label={`Letra ${b.letter}: ${b.word}`}
            >
              {b.letter}
            </button>
          );
        })}
      </div>

      {/* Flashcards */}
      <div className="mnemonic-v2__cards">
        {data.breakdown.map((b, i) => {
          const color = CARD_COLORS[i % CARD_COLORS.length];
          const isActive = activeIndex === i;
          const isRevealed = revealedSet.has(i);

          return (
            <button
              key={i}
              className={`mnemonic-v2__card${isActive ? " mnemonic-v2__card--active" : ""}${isRevealed && !isActive ? " mnemonic-v2__card--revealed" : ""}`}
              style={{
                "--card-color": color.bg,
                "--card-light": color.light,
                animationDelay: `${i * 80 + 300}ms`,
              } as React.CSSProperties}
              onClick={() => toggleCard(i)}
              aria-expanded={isActive}
              aria-label={`${b.letter} — ${b.word}`}
            >
              {/* Front face */}
              <div className="mnemonic-v2__card-front">
                <span className="mnemonic-v2__card-letter" style={{ background: color.bg }}>
                  {b.letter}
                </span>
                <div className="mnemonic-v2__card-preview">
                  <p className="mnemonic-v2__card-word">{b.word}</p>
                  {!isActive && <p className="mnemonic-v2__card-tap">Toque para expandir</p>}
                </div>
                <svg className="mnemonic-v2__card-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Back face (expanded) */}
              {isActive && (
                <div className="mnemonic-v2__card-back">
                  <div className="mnemonic-v2__card-divider" style={{ background: color.bg }} />
                  <p className="mnemonic-v2__card-hint">{b.hint}</p>
                  <div className="mnemonic-v2__card-number">
                    {i + 1} / {total}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mnemonic-v2__footer">
        <div className="mnemonic-v2__progress-bar">
          <div
            className="mnemonic-v2__progress-fill"
            style={{ width: `${(revealedSet.size / total) * 100}%` }}
          />
        </div>
        <span className="mnemonic-v2__progress-text">
          {allRevealed ? (
            <>✓ Memorização completa!</>
          ) : (
            <>{revealedSet.size} de {total} revelados</>
          )}
        </span>
      </div>

      <p className="mnemonic-v2__keyboard-hint">
        Use <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>Espaço</kbd> para expandir
      </p>
    </div>
  );
}
