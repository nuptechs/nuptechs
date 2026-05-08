import type { Metadata } from "next";
import { AdminSidebar } from "./components/AdminSidebar";
import { CommandPalette } from "./components/CommandPalette";
import { MobileTopbar } from "./components/MobileMenuButton";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <MobileTopbar />
        {children}
      </main>
      <CommandPalette />
    </div>
  );
}
