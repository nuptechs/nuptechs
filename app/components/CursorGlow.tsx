"use client";

import { useEffect, useRef } from "react";

/**
 * CursorGlow — Ambient spotlight that follows the cursor.
 * Uses CSS transform (GPU-accelerated) for zero-jank movement.
 * Hidden on touch devices via CSS.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${mx - 250}px, ${my - 250}px)`;
          raf = 0;
        });
      }
    };

    const onEnter = () => el.classList.add("cursor-glow--visible");
    const onLeave = () => el.classList.remove("cursor-glow--visible");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
