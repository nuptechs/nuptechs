import ThemeToggle from "./components/ThemeToggle";
import NavLinks from "./components/NavLinks";
import ContactForm from "./components/ContactForm";
import FaqAccordion from "./components/FaqAccordion";
import HeroVisual from "./components/HeroVisual";
import Animations from "./components/Animations";
import ProcessTimeline from "./components/ProcessTimeline";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NuPtechs",
      description: "Desenvolvimento de software sob medida, automação com IA e produtos prontos para empresas brasileiras.",
      inLanguage: ["pt-BR", "en-US", "es-419"],
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?s={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Serviços", item: `${siteUrl}/#servicos` },
        { "@type": "ListItem", position: 3, name: "Produtos", item: `${siteUrl}/#produtos` },
        { "@type": "ListItem", position: 4, name: "Contato", item: `${siteUrl}/#contato` }
      ]
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NuPtechs",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg`, width: 200, height: 60 },
      email: "nuptechs@nuptechs.com",
      telephone: "+55-61-99369-1692",
      foundingDate: "2023",
      description: "Empresa brasileira de desenvolvimento de software sob medida com IA, automação empresarial e produtos SaaS prontos para implantação.",
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "Country", name: "United States" }
      ],
      sameAs: [
        "https://www.linkedin.com/company/nuptechs",
        "https://github.com/nuptechs"
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quanto tempo leva para ter um protótipo de software funcionando?", acceptedAnswer: { "@type": "Answer", text: "Em até 7 dias úteis entregamos um protótipo navegável com as principais telas e fluxos do seu produto digital." } },
        { "@type": "Question", name: "A NuPtechs atende empresas fora de Brasília?", acceptedAnswer: { "@type": "Answer", text: "Sim. Atendemos todo o Brasil — e internacionalmente — com reuniões remotas, times dedicados e horários flexíveis." } },
        { "@type": "Question", name: "Como funciona o diagnóstico gratuito?", acceptedAnswer: { "@type": "Answer", text: "Você descreve seu desafio por e-mail ou em uma reunião de 30 minutos. Nossa equipe analisa e devolve um plano técnico objetivo em até 24 horas — sem compromisso." } }
      ]
    }
  ]
};

const services = [
  {
    slug: "automacao-inteligente",
    title: "Automação Inteligente",
    body: "Eliminamos tarefas repetitivas com fluxos automatizados, integrações de API e agentes com IA.",
    metric: "Até 30h/semana economizadas",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    )
  },
  {
    slug: "dashboards-bi",
    title: "Dashboards Operacionais",
    body: "Dados em tempo real, KPIs visíveis e decisões mais rápidas. Tudo em uma única tela.",
    metric: "+30 conectores nativos",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    slug: "aplicativos-moveis",
    title: "Aplicativos Móveis",
    body: "Apps escaláveis para iOS e Android, construídos com stack moderna e foco em performance.",
    metric: "iOS + Android em uma codebase",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    )
  },
  {
    slug: "integracoes-api",
    title: "Integrações & APIs",
    body: "Conectamos seus sistemas legados a ferramentas modernas sem reescrever tudo do zero.",
    metric: "Zero downtime na migração",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    )
  },
  {
    slug: "ia-aplicada",
    title: "IA Aplicada",
    body: "LLMs, análise preditiva e automação cognitiva integrados ao núcleo do seu negócio.",
    metric: "ROI médio em 90 dias",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/>
        <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1" fill="currentColor" stroke="none"/>
      </svg>
    )
  },
  {
    slug: "seguranca-compliance",
    title: "Segurança & Compliance",
    body: "Arquitetura segura por design, auditável, com conformidade à LGPD e padrões corporativos.",
    metric: "100% conforme à LGPD",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  }
];

const products = [
  {
    tag: "Gestão", slug: "flowops", name: "FlowOps",
    tagline: "Gestão de processos e tarefas",
    highlights: ["Kanban + timeline", "Automações por regras", "Relatórios de produtividade"],
    status: "Disponível",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17 14v6M14 17h6"/>
      </svg>
    )
  },
  {
    tag: "BI", slug: "datapulse", name: "DataPulse",
    tagline: "Dashboard de inteligência operacional",
    highlights: ["+30 conectores nativos", "Alertas automáticos", "Exportação PDF/CSV"],
    status: "Disponível",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    )
  },
  {
    tag: "Agendamento", slug: "bookflow", name: "BookFlow",
    tagline: "Agendamento inteligente para equipes",
    highlights: ["Confirmação por WhatsApp", "Anti-no-show automatizado", "Multi-agenda"],
    status: "Disponível",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M9 16l2 2 4-4"/>
      </svg>
    )
  },
  {
    tag: "IA", slug: "chatcore", name: "ChatCore",
    tagline: "Atendimento automatizado com IA",
    highlights: ["Treinamento com seus dados", "Integração WhatsApp + web", "Histórico completo"],
    status: "Beta",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="9.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/>
      </svg>
    )
  },
  {
    tag: "Estoque", slug: "stocksync", name: "StockSync",
    tagline: "Controle de estoque em tempo real",
    highlights: ["Previsão de demanda com IA", "Multi-depósito", "Alertas de reposição"],
    status: "Disponível",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    )
  },
  {
    tag: "RH", slug: "peopledesk", name: "PeopleDesk",
    tagline: "Gestão de pessoas simplificada",
    highlights: ["Onboarding digital", "Ponto por app", "Avaliação 360°"],
    status: "Em breve",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
];

const faqs = [
  { q: "Quanto tempo leva para ter um protótipo funcionando?", a: "Em até 7 dias úteis entregamos um protótipo navegável com as principais telas e fluxos do seu produto digital." },
  { q: "A NuPtechs atende empresas fora de Brasília?", a: "Sim. Atendemos todo o Brasil — e internacionalmente — com reuniões remotas, times dedicados e horários flexíveis." },
  { q: "Qual o investimento mínimo para um projeto?", a: "Trabalhamos desde MVPs para startups até sistemas corporativos complexos. O investimento é definido pelo escopo após o diagnóstico gratuito." },
  { q: "Quais tecnologias vocês utilizam?", a: "React, Next.js, Node.js, Python, React Native, PostgreSQL, Redis, AWS/GCP e integrações com LLMs como GPT e Gemini." },
  { q: "Como funciona o diagnóstico gratuito?", a: "Descreva seu desafio por e-mail ou em uma reunião de 30 minutos. Nossa equipe analisa e devolve um plano técnico objetivo em até 24 horas — sem compromisso." }
];

const trustStats = [
  { value: "+200", label: "projetos entregues", sublabel: "startups a multinacionais", counter: 200, prefix: "+", suffix: "" },
  { value: "7", label: "dias para protótipo", sublabel: "telas reais, não slides", counter: 7, prefix: "", suffix: "" },
  { value: "98%", label: "de satisfação", sublabel: "NPS acima da média do setor", counter: 98, prefix: "", suffix: "%" },
  { value: "24h", label: "diagnóstico gratuito", sublabel: "plano técnico objetivo", counter: 24, prefix: "", suffix: "h" }
];

const blogPosts = [
  { slug: "como-automatizar-processos-manuais", tag: "Automação", title: "Como automatizar processos manuais e liberar 30h/semana da sua equipe", excerpt: "Descubra as 5 tarefas que mais consomem tempo em operações e como eliminá-las com fluxos inteligentes.", readTime: "6 min" },
  { slug: "llms-no-mundo-corporativo", tag: "IA Aplicada", title: "LLMs no mundo corporativo: onde a IA realmente entrega ROI", excerpt: "Análise de casos reais de empresas brasileiras que implementaram IA e os resultados obtidos nos primeiros 90 dias.", readTime: "8 min" },
  { slug: "software-sob-medida-vs-saas", tag: "Desenvolvimento Ágil", title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?", excerpt: "Um guia prático para gestores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.", readTime: "5 min" }
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Animations />

      {/* ── Navigation ──────────────────────────────────── */}
      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="#inicio" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              Falar com especialista
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="inicio" className="hero-section" aria-labelledby="hero-heading">
        {/* Background effects */}
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="inner">
          <div className="hero-layout">
            <div className="hero-copy" data-reveal="left">
              <div className="hero-proof">
                <span className="hero-proof__dot" aria-hidden="true" />
                <span>+200 projetos entregues</span>
                <span className="hero-proof__sep" aria-hidden="true">·</span>
                <span>Brasil &amp; América Latina</span>
              </div>

              <h1 id="hero-heading" className="display-title">
                Transformamos ideias em<br />
                <em>software real</em>.
              </h1>

              <p className="lead">
                Sistemas sob medida, automação com IA e dashboards operacionais — do protótipo ao deploy em semanas, não meses.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary btn-lg" data-magnetic>
                  Diagnóstico gratuito
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#servicos" className="btn btn-secondary btn-lg">
                  Ver serviços
                </a>
              </div>

              <p className="hero-microcopy">
                Resposta em até 24h &nbsp;·&nbsp; Sem compromisso &nbsp;·&nbsp; Protótipo em 7 dias
              </p>
            </div>

            <div className="hero-visual-wrapper" data-reveal="right">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section id="servicos" className="page-section bg-[var(--surface)]" aria-labelledby="services-heading">
        <div className="inner">
          <div className="mb-16 max-w-xl" data-reveal>
            <span className="eyebrow mb-4 block">Serviços</span>
            <h2 id="services-heading" className="section-heading mb-4">
              Soluções sob medida para o seu negócio
            </h2>
            <p className="lead">
              Da ideia ao deploy — cobrimos todas as camadas técnicas do seu produto com um time sênior e método comprovado.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {services.map((svc) => (
              <article key={svc.slug} className="card card-sm group" data-reveal-item>
                <div className="card-icon" aria-hidden="true">{svc.icon}</div>
                <h3 className="card-title">{svc.title}</h3>
                <p className="card-body mb-4">{svc.body}</p>
                <div className="card-footer">
                  <span className="card-metric">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {svc.metric}
                  </span>
                  <a href={`/servicos/${svc.slug}`} className="card-link" aria-label={`Ver detalhes: ${svc.title}`}>
                    Saiba mais
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Process ─────────────────────────────────────── */}
      <section id="como-funciona" className="page-section" aria-labelledby="process-heading">
        <div className="inner">
          <div className="mb-14 max-w-2xl mx-auto text-center" data-reveal>
            <span className="eyebrow mb-4 block justify-center">Processo</span>
            <h2 id="process-heading" className="section-heading mb-4">
              Do diagnóstico ao lançamento
            </h2>
            <p className="lead mx-auto">
              Método claro em 4 etapas. Sem enrolação, sem surpresas — você acompanha tudo desde o primeiro dia.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ── Social Proof ────────────────────────────────── */}
      <section className="trust-band" aria-label="Números e credenciais NuPtechs">
        <div className="inner relative z-[1]">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4" data-reveal-group>
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 text-center" data-reveal-item>
                <span className="stat-number" data-counter={s.counter} data-prefix={s.prefix} data-suffix={s.suffix}>
                  {s.value}
                </span>
                <span className="text-sm font-semibold text-[var(--text)]">{s.label}</span>
                <span className="text-xs text-[var(--subtle)]">{s.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section id="produtos" className="page-section" aria-labelledby="products-heading">
        <div className="inner">
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div className="max-w-lg">
              <span className="eyebrow mb-4 block">Produtos prontos</span>
              <h2 id="products-heading" className="section-heading mb-3">
                Comece a usar hoje
              </h2>
              <p className="lead">
                Soluções testadas e prontas para implantação — construídas a partir dos problemas mais comuns que encontramos em centenas de projetos.
              </p>
            </div>
            <a href="/produtos" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              Ver todos os produtos
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {products.map((p) => (
              <article key={p.name} className="product-card group" data-reveal-item>
                <div className="product-card__header">
                  <div className="product-card__icon">{p.icon}</div>
                  <span className={`product-card__badge ${p.status === "Disponível" ? "product-card__badge--green" : p.status === "Beta" ? "product-card__badge--amber" : "product-card__badge--neutral"}`}>
                    <span className={`product-card__badge-dot ${p.status === "Disponível" ? "product-card__badge-dot--green" : p.status === "Beta" ? "product-card__badge-dot--amber" : "product-card__badge-dot--neutral"}`} />
                    {p.status}
                  </span>
                </div>
                <div className="product-card__body">
                  <p className="product-card__tag">{p.tag}</p>
                  <h3 className="product-card__name">{p.name}</h3>
                  <p className="product-card__tagline">{p.tagline}</p>
                </div>
                <ul className="product-card__highlights" aria-label={`Destaques de ${p.name}`}>
                  {p.highlights.map((h) => (
                    <li key={h} className="product-card__highlight">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 text-[var(--accent)]">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <a href={`/produtos/${p.slug}`} className="product-card__cta" aria-label={`${p.status === "Em breve" ? "Lista de espera" : "Ver produto"}: ${p.name}`}>
                  {p.status === "Em breve" ? "Lista de espera" : "Ver produto"}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────── */}
      <section className="cta-band" aria-label="Chamada para ação">
        <div className="cta-band__bg" aria-hidden="true" />
        <div className="cta-band__content" data-reveal="scale">
          <span className="eyebrow mb-5 block justify-center">Próximo passo</span>
          <h2 className="section-heading mb-6">
            Diagnóstico gratuito em 24 horas
          </h2>
          <p className="lead mx-auto mb-8 text-center" style={{ maxWidth: "48ch" }}>
            Conte seu desafio e receba um plano técnico objetivo — sem compromisso.
          </p>
          <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary btn-lg" data-magnetic>
            Solicitar diagnóstico
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="page-section bg-[var(--surface)]" aria-labelledby="faq-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            <div className="lg:sticky lg:top-24" data-reveal="left">
              <span className="eyebrow mb-4 block">FAQ</span>
              <h2 id="faq-heading" className="section-heading mb-4">
                Perguntas frequentes
              </h2>
              <p className="lead">
                Tudo o que você precisa saber antes de começar um projeto conosco.
              </p>
            </div>
            <div data-reveal="right">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Blog Preview ────────────────────────────────── */}
      <section id="blog" className="page-section" aria-labelledby="blog-heading">
        <div className="inner">
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div className="max-w-lg">
              <span className="eyebrow mb-4 block">Blog &amp; Conteúdo</span>
              <h2 id="blog-heading" className="section-heading mb-3">
                Insights para decisões melhores
              </h2>
              <p className="lead">
                Artigos práticos sobre desenvolvimento ágil, IA aplicada e gestão de software — escritos por quem constrói sistemas reais.
              </p>
            </div>
            <a href="/blog" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              Ver todos os artigos
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card group" data-reveal-item>
                <div className="blog-card__top">
                  <span className="badge badge-accent">{post.tag}</span>
                  <span className="blog-card__read">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="card-link mt-auto" aria-label={`Ler: ${post.title}`}>
                  Ler artigo
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture ────────────────────────────────── */}
      <section id="contato" className="page-section bg-[var(--surface)]" aria-labelledby="lead-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div data-reveal="left">
              <span className="eyebrow mb-4 block">Diagnóstico gratuito</span>
              <h2 id="lead-heading" className="section-heading mb-4">
                Vamos conversar sobre o seu projeto?
              </h2>
              <p className="lead mb-8">
                Descreva seu desafio em uma reunião de 30 minutos ou por e-mail. Nossa equipe devolve um plano técnico concreto em até 24 horas — sem compromisso.
              </p>
              <ul className="flex flex-col gap-3">
                {["Reunião gratuita de 30 minutos ou análise por e-mail", "Avaliação técnica personalizada do seu cenário", "Plano com prazo, escopo e investimento estimado", "Protótipo navegável em até 7 dias úteis"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0 text-[var(--accent)]">
                      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#inicio" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
                <span className="nav-logo-dot" aria-hidden="true" />
                <span className="nav-logo-text">NuPtechs</span>
              </a>
              <p>
                Desenvolvimento de software sob medida, automação com IA e produtos prontos para empresas brasileiras.
              </p>
            </div>

            <div className="footer-col">
              <h4>Empresa</h4>
              <a href="/sobre">Sobre</a>
              <a href="/blog">Blog</a>
              <a href="/#faq">FAQ</a>
              <a href="/#contato">Contato</a>
            </div>

            <div className="footer-col">
              <h4>Serviços</h4>
              <a href="/servicos/automacao-inteligente">Automação com IA</a>
              <a href="/servicos/dashboards-bi">Dashboards BI</a>
              <a href="/servicos/aplicativos-moveis">Apps Móveis</a>
              <a href="/servicos/integracoes-api">Integrações</a>
            </div>

            <div className="footer-col">
              <h4>Produtos</h4>
              <a href="/produtos/flowops">FlowOps</a>
              <a href="/produtos/datapulse">DataPulse</a>
              <a href="/produtos/bookflow">BookFlow</a>
              <a href="/produtos/chatcore">ChatCore</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/nuptechs" className="text-[var(--subtle)] hover:text-[var(--text)] transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/nuptechs" className="text-[var(--subtle)] hover:text-[var(--text)] transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
