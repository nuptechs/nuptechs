import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

const services = [
  "automacao-inteligente",
  "dashboards-bi",
  "aplicativos-moveis",
  "integracoes-api",
  "ia-aplicada",
  "seguranca-compliance"
];

const products = [
  "flowops",
  "datapulse",
  "bookflow",
  "chatcore",
  "stocksync",
  "peopledesk"
];

const blogSlugs = [
  "como-automatizar-processos-manuais",
  "llms-no-mundo-corporativo",
  "software-sob-medida-vs-saas"
];

// EN service slugs (mirror of dictionaries.ts)
const servicesEn = [
  "intelligent-automation",
  "bi-dashboards",
  "mobile-apps",
  "api-integrations",
  "applied-ai",
  "security-compliance"
];

// ES service slugs
const servicesEs = [
  "automatizacion-inteligente",
  "dashboards-bi",
  "aplicaciones-moviles",
  "integraciones-api",
  "ia-aplicada",
  "seguridad-compliance"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    // ── Home (PT) ──────────────────────────────────────
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          "en-US": `${siteUrl}/en`,
          "es-419": `${siteUrl}/es`
        }
      }
    },
    // ── Home EN ────────────────────────────────────────
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          "en-US": `${siteUrl}/en`,
          "es-419": `${siteUrl}/es`
        }
      }
    },
    // ── Home ES ────────────────────────────────────────
    {
      url: `${siteUrl}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          "en-US": `${siteUrl}/en`,
          "es-419": `${siteUrl}/es`
        }
      }
    },
    // ── Listagens PT ──────────────────────────────────
    {
      url: `${siteUrl}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/sobre`,
          "en-US": `${siteUrl}/en`,
          "es-419": `${siteUrl}/es`,
        },
      },
    },
    {
      url: `${siteUrl}/servicos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/produtos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    // ── Serviços EN ────────────────────────────────────
    {
      url: `${siteUrl}/en/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85
    },
    // ── Serviços ES ────────────────────────────────────
    {
      url: `${siteUrl}/es/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85
    },
    // ── Páginas de serviço PT ─────────────────────────
    ...services.map((slug) => ({
      url: `${siteUrl}/servicos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    // ── Páginas de serviço EN ─────────────────────────
    ...servicesEn.map((slug) => ({
      url: `${siteUrl}/en/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    // ── Páginas de serviço ES ─────────────────────────
    ...servicesEs.map((slug) => ({
      url: `${siteUrl}/es/servicios/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    // ── Páginas de produto PT ─────────────────────────
    ...products.map((slug) => ({
      url: `${siteUrl}/produtos/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    // ── Artigos do blog ───────────────────────────────
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.75
    })),
    // ── Âncoras da home ───────────────────────────────
    {
      url: `${siteUrl}/#contato`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }
  ];
}
