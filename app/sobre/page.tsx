import type { Metadata } from "next";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const metadata: Metadata = {
  title: "Sobre a NuPtechs — Quem somos e como trabalhamos",
  description:
    "Conheça a NuPtechs: equipe de desenvolvimento de software sob medida com IA, nossa missão, valores e a metodologia que entrega protótipos em 7 dias.",
  keywords: [
    "sobre NuPtechs",
    "empresa desenvolvimento software Brasil",
    "quem somos NuPtechs",
    "equipe software sob medida",
    "missão NuPtechs",
  ],
  alternates: {
    canonical: "/sobre",
    languages: {
      "pt-BR": `${siteUrl}/sobre`,
      "en-US": `${siteUrl}/en`,
      "es-419": `${siteUrl}/es`,
    },
  },
  openGraph: {
    title: "Sobre a NuPtechs — Quem somos e como trabalhamos",
    description:
      "Equipe sênior, metodologia ágil e entrega em semanas. Conheça a empresa por trás de +200 projetos de software.",
    url: `${siteUrl}/sobre`,
    type: "website",
    locale: "pt_BR",
    siteName: "NuPtechs",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Sobre a NuPtechs — Quem somos e como trabalhamos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre a NuPtechs — Quem somos e como trabalhamos",
    description:
      "Equipe sênior, metodologia ágil e entrega em semanas. Conheça a empresa por trás de +200 projetos de software.",
    images: [`${siteUrl}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/sobre#page`,
      url: `${siteUrl}/sobre`,
      name: "Sobre a NuPtechs",
      description:
        "Página institucional da NuPtechs: missão, valores, time e metodologia de desenvolvimento de software sob medida.",
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NuPtechs",
      url: siteUrl,
      foundingDate: "2023",
      email: "nuptechs@nuptechs.com",
      telephone: "+55-61-99369-1692",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
        width: 200,
        height: 60,
      },
      description:
        "Empresa brasileira de desenvolvimento de software sob medida com IA, automação empresarial e produtos SaaS prontos para implantação.",
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "AdministrativeArea", name: "América Latina" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brasília",
        addressRegion: "DF",
        addressCountry: "BR",
      },
      sameAs: [
        "https://www.linkedin.com/company/nuptechs",
        "https://github.com/nuptechs",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Sobre", item: `${siteUrl}/sobre` },
      ],
    },
  ],
};

/* ── Data ────────────────────────────────────────────────────────────────── */
const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L5 5.5v5.5C5 14.75 7.8 18.25 11 19.5c3.2-1.25 6-4.75 6-8.5V5.5L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Entrega sem desculpa",
    body: "Comprometemos prazo e escopo no contrato. Se atrasar, é por decisão nossa — não do cliente. Responsabilidade é o padrão, não o diferencial.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Velocidade com qualidade",
    body: "Protótipo em 7 dias não é slogan de marketing — é a consequência de um processo bem definido, stack testada e equipe que já resolveu o mesmo problema antes.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M2 11h18M11 2l9 9-9 9-9-9 9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Transparência total",
    body: "O cliente acompanha o progresso em tempo real. Sem reuniões de status semanais para descobrir que nada andou. Código, demo e métricas sempre visíveis.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 15.5h7M15.5 12v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "IA onde faz sentido",
    body: "Não adicionamos inteligência artificial em projetos para impressionar. Adicionamos onde há ROI mensurável. Essa honestidade poupa tempo e dinheiro do cliente.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 17L2 20h18l-2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 3v10M7 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Código que escala",
    body: "Entregamos para produção, não para portfólio. Arquitetura pensada para crescer — de 100 usuários a 1 milhão, sem reescrever tudo.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="15" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11.5 11.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: "Parceria de longo prazo",
    body: "Projetos terminam, mas relacionamentos ficam. Nossa taxa de recontratação é alta porque tratamos os problemas do cliente como se fossem nossos — porque são.",
  },
];

const milestones = [
  { year: "2023", event: "Fundação da NuPtechs em Brasília com foco em automação e sistemas sob medida." },
  { year: "2024", event: "Primeiros 100 projetos entregues. Lançamento dos produtos FlowOps e DataPulse em beta." },
  { year: "2025", event: "Expansão para clientes em toda a América Latina. Linha de produtos SaaS: 6 produtos lançados." },
  { year: "2026", event: "Internacionalização: site, atendimento e contratos em PT, EN e ES. +200 projetos entregues." },
];

const team = [
  {
    name: "Yuri Fonseca",
    role: "CEO & Co-fundador",
    bio: "Engenheiro de software com foco em sistemas de alta performance e automação empresarial. Responsável pela estratégia de produto e crescimento.",
    initials: "YF",
  },
  {
    name: "Time NuPtechs",
    role: "Engenharia & Produto",
    bio: "Equipe sênior de engenheiros full-stack, especialistas em IA aplicada, DevOps e design de sistemas — todos com experiência em projetos de produção.",
    initials: "NT",
  },
];

const stats = [
  { value: "+200", label: "Projetos entregues" },
  { value: "98%", label: "Taxa de satisfação" },
  { value: "7 dias", label: "Do contrato ao protótipo" },
  { value: "24h", label: "Diagnóstico grátis" },
];

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Nav ── */}
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

      <main>
        {/* ── Hero ── */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="sobre-heading">
          <div className="inner">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
                <li><a href="/" className="hover:text-[var(--text)] transition-colors">Início</a></li>
                <li aria-hidden="true">›</li>
                <li className="text-[var(--muted)]">Sobre</li>
              </ol>
            </nav>

            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow mb-4 block">Sobre a NuPtechs</span>
                <h1 id="sobre-heading" className="display-title mb-6">
                  Construímos software que <em>resolve problemas reais</em>.
                </h1>
                <p className="lead mb-6">
                  Somos uma empresa brasileira de desenvolvimento de software sob medida, automação com IA e produtos SaaS — fundada com uma premissa simples: <strong>empresas merecem tecnologia que funciona de verdade, entregue no prazo, com custo previsível.</strong>
                </p>
                <p className="text-[var(--muted)] leading-relaxed mb-8">
                  Não somos uma consultoria de PowerPoint. Somos engenheiros que escrevem código, entregam demos em semanas e ficam disponíveis após o deploy. Com base em Brasília e atendendo clientes em todo o Brasil e América Latina.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                    Iniciar diagnóstico grátis
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="/#servicos" className="btn btn-secondary">Ver serviços</a>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center"
                  >
                    <p className="stat-number">{s.value}</p>
                    <p className="stat-unit">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="missao-heading">
          <div className="inner max-w-3xl mx-auto text-center">
            <span className="eyebrow mb-4 block">Missão</span>
            <h2 id="missao-heading" className="section-heading mb-6">
              Tornar tecnologia de ponta acessível a empresas de qualquer porte.
            </h2>
            <p className="lead mx-auto">
              Acreditamos que a distância entre uma empresa média e uma empresa de tecnologia não deveria ser medida em anos nem em orçamentos de multinacional. Com a metodologia certa e um time experiente, qualquer empresa pode ter sistemas, automações e produtos digitais que antes eram privilégio das grandes.
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="page-section" aria-labelledby="valores-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">Como trabalhamos</span>
              <h2 id="valores-heading" className="section-heading">
                Os princípios que guiam cada projeto.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="card card-sm">
                  <div className="card-icon" aria-hidden="true">{v.icon}</div>
                  <h3 className="card-title">{v.title}</h3>
                  <p className="card-body">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="historia-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">Nossa história</span>
              <h2 id="historia-heading" className="section-heading">
                Da primeira linha ao +200º projeto.
              </h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[3.25rem] top-0 hidden h-full w-px bg-[var(--border)] md:block"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-8 md:items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="relative z-10 flex h-11 w-[6.5rem] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--accent)]">
                        {m.year}
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--border)] my-0 md:hidden" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-10 pt-2 flex-1">
                      <p className="text-[var(--muted)] leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="page-section" aria-labelledby="time-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">Time</span>
              <h2 id="time-heading" className="section-heading">
                Engenheiros que entregam, não apenas planejam.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 max-w-2xl">
              {team.map((member) => (
                <div key={member.name} className="card flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)]">{member.name}</p>
                      <p className="text-xs text-[var(--subtle)]">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{member.bio}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-2xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                <strong className="text-[var(--text)]">Trabalhamos com um modelo de equipe enxuta e especializada.</strong>{" "}
                Cada projeto é alocado com os perfis certos — engenheiro de produto, especialista em IA, DevOps — sem o overhead de equipes grandes. Isso mantém a qualidade alta e o custo previsível.
              </p>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="metodologia-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">Metodologia</span>
              <h2 id="metodologia-heading" className="section-heading">
                Da ideia à produção em semanas.
              </h2>
            </div>
            <div className="grid gap-0 md:grid-cols-4">
              {[
                {
                  num: "01",
                  title: "Diagnóstico gratuito",
                  body: "Chamada de 30 minutos. Mapeamos o desafio e devolvemos um plano técnico em até 24h.",
                },
                {
                  num: "02",
                  title: "Proposta com escopo fixo",
                  body: "Prazo claro, preço transparente, NDA disponível. Sem surpresas no contrato.",
                },
                {
                  num: "03",
                  title: "Sprints semanais",
                  body: "O cliente acompanha o progresso em tempo real. Demo toda semana. Sem relatórios vazios.",
                },
                {
                  num: "04",
                  title: "Deploy + 30 dias de suporte",
                  body: "Vamos à produção juntos e ficamos disponíveis por 30 dias para garantir a estabilidade.",
                },
              ].map((step) => (
                <div key={step.num} className="step-item">
                  <div className="step-num">{step.num}</div>
                  <div>
                    <h3 className="card-title">{step.title}</h3>
                    <p className="card-body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location ── */}
        <section className="page-section" aria-labelledby="localizacao-heading">
          <div className="inner grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow mb-4 block">Localização</span>
              <h2 id="localizacao-heading" className="section-heading mb-4">
                Baseados em Brasília. Atendemos em todo o Brasil e América Latina.
              </h2>
              <p className="lead mb-6">
                Nossa sede é em Brasília — DF, mas trabalhamos com clientes em São Paulo, Rio de Janeiro, Minas Gerais, e em países como Portugal, EUA, México e Colômbia.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Projetos são conduzidos de forma totalmente remota e assíncrona, com reuniões síncronas semanais de alinhamento. Contratos em BRL, USD ou EUR, com NDA padrão disponível desde o primeiro contato.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                  Enviar mensagem
                </a>
                <a href="tel:+5561993691692" className="btn btn-secondary">
                  +55 (61) 99369-1692
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)] mb-1">Email</p>
                <a
                  href="mailto:nuptechs@nuptechs.com"
                  className="text-[var(--accent)] font-medium hover:underline"
                >
                  nuptechs@nuptechs.com
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)] mb-1">Telefone</p>
                <a
                  href="tel:+5561993691692"
                  className="text-[var(--text)] font-medium hover:text-[var(--accent)] transition-colors"
                >
                  +55 (61) 99369-1692
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)] mb-1">Sede</p>
                <p className="text-[var(--muted)]">Brasília, DF — Brasil</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)] mb-1">Atendimento</p>
                <p className="text-[var(--muted)]">Segunda a sexta, 9h – 18h BRT<br />Resposta em até 24h</p>
              </div>
              <div className="border-t border-[var(--border)] pt-6 flex gap-4">
                <a
                  href="https://www.linkedin.com/company/nuptechs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label="NuPtechs no LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/nuptechs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label="NuPtechs no GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.104-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.393.1 2.646.641.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="page-section bg-[var(--accent)] py-20" aria-label="Chamada para ação">
          <div className="inner text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Pronto para conversar?</h2>
            <p className="mx-auto mb-8 max-w-md text-base text-white/75">
              Diagnóstico gratuito em 24h. Nossa equipe analisa seu desafio e devolve um plano técnico concreto — sem compromisso.
            </p>
            <a
              href="mailto:nuptechs@nuptechs.com"
              className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Solicitar diagnóstico grátis
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="nav-logo" aria-label="NuPtechs — voltar ao topo">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap items-center gap-4 text-xs text-[var(--subtle)]">
              <li><a href="/sobre" className="hover:text-[var(--text)] transition-colors">Sobre</a></li>
              <li><a href="/servicos" className="hover:text-[var(--text)] transition-colors">Serviços</a></li>
              <li><a href="/produtos" className="hover:text-[var(--text)] transition-colors">Produtos</a></li>
              <li><a href="/blog" className="hover:text-[var(--text)] transition-colors">Blog</a></li>
              <li><a href="/en" className="hover:text-[var(--text)] transition-colors">EN</a></li>
              <li><a href="/es" className="hover:text-[var(--text)] transition-colors">ES</a></li>
            </ul>
          </nav>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
