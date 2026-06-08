"use client";

/* HeroVisual — Executive dashboard visual for the hero section.
   Communicates authority, sophistication and real business results. */
export default function HeroVisual() {
  return (
    <div className="hero-dashboard" aria-hidden="true">
      {/* Window chrome */}
      <div className="hero-dashboard__chrome">
        <span className="hero-dashboard__dot hero-dashboard__dot--red" />
        <span className="hero-dashboard__dot hero-dashboard__dot--yellow" />
        <span className="hero-dashboard__dot hero-dashboard__dot--green" />
        <span className="hero-dashboard__chrome-title">NuPtechs Command Center</span>
      </div>

      <div className="hero-dashboard__body">
        {/* KPI Strip */}
        <div className="hero-dashboard__kpis">
          <div className="hero-dashboard__kpi">
            <div className="hero-dashboard__kpi-value">200+</div>
            <div className="hero-dashboard__kpi-label">Projetos</div>
          </div>
          <div className="hero-dashboard__kpi">
            <div className="hero-dashboard__kpi-value">98%</div>
            <div className="hero-dashboard__kpi-label">Satisfação</div>
          </div>
          <div className="hero-dashboard__kpi">
            <div className="hero-dashboard__kpi-value">7d</div>
            <div className="hero-dashboard__kpi-label">1ª versão</div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="hero-dashboard__feed">
          <div className="hero-dashboard__feed-header">
            <span className="hero-dashboard__feed-title">Atividade em tempo real</span>
            <span className="hero-dashboard__feed-dot" />
          </div>
          <div className="hero-dashboard__feed-row">
            <span className="hero-dashboard__feed-icon hero-dashboard__feed-icon--green">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="hero-dashboard__feed-text">
              Deploy <strong>v2.4.1</strong> em produção
            </span>
            <span className="hero-dashboard__feed-time">agora</span>
          </div>
          <div className="hero-dashboard__feed-row">
            <span className="hero-dashboard__feed-icon hero-dashboard__feed-icon--purple">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="hero-dashboard__feed-text">
              Sprint <strong>EasyNuP</strong> iniciado
            </span>
            <span className="hero-dashboard__feed-time">2h</span>
          </div>
          <div className="hero-dashboard__feed-row">
            <span className="hero-dashboard__feed-icon hero-dashboard__feed-icon--blue">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="hero-dashboard__feed-text">
              Diagnóstico <strong>concluído</strong>
            </span>
            <span className="hero-dashboard__feed-time">5h</span>
          </div>
          <div className="hero-dashboard__feed-row">
            <span className="hero-dashboard__feed-icon hero-dashboard__feed-icon--amber">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 2L3 14h10V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="hero-dashboard__feed-text">
              <strong>NuPIdentify</strong> — 99.9% uptime
            </span>
            <span className="hero-dashboard__feed-time">1d</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="hero-dashboard__progress">
          <div className="hero-dashboard__progress-header">
            <span className="hero-dashboard__progress-label">Projeto em andamento</span>
            <span className="hero-dashboard__progress-value">87%</span>
          </div>
          <div className="hero-dashboard__progress-track">
            <div className="hero-dashboard__progress-fill" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="hero-dashboard__badge hero-dashboard__badge--top">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        LGPD compliant
      </div>
      <div className="hero-dashboard__badge hero-dashboard__badge--bottom">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.5 3h3l-2.5 1.8.9 3L6 7.2 3.1 8.8l.9-3L1.5 4h3L6 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        </svg>
        +70 projetos entregues
      </div>
    </div>
  );
}
