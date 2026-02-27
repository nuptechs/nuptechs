"use client";

/* HeroVisual — animated code/terminal window for the hero right column */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      {/* Window chrome */}
      <div className="hero-visual__chrome">
        <span className="hero-visual__dot hero-visual__dot--red" />
        <span className="hero-visual__dot hero-visual__dot--yellow" />
        <span className="hero-visual__dot hero-visual__dot--green" />
        <span className="hero-visual__chrome-title">diagnóstico.ts</span>
      </div>

      {/* Code lines */}
      <div className="hero-visual__body">
        <div className="hero-visual__line">
          <span className="hero-visual__ln">1</span>
          <span className="hero-visual__keyword">const</span>
          <span className="hero-visual__var"> diagnóstico </span>
          <span className="hero-visual__op">=</span>
          <span className="hero-visual__keyword"> await </span>
          <span className="hero-visual__fn">nuptechs</span>
          <span className="hero-visual__punct">.</span>
          <span className="hero-visual__fn">analyze</span>
          <span className="hero-visual__punct">({`{`}</span>
        </div>
        <div className="hero-visual__line hero-visual__line--indent">
          <span className="hero-visual__ln">2</span>
          <span className="hero-visual__prop">empresa</span>
          <span className="hero-visual__punct">: </span>
          <span className="hero-visual__str">&ldquo;Sua empresa&rdquo;</span>
          <span className="hero-visual__punct">,</span>
        </div>
        <div className="hero-visual__line hero-visual__line--indent">
          <span className="hero-visual__ln">3</span>
          <span className="hero-visual__prop">desafio</span>
          <span className="hero-visual__punct">: </span>
          <span className="hero-visual__str">&ldquo;processos manuais&rdquo;</span>
          <span className="hero-visual__punct">,</span>
        </div>
        <div className="hero-visual__line hero-visual__line--indent">
          <span className="hero-visual__ln">4</span>
          <span className="hero-visual__prop">prazo</span>
          <span className="hero-visual__punct">: </span>
          <span className="hero-visual__str">&ldquo;7 dias&rdquo;</span>
          <span className="hero-visual__punct">,</span>
        </div>
        <div className="hero-visual__line">
          <span className="hero-visual__ln">5</span>
          <span className="hero-visual__punct">{`})`}</span>
          <span className="hero-visual__punct">;</span>
        </div>
        <div className="hero-visual__line hero-visual__line--blank">
          <span className="hero-visual__ln">6</span>
        </div>

        {/* Output block */}
        <div className="hero-visual__output">
          <div className="hero-visual__output-header">
            <span className="hero-visual__output-dot" />
            <span className="hero-visual__output-label">output</span>
          </div>
          <div className="hero-visual__output-row">
            <span className="hero-visual__output-key">status</span>
            <span className="hero-visual__output-sep"> · </span>
            <span className="hero-visual__output-val hero-visual__output-val--green">✓ pronto em 24h</span>
          </div>
          <div className="hero-visual__output-row">
            <span className="hero-visual__output-key">protótipo</span>
            <span className="hero-visual__output-sep"> · </span>
            <span className="hero-visual__output-val">7 dias úteis</span>
          </div>
          <div className="hero-visual__output-row">
            <span className="hero-visual__output-key">investimento</span>
            <span className="hero-visual__output-sep"> · </span>
            <span className="hero-visual__output-val">sob consulta</span>
          </div>
          <div className="hero-visual__output-row">
            <span className="hero-visual__output-key">custo diagnóstico</span>
            <span className="hero-visual__output-sep"> · </span>
            <span className="hero-visual__output-val hero-visual__output-val--accent">R$ 0,00</span>
          </div>
        </div>

        {/* Cursor blink */}
        <div className="hero-visual__line hero-visual__line--cursor">
          <span className="hero-visual__ln">7</span>
          <span className="hero-visual__cursor" />
        </div>
      </div>

      {/* Floating badges */}
      <div className="hero-visual__badge hero-visual__badge--top">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        LGPD compliant
      </div>
      <div className="hero-visual__badge hero-visual__badge--bottom">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.5 3h3l-2.5 1.8.9 3L6 7.2 3.1 8.8l.9-3L1.5 4h3L6 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        </svg>
        +200 projetos
      </div>
    </div>
  );
}
