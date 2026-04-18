"use client";

import { useCallback, useEffect, useState } from "react";

type InstanceStatus = {
  instanceName: string;
  status: string;
  ownerJid: string | null;
  number: string | null;
};

type QrResponse = {
  base64: string | null;
  code: string | null;
  pairingCode: string | null;
  error?: string;
};

export default function WhatsAppPage() {
  const [instance, setInstance] = useState<InstanceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState<QrResponse | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/whatsapp/status");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Falha ao consultar status");
        return;
      }
      const data: InstanceStatus = await res.json();
      setInstance(data);

      // If connected, clear any QR code
      if (data.status === "open") {
        setQr(null);
      }
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Auto-refresh status every 10s when waiting for QR scan
  useEffect(() => {
    if (!qr) return;
    const interval = setInterval(fetchStatus, 10_000);
    return () => clearInterval(interval);
  }, [qr, fetchStatus]);

  async function handleGenerateQr() {
    setQrLoading(true);
    setError(null);
    setQr(null);
    try {
      const res = await fetch("/api/whatsapp/qrcode", { method: "POST" });
      const data: QrResponse = await res.json();
      if (!res.ok) {
        setError(data.error || "Falha ao gerar QR code");
        return;
      }
      setQr(data);
      // Refresh status after generating QR
      setTimeout(fetchStatus, 2000);
    } catch {
      setError("Erro de conexão");
    } finally {
      setQrLoading(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm("Deseja desconectar o WhatsApp desta instância?")) return;
    setDisconnecting(true);
    setError(null);
    try {
      const res = await fetch("/api/whatsapp/disconnect", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Falha ao desconectar");
        return;
      }
      setQr(null);
      await fetchStatus();
    } catch {
      setError("Erro de conexão");
    } finally {
      setDisconnecting(false);
    }
  }

  const isConnected = instance?.status === "open";
  const isConnecting = instance?.status === "connecting";
  const phoneNumber = instance?.ownerJid?.replace(/@s\.whatsapp\.net$/, "") ?? instance?.number;

  function formatPhone(num: string) {
    // Format: +55 (62) 98550-7649
    if (num.length === 13 && num.startsWith("55")) {
      const ddd = num.slice(2, 4);
      const part1 = num.slice(4, 9);
      const part2 = num.slice(9);
      return `+55 (${ddd}) ${part1}-${part2}`;
    }
    return `+${num}`;
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <h1>WhatsApp</h1>
        <p className="admin-subtitle">
          Gerencie a conexão WhatsApp para envio de cartões comerciais
        </p>
      </header>

      {error && (
        <div className="wa-alert wa-alert-error">
          <span className="wa-alert-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Instance Status Card */}
      <div className="admin-section">
        <h2>Status da Instância</h2>

        {loading ? (
          <div className="wa-card">
            <div className="wa-loading">Carregando...</div>
          </div>
        ) : (
          <div className="wa-card">
            <div className="wa-status-row">
              <div className="wa-status-info">
                <div className="wa-status-label">Instância</div>
                <div className="wa-status-value font-medium">
                  {instance?.instanceName ?? "—"}
                </div>
              </div>
              <div className="wa-status-info">
                <div className="wa-status-label">Status</div>
                <div className="wa-status-value">
                  <span
                    className={`admin-badge ${
                      isConnected
                        ? "badge-connected-wa"
                        : isConnecting
                        ? "badge-pending"
                        : "badge-cancelled"
                    }`}
                  >
                    <span
                      className={`wa-dot ${
                        isConnected
                          ? "wa-dot-green"
                          : isConnecting
                          ? "wa-dot-yellow"
                          : "wa-dot-red"
                      }`}
                    />
                    {isConnected
                      ? "Conectado"
                      : isConnecting
                      ? "Aguardando conexão"
                      : instance?.status ?? "Desconectado"}
                  </span>
                </div>
              </div>
              <div className="wa-status-info">
                <div className="wa-status-label">Número</div>
                <div className="wa-status-value font-medium">
                  {phoneNumber ? formatPhone(phoneNumber) : "Nenhum vinculado"}
                </div>
              </div>
            </div>

            <div className="wa-actions">
              {isConnected ? (
                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="wa-btn wa-btn-danger"
                >
                  {disconnecting ? "Desconectando..." : "Desconectar"}
                </button>
              ) : (
                <button
                  onClick={handleGenerateQr}
                  disabled={qrLoading}
                  className="wa-btn wa-btn-primary"
                >
                  {qrLoading ? "Gerando..." : "Gerar QR Code"}
                </button>
              )}
              <button
                onClick={fetchStatus}
                disabled={loading}
                className="wa-btn wa-btn-secondary"
              >
                Atualizar Status
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Code */}
      {qr?.base64 && (
        <div className="admin-section">
          <h2>Escanear QR Code</h2>
          <div className="wa-card wa-qr-card">
            <div className="wa-qr-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qr.base64}
                alt="WhatsApp QR Code"
                className="wa-qr-image"
              />
            </div>
            <div className="wa-qr-instructions">
              <p className="wa-qr-step">
                <strong>1.</strong> Abra o <strong>WhatsApp</strong> no celular
              </p>
              <p className="wa-qr-step">
                <strong>2.</strong> Vá em{" "}
                <strong>Configurações → Dispositivos conectados</strong>
              </p>
              <p className="wa-qr-step">
                <strong>3.</strong> Toque em{" "}
                <strong>Conectar um dispositivo</strong>
              </p>
              <p className="wa-qr-step">
                <strong>4.</strong> Aponte a câmera para o QR code acima
              </p>
              <p className="wa-qr-expire">
                O QR code expira em ~60 segundos. Clique em &quot;Gerar QR
                Code&quot; para gerar um novo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
