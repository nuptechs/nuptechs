import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers — including /_next/static/ for JS rendering
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/padaria", "/padaria/", "/salao", "/salao/", "/sales", "/sales/", "/igreja", "/igreja/", "/petshop", "/petshop/", "/ferragista", "/ferragista/", "/acougue", "/acougue/", "/mercado", "/mercado/", "/vitrine-segmentos", "/vitrine-segmentos/"]
      },
      {
        // Block AI training crawlers
        userAgent: ["GPTBot", "Google-Extended", "CCBot", "anthropic-ai"],
        disallow: "/"
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
