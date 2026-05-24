import { redirect } from "next/navigation";
import { getSession, hasPermission } from "../../../lib/auth";
import { AdminPageHeader } from "../components/AdminPageHeader";

export const metadata = { title: "Infra NuPtechs — Admin" };

export default async function InfraPage() {
  const session = await getSession();
  if (!session) redirect("/api/auth/login");
  if (!hasPermission(session.permissions, "nuptechs:infra")) redirect("/admin");

  return (
    <div className="admin-content">
      <AdminPageHeader
        title="Infra NuPtechs"
        subtitle="Apresentação executiva da infraestrutura, pacotes próprios e capacidades do parque NuPtechs"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Sistema" },
          { label: "Infra NuPtechs" },
        ]}
      />
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <iframe
          src="/admin-assets/infra-nuptechs.html"
          title="Apresentação institucional NuPtechs"
          style={{
            display: "block",
            width: "100%",
            height: "calc(100vh - 220px)",
            minHeight: 720,
            border: 0,
            background: "#0f1115",
          }}
        />
      </div>
    </div>
  );
}
