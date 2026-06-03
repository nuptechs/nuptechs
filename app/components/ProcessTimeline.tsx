"use client";

import { useState, useRef, useEffect } from "react";

type Lang = "pt" | "en" | "es";

interface Step {
  num: string;
  tag: string;
  title: string;
  body: string;
  visual: {
    headline: string;
    lines: { label: string; value: string; accent?: boolean }[];
  };
}

const timelineCopy: Record<
  Lang,
  {
    ctaLabel: string;
    stageLabel: string;
    ofLabel: string;
    steps: Step[];
  }
> = {
  pt: {
    ctaLabel: "Solicitar planejamento",
    stageLabel: "Etapa",
    ofLabel: "de",
    steps: [
      {
        num: "01",
        tag: "Planejamento",
        title: "Planejamento em média 24h após a primeira reunião",
        body: "Mapeamos seu contexto técnico, identificamos gargalos e entregamos um plano objetivo logo após a conversa — sem compromisso.",
        visual: {
          headline: "planejamento.resultado",
          lines: [
            { label: "Escopo", value: "Mapeado" },
            { label: "Prazo", value: "Definido no plano" },
            { label: "Investimento", value: "Sob consulta" },
            { label: "Status", value: "Plano entregue ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "1ª entrega",
        title: "Primeira entrega em média 7 dias após o planejamento",
        body: "Telas reais e fluxos navegáveis pra você interagir com o produto antes de investir no desenvolvimento completo. Nada de slides.",
        visual: {
          headline: "entrega.v1",
          lines: [
            { label: "Telas", value: "Navegáveis" },
            { label: "Fluxos", value: "Reais" },
            { label: "Feedback", value: "Validado com você" },
            { label: "Próximo passo", value: "Desenvolvimento →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Desenvolvimento",
        title: "Entregas incrementais, toda semana",
        body: "Avanços entregues semana a semana. Você acompanha cada passo em tempo real, prioriza o que importa e ajusta o rumo quando quiser.",
        visual: {
          headline: "entregas.semanais",
          lines: [
            { label: "Cadência", value: "Semanal" },
            { label: "Acompanhamento", value: "Tempo real" },
            { label: "Qualidade", value: "CI/CD obrigatória" },
            { label: "Rumo", value: "Você ajusta ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Lançamento",
        title: "Lançamento muito mais rápido que fábricas tradicionais",
        body: "Prazos muito inferiores aos de fábricas de software rígidas. Infraestrutura, CI/CD automatizado, observabilidade configurada e suporte pós-go-live.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Ambiente", value: "Produção" },
            { label: "CI/CD", value: "Automatizado" },
            { label: "Observabilidade", value: "Configurada" },
            { label: "Suporte", value: "Pós-go-live ✓", accent: true },
          ],
        },
      },
    ],
  },
  en: {
    ctaLabel: "Request a plan",
    stageLabel: "Step",
    ofLabel: "of",
    steps: [
      {
        num: "01",
        tag: "Planning",
        title: "A plan within ~24h of our first meeting",
        body: "We map your technical context, identify bottlenecks, and return an objective plan right after the conversation — no strings attached.",
        visual: {
          headline: "planning.result",
          lines: [
            { label: "Scope", value: "Mapped" },
            { label: "Timeline", value: "Set in the plan" },
            { label: "Investment", value: "Quoted" },
            { label: "Status", value: "Plan delivered ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "First delivery",
        title: "First delivery in ~7 days after planning",
        body: "Real screens and navigable flows so you can interact with the product before committing to full delivery. No slides.",
        visual: {
          headline: "delivery.v1",
          lines: [
            { label: "Screens", value: "Navigable" },
            { label: "Flows", value: "Real" },
            { label: "Feedback", value: "Validated with you" },
            { label: "Next step", value: "Build →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Build",
        title: "Incremental delivery, every week",
        body: "Progress shipped week by week. You follow each step in real time, prioritize what matters, and adjust the course whenever you want.",
        visual: {
          headline: "weekly.delivery",
          lines: [
            { label: "Cadence", value: "Weekly" },
            { label: "Tracking", value: "Real time" },
            { label: "Quality", value: "CI/CD enforced" },
            { label: "Course", value: "You steer ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Launch",
        title: "Launch far faster than rigid software factories",
        body: "Timelines well below those of rigid software factories. Infrastructure, automated CI/CD, observability configured, and post-go-live support.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Environment", value: "Production" },
            { label: "CI/CD", value: "Automated" },
            { label: "Observability", value: "Configured" },
            { label: "Support", value: "Post-go-live ✓", accent: true },
          ],
        },
      },
    ],
  },
  es: {
    ctaLabel: "Solicitar planificación",
    stageLabel: "Paso",
    ofLabel: "de",
    steps: [
      {
        num: "01",
        tag: "Planificación",
        title: "Planificación en promedio 24h tras la primera reunión",
        body: "Mapeamos tu contexto técnico, identificamos cuellos de botella y devolvemos un plan objetivo justo después de la conversación — sin compromiso.",
        visual: {
          headline: "planificacion.resultado",
          lines: [
            { label: "Alcance", value: "Mapeado" },
            { label: "Plazo", value: "Definido en el plan" },
            { label: "Inversión", value: "A cotizar" },
            { label: "Estado", value: "Plan entregado ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "1ª entrega",
        title: "Primera entrega en promedio 7 días tras la planificación",
        body: "Pantallas reales y flujos navegables para que interactúes con el producto antes de invertir en el desarrollo completo. Nada de slides.",
        visual: {
          headline: "entrega.v1",
          lines: [
            { label: "Pantallas", value: "Navegables" },
            { label: "Flujos", value: "Reales" },
            { label: "Feedback", value: "Validado contigo" },
            { label: "Próximo paso", value: "Desarrollo →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Desarrollo",
        title: "Entregas incrementales, cada semana",
        body: "Avances entregados semana a semana. Sigues cada paso en tiempo real, priorizas lo que importa y ajustas el rumbo cuando quieras.",
        visual: {
          headline: "entregas.semanales",
          lines: [
            { label: "Cadencia", value: "Semanal" },
            { label: "Seguimiento", value: "Tiempo real" },
            { label: "Calidad", value: "CI/CD obligatoria" },
            { label: "Rumbo", value: "Tú ajustas ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Lanzamiento",
        title: "Lanzamiento mucho más rápido que las fábricas tradicionales",
        body: "Plazos muy inferiores a los de fábricas de software rígidas. Infraestructura, CI/CD automatizado, observabilidad configurada y soporte post-lanzamiento.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Ambiente", value: "Producción" },
            { label: "CI/CD", value: "Automatizado" },
            { label: "Observabilidad", value: "Configurada" },
            { label: "Soporte", value: "Post-lanzamiento ✓", accent: true },
          ],
        },
      },
    ],
  },
};

export default function ProcessTimeline({ lang = "pt" }: { lang?: Lang }) {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const copy = timelineCopy[lang] ?? timelineCopy.pt;
  const steps = copy.steps;

  useEffect(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const tabs = tabsRef.current.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const tab = tabs[active];
    if (!tab) return;
    const { offsetLeft, offsetWidth } = tab;
    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
    indicatorRef.current.style.width = `${offsetWidth}px`;
  }, [active, steps]);

  function handleSwitch(i: number) {
    if (i === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(i);
      setTransitioning(false);
    }, 200);
  }

  const step = steps[active] ?? steps[0];

  return (
    <div className="process-timeline">
      <div className="process-tabs-wrapper" data-reveal>
        <div className="process-tabs" ref={tabsRef}>
          {steps.map((s, i) => (
            <button
              key={s.num}
              data-tab
              className={`process-tab ${i === active ? "process-tab--active" : ""}`}
              onClick={() => handleSwitch(i)}
              aria-selected={i === active}
              role="tab"
            >
              <span className="process-tab__num">{s.num}</span>
              <span className="process-tab__tag">{s.tag}</span>
            </button>
          ))}
          <div className="process-tabs__indicator" ref={indicatorRef} aria-hidden="true" />
        </div>
        <div className="process-tabs__track" aria-hidden="true">
          <div
            className="process-tabs__progress"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className={`process-panel ${transitioning ? "process-panel--exit" : "process-panel--enter"}`}>
        <div className="process-panel__copy">
          <span className="eyebrow mb-3 block">{step.tag}</span>
          <h3 className="process-panel__title">{step.title}</h3>
          <p className="process-panel__body">{step.body}</p>
          {active === 0 && (
            <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary mt-6">
              {copy.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>

        <div className="process-panel__visual">
          <div className="process-visual">
            <div className="process-visual__chrome">
              <span className="process-visual__dot process-visual__dot--red" />
              <span className="process-visual__dot process-visual__dot--yellow" />
              <span className="process-visual__dot process-visual__dot--green" />
              <span className="process-visual__chrome-title">{step.visual.headline}</span>
            </div>
            <div className="process-visual__body">
              {step.visual.lines.map((line, i) => (
                <div key={line.label} className="process-visual__row" style={{ animationDelay: `${i * 80}ms` }}>
                  <span className="process-visual__key">{line.label}</span>
                  <span className="process-visual__sep">→</span>
                  <span className={`process-visual__val ${line.accent ? "process-visual__val--accent" : ""}`}>
                    {line.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="process-visual__badge">
              <span className="process-visual__badge-dot" />
              {copy.stageLabel} {step.num} {copy.ofLabel} 04
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
