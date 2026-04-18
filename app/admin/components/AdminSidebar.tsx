"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [counts, setCounts] = useState<{ newLeads: number; pendingSchedules: number }>({
    newLeads: 0,
    pendingSchedules: 0,
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.user && setUser(data.user))
      .catch(() => {});

    // Fetch counts for badges
    Promise.all([
      fetch("/api/admin/leads?status=new&limit=0").then((r) => r.ok ? r.json() : null),
      fetch("/api/admin/schedules?status=pending&limit=0").then((r) => r.ok ? r.json() : null),
    ]).then(([leads, schedules]) => {
      setCounts({
        newLeads: leads?.total ?? 0,
        pendingSchedules: schedules?.total ?? 0,
      });
    }).catch(() => {});
  }, []);

  const sections: NavSection[] = [
    {
      title: "Geral",
      items: [
        { href: "/admin", label: "Dashboard", icon: "◎" },
      ],
    },
    {
      title: "Pipeline",
      items: [
        { href: "/admin/leads", label: "Leads", icon: "✉", badge: counts.newLeads || undefined },
        { href: "/admin/schedules", label: "Agendamentos", icon: "📅", badge: counts.pendingSchedules || undefined },
        { href: "/admin/whatsapp", label: "WhatsApp", icon: "💬" },
      ],
    },
    {
      title: "Conteúdo",
      items: [
        { href: "/admin/blog", label: "Blog", icon: "✎" },
        { href: "/admin/analytics", label: "Analytics", icon: "◈" },
      ],
    },
    {
      title: "Sistema",
      items: [
        { href: "/admin/audit", label: "Auditoria", icon: "🔍" },
        { href: "/admin/settings", label: "Configurações", icon: "⚙" },
      ],
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/admin" className="admin-logo">
          <span className="admin-logo-mark">N+</span>
          <span className="admin-logo-text">admin</span>
        </Link>
      </div>
      <nav className="admin-nav">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="admin-nav-section">{section.title}</div>
            {section.items.map(({ href, label, icon, badge }) => {
              const isActive =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
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
            <span className="admin-user-role">Administrador</span>
          </div>
        )}
        <a href="/api/auth/logout" className="admin-nav-item">
          <span className="admin-nav-icon">⏻</span>
          <span>Sair</span>
        </a>
        <Link href="/" className="admin-nav-item">
          <span className="admin-nav-icon">←</span>
          <span>Voltar ao site</span>
        </Link>
      </div>
    </aside>
  );
}
