"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ScheduleForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tool, setTool] = useState<string>("");
  const [toolTouched, setToolTouched] = useState<boolean>(false);

  const suggestedTool = useMemo(() => detectToolFromEmail(email), [email]);

  useEffect(() => {
    if (!toolTouched && suggestedTool) {
      setTool(suggestedTool);
    }
  }, [suggestedTool, toolTouched]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = (await response.json()) as {
        message?: string;
        redirectUrl?: string;
      };

      if (!response.ok) {
        throw new Error(data?.message ?? "Falha ao enviar.");
      }

      setState("success");
      setMessage(
        data?.message ??
          "Recebemos seu pedido. Um especialista vai confirmar o horário em até 30 minutos úteis."
      );
      form.reset();
      setEmail("");
      setTool("");
      setToolTouched(false);

      if (data?.redirectUrl) {
        window.open(data.redirectUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setState("error");
      setMessage(
        "Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-live="polite"
      className="grid gap-4 text-sm"
    >
      <label className="grid gap-2">
        <span className="field-label">
          Nome completo
        </span>
        <input
          name="name"
          placeholder="Seu nome"
          required
          className="field"
        />
      </label>
      <label className="grid gap-2">
        <span className="field-label">
          Empresa
        </span>
        <input
          name="company"
          placeholder="Nome da empresa"
          required
          className="field"
        />
      </label>
      <label className="grid gap-2">
        <span className="field-label">
          E-mail corporativo
        </span>
        <input
          name="email"
          type="email"
          placeholder="voce@empresa.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field"
        />
      </label>
      <label className="grid gap-2">
        <span className="field-label">
          WhatsApp
        </span>
        <input
          name="phone"
          placeholder="(61) 99369-1692"
          required
          className="field"
        />
      </label>
      <label className="grid gap-2">
        <span className="field-label">
          Integração desejada
        </span>
        <select
          name="tool"
          required
          value={tool}
          onChange={(event) => {
            setToolTouched(true);
            setTool(event.target.value);
          }}
          className="field"
        >
          <option value="" disabled>
            Selecione a ferramenta
          </option>
          <option value="Google Calendar">Google Calendar</option>
          <option value="Microsoft Bookings">Microsoft Bookings</option>
          <option value="Calendly">Calendly</option>
          <option value="Cal.com">Cal.com</option>
          <option value="HubSpot Meetings">HubSpot Meetings</option>
        </select>
      </label>
      {suggestedTool && (
        <p
          className="rounded-xl border border-dashed border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-3 text-xs font-medium text-[var(--accent)]"
          role="status"
        >
          Sugestão automática: {suggestedTool}. Você pode alterar se preferir.
        </p>
      )}
      <label className="grid gap-2">
        <span className="field-label">
          Melhor dia/horário
        </span>
        <input
          name="timeslot"
          placeholder="Ex.: terça 10h ou quinta 16h"
          required
          className="field"
        />
      </label>
      <label className="grid gap-2">
        <span className="field-label">
          Conte rapidamente o desafio
        </span>
        <textarea
          name="summary"
          rows={4}
          placeholder="Quero automatizar..."
          className="field"
        />
      </label>
      <button
        className="button-primary w-full justify-center"
        type="submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Enviando..." : "Agendar diagnóstico"}
      </button>
      {message && (
        <p className="text-sm text-[var(--muted)]" role="status">
          {message}
        </p>
      )}
    </form>
  );
}

function detectToolFromEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";

  if (!domain) return "";

  const googleDomains = ["gmail.com", "googlemail.com", "google.com"];
  const microsoftDomains = [
    "outlook.com",
    "hotmail.com",
    "live.com",
    "office.com",
    "office365.com",
    "microsoft.com"
  ];

  if (googleDomains.includes(domain)) {
    return "Google Calendar";
  }

  if (microsoftDomains.includes(domain)) {
    return "Microsoft Bookings";
  }

  return "";
}
