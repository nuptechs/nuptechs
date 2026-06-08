import ThemeToggle from "./components/ThemeToggle";
import NavLinks from "./components/NavLinks";
import ContactForm from "./components/ContactForm";
import FaqAccordion from "./components/FaqAccordion";
import Animations from "./components/Animations";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import TextReveal from "./components/TextReveal";
import ParticleField from "./components/ParticleField";
import TypewriterCode from "./components/TypewriterCode";
import ProductShowcase from "./components/ProductShowcase";
import GovLogos from "./components/GovLogos";
import EngineeringStats from "./components/EngineeringStats";
import AuroraBackground from "./components/AuroraBackground";
import CodeGenesis from "./components/CodeGenesis";
import QuantumCollapse from "./components/QuantumCollapse";
import ProcessTimeline from "./components/ProcessTimeline";
import SiteFooter from "./components/SiteFooter";
import { allPosts } from "./blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NuPtechs",
      description: "Engenharia de software para infraestrutura empresarial. 15 produtos próprios em produção e 200+ projetos entregues, com conformidade Lei 14.133/2021 e LGPD, auditoria à prova de adulteração e operação on-premise.",
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
        { "@type": "ListItem", position: 2, name: "Produtos", item: `${siteUrl}/#produtos` },
        { "@type": "ListItem", position: 3, name: "Contato", item: `${siteUrl}/#contato` }
      ]
    },
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "NuPtechs",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg`, width: 200, height: 60 },
      email: "nuptechs@nuptechs.com",
      telephone: "+55-61-99369-1692",
      foundingDate: "2022",
      description: "Empresa de engenharia de software com 15 produtos próprios em produção — entre SaaS, plataformas, bibliotecas e ferramentas de infraestrutura — além de 200+ projetos entregues. 18+ anos de experiência em TI governamental.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brasília",
        addressRegion: "DF",
        addressCountry: "BR"
      },
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "Country", name: "United States" }
      ],
      sameAs: [
        "https://www.linkedin.com/company/nuptechs",
        "https://github.com/nuptechs"
      ],
      knowsAbout: [
        "Enterprise Architecture (TOGAF)",
        "Corporate Architecture Consulting",
        "Enterprise Contract Management",
        "Identity & Access Management (IAM)",
        "AI-Powered Code Analysis",
        "Document Processing & Semantic Search",
        "Runtime Debugging & Observability",
        "Government IT Infrastructure"
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Qual é o stack tecnológico da NuPtechs?", acceptedAnswer: { "@type": "Answer", text: "Trabalhamos com as principais tecnologias do mercado, escolhendo a melhor ferramenta para cada camada. Java 21 + Spring Boot e Node.js + Express para backends, React, Vue 3 e Next.js para frontends web e React Native + Expo para mobile, Python + FastAPI para pipelines de IA e processamento de documentos, PostgreSQL + Drizzle ORM para dados relacionais e Pinecone para busca vetorial, Claude, GPT-4 e Gemini para LLMs, Docker, Turborepo e CI/CD automatizado para infraestrutura." } },
        { "@type": "Question", name: "A NuPtechs trabalha com o setor público?", acceptedAnswer: { "@type": "Answer", text: "Sim. Nosso fundador acumula 18+ anos de experiência em TI governamental, com projetos para Caixa Econômica Federal, Serpro, TRF, ANVISA, Anatel e mais de 12 outros órgãos federais." } },
        { "@type": "Question", name: "Quantos produtos próprios a NuPtechs mantém em produção?", acceptedAnswer: { "@type": "Answer", text: "Mantemos 15 produtos próprios em produção — entre SaaS, plataformas, bibliotecas e ferramentas de infraestrutura — além de mais de 200 projetos entregues. A engenharia é pronta para o setor público: conformidade com a Lei 14.133/2021 e a LGPD, auditoria à prova de adulteração e operação on-premise." } }
      ]
    }
  ]
};

const faqs = [
  { q: "Qual é o stack tecnológico da NuPtechs?", a: "Trabalhamos com as principais tecnologias do mercado, escolhendo a melhor ferramenta para cada camada. Java 21 + Spring Boot e Node.js + Express para backends, React, Vue 3 e Next.js para frontends web, React Native + Expo para mobile, Python + FastAPI para pipelines de IA e processamento de documentos, PostgreSQL + Drizzle ORM para dados relacionais e Pinecone para busca vetorial, Claude, GPT-4 e Gemini como LLMs, e Docker, Turborepo e CI/CD automatizado para infraestrutura." },
  { q: "A NuPtechs trabalha com o setor público?", a: "Sim. Nosso fundador acumula 18+ anos de experiência em projetos de TI para órgãos como Caixa Econômica Federal, Serpro, TRF, ANVISA, Anatel, ANA e outros 12+ órgãos federais, estaduais e distritais." },
  { q: "Os produtos podem ser integrados a sistemas existentes?", a: "Toda a nossa arquitetura segue o padrão Port/Adapter — cada integração externa é abstraída por interfaces e adapters plugáveis. APIs REST, webhooks e event-driven architecture garantem integração com ERPs, CRMs e sistemas legados." },
  { q: "Como a NuPtechs garante qualidade do código?", a: "Testes automatizados em todas as camadas (unit, integration, e2e), CI/CD com pipelines de lint, build e teste, code review estruturado e análise de segurança automatizada com o Manifest. Nenhum código vai para produção sem passar por toda a pipeline." },
  { q: "Quais tipos de projeto a NuPtechs realiza?", a: "Construímos plataformas empresariais, ferramentas de infraestrutura e soluções de IA. Desde sistemas de gestão de contratos com 150+ entidades de domínio até pipelines de processamento de documentos com embeddings semânticos." }
];

const featuredBlogPosts = [
  "como-automatizar-processos-manuais",
  "llms-no-mundo-corporativo",
  "como-implementar-rag-na-sua-empresa",
].flatMap((slug) => {
  const post = allPosts[slug];
  return post ? [post] : [];
});

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AuroraBackground />
      <Animations />
      <CursorGlow />
      <ScrollProgress />
      <CodeGenesis />
      <QuantumCollapse />

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
              Contato
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="inicio" className="hero-section" aria-label="Seção principal">
        <ParticleField />
        <div className="hero-glow" aria-hidden="true" />

        <div className="inner relative z-[1]">
          <div className="hero-eng-layout">
            <div className="hero-copy hero-copy--left">
              <TextReveal as="h1" className="display-title" delay={100}>
                Sistemas críticos exigem engenharia que não falha
              </TextReveal>

              <p className="lead" data-reveal style={{ transitionDelay: '300ms' }}>
                +200 projetos entregues e 15 produtos próprios em produção — entre SaaS, plataformas e bibliotecas. Engenharia pronta para o setor público: conformidade com a Lei 14.133/2021 e a LGPD, auditoria à prova de adulteração e operação on-premise.
              </p>

              <div className="flex flex-wrap gap-3 mt-2" data-reveal style={{ transitionDelay: '500ms' }}>
                <a href="#produtos" className="btn btn-primary btn-lg" data-magnetic>
                  Explorar produtos
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://github.com/nuptechs" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>

              <div className="hero-proof-row" data-reveal data-reveal-group style={{ transitionDelay: '650ms' }}>
                <div className="hero-proof-card" data-reveal-item>
                  <span className="hero-proof__kpi">15</span>
                  <span className="hero-proof__label">produtos próprios</span>
                </div>
                <div className="hero-proof-card" data-reveal-item>
                  <span className="hero-proof__kpi">14.133</span>
                  <span className="hero-proof__label">conformidade nativa</span>
                </div>
                <div className="hero-proof-card" data-reveal-item>
                  <span className="hero-proof__kpi">Gov</span>
                  <span className="hero-proof__label">expertise federal crítica</span>
                </div>
              </div>
            </div>

            <div className="hero-demo" data-reveal style={{ transitionDelay: '600ms' }}>
              <TypewriterCode />
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Stats ───────────────────────────── */}
      <section className="eng-band" aria-label="Números de engenharia">
        <div className="inner">
          <EngineeringStats />
        </div>
      </section>

      {/* ── Consultoria · Arquitetura Corporativa / TOGAF ─── */}
      <section id="consultoria" className="page-section bg-[var(--surface)]" aria-labelledby="consultoria-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div data-reveal="left">
              <span className="eyebrow mb-4 block" data-genesis="fast">Consultoria</span>
              <h2 id="consultoria-heading" className="section-heading mb-4" data-genesis>
                Consultoria em Arquitetura Corporativa e mapeamento TOGAF
              </h2>
              <p className="lead mb-6" data-genesis>
                Antes de escrever código, ajudamos sua organização a enxergar o todo. Mapeamos negócio, dados, aplicações e tecnologia segundo o framework <strong>TOGAF</strong>, conectando estratégia a execução — com a mesma profundidade de engenharia que sustenta nossos 15 produtos em produção.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#contato" className="btn btn-primary" data-magnetic>
                  Falar com um arquiteto
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <p className="text-xs text-[var(--subtle)]">Diagnóstico inicial em 24h · Sem compromisso</p>
              </div>
            </div>

            <ul className="consultoria-grid" data-reveal="right" data-reveal-group>
              {[
                { t: "Arquitetura de Negócio", d: "Capacidades, processos e value streams mapeados e alinhados aos objetivos estratégicos." },
                { t: "Arquitetura de Dados & Aplicações", d: "Catálogo de sistemas, fluxos de informação e dependências para decisões com base em evidência." },
                { t: "Arquitetura Tecnológica", d: "Infraestrutura, integrações e padrões técnicos sob o ADM do TOGAF, do baseline ao target." },
                { t: "Roadmap de Transição", d: "Análise de gaps e plano de evolução priorizado — o caminho concreto do estado atual ao desejado." },
              ].map((item) => (
                <li key={item.t} className="consultoria-card" data-reveal-item>
                  <h3 className="consultoria-card__title">{item.t}</h3>
                  <p className="consultoria-card__text">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section id="como-funciona" className="page-section bg-[var(--surface)]" aria-labelledby="process-heading">
        <div className="inner">
          <div className="mb-12 max-w-2xl" data-reveal>
            <span className="eyebrow mb-4 block" data-genesis="fast">Como funciona</span>
            <h2 id="process-heading" className="section-heading mb-4" data-genesis>
              Da ideia ao deploy com clareza, velocidade e prova real.
            </h2>
            <p className="lead" data-genesis>
              Não vendemos promessa vaga. Mostramos o caminho técnico, entregamos uma primeira versão rápido e mantemos visibilidade total até o go-live.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section id="produtos" className="page-section" aria-label="Produtos">
        <div className="inner">
          <div className="mb-16 max-w-2xl" data-reveal>
            <span className="eyebrow mb-4 block" data-genesis="fast">Produtos</span>
            <TextReveal as="h2" className="section-heading mb-4">
              15 produtos próprios — SaaS, plataformas e bibliotecas em produção.
            </TextReveal>
            <p className="lead" data-genesis>
              Além dos +200 projetos entregues para governo e enterprise, a NuPtechs mantém 15 produtos próprios — alguns por assinatura, outros como plataformas, bibliotecas e ferramentas de infraestrutura. Todos nasceram de demandas reais e já rodam em produção.
            </p>
          </div>
          <ProductShowcase />
        </div>
      </section>

      {/* ── Government Expertise ────────────────────────── */}
      <GovLogos />

      {/* ── Blog Preview ────────────────────────────────── */}
      <section id="blog" className="page-section" aria-labelledby="blog-heading">
        <div className="inner">
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4 block" data-genesis="fast">Engenharia &amp; Ideias</span>
              <h2 id="blog-heading" className="section-heading mb-3" data-genesis>
                Direto do código-fonte
              </h2>
              <p className="lead" data-genesis>
                Artigos técnicos sobre arquitetura, IA aplicada e decisões de engenharia — escritos por quem constrói sistemas reais.
              </p>
            </div>
            <a href="/blog" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              Ver todos os artigos
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {featuredBlogPosts.map((post) => (
              <article key={post.slug} className="blog-card group" data-reveal-item>
                <div className="blog-card__top">
                  <span className="badge badge-accent">{post.tag}</span>
                  <span className="blog-card__read">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="blog-card__excerpt">{post.description}</p>
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

      <hr className="section-divider" />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="page-section bg-[var(--surface)]" aria-labelledby="faq-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            <div className="lg:sticky lg:top-24" data-reveal="left">
              <span className="eyebrow mb-4 block" data-genesis="fast">FAQ</span>
              <h2 id="faq-heading" className="section-heading mb-4" data-genesis>
                Perguntas frequentes
              </h2>
              <p className="lead" data-genesis>
                Stack, metodologia, escala e integrações.
              </p>
            </div>
            <div data-reveal="right">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Contact ─────────────────────────────────────── */}
      <section id="contato" className="page-section contact-section" aria-labelledby="contact-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div data-reveal="left">
              <span className="eyebrow mb-4 block" data-genesis="fast">Contato</span>
              <h2 id="contact-heading" className="section-heading mb-4" data-genesis>
                Vamos construir algo juntos
              </h2>
              <p className="lead mb-8" data-genesis>
                Tem um desafio de engenharia? Precisa de uma plataforma enterprise? Fale conosco — adoramos problemas complexos.
              </p>
              <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
                <a href="mailto:nuptechs@nuptechs.com" className="flex items-center gap-3 hover:text-[var(--text)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-[var(--accent)]">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                  </svg>
                  nuptechs@nuptechs.com
                </a>
                <a href="https://wa.me/5561993691692" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--text)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href="https://t.me/nuptechs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--text)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 text-[#26A5E4]">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://github.com/nuptechs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--text)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 text-[var(--accent)]">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/nuptechs
                </a>
                <span className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-[var(--accent)]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Brasília, DF — Brasil
                </span>
              </div>

              <div className="contact-proof-grid" data-reveal data-reveal-group>
                <div className="contact-proof" data-reveal-item><strong>24h</strong><span>retorno inicial</span></div>
                <div className="contact-proof" data-reveal-item><strong>NDA</strong><span>conversa segura</span></div>
                <div className="contact-proof" data-reveal-item><strong>BR + Global</strong><span>atendimento internacional</span></div>
              </div>
            </div>
            <div className="contact-shell" data-reveal="right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
