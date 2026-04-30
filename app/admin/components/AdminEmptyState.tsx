// app/admin/components/AdminEmptyState.tsx
// Empty state polido com ilustração SVG (linhas leves, cor do tema).
// Substitui os emoji+texto soltos das páginas por algo coeso.

import type { ReactNode } from "react";

type Variant = "search" | "inbox" | "calendar" | "edit" | "default";

interface AdminEmptyStateProps {
  /** Variante decide a ilustração SVG. */
  variant?: Variant;
  title: string;
  description?: string;
  /** Botão / link de ação (ex.: "Criar primeiro lead"). */
  action?: ReactNode;
}

function Illustration({ variant }: { variant: Variant }) {
  // Linhas leves, monocromáticas usando currentColor — mostra na cor do
  // texto suave do tema. Tamanho 88x88 pra dar presença sem dominar.
  const common = {
    width: 88,
    height: 88,
    viewBox: "0 0 88 88",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (variant) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="38" cy="38" r="22" />
          <path d="M55 55l13 13" />
          <path d="M30 38h16M38 30v16" opacity="0.4" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <rect x="14" y="22" width="60" height="44" rx="6" />
          <path d="M14 50h18l4 6h16l4-6h18" />
          <path d="M30 32h28M30 40h20" opacity="0.4" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="14" y="20" width="60" height="50" rx="6" />
          <path d="M14 34h60" />
          <path d="M28 14v12M60 14v12" />
          <circle cx="30" cy="48" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="44" cy="48" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="58" cy="48" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M14 70l4-16L54 18l12 12-36 36-16 4z" />
          <path d="M50 22l12 12" />
          <path d="M22 60l8 8" opacity="0.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="44" cy="44" r="28" opacity="0.6" />
          <path d="M30 44h28M44 30v28" opacity="0.3" />
        </svg>
      );
  }
}

export function AdminEmptyState({
  variant = "default",
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="admin-empty-state admin-empty-state-rich">
      <div className="admin-empty-illustration">
        <Illustration variant={variant} />
      </div>
      <p>{title}</p>
      {description && <p className="admin-subtle">{description}</p>}
      {action && <div className="admin-empty-action">{action}</div>}
    </div>
  );
}
