"use client";

const tagServiceMap: Record<string, { slug: string; label: string }> = {
  "Automação":            { slug: "automacao-inteligente", label: "Automação Inteligente" },
  "IA Aplicada":          { slug: "ia-aplicada",           label: "IA Aplicada" },
  "Business Intelligence":{ slug: "dashboards-bi",         label: "Dashboards & BI" },
  "Desenvolvimento Ágil": { slug: "automacao-inteligente", label: "Desenvolvimento Ágil" },
  "Integrações":          { slug: "integracoes-api",       label: "Integrações & API" },
  "Cultura Tech":         { slug: "automacao-inteligente", label: "Nossos Serviços" },
};

export default function ArticleCTA({ tag }: { tag: string }) {
  const service = tagServiceMap[tag] ?? tagServiceMap["Cultura Tech"];

  return (
    <aside className="article-cta" aria-label="Chamada para ação">
      <div className="article-cta__inner">
        <div className="article-cta__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="article-cta__text">
          <p className="article-cta__heading">Quer aplicar isso na prática?</p>
          <p className="article-cta__desc">
            Nosso time analisa seu processo e devolve um plano técnico concreto em até 24h — sem compromisso.
          </p>
        </div>
        <div className="article-cta__actions">
          <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary btn-sm">
            Diagnóstico grátis
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={`/servicos/${service.slug}`} className="btn btn-secondary btn-sm">
            {service.label}
          </a>
        </div>
      </div>
    </aside>
  );
}
