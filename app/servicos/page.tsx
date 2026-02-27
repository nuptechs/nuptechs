import type { Metadata } from "next";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Serviços — Desenvolvimento de Software Sob Medida",
  description: "Automação inteligente, dashboards de BI, apps móveis, integrações de API, IA aplicada e segurança. Conheça todos os serviços da NuPtechs.",
  keywords: ["serviços de desenvolvimento software", "automação empresarial", "BI dashboards", "apps móveis"],
  alternates: { canonical: "/servicos" }
};

const ServiceIcon = ({ id }: { id: string }) => {
  const map: Record<string, React.ReactNode> = {
    automacao: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bi: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 18l5.5-6 4 4L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 21.5h19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    mobile: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    api: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 13.5a4.5 4.5 0 006.364.001l2.5-2.5a4.5 4.5 0 00-6.364-6.364L11 6.137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 10.5a4.5 4.5 0 00-6.364 0l-2.5 2.5a4.5 4.5 0 006.364 6.364L13 17.863" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    ia: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="14.5" r="1.5" fill="currentColor"/>
        <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor"/>
        <path d="M12 9V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 17.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    seguranca: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L4 5.5v7C4 17.08 7.41 21.28 12 22c4.59-.72 8-4.92 8-9.5v-7L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <>{map[id]}</>;
};

const services = [
  {
    id: "automacao",
    num: "01",
    title: "Automação Inteligente",
    slug: "automacao-inteligente",
    body: "Eliminamos tarefas manuais com fluxos inteligentes, integrações de API e agentes com IA — reduzindo erros em 90% e devolvendo horas à sua equipe.",
    metric: "−30h/semana por time",
    tags: ["n8n", "Python", "OpenAI API"],
    featured: true,
  },
  {
    id: "bi",
    num: "02",
    title: "Dashboards de BI",
    slug: "dashboards-bi",
    body: "KPIs em tempo real conectados diretamente ao seu ERP, CRM ou banco de dados. Sem exportar planilha, sem esperar relatório.",
    metric: "Decisões 3× mais rápidas",
    tags: ["React", "PostgreSQL", "WebSocket"],
    featured: false,
  },
  {
    id: "mobile",
    num: "03",
    title: "Aplicativos Móveis",
    slug: "aplicativos-moveis",
    body: "Apps escaláveis para iOS e Android construídos com React Native — do MVP em 4 semanas ao produto com 1 milhão de usuários.",
    metric: "MVP em 4 semanas",
    tags: ["React Native", "Expo", "Firebase"],
    featured: false,
  },
  {
    id: "api",
    num: "04",
    title: "Integrações & APIs",
    slug: "integracoes-api",
    body: "Conectamos ERPs, CRMs, marketplaces e sistemas legados via APIs robustas — sem reescrever o que já funciona.",
    metric: "Sync em tempo real",
    tags: ["REST", "GraphQL", "RabbitMQ"],
    featured: false,
  },
  {
    id: "ia",
    num: "05",
    title: "IA Aplicada ao Negócio",
    slug: "ia-aplicada",
    body: "LLMs treinados nos seus dados, análise preditiva de churn e demanda, automação cognitiva integrada ao fluxo atual.",
    metric: "ROI mensurável em 60 dias",
    tags: ["GPT-4", "LangChain", "pgvector"],
    featured: false,
  },
  {
    id: "seguranca",
    num: "06",
    title: "Segurança & Compliance",
    slug: "seguranca-compliance",
    body: "Arquitetura segura por design, conformidade à LGPD, autenticação multifator e auditoria completa de vulnerabilidades.",
    metric: "LGPD compliant",
    tags: ["OAuth 2.0", "JWT", "OWASP"],
    featured: false,
  },
];

export default function ServicosIndex() {
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
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="services-heading">
          <div className="inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Início</a>
              <span aria-hidden="true">/</span>
              <span>Serviços</span>
            </nav>

            <div className="svc-hero">
              <div className="svc-hero__copy">
                <span className="eyebrow mb-5 block">6 especialidades</span>
                <h1 id="services-heading" className="display-title mb-6">
                  Da ideia ao deploy.<br />
                  <em>Tudo sob medida.</em>
                </h1>
                <p className="lead mb-8">
                  Time sênior, método comprovado e entrega em semanas — não meses. Cobrimos todas as camadas técnicas do seu produto.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                    Diagnóstico grátis
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <p className="text-xs text-[var(--subtle)]">Resposta em 24h · Sem compromisso</p>
                </div>
              </div>

              {/* Stats strip */}
              <div className="svc-stats">
                {[
                  { value: "+200", label: "projetos entregues" },
                  { value: "4sem", label: "do contrato ao MVP" },
                  { value: "98%", label: "taxa de satisfação" },
                ].map((s) => (
                  <div key={s.label} className="svc-stat">
                    <span className="svc-stat__value">{s.value}</span>
                    <span className="svc-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="page-section bg-[var(--surface)]" aria-label="Lista de serviços">
          <div className="inner">
            <div className="svc-grid">
              {services.map((svc) => (
                <a
                  key={svc.slug}
                  href={`/servicos/${svc.slug}`}
                  className={`svc-card${svc.featured ? " svc-card--featured" : ""}`}
                  aria-label={`${svc.title} — ver detalhes`}
                >
                  <div className="svc-card__header">
                    <div className="svc-card__icon">
                      <ServiceIcon id={svc.id} />
                    </div>
                    <span className="svc-card__num">{svc.num}</span>
                  </div>

                  <div className="svc-card__body">
                    <h2 className="svc-card__title">{svc.title}</h2>
                    <p className="svc-card__body-text">{svc.body}</p>
                  </div>

                  <div className="svc-card__footer">
                    <span className="svc-card__metric">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1.5 9l3-3.5 2.5 2.5 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {svc.metric}
                    </span>
                    <div className="svc-card__tags">
                      {svc.tags.map((t) => (
                        <span key={t} className="svc-card__tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="svc-card__arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section" aria-label="Chamada para ação">
          <div className="inner">
            <div className="cta-band">
              <div>
                <h2 className="cta-band__title">Diagnóstico gratuito em 24h.</h2>
                <p className="cta-band__sub">Conte seu desafio. Devolvemos um plano técnico objetivo — sem compromisso.</p>
              </div>
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary flex-shrink-0">
                Falar com especialista
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
