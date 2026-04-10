"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * CodeGenesis v2 — Cinematic text materialization from cipher to reality.
 *
 * Five decode phases per character:
 *   1. Void        — invisible/blank shimmer
 *   2. Binary      — raw 01 data stream
 *   3. Cipher      — unicode symbols (▓░╬λΣΩ∞)
 *   4. Glitch      — near-match alphabet with color shift
 *   5. Lock-in     — correct char with brief glow pulse
 *
 * A scanline cursor sweeps left→right, characters resolve in its wake.
 * Each char gets an individual per-char <span> for color/glow control.
 *
 * Speeds: data-genesis="fast" (~1.2s), default (~2.5s), "slow" (~4s), "dramatic" (~6s)
 *
 * Zero dependencies. Pure DOM + CSS.
 */

const CIPHER = "█▓▒░╬◆▲●◀▶∆∇λΣΩπ∞≈≠±×÷√∫∂αβγδεζηθφψω";
const BINARY = "01";
const BLOCKS = "░▒▓█";

interface CharState {
  phase: "void" | "binary" | "cipher" | "glitch" | "lockin" | "done";
  char: string;
  original: string;
}

const SPEED_CONFIG: Record<string, { passes: number; ms: number; stagger: number }> = {
  fast:     { passes: 18, ms: 45,  stagger: 150 },
  default:  { passes: 35, ms: 45,  stagger: 200 },
  slow:     { passes: 55, ms: 50,  stagger: 280 },
  dramatic: { passes: 80, ms: 50,  stagger: 350 },
};

export default function CodeGenesis() {
  const processedRef = useRef(new Set<Element>());

  const decodeElement = useCallback((el: HTMLElement) => {
    const original = el.dataset.genesisText || el.textContent || "";
    if (!original.trim()) return;

    if (!el.dataset.genesisText) {
      el.dataset.genesisText = original;
    }

    const speed = el.dataset.genesis || "default";
    const cfg = SPEED_CONFIG[speed] || SPEED_CONFIG.default;

    const chars = original.split("");
    const totalChars = chars.filter((c) => c !== " " && c !== "\n").length;

    // Build per-character spans for individual control
    el.innerHTML = "";
    const spans: HTMLSpanElement[] = [];
    chars.forEach((ch) => {
      const span = document.createElement("span");
      if (ch === " ") {
        span.innerHTML = "&nbsp;";
        span.className = "genesis-space";
      } else if (ch === "\n") {
        el.appendChild(document.createElement("br"));
        return;
      } else {
        span.textContent = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
        span.className = "genesis-char genesis-phase-void";
      }
      spans.push(span);
      el.appendChild(span);
    });

    // Each character resolves at a different frame — wave sweep left→right
    let charIdx = 0;
    const resolveFrame = spans.map((span) => {
      if (span.className === "genesis-space") return -1;
      const progress = charIdx / totalChars;
      charIdx++;
      // Wave: characters resolve in a sweep with gaussian jitter
      const base = Math.floor(progress * cfg.passes * 0.65);
      const jitter = Math.floor((Math.random() - 0.3) * cfg.passes * 0.15);
      return Math.max(1, base + jitter);
    });

    let pass = 0;
    let cursorPos = -1; // scanline position (0 → totalChars)

    const tick = () => {
      cursorPos = (pass / cfg.passes) * totalChars;

      let allDone = true;
      let nonSpaceIdx = 0;

      spans.forEach((span, i) => {
        if (span.className === "genesis-space") return;
        const ch = chars[i];
        const rf = resolveFrame[i];
        const distFromCursor = nonSpaceIdx - cursorPos;
        nonSpaceIdx++;

        // Already resolved
        if (span.dataset.done) return;

        allDone = false;

        // Phase transitions based on pass relative to this char's resolve frame
        if (pass < rf * 0.3) {
          // Phase 1: VOID — flickering blocks
          if (Math.random() > 0.6) {
            span.textContent = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
          }
          span.className = "genesis-char genesis-phase-void";
        } else if (pass < rf * 0.55) {
          // Phase 2: BINARY — raw data stream
          span.textContent = BINARY[Math.floor(Math.random() * 2)];
          span.className = "genesis-char genesis-phase-binary";
        } else if (pass < rf * 0.85) {
          // Phase 3: CIPHER — symbols cycling
          span.textContent = CIPHER[Math.floor(Math.random() * CIPHER.length)];
          span.className = "genesis-char genesis-phase-cipher";
        } else if (pass < rf + 3) {
          // Phase 4: GLITCH — near the real character
          const code = ch.charCodeAt(0);
          const offset = Math.floor(Math.random() * 7) - 3;
          span.textContent = String.fromCharCode(Math.max(33, code + offset));
          span.className = "genesis-char genesis-phase-glitch";
        } else {
          // Phase 5: LOCK-IN — correct character with glow
          span.textContent = ch;
          span.className = "genesis-char genesis-phase-lockin";
          span.dataset.done = "1";

          // Remove glow after pulse
          setTimeout(() => {
            span.className = "genesis-char genesis-phase-done";
          }, 400);
        }

        // Scanline proximity glow — chars near cursor get brighter
        if (!span.dataset.done && Math.abs(distFromCursor) < 3) {
          span.classList.add("genesis-scanline");
        } else {
          span.classList.remove("genesis-scanline");
        }
      });

      pass++;

      if (allDone || pass > cfg.passes * 2) {
        // Final cleanup — ensure perfect text
        el.innerHTML = "";
        el.textContent = original;
        el.classList.remove("genesis-active");
        el.classList.add("genesis-decoded");
      } else {
        requestAnimationFrame(() => setTimeout(tick, cfg.ms));
      }
    };

    el.classList.add("genesis-active");
    tick();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !processedRef.current.has(entry.target)) {
            processedRef.current.add(entry.target);
            const parent = entry.target.parentElement;
            const siblings = parent?.querySelectorAll("[data-genesis]");
            let index = 0;
            if (siblings) {
              siblings.forEach((sib, i) => {
                if (sib === entry.target) index = i;
              });
            }
            const speed = (entry.target as HTMLElement).dataset.genesis || "default";
            const stagger = SPEED_CONFIG[speed]?.stagger || 200;
            setTimeout(() => {
              decodeElement(entry.target as HTMLElement);
            }, index * stagger);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll("[data-genesis]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [decodeElement]);

  return null;
}
