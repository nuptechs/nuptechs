// app/admin/components/AdminPageHeader.tsx
// Header unificado para todas as páginas do /admin.
// Antes cada página tinha o próprio HTML inline com pequenas diferenças
// (estrutura do <div> envolvendo <h1>, classe do <p>, gap das ações).
// Centralizar garante densidade vertical e tipografia consistentes.

import type { ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  /** Trilha de navegação opcional (ex.: Admin / Pipeline / Leads). */
  breadcrumbs?: Crumb[];
  /** Botões / chips alinhados à direita do título. */
  actions?: ReactNode;
}

export function AdminPageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="admin-breadcrumbs" aria-label="Trilha">
            {breadcrumbs.map((c, i) => (
              <span key={i} className="admin-breadcrumb">
                {c.href ? (
                  <a href={c.href} className="admin-breadcrumb-link">
                    {c.label}
                  </a>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span className="admin-breadcrumb-sep" aria-hidden>
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {subtitle && <p className="admin-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="admin-header-actions">{actions}</div>}
    </header>
  );
}
