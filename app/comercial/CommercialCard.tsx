"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./comercial.module.css";

type InstallPromptChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallPromptChoice>;
};

const contactNumber = "+5562985507649";
const contactNumberLabel = "+55 (62) 98550-7649";
const shareText = `Contato de Silkeny Ferreira — Diretor Comercial NuPtechs\nWhatsApp: ${contactNumberLabel}\nhttps://www.nuptechs.com/comercial`;
const shareWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

const whatsappUrl = `https://wa.me/${contactNumber.slice(1)}?text=${encodeURIComponent(
  "Ola Silkeny! Vi seu cartao NuPtechs e gostaria de saber mais."
)}`;

export default function CommercialCard() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const installTimeoutRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    const handleBeforeInstallPrompt = (event: Event) => {
      if (isStandalone) return;
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      if (installTimeoutRef.current !== null) window.clearTimeout(installTimeoutRef.current);
      installTimeoutRef.current = window.setTimeout(() => setShowInstallBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/comercial/sw.js").catch(() => undefined);
    }

    /* 3D tilt on pointer move (desktop only) */
    const card = cardRef.current;
    if (card && window.matchMedia("(hover: hover)").matches) {
      const handleMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
        card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
        if (stageRef.current) stageRef.current.style.animationPlayState = "paused";
      };
      const handleLeave = () => {
        card.style.transform = "";
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
        if (stageRef.current) stageRef.current.style.animationPlayState = "running";
      };
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
      return () => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        if (installTimeoutRef.current !== null) window.clearTimeout(installTimeoutRef.current);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      if (installTimeoutRef.current !== null) window.clearTimeout(installTimeoutRef.current);
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(() => null);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  }

  return (
    <main className={`${styles.shell} ${loaded ? styles.shellReady : ""}`}>
      {/* Ambient light blobs */}
      <div className={styles.ambient} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      <div className={styles.page}>
        {/* Brand header — top-left */}
        <header className={styles.header}>
          <a href="https://www.nuptechs.com" className={styles.logoLink}>
            <span className={styles.logoN}>N</span>
            <span className={styles.logoText}>techs</span>
          </a>
        </header>

        {/* Floating card */}
        <div ref={stageRef} className={styles.cardStage}>
        <section ref={cardRef} className={styles.card} aria-label="Cartao comercial de Silkeny Ferreira">
          {/* Top accent line */}
          <div className={styles.cardAccent} />

          <div className={styles.cardBody}>
            {/* Identity */}
            <div className={styles.identity}>
              <div className={styles.avatarRing}>
                <div className={styles.avatar}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <circle cx="20" cy="13" r="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                    <path d="M4 38c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className={styles.idInfo}>
                <h1 className={styles.name}>Silkeny Ferreira</h1>
                <div className={styles.role}>Diretor Comercial</div>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* Action buttons */}
            <div className={styles.actions}>
              <a href="/comercial/contato.vcf" download className={`${styles.actionBtn} ${styles.actionPrimary}`}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
                    <path d="M16 3v4M8 3v4M4 11h16" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <span className={styles.actionMain}>Salvar Contato</span>
                  <span className={styles.actionSub}>Adicionar a agenda</span>
                </div>
                <svg className={styles.actionArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </a>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.actionWhatsApp}`}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <span className={styles.actionMain}>WhatsApp</span>
                  <span className={styles.actionSub}>{contactNumberLabel}</span>
                </div>
                <svg className={styles.actionArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </a>

              <a href={`tel:${contactNumber}`} className={`${styles.actionBtn} ${styles.actionGhost}`}>
                <div className={`${styles.actionIcon} ${styles.actionIconPhone}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.69 5.69l.95-.95a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 21.18 16a2 2 0 0 1 .74.92z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <span className={styles.actionMain}>Ligar</span>
                  <span className={styles.actionSub}>{contactNumberLabel}</span>
                </div>
                <svg className={styles.actionArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </a>

              <a href="mailto:silkeny@nuptechs.com" className={`${styles.actionBtn} ${styles.actionGhost}`}>
                <div className={`${styles.actionIcon} ${styles.actionIconEmail}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <span className={styles.actionMain}>E-mail</span>
                  <span className={styles.actionSub}>silkeny@nuptechs.com</span>
                </div>
                <svg className={styles.actionArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </a>

              <a href="https://www.nuptechs.com" target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.actionGhost}`}>
                <div className={`${styles.actionIcon} ${styles.actionIconSite}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <span className={styles.actionMain}>nuptechs.com</span>
                  <span className={styles.actionSub}>Conheca nossa plataforma</span>
                </div>
                <svg className={styles.actionArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </a>
            </div>

            {/* NFC download — mobile only (hidden via CSS on desktop) */}
            <div className={styles.nfcSection}>
              <a href="/comercial/nuptechs-nfc.apk" download className={styles.nfcBtn}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18.01" />
                </svg>
                <div>
                  <span className={styles.nfcMain}>Baixar app NFC</span>
                  <span className={styles.nfcSub}>Transmita o cartao via NFC (Android)</span>
                </div>
              </a>
            </div>

            {/* Company info */}
            <div className={styles.companyStrip}>
              <div className={styles.companyIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className={styles.companyName}>NuPtechs Tecnologia</div>
                <p className={styles.companyDesc}>
                  Engenharia de Software e Automacao Empresarial — sistemas para toda complexidade.
                </p>
              </div>
            </div>

            {/* Share — subtle, inside card */}
            <a href={shareWhatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.shareLink} aria-label="Compartilhar cartao via WhatsApp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Compartilhar cartao
            </a>
          </div>
        </section>
        <div className={styles.cardShadow} aria-hidden="true" />
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <a href="https://www.nuptechs.com" className={styles.footerLink}>
            nuptechs<span>.com</span>
          </a>
          <span className={styles.footerCopy}>&copy; 2025 NuPtechs</span>
        </footer>
      </div>

      {/* PWA install banner */}
      <div className={`${styles.installBanner} ${showInstallBanner ? styles.installBannerShow : ""}`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <div className={styles.installText}>
          <b>Adicionar a tela inicial</b>
          <span>Acesse o cartao rapidamente</span>
        </div>
        <button type="button" className={styles.installBtn} onClick={handleInstallClick}>Instalar</button>
        <button type="button" className={styles.installClose} onClick={() => setShowInstallBanner(false)} aria-label="Fechar">×</button>
      </div>
    </main>
  );
}