import { notFound } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import NavLinks from "../components/NavLinks";
import { dictionaries, type Locale } from "../i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* ── Service icon map (same as homepage) ─────────────── */
const ServiceIcon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    automacao: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L5 6v5c0 4.418 2.686 8.166 6 9.5C14.314 19.166 17 15.418 17 11V6l-6-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bi: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 16l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 19.5h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    mobile: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="10" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    api: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M9 12.5a4.5 4.5 0 006.364.001l2-2a4.5 4.5 0 00-6.364-6.365L9.5 5.635" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 9.5a4.5 4.5 0 00-6.364 0l-2 2a4.5 4.5 0 006.364 6.364L12.5 16.365" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    ia: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="13.5" r="1.25" fill="currentColor"/>
        <circle cx="13.5" cy="13.5" r="1.25" fill="currentColor"/>
        <path d="M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 9V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="5" r="1.25" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    seguranca: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2.5L4 5.5v6.25C4 16 7.2 19.5 11 20.5c3.8-1 7-4.5 7-8.75V5.5L11 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons["api"]}</>;
};

export default function LangPage({ params }: { params: { lang: string } }) {
  if (!["en", "es"].includes(params.lang)) notFound();
  const d = dictionaries[params.lang as Locale];
  const ptUrl = siteUrl;
  const enUrl = `${siteUrl}/en`;
  const esUrl = `${siteUrl}/es`;

  return (
    <>
      {/* ── Nav ── */}
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <a href={`/${params.lang}`} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-[var(--muted)]">
              <a href={ptUrl} className="hover:text-[var(--text)] transition-colors px-1">PT</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={enUrl} className={`transition-colors px-1 ${params.lang === "en" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>EN</a>
              <span className="text-[var(--border-strong)]">·</span>
              <a href={esUrl} className={`transition-colors px-1 ${params.lang === "es" ? "text-[var(--accent)] font-semibold" : "hover:text-[var(--text)]"}`}>ES</a>
            </div>
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              {d.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="hero-heading">
          <div className="inner">
            <div className="hero-layout">
              <div className="hero-copy">
                <div className="hero-proof">
                  <span className="hero-proof__dot" />
                  {d.hero.proof}
                </div>
                <h1 id="hero-heading" className="display-title">
                  {d.hero.h1Line1}<br />
                  {d.hero.h1Line2} <em>{d.hero.h1Emphasis}</em>.
                </h1>
                <p className="lead">{d.hero.lead}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">{d.hero.ctaPrimary}</a>
                  <a href={`/${params.lang}#services`} className="btn btn-secondary">{d.hero.ctaSecondary}</a>
                </div>
                <p className="hero-microcopy">{d.hero.microcopy}</p>
              </div>
              <div className="hero-visual-wrapper" aria-hidden="true">
                {/* Visual placeholder — same HeroVisual component could be reused */}
                <div className="hero-visual">
                  <div className="hero-visual__chrome">
                    <span className="hero-visual__dot hero-visual__dot--red" />
                    <span className="hero-visual__dot hero-visual__dot--yellow" />
                    <span className="hero-visual__dot hero-visual__dot--green" />
                    <span className="hero-visual__chrome-title">diagnosis.ts</span>
                  </div>
                  <div className="hero-visual__body">
                    <div className="hero-visual__line">
                      <span className="hero-visual__ln">1</span>
                      <span className="hero-visual__keyword">const </span>
                      <span className="hero-visual__var">result </span>
                      <span className="hero-visual__op">= await </span>
                      <span className="hero-visual__fn">nuptechs</span>
                      <span className="hero-visual__punct">.</span>
                      <span className="hero-visual__fn">analyze</span>
                      <span className="hero-visual__punct">({"{"}</span>
                    </div>
                    <div className="hero-visual__line hero-visual__line--indent">
                      <span className="hero-visual__ln">2</span>
                      <span className="hero-visual__prop">company</span>
                      <span className="hero-visual__op"> : </span>
                      <span className="hero-visual__str">&quot;Your company&quot;</span>
                      <span className="hero-visual__punct">,</span>
                    </div>
                    <div className="hero-visual__line hero-visual__line--indent">
                      <span className="hero-visual__ln">3</span>
                      <span className="hero-visual__prop">challenge</span>
                      <span className="hero-visual__op"> : </span>
                      <span className="hero-visual__str">&quot;manual processes&quot;</span>
                      <span className="hero-visual__punct">,</span>
                    </div>
                    <div className="hero-visual__line hero-visual__line--indent">
                      <span className="hero-visual__ln">4</span>
                      <span className="hero-visual__prop">deadline</span>
                      <span className="hero-visual__op"> : </span>
                      <span className="hero-visual__str">&quot;7 days&quot;</span>
                      <span className="hero-visual__punct">,</span>
                    </div>
                    <div className="hero-visual__line">
                      <span className="hero-visual__ln">5</span>
                      <span className="hero-visual__punct">{"}"});</span>
                    </div>
                    <div className="hero-visual__output">
                      <div className="hero-visual__output-header">
                        <span className="hero-visual__output-dot" />
                        <span className="hero-visual__output-label">OUTPUT</span>
                      </div>
                      <div className="hero-visual__output-row">
                        <span className="hero-visual__output-key">status</span>
                        <span className="hero-visual__output-sep"> </span>
                        <span className="hero-visual__output-val hero-visual__output-val--green">✓ ready in 24h</span>
                      </div>
                      <div className="hero-visual__output-row">
                        <span className="hero-visual__output-key">prototype</span>
                        <span className="hero-visual__output-sep"> </span>
                        <span className="hero-visual__output-val">7 business days</span>
                      </div>
                      <div className="hero-visual__output-row">
                        <span className="hero-visual__output-key">diagnosis cost</span>
                        <span className="hero-visual__output-sep"> </span>
                        <span className="hero-visual__output-val hero-visual__output-val--accent">$ 0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust band ── */}
        <section className="page-section py-12 bg-[var(--surface)]" aria-label="Stats">
          <div className="inner">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {d.trust.items.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="stat-number">{s.value}</p>
                  <p className="stat-unit">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="page-section" aria-labelledby="services-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">{d.services.eyebrow}</span>
              <h2 id="services-heading" className="section-heading mb-4">{d.services.title}</h2>
              <p className="lead">{d.services.lead}</p>
            </div>
            <div className="svc-grid">
              {d.services.items.map((svc) => (
                <a
                  key={svc.slug}
                  href={`/${params.lang}/services/${svc.slug}`}
                  className="svc-card"
                  aria-label={svc.title}
                >
                  <div className="svc-card__header">
                    <div className="svc-card__icon"><ServiceIcon id={svc.id} /></div>
                    <span className="svc-card__num">{svc.num}</span>
                  </div>
                  <div className="svc-card__body">
                    <h3 className="svc-card__title">{svc.title}</h3>
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
                      {svc.tags.map((t) => <span key={t} className="svc-card__tag">{t}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section id="how-it-works" className="page-section bg-[var(--surface)]" aria-labelledby="process-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">{d.process.eyebrow}</span>
              <h2 id="process-heading" className="section-heading">{d.process.title}</h2>
            </div>
            <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
              {d.process.steps.map((step) => (
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

        {/* ── Products ── */}
        <section id="products" className="page-section" aria-labelledby="products-heading">
          <div className="inner">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow mb-3 block">{d.products.eyebrow}</span>
              <h2 id="products-heading" className="section-heading mb-4">{d.products.title}</h2>
              <p className="lead">{d.products.lead}</p>
            </div>
            <div className="products-grid">
              {d.products.items.map((p) => (
                <a key={p.slug} href={`/${params.lang}/products/${p.slug}`} className={`product-listing-card${p.highlight ? " product-listing-card--featured" : ""}`}>
                  <div className="product-listing-card__top">
                    <div className="product-listing-card__icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className={`status-badge ${p.status === "Available" || p.status === "Disponible" ? "status-badge--green" : p.status === "Beta" ? "status-badge--amber" : "status-badge--muted"}`}>{p.status}</span>
                  </div>
                  <div className="product-listing-card__body">
                    <p className="product-listing-card__category">{p.tag}</p>
                    <h3 className="product-listing-card__name">{p.name}</h3>
                    <p className="product-listing-card__tagline">{p.tagline}</p>
                  </div>
                  <div className="product-listing-card__footer">
                    <span className="product-listing-card__cta">
                      {params.lang === "en" ? "Learn more" : "Saber más"}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band ── */}
        <section className="page-section bg-[var(--surface)]" aria-label="Call to action">
          <div className="inner">
            <div className="cta-band">
              <div>
                <h2 className="cta-band__title">{d.cta.title}</h2>
                <p className="cta-band__sub">{d.cta.sub}</p>
              </div>
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary flex-shrink-0">
                {d.cta.button}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="page-section" aria-labelledby="faq-heading">
          <div className="inner max-w-2xl mx-auto">
            <div className="mb-10 text-center">
              <span className="eyebrow mb-3 block">{d.faq.eyebrow}</span>
              <h2 id="faq-heading" className="section-heading">{d.faq.title}</h2>
            </div>
            <div className="faq-list">
              {d.faq.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-trigger">
                    <span className="faq-question">{item.q}</span>
                    <svg className="faq-chevron faq-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="faq-answer-text">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="page-section bg-[var(--surface)]" aria-labelledby="contact-heading">
          <div className="inner max-w-xl mx-auto text-center">
            <span className="eyebrow mb-3 block">{d.contact.eyebrow}</span>
            <h2 id="contact-heading" className="section-heading mb-4">{d.contact.title}</h2>
            <p className="lead mx-auto mb-8">{d.contact.lead}</p>
            <form className="flex flex-col gap-4 text-left" action="mailto:nuptechs@nuptechs.com" method="get">
              <input className="field" type="text" placeholder={d.contact.namePlaceholder} required />
              <input className="field" type="email" placeholder={d.contact.emailPlaceholder} required />
              <textarea className="field min-h-[120px] resize-y" placeholder={d.contact.messagePlaceholder} required />
              <button type="submit" className="btn btn-primary self-start">{d.contact.button}</button>
              <p className="text-xs text-[var(--subtle)]">{d.contact.microcopy}</p>
            </form>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href={`/${params.lang}`} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <div className="flex items-center gap-4 text-xs text-[var(--subtle)]">
            <a href={ptUrl} className="hover:text-[var(--text)] transition-colors">PT</a>
            <a href={enUrl} className="hover:text-[var(--text)] transition-colors">EN</a>
            <a href={esUrl} className="hover:text-[var(--text)] transition-colors">ES</a>
          </div>
          <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. {d.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
