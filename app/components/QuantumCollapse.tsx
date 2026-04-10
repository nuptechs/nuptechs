"use client";

import { useEffect, useRef } from "react";

/**
 * QuantumCollapse — Elements near cursor "collapse from superposition".
 *
 * All [data-quantum] elements start blurred/ghostly. As cursor approaches,
 * they sharpen, gain color, and connecting lines appear between nearby
 * collapsed elements — like a quantum field resolving into reality.
 *
 * Uses CSS custom properties for per-element proximity state.
 * Zero dependencies. GPU-accelerated blur via CSS filter.
 */

const COLLAPSE_RADIUS = 280; // px — distance at which collapse begins
const FULL_COLLAPSE = 80;    // px — fully resolved at this distance

export default function QuantumCollapse() {
  const elementsRef = useRef<HTMLElement[]>([]);
  const linesCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = linesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Re-collect elements periodically (SPA navigation)
    const collectElements = () => {
      elementsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-quantum]")
      );
    };
    collectElements();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);

    // Also recollect after DOM settles
    const mutObserver = new MutationObserver(() => {
      collectElements();
      resize();
    });
    mutObserver.observe(document.body, { childList: true, subtree: true });

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY + window.scrollY;
    };
    document.addEventListener("mousemove", onMouse, { passive: true });

    const update = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const collapsed: { x: number; y: number; strength: number }[] = [];

      for (const el of elementsRef.current) {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2 + window.scrollY;
        const dist = Math.hypot(mx - elX, my - elY);

        // Calculate collapse strength (0 = superposed, 1 = fully collapsed)
        let strength = 0;
        if (dist < COLLAPSE_RADIUS) {
          strength = Math.min(1, (COLLAPSE_RADIUS - dist) / (COLLAPSE_RADIUS - FULL_COLLAPSE));
          strength = strength * strength; // ease-in
        }

        el.style.setProperty("--q-strength", strength.toFixed(3));

        if (strength > 0.1) {
          collapsed.push({ x: elX, y: elY - window.scrollY, strength });
        }
      }

      // Draw connection lines between collapsed elements
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < collapsed.length; i++) {
        for (let j = i + 1; j < collapsed.length; j++) {
          const a = collapsed[i];
          const b = collapsed[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 300) continue;

          const lineStrength = Math.min(a.strength, b.strength) * (1 - d / 300);
          if (lineStrength < 0.05) continue;

          ctx.strokeStyle = `rgba(139, 124, 255, ${lineStrength * 0.3})`;
          ctx.lineWidth = lineStrength * 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // Energy pulse dot at midpoint
          if (lineStrength > 0.3) {
            const pulse = (Math.sin(Date.now() * 0.005 + i + j) + 1) / 2;
            const px = a.x + (b.x - a.x) * pulse;
            const py = a.y + (b.y - a.y) * pulse;
            ctx.fillStyle = `rgba(92, 225, 230, ${lineStrength * 0.5})`;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouse);
      resizeObserver.disconnect();
      mutObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={linesCanvasRef}
      className="quantum-lines"
      aria-hidden="true"
    />
  );
}
