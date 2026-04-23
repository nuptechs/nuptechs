"use client";

import { useCallback, useEffect, useState } from "react";

type Instance = {
  instanceName: string;
  status: string;
  ownerJid: string | null;
  number: string | null;
  profileName: string | null;
  profilePicUrl: string | null;
  isActive: boolean;
};

type QrResponse = {
  base64: string | null;
  code: string | null;
  pairingCode: string | null;
};

function formatPhone(num: string | null): string {
  if (!num) return "—";
  const digits = num.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("55")) {
    const ddd = digits.slice(2, 4);
    const p1 = digits.slice(4, 9);
    const p2 = digits.slice(9);
    return `+55 (${ddd}) ${p1}-${p2}`;
  }
  return `+${digits}`;
}

function statusBadge(status: string) {
  const s = status.toLowerCase();
  if (s === "open") return { label: "Conectado", cls: "badge-connected-wa", dot: "wa-dot-green" };
  if (s === "connecting") return { label: "Aguardando", cls: "badge-pending", dot: "wa-dot-yellow" };
  return { label: status || "Desconectado", cls: "badge-cancelled", dot: "wa-dot-red" };
}

export default function WhatsAppPage() {
  const [active, setActive] = useState<string>("");
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [qrFor, setQrFor] = useState<string | null>(null);
  const [qr, setQr] = useState<QrResponse | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchInstances = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/admin/whatsapp/instances", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Falha ao listar instâncias");
        return;
      }
      setActive(data.active || "");
      setInstances(data.instances || []);
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  useEffect(() => {
    if (!qr) return;
    const id = setInterval(fetchInstances, 10_000);
    return () => clearInterval(id);
  }, [qr, fetchInstances]);

  async function handleSetActive(name: string) {
    setBusy(name);
    setError(null);
    try {
      const res = await fetch("/api/admin/whatsapp/instances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instanceName: name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Falha ao definir instância ativa");
        return;
      }
      await fetchInstances();
    } finally {
      setBusy(null);
    }
  }

  async function handleGenerateQr(name: string) {
    setBusy(name);
    setError(null);
    setQr(null);
    setQrFor(name);
    try {
      const res = await fetch(
        `/api/admin/whatsapp/instances/${encodeURIComponent(name)}/connect`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Falha ao gerar QR");
        setQrFor(null);
        return;
      }
      setQr(data);
    } catch {
      setError("Erro de conexão");
      setQrFor(null);
    } finally {
      setBusy(null);
    }
  }

  async function handleDisconnect(name: string) {
    if (!confirm(`Desconectar WhatsApp de "${name}"?`)) return;
    setBusy(name);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/whatsapp/instances/${encodeURIComponent(name)}/disconnect`,
        { method: "POST" }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Falha ao desconectar");
        return;
      }
      if (qrFor === name) {
        setQr(null);
        setQrFor(null);
      }
      await fetchInstances();
    } finally {
      setBusy(null);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim().toLowerCase();
    if (!name) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/whatsapp/instances/${encodeURIComponent(name)}/create`,
        { method: "POST" }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Falha ao criar instância");
        return;
      }
      setNewName("");
      await fetchInstances();
      await handleGenerateQr(name);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>WhatsApp</h1>
        <p className="admin-subtitle">
          Gerencie quais números enviam o cartão comercial. A instância marcada
          como <strong>Ativa</strong> é usada por <code>/api/share-card</code>.
          {active && (
            <>
              {" "}Atualmente ativa: <code>{active}</code>.
            </>
          )}
        </p>
      </header>

      {error && (
        <div className="wa-alert wa-alert-error">
          <span className="wa-alert-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="admin-section">
        <h2>Instâncias</h2>

        {loading ? (
          <div className="wa-card">
            <div className="wa-loading">Carregando...</div>
          </div>
        ) : instances.length === 0 ? (
          <div className="wa-card">
            <p>Nenhuma instância encontrada. Crie uma abaixo.</p>
          </div>
        ) : (
          <div className="wa-instance-list">
            {instances.map((inst) => {
              const badge = statusBadge(inst.status);
              const phone = formatPhone(
                inst.ownerJid?.replace(/@s\.whatsapp\.net$/, "") ?? inst.number
              );
              const isBusy = busy === inst.instanceName;
              return (
                <div key={inst.instanceName} className="wa-card" style={{ marginBottom: 12 }}>
                  <div className="wa-status-row">
                    <div className="wa-status-info">
                      <div className="wa-status-label">Instância</div>
                      <div className="wa-status-value font-medium">
                        {inst.instanceName}{" "}
                        {inst.isActive && (
                          <span className="admin-badge badge-connected-wa">★ Ativa</span>
                        )}
                      </div>
                    </div>
                    <div className="wa-status-info">
                      <div className="wa-status-label">Status</div>
                      <div className="wa-status-value">
                        <span className={`admin-badge ${badge.cls}`}>
                          <span className={`wa-dot ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    <div className="wa-status-info">
                      <div className="wa-status-label">Número</div>
                      <div className="wa-status-value font-medium">{phone}</div>
                    </div>
                    <div className="wa-status-info">
                      <div className="wa-status-label">Perfil</div>
                      <div className="wa-status-value">{inst.profileName || "—"}</div>
                    </div>
                  </div>

                  <div className="wa-actions">
                    {!inst.isActive && (
                      <button
                        onClick={() => handleSetActive(inst.instanceName)}
                        disabled={isBusy}
                        className="wa-btn wa-btn-primary"
                      >
                        {isBusy ? "..." : "Usar este número"}
                      </button>
                    )}
                    {inst.status === "open" ? (
                      <button
                        onClick={() => handleDisconnect(inst.instanceName)}
                        disabled={isBusy}
                        className="wa-btn wa-btn-danger"
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGenerateQr(inst.instanceName)}
                        disabled={isBusy}
                        className="wa-btn wa-btn-secondary"
                      >
                        {isBusy ? "Gerando..." : "Parear (QR)"}
                      </button>
                    )}
                  </div>

                  {qrFor === inst.instanceName && qr?.base64 && (
                    <div className="wa-qr-container" style={{ marginTop: 16 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qr.base64} alt={`QR ${inst.instanceName}`} className="wa-qr-image" />
                      <p className="wa-qr-expire">
                        Abra WhatsApp → Configurações → Dispositivos conectados →
                        Conectar um dispositivo. O QR expira em ~60s.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="wa-actions" style={{ marginTop: 16 }}>
          <button onClick={fetchInstances} disabled={loading} className="wa-btn wa-btn-secondary">
            Atualizar
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h2>Criar nova instância</h2>
        <form onSubmit={handleCreate} className="wa-card">
          <p className="admin-subtitle" style={{ marginTop: 0 }}>
            Use apenas letras minúsculas, números e hífen (ex.: <code>nuptechs-vendas</code>).
          </p>
          <div className="wa-actions" style={{ alignItems: "center" }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="nuptechs-vendas"
              pattern="[a-z0-9-]+"
              required
              disabled={creating}
              style={{
                flex: 1,
                minWidth: 240,
                padding: "0.6rem 0.9rem",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.04)",
                color: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={creating || !newName.trim()}
              className="wa-btn wa-btn-primary"
            >
              {creating ? "Criando..." : "Criar e parear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
