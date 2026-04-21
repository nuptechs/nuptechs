"use client";

import { useEffect, useState } from "react";

interface AppRelease {
  name: string;
  version: string;
  platform: "android" | "ios";
  description: string;
  downloadUrl: string | null;
  size: string;
  updatedAt: string;
  icon: string;
  available: boolean;
}

const APPS: AppRelease[] = [
  {
    name: "NuP Salon",
    version: "1.0.0",
    platform: "android",
    description: "App do cliente — agendar cortes, ver fila, chat e promoções",
    downloadUrl: "/downloads/NuP-Salon-v1.0.0.apk",
    size: "74 MB",
    updatedAt: "2026-04-19",
    icon: "💇",
    available: true,
  },
  {
    name: "NuP Salon Pro",
    version: "1.0.0",
    platform: "android",
    description: "App do barbeiro — agenda, clientes, relatórios e gestão",
    downloadUrl: null,
    size: "~75 MB",
    updatedAt: "—",
    icon: "✂️",
    available: false,
  },
  {
    name: "NuP Sales",
    version: "0.1.0",
    platform: "android",
    description: "Plataforma de vendas — catálogo, carrinho, pedidos e fidelidade",
    downloadUrl: "/downloads/NuP-Sales-v0.1.0.apk",
    size: "70 MB",
    updatedAt: "2026-04-19",
    icon: "🛒",
    available: true,
  },
];

export default function DownloadsPage() {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
        else window.location.href = "/admin";
      })
      .catch(() => (window.location.href = "/admin"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-content">
        <header className="admin-page-header">
          <div>
            <h1>Downloads</h1>
            <p className="admin-subtitle">Carregando...</p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <h1>Downloads</h1>
          <p className="admin-subtitle">
            Apps móveis NuPTechs — baixe e instale diretamente
          </p>
        </div>
      </header>

      <div className="downloads-grid">
        {APPS.map((app) => (
          <div key={app.name} className="download-card">
            <div className="download-card-header">
              <span className="download-icon">{app.icon}</span>
              <div>
                <h3 className="download-name">{app.name}</h3>
                <span className="download-version">v{app.version}</span>
              </div>
              <span className="download-badge">
                {app.platform === "android" ? "Android" : "iOS"}
              </span>
            </div>
            <p className="download-desc">{app.description}</p>
            <div className="download-meta">
              <span>{app.size}</span>
              <span>·</span>
              <span>{app.updatedAt}</span>
            </div>
            {app.available && app.downloadUrl ? (
              <a
                href={app.downloadUrl}
                className="download-btn"
                download
              >
                ⬇ Baixar APK
              </a>
            ) : (
              <button
                className="download-btn"
                disabled
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              >
                Em breve
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="download-instructions">
        <h3>Como instalar</h3>
        <ol>
          <li>Baixe o arquivo <strong>.apk</strong> no dispositivo Android</li>
          <li>
            Abra o arquivo — se solicitado, habilite{" "}
            <em>&quot;Instalar de fontes desconhecidas&quot;</em>
          </li>
          <li>Toque em <strong>Instalar</strong> e aguarde</li>
          <li>Abra o app e faça login</li>
        </ol>
        <p className="download-note">
          📱 Para iOS, instale o <strong>Expo Go</strong> na App Store e escaneie o QR code
          do projeto.
        </p>
      </div>
    </div>
  );
}
