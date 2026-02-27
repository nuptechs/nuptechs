import type { Metadata } from "next";
import { dictionaries, type Locale } from "../../i18n/dictionaries";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

type Props = { params: { lang: Locale } };

export function generateStaticParams() {
  return [{ lang: "en" as Locale }, { lang: "es" as Locale }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = dictionaries[params.lang];
  const a = d.about;
  const langPath = params.lang === "en" ? "/en/about" : "/es/about";

  return {
    title: a.ogTitle,
    description: a.pageDescription,
    alternates: {
      canonical: `${siteUrl}${langPath}`,
      languages: {
        "pt-BR": `${siteUrl}/sobre`,
        "en-US": `${siteUrl}/en/about`,
        "es-419": `${siteUrl}/es/about`,
      },
    },
    openGraph: {
      title: a.ogTitle,
      description: a.ogDescription,
      url: `${siteUrl}${langPath}`,
      type: "website",
      siteName: "NuPtechs",
      locale: params.lang === "en" ? "en_US" : "es_419",
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(a.ogTitle)}&sub=${encodeURIComponent(a.ogDescription)}&lang=${params.lang}`,
          width: 1200,
          height: 630,
          alt: a.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: a.ogTitle,
      description: a.ogDescription,
      images: [`${siteUrl}/og?title=${encodeURIComponent(a.ogTitle)}&sub=${encodeURIComponent(a.ogDescription)}&lang=${params.lang}`],
    },
  };
}

export default function AboutPage({ params }: Props) {
  const d = dictionaries[params.lang];
  const a = d.about;
  const langPath = params.lang === "en" ? "/en/about" : "/es/about";
  const htmlLang = params.lang === "en" ? "en-US" : "es-419";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}${langPath}#page`,
        url: `${siteUrl}${langPath}`,
        name: a.pageTitle,
        description: a.pageDescription,
        inLanguage: htmlLang,
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
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg`, width: 200, height: 60 },
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
          { "@type": "ListItem", position: 1, name: a.breadcrumbHome, item: `${siteUrl}/${params.lang}` },
          { "@type": "ListItem", position: 2, name: a.breadcrumbAbout, item: `${siteUrl}${langPath}` },
        ],
      },
    ],
  };

  const valueIcons: Record<string, JSX.Element> = {
    target: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
    speed: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    transparency: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    quality: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    partnership: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    innovation: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 21h6M10 17v4M14 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };

  const ptHref = "/sobre";
  const enHref = "/en/about";
  const esHref = "/es/about";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <a href={`/${params.lang}`} className="nav-logo" aria-label="NuPtechs — home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks lang={params.lang} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">
              {d.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <main>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="about-heading">
          <div className="inner max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
                <li><a href={`/${params.lang}`} className="hover:text-[var(--text)] transition-colors">{a.breadcrumbHome}</a></li>
                <li aria-hidden="true">›</li>
                <li className="text-[var(--muted)]">{a.breadcrumbAbout}</li>
              </ol>
            </nav>

            <span className="eyebrow mb-4 block">{a.eyebrow}</span>
            <h1 id="about-heading" className="display-title mb-6 max-w-3xl">{a.heroTitle}</h1>
            <p className="lead mb-12 max-w-2xl">{a.heroLead}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {a.stats.map((s) => (
                <div key={s.label} className="card text-center p-6">
                  <p className="display-title text-[var(--accent)]">{s.value}</p>
                  <p className="text-xs text-[var(--subtle)] mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ──────────────────────────────────────── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="mission-heading">
          <div className="inner max-w-3xl text-center">
            <span className="eyebrow mb-4 block">{a.missionEyebrow}</span>
            <h2 id="mission-heading" className="section-heading mb-6">{a.missionTitle}</h2>
            <p className="lead">{a.missionText}</p>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────── */}
        <section className="page-section" aria-labelledby="values-heading">
          <div className="inner">
            <div className="text-center mb-12">
              <span className="eyebrow mb-4 block">{a.valuesEyebrow}</span>
              <h2 id="values-heading" className="section-heading">{a.valuesTitle}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {a.values.map((v) => (
                <div key={v.title} className="card p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    {valueIcons[v.icon]}
                  </div>
                  <div>
                    <h3 className="card-title mb-2">{v.title}</h3>
                    <p className="text-sm text-[var(--subtle)] leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="timeline-heading">
          <div className="inner max-w-3xl">
            <div className="mb-12">
              <span className="eyebrow mb-4 block">{a.timelineEyebrow}</span>
              <h2 id="timeline-heading" className="section-heading">{a.timelineTitle}</h2>
            </div>
            <ol className="relative border-l border-[var(--border)] pl-8 flex flex-col gap-10">
              {a.timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[2.25rem] top-1 w-4 h-4 rounded-full bg-[var(--accent)] ring-4 ring-[var(--surface)]" aria-hidden="true" />
                  <time className="eyebrow mb-1 block" dateTime={item.year}>{item.year}</time>
                  <h3 className="card-title mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--subtle)] leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── TEAM ─────────────────────────────────────────── */}
        <section className="page-section" aria-labelledby="team-heading">
          <div className="inner max-w-4xl">
            <div className="mb-12">
              <span className="eyebrow mb-4 block">{a.teamEyebrow}</span>
              <h2 id="team-heading" className="section-heading mb-4">{a.teamTitle}</h2>
              <p className="lead max-w-2xl">{a.teamLead}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {a.team.map((member) => (
                <div key={member.name} className="card p-6 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0 text-lg font-bold font-display">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="card-title">{member.name}</h3>
                    <p className="text-xs text-[var(--accent)] mb-2">{member.role}</p>
                    <p className="text-sm text-[var(--subtle)] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METHODOLOGY ──────────────────────────────────── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="method-heading">
          <div className="inner max-w-4xl">
            <div className="mb-12">
              <span className="eyebrow mb-4 block">{a.methodEyebrow}</span>
              <h2 id="method-heading" className="section-heading">{a.methodTitle}</h2>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {a.method.map((step) => (
                <li key={step.num} className="card p-6 flex flex-col gap-3">
                  <span className="text-3xl font-bold font-display text-[var(--accent)] leading-none">{step.num}</span>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="text-sm text-[var(--subtle)] leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── LOCATION ─────────────────────────────────────── */}
        <section className="page-section" aria-labelledby="location-heading">
          <div className="inner max-w-3xl">
            <span className="eyebrow mb-4 block">{a.locationEyebrow}</span>
            <h2 id="location-heading" className="section-heading mb-4">{a.locationTitle}</h2>
            <p className="lead mb-8">{a.locationText}</p>
            <div className="card p-6 flex flex-wrap gap-6">
              <a href="mailto:nuptechs@nuptechs.com" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4l6 5 6-5M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                nuptechs@nuptechs.com
              </a>
              <a href="tel:+5561993691692" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M14 10.5c-1 1-2.5 1.5-4 .5L7.5 8.5l-2-2C4.5 5 5 3.5 6 2.5L4 1 1 4c0 6 5 11 11 11l3-3-1-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                +55 (61) 99369-1692
              </a>
              <a href="https://www.linkedin.com/company/nuptechs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://github.com/nuptechs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="page-section bg-[var(--accent)]/5 border-y border-[var(--accent)]/20" aria-labelledby="cta-about-heading">
          <div className="inner max-w-2xl text-center">
            <h2 id="cta-about-heading" className="section-heading mb-4">{a.ctaTitle}</h2>
            <p className="lead mb-8">{a.ctaSub}</p>
            <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
              {a.ctaButton}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>

      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <a href={`/${params.lang}`} className="nav-logo" aria-label="NuPtechs — home">
              <span className="nav-logo-dot" aria-hidden="true" />
              <span className="nav-logo-text">NuPtechs</span>
            </a>
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs" aria-label="Language">
              <a href={ptHref} className="px-2 py-1 rounded text-[var(--subtle)] hover:text-[var(--text)] transition-colors">PT</a>
              <span className="text-[var(--border)]">·</span>
              <a href={enHref} className={`px-2 py-1 rounded transition-colors ${params.lang === "en" ? "text-[var(--accent)] font-semibold" : "text-[var(--subtle)] hover:text-[var(--text)]"}`}>EN</a>
              <span className="text-[var(--border)]">·</span>
              <a href={esHref} className={`px-2 py-1 rounded transition-colors ${params.lang === "es" ? "text-[var(--accent)] font-semibold" : "text-[var(--subtle)] hover:text-[var(--text)]"}`}>ES</a>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--subtle)]">© {new Date().getFullYear()} NuPtechs. {d.footer.rights}</p>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-xs text-[var(--subtle)]">
              <a href={`/${params.lang}#services`} className="hover:text-[var(--text)] transition-colors">{d.nav.services}</a>
              <a href={`/${params.lang}#products`} className="hover:text-[var(--text)] transition-colors">{d.nav.products}</a>
              <a href={`/${params.lang}#contact`} className="hover:text-[var(--text)] transition-colors">{d.nav.contact}</a>
              <a href="/sobre" className="hover:text-[var(--text)] transition-colors">Sobre (PT)</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
