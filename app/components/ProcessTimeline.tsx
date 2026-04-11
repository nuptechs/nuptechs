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
    ctaLabel: "Solicitar diagnóstico",
    stageLabel: "Etapa",
    ofLabel: "de",
    steps: [
      {
        num: "01",
        tag: "Diagnóstico",
        title: "Entendemos o seu desafio em 24 horas",
        body: "Mapeamos seu contexto técnico, identificamos gargalos e entregamos um diagnóstico objetivo no dia seguinte — sem compromisso.",
        visual: {
          headline: "diagnostico.resultado",
          lines: [
            { label: "Complexidade", value: "Média" },
            { label: "Prazo estimado", value: "6 semanas" },
            { label: "Investimento", value: "Sob consulta" },
            { label: "Status", value: "Aprovado ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "1ª versão",
        title: "Seu sistema funcionando em 7 dias",
        body: "Telas reais, fluxos navegáveis e validação com usuários. Nada de slides — você interage com o produto antes de investir no desenvolvimento completo.",
        visual: {
          headline: "v1.deploy",
          lines: [
            { label: "Telas criadas", value: "12" },
            { label: "Fluxos mapeados", value: "5" },
            { label: "Feedback", value: "Validado" },
            { label: "Próximo passo", value: "Desenvolvimento →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Desenvolvimento",
        title: "Sprints curtos, entregas contínuas",
        body: "Ciclos de 2 semanas com entregas incrementais. Você acompanha cada avanço, prioriza features e ajusta o rumo em tempo real.",
        visual: {
          headline: "sprint.progresso",
          lines: [
            { label: "Sprint atual", value: "Sprint 3" },
            { label: "Tarefas concluídas", value: "24/28" },
            { label: "Cobertura", value: "94%" },
            { label: "Velocidade", value: "Acima da meta ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Lançamento",
        title: "Deploy, monitoramento e suporte contínuo",
        body: "Infraestrutura configurada, CI/CD automatizado, documentação técnica completa e suporte pós-go-live — tudo incluído.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Ambiente", value: "Produção" },
            { label: "Uptime", value: "99.9%" },
            { label: "Monitoramento", value: "Ativo 24/7" },
            { label: "SLA", value: "Contratado ✓", accent: true },
          ],
        },
      },
    ],
  },
  en: {
    ctaLabel: "Request a diagnosis",
    stageLabel: "Step",
    ofLabel: "of",
    steps: [
      {
        num: "01",
        tag: "Diagnosis",
        title: "We understand your challenge within 24 hours",
        body: "We map your technical context, identify bottlenecks, and return an objective diagnosis the next day — no strings attached.",
        visual: {
          headline: "diagnosis.result",
          lines: [
            { label: "Complexity", value: "Medium" },
            { label: "Estimated timeline", value: "6 weeks" },
            { label: "Investment", value: "Quoted" },
            { label: "Status", value: "Approved ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "First version",
        title: "Your product running in 7 days",
        body: "Real screens, navigable flows, and user validation. No slides — you interact with the product before committing to full delivery.",
        visual: {
          headline: "v1.deploy",
          lines: [
            { label: "Screens built", value: "12" },
            { label: "Flows mapped", value: "5" },
            { label: "Feedback", value: "Validated" },
            { label: "Next step", value: "Build →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Build",
        title: "Short sprints, visible delivery",
        body: "Two-week cycles with incremental releases. You follow progress in real time, prioritize features, and keep the roadmap grounded in outcomes.",
        visual: {
          headline: "sprint.progress",
          lines: [
            { label: "Current sprint", value: "Sprint 3" },
            { label: "Tasks done", value: "24/28" },
            { label: "Coverage", value: "94%" },
            { label: "Velocity", value: "Above target ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Launch",
        title: "Deploy, observability, and ongoing support",
        body: "Infrastructure configured, CI/CD automated, documentation in place, and post-go-live support included so your team can move with confidence.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Environment", value: "Production" },
            { label: "Uptime", value: "99.9%" },
            { label: "Monitoring", value: "Live 24/7" },
            { label: "SLA", value: "Active ✓", accent: true },
          ],
        },
      },
    ],
  },
  es: {
    ctaLabel: "Solicitar diagnóstico",
    stageLabel: "Paso",
    ofLabel: "de",
    steps: [
      {
        num: "01",
        tag: "Diagnóstico",
        title: "Entendemos tu desafío en 24 horas",
        body: "Mapeamos tu contexto técnico, identificamos cuellos de botella y devolvemos un diagnóstico objetivo al día siguiente — sin compromiso.",
        visual: {
          headline: "diagnostico.resultado",
          lines: [
            { label: "Complejidad", value: "Media" },
            { label: "Plazo estimado", value: "6 semanas" },
            { label: "Inversión", value: "A cotizar" },
            { label: "Estado", value: "Aprobado ✓", accent: true },
          ],
        },
      },
      {
        num: "02",
        tag: "1ª versión",
        title: "Tu sistema funcionando en 7 días",
        body: "Pantallas reales, flujos navegables y validación con usuarios. Nada de slides: interactúas con el producto antes de invertir en el desarrollo completo.",
        visual: {
          headline: "v1.deploy",
          lines: [
            { label: "Pantallas creadas", value: "12" },
            { label: "Flujos mapeados", value: "5" },
            { label: "Feedback", value: "Validado" },
            { label: "Próximo paso", value: "Desarrollo →", accent: true },
          ],
        },
      },
      {
        num: "03",
        tag: "Desarrollo",
        title: "Sprints cortos y entregas continuas",
        body: "Ciclos de 2 semanas con entregas incrementales. Sigues cada avance en tiempo real, priorizas funcionalidades y ajustas el rumbo con rapidez.",
        visual: {
          headline: "sprint.progreso",
          lines: [
            { label: "Sprint actual", value: "Sprint 3" },
            { label: "Tareas cerradas", value: "24/28" },
            { label: "Cobertura", value: "94%" },
            { label: "Velocidad", value: "Sobre la meta ↑", accent: true },
          ],
        },
      },
      {
        num: "04",
        tag: "Lanzamiento",
        title: "Deploy, monitoreo y soporte continuo",
        body: "Infraestructura configurada, CI/CD automatizado, documentación técnica completa y soporte post-lanzamiento incluido.",
        visual: {
          headline: "deploy.status",
          lines: [
            { label: "Ambiente", value: "Producción" },
            { label: "Uptime", value: "99.9%" },
            { label: "Monitoreo", value: "Activo 24/7" },
            { label: "SLA", value: "Vigente ✓", accent: true },
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
