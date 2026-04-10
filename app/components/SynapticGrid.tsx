"use client";

import { useEffect, useRef } from "react";

/**
 * SynapticGrid — Living neural network background.
 *
 * Nodes pulse and fire signals through connections.
 * Mouse interaction triggers new synapse activations.
 * Network topology clusters around content areas.
 *
 * Zero dependencies. Canvas-based. ~180 LOC.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number;      // 0-1, drives glow
  targetEnergy: number;
  connections: number[];
}

interface Signal {
  from: number;
  to: number;
  progress: number;  // 0-1
  speed: number;
}

export default function SynapticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Generate nodes
    const NODE_COUNT = Math.min(80, Math.floor((w * h) / 12000));
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
        energy: Math.random() * 0.3,
        targetEnergy: 0,
        connections: [],
      });
    }

    // Build connections — each node connects to 2-4 nearest
    const CONNECTION_DIST = Math.min(w, h) * 0.25;
    for (let i = 0; i < nodes.length; i++) {
      const distances: { idx: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < CONNECTION_DIST) distances.push({ idx: j, d });
      }
      distances.sort((a, b) => a.d - b.d);
      nodes[i].connections = distances.slice(0, 3 + Math.floor(Math.random() * 2)).map(d => d.idx);
    }

    const signals: Signal[] = [];
    let lastSignalTime = 0;

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouse, { passive: true });
    canvas.addEventListener("mouseleave", () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    });

    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        // Mouse proximity boosts energy
        if (mx > 0) {
          const d = Math.hypot(mx - node.x, my - node.y);
          if (d < 150) {
            node.targetEnergy = Math.max(node.targetEnergy, 1 - d / 150);
          }
        }

        // Natural energy decay
        node.targetEnergy *= 0.98;
        node.energy += (node.targetEnergy - node.energy) * 0.08;
      }

      // Spawn random signals
      if (time - lastSignalTime > 500) {
        lastSignalTime = time;
        const from = Math.floor(Math.random() * nodes.length);
        if (nodes[from].connections.length > 0) {
          const to = nodes[from].connections[Math.floor(Math.random() * nodes[from].connections.length)];
          signals.push({ from, to, progress: 0, speed: 0.015 + Math.random() * 0.01 });
          nodes[from].targetEnergy = 1;
        }
      }

      // Mouse triggers signals from nearest node
      if (mx > 0 && time - lastSignalTime > 200) {
        let nearest = -1;
        let nearDist = Infinity;
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(mx - nodes[i].x, my - nodes[i].y);
          if (d < nearDist && d < 120) { nearest = i; nearDist = d; }
        }
        if (nearest >= 0 && nodes[nearest].connections.length > 0) {
          const to = nodes[nearest].connections[Math.floor(Math.random() * nodes[nearest].connections.length)];
          signals.push({ from: nearest, to, progress: 0, speed: 0.025 });
          nodes[nearest].targetEnergy = 1;
          lastSignalTime = time;
        }
      }

      // Draw connections
      for (const node of nodes) {
        for (const ci of node.connections) {
          const other = nodes[ci];
          const alpha = Math.max(node.energy, other.energy) * 0.24 + 0.05;
          ctx.strokeStyle = `rgba(139, 124, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          nodes[sig.to].targetEnergy = 0.8;
          // Chain reaction — signal continues
          if (Math.random() < 0.4 && nodes[sig.to].connections.length > 0) {
            const next = nodes[sig.to].connections[Math.floor(Math.random() * nodes[sig.to].connections.length)];
            if (next !== sig.from) {
              signals.push({ from: sig.to, to: next, progress: 0, speed: sig.speed * 0.9 });
            }
          }
          signals.splice(i, 1);
          continue;
        }

        const a = nodes[sig.from];
        const b = nodes[sig.to];
        const px = a.x + (b.x - a.x) * sig.progress;
        const py = a.y + (b.y - a.y) * sig.progress;

        // Glowing signal dot
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, "rgba(92, 225, 230, 0.8)");
        grd.addColorStop(0.5, "rgba(139, 124, 255, 0.3)");
        grd.addColorStop(1, "rgba(139, 124, 255, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        ctx.strokeStyle = `rgba(92, 225, 230, ${0.4 * (1 - sig.progress)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const trailStart = Math.max(0, sig.progress - 0.15);
        ctx.moveTo(
          a.x + (b.x - a.x) * trailStart,
          a.y + (b.y - a.y) * trailStart
        );
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const glow = node.energy;

        // Outer glow
        if (glow > 0.1) {
          const grd = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 6
          );
          grd.addColorStop(0, `rgba(139, 124, 255, ${glow * 0.3})`);
          grd.addColorStop(1, "rgba(139, 124, 255, 0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = `rgba(${92 + glow * 47}, ${225 - glow * 100}, ${230 + glow * 25}, ${0.4 + glow * 0.6})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + glow * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Cap signals to prevent runaway
      if (signals.length > 30) signals.splice(0, signals.length - 30);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="synaptic-grid"
      aria-hidden="true"
    />
  );
}
