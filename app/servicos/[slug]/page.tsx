import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* ── Benefit icon SVGs ─────────────────────────────────────────────────── */
const BenefitIcon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6.5V10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    trending_down: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2.5 5.5l5 5 3.5-3.5 6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 14.5h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    roi: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5v2M10 15.5v2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M2.5 10h2M15.5 10h2M4.5 15.5l1.5-1.5M14 6l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    link: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8.5 11.5a4.5 4.5 0 006.364.001l2-2a4.5 4.5 0 00-6.364-6.365l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 8.5a4.5 4.5 0 00-6.364 0l-2 2a4.5 4.5 0 006.364 6.364l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bolt: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
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
    building: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h14M7 8v9M13 8v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L4 4.5v5.75C4 14 7 17 10 18c3-1 6-4 6-7.75V4.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14.5l4.5-4.5 3.5 3.5 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 17.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
    lock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    clipboard: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4V3h4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.5 9h5M7.5 12h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons["bolt"]}</>;
};

const services = {
  "automacao-inteligente": {
    title: "Automação Inteligente com IA",
    slug: "automacao-inteligente",
    icon: "bolt",
    headline: "Elimine tarefas manuais. Libere sua equipe para o que importa.",
    description:
      "Automatizamos processos repetitivos com fluxos inteligentes, integrações de API e agentes com IA — reduzindo erros, custos operacionais e horas perdidas.",
    keywords: ["automação empresarial com IA", "RPA inteligente", "automação de processos", "fluxos automatizados"],
    benefits: [
      { icon: "clock", title: "Até 30h/semana recuperadas", desc: "Empresas que automatizam processos chave relatam ganho médio de 30 horas semanais por time." },
      { icon: "trending_down", title: "Redução de erros em 90%", desc: "Processos manuais têm taxa de erro de 1-5%. Automação reduz isso a quase zero." },
      { icon: "roi", title: "ROI em 60 dias", desc: "Projetos de automação bem executados recuperam o investimento em 2 a 3 meses." },
      { icon: "link", title: "Integração com qualquer sistema", desc: "Conectamos ERPs, CRMs, planilhas, WhatsApp e qualquer API — sem reescrever tudo." }
    ],
    useCases: [
      "Onboarding automático de clientes com coleta de documentos via WhatsApp",
      "Emissão automática de notas fiscais e boletos ao fechar uma venda",
      "Agendamento e confirmação de consultas sem intervenção humana",
      "Alertas inteligentes de estoque baseados em histórico de vendas",
      "Triagem automatizada de leads com qualificação por IA"
    ],
    tech: ["n8n", "Python", "Node.js", "OpenAI API", "Make (Integromat)", "Webhooks", "REST APIs"]
  },
  "dashboards-bi": {
    title: "Dashboards de Business Intelligence",
    slug: "dashboards-bi",
    icon: "chart",
    headline: "Dados em tempo real. Decisões mais rápidas.",
    description:
      "Desenvolvemos dashboards operacionais e estratégicos que transformam dados brutos em visibilidade de negócio — conectados diretamente aos seus sistemas.",
    keywords: ["dashboard business intelligence", "BI personalizado", "visualização de dados", "KPIs em tempo real"],
    benefits: [
      { icon: "bolt", title: "Dados em tempo real", desc: "Conectamos diretamente ao seu ERP, CRM ou banco de dados — sem exportar planilhas." },
      { icon: "target", title: "KPIs que importam para você", desc: "Cada dashboard é construído em torno das métricas que sua liderança precisa." },
      { icon: "mobile", title: "Acesso em qualquer dispositivo", desc: "Responsivo, com controle de acesso por papel — do CEO ao operador." },
      { icon: "bell", title: "Alertas automáticos", desc: "Notificações por e-mail ou WhatsApp quando um indicador sair da faixa ideal." }
    ],
    useCases: [
      "Painel de vendas em tempo real integrado ao CRM",
      "Dashboard de performance logística com rastreamento de entregas",
      "Monitoramento de SLA de atendimento ao cliente",
      "Relatório financeiro executivo atualizado automaticamente",
      "Análise de produtividade por equipe e por colaborador"
    ],
    tech: ["React", "Next.js", "Recharts", "PostgreSQL", "Redis", "REST API", "WebSocket"]
  },
  "aplicativos-moveis": {
    title: "Aplicativos Móveis iOS e Android",
    slug: "aplicativos-moveis",
    icon: "mobile",
    headline: "Aplicativos que seus usuários amam usar.",
    description:
      "Desenvolvemos apps móveis com stack moderna para iOS e Android — do MVP ao produto escalável com foco em performance e experiência do usuário.",
    keywords: ["desenvolvimento de aplicativo móvel", "app iOS Android", "React Native", "MVP mobile"],
    benefits: [
      { icon: "rocket", title: "MVP em 4 semanas", desc: "Versão funcional nas mãos dos primeiros usuários em um mês." },
      { icon: "mobile", title: "iOS + Android simultâneos", desc: "Um único código, duas plataformas. Custo e prazo pela metade." },
      { icon: "bolt", title: "Performance nativa", desc: "Apps rápidos, offline-capable e com experiência próxima ao nativo." },
      { icon: "lock", title: "Seguro e escalável", desc: "Arquitetura preparada para crescer de 100 para 1 milhão de usuários." }
    ],
    useCases: [
      "App de delivery com rastreamento em tempo real",
      "Plataforma de telemedicina com consultas por vídeo",
      "App de gestão de campo para equipes externas",
      "Marketplace B2B com catálogo e pedidos",
      "App de fidelidade com gamificação e cashback"
    ],
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "AWS"]
  },
  "integracoes-api": {
    title: "Integrações & APIs",
    slug: "integracoes-api",
    icon: "link",
    headline: "Seus sistemas conversando. Sem silos, sem retrabalho.",
    description:
      "Conectamos ferramentas, sistemas legados e plataformas modernas via APIs robustas — eliminando trabalho manual de sincronização e retrabalho operacional.",
    keywords: ["integração de sistemas", "desenvolvimento de API", "integração ERP CRM", "middleware"],
    benefits: [
      { icon: "refresh", title: "Sincronização em tempo real", desc: "Dados fluem automaticamente entre sistemas — sem exportar e importar manualmente." },
      { icon: "building", title: "Sem reescrever sistemas legados", desc: "Integramos via API o que você já tem — preservando o investimento existente." },
      { icon: "shield", title: "Seguro e auditável", desc: "Logs completos, autenticação OAuth/JWT e controle granular de permissões." },
      { icon: "chart", title: "Visibilidade de ponta a ponta", desc: "Rastreie o dado de uma venda do CRM ao ERP ao financeiro em uma única trilha." }
    ],
    useCases: [
      "Integração ERP ↔ e-commerce ↔ marketplace (Shopify, Mercado Livre, WooCommerce)",
      "Sincronização de clientes entre CRM, suporte e financeiro",
      "Pipeline de dados de IoT para análise em tempo real",
      "Integração de gateway de pagamento com sistema de gestão",
      "API unificada para múltiplos canais de atendimento (WhatsApp, chat, e-mail)"
    ],
    tech: ["Node.js", "Python", "REST", "GraphQL", "Webhooks", "RabbitMQ", "Redis"]
  },
  "ia-aplicada": {
    title: "IA Aplicada ao Negócio",
    slug: "ia-aplicada",
    icon: "robot",
    headline: "Inteligência artificial que entrega resultado real.",
    description:
      "Implementamos LLMs, análise preditiva e automação cognitiva diretamente nos processos do seu negócio — com foco em ROI mensurável, não em hype.",
    keywords: ["IA aplicada empresarial", "LLM empresarial", "automação com inteligência artificial", "agente IA"],
    benefits: [
      { icon: "robot", title: "Agentes que realmente funcionam", desc: "Treinados na sua base de dados, com guardrails e supervisão humana configurável." },
      { icon: "chart", title: "Análise preditiva de negócio", desc: "Previsão de churn, demanda, inadimplência e oportunidades com modelos sob medida." },
      { icon: "lock", title: "Dados 100% seus", desc: "Processamos no seu ambiente — nenhum dado sensível sai da sua infraestrutura." },
      { icon: "bolt", title: "Integrado ao seu fluxo atual", desc: "Não é uma ferramenta paralela — entra no processo que já existe." }
    ],
    useCases: [
      "Agente de atendimento ao cliente com base de conhecimento da empresa",
      "Classificação automática de chamados de suporte por urgência e tema",
      "Geração de propostas comerciais personalizadas via IA",
      "Análise de contratos e documentos jurídicos",
      "Previsão de demanda para planejamento de estoque e produção"
    ],
    tech: ["OpenAI GPT-4", "Google Gemini", "LangChain", "Python", "PostgreSQL", "pgvector", "Redis"]
  },
  "seguranca-compliance": {
    title: "Segurança & Compliance (LGPD)",
    slug: "seguranca-compliance",
    icon: "shield",
    headline: "Software seguro por design. Compliance sem dor de cabeça.",
    description:
      "Desenvolvemos e auditamos sistemas com arquitetura segura, conformidade à LGPD e padrões corporativos — protegendo sua empresa e seus clientes.",
    keywords: ["segurança de software LGPD", "compliance tecnológico", "auditoria de sistema", "privacidade de dados"],
    benefits: [
      { icon: "lock", title: "LGPD na prática", desc: "Mapeamento de dados, políticas de retenção, direitos do titular e DPA documentados." },
      { icon: "shield", title: "Arquitetura segura por padrão", desc: "Autenticação multifator, criptografia em repouso e trânsito, least-privilege por design." },
      { icon: "search", title: "Auditoria e pentest", desc: "Identificamos vulnerabilidades antes que atacantes o façam." },
      { icon: "clipboard", title: "Documentação técnica completa", desc: "RAS, DPO ready, políticas de privacidade e termos de uso redigidos por técnicos." }
    ],
    useCases: [
      "Adequação de sistema existente à LGPD com mapeamento completo de dados",
      "Implementação de IAM (Identity & Access Management) corporativo",
      "Auditoria de segurança de aplicação web (OWASP Top 10)",
      "Plano de resposta a incidentes (IR Plan) para equipes de TI",
      "Certificação SOC 2 / ISO 27001 — preparação e documentação"
    ],
    tech: ["OAuth 2.0", "JWT", "AWS IAM", "Vault (HashiCorp)", "OWASP ZAP", "Terraform"]
  }
};

type ServiceParams = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceParams): Promise<Metadata> {
  const service = services[params.slug as keyof typeof services];
  if (!service) return { title: "Serviço não encontrado" };
  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: {
      title: `${service.title} — NuPtechs`,
      description: service.description,
      url: `${siteUrl}/servicos/${service.slug}`,
      siteName: "NuPtechs",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} — NuPtechs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — NuPtechs`,
      description: service.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default function ServicePage({ params }: ServiceParams) {
  const service = services[params.slug as keyof typeof services];
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/servicos/${service.slug}#service`,
        name: service.title,
        description: service.description,
        url: `${siteUrl}/servicos/${service.slug}`,
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "NuPtechs",
          url: siteUrl,
        },
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          { "@type": "AdministrativeArea", name: "América Latina" },
        ],
        serviceType: service.title,
        keywords: service.keywords.join(", "),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.useCases.map((uc, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: uc },
          })),
        },
        offers: {
          "@type": "Offer",
          description: "Diagnóstico gratuito em 24h, proposta com escopo fixo e prazo claro.",
          price: "0",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Serviços", item: `${siteUrl}/servicos` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/servicos/${service.slug}` },
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
      <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="service-heading">
        <div className="inner">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
              <li><a href="/" className="hover:text-[var(--text)] transition-colors">Início</a></li>
              <li aria-hidden="true">›</li>
              <li><a href="/#servicos" className="hover:text-[var(--text)] transition-colors">Serviços</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--muted)]">{service.title}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <span className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]" aria-hidden="true">
                <BenefitIcon id={service.icon} />
              </span>
              <span className="eyebrow">Serviço</span>
            </span>
            <h1 id="service-heading" className="display-title mb-6">{service.headline}</h1>
            <p className="lead mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                Solicitar diagnóstico grátis
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/#servicos" className="btn btn-secondary">Ver todos os serviços</a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="benefits-heading">
        <div className="inner">
          <h2 id="benefits-heading" className="section-heading mb-12">Por que vale o investimento</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <div key={b.title} className="card card-sm">
                <div className="card-icon" aria-hidden="true"><BenefitIcon id={b.icon} /></div>
                <h3 className="card-title">{b.title}</h3>
                <p className="card-body">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="page-section" aria-labelledby="usecases-heading">
        <div className="inner grid gap-16 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow mb-4 block">Casos de uso</span>
            <h2 id="usecases-heading" className="section-heading mb-6">O que construímos com isso</h2>
            <p className="lead mb-8">Exemplos reais de como aplicamos {service.title.toLowerCase()} para resolver problemas concretos.</p>
            <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">Falar sobre meu projeto</a>
          </div>
          <ul className="flex flex-col gap-3" aria-label="Exemplos de casos de uso">
            {service.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--muted)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0 text-[var(--accent)]">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {uc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="tech-heading">
        <div className="inner">
          <h2 id="tech-heading" className="section-heading mb-8">Stack tecnológico</h2>
          <div className="flex flex-wrap gap-2">
            {service.tech.map((t) => (
              <span key={t} className="rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-[var(--accent)] py-20" aria-label="Chamada para ação">
        <div className="inner text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Pronto para começar?</h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/75">Diagnóstico gratuito em 24h — nossa equipe analisa seu desafio e devolve um plano técnico concreto.</p>
          <a href="mailto:nuptechs@nuptechs.com" className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            Solicitar diagnóstico grátis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

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
