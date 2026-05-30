import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";
import SiteFooter from "../../components/SiteFooter";
import { products, type Product, type ProductCategory, type ProductStatus } from "../../data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

const productBySlug: Record<string, Product> = Object.fromEntries(products.map((p) => [p.slug, p]));

/* Inline icon map for category badge + features. */
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
    scan: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 7V4h3M17 7V4h-3M3 13v3h3M17 13v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    key: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9.5 11l7-7M14 6.5l1.5 1.5M12 8.5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5l6 2v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8v-5l6-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    network: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="4" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5.5 7.5l3.5 6M14.5 7.5l-3.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.bolt}</>;
};

const statusLabel: Record<ProductStatus, string> = {
  live: "Em produção",
  beta: "Beta",
  alpha: "Alpha",
};

const categoryLabel: Record<ProductCategory, string> = {
  platform: "Plataforma",
  vertical: "Vertical",
  devtools: "Ferramenta Dev",
  ai: "IA & Dados",
  data: "Dados & Planilhas",
  productivity: "Produtividade",
};

type ProductParams = { params: { slug: string } };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductParams): Promise<Metadata> {
  const product = productBySlug[params.slug];
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} — ${product.text.pt.tagline}`,
    description: product.text.pt.description,
    keywords: product.pageContent.keywords,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.text.pt.tagline} | NuPtechs`,
      description: product.text.pt.description,
      url: `${siteUrl}/produtos/${product.slug}`,
      siteName: "NuPtechs",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(product.name + " — " + product.text.pt.tagline + " | NuPtechs")}&sub=${encodeURIComponent(product.text.pt.description)}&lang=pt`,
          width: 1200,
          height: 630,
          alt: `${product.name} — ${product.text.pt.tagline} | NuPtechs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@nuptechs",
      title: `${product.name} — ${product.text.pt.tagline} | NuPtechs`,
      description: product.text.pt.description,
      images: [`${siteUrl}/og?title=${encodeURIComponent(product.name + " — " + product.text.pt.tagline + " | NuPtechs")}&sub=${encodeURIComponent(product.text.pt.description)}&lang=pt`],
    },
  };
}

export default function ProductPage({ params }: ProductParams) {
  const product = productBySlug[params.slug];
  if (!product) notFound();

  const statusColor =
    product.status === "live"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
      : product.status === "beta"
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
        applicationSubCategory: product.text.pt.tagline,
        operatingSystem: "Web, iOS, Android",
        description: product.text.pt.description,
        url: `${siteUrl}/produtos/${product.slug}`,
        keywords: product.pageContent.keywords.join(", "),
        featureList: product.pageContent.features.map((f) => f.title).join(", "),
        offers: {
          "@type": "Offer",
          description: "Contrate pelo modelo SaaS, on-premise ou personalize com marca branca. Solicite proposta.",
          availability:
            product.status === "alpha"
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
                <FeatureIcon id="bolt" />
              </div>
              <div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor}`}>{statusLabel[product.status]}</span>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">{categoryLabel[product.category]} · {product.text.pt.tagline}</p>
              </div>
            </div>
            <h1 id="product-heading" className="display-title mb-6">{product.pageContent.headline}</h1>
            <p className="lead mb-8">{product.text.pt.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                {product.status === "alpha" ? "Entrar na lista de espera" : "Solicitar demonstração"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/produtos" className="btn btn-secondary">Ver todos os produtos</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="features-heading">
        <div className="inner">
          <h2 id="features-heading" className="section-heading mb-12">Funcionalidades principais</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {product.pageContent.features.map((f) => (
              <div key={f.title} className="card card-sm">
                <div className="card-icon" aria-hidden="true"><FeatureIcon id={f.iconId} /></div>
                <h3 className="card-title">{f.title}</h3>
                <p className="card-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — quantidades reais que aparecem no showcase */}
      <section className="page-section" aria-labelledby="stats-heading">
        <div className="inner">
          <h2 id="stats-heading" className="section-heading mb-12">Números do produto</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.text.pt.stats.map((s) => (
              <div key={s.label} className="card card-sm text-center">
                <div className="text-3xl font-bold text-[var(--accent)] mb-2">{s.value}</div>
                <div className="text-sm text-[var(--muted)]">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {product.tech.map((t) => (
              <span key={t} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="page-section bg-[var(--surface)]" aria-labelledby="usecases-heading">
        <div className="inner grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow mb-4 block">Ideal para</span>
            <h2 id="usecases-heading" className="section-heading mb-6">Quem usa o {product.name}</h2>
            <p className="lead">Desenvolvido a partir de dezenas de projetos reais. Pronto para implantar, configurar e escalar.</p>
          </div>
          <ul className="flex flex-col gap-3">
            {product.pageContent.useCases.map((uc, i) => (
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
            {product.status === "alpha" ? "Garanta acesso antecipado." : "Pronto para experimentar?"}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/75">
            {product.status === "alpha"
              ? "Entre na lista de espera e seja notificado primeiro quando o produto estiver disponível."
              : "Agende uma demo de 30 minutos e veja o produto funcionando com dados reais do seu negócio."}
          </p>
          <a href="mailto:nuptechs@nuptechs.com" className="inline-flex items-center gap-2 rounded-[0.875rem] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[var(--accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            {product.status === "alpha" ? "Entrar na lista de espera" : "Agendar demonstração"}
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
