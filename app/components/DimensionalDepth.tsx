"use client";

import { useEffect, useRef } from "react";

/**
 * DimensionalDepth — Cards exist on different Z-planes.
 *
 * Adds perspective-based 3D depth to [data-depth] elements.
 * Mouse movement tilts the entire container, and each card has
 * its own Z-offset that creates volumetric layering.
 *
 * data-depth="1" = near (pops out), data-depth="3" = far (recessed)
 *
 * Cards on hover "leap" forward with shadow + scale.
 * Section transitions use clip-path morph + blur for portal effect.
 */

export default function DimensionalDepth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-depth]");

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
      mouseRef.current.ty = (e.clientY - rect.top) / rect.height;
    };

    const onLeave = () => {
      mouseRef.current.tx = 0.5;
      mouseRef.current.ty = 0.5;
    };

    container.addEventListener("mousemove", onMouse, { passive: true });
    container.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      const m = mouseRef.current;
      m.x = lerp(m.x, m.tx, 0.06);
      m.y = lerp(m.y, m.ty, 0.06);

      // Global tilt
      const rotX = (m.y - 0.5) * -8;  // degrees
      const rotY = (m.x - 0.5) * 8;

      container.style.setProperty("--d-rotX", `${rotX}deg`);
      container.style.setProperty("--d-rotY", `${rotY}deg`);

      elements.forEach((el) => {
        const depth = parseInt(el.dataset.depth || "2", 10);
        const z = (3 - depth) * 20; // depth 1 = +40px, depth 3 = 0px
        const parallax = (3 - depth) * 5;
        const tx = (m.x - 0.5) * parallax;
        const ty = (m.y - 0.5) * parallax;
        el.style.setProperty("--d-z", `${z}px`);
        el.style.setProperty("--d-tx", `${tx}px`);
        el.style.setProperty("--d-ty", `${ty}px`);
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMouse);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="dimensional-container">
      {/* Wrap children with this component or use as context */}
    </div>
  );
}

/**
 * DimensionalWrapper — Wrap around a grid of cards.
 * Children get perspective-based 3D tilt from mouse.
 */
export function DimensionalWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
      mouseRef.current.ty = (e.clientY - rect.top) / rect.height;
    };

    const onLeave = () => {
      mouseRef.current.tx = 0.5;
      mouseRef.current.ty = 0.5;
    };

    container.addEventListener("mousemove", onMouse, { passive: true });
    container.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      const m = mouseRef.current;
      m.x = lerp(m.x, m.tx, 0.06);
      m.y = lerp(m.y, m.ty, 0.06);

      const rotX = (m.y - 0.5) * -6;
      const rotY = (m.x - 0.5) * 6;

      container.style.setProperty("--d-rotX", `${rotX}deg`);
      container.style.setProperty("--d-rotY", `${rotY}deg`);

      const elements = container.querySelectorAll<HTMLElement>("[data-depth]");
      elements.forEach((el) => {
        const depth = parseInt(el.dataset.depth || "2", 10);
        const z = (3 - depth) * 18;
        const parallax = (3 - depth) * 4;
        const tx = (m.x - 0.5) * parallax;
        const ty = (m.y - 0.5) * parallax;
        el.style.setProperty("--d-z", `${z}px`);
        el.style.setProperty("--d-tx", `${tx}px`);
        el.style.setProperty("--d-ty", `${ty}px`);
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMouse);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="dimensional-wrapper" style={{ perspective: "1200px" }}>
      <div className="dimensional-inner" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
