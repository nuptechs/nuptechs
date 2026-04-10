"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * CodeGenesis — Content materializes from cipher/scramble into real text.
 *
 * Elements with [data-genesis] have their text scrambled when entering
 * the viewport, then progressively decoded character by character.
 * Each character cycles through multiple cipher passes before resolving.
 *
 * Supports: headings, paragraphs, spans, badges.
 * Set data-genesis="fast" for shorter decode, data-genesis="slow" for dramatic.
 *
 * Zero dependencies. ~120 LOC.
 */

const CIPHER_CHARS = "█▓▒░╬◆▲●◀▶∆∇λΣΩπ∞≈≠±×÷√∫∂αβγδεζηθ01";
const BINARY_CHARS = "01";

export default function CodeGenesis() {
  const processedRef = useRef(new Set<Element>());

  const decodeElement = useCallback((el: HTMLElement) => {
    const original = el.dataset.genesisText || el.textContent || "";
    if (!original.trim()) return;

    // Store original text on first encounter
    if (!el.dataset.genesisText) {
      el.dataset.genesisText = original;
    }

    const speed = el.dataset.genesis;
    const totalPasses = speed === "fast" ? 4 : speed === "slow" ? 12 : 7;
    const msPerPass = speed === "fast" ? 30 : speed === "slow" ? 55 : 40;

    const chars = original.split("");
    let pass = 0;

    // Each character has its own "resolve frame" — staggered cascade
    const resolveAt = chars.map((_, i) => {
      // Characters resolve from left to right with some randomness
      const base = Math.floor((i / chars.length) * totalPasses * 0.8);
      const jitter = Math.floor(Math.random() * 3);
      return base + jitter;
    });

    const tick = () => {
      const display = chars.map((ch, i) => {
        if (ch === " " || ch === "\n") return ch;
        if (pass >= resolveAt[i] + totalPasses * 0.3) return ch;

        // Phase 1: binary
        if (pass < resolveAt[i] * 0.4) {
          return BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)];
        }
        // Phase 2: cipher symbols
        if (pass < resolveAt[i]) {
          return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
        // Phase 3: near-match (wrong character from original alphabet)
        if (pass < resolveAt[i] + totalPasses * 0.2) {
          const code = ch.charCodeAt(0);
          const offset = Math.floor(Math.random() * 5) - 2;
          return String.fromCharCode(code + offset);
        }
        return ch;
      });

      el.textContent = display.join("");
      pass++;

      if (pass < totalPasses + Math.max(...resolveAt) + 4) {
        setTimeout(tick, msPerPass);
      } else {
        el.textContent = original;
        el.classList.add("genesis-decoded");
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
            // Small delay for stagger between multiple elements
            const siblings = entry.target.parentElement?.querySelectorAll("[data-genesis]");
            let index = 0;
            if (siblings) {
              siblings.forEach((sib, i) => {
                if (sib === entry.target) index = i;
              });
            }
            setTimeout(() => {
              decodeElement(entry.target as HTMLElement);
            }, index * 120);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-genesis]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [decodeElement]);

  return null;
}
