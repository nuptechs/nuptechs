"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MindMapNode } from "../blog/[slug]/page";

/* ═══════════════════════════════════════════════════════════
   InteractiveMindMap — SVG radial mind map with animated
   connections, colored branches, hover tooltips, and
   expand/collapse. Zero dependencies.
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

interface LayoutNode {
  label: string;
  x: number;
  y: number;
  children: LayoutNode[];
  depth: number;
  branchIndex: number;
  angle: number;
}

function layoutTree(root: MindMapNode, width: number, height: number): LayoutNode {
  const cx = width / 2;
  const cy = height / 2;

  const branches = root.children ?? [];
  const angleStep = (2 * Math.PI) / Math.max(branches.length, 1);
  const r1 = Math.min(width, height) * 0.28;
  const r2 = Math.min(width, height) * 0.44;

  function layoutChildren(children: MindMapNode[], parentX: number, parentY: number, startAngle: number, spread: number, depth: number, branchIdx: number): LayoutNode[] {
    if (!children || children.length === 0) return [];
    const step = spread / Math.max(children.length - 1, 1);
    const offset = children.length > 1 ? -spread / 2 : 0;

    return children.map((child, i) => {
      const angle = startAngle + offset + step * i;
      const radius = depth === 1 ? r1 : r2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      return {
        label: child.label,
        x,
        y,
        depth,
        branchIndex: branchIdx,
        angle,
        children: layoutChildren(child.children ?? [], x, y, angle, spread * 0.5, depth + 1, branchIdx),
      };
    });
  }

  const rootNode: LayoutNode = {
    label: root.label,
    x: cx,
    y: cy,
    depth: 0,
    branchIndex: 0,
    angle: 0,
    children: branches.map((branch, i) => {
      const angle = -Math.PI / 2 + angleStep * i;
      const x = cx + Math.cos(angle) * r1;
      const y = cy + Math.sin(angle) * r1;
      const leafSpread = angleStep * 0.6;

      return {
        label: branch.label,
        x,
        y,
        depth: 1,
        branchIndex: i,
        angle,
        children: layoutChildren(branch.children ?? [], x, y, angle, leafSpread, 2, i),
      };
    }),
  };

  return rootNode;
}

function CurvedPath({ x1, y1, x2, y2, color, delay }: { x1: number; y1: number; x2: number; y2: number; color: string; delay: number }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = mx - dy * 0.15;
  const cy1 = my + dx * 0.15;
  const d = `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.5}
      className="mindmap-svg__path"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function NodeCircle({
  node,
  color,
  hovered,
  onHover,
  onLeave,
  onClick,
  expanded,
}: {
  node: LayoutNode;
  color: string;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  expanded: boolean;
}) {
  const isRoot = node.depth === 0;
  const isBranch = node.depth === 1;
  const isLeaf = node.depth >= 2;

  const radius = isRoot ? 38 : isBranch ? 28 : 20;
  const fontSize = isRoot ? 11 : isBranch ? 9.5 : 8;
  const fontWeight = isRoot || isBranch ? 700 : 500;

  const fillColor = isRoot ? color : isBranch ? color : "var(--surface-raised)";
  const textColor = isRoot || isBranch ? "#fff" : "var(--text)";
  const strokeColor = isLeaf ? color : "none";

  // Word wrap for labels
  const words = node.label.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  const maxCharsPerLine = isRoot ? 14 : isBranch ? 10 : 12;

  for (const word of words) {
    if ((currentLine + " " + word).trim().length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + " " + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);

  const lineHeight = fontSize * 1.25;
  const textStartY = -(lines.length - 1) * lineHeight / 2;

  return (
    <g
      className={`mindmap-svg__node mindmap-svg__node--d${node.depth}`}
      style={{ animationDelay: `${node.depth * 150 + node.branchIndex * 80}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={node.label}
    >
      {/* Glow on hover */}
      {hovered && (
        <circle
          cx={node.x}
          cy={node.y}
          r={radius + 8}
          fill={color}
          opacity={0.15}
          className="mindmap-svg__glow"
        />
      )}

      {/* Main circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={hovered ? radius + 3 : radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isLeaf ? 2 : 0}
        style={{ transition: "r 200ms ease, fill 200ms ease" }}
      />

      {/* Label */}
      {lines.map((line, li) => (
        <text
          key={li}
          x={node.x}
          y={node.y + textStartY + li * lineHeight + fontSize * 0.35}
          textAnchor="middle"
          fill={textColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="var(--font-body, 'Inter', sans-serif)"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {line}
        </text>
      ))}

      {/* Expand indicator for branches */}
      {isBranch && node.children.length > 0 && (
        <text
          x={node.x + radius - 4}
          y={node.y - radius + 8}
          textAnchor="middle"
          fill="#fff"
          fontSize={9}
          fontWeight={700}
          opacity={0.8}
          style={{ pointerEvents: "none" }}
        >
          {expanded ? "−" : `+${node.children.length}`}
        </text>
      )}
    </g>
  );
}

export default function InteractiveMindMap({ data, title }: { data: MindMapNode; title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 500 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedBranches, setExpandedBranches] = useState<Set<number>>(() => new Set(Array.from({ length: 20 }, (_, i) => i)));
  const [isVisible, setIsVisible] = useState(false);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const w = Math.max(320, Math.min(800, width));
      const h = w < 500 ? w * 0.85 : w * 0.7;
      setDimensions({ width: w, height: h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animate in on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tree = layoutTree(data, dimensions.width, dimensions.height);
  const rootColor = BRANCH_COLORS[0];

  const toggleBranch = useCallback((idx: number) => {
    setExpandedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  // Flatten for rendering
  const edges: { x1: number; y1: number; x2: number; y2: number; color: string; delay: number }[] = [];
  const nodes: { node: LayoutNode; color: string }[] = [];

  nodes.push({ node: tree, color: rootColor });

  tree.children.forEach((branch, i) => {
    const color = BRANCH_COLORS[i % BRANCH_COLORS.length];
    edges.push({ x1: tree.x, y1: tree.y, x2: branch.x, y2: branch.y, color, delay: i * 100 });
    nodes.push({ node: branch, color });

    if (expandedBranches.has(i)) {
      branch.children.forEach((leaf, j) => {
        edges.push({ x1: branch.x, y1: branch.y, x2: leaf.x, y2: leaf.y, color, delay: i * 100 + j * 60 + 200 });
        nodes.push({ node: leaf, color });
      });
    }
  });

  return (
    <div ref={containerRef} className={`mindmap-v2${isVisible ? " mindmap-v2--visible" : ""}`}>
      <div className="mindmap-v2__header">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="21" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="12" cy="21" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="19" cy="19" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" opacity="0.3" />
          <path d="M12 9V3M15 12h6M12 15v6M9 12H3M14.1 9.9l3.5-3.5M9.9 9.9l-3.5-3.5M14.1 14.1l3.5 3.5M9.9 14.1l-3.5 3.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
        <span>{title ?? "Mapa Mental — Resumo visual"}</span>
        <button
          className="mindmap-v2__expand-all"
          onClick={() => {
            const allExpanded = tree.children.every((_, i) => expandedBranches.has(i));
            if (allExpanded) setExpandedBranches(new Set());
            else setExpandedBranches(new Set(tree.children.map((_, i) => i)));
          }}
          aria-label="Expandir/recolher todos os ramos"
        >
          {tree.children.every((_, i) => expandedBranches.has(i)) ? "Recolher" : "Expandir tudo"}
        </button>
      </div>

      <div className="mindmap-v2__canvas">
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          width="100%"
          height="100%"
          aria-label={`Mapa mental: ${data.label}`}
          role="img"
        >
          <defs>
            {BRANCH_COLORS.map((c, i) => (
              <radialGradient key={i} id={`mm-grad-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c} stopOpacity={0.15} />
                <stop offset="100%" stopColor={c} stopOpacity={0} />
              </radialGradient>
            ))}
            <filter id="mm-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Branch area highlights */}
          {tree.children.map((branch, i) =>
            expandedBranches.has(i) ? (
              <circle
                key={`area-${i}`}
                cx={branch.x}
                cy={branch.y}
                r={dimensions.width * 0.18}
                fill={`url(#mm-grad-${i % BRANCH_COLORS.length})`}
                className="mindmap-svg__area"
              />
            ) : null
          )}

          {/* Edges */}
          {edges.map((e, i) => (
            <CurvedPath key={`e-${i}`} {...e} />
          ))}

          {/* Nodes */}
          {nodes.map(({ node, color }, i) => (
            <NodeCircle
              key={`n-${i}-${node.label}`}
              node={node}
              color={color}
              hovered={hoveredNode === node.label}
              onHover={() => setHoveredNode(node.label)}
              onLeave={() => setHoveredNode(null)}
              onClick={() => {
                if (node.depth === 1) toggleBranch(node.branchIndex);
              }}
              expanded={node.depth === 1 && expandedBranches.has(node.branchIndex)}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mindmap-v2__legend">
        {tree.children.map((branch, i) => (
          <button
            key={i}
            className={`mindmap-v2__legend-item${expandedBranches.has(i) ? " mindmap-v2__legend-item--active" : ""}`}
            onClick={() => toggleBranch(i)}
          >
            <span
              className="mindmap-v2__legend-dot"
              style={{ background: BRANCH_COLORS[i % BRANCH_COLORS.length] }}
            />
            {branch.label}
          </button>
        ))}
      </div>

      <p className="mindmap-v2__hint">Clique nos ramos para expandir/recolher · Passe o mouse para destacar</p>
    </div>
  );
}
