import type { Metadata } from "next";
import { posts } from "./[slug]/page";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const metadata: Metadata = {
  title: "Blog — Desenvolvimento de Software, IA e Automação",
  description:
    "Artigos técnicos sobre automação inteligente, IA aplicada ao negócio, desenvolvimento ágil e gestão de software — escritos por quem constrói sistemas reais.",
  keywords: [
    "blog desenvolvimento software",
    "artigos IA empresarial",
    "blog automação empresarial",
    "como automatizar processos",
    "business intelligence PME",
    "stack tecnológica software",
    "API WhatsApp Business",
    "NuPtechs blog",
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
    languages: { "pt-BR": `${siteUrl}/blog` },
  },
  openGraph: {
    title: "Blog NuPtechs — Desenvolvimento de Software, IA e Automação",
    description:
      "Artigos técnicos sobre automação, BI, IA e desenvolvimento ágil — escritos por quem constrói sistemas reais.",
    url: `${siteUrl}/blog`,
    type: "website",
    siteName: "NuPtechs",
    locale: "pt_BR",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "NuPtechs Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog NuPtechs — Desenvolvimento de Software, IA e Automação",
    description: "Artigos técnicos sobre automação, BI, IA e desenvolvimento ágil.",
    images: [`${siteUrl}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${siteUrl}/blog#blog`,
      url: `${siteUrl}/blog`,
      name: "NuPtechs Blog",
      description:
        "Artigos técnicos sobre automação, IA aplicada, desenvolvimento de software e gestão de tecnologia.",
      inLanguage: "pt-BR",
      publisher: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "NuPtechs",
      },
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      ],
    },
  ],
};

// Tag color mapping for visual variety
const tagColors: Record<string, string> = {
  "Automação":           "badge-accent",
  "IA Aplicada":         "badge-accent",
  "Desenvolvimento Ágil":"badge-accent",
  "Business Intelligence":"badge-accent",
  "Integrações":         "badge-accent",
};

export default function BlogIndex() {
  const postList = Object.values(posts).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Group by tag for the tag filter display
  const allTags = [...new Set(postList.map((p) => p.tag))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="blog-heading">
          <div className="inner">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--subtle)]">
                <li><a href="/" className="hover:text-[var(--text)] transition-colors">Início</a></li>
                <li aria-hidden="true">›</li>
                <li className="text-[var(--muted)]">Blog</li>
              </ol>
            </nav>

            <div className="mb-10 max-w-xl">
              <span className="eyebrow mb-4 block">Blog &amp; Conteúdo</span>
              <h1 id="blog-heading" className="display-title mb-4">
                Conteúdo técnico para<br />decisões melhores.
              </h1>
              <p className="lead">
                Artigos sobre desenvolvimento ágil, IA aplicada e gestão de software —
                escritos por quem constrói sistemas reais.
              </p>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-2 mb-10" role="list" aria-label="Categorias">
              {allTags.map((tag) => (
                <span key={tag} role="listitem" className="badge badge-accent text-xs px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* Article grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postList.map((post, index) => (
                <article
                  key={post.slug}
                  className={`card group flex flex-col gap-4 relative${index === 0 ? " sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`badge ${tagColors[post.tag] ?? "badge-accent"} self-start text-xs`}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-[var(--subtle)]">{post.readTime} leitura</span>
                  </div>

                  <h2 className="text-base font-bold leading-snug tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors flex-1">
                    <a
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {post.title}
                    </a>
                  </h2>

                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 mt-auto">
                    <time dateTime={post.publishedAt} className="text-xs text-[var(--subtle)]">
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-xs font-medium text-[var(--accent)] flex items-center gap-1">
                      Ler artigo
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter / CTA ────────────────────────────── */}
        <section className="page-section bg-[var(--surface)]" aria-labelledby="blog-cta-heading">
          <div className="inner max-w-2xl text-center">
            <h2 id="blog-cta-heading" className="section-heading mb-4">
              Precisa resolver um problema real?
            </h2>
            <p className="lead mb-8">
              Nosso time analisa seu processo atual e devolve um plano técnico concreto em até 24h —
              sem compromisso.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                Solicitar diagnóstico grátis
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/servicos" className="btn btn-secondary">Ver serviços</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="inner flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <a href="/" className="nav-logo" aria-label="NuPtechs — voltar ao início">
              <span className="nav-logo-dot" aria-hidden="true" />
              <span className="nav-logo-text">NuPtechs</span>
            </a>
            <nav aria-label="Links do rodapé" className="flex flex-wrap gap-4 text-xs text-[var(--subtle)]">
              <a href="/servicos"   className="hover:text-[var(--text)] transition-colors">Serviços</a>
              <a href="/produtos"   className="hover:text-[var(--text)] transition-colors">Produtos</a>
              <a href="/sobre"      className="hover:text-[var(--text)] transition-colors">Sobre</a>
              <a href="/#contato"   className="hover:text-[var(--text)] transition-colors">Contato</a>
            </nav>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <p className="text-xs text-[var(--subtle)]">
              © {new Date().getFullYear()} NuPtechs. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
