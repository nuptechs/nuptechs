"use client";

import { Menu } from "lucide-react";

const TOGGLE_EVENT = "admin-sidebar:toggle";

export function dispatchSidebarToggle(): void {
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT));
}

export const SIDEBAR_TOGGLE_EVENT = TOGGLE_EVENT;

export function MobileMenuButton() {
  return (
    <button
      type="button"
      aria-label="Abrir menu"
      className="admin-mobile-menu-btn"
      onClick={dispatchSidebarToggle}
    >
      <Menu size={20} strokeWidth={1.75} />
    </button>
  );
}
