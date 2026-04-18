"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "◎" },
  { href: "/admin/leads", label: "Leads", icon: "✉" },
  { href: "/admin/schedules", label: "Agendamentos", icon: "📅" },
  { href: "/admin/whatsapp", label: "WhatsApp", icon: "💬" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/analytics", label: "Analytics", icon: "◈" },
  { href: "/admin/settings", label: "Configurações", icon: "⚙" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.user && setUser(data.user))
      .catch(() => {});
  }, []);

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
        {user && (
          <div className="admin-user-info">
            <span className="admin-user-name">{user.name || user.email}</span>
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
