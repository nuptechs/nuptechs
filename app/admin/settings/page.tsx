"use client";

import { useEffect, useState } from "react";

interface SiteSettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  socialLinkedin: string;
  socialGithub: string;
  socialInstagram: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  integrations: {
    resend: boolean;
    evolutionApi: boolean;
    pinecone: boolean;
    openai: boolean;
    ga4: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => data && setSettings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateField = (key: keyof SiteSettings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
    setDirty(true);
  };

  const save = async () => {
    if (!settings || !dirty) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setDirty(false);
        showToast("Configurações salvas", "success");
      } else {
        showToast("Erro ao salvar", "error");
      }
    } catch {
      showToast("Erro de conexão", "error");
    } finally {
      setSaving(false);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="admin-content">
        <header className="admin-page-header"><div><h1>Configurações</h1><p className="admin-subtitle">Configurações gerais do site</p></div></header>
        <div className="admin-card" style={{ padding: "3rem", textAlign: "center", color: "var(--muted)" }}>Carregando...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="admin-content">
        <header className="admin-page-header"><div><h1>Configurações</h1></div></header>
        <div className="admin-empty-state"><p>Erro ao carregar configurações</p></div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <h1>Configurações</h1>
          <p className="admin-subtitle">Configurações gerais do site</p>
        </div>
        <div className="admin-header-actions">
          <button
            className="admin-btn admin-btn-primary"
            disabled={!dirty || saving}
            onClick={save}
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </header>

      {/* Company Info */}
      <section className="admin-section">
        <div className="admin-section-header"><h2>Informações da Empresa</h2></div>
        <div className="admin-card">
          <div className="admin-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Nome da Empresa</label>
                <input className="admin-input" value={settings.companyName} onChange={(e) => updateField("companyName", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Email</label>
                <input className="admin-input" type="email" value={settings.companyEmail} onChange={(e) => updateField("companyEmail", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Telefone</label>
                <input className="admin-input" value={settings.companyPhone} onChange={(e) => updateField("companyPhone", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Endereço</label>
                <input className="admin-input" value={settings.companyAddress} onChange={(e) => updateField("companyAddress", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="admin-section">
        <div className="admin-section-header"><h2>Redes Sociais</h2></div>
        <div className="admin-card">
          <div className="admin-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">LinkedIn</label>
                <input className="admin-input" placeholder="https://linkedin.com/company/..." value={settings.socialLinkedin} onChange={(e) => updateField("socialLinkedin", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">GitHub</label>
                <input className="admin-input" placeholder="https://github.com/..." value={settings.socialGithub} onChange={(e) => updateField("socialGithub", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Instagram</label>
                <input className="admin-input" placeholder="https://instagram.com/..." value={settings.socialInstagram} onChange={(e) => updateField("socialInstagram", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Defaults */}
      <section className="admin-section">
        <div className="admin-section-header"><h2>SEO Padrão</h2></div>
        <div className="admin-card">
          <div className="admin-card-body">
            <div className="admin-form-group">
              <label className="admin-form-label">Título padrão</label>
              <input className="admin-input" value={settings.seoDefaultTitle} onChange={(e) => updateField("seoDefaultTitle", e.target.value)} />
              <span className="admin-form-hint">Título usado como fallback meta tag</span>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Descrição padrão</label>
              <textarea className="admin-input admin-textarea" value={settings.seoDefaultDescription} onChange={(e) => updateField("seoDefaultDescription", e.target.value)} />
              <span className="admin-form-hint">Descrição meta tag usada quando a página não define uma específica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Status */}
      <section className="admin-section">
        <div className="admin-section-header"><h2>Integrações</h2></div>
        <div className="admin-card">
          <div className="admin-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {Object.entries(settings.integrations).map(([key, active]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", background: "var(--surface-raised)", borderRadius: "0.5rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: active ? "#10b981" : "#ef4444", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text)", textTransform: "capitalize" }}>
                    {key === "evolutionApi" ? "Evolution API" : key === "ga4" ? "Google Analytics" : key}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: active ? "#10b981" : "var(--muted)", marginLeft: "auto" }}>
                    {active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
            </div>
            <p className="admin-form-hint" style={{ marginTop: "1rem" }}>
              Status das integrações detectado automaticamente via variáveis de ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Identity & Access */}
      <section className="admin-section">
        <div className="admin-section-header"><h2>Identidade & Acesso</h2></div>
        <div className="admin-card">
          <div className="admin-card-body">
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
              Usuários, permissões e perfis são gerenciados centralmente no NuPIdentity.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={process.env.NEXT_PUBLIC_NUPIDENTITY_CONSOLE_URL || "https://identify.nuptechs.com/console"}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>👥</span> Gerenciar Usuários
                <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>↗</span>
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_NUPIDENTITY_CONSOLE_URL || "https://identify.nuptechs.com/console"}/functions`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>🔑</span> Gerenciar Permissões
                <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>↗</span>
              </a>
            </div>
            <p className="admin-form-hint" style={{ marginTop: "0.75rem" }}>
              Permissões do nuptechs: <code style={{ fontSize: "0.75rem", background: "var(--surface-raised)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>nuptechs:admin</code>{" "}
              <code style={{ fontSize: "0.75rem", background: "var(--surface-raised)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>nuptechs:content</code>{" "}
              <code style={{ fontSize: "0.75rem", background: "var(--surface-raised)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>nuptechs:viewer</code>
            </p>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="admin-toast-container">
          <div className={`admin-toast ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
