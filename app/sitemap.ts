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
  "software-sob-medida-vs-saas",
  "dashboard-bi-para-pmes",
  "como-escolher-stack-tecnologica",
  "integracao-api-whatsapp-business"
];

const servicesEn = [
  "intelligent-automation",
  "bi-dashboards",
  "mobile-apps",
  "api-integrations",
  "applied-ai",
  "security-compliance"
];

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
    // ── Home PT ────────────────────────────────────────
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
    // ── Sobre PT ───────────────────────────────────────
    {
      url: `${siteUrl}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/sobre`,
          "en-US": `${siteUrl}/en/about`,
          "es-419": `${siteUrl}/es/about`
        }
      }
    },
    // ── About EN ──────────────────────────────────────
    {
      url: `${siteUrl}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/sobre`,
          "en-US": `${siteUrl}/en/about`,
          "es-419": `${siteUrl}/es/about`
        }
      }
    },
    // ── About ES ──────────────────────────────────────
    {
      url: `${siteUrl}/es/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/sobre`,
          "en-US": `${siteUrl}/en/about`,
          "es-419": `${siteUrl}/es/about`
        }
      }
    },
    // ── Listagens PT ──────────────────────────────────
    {
      url: `${siteUrl}/servicos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos`,
          "en-US": `${siteUrl}/en/services`,
          "es-419": `${siteUrl}/es/servicios`
        }
      }
    },
    {
      url: `${siteUrl}/produtos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/produtos`,
          "x-default": `${siteUrl}/produtos`
        }
      }
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/blog`,
          "x-default": `${siteUrl}/blog`
        }
      }
    },
    // ── Serviços EN ────────────────────────────────────
    {
      url: `${siteUrl}/en/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos`,
          "en-US": `${siteUrl}/en/services`,
          "es-419": `${siteUrl}/es/servicios`
        }
      }
    },
    // ── Serviços ES ────────────────────────────────────
    {
      url: `${siteUrl}/es/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos`,
          "en-US": `${siteUrl}/en/services`,
          "es-419": `${siteUrl}/es/servicios`
        }
      }
    },
    // ── Páginas de serviço PT ─────────────────────────
    ...services.map((slug, i) => ({
      url: `${siteUrl}/servicos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos/${slug}`,
          "en-US": `${siteUrl}/en/services/${servicesEn[i]}`,
          "es-419": `${siteUrl}/es/servicios/${servicesEs[i]}`
        }
      }
    })),
    // ── Páginas de serviço EN ─────────────────────────
    ...servicesEn.map((slug, i) => ({
      url: `${siteUrl}/en/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos/${services[i]}`,
          "en-US": `${siteUrl}/en/services/${slug}`,
          "es-419": `${siteUrl}/es/servicios/${servicesEs[i]}`
        }
      }
    })),
    // ── Páginas de serviço ES ─────────────────────────
    ...servicesEs.map((slug, i) => ({
      url: `${siteUrl}/es/servicios/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/servicos/${services[i]}`,
          "en-US": `${siteUrl}/en/services/${servicesEn[i]}`,
          "es-419": `${siteUrl}/es/servicios/${slug}`
        }
      }
    })),
    // ── Páginas de produto PT ─────────────────────────
    ...products.map((slug) => ({
      url: `${siteUrl}/produtos/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/produtos/${slug}`,
          "x-default": `${siteUrl}/produtos/${slug}`
        }
      }
    })),
    // ── Artigos do blog ───────────────────────────────
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.75
    }))
  ];
}
