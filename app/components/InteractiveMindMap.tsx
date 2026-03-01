"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════
   InteractiveMindMap v3 — Force-directed, collision-free,
   progressive-reveal mind map.

   Key fixes over previous version:
   - Visibility controlled via React state (not CSS animations
     on SVG <g> which fail across browsers)
   - SVG has explicit height so canvas never collapses
   - Wheel zoom uses non-passive listener via ref
   ═══════════════════════════════════════════════════════════ */

const BRANCH_COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ec4899",
  "#0ea5e9", "#8b5cf6", "#ef4444", "#14b8a6",
];

/* ─── Layout Node ──────────────────────────────────────── */
interface LNode {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  children: LNode[];
  depth: number;
  branchIndex: number;
  hiddenCount: number;
}

/* ─── Force Simulation ─────────────────────────────────── */
function runForce(root: LNode, iterations = 70) {
  const flat: LNode[] = [];
  const edges: [LNode, LNode][] = [];
  (function collect(n: LNode, p?: LNode) {
    flat.push(n);
    if (p) edges.push([p, n]);
    n.children.forEach((c) => collect(c, n));
  })(root);

  if (flat.length <= 1) return;

  const vx = new Float64Array(flat.length);
  const vy = new Float64Array(flat.length);
  const idxMap = new Map(flat.map((n, i) => [n.id, i]));

  for (let it = 0; it < iterations; it++) {
    // Repulsion — all pairs
    for (let i = 0; i < flat.length; i++) {
      for (let j = i + 1; j < flat.length; j++) {
        const a = flat[i], b = flat[j];
        const dx = b.x - a.x || 0.01, dy = b.y - a.y || 0.01;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 600) continue;
        const f = 3200 / (dist * dist + 1);
        const fx = (dx / dist) * f, fy = (dy / dist) * f;
        vx[i] -= fx; vy[i] -= fy;
        vx[j] += fx; vy[j] += fy;
      }
    }
    // Spring — along edges
    for (const [a, b] of edges) {
      const ai = idxMap.get(a.id)!, bi = idxMap.get(b.id)!;
      const dx = b.x - a.x || 0.01, dy = b.y - a.y || 0.01;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ideal = a.depth === 0 ? 200 : 150;
      const disp = dist - ideal;
      const str = 0.07;
      const fx = (dx / dist) * disp * str, fy = (dy / dist) * disp * str;
      vx[ai] += fx; vy[ai] += fy;
      vx[bi] -= fx; vy[bi] -= fy;
    }
    // Apply velocities
    for (let i = 0; i < flat.length; i++) {
      if (flat[i].depth === 0) { vx[i] = 0; vy[i] = 0; continue; }
      flat[i].x += vx[i] * 0.85;
      flat[i].y += vy[i] * 0.85;
      vx[i] *= 0.86;
      vy[i] *= 0.86;
    }
  }
}

/* ─── Helpers ──────────────────────────────────────────── */
function countDesc(node: MindMapNode): number {
  if (!node.children) return 0;
  return node.children.reduce((s, c) => s + 1 + countDesc(c), 0);
}

function buildLayout(data: MindMapNode, expandedIds: Set<string>): LNode {
  function build(
    node: MindMapNode, id: string, depth: number, branchIdx: number,
    px: number, py: number, angle: number, dist: number
  ): LNode {
    const x = depth === 0 ? 0 : px + Math.cos(angle) * dist;
    const y = depth === 0 ? 0 : py + Math.sin(angle) * dist;
    const r = depth === 0 ? 44 : depth === 1 ? 32 : 22;
    const expanded = depth === 0 || expandedIds.has(id);
    const kids: LNode[] = [];

    if (node.children && expanded) {
      const n = node.children.length;
      const spread = depth === 0 ? 2 * Math.PI : Math.min(Math.PI * 0.9, n * 0.45);
      const start = depth === 0 ? -Math.PI / 2 : angle - spread / 2;
      const cDist = depth === 0 ? 210 : 160;
      node.children.forEach((child, i) => {
        const cAngle = n > 1 ? start + (spread / (n - 1)) * i : angle;
        kids.push(build(child, `${id}-${i}`, depth + 1, depth === 0 ? i : branchIdx, x, y, cAngle, cDist));
      });
    }

    const hidden = node.children && !expanded && depth > 0 ? countDesc(node) : 0;
    return { id, label: node.label, x, y, radius: r, children: kids, depth, branchIndex: branchIdx, hiddenCount: hidden };
  }
  const tree = build(data, "n-0", 0, 0, 0, 0, 0, 0);
  runForce(tree, 70);
  return tree;
}

function getBounds(tree: LNode) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  (function walk(n: LNode) {
    const pad = n.depth >= 2 ? n.radius + 110 : n.radius + 65;
    x1 = Math.min(x1, n.x - pad); y1 = Math.min(y1, n.y - pad);
    x2 = Math.max(x2, n.x + pad); y2 = Math.max(y2, n.y + pad);
    n.children.forEach(walk);
  })(tree);
  return { x1, y1, w: x2 - x1, h: y2 - y1 };
}

/* ─── Wrap text for inside-circle labels ───────────────── */
function wrapLabel(s: string, maxChars: number, maxLines: number): string[] {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (test.length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + "…";
  }
  return lines;
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export default function InteractiveMindMap({ data, title }: { data: MindMapNode; title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focusBranch, setFocusBranch] = useState<number | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(["n-0"]));
  const [vb, setVb] = useState({ x: -500, y: -400, w: 1000, h: 800 });
  const [panning, setPanning] = useState(false);
  const panStart = useRef({ cx: 0, cy: 0, vx: 0, vy: 0 });

  const tree = useMemo(() => buildLayout(data, expandedIds), [data, expandedIds]);

  // Auto-fit viewBox
  const fitView = useCallback(() => {
    const b = getBounds(tree);
    const pad = 90;
    setVb({ x: b.x1 - pad, y: b.y1 - pad, w: b.w + pad * 2, h: b.h + pad * 2 });
  }, [tree]);

  useEffect(() => { fitView(); }, [fitView]);

  // Intersection observer for animate-in
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Wheel zoom — must use non-passive listener to preventDefault
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const f = e.deltaY > 0 ? 1.1 : 0.91;
      setVb((v) => {
        const cx = v.x + v.w / 2, cy = v.y + v.h / 2;
        const nw = v.w * f, nh = v.h * f;
        return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
      });
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // Toggle branch expand/collapse
  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        for (const k of n) { if (k === id || k.startsWith(id + "-")) n.delete(k); }
      } else {
        n.add(id);
      }
      return n;
    });
  }, []);

  // Expand / collapse all
  const allIds = useMemo(() => {
    const ids: string[] = [];
    (function collect(node: MindMapNode, prefix: string) {
      ids.push(prefix);
      node.children?.forEach((c, i) => collect(c, `${prefix}-${i}`));
    })(data, "n-0");
    return ids;
  }, [data]);

  const allExpanded = allIds.every((id) => expandedIds.has(id));

  const toggleAll = useCallback(() => {
    setExpandedIds(allExpanded ? new Set(["n-0"]) : new Set(allIds));
    setFocusBranch(null);
  }, [allExpanded, allIds]);

  // Pan handlers
  const onPanStart = useCallback((cx: number, cy: number) => {
    setPanning(true);
    panStart.current = { cx, cy, vx: vb.x, vy: vb.y };
  }, [vb.x, vb.y]);

  const onPanMove = useCallback((cx: number, cy: number) => {
    if (!panning || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sx = vb.w / rect.width, sy = vb.h / rect.height;
    const dx = (cx - panStart.current.cx) * sx;
    const dy = (cy - panStart.current.cy) * sy;
    setVb((v) => ({ ...v, x: panStart.current.vx - dx, y: panStart.current.vy - dy }));
  }, [panning, vb.w, vb.h]);

  const onPanEnd = useCallback(() => setPanning(false), []);

  // Flatten tree for rendering
  const { edges, nodes } = useMemo(() => {
    const eList: { x1: number; y1: number; x2: number; y2: number; color: string; bi: number }[] = [];
    const nList: LNode[] = [];
    (function walk(n: LNode) {
      nList.push(n);
      n.children.forEach((ch) => {
        const cc = BRANCH_COLORS[ch.branchIndex % BRANCH_COLORS.length];
        eList.push({ x1: n.x, y1: n.y, x2: ch.x, y2: ch.y, color: cc, bi: ch.branchIndex });
        walk(ch);
      });
    })(tree);
    return { edges: eList, nodes: nList };
  }, [tree]);

  const branches = useMemo(() =>
    (data.children ?? []).map((c, i) => ({
      label: c.label, color: BRANCH_COLORS[i % BRANCH_COLORS.length], idx: i,
      count: c.children?.length ?? 0,
    })),
  [data]);

  // Visibility: fade whole SVG content via opacity on the <g> wrapper
  const contentOpacity = isVisible ? 1 : 0;

  return (
    <div ref={containerRef} className="mm3" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      {/* Header */}
      <div className="mm3__header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="21" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="12" cy="21" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
          <path d="M12 9V3M15 12h6M12 15v6M9 12H3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
        <span>{title ?? "Mapa Mental — Ferramenta de Revisão"}</span>
        <div className="mm3__actions">
          <button className="mm3__btn mm3__btn--icon" onClick={fitView} aria-label="Centralizar" title="Centralizar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          </button>
          <button className="mm3__btn" onClick={toggleAll}>
            {allExpanded ? "Recolher" : "Expandir tudo"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="mm3__canvas"
        onMouseDown={(e) => { if (e.button === 0) onPanStart(e.clientX, e.clientY); }}
        onMouseMove={(e) => onPanMove(e.clientX, e.clientY)}
        onMouseUp={onPanEnd} onMouseLeave={onPanEnd}
        onTouchStart={(e) => { if (e.touches.length === 1) onPanStart(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={(e) => { if (e.touches.length === 1) onPanMove(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={onPanEnd}
        style={{ cursor: panning ? "grabbing" : "grab" }}
      >
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          width="100%" height="100%"
          preserveAspectRatio="xMidYMid meet"
          aria-label={`Mapa mental: ${data.label}`} role="img"
          style={{ display: "block", touchAction: "none", minHeight: 380 }}
        >
          <defs>
            {BRANCH_COLORS.map((c, i) => (
              <radialGradient key={i} id={`mm3g${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c} stopOpacity={0.08} />
                <stop offset="100%" stopColor={c} stopOpacity={0} />
              </radialGradient>
            ))}
          </defs>

          <g style={{ opacity: contentOpacity, transition: "opacity 0.5s ease" }}>
            {/* Branch halos */}
            {tree.children.map((b, i) => (
              <circle key={`h${i}`} cx={b.x} cy={b.y}
                r={expandedIds.has(b.id) ? 220 : 95}
                fill={`url(#mm3g${i % BRANCH_COLORS.length})`}
                style={{ opacity: focusBranch === null || focusBranch === i ? 0.8 : 0.1, transition: "all 400ms" }}
              />
            ))}

            {/* Edges */}
            {edges.map((e, i) => {
              const mx = (e.x1 + e.x2) / 2, my = (e.y1 + e.y2) / 2;
              const dx = e.x2 - e.x1, dy = e.y2 - e.y1;
              const d = Math.sqrt(dx * dx + dy * dy) || 1;
              const curv = Math.min(d * 0.12, 25);
              const cx = mx - (dy / d) * curv, cy = my + (dx / d) * curv;
              const dimmed = focusBranch !== null && e.bi !== focusBranch;
              return (
                <path key={`e${i}`}
                  d={`M ${e.x1} ${e.y1} Q ${cx} ${cy} ${e.x2} ${e.y2}`}
                  fill="none" stroke={e.color} strokeWidth={1.5} strokeLinecap="round"
                  opacity={dimmed ? 0.1 : 0.45}
                  style={{ transition: "opacity 300ms" }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isRoot = node.depth === 0;
              const isBranch = node.depth === 1;
              const isLeaf = node.depth >= 2;
              const color = isRoot ? "#6366f1" : BRANCH_COLORS[node.branchIndex % BRANCH_COLORS.length];
              const isHov = hovered === node.id;
              const dim = focusBranch !== null && node.depth > 0 && node.branchIndex !== focusBranch;
              const r = isHov ? node.radius + 3 : node.radius;

              const fill = isRoot ? "#6366f1" : isBranch ? color : "var(--surface-raised, #1e1e2e)";
              const strokeC = isLeaf ? color : "none";

              // Text inside circle (root + branch)
              const fs = isRoot ? 11 : isBranch ? 9.5 : 0;
              const maxC = Math.floor((node.radius * 1.6) / ((fs || 1) * 0.52));
              const maxL = isRoot ? 3 : 2;
              const lines = fs ? wrapLabel(node.label, maxC, maxL) : [];
              const lh = fs * 1.25;
              const textY0 = -(lines.length - 1) * lh / 2;

              // Leaf external label
              const leafFs = 9.5;
              const onLeft = isLeaf && node.x < 0;

              return (
                <g key={node.id}
                  style={{ opacity: dim ? 0.2 : 1, cursor: "pointer", transition: "opacity 300ms" }}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => { if (node.depth >= 1) toggle(node.id); }}
                >
                  {/* Hover glow */}
                  {isHov && (
                    <circle cx={node.x} cy={node.y} r={r + 12}
                      fill={color} opacity={0.12} />
                  )}

                  {/* Circle */}
                  <circle cx={node.x} cy={node.y} r={r}
                    fill={fill} stroke={strokeC} strokeWidth={isLeaf ? 2 : 0} />

                  {/* Inner text (root / branch) */}
                  {lines.map((l, i) => (
                    <text key={i} x={node.x} y={node.y + textY0 + i * lh + (fs || 0) * 0.38}
                      textAnchor="middle" fill="#fff" fontSize={fs} fontWeight={700}
                      style={{ pointerEvents: "none", userSelect: "none" }}>
                      {l}
                    </text>
                  ))}

                  {/* Leaf external label */}
                  {isLeaf && (
                    <text
                      x={onLeft ? node.x - node.radius - 8 : node.x + node.radius + 8}
                      y={node.y + leafFs * 0.35}
                      textAnchor={onLeft ? "end" : "start"}
                      fill="var(--text, #e0e0e0)" fontSize={leafFs} fontWeight={600}
                      style={{ pointerEvents: "none", userSelect: "none" }}>
                      {node.label}
                    </text>
                  )}

                  {/* +N badge */}
                  {node.hiddenCount > 0 && (
                    <>
                      <circle
                        cx={node.x + node.radius * 0.7} cy={node.y - node.radius * 0.7}
                        r={10} fill={color} stroke="var(--surface, #0a0a0a)" strokeWidth={2} />
                      <text
                        x={node.x + node.radius * 0.7} y={node.y - node.radius * 0.7 + 3.5}
                        textAnchor="middle" fill="#fff" fontSize={8} fontWeight={700}
                        style={{ pointerEvents: "none" }}>
                        +{node.hiddenCount}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mm3__legend">
        {branches.map((b) => (
          <button key={b.idx}
            className={`mm3__legend-item${focusBranch === b.idx ? " mm3__legend-item--active" : ""}`}
            onClick={() => setFocusBranch((p) => p === b.idx ? null : b.idx)}
          >
            <span className="mm3__legend-dot" style={{ background: b.color }} />
            {b.label}
            {b.count > 0 && <span className="mm3__legend-count">{b.count}</span>}
          </button>
        ))}
      </div>

      <p className="mm3__hint">
        Clique nos nós para expandir · Arraste para mover · Scroll para zoom · Legenda filtra ramos
      </p>
    </div>
  );
}
