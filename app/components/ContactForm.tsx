"use client";

import { useState } from "react";

type Lang = "pt" | "en" | "es";
type Status = "idle" | "loading" | "success" | "error";

const i18n = {
  pt: {
    heading: "Solicitar diagnóstico gratuito",
    subheading: "Resposta em até 24h úteis. Atendemos Brasil e exterior.",
    nameLabel: "Nome *",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail *",
    emailPlaceholder: "voce@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nome da sua empresa (opcional)",
    challengeLabel: "Seu desafio *",
    challengePlaceholder: "Descreva brevemente o problema que quer resolver ou o sistema que precisa construir...",
    submitButton: "Enviar e receber diagnóstico grátis",
    submitting: "Enviando...",
    successTitle: "Mensagem enviada!",
    successBody: "Você receberá uma confirmação por e-mail. Nossa equipe responde em até 24h úteis.",
    sendAnother: "Enviar outro",
    privacy: "Protegido pela <strong>LGPD</strong>. Nenhum dado é compartilhado com terceiros.",
    errorFallbackApi: "Erro ao enviar.",
    errorFallback: "Erro ao enviar. Tente novamente.",
  },
  en: {
    heading: "Request a free diagnosis",
    subheading: "Response within 24 business hours. We serve Brazil and abroad.",
    nameLabel: "Name *",
    namePlaceholder: "Your name",
    emailLabel: "Email *",
    emailPlaceholder: "you@company.com",
    companyLabel: "Company",
    companyPlaceholder: "Your company name (optional)",
    challengeLabel: "Your challenge *",
    challengePlaceholder: "Briefly describe the problem you want to solve or the system you need to build...",
    submitButton: "Send and get a free diagnosis",
    submitting: "Sending...",
    successTitle: "Message sent!",
    successBody: "You will receive a confirmation by email. Our team responds within 24 business hours.",
    sendAnother: "Send another",
    privacy: "Protected by <strong>LGPD</strong>. No data is shared with third parties.",
    errorFallbackApi: "Failed to send.",
    errorFallback: "Failed to send. Please try again.",
  },
  es: {
    heading: "Solicitar diagnóstico gratuito",
    subheading: "Respuesta en hasta 24h hábiles. Atendemos Brasil y exterior.",
    nameLabel: "Nombre *",
    namePlaceholder: "Tu nombre",
    emailLabel: "Correo *",
    emailPlaceholder: "tu@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nombre de tu empresa (opcional)",
    challengeLabel: "Tu desafío *",
    challengePlaceholder: "Describe brevemente el problema que quieres resolver o el sistema que necesitas construir...",
    submitButton: "Enviar y recibir diagnóstico gratis",
    submitting: "Enviando...",
    successTitle: "¡Mensaje enviado!",
    successBody: "Recibirás una confirmación por correo. Nuestro equipo responde en hasta 24h hábiles.",
    sendAnother: "Enviar otro",
    privacy: "Protegido por la <strong>LGPD</strong>. Ningún dato es compartido con terceros.",
    errorFallbackApi: "Error al enviar.",
    errorFallback: "Error al enviar. Inténtalo de nuevo.",
  },
} as const;

export default function ContactForm({ lang = "pt" }: { lang?: Lang }) {
  const t = i18n[lang] ?? i18n.pt;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      challenge: (form.elements.namedItem("challenge") as HTMLTextAreaElement).value.trim()
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? t.errorFallbackApi);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t.errorFallback);
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-950">
          ✅
        </div>
        <h3 className="text-lg font-bold text-[var(--text)]">{t.successTitle}</h3>
        <p className="text-sm text-[var(--muted)]">
          {t.successBody}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-2"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4" noValidate>
      <div>
        <p className="mb-1 text-sm font-semibold text-[var(--text)]">{t.heading}</p>
        <p className="text-sm text-[var(--muted)]">{t.subheading}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label mb-1.5 block">
            {t.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={t.namePlaceholder}
            className="field"
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label mb-1.5 block">
            {t.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className="field"
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="field-label mb-1.5 block">
          {t.companyLabel}
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          placeholder={t.companyPlaceholder}
          className="field"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="contact-challenge" className="field-label mb-1.5 block">
          {t.challengeLabel}
        </label>
        <textarea
          id="contact-challenge"
          name="challenge"
          required
          rows={4}
          placeholder={t.challengePlaceholder}
          className="field resize-none"
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submitButton}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-[var(--subtle)]">
        🔒 <span dangerouslySetInnerHTML={{ __html: t.privacy }} />
      </p>
    </form>
  );
}
