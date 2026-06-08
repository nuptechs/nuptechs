import type { Metadata } from "next";
import NavLinks from "../components/NavLinks";
import ThemeToggle from "../components/ThemeToggle";
import SiteFooter from "../components/SiteFooter";
import { DimensionalWrapper } from "../components/DimensionalDepth";
import CodeGenesis from "../components/CodeGenesis";
import { products, type ProductCategory, type ProductStatus } from "../data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const metadata: Metadata = {
  title: "Produtos — 13 produtos próprios em produção",
  description:
    "EasyNuP, NuPIdentify, NuP-Sentinel, NuP-School, NuP-Sales, nupai-gateway e mais — 13 produtos próprios desenvolvidos pela NuPtechs, em produção.",
  keywords: [
    "produtos NuPtechs",
    "EasyNuP gestão contratos",
    "NuPIdentify IAM",
    "NuP-Sentinel QA IA",
    "NuP-School gestão escolar",
    "NuP-Sales e-commerce",
    "nupai-gateway AI gateway",
    "suite SaaS empresarial",
  ],
  alternates: {
    canonical: "/produtos",
    languages: {
      "pt-BR": `${siteUrl}/produtos`,
      "x-default": `${siteUrl}/produtos`,
    },
  },
  openGraph: {
    title: "Produtos NuPtechs — 13 produtos em produção",
    description:
      "Plataformas, verticais, devtools e IA — 13 produtos próprios já em produção.",
    url: `${siteUrl}/produtos`,
    siteName: "NuPtechs",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: `${siteUrl}/og?title=Produtos+NuPtechs+%E2%80%94+13+em+produ%C3%A7%C3%A3o&sub=EasyNuP%2C+NuPIdentify%2C+Sentinel+e+mais&lang=pt`,
        width: 1200,
        height: 630,
        alt: "Produtos NuPtechs — 13 produtos em produção",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nuptechs",
    title: "Produtos NuPtechs — 13 produtos em produção",
    description:
      "EasyNuP, NuPIdentify, Sentinel, Manifest, NuP-Chunks e mais — 13 produtos em produção. Veja a lista completa.",
    images: [`${siteUrl}/og?title=Produtos+NuPtechs+%E2%80%94+13+em+produ%C3%A7%C3%A3o&sub=EasyNuP%2C+NuPIdentify%2C+Sentinel+e+mais&lang=pt`],
  },
};

const CategoryIcon = ({ category }: { category: ProductCategory }) => {
  const icons: Record<ProductCategory, React.ReactNode> = {
    platform: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h16M8 9v9M14 9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    vertical: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 19c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 16a4 4 0 00-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    devtools: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M7 17l-4-4 4-4M15 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 4l-3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    ai: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="13" r="1.2" fill="currentColor"/>
        <circle cx="13.5" cy="13" r="1.2" fill="currentColor"/>
        <path d="M8.5 16.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 8V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="4" r="1.2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    data: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h16M3 13h16M8 3v16M14 3v16" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    productivity: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15.5 12v7M12 15.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[category]}</>;
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

export default function ProdutosIndex() {
  return (
    <>
      <CodeGenesis />
      <nav className="nav-bar" aria-label="Navegação principal">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="NuPtechs — início">
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">NuPtechs</span>
          </a>
          <NavLinks />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="mailto:nuptechs@nuptechs.com" className="nav-cta hidden lg:inline-flex">Falar com especialista</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="page-section pt-[calc(64px+5rem)]" aria-labelledby="products-heading">
          <div className="inner">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li><a href="/">Início</a></li>
                <li aria-hidden="true" className="breadcrumb__sep">›</li>
                <li className="breadcrumb__current">Produtos</li>
              </ol>
            </nav>
            <div className="mb-10 max-w-3xl">
              <span className="eyebrow mb-4 block" data-genesis="default">Suite de produtos</span>
              <h1 id="products-heading" className="display-title mb-5 max-w-5xl">
                13 produtos próprios.<br />Em produção, hoje.
              </h1>
              <p className="lead">
                Plataformas, verticais, devtools e IA — software construído a partir de dezenas de projetos reais. EasyNuP é voltado ao setor público; NuPIdentify, Sentinel e nupai-gateway são fundação dos demais. Cada um aqui é código vivo em <span className="text-[var(--text)] font-medium">main</span>.
              </p>
            </div>

            {/* Grid de produtos */}
            <DimensionalWrapper>
            <div className="products-grid">
              {products.map((p, idx) => {
                const statusCls =
                  p.status === "live"
                    ? "status-badge status-badge--green"
                    : p.status === "beta"
                    ? "status-badge status-badge--amber"
                    : "status-badge status-badge--muted";

                return (
                  <a
                    key={p.slug}
                    href={`/produtos/${p.slug}`}
                    className="product-listing-card"
                    aria-label={`${p.name} — ${p.text.pt.tagline}`}
                    data-depth={String(1 + (idx % 3))}
                  >
                    <div className="product-listing-card__top">
                      <div className="product-listing-card__icon">
                        <CategoryIcon category={p.category} />
                      </div>
                      <span className={statusCls}>{statusLabel[p.status]}</span>
                    </div>

                    <div className="product-listing-card__body">
                      <p className="product-listing-card__category">{categoryLabel[p.category]}</p>
                      <h2 className="product-listing-card__name">{p.name}</h2>
                      <p className="product-listing-card__tagline">{p.text.pt.tagline}</p>
                    </div>

                    <div className="product-listing-card__footer">
                      <span className="product-listing-card__cta">
                        Ver detalhes
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
            </DimensionalWrapper>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section" aria-label="Chamada para ação">
          <div className="inner">
            <div className="cta-band">
              <div>
                <h2 className="cta-band__title">Precisa de algo sob medida?</h2>
                <p className="cta-band__sub">Construímos do zero o que os nossos produtos não cobrem — com o mesmo padrão de qualidade.</p>
              </div>
              <a href="/servicos" className="btn btn-primary flex-shrink-0">
                Ver serviços
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
