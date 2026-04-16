"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./silkeny.module.css";

type InstallPromptChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallPromptChoice>;
};

const contactNumber = "+5561993691692";
const contactNumberLabel = "+55 (61) 99369-1692";
const whatsappUrl = `https://wa.me/${contactNumber.slice(1)}?text=${encodeURIComponent(
  "Ola Silkeny! Vi seu cartao NuPtechs e gostaria de saber mais."
)}`;

export default function CommercialCard() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const installTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    const handleBeforeInstallPrompt = (event: Event) => {
      if (isStandalone) {
        return;
      }

      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);

      if (installTimeoutRef.current !== null) {
        window.clearTimeout(installTimeoutRef.current);
      }

      installTimeoutRef.current = window.setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/silkeny/sw.js").catch(() => undefined);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      if (installTimeoutRef.current !== null) {
        window.clearTimeout(installTimeoutRef.current);
      }
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(() => null);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  }

  function closeInstallBanner() {
    setShowInstallBanner(false);
  }

  return (
    <main className={styles.shell}>
      <div className={styles.scanOverlay} aria-hidden="true">
        <div className={styles.scanRing}>
          <svg className={styles.scanIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" opacity="0.3" />
            <path d="M8.5 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5V9z" />
            <path d="M12 8.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5z" />
            <path d="M14 9a.5.5 0 0 1 .5-.5h.5a2 2 0 0 1 0 4h-.5v2.5a.5.5 0 0 1-1 0V9z" opacity="0.7" />
          </svg>
        </div>
        <div className={styles.scanLabel}>NuPtechs · NFC</div>
      </div>

      <div className={styles.bg} aria-hidden="true">
        <div className={styles.dots} />
        <div className={styles.bloom1} />
        <div className={styles.bloom2} />
      </div>

      <div className={styles.page}>
        <div className={styles.topbar}>
          <div className={styles.logoRow}>
            <div className={styles.mark}>NP</div>
            <div className={styles.wordmark}>
              Nu<span>P</span>techs
            </div>
          </div>
          <div className={styles.liveDot}>
            <div className={styles.dot} />
            Ao vivo
          </div>
        </div>

        <section className={styles.card} aria-label="Cartao comercial da Silkeny Ferreira">
          <div className={styles.cardShimmer} />
          <div className={styles.cardBody}>
            <div className={styles.identity}>
              <div className={styles.avatarShell}>
                <div className={styles.avatarCore}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="18" cy="12" r="7" stroke="#6C63FF" strokeWidth="1.8" fill="rgba(108,99,255,0.15)" />
                    <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#6C63FF" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className={styles.idInfo}>
                <div className={styles.name}>Silkeny Ferreira</div>
                <div className={styles.roleTag}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  Diretora Comercial
                </div>
              </div>
            </div>

            <div className={styles.rule} />

            <div className={styles.actions}>
              <a href="/silkeny/contato.vcf" download className={`${styles.btn} ${styles.btnPrimary}`}>
                <div className={styles.btnIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className={styles.btnLabel}>
                  <span className={styles.btnLabelMain}>Salvar Contato</span>
                  <span className={styles.btnLabelSub}>Adicionar a agenda do celular</span>
                </div>
                <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnWhatsapp}`}>
                <div className={styles.btnIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </div>
                <div className={styles.btnLabel}>
                  <span className={styles.btnLabelMain}>WhatsApp</span>
                  <span className={styles.btnLabelSub}>{contactNumberLabel}</span>
                </div>
                <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>

              <a href={`tel:${contactNumber}`} className={`${styles.btn} ${styles.btnGhost}`}>
                <div className={`${styles.btnIcon} ${styles.btnIconPhone}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.69 5.69l.95-.95a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 21.18 16a2 2 0 0 1 .74.92z" />
                  </svg>
                </div>
                <div className={styles.btnLabel}>
                  <span className={styles.btnLabelMain}>Ligar</span>
                  <span className={styles.btnLabelSub}>{contactNumberLabel}</span>
                </div>
                <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8BAD" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>

              <a href="mailto:silkeny@nuptechs.com" className={`${styles.btn} ${styles.btnGhost}`}>
                <div className={`${styles.btnIcon} ${styles.btnIconEmail}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className={styles.btnLabel}>
                  <span className={styles.btnLabelMain}>E-mail</span>
                  <span className={styles.btnLabelSub}>silkeny@nuptechs.com</span>
                </div>
                <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8BAD" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>

              <a href="https://www.nuptechs.com" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
                <div className={`${styles.btnIcon} ${styles.btnIconSite}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A8BAD" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className={styles.btnLabel}>
                  <span className={styles.btnLabelMain}>nuptechs.com</span>
                  <span className={styles.btnLabelSub}>Conheca nossa plataforma</span>
                </div>
                <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8BAD" strokeWidth="2.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            </div>

            <div className={styles.infoStrip}>
              <div className={styles.infoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoTitle}>NuPtechs Tecnologia</div>
                <div className={styles.infoDesc}>
                  <strong>Automacao · Contratos de TI · IA Documental</strong>
                  <br />
                  Solucoes enterprise para gestao inteligente.
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className={styles.footer}>
          <a href="https://www.nuptechs.com" className={styles.footerUrl}>nuptechs<span>.com</span></a>
          <span className={styles.footerCopy}>© 2026 NuPtechs</span>
        </div>
      </div>

      <div className={`${styles.installBanner} ${showInstallBanner ? styles.installBannerVisible : ""}`.trim()}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <div className={styles.installText}>
          <b>Adicionar a tela inicial</b>
          <span>Acesse o cartao da Silkeny rapidamente</span>
        </div>
        <button type="button" className={styles.installButton} onClick={handleInstallClick}>Instalar</button>
        <button type="button" className={styles.installClose} onClick={closeInstallBanner} aria-label="Fechar aviso de instalacao">x</button>
      </div>
    </main>
  );
}