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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NuPtechs",
      description: "Engenharia de software para infraestrutura empresarial. 14 produtos em produção, 490k+ linhas de código, 7.050+ testes automatizados.",
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
      description: "Empresa de engenharia de software com 14 produtos em produção, incluindo plataformas de gestão de contratos, identidade e acesso, debugging e IA. 18+ anos de experiência em TI governamental.",
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
        { "@type": "Question", name: "Qual é o stack tecnológico da NuPtechs?", acceptedAnswer: { "@type": "Answer", text: "Java 21 + Spring Boot para backends de domínio, Node.js + Express para gateways, Vue 3 e React para frontends, Python + FastAPI para pipelines de IA, PostgreSQL como banco primário e Turborepo para monorepos." } },
        { "@type": "Question", name: "A NuPtechs trabalha com o setor público?", acceptedAnswer: { "@type": "Answer", text: "Sim. Nosso fundador acumula 18+ anos de experiência em TI governamental, com projetos para Caixa Econômica Federal, Serpro, TRF, ANVISA, Anatel e mais de 12 outros órgãos federais." } },
        { "@type": "Question", name: "Quantos produtos a NuPtechs tem em produção?", acceptedAnswer: { "@type": "Answer", text: "14 produtos, totalizando 490k+ linhas de código e 7.050+ testes automatizados. De gestão de contratos (EasyNuP) a IAM (NuPIdentify) e debugging com IA (Sentinel)." } }
      ]
    }
  ]
};

const faqs = [
  { q: "Qual é o stack tecnológico da NuPtechs?", a: "Java 21 + Spring Boot para backends de domínio, Node.js + Express para gateways e integrações, Vue 3 e React para frontends, Python + FastAPI para pipelines de IA, e PostgreSQL como banco primário. Monorepos gerenciados com Turborepo." },
  { q: "A NuPtechs trabalha com o setor público?", a: "Sim. Nosso fundador acumula 18+ anos de experiência em projetos de TI para órgãos como Caixa Econômica Federal, Serpro, TRF, ANVISA, Anatel, ANA e outros 12+ órgãos federais, estaduais e distritais." },
  { q: "Os produtos podem ser integrados a sistemas existentes?", a: "Toda a nossa arquitetura segue o padrão Port/Adapter — cada integração externa é abstraída por interfaces e adapters plugáveis. APIs REST, webhooks e event-driven architecture garantem integração com ERPs, CRMs e sistemas legados." },
  { q: "Como a NuPtechs garante qualidade do código?", a: "7.050+ testes automatizados (unit, integration, e2e), CI/CD com pipelines de lint, build e teste, code review estruturado e análise de segurança automatizada com o Manifest. Nenhum código vai para produção sem passar por toda a pipeline." },
  { q: "Quais tipos de projeto a NuPtechs realiza?", a: "Construímos plataformas empresariais, ferramentas de infraestrutura e soluções de IA. Desde sistemas de gestão de contratos com 150+ entidades de domínio até pipelines de processamento de documentos com embeddings semânticos." }
];

const blogPosts = [
  { slug: "como-automatizar-processos-manuais", tag: "Automação", title: "Como automatizar processos manuais e liberar 30h/semana da sua equipe", excerpt: "Descubra as 5 tarefas que mais consomem tempo em operações e como eliminá-las com fluxos inteligentes.", readTime: "6 min" },
  { slug: "llms-no-mundo-corporativo", tag: "IA Aplicada", title: "LLMs no mundo corporativo: onde a IA realmente entrega ROI", excerpt: "Análise de casos reais de empresas brasileiras que implementaram IA e os resultados obtidos nos primeiros 90 dias.", readTime: "8 min" },
  { slug: "software-sob-medida-vs-saas", tag: "Engenharia", title: "Software sob medida vs. SaaS pronto: qual escolher para sua empresa?", excerpt: "Um guia prático para gestores avaliarem custo, tempo e risco antes de contratar desenvolvimento personalizado.", readTime: "5 min" }
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Animations />
      <CursorGlow />
      <ScrollProgress />

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
                Construímos infraestrutura para software empresarial
              </TextReveal>

              <p className="lead" data-reveal style={{ transitionDelay: '300ms' }}>
                14 produtos em produção. 490 mil linhas de código. Da gestão de identidade ao debugging com IA — engenharia que opera nos maiores órgãos do governo federal.
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

      {/* ── Products ────────────────────────────────────── */}
      <section id="produtos" className="page-section" aria-label="Produtos">
        <div className="inner">
          <div className="mb-16 max-w-2xl" data-reveal>
            <span className="eyebrow mb-4 block">Produtos</span>
            <TextReveal as="h2" className="section-heading mb-4">
              14 produtos. Código real em produção.
            </TextReveal>
            <p className="lead">
              Cada produto nasceu de necessidades reais em projetos de governo e enterprise. Sem protótipos — código que roda em produção com milhares de usuários.
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
              <span className="eyebrow mb-4 block">Engenharia &amp; Ideias</span>
              <h2 id="blog-heading" className="section-heading mb-3">
                Direto do código-fonte
              </h2>
              <p className="lead">
                Artigos técnicos sobre arquitetura, IA aplicada e decisões de engenharia — escritos por quem constrói sistemas reais.
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

      <hr className="section-divider" />

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
      <section id="contato" className="page-section" aria-labelledby="contact-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div data-reveal="left">
              <span className="eyebrow mb-4 block">Contato</span>
              <h2 id="contact-heading" className="section-heading mb-4">
                Vamos construir algo juntos
              </h2>
              <p className="lead mb-8">
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
                Engenharia de software para infraestrutura empresarial. 14 produtos em produção.
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
              <h4>Plataformas</h4>
              <a href="#produtos">EasyNuP</a>
              <a href="#produtos">NuPIdentify</a>
              <a href="#produtos">Debug Probe</a>
              <a href="#produtos">Sentinel</a>
            </div>

            <div className="footer-col">
              <h4>AI &amp; Tools</h4>
              <a href="#produtos">Manifest</a>
              <a href="#produtos">NuP-Chunks</a>
              <a href="https://github.com/nuptechs" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2022&ndash;{new Date().getFullYear()} NuPtechs. Todos os direitos reservados.</p>
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
