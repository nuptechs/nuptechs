import type { Metadata } from "next";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Produtos — Soluções SaaS Prontas para Implantar",
  description: "FlowOps, DataPulse, BookFlow, ChatCore, StockSync e PeopleDesk. Produtos prontos desenvolvidos pela NuPtechs para empresas de todos os portes.",
  keywords: ["produtos SaaS NuPtechs", "software pronto para empresa", "FlowOps", "DataPulse", "BookFlow"],
  alternates: { canonical: "/produtos" }
};

const ProductIcon = ({ id }: { id: string }) => {
  const map: Record<string, React.ReactNode> = {
    flowops: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15.5 12v7M12 15.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    datapulse: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 15.5l4.5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 19h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bookflow: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 2v4M15 2v4M3 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 13h4M7 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    chatcore: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 016.5 3h9A2.5 2.5 0 0118 5.5v7A2.5 2.5 0 0115.5 15H13l-3 3-3-3H6.5A2.5 2.5 0 014 12.5v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 9h6M8 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    stocksync: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 8l8-5 8 5v8l-8 5-8-5V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 3v16M3 8l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    peopledesk: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 19c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 10a3 3 0 010 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 19a4 4 0 00-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{map[id] ?? map["flowops"]}</>;
};

const products = [
  {
    tag: "Gestão de Processos", slug: "flowops", name: "FlowOps",
    tagline: "Kanban, automações e relatórios de produtividade para times que precisam de visibilidade.",
    status: "Disponível", highlight: true,
  },
  {
    tag: "Business Intelligence", slug: "datapulse", name: "DataPulse",
    tagline: "KPIs em tempo real conectados ao seu ERP, CRM ou banco de dados. Sem planilhas.",
    status: "Disponível", highlight: false,
  },
  {
    tag: "Agendamento", slug: "bookflow", name: "BookFlow",
    tagline: "Confirmação automática, anti-no-show e sync com Google Calendar e Outlook.",
    status: "Disponível", highlight: false,
  },
  {
    tag: "IA Conversacional", slug: "chatcore", name: "ChatCore",
    tagline: "Agente de atendimento treinado com os dados da sua empresa. WhatsApp + web.",
    status: "Beta", highlight: false,
  },
  {
    tag: "Gestão de Estoque", slug: "stocksync", name: "StockSync",
    tagline: "Previsão de demanda com IA, múltiplos depósitos e alertas automáticos de reposição.",
    status: "Disponível", highlight: false,
  },
  {
    tag: "Gestão de Pessoas", slug: "peopledesk", name: "PeopleDesk",
    tagline: "Onboarding digital, ponto eletrônico e avaliação 360° — sem papel, sem planilha.",
    status: "Em breve", highlight: false,
  },
];

export default function ProdutosIndex() {
  return (
    <>
      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">Falar com especialista</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="products-heading">
          <div className="inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Início</a>
              <span aria-hidden="true">/</span>
              <span>Produtos</span>
            </nav>
            <div className="mb-16 max-w-2xl">
              <span className="eyebrow mb-4 block">Suite de produtos</span>
              <h1 id="products-heading" className="display-title mb-5">
                Software pronto.<br />Implante hoje.
              </h1>
              <p className="lead">
                Seis produtos construídos a partir de centenas de projetos reais — prontos para configurar, escalar e integrar ao seu stack.
              </p>
            </div>

            {/* Grid de produtos */}
            <div className="products-grid">
              {products.map((p) => {
                const statusCls =
                  p.status === "Disponível"
                    ? "status-badge status-badge--green"
                    : p.status === "Beta"
                    ? "status-badge status-badge--amber"
                    : "status-badge status-badge--muted";

                return (
                  <a
                    key={p.slug}
                    href={`/produtos/${p.slug}`}
                    className={`product-listing-card${p.highlight ? " product-listing-card--featured" : ""}`}
                    aria-label={`${p.name} — ${p.tagline}`}
                  >
                    <div className="product-listing-card__top">
                      <div className="product-listing-card__icon">
                        <ProductIcon id={p.slug} />
                      </div>
                      <span className={statusCls}>{p.status}</span>
                    </div>

                    <div className="product-listing-card__body">
                      <p className="product-listing-card__category">{p.tag}</p>
                      <h2 className="product-listing-card__name">{p.name}</h2>
                      <p className="product-listing-card__tagline">{p.tagline}</p>
                    </div>

                    <div className="product-listing-card__footer">
                      <span className="product-listing-card__cta">
                        Ver detalhes
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section" aria-label="Chamada para ação">
          <div className="inner">
            <div className="cta-band">
              <div>
                <h2 className="cta-band__title">Precisa de algo sob medida?</h2>
                <p className="cta-band__sub">Construímos do zero o que os nossos produtos não cobrem — com o mesmo padrão de qualidade.</p>
              </div>
              <a href="/servicos" className="btn btn-primary flex-shrink-0">
                Ver serviços
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
