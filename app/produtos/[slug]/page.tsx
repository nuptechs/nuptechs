import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";
import SiteFooter from "../../components/SiteFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* Inline icon map for product/features — keeps style consistent with services */
const FeatureIcon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    clipboard: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4V3h4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.5 9h5M7.5 12h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14.5l4.5-4.5 3.5 3.5 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 17.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bolt: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    mobile: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5.5" y="2" width="9" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 15.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bell: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5A5 5 0 005 7.5v4l-1.5 2h13L15 11.5v-4A5 5 0 0010 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 15.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    rocket: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5C10 2.5 14.5 4 15.5 10c.5 3-1.5 5.5-1.5 5.5L10 12l-4 3.5S4 13 4.5 10C5.5 4 10 2.5 10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 15.5l-2 2M14 15.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    refresh: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10a7 7 0 0112-4.9l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10a7 7 0 01-12 4.9L3.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5V7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 16.5V13H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    lock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
    robot: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="12.5" r="1" fill="currentColor"/>
        <circle cx="12.5" cy="12.5" r="1" fill="currentColor"/>
        <path d="M8 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 8V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    building: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h14M7 8v9M13 8v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons['bolt']}</>;
};

const products = {
  flowops: {
    name: "FlowOps",
    slug: "flowops",
    tag: "Gestão de Processos",
    icon: "🗂️",
    status: "Disponível",
    headline: "Gestão de processos e tarefas que sua equipe realmente usa.",
    description:
      "Centralize projetos, tarefas e aprovações em um único painel com Kanban, automações por regras e relatórios de produtividade. Pensado para times que precisam de visibilidade sem complexidade.",
    features: [
      { icon: "🗂️", title: "Kanban + Timeline", desc: "Visualize o fluxo de trabalho em Kanban ou linha do tempo. Mova tarefas com drag & drop." },
      { icon: "⚡", title: "Automações por regras", desc: "Defina gatilhos e ações: quando uma tarefa muda de status, notifique, mova ou atribua automaticamente." },
      { icon: "📊", title: "Relatórios de produtividade", desc: "Velocity, tempo médio por tarefa, gargalos por etapa. Dados reais do seu time." },
      { icon: "🔔", title: "Notificações inteligentes", desc: "Alertas por e-mail e WhatsApp — só o que importa, na hora certa." }
    ],
    useCases: ["Gestão de projetos de desenvolvimento", "Controle de aprovações e revisões", "Operações de atendimento ao cliente", "Onboarding de novos colaboradores"],
    keywords: ["software gestão de tarefas", "Kanban empresarial", "FlowOps NuPtechs", "gestão de projetos SaaS"]
  },
  datapulse: {
    name: "DataPulse",
    slug: "datapulse",
    tag: "Business Intelligence",
    icon: "📈",
    status: "Disponível",
    headline: "Dashboard de inteligência operacional em tempo real.",
    description:
      "Conecte suas fontes de dados — ERP, CRM, planilhas, bancos de dados — e visualize KPIs críticos atualizados em tempo real. Sem cientista de dados, sem semanas de espera.",
    features: [
      { icon: "🔌", title: "+30 conectores nativos", desc: "Integra com Google Sheets, Excel, PostgreSQL, MySQL, Salesforce, HubSpot e muito mais." },
      { icon: "🚨", title: "Alertas automáticos", desc: "Configure thresholds e receba notificações quando um KPI sair da faixa ideal." },
      { icon: "📥", title: "Exportação PDF/CSV", desc: "Relatórios executivos prontos para apresentação com um clique." },
      { icon: "🔒", title: "Controle de acesso granular", desc: "Defina quem vê o quê. Dashboards públicos, por equipe ou por executivo." }
    ],
    useCases: ["Painel executivo de vendas e receita", "Monitoramento de operações logísticas", "Dashboard de SLA de atendimento", "Análise de performance de marketing"],
    keywords: ["dashboard BI personalizado", "DataPulse NuPtechs", "business intelligence tempo real", "KPI dashboard Brasil"]
  },
  bookflow: {
    name: "BookFlow",
    slug: "bookflow",
    tag: "Agendamento",
    icon: "📅",
    status: "Disponível",
    headline: "Agendamento inteligente que confirma, lembra e não deixa dar no-show.",
    description:
      "Substitua o WhatsApp manual e as planilhas por um sistema de agendamento com confirmação automática, lembretes, sincronização multi-agenda e anti-no-show integrado.",
    features: [
      { icon: "📲", title: "Confirmação por WhatsApp", desc: "Após agendar, o cliente recebe confirmação automática no WhatsApp com link de reagendamento." },
      { icon: "🚫", title: "Anti-no-show automatizado", desc: "Lembretes escalonados (24h e 1h antes) reduzem faltas em até 70%." },
      { icon: "📆", title: "Multi-agenda e multi-profissional", desc: "Gerencie agendas de múltiplos profissionais e unidades em um único painel." },
      { icon: "🔄", title: "Sync Google Calendar / Outlook", desc: "Integração bidirecional — o que acontece no BookFlow aparece no Google Calendar e vice-versa." }
    ],
    useCases: ["Clínicas médicas e odontológicas", "Estúdios de beleza e bem-estar", "Consultores e coaches", "Serviços técnicos e visitas domiciliares"],
    keywords: ["sistema de agendamento WhatsApp", "BookFlow NuPtechs", "agendamento online empresa", "software anti-no-show"]
  },
  chatcore: {
    name: "ChatCore",
    slug: "chatcore",
    tag: "IA Conversacional",
    icon: "🤖",
    status: "Beta",
    headline: "Atendimento automatizado com IA treinada no seu negócio.",
    description:
      "Agente de IA treinado na base de conhecimento da sua empresa. Responde clientes com precisão, qualifica leads e escalona para humanos apenas quando necessário.",
    features: [
      { icon: "🧠", title: "Treinado com seus dados", desc: "Carregue manuais, FAQs, catálogos e políticas. O agente aprende e responde como um expert da sua empresa." },
      { icon: "📱", title: "Integração WhatsApp + web", desc: "Um único agente presente no chat do site, WhatsApp Business e Instagram Direct." },
      { icon: "📜", title: "Histórico completo", desc: "Todas as conversas registradas, pesquisáveis e disponíveis para o time de atendimento." },
      { icon: "🤝", title: "Escalonamento inteligente", desc: "Quando o agente não sabe ou o cliente solicita, transfere para um humano com contexto completo." }
    ],
    useCases: ["Suporte ao cliente 24/7 sem custo de plantão", "Qualificação automática de leads no site", "FAQ dinâmico para e-commerces", "Atendimento interno de RH (políticas, benefícios)"],
    keywords: ["agente IA atendimento WhatsApp", "ChatCore NuPtechs", "chatbot empresarial IA", "atendimento automatizado LLM"]
  },
  stocksync: {
    name: "StockSync",
    slug: "stocksync",
    tag: "Gestão de Estoque",
    icon: "📦",
    status: "Disponível",
    headline: "Controle de estoque em tempo real com previsão de demanda por IA.",
    description:
      "Elimine ruptura e excesso com previsão de demanda baseada em histórico. Gerencie múltiplos depósitos, fornecedores e pedidos de compra em um só lugar.",
    features: [
      { icon: "🔮", title: "Previsão de demanda com IA", desc: "Modelos de séries temporais que aprendem o padrão de vendas e sugerem pedidos de compra ideais." },
      { icon: "🏭", title: "Multi-depósito", desc: "Controle estoque em múltiplos armazéns, filiais ou centros de distribuição com saldo consolidado." },
      { icon: "🔔", title: "Alertas de reposição", desc: "Notificação automática quando o estoque atinge o ponto de pedido — antes da ruptura acontecer." },
      { icon: "📊", title: "Rastreabilidade completa", desc: "Lote, validade, localização e histórico de movimentação por SKU." }
    ],
    useCases: ["Distribuidoras e atacadistas", "Redes de varejo com múltiplas lojas", "Fabricantes com múltiplos insumos", "E-commerces com alto giro de SKUs"],
    keywords: ["controle de estoque IA", "StockSync NuPtechs", "sistema gestão estoque multifilial", "software previsão de demanda"]
  },
  peopledesk: {
    name: "PeopleDesk",
    slug: "peopledesk",
    tag: "Gestão de Pessoas",
    icon: "👥",
    status: "Em breve",
    headline: "Gestão de pessoas simplificada. Do onboarding à avaliação.",
    description:
      "Onboarding digital, ponto eletrônico, avaliações de desempenho e banco de horas. Tudo integrado, sem papel e sem planilha — para equipes que valorizam pessoas.",
    features: [
      { icon: "🎯", title: "Onboarding digital", desc: "Jornada de integração estruturada: documentos, treinamentos e checklist para novos colaboradores." },
      { icon: "⏱️", title: "Ponto por app", desc: "Registro de ponto pelo celular com geolocalização e biometria. Banco de horas automatizado." },
      { icon: "⭐", title: "Avaliação 360°", desc: "Ciclos de feedback estruturado com autoavaliação, pares, líderes e liderados." },
      { icon: "📋", title: "Gestão de documentos", desc: "Contratos, holerites, certidões — tudo digital, assinado eletronicamente e auditável." }
    ],
    useCases: ["RH de empresas de 20 a 500 colaboradores", "Startups em fase de escala", "Equipes com colaboradores remotos e presenciais", "Empresas que precisam digitalizar processos de RH"],
    keywords: ["software RH digital", "PeopleDesk NuPtechs", "gestão de pessoas SaaS", "onboarding digital colaborador"]
  }
};

type ProductParams = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductParams): Promise<Metadata> {
  const product = products[params.slug as keyof typeof products];
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} — ${product.tag}`,
    description: product.description,
    keywords: product.keywords,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.tag} | NuPtechs`,
      description: product.description,
      url: `${siteUrl}/produtos/${product.slug}`,
      siteName: "NuPtechs",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(product.name + " — " + product.tag + " | NuPtechs")}&sub=${encodeURIComponent(product.description)}&lang=pt`,
          width: 1200,
          height: 630,
          alt: `${product.name} — ${product.tag} | NuPtechs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@nuptechs",
      title: `${product.name} — ${product.tag} | NuPtechs`,
      description: product.description,
      images: [`${siteUrl}/og?title=${encodeURIComponent(product.name + " — " + product.tag + " | NuPtechs")}&sub=${encodeURIComponent(product.description)}&lang=pt`],
    },
  };
}

export default function ProductPage({ params }: ProductParams) {
  const product = products[params.slug as keyof typeof products];
  if (!product) notFound();

  const statusColor =
    product.status === "Disponível"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
      : product.status === "Beta"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
      : "bg-[var(--surface-raised)] text-[var(--subtle)]";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/produtos/${product.slug}#product`,
        name: `NuPtechs ${product.name}`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: product.tag,
        operatingSystem: "Web, iOS, Android",
        description: product.description,
        url: `${siteUrl}/produtos/${product.slug}`,
        keywords: product.keywords.join(", "),
        featureList: product.features.map((f) => f.title).join(", "),
        offers: {
          "@type": "Offer",
          description: "Contrate pelo modelo SaaS ou personalize com marca branca. Solicite proposta.",
          availability:
            product.status === "Em breve"
              ? "https://schema.org/PreOrder"
              : "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: "NuPtechs",
          },
        },
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "NuPtechs",
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Produtos", item: `${siteUrl}/produtos` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/produtos/${product.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
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

      {/* Hero */}
      <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="product-heading">
        <div className="inner">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><a href="/">Início</a></li>
              <li aria-hidden="true" className="breadcrumb__sep">›</li>
              <li><a href="/produtos">Produtos</a></li>
              <li aria-hidden="true" className="breadcrumb__sep">›</li>
              <li className="breadcrumb__current">{product.name}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-3xl" aria-hidden="true">
                <FeatureIcon id={product.icon} />
              </div>
              <div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor}`}>{product.status}</span>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">{product.tag}</p>
              </div>
            </div>
            <h1 id="product-heading" className="display-title mb-6">{product.headline}</h1>
            <p className="lead mb-8">{product.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                {product.status === "Em breve" ? "Entrar na lista de espera" : "Solicitar demonstração"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/#produtos" className="btn btn-secondary">Ver todos os produtos</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="features-heading">
        <div className="inner">
          <h2 id="features-heading" className="section-heading mb-12">Funcionalidades principais</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {product.features.map((f) => (
              <div key={f.title} className="card card-sm">
                <div className="card-icon" aria-hidden="true"><FeatureIcon id={f.icon} /></div>
                <h3 className="card-title">{f.title}</h3>
                <p className="card-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="page-section" aria-labelledby="usecases-heading">
        <div className="inner grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow mb-4 block">Ideal para</span>
            <h2 id="usecases-heading" className="section-heading mb-6">Quem usa o {product.name}</h2>
            <p className="lead">Desenvolvido a partir de dezenas de projetos reais. Pronto para implantar, configurar e escalar.</p>
          </div>
          <ul className="flex flex-col gap-3">
            {product.useCases.map((uc, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 text-[var(--accent)]">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {uc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-[var(--accent)] py-20" aria-label="Chamada para ação">
        <div className="inner text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">
            {product.status === "Em breve" ? "Garanta acesso antecipado." : "Pronto para experimentar?"}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/75">
            {product.status === "Em breve"
              ? "Entre na lista de espera e seja notificado primeiro quando o produto estiver disponível."
              : "Agende uma demo de 30 minutos e veja o produto funcionando com dados reais do seu negócio."}
          </p>
          <a href="mailto:nuptechs@nuptechs.com" className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            {product.status === "Em breve" ? "Entrar na lista de espera" : "Agendar demonstração"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
