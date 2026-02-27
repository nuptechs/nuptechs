import ThemeToggle from "./components/ThemeToggle";
import NavLinks from "./components/NavLinks";
import ContactForm from "./components/ContactForm";
import FaqAccordion from "./components/FaqAccordion";
import HeroVisual from "./components/HeroVisual";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ── WebSite with Sitelinks Searchbox ──────────────
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NuPtechs",
      description: "Desenvolvimento de software sob medida, automação com IA e produtos prontos para empresas brasileiras.",
      inLanguage: ["pt-BR", "en-US"],
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?s={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    // ── BreadcrumbList ────────────────────────────────
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Serviços", item: `${siteUrl}/#servicos` },
        { "@type": "ListItem", position: 3, name: "Produtos", item: `${siteUrl}/#produtos` },
        { "@type": "ListItem", position: 4, name: "Contato", item: `${siteUrl}/#contato` }
      ]
    },
    // ── Organization ─────────────────────────────────
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NuPtechs",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
        width: 200,
        height: 60
      },
      email: "nuptechs@nuptechs.com",
      telephone: "+55-61-99369-1692",
      foundingDate: "2023",
      description: "Empresa brasileira de desenvolvimento de software sob medida com IA, automação empresarial e produtos SaaS prontos para implantação.",
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "Country", name: "United States" }
      ],
      knowsAbout: [
        "Desenvolvimento de software sob medida",
        "Automação empresarial com inteligência artificial",
        "Dashboards de business intelligence",
        "Desenvolvimento ágil",
        "SaaS para gestão empresarial",
        "Integração de sistemas e APIs"
      ],
      sameAs: [
        "https://www.linkedin.com/company/nuptechs",
        "https://github.com/nuptechs"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+55-61-99369-1692",
          email: "nuptechs@nuptechs.com",
          areaServed: "BR",
          availableLanguage: ["pt-BR", "en"]
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "nuptechs@nuptechs.com",
          areaServed: ["BR", "US", "PT"],
          availableLanguage: ["pt-BR", "en"]
        }
      ]
    },
    // ── LocalBusiness ─────────────────────────────────
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "NuPtechs",
      image: `${siteUrl}/og-image.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brasília",
        addressRegion: "DF",
        addressCountry: "BR"
      },
      areaServed: "BR",
      telephone: "+55-61-99369-1692",
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -15.793889,
        longitude: -47.882778
      }
    },
    // ── Services ──────────────────────────────────────
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-software`,
      name: "Desenvolvimento de Software Sob Medida",
      serviceType: "Custom Software Development",
      description: "Desenvolvimento de sistemas personalizados com metodologia ágil, entrega em 7 dias de protótipo e foco em resultados mensuráveis.",
      areaServed: "BR",
      provider: { "@id": `${siteUrl}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Software",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aplicativos móveis iOS e Android" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistemas de automação empresarial" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dashboards de business intelligence" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integrações de APIs e sistemas legados" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentes de IA aplicada ao negócio" } }
        ]
      }
    },
    // ── Products (SoftwareApplication) ────────────────
    {
      "@type": "SoftwareApplication",
      name: "NuPtechs FlowOps",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Gestão de processos e tarefas com Kanban, automações por regras e relatórios de produtividade.",
      featureList: ["Kanban + timeline", "Automações por regras", "Relatórios de produtividade"],
      offers: { "@type": "Offer", price: "Sob consulta", priceCurrency: "BRL", availability: "https://schema.org/InStock" }
    },
    {
      "@type": "SoftwareApplication",
      name: "NuPtechs DataPulse",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Dashboard de inteligência operacional com +30 conectores nativos, alertas automáticos e exportação PDF/CSV.",
      featureList: ["+30 conectores nativos", "Alertas automáticos", "Exportação PDF/CSV"],
      offers: { "@type": "Offer", price: "Sob consulta", priceCurrency: "BRL", availability: "https://schema.org/InStock" }
    },
    {
      "@type": "SoftwareApplication",
      name: "NuPtechs BookFlow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Agendamento inteligente com confirmação automática por WhatsApp, anti-no-show e sincronização multi-agenda.",
      featureList: ["Confirmação por WhatsApp", "Anti-no-show automatizado", "Multi-agenda"],
      offers: { "@type": "Offer", price: "Sob consulta", priceCurrency: "BRL", availability: "https://schema.org/InStock" }
    },
    {
      "@type": "SoftwareApplication",
      name: "NuPtechs ChatCore",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Agente de IA para atendimento automatizado treinado na base de conhecimento do cliente, integrado ao WhatsApp e web.",
      featureList: ["Treinamento com seus dados", "Integração WhatsApp + web", "Histórico completo"],
      offers: { "@type": "Offer", price: "Sob consulta", priceCurrency: "BRL", availability: "https://schema.org/PreOrder" }
    },
    {
      "@type": "SoftwareApplication",
      name: "NuPtechs StockSync",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Controle de estoque em tempo real com previsão de demanda por IA, multi-depósito e alertas de reposição.",
      featureList: ["Previsão de demanda com IA", "Multi-depósito", "Alertas de reposição"],
      offers: { "@type": "Offer", price: "Sob consulta", priceCurrency: "BRL", availability: "https://schema.org/InStock" }
    },
    // ── FAQ ───────────────────────────────────────────
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto tempo leva para ter um protótipo de software funcionando?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Em até 7 dias úteis entregamos um protótipo navegável com as principais telas e fluxos do seu produto digital."
          }
        },
        {
          "@type": "Question",
          name: "A NuPtechs atende empresas fora de Brasília?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. A NuPtechs atende empresas em todo o Brasil — e internacionalmente — com reuniões remotas, times dedicados e horários flexíveis."
          }
        },
        {
          "@type": "Question",
          name: "Qual o investimento mínimo para um projeto de software sob medida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trabalhamos desde MVPs para startups até sistemas corporativos complexos. O investimento é definido pelo escopo após o diagnóstico gratuito."
          }
        },
        {
          "@type": "Question",
          name: "Quais tecnologias a NuPtechs utiliza no desenvolvimento?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Utilizamos React, Next.js, Node.js, Python, React Native, PostgreSQL, Redis, AWS/GCP e integrações com modelos de linguagem (LLMs) como GPT e Gemini."
          }
        },
        {
          "@type": "Question",
          name: "Como funciona o processo de diagnóstico gratuito?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Você descreve seu desafio por e-mail ou reunião de 30 minutos. Nossa equipe analisa o contexto técnico e devolve um plano objetivo em até 24 horas — sem compromisso."
          }
        }
      ]
    }
  ]
};

const services = [
  {
    slug: "automacao-inteligente",
    title: "Automação Inteligente",
    body: "Eliminamos tarefas manuais com fluxos automatizados, integrações de API e agentes com IA.",
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  }
];

const steps = [
  {
    num: "01",
    title: "Diagnóstico em 24h",
    body: "Entendemos seu problema, mapeamos o contexto técnico e entregamos um diagnóstico objetivo no dia seguinte."
  },
  {
    num: "02",
    title: "Protótipo em 7 dias",
    body: "Você vê o produto funcionando em uma semana. Telas reais, fluxos navegáveis, nada de slides."
  },
  {
    num: "03",
    title: "Desenvolvimento ágil",
    body: "Sprints curtos, entregas contínuas, feedback direto. Você sempre sabe o que está sendo construído."
  },
  {
    num: "04",
    title: "Lançamento e suporte",
    body: "Deploy, monitoramento, documentação técnica e SLA de suporte incluídos no pacote."
  }
];

const products = [
  {
    tag: "Gestão",
    slug: "flowops",
    name: "FlowOps",
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
    tag: "BI",
    slug: "datapulse",
    name: "DataPulse",
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
    tag: "Agendamento",
    slug: "bookflow",
    name: "BookFlow",
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
    tag: "IA",
    slug: "chatcore",
    name: "ChatCore",
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
    tag: "Estoque",
    slug: "stocksync",
    name: "StockSync",
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
    tag: "RH",
    slug: "peopledesk",
    name: "PeopleDesk",
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
  {
    q: "Quanto tempo leva para ter um protótipo de software funcionando?",
    a: "Em até 7 dias úteis entregamos um protótipo navegável com as principais telas e fluxos do seu produto digital."
  },
  {
    q: "A NuPtechs atende empresas fora de Brasília?",
    a: "Sim. Atendemos todo o Brasil — e internacionalmente — com reuniões remotas, times dedicados e horários flexíveis."
  },
  {
    q: "Qual o investimento mínimo para um projeto?",
    a: "Trabalhamos desde MVPs para startups até sistemas corporativos complexos. O investimento é definido pelo escopo após o diagnóstico gratuito."
  },
  {
    q: "Quais tecnologias vocês utilizam no desenvolvimento?",
    a: "React, Next.js, Node.js, Python, React Native, PostgreSQL, Redis, AWS/GCP e integrações com LLMs como GPT e Gemini."
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "Você descreve seu desafio por e-mail ou em uma reunião de 30 minutos. Nossa equipe analisa e devolve um plano técnico objetivo em até 24 horas — sem compromisso."
  }
];

const trustStats = [
  { value: "+200", label: "projetos entregues", sublabel: "de startups a multinacionais" },
  { value: "7", label: "dias para protótipo", sublabel: "telas reais, não slides" },
  { value: "5+", label: "setores atendidos", sublabel: "varejo, saúde, fintech e mais" },
  { value: "24h", label: "diagnóstico gratuito", sublabel: "plano técnico objetivo" }
];

const blogPosts = [
  {
    slug: "como-automatizar-processos-manuais",
    tag: "Automação",
    title: "Como automatizar processos manuais e liberar 30h/semana da sua equipe",
    excerpt:
      "Descubra as 5 tarefas que mais consomem tempo em operações e como eliminá-las com fluxos inteligentes e integrações de API.",
    readTime: "6 min"
  },
  {
    slug: "llms-no-mundo-corporativo",
    tag: "IA Aplicada",
    title: "LLMs no mundo corporativo: onde a IA realmente entrega ROI",
    excerpt:
      "Análise de casos reais de empresas brasileiras que implementaram IA e os resultados mensuráveis obtidos nos primeiros 90 dias.",
    readTime: "8 min"
  },
  {
    slug: "software-sob-medida-vs-saas",
    tag: "Desenvolvimento Ágil",
    title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?",
    excerpt:
      "Um guia prático para gestores de TI e diretores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.",
    readTime: "5 min"
  }
];

export default function Home() {
  return (
    <>
      {/* ── Structured Data ─────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <a
              href="mailto:nuptechs@nuptechs.com"
              className="nav-cta hidden lg:inline-flex"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        id="inicio"
        className="page-section pt-[calc(64px+5rem)]"
        aria-labelledby="hero-heading"
      >
        <div className="inner">
          <div className="hero-layout">
            {/* Left: copy */}
            <div className="hero-copy">

              {/* Prova social — linha de credencial enterprise */}
              <div className="hero-proof">
                <span className="hero-proof__dot" aria-hidden="true" />
                <span>+200 projetos entregues</span>
                <span className="hero-proof__sep" aria-hidden="true">·</span>
                <span>Brasil &amp; América Latina</span>
                <span className="hero-proof__sep" aria-hidden="true">·</span>
                <span>NDA disponível</span>
              </div>

              <h1 id="hero-heading" className="display-title">
                Software que resolve.<br />
                Entregue em <em>semanas</em>.
              </h1>

              <p className="lead">
                A NuPtechs constrói sistemas sob medida, automação com IA e dashboards operacionais para empresas que precisam de resultado — não de promessa.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                  Diagnóstico gratuito
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#servicos" className="btn btn-secondary">
                  Ver serviços
                </a>
              </div>

              <p className="hero-microcopy">
                Resposta em até 24h &nbsp;·&nbsp; SLA garantido &nbsp;·&nbsp; Sem compromisso
              </p>
            </div>

            {/* Right: visual */}
            <div className="hero-visual-wrapper">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section
        id="servicos"
        className="page-section bg-[var(--surface)]"
        aria-labelledby="services-heading"
      >
        <div className="inner">
          <div className="mb-14 max-w-xl">
            <span className="eyebrow mb-4 block">Serviços</span>
            <h2 id="services-heading" className="section-heading mb-4">
              O que a NuPtechs constrói para você
            </h2>
            <p className="lead">
              Da ideia ao deploy, cobrimos todas as camadas técnicas do seu produto com um time
              sênior e método comprovado.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <article key={svc.slug} className="card card-sm group">
                <div className="card-icon" aria-hidden="true">{svc.icon}</div>
                <h3 className="card-title">{svc.title}</h3>
                <p className="card-body mb-3">{svc.body}</p>
                <a href={`/servicos/${svc.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline" aria-label={`Ver detalhes: ${svc.title}`}>
                  Saiba mais
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section
        id="como-funciona"
        className="page-section"
        aria-labelledby="process-heading"
      >
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left: text */}
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow mb-4 block">Processo</span>
              <h2 id="process-heading" className="section-heading mb-6">
                Do diagnóstico ao lançamento
              </h2>
              <p className="lead mb-8">
                Um método claro em 4 etapas. Sem enrolação, sem surpresas. Você vê progresso
                concreto desde o primeiro dia.
              </p>
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                Começar agora
              </a>
            </div>

            {/* Right: steps */}
            <div>
              {steps.map((step, i) => (
                <div key={step.num} className="step-item" style={{ paddingBottom: i === steps.length - 1 ? 0 : undefined }}>
                  <div className="step-num" aria-hidden="true">{step.num}</div>
                  <div className="pt-2">
                    <h3 className="mb-1.5 text-base font-semibold text-[var(--text)]">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Trust Band ────────────────────── */}
      <section
        className="border-y border-[var(--border)] bg-[var(--surface)] py-14"
        aria-label="Números e credenciais NuPtechs"
      >
        <div className="inner">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <span className="stat-number">{s.value}</span>
                <span className="text-sm font-semibold text-[var(--text)]">{s.label}</span>
                <span className="text-xs text-[var(--subtle)]">{s.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section
        id="produtos"
        className="page-section"
        aria-labelledby="products-heading"
      >
        <div className="inner">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <span className="eyebrow mb-4 block">Produtos prontos</span>
              <h2 id="products-heading" className="section-heading mb-3">
                Comece a usar hoje mesmo.
              </h2>
              <p className="lead">
                Soluções testadas e prontas para implantação — construídas a partir dos problemas
                mais comuns que encontramos em centenas de projetos.
              </p>
            </div>
            <a href="/produtos" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              Ver todos os produtos
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="product-card group"
              >
                {/* Top: icon + status */}
                <div className="product-card__header">
                  <div className="product-card__icon text-[var(--accent)]">
                    {p.icon}
                  </div>
                  <span
                    className={`product-card__badge ${
                      p.status === "Disponível"
                        ? "product-card__badge--green"
                        : p.status === "Beta"
                        ? "product-card__badge--amber"
                        : "product-card__badge--neutral"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Name + tagline */}
                <div className="product-card__body">
                  <p className="product-card__tag">{p.tag}</p>
                  <h3 className="product-card__name">{p.name}</h3>
                  <p className="product-card__tagline">{p.tagline}</p>
                </div>

                {/* Highlights */}
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

                {/* CTA */}
                <a
                  href={`/produtos/${p.slug}`}
                  className="product-card__cta"
                  aria-label={`${p.status === "Em breve" ? "Lista de espera" : "Ver produto"}: ${p.name}`}
                >
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
      <section
        className="page-section bg-[var(--accent)] py-20"
        aria-label="Chamada para ação"
      >
        <div className="inner text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">
            Pronto para começar?
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Diagnóstico gratuito em 24 horas.
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/75">
            Conte seu desafio. Nosso time analisa e devolve um plano técnico objetivo — sem
            compromisso.
          </p>
          <a
            href="mailto:nuptechs@nuptechs.com"
            className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Enviar diagnóstico
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section
        id="faq"
        className="page-section bg-[var(--surface)]"
        aria-labelledby="faq-heading"
      >
        <div className="inner">
          <div className="mb-12 max-w-xl">
            <span className="eyebrow mb-4 block">FAQ</span>
            <h2 id="faq-heading" className="section-heading">
              Perguntas frequentes
            </h2>
          </div>
          <div className="max-w-2xl">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── Blog Preview ────────────────────────────────── */}
      <section
        id="blog"
        className="page-section"
        aria-labelledby="blog-heading"
      >
        <div className="inner">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <span className="eyebrow mb-4 block">Blog &amp; Conteúdo</span>
              <h2 id="blog-heading" className="section-heading mb-3">
                Conteúdo técnico para decisões melhores.
              </h2>
              <p className="lead">
                Artigos sobre desenvolvimento ágil, IA aplicada e gestão de software — escritos
                por quem constrói sistemas reais.
              </p>
            </div>
            <a href="/blog" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              Ver todos os artigos
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="card group flex flex-col gap-4"
              >
                <span className="badge badge-accent self-start">{post.tag}</span>
                <h3 className="text-base font-bold leading-snug tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <span className="text-xs text-[var(--subtle)]">{post.readTime} de leitura</span>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)]" aria-label={`Ler: ${post.title}`}>
                    Ler artigo
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

      {/* ── Lead Capture ────────────────────────────────── */}
      <section
        id="contato"
        className="page-section bg-[var(--surface)]"
        aria-labelledby="lead-heading"
      >
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: copy */}
            <div>
              <span className="eyebrow mb-4 block">Diagnóstico gratuito</span>
              <h2 id="lead-heading" className="section-heading mb-4">
                Pronto para ver o que é possível?
              </h2>
              <p className="lead mb-8">
                Em 60 minutos, nossa equipe analisa seu desafio e devolve um plano técnico
                concreto — sem compromisso e sem slides genéricos.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Demonstração 100% gratuita e sem compromisso",
                  "Análise personalizada do seu cenário atual",
                  "Plano técnico com prazo e investimento estimado",
                  "Resultados reais apresentados, não promessas"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0 text-[var(--accent)]">
                      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: contact card */}
              <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#inicio" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>

          <nav aria-label="Links do rodapé">
            <div className="flex flex-wrap justify-center gap-1">
              {[
                { label: "Serviços", href: "/servicos" },
                { label: "Como funciona", href: "/#como-funciona" },
                { label: "Produtos", href: "/produtos" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contato", href: "/#contato" }
              ].map((l) => (
                <a key={l.label} href={l.href} className="nav-link">
                  {l.label}
                </a>
              ))}
            </div>
          </nav>

          <p className="text-xs text-[var(--subtle)]">
            © {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
