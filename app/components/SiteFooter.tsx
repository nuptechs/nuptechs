"use client";

type Lang = "pt" | "en" | "es";

const footerCopy = {
  pt: {
    tagline: "Software sob medida, automação com IA e produtos prontos para empresas que precisam operar melhor — não apenas parecer modernas.",
    primaryCta: "Solicitar diagnóstico",
    secondaryCta: "WhatsApp",
    proofPoints: ["+70 projetos entregues", "15 produtos em produção", "Consultoria Oficial em Arquitetura TOGAF"],
    company: "Empresa",
    services: "Serviços",
    products: "Produtos",
    rights: "Todos os direitos reservados.",
    companyLinks: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contato", href: "/#contato" },
      { label: "Privacidade", href: "/privacidade" },
    ],
    serviceLinks: [
      { label: "Automação com IA", href: "/servicos/automacao-inteligente" },
      { label: "Dashboards BI", href: "/servicos/dashboards-bi" },
      { label: "Apps móveis", href: "/servicos/aplicativos-moveis" },
      { label: "Integrações & APIs", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuP-Identify", href: "/produtos/nupidentify" },
      { label: "NuP-Sentinel", href: "/produtos/sentinel" },
      { label: "NuP-Gateway", href: "/produtos/nupai-gateway" },
    ],
  },
  en: {
    tagline: "Custom software, AI automation, and production-ready products for companies that need real execution — not just polished slides.",
    primaryCta: "Request a diagnosis",
    secondaryCta: "WhatsApp",
    proofPoints: ["70+ projects shipped", "15 live products", "Official TOGAF architecture consulting"],
    company: "Company",
    services: "Services",
    products: "Products",
    rights: "All rights reserved.",
    companyLinks: [
      { label: "About", href: "/en/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/en#faq" },
      { label: "Contact", href: "/en#contact" },
      { label: "Privacy", href: "/privacidade" },
    ],
    serviceLinks: [
      { label: "AI Automation", href: "/servicos/automacao-inteligente" },
      { label: "BI Dashboards", href: "/servicos/dashboards-bi" },
      { label: "Mobile Apps", href: "/servicos/aplicativos-moveis" },
      { label: "API Integrations", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuP-Identify", href: "/produtos/nupidentify" },
      { label: "NuP-Sentinel", href: "/produtos/sentinel" },
      { label: "NuP-Gateway", href: "/produtos/nupai-gateway" },
    ],
  },
  es: {
    tagline: "Software a medida, automatización con IA y productos listos para empresas que necesitan resultados reales — no solo una buena presentación.",
    primaryCta: "Solicitar diagnóstico",
    secondaryCta: "WhatsApp",
    proofPoints: ["70+ proyectos entregados", "15 productos en producción", "Consultoría Oficial en Arquitectura TOGAF"],
    company: "Empresa",
    services: "Servicios",
    products: "Productos",
    rights: "Todos los derechos reservados.",
    companyLinks: [
      { label: "Nosotros", href: "/es/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/es#faq" },
      { label: "Contacto", href: "/es#contact" },
      { label: "Privacidad", href: "/privacidade" },
    ],
    serviceLinks: [
      { label: "Automatización con IA", href: "/servicos/automacao-inteligente" },
      { label: "Dashboards BI", href: "/servicos/dashboards-bi" },
      { label: "Apps móviles", href: "/servicos/aplicativos-moveis" },
      { label: "Integraciones API", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuP-Identify", href: "/produtos/nupidentify" },
      { label: "NuP-Sentinel", href: "/produtos/sentinel" },
      { label: "NuP-Gateway", href: "/produtos/nupai-gateway" },
    ],
  },
} as const;

export default function SiteFooter({ lang = "pt" }: { lang?: Lang }) {
  const year = new Date().getFullYear();
  const t = footerCopy[lang] ?? footerCopy.pt;
  const homeHref = lang === "pt" ? "/" : `/${lang}`;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={homeHref} className="nav-logo" aria-label="NuPtechs — voltar ao topo">
              <span className="nav-logo-dot" aria-hidden="true" />
              <span className="nav-logo-text">NuPtechs</span>
            </a>
            <p>{t.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {t.proofPoints.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-1.5 text-[0.72rem] font-semibold text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="mailto:nuptechs@nuptechs.com" className="btn btn-primary">
                {t.primaryCta}
              </a>
              <a
                href="https://wa.me/556285507649"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t.company}</h4>
            {t.companyLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>

          <div className="footer-col">
            <h4>{t.services}</h4>
            {t.serviceLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>

          <div className="footer-col">
            <h4>{t.products}</h4>
            {t.productLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2022&ndash;{year} NuPtechs. {t.rights}</p>
          <div className="flex items-center gap-4">
            {lang !== "pt" && (
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <a href="/" className="hover:text-[var(--text)] transition-colors">PT</a>
                <span>·</span>
                <a href="/en" className={`hover:text-[var(--text)] transition-colors ${lang === "en" ? "text-[var(--accent)] font-semibold" : ""}`}>EN</a>
                <span>·</span>
                <a href="/es" className={`hover:text-[var(--text)] transition-colors ${lang === "es" ? "text-[var(--accent)] font-semibold" : ""}`}>ES</a>
              </div>
            )}
            <a
              href="https://www.linkedin.com/company/nuptechs"
              className="text-[var(--subtle)] hover:text-[var(--text)] transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
