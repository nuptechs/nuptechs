"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════
   InteractiveMindMap v3 — Force-directed, collision-free,
   progressive-reveal mind map as a true study/revision tool.

   Design decisions:
   1. Progressive reveal → starts showing only root + branches,
      user clicks to drill into each branch. This prevents
      overwhelming the viewer and avoids text overlap.
   2. Force simulation → nodes push each other apart.
      Zero overlaps even with 20+ visible nodes.
   3. Horizontal labels → leaf text is rendered horizontally
      OUTSIDE the node circle, always fully readable.
   4. Zoom & pan → mouse drag + scroll wheel + touch.
   5. Focus mode → click legend to isolate a branch.
   6. Smart sizing → viewBox auto-fits to visible nodes.
   7. Branch badges → collapsed branches show "+N" count.
   ═══════════════════════════════════════════════════════════ */

const BRANCH_COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ec4899", // pink
  "#0ea5e9", // sky
  "#8b5cf6", // violet
  "#ef4444", // red
  "#14b8a6", // teal
];

/* ─── Layout Types ─────────────────────────────────────── */
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
function runForce(root: LNode, iterations = 60) {
  const flat: LNode[] = [];
  const edges: [LNode, LNode][] = [];
  function collect(n: LNode, parent?: LNode) {
    flat.push(n);
    if (parent) edges.push([parent, n]);
    n.children.forEach((c) => collect(c, n));
  }
  collect(root);

  if (flat.length <= 1) return;

  const vx = new Map<string, number>();
  const vy = new Map<string, number>();
  flat.forEach((n) => { vx.set(n.id, 0); vy.set(n.id, 0); });

  for (let it = 0; it < iterations; it++) {
    // Repulsion
    for (let i = 0; i < flat.length; i++) {
      for (let j = i + 1; j < flat.length; j++) {
        const a = flat[i], b = flat[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
        const minD = a.radius + b.radius + 50;
        if (dist < minD * 4) {
          const f = 3000 / (dist * dist);
          const fx = (dx / dist) * f, fy = (dy / dist) * f;
          vx.set(a.id, (vx.get(a.id) || 0) - fx);
          vy.set(a.id, (vy.get(a.id) || 0) - fy);
          vx.set(b.id, (vx.get(b.id) || 0) + fx);
          vy.set(b.id, (vy.get(b.id) || 0) + fy);
        }
      }
    }
    // Spring along edges
    for (const [a, b] of edges) {
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
      const ideal = a.depth === 0 ? 190 : 140;
      const disp = dist - ideal;
      const str = 0.06;
      const fx = (dx / dist) * disp * str, fy = (dy / dist) * disp * str;
      vx.set(a.id, (vx.get(a.id) || 0) + fx);
      vy.set(a.id, (vy.get(a.id) || 0) + fy);
      vx.set(b.id, (vx.get(b.id) || 0) - fx);
      vy.set(b.id, (vy.get(b.id) || 0) - fy);
    }
    // Apply
    for (const n of flat) {
      if (n.depth === 0) continue;
      n.x += (vx.get(n.id) || 0) * 0.9;
      n.y += (vy.get(n.id) || 0) * 0.9;
      vx.set(n.id, (vx.get(n.id) || 0) * 0.88);
      vy.set(n.id, (vy.get(n.id) || 0) * 0.88);
    }
  }
}

/* ─── Count total descendants ──────────────────────────── */
function countDesc(node: MindMapNode): number {
  if (!node.children) return 0;
  return node.children.reduce((s, c) => s + 1 + countDesc(c), 0);
}

/* ─── Build layout tree ────────────────────────────────── */
function buildLayout(
  data: MindMapNode,
  expandedIds: Set<string>
): LNode {
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
      const spread = depth === 0
        ? 2 * Math.PI
        : Math.min(Math.PI * 0.85, n * 0.42);
      const start = depth === 0
        ? -Math.PI / 2
        : angle - spread / 2;
      const cDist = depth === 0 ? 200 : 150;

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

/* ─── Compute bounds ───────────────────────────────────── */
function getBounds(tree: LNode) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  function walk(n: LNode) {
    const pad = n.depth >= 2 ? n.radius + 100 : n.radius + 60;
    x1 = Math.min(x1, n.x - pad); y1 = Math.min(y1, n.y - pad);
    x2 = Math.max(x2, n.x + pad); y2 = Math.max(y2, n.y + pad);
    n.children.forEach(walk);
  }
  walk(tree);
  return { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 };
}

/* ─── Curved Path ──────────────────────────────────────── */
function CPath({ x1, y1, x2, y2, color, dim }: {
  x1: number; y1: number; x2: number; y2: number; color: string; dim: boolean;
}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const d = Math.sqrt(dx * dx + dy * dy) || 1;
  const curv = Math.min(d * 0.12, 25);
  const cx = mx - (dy / d) * curv, cy = my + (dx / d) * curv;

  return (
    <path
      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
      fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round"
      opacity={dim ? 0.12 : 0.4}
      className="mm3-path"
    />
  );
}

/* ─── Node ─────────────────────────────────────────────── */
function MNode({
  node, color, hovered, dim, onHover, onLeave, onClick, showBadge,
}: {
  node: LNode; color: string; hovered: boolean; dim: boolean;
  onHover: () => void; onLeave: () => void; onClick: () => void; showBadge: boolean;
}) {
  const isRoot = node.depth === 0;
  const isBranch = node.depth === 1;
  const isLeaf = node.depth >= 2;
  const r = hovered ? node.radius + 3 : node.radius;

  const fill = isRoot ? "var(--accent, #6366f1)" : isBranch ? color : "var(--surface-raised, #1e1e2e)";
  const stroke = isLeaf ? color : "none";
  const innerText = isRoot || isBranch ? "#fff" : "var(--text, #e0e0e0)";

  const fs = isRoot ? 11 : isBranch ? 9.5 : 0; // leaves use external label
  const fw = isRoot || isBranch ? 700 : 600;
  const maxC = Math.floor((node.radius * 1.7) / (fs * 0.5 || 1));

  function wrap(s: string): string[] {
    if (!fs) return [];
    const words = s.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const t = cur ? cur + " " + w : w;
      if (t.length > maxC && cur) { lines.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) lines.push(cur);
    const mx = isRoot ? 3 : 2;
    if (lines.length > mx) { lines.length = mx; lines[mx - 1] = lines[mx - 1].slice(0, -1) + "…"; }
    return lines;
  }

  const lines = wrap(node.label);
  const lh = fs * 1.3;
  const startY = -(lines.length - 1) * lh / 2;

  // Leaf label — horizontal, outside circle
  const leafFs = 9;
  const leafOnLeft = isLeaf && node.x < 0;
  const leafX = leafOnLeft ? node.x - node.radius - 8 : node.x + node.radius + 8;
  const leafAnch = leafOnLeft ? "end" : "start";

  return (
    <g
      className="mm3-node" style={{ opacity: dim ? 0.25 : 1, transition: "opacity 300ms" }}
      onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onClick}
      role="button" tabIndex={0} aria-label={node.label}
    >
      {hovered && (
        <circle cx={node.x} cy={node.y} r={r + 10}
          fill={isRoot ? "var(--accent, #6366f1)" : color} opacity={0.12} className="mm3-glow" />
      )}
      <circle cx={node.x} cy={node.y} r={r}
        fill={fill} stroke={stroke} strokeWidth={isLeaf ? 2 : 0}
        style={{ transition: "r 200ms" }} />

      {/* Inner text (root / branch) */}
      {lines.map((l, i) => (
        <text key={i} x={node.x} y={node.y + startY + i * lh + fs * 0.35}
          textAnchor="middle" fill={innerText} fontSize={fs} fontWeight={fw}
          fontFamily="var(--font-body, 'Inter', sans-serif)"
          style={{ pointerEvents: "none", userSelect: "none" }}>
          {l}
        </text>
      ))}

      {/* External label (leaf) */}
      {isLeaf && (
        <text x={leafX} y={node.y + leafFs * 0.35}
          textAnchor={leafAnch} fill="var(--text, #e0e0e0)"
          fontSize={leafFs} fontWeight={600}
          fontFamily="var(--font-body, 'Inter', sans-serif)"
          style={{ pointerEvents: "none", userSelect: "none" }}>
          {node.label}
        </text>
      )}

      {/* Badge with hidden count */}
      {showBadge && node.hiddenCount > 0 && (
        <g>
          <circle cx={node.x + node.radius * 0.7} cy={node.y - node.radius * 0.7} r={10}
            fill={color} stroke="var(--surface, #0a0a0a)" strokeWidth={2} />
          <text x={node.x + node.radius * 0.7} y={node.y - node.radius * 0.7 + 3.5}
            textAnchor="middle" fill="#fff" fontSize={8} fontWeight={700}
            style={{ pointerEvents: "none" }}>
            +{node.hiddenCount}
          </text>
        </g>
      )}
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export default function InteractiveMindMap({ data, title }: { data: MindMapNode; title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focusBranch, setFocusBranch] = useState<number | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(["n-0"]));
  const [vb, setVb] = useState({ x: -450, y: -350, w: 900, h: 700 });
  const [panning, setPanning] = useState(false);
  const panRef = useRef({ sx: 0, sy: 0, vx: 0, vy: 0 });

  // Build tree
  const tree = useMemo(() => buildLayout(data, expandedIds), [data, expandedIds]);

  // Auto-fit
  const fitView = useCallback(() => {
    const b = getBounds(tree);
    const pad = 80;
    setVb({ x: b.x1 - pad, y: b.y1 - pad, w: b.w + pad * 2, h: b.h + pad * 2 });
  }, [tree]);

  useEffect(() => { fitView(); }, [fitView]);

  // Animate in
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Toggle expand
  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        // Collapse this and all descendants
        for (const k of n) { if (k === id || k.startsWith(id + "-")) n.delete(k); }
      } else {
        n.add(id);
      }
      return n;
    });
  }, []);

  // All IDs
  const allIds = useMemo(() => {
    const ids: string[] = [];
    function collect(node: MindMapNode, prefix: string) {
      ids.push(prefix);
      node.children?.forEach((c, i) => collect(c, `${prefix}-${i}`));
    }
    collect(data, "n-0");
    return ids;
  }, [data]);

  const allExpanded = allIds.every((id) => expandedIds.has(id));

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      setExpandedIds(new Set(["n-0"]));
    } else {
      setExpandedIds(new Set(allIds));
    }
    setFocusBranch(null);
  }, [allExpanded, allIds]);

  // Zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const f = e.deltaY > 0 ? 1.12 : 0.89;
    setVb((v) => {
      const cx = v.x + v.w / 2, cy = v.y + v.h / 2;
      const nw = v.w * f, nh = v.h * f;
      return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
    });
  }, []);

  // Pan (mouse)
  const startPan = useCallback((cx: number, cy: number) => {
    setPanning(true);
    panRef.current = { sx: cx, sy: cy, vx: vb.x, vy: vb.y };
  }, [vb]);

  const movePan = useCallback((cx: number, cy: number) => {
    if (!panning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = vb.w / rect.width, sy = vb.h / rect.height;
    setVb((v) => ({
      ...v,
      x: panRef.current.vx - (cx - panRef.current.sx) * sx,
      y: panRef.current.vy - (cy - panRef.current.sy) * sy,
    }));
  }, [panning, vb.w, vb.h]);

  const endPan = useCallback(() => setPanning(false), []);

  // Flatten for rendering
  const { edges, nodes } = useMemo(() => {
    const eList: { x1: number; y1: number; x2: number; y2: number; color: string; bi: number }[] = [];
    const nList: { node: LNode; color: string; badge: boolean }[] = [];

    function walk(n: LNode) {
      const c = n.depth === 0 ? "var(--accent, #6366f1)" : BRANCH_COLORS[n.branchIndex % BRANCH_COLORS.length];
      nList.push({ node: n, color: c, badge: n.hiddenCount > 0 });
      n.children.forEach((ch) => {
        const cc = BRANCH_COLORS[ch.branchIndex % BRANCH_COLORS.length];
        eList.push({ x1: n.x, y1: n.y, x2: ch.x, y2: ch.y, color: cc, bi: ch.branchIndex });
        walk(ch);
      });
    }
    walk(tree);
    return { edges: eList, nodes: nList };
  }, [tree]);

  const branches = useMemo(() =>
    (data.children ?? []).map((c, i) => ({
      label: c.label, color: BRANCH_COLORS[i % BRANCH_COLORS.length], idx: i,
      count: c.children?.length ?? 0,
    })),
  [data]);

  return (
    <div ref={containerRef} className={`mm3${isVisible ? " mm3--visible" : ""}`}>
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
        className="mm3__canvas"
        onWheel={handleWheel}
        onMouseDown={(e) => { if (e.button === 0) startPan(e.clientX, e.clientY); }}
        onMouseMove={(e) => movePan(e.clientX, e.clientY)}
        onMouseUp={endPan} onMouseLeave={endPan}
        onTouchStart={(e) => { if (e.touches.length === 1) startPan(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={(e) => { if (e.touches.length === 1) movePan(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={endPan}
        style={{ cursor: panning ? "grabbing" : "grab" }}
      >
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          width="100%" height="100%"
          aria-label={`Mapa mental: ${data.label}`} role="img"
          style={{ touchAction: "none" }}
        >
          <defs>
            {BRANCH_COLORS.map((c, i) => (
              <radialGradient key={i} id={`mm3g${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c} stopOpacity={0.07} />
                <stop offset="100%" stopColor={c} stopOpacity={0} />
              </radialGradient>
            ))}
          </defs>

          {/* Branch halos */}
          {tree.children.map((b, i) => (
            <circle key={`h${i}`} cx={b.x} cy={b.y}
              r={expandedIds.has(b.id) ? 200 : 90}
              fill={`url(#mm3g${i % BRANCH_COLORS.length})`}
              style={{ opacity: focusBranch === null || focusBranch === i ? 0.7 : 0.08, transition: "all 400ms" }}
            />
          ))}

          {/* Edges */}
          {edges.map((e, i) => (
            <CPath key={`e${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} color={e.color}
              dim={focusBranch !== null && e.bi !== focusBranch} />
          ))}

          {/* Nodes */}
          {nodes.map(({ node, color, badge }) => (
            <MNode key={node.id} node={node} color={color}
              hovered={hovered === node.id}
              dim={focusBranch !== null && node.depth > 0 && node.branchIndex !== focusBranch}
              onHover={() => setHovered(node.id)}
              onLeave={() => setHovered(null)}
              onClick={() => { if (node.depth >= 1) toggle(node.id); }}
              showBadge={badge}
            />
          ))}
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
