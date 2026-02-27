import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    // ── Home ─────────────────────────────────────────
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { "pt-BR": siteUrl, "en-US": `${siteUrl}/en` } }
    },
    // ── Listagens ────────────────────────────────────
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
    // ── Páginas de serviço ────────────────────────────
    ...services.map((slug) => ({
      url: `${siteUrl}/servicos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    // ── Páginas de produto ────────────────────────────
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
    // ── Âncoras da home (para busca) ──────────────────
    {
      url: `${siteUrl}/#contato`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }
  ];
}

