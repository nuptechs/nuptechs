"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "◎" },
  { href: "/admin/leads", label: "Leads", icon: "✉" },
  { href: "/admin/schedules", label: "Agendamentos", icon: "📅" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/analytics", label: "Analytics", icon: "◈" },
  { href: "/admin/settings", label: "Configurações", icon: "⚙" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/admin" className="admin-logo">
          <span className="admin-logo-mark">N+</span>
          <span className="admin-logo-text">admin</span>
        </Link>
      </div>
      <nav className="admin-nav">
        {NAV_ITEMS.map(({ href, label, icon }) => {
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
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-nav-item">
          <span className="admin-nav-icon">←</span>
          <span>Voltar ao site</span>
        </Link>
      </div>
    </aside>
  );
}
