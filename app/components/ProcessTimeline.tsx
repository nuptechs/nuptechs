"use client";

import { useState, useRef, useEffect } from "react";

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

const steps: Step[] = [
  {
    num: "01",
    tag: "Diagnóstico",
    title: "Entendemos o seu desafio em 24 horas",
    body: "Mapeamos seu contexto técnico, identificamos gargalos e entregamos um diagnóstico objetivo no dia seguinte — sem compromisso.",
    visual: {
      headline: "diagnóstico.resultado",
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
    tag: "1ª Versão",
    title: "Seu sistema funcionando em 7 dias",
    body: "Telas reais, fluxos navegáveis e validação com usuários. Nada de slides — você interage com o produto antes de investir em desenvolvimento completo.",
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
        { label: "Cobertura de testes", value: "94%" },
        { label: "Velocidade", value: "Acima da meta ↑", accent: true },
      ],
    },
  },
  {
    num: "04",
    tag: "Lançamento",
    title: "Deploy, monitoramento e suporte contínuo",
    body: "Infraestrutura configurada, CI/CD automatizado, documentação técnica completa e SLA de suporte — tudo incluído.",
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
];

export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Move indicator bar to active tab
  useEffect(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const tabs = tabsRef.current.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const tab = tabs[active];
    if (!tab) return;
    const { offsetLeft, offsetWidth } = tab;
    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
    indicatorRef.current.style.width = `${offsetWidth}px`;
  }, [active]);

  function handleSwitch(i: number) {
    if (i === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(i);
      setTransitioning(false);
    }, 200);
  }

  const step = steps[active];

  return (
    <div className="process-timeline">
      {/* ── Tab bar ── */}
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
        {/* progress connector */}
        <div className="process-tabs__track" aria-hidden="true">
          <div
            className="process-tabs__progress"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className={`process-panel ${transitioning ? "process-panel--exit" : "process-panel--enter"}`}>
        <div className="process-panel__copy">
          <span className="eyebrow mb-3 block">{step.tag}</span>
          <h3 className="process-panel__title">{step.title}</h3>
          <p className="process-panel__body">{step.body}</p>
          {active === 0 && (
            <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary mt-6">
              Solicitar diagnóstico
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>

        {/* visual mockup */}
        <div className="process-panel__visual">
          <div className="process-visual">
            {/* chrome */}
            <div className="process-visual__chrome">
              <span className="process-visual__dot process-visual__dot--red" />
              <span className="process-visual__dot process-visual__dot--yellow" />
              <span className="process-visual__dot process-visual__dot--green" />
              <span className="process-visual__chrome-title">{step.visual.headline}</span>
            </div>
            {/* body */}
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
            {/* step badge */}
            <div className="process-visual__badge">
              <span className="process-visual__badge-dot" />
              Etapa {step.num} de 04
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
