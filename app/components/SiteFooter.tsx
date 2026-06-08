"use client";

type Lang = "pt" | "en" | "es";

const footerCopy = {
  pt: {
    tagline: "Software sob medida, automação com IA e produtos prontos para empresas que precisam operar melhor — não apenas parecer modernas.",
    primaryCta: "Solicitar diagnóstico",
    secondaryCta: "WhatsApp",
    proofPoints: ["+70 projetos entregues", "15 produtos em produção", "conformidade Lei 14.133 e LGPD"],
    company: "Empresa",
    services: "Serviços",
    products: "Produtos",
    rights: "Todos os direitos reservados.",
    companyLinks: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contato", href: "/#contato" },
    ],
    serviceLinks: [
      { label: "Automação com IA", href: "/servicos/automacao-inteligente" },
      { label: "Dashboards BI", href: "/servicos/dashboards-bi" },
      { label: "Apps móveis", href: "/servicos/aplicativos-moveis" },
      { label: "Integrações & APIs", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuPIdentify", href: "/produtos/nupidentify" },
      { label: "Sentinel", href: "/produtos/sentinel" },
      { label: "nupai-gateway", href: "/produtos/nupai-gateway" },
    ],
  },
  en: {
    tagline: "Custom software, AI automation, and production-ready products for companies that need real execution — not just polished slides.",
    primaryCta: "Request a diagnosis",
    secondaryCta: "WhatsApp",
    proofPoints: ["70+ projects shipped", "15 live products", "Law 14.133 & LGPD compliant"],
    company: "Company",
    services: "Services",
    products: "Products",
    rights: "All rights reserved.",
    companyLinks: [
      { label: "About", href: "/en/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/en#faq" },
      { label: "Contact", href: "/en#contact" },
    ],
    serviceLinks: [
      { label: "AI Automation", href: "/servicos/automacao-inteligente" },
      { label: "BI Dashboards", href: "/servicos/dashboards-bi" },
      { label: "Mobile Apps", href: "/servicos/aplicativos-moveis" },
      { label: "API Integrations", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuPIdentify", href: "/produtos/nupidentify" },
      { label: "Sentinel", href: "/produtos/sentinel" },
      { label: "nupai-gateway", href: "/produtos/nupai-gateway" },
    ],
  },
  es: {
    tagline: "Software a medida, automatización con IA y productos listos para empresas que necesitan resultados reales — no solo una buena presentación.",
    primaryCta: "Solicitar diagnóstico",
    secondaryCta: "WhatsApp",
    proofPoints: ["70+ proyectos entregados", "15 productos en producción", "conforme a la Ley 14.133 y LGPD"],
    company: "Empresa",
    services: "Servicios",
    products: "Productos",
    rights: "Todos los derechos reservados.",
    companyLinks: [
      { label: "Nosotros", href: "/es/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/es#faq" },
      { label: "Contacto", href: "/es#contact" },
    ],
    serviceLinks: [
      { label: "Automatización con IA", href: "/servicos/automacao-inteligente" },
      { label: "Dashboards BI", href: "/servicos/dashboards-bi" },
      { label: "Apps móviles", href: "/servicos/aplicativos-moveis" },
      { label: "Integraciones API", href: "/servicos/integracoes-api" },
    ],
    productLinks: [
      { label: "EasyNuP", href: "/produtos/easynup" },
      { label: "NuPIdentify", href: "/produtos/nupidentify" },
      { label: "Sentinel", href: "/produtos/sentinel" },
      { label: "nupai-gateway", href: "/produtos/nupai-gateway" },
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
                href="https://wa.me/5561993691692"
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
            <a
              href="https://github.com/nuptechs"
              className="text-[var(--subtle)] hover:text-[var(--text)] transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
