import { notFound } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import NavLinks from "../components/NavLinks";
import ContactForm from "../components/ContactForm";
import FaqAccordion from "../components/FaqAccordion";
import Animations from "../components/Animations";
import CursorGlow from "../components/CursorGlow";
import ScrollProgress from "../components/ScrollProgress";
import TextReveal from "../components/TextReveal";
import ParticleField from "../components/ParticleField";
import TypewriterCode from "../components/TypewriterCode";
import ProductShowcase from "../components/ProductShowcase";
import GovLogos from "../components/GovLogos";
import EngineeringStats from "../components/EngineeringStats";
import AuroraBackground from "../components/AuroraBackground";
import CodeGenesis from "../components/CodeGenesis";
import QuantumCollapse from "../components/QuantumCollapse";
import ProcessTimeline from "../components/ProcessTimeline";
import SiteFooter from "../components/SiteFooter";
import { dictionaries, type Locale } from "../i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export default function LangPage({ params }: { params: { lang: string } }) {
  if (!["en", "es"].includes(params.lang)) notFound();
  const d = dictionaries[params.lang as Locale];
  const lang = params.lang as "en" | "es";
  const ptUrl = siteUrl;
  const enUrl = `${siteUrl}/en`;
  const esUrl = `${siteUrl}/es`;
  const heroProof = lang === "en"
    ? [
        { kpi: "15", label: "live products" },
        { kpi: "14.133", label: "compliance-native" },
        { kpi: "Gov", label: "federal-grade expertise" },
      ]
    : [
        { kpi: "15", label: "productos en producción" },
        { kpi: "14.133", label: "conformidad nativa" },
        { kpi: "Gov", label: "experiencia federal crítica" },
      ];
  const contactProof = lang === "en"
    ? [
        { kpi: "24h", label: "initial response" },
        { kpi: "NDA", label: "secure conversation" },
        { kpi: "BR + Global", label: "international support" },
      ]
    : [
        { kpi: "24h", label: "respuesta inicial" },
        { kpi: "NDA", label: "conversación segura" },
        { kpi: "BR + Global", label: "atención internacional" },
      ];
  const processCopy = lang === "en"
    ? {
        eyebrow: "How it works",
        title: "From diagnosis to production with real engineering visibility.",
        lead: "We show the technical path, validate quickly, and keep delivery transparent from the first call to launch.",
      }
    : {
        eyebrow: "Cómo funciona",
        title: "Del diagnóstico a producción con visibilidad real de ingeniería.",
        lead: "Mostramos el camino técnico, validamos rápido y mantenemos claridad total desde la primera llamada hasta el lanzamiento.",
      };

  return (
    <>
      <AuroraBackground />
      <Animations />
      <CursorGlow />
      <ScrollProgress />
      <CodeGenesis />
      <QuantumCollapse />

      {/* ── Navigation ──────────────────────────────────── */}
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <a href={`/${lang}`} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks lang={lang} />
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-[var(--muted)]">
              <a href={ptUrl} className="hover:text-[var(--text)] transition-colors px-1">PT</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={enUrl} className={`transition-colors px-1 ${lang === "en" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>EN</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={esUrl} className={`transition-colors px-1 ${lang === "es" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>ES</a>
            </div>
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              {d.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="home" className="hero-section" aria-label={d.hero.title}>
        <ParticleField />
        <div className="hero-glow" aria-hidden="true" />

        <div className="inner relative z-[1]">
          <div className="hero-eng-layout">
            <div className="hero-copy hero-copy--left">
              <TextReveal as="h1" className="display-title" delay={100}>
                {d.hero.title}
              </TextReveal>

              <p className="lead" data-reveal style={{ transitionDelay: '300ms' }}>
                {d.hero.lead}
              </p>

              <div className="flex flex-wrap gap-3 mt-2" data-reveal style={{ transitionDelay: '500ms' }}>
                <a href={`/${lang}#products`} className="btn btn-primary btn-lg" data-magnetic>
                  {d.hero.ctaPrimary}
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
                {heroProof.map((item) => (
                  <div key={item.label} className="hero-proof-card" data-reveal-item>
                    <span className="hero-proof__kpi">{item.kpi}</span>
                    <span className="hero-proof__label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-demo" data-reveal style={{ transitionDelay: '600ms' }}>
              <TypewriterCode />
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Stats ───────────────────────────── */}
      <section className="eng-band" aria-label={d.sections.stats}>
        <div className="inner">
          <EngineeringStats lang={lang} />
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section id="process" className="page-section bg-[var(--surface)]" aria-labelledby="process-heading">
        <div className="inner">
          <div className="mb-12 max-w-2xl" data-reveal>
            <span className="eyebrow mb-4 block" data-genesis="fast">{processCopy.eyebrow}</span>
            <h2 id="process-heading" className="section-heading mb-4" data-genesis>
              {processCopy.title}
            </h2>
            <p className="lead" data-genesis>
              {processCopy.lead}
            </p>
          </div>
          <ProcessTimeline lang={lang} />
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section id="products" className="page-section" aria-label={d.products.eyebrow}>
        <div className="inner">
          <div className="mb-16 max-w-2xl" data-reveal>
            <span className="eyebrow mb-4 block" data-genesis="fast">{d.products.eyebrow}</span>
            <TextReveal as="h2" className="section-heading mb-4">
              {d.products.title}
            </TextReveal>
            <p className="lead" data-genesis>
              {d.products.lead}
            </p>
          </div>
          <ProductShowcase lang={lang} />
        </div>
      </section>

      {/* ── Government Expertise ────────────────────────── */}
      <GovLogos lang={lang} />

      {/* ── Blog Preview ────────────────────────────────── */}
      <section id="blog" className="page-section" aria-labelledby="blog-heading">
        <div className="inner">
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4 block" data-genesis="fast">{d.blog.eyebrow}</span>
              <h2 id="blog-heading" className="section-heading mb-3" data-genesis>
                {d.blog.title}
              </h2>
              <p className="lead" data-genesis>
                {d.blog.lead}
              </p>
            </div>
            <a href="/blog" className="btn btn-secondary flex-shrink-0 self-start sm:self-auto">
              {d.blog.viewAll}
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {d.blog.posts.map((post) => (
              <article key={post.slug} className="blog-card group" data-reveal-item>
                <div className="blog-card__top">
                  <span className="badge badge-accent">{post.tag}</span>
                  <span className="blog-card__read">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="card-link mt-auto" aria-label={`${d.blog.readArticle}: ${post.title}`}>
                  {d.blog.readArticle}
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
              <span className="eyebrow mb-4 block" data-genesis="fast">{d.faq.eyebrow}</span>
              <h2 id="faq-heading" className="section-heading mb-4" data-genesis>
                {d.faq.title}
              </h2>
              <p className="lead" data-genesis>
                {d.faq.lead}
              </p>
            </div>
            <div data-reveal="right">
              <FaqAccordion items={d.faq.items} />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Contact ─────────────────────────────────────── */}
      <section id="contact" className="page-section contact-section" aria-labelledby="contact-heading">
        <div className="inner">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div data-reveal="left">
              <span className="eyebrow mb-4 block" data-genesis="fast">{d.contact.eyebrow}</span>
              <h2 id="contact-heading" className="section-heading mb-4" data-genesis>
                {d.contact.title}
              </h2>
              <p className="lead mb-8" data-genesis>
                {d.contact.lead}
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
                {contactProof.map((item) => (
                  <div key={item.label} className="contact-proof" data-reveal-item><strong>{item.kpi}</strong><span>{item.label}</span></div>
                ))}
              </div>
            </div>
            <div className="contact-shell" data-reveal="right">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}
