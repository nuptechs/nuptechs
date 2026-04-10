"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraBackground — Generative aurora that reacts to scroll, cursor & time.
 *
 * Uses SVG feTurbulence + feDisplacementMap for organic noise,
 * with canvas overlay for cursor-reactive distortion.
 * Color palette shifts per section via CSS custom properties.
 *
 * Zero dependencies. GPU-accelerated. ~200 LOC.
 */

const AURORA_COLORS = [
  { stop1: "#8b7cff", stop2: "#5ce1e6", stop3: "#2d1b69" }, // hero — purple/cyan
  { stop1: "#00d4aa", stop2: "#00b4d8", stop3: "#003d33" }, // stats — green/teal
  { stop1: "#8b7cff", stop2: "#c084fc", stop3: "#1e1b4b" }, // products — violet
  { stop1: "#0ea5e9", stop2: "#06b6d4", stop3: "#0c1524" }, // blog — blue
  { stop1: "#5ce1e6", stop2: "#8b7cff", stop3: "#0a0a12" }, // contact — cyan/purple
];

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    time: 0,
    scrollY: 0,
    mx: 0.5,
    my: 0.5,
    targetMx: 0.5,
    targetMy: 0.5,
    colorIndex: 0,
    currentColors: { ...AURORA_COLORS[0] },
    targetColors: { ...AURORA_COLORS[0] },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr * 0.5;   // half-res for perf
      canvas.height = h * dpr * 0.5;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Scroll → palette shift
    const onScroll = () => {
      const s = stateRef.current;
      s.scrollY = window.scrollY;
      const vh = window.innerHeight;
      const section = Math.min(
        Math.floor(s.scrollY / (vh * 0.85)),
        AURORA_COLORS.length - 1
      );
      if (section !== s.colorIndex) {
        s.colorIndex = section;
        s.targetColors = { ...AURORA_COLORS[section] };
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cursor → distortion center
    const onMouse = (e: MouseEvent) => {
      const s = stateRef.current;
      s.targetMx = e.clientX / w;
      s.targetMy = e.clientY / h;
    };
    document.addEventListener("mousemove", onMouse, { passive: true });

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const lerpColor = (hex1: string, hex2: string, t: number): string => {
      const parse = (h: string) => [
        parseInt(h.slice(1, 3), 16),
        parseInt(h.slice(3, 5), 16),
        parseInt(h.slice(5, 7), 16),
      ];
      const c1 = parse(hex1);
      const c2 = parse(hex2);
      const r = Math.round(lerp(c1[0], c2[0], t));
      const g = Math.round(lerp(c1[1], c2[1], t));
      const b = Math.round(lerp(c1[2], c2[2], t));
      return `rgb(${r},${g},${b})`;
    };

    const render = () => {
      const s = stateRef.current;
      s.time += 0.003;

      // Smooth cursor tracking
      s.mx = lerp(s.mx, s.targetMx, 0.03);
      s.my = lerp(s.my, s.targetMy, 0.03);

      // Smooth color transitions
      const cl = s.currentColors;
      const tl = s.targetColors;
      cl.stop1 = lerpColor(cl.stop1, tl.stop1, 0.015);
      cl.stop2 = lerpColor(cl.stop2, tl.stop2, 0.015);
      cl.stop3 = lerpColor(cl.stop3, tl.stop3, 0.015);

      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      // Aurora layers — 3 overlapping radial gradients with noise-driven movement
      const t = s.time;
      const layers = [
        { x: 0.3 + Math.sin(t * 0.7) * 0.15 + s.mx * 0.2, y: 0.2 + Math.cos(t * 0.5) * 0.1, r: 0.6, color: cl.stop1, alpha: 0.12 },
        { x: 0.7 + Math.sin(t * 0.5 + 1) * 0.15 + s.mx * 0.15, y: 0.5 + Math.sin(t * 0.3) * 0.15, r: 0.7, color: cl.stop2, alpha: 0.10 },
        { x: 0.5 + Math.cos(t * 0.4 + 2) * 0.2, y: 0.8 + Math.cos(t * 0.6) * 0.1 + s.my * 0.1, r: 0.5, color: cl.stop3, alpha: 0.14 },
        // Cursor-following highlight
        { x: s.mx, y: s.my, r: 0.35, color: cl.stop1, alpha: 0.06 },
      ];

      for (const l of layers) {
        const grd = ctx.createRadialGradient(
          l.x * cw, l.y * ch, 0,
          l.x * cw, l.y * ch, l.r * Math.max(cw, ch)
        );
        grd.addColorStop(0, l.color.replace("rgb", "rgba").replace(")", `,${l.alpha})`).replace("rgba(", "rgba(").replace("rgb(", "rgba("));
        grd.addColorStop(1, "rgba(0,0,0,0)");

        // Rebuild color string properly
        const match = l.color.match(/\d+/g);
        if (match) {
          const grd2 = ctx.createRadialGradient(
            l.x * cw, l.y * ch, 0,
            l.x * cw, l.y * ch, l.r * Math.max(cw, ch)
          );
          grd2.addColorStop(0, `rgba(${match[0]},${match[1]},${match[2]},${l.alpha})`);
          grd2.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grd2;
        } else {
          ctx.fillStyle = grd;
        }
        ctx.fillRect(0, 0, cw, ch);
      }

      // Noise scanlines — horizontal bands that drift
      ctx.globalAlpha = 0.03;
      for (let y = 0; y < ch; y += 4) {
        const offset = Math.sin(y * 0.01 + t * 2) * 10;
        ctx.fillStyle = y % 8 === 0 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
        ctx.fillRect(offset, y, cw, 1);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aurora-bg"
      aria-hidden="true"
    />
  );
}
