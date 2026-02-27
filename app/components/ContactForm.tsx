"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
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
        throw new Error(body.error ?? "Erro ao enviar.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-950">
          ✅
        </div>
        <h3 className="text-lg font-bold text-[var(--text)]">Mensagem enviada!</h3>
        <p className="text-sm text-[var(--muted)]">
          Você receberá uma confirmação por e-mail. Nossa equipe responde em até 24h úteis.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-2"
        >
          Enviar outro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4" noValidate>
      <div>
        <p className="mb-1 text-sm font-semibold text-[var(--text)]">Solicitar diagnóstico gratuito</p>
        <p className="text-sm text-[var(--muted)]">Resposta em até 24h úteis. Atendemos Brasil e exterior.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label mb-1.5 block">
            Nome *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Seu nome"
            className="field"
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label mb-1.5 block">
            E-mail *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="voce@empresa.com"
            className="field"
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="field-label mb-1.5 block">
          Empresa
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          placeholder="Nome da sua empresa (opcional)"
          className="field"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="contact-challenge" className="field-label mb-1.5 block">
          Seu desafio *
        </label>
        <textarea
          id="contact-challenge"
          name="challenge"
          required
          rows={4}
          placeholder="Descreva brevemente o problema que quer resolver ou o sistema que precisa construir..."
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
            Enviando...
          </>
        ) : (
          <>
            Enviar e receber diagnóstico grátis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-[var(--subtle)]">
        🔒 Protegido pela <strong className="text-[var(--muted)]">LGPD</strong>. Nenhum dado é compartilhado com terceiros.
      </p>
    </form>
  );
}
