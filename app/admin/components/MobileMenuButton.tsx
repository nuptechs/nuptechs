"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

const TOGGLE_EVENT = "admin-sidebar:toggle";

export function dispatchSidebarToggle(): void {
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT));
}

export const SIDEBAR_TOGGLE_EVENT = TOGGLE_EVENT;

/**
 * Topbar fixa exibida apenas em mobile (≤ 768px).
 * Reserva um espaço próprio acima do conteúdo (sticky), evitando sobrepor
 * o AdminPageHeader como acontecia com o botão fixed da v1.
 */
export function MobileTopbar() {
  return (
    <header className="admin-mobile-topbar" aria-label="Barra superior">
      <button
        type="button"
        aria-label="Abrir menu"
        className="admin-mobile-menu-btn"
        onClick={dispatchSidebarToggle}
      >
        <Menu size={20} strokeWidth={1.75} />
      </button>
      <Link href="/admin" className="admin-mobile-topbar-brand">
        <span className="admin-logo-mark" aria-hidden />
        <span>
          NuPtechs <span className="admin-mobile-topbar-sub">Admin</span>
        </span>
      </Link>
    </header>
  );
}
