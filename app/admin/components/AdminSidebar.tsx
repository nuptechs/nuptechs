"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutGrid, Inbox, Calendar, MessageCircle, CreditCard,
  PenSquare, BarChart3, Download, ShieldAlert, Settings,
  LogOut, ArrowLeft, FileText, X,
} from "lucide-react";
import { SIDEBAR_TOGGLE_EVENT } from "./MobileMenuButton";

type RequiredPermission = "nuptechs:admin" | "nuptechs:content" | "nuptechs:viewer";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  requiredPermission?: RequiredPermission;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

function canAccess(permissions: string[], required?: RequiredPermission): boolean {
  if (!required) return true;
  if (permissions.includes("nuptechs:admin")) return true;
  return permissions.includes(required);
}

// Lucide stroke-width 1.75 fica mais elegante que o default 2.
const iconProps = { size: 16, strokeWidth: 1.75 } as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permissionsChanged, setPermissionsChanged] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState<{ newLeads: number; pendingSchedules: number }>({
    newLeads: 0,
    pendingSchedules: 0,
  });

  // Toggle via evento global (vindo do MobileMenuButton).
  useEffect(() => {
    const onToggle = () => setMobileOpen((o) => !o);
    window.addEventListener(SIDEBAR_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(SIDEBAR_TOGGLE_EVENT, onToggle);
  }, []);

  // Fecha ao trocar de rota.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Fecha em ESC + lock do scroll do body enquanto aberto.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (r.status === 401) {
          const body = await r.json().catch(() => ({}));
          if (body?.reason === "permissions_changed") {
            setPermissionsChanged(true);
            setTimeout(() => {
              window.location.href = "/api/auth/logout";
            }, 3000);
          }
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => {
        if (data?.user) setUser(data.user);
        if (data?.permissions) setPermissions(data.permissions);
      })
      .catch(() => {});

    Promise.all([
      fetch("/api/admin/leads?status=new&limit=0").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/admin/schedules?status=pending&limit=0").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([leads, schedules]) => {
        setCounts({
          newLeads: leads?.total ?? 0,
          pendingSchedules: schedules?.total ?? 0,
        });
      })
      .catch(() => {});
  }, []);

  const sections: NavSection[] = [
    {
      title: "Geral",
      items: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: <LayoutGrid {...iconProps} />,
          requiredPermission: "nuptechs:viewer",
        },
      ],
    },
    {
      title: "Pipeline",
      items: [
        {
          href: "/admin/leads",
          label: "Leads",
          icon: <Inbox {...iconProps} />,
          badge: counts.newLeads || undefined,
          requiredPermission: "nuptechs:content",
        },
        {
          href: "/admin/schedules",
          label: "Agendamentos",
          icon: <Calendar {...iconProps} />,
          badge: counts.pendingSchedules || undefined,
          requiredPermission: "nuptechs:content",
        },
        {
          href: "/admin/whatsapp",
          label: "WhatsApp",
          icon: <MessageCircle {...iconProps} />,
          requiredPermission: "nuptechs:admin",
        },
        {
          href: "/admin/cartoes",
          label: "Cartões",
          icon: <CreditCard {...iconProps} />,
          requiredPermission: "nuptechs:admin",
        },
        {
          href: "/admin/contratos",
          label: "Contratos",
          icon: <FileText {...iconProps} />,
          requiredPermission: "nuptechs:content",
        },
      ],
    },
    {
      title: "Conteúdo",
      items: [
        {
          href: "/admin/blog",
          label: "Blog",
          icon: <PenSquare {...iconProps} />,
          requiredPermission: "nuptechs:content",
        },
        {
          href: "/admin/analytics",
          label: "Analytics",
          icon: <BarChart3 {...iconProps} />,
          requiredPermission: "nuptechs:viewer",
        },
      ],
    },
    {
      title: "Distribuição",
      items: [
        {
          href: "/admin/downloads",
          label: "Downloads",
          icon: <Download {...iconProps} />,
          requiredPermission: "nuptechs:admin",
        },
      ],
    },
    {
      title: "Sistema",
      items: [
        {
          href: "/admin/audit",
          label: "Auditoria",
          icon: <ShieldAlert {...iconProps} />,
          requiredPermission: "nuptechs:admin",
        },
        {
          href: "/admin/settings",
          label: "Configurações",
          icon: <Settings {...iconProps} />,
          requiredPermission: "nuptechs:admin",
        },
      ],
    },
  ];

  const visibleSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => canAccess(permissions, item.requiredPermission)),
    }))
    .filter((section) => section.items.length > 0);

  const role = permissions.includes("nuptechs:admin")
    ? "Administrador"
    : permissions.includes("nuptechs:content")
      ? "Editor"
      : "Visualizador";

  return (
    <>
      {/* Backdrop só aparece em mobile quando o drawer está aberto. */}
      <div
        className={`admin-sidebar-backdrop ${mobileOpen ? "is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`}
        aria-label="Navegação principal"
      >
      <div className="admin-sidebar-header">
        <Link href="/admin" className="admin-logo" aria-label="NuPtechs Admin">
          <span className="admin-logo-mark" aria-hidden />
          <span className="admin-logo-text">NuPtechs</span>
          <span className="admin-logo-sub">Admin</span>
        </Link>
        <button
          type="button"
          aria-label="Fechar menu"
          className="admin-sidebar-close"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </div>

      {permissionsChanged && (
        <div
          style={{
            background: "var(--ad-warn-soft)",
            color: "var(--ad-warn)",
            padding: "10px 14px",
            fontSize: 12.5,
            lineHeight: 1.4,
            borderBottom: "1px solid var(--ad-border)",
          }}
        >
          <strong>Permissões atualizadas.</strong>
          <br />
          Redirecionando para login…
        </div>
      )}

      <nav className="admin-nav">
        {visibleSections.map((section) => (
          <div key={section.title}>
            <div className="admin-nav-section">{section.title}</div>
            {section.items.map(({ href, label, icon, badge }) => {
              const isActive =
                href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`admin-nav-item ${isActive ? "active" : ""}`}
                >
                  <span className="admin-nav-icon">{icon}</span>
                  <span>{label}</span>
                  {badge !== undefined && badge > 0 && (
                    <span className="admin-nav-badge">{badge > 99 ? "99+" : badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        {user && (
          <div className="admin-user-info">
            <span className="admin-user-name">{user.name || user.email}</span>
            <span className="admin-user-role">{role}</span>
          </div>
        )}
        <a href="/api/auth/logout" className="admin-nav-item">
          <span className="admin-nav-icon">
            <LogOut {...iconProps} />
          </span>
          <span>Sair</span>
        </a>
        <Link href="/" className="admin-nav-item">
          <span className="admin-nav-icon">
            <ArrowLeft {...iconProps} />
          </span>
          <span>Voltar ao site</span>
        </Link>
      </div>
      </aside>
    </>
  );
}
