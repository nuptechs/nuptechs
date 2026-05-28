/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // ── Standalone output for Docker / Railway ────────────
  output: "standalone",

  // ── Compression ───────────────────────────────────────
  compress: true,

  // ── Security & Cache Headers ──────────────────────────
  async headers() {
    return [
      {
        // All routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Static assets — long-lived cache
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Images & fonts in /public
        source: "/(.*\\.(?:ico|png|jpg|jpeg|webp|avif|svg|woff|woff2))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        // Sitemaps & robots — fresh but cacheable
        source: "/(sitemap\\.xml|robots\\.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────
  async redirects() {
    return [
      // Enforce trailing-slash consistency (no trailing slash)
      {
        source: "/sobre/",
        destination: "/sobre",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/blog",
        permanent: true,
      },
      // Legacy/typo protection
      {
        source: "/en/sobre",
        destination: "/en/about",
        permanent: true,
      },
      {
        source: "/es/sobre",
        destination: "/es/about",
        permanent: true,
      },
    ];
  },

  // ── Rewrites ──────────────────────────────────────────
  async rewrites() {
    return [
      // Demos estáticas Vue empacotadas em /public/* — rotas não-listadas,
      // bloqueadas em robots e fora do sitemap.
      { source: "/padaria", destination: "/padaria/index.html" },
      { source: "/padaria/", destination: "/padaria/index.html" },
      { source: "/salao", destination: "/salao/index.html" },
      { source: "/salao/", destination: "/salao/index.html" },
      { source: "/sales", destination: "/sales/index.html" },
      { source: "/sales/", destination: "/sales/index.html" },
      { source: "/igreja", destination: "/igreja/index.html" },
      { source: "/igreja/", destination: "/igreja/index.html" },
      { source: "/salao/dono", destination: "/salao/dono/index.html" },
      { source: "/salao/dono/", destination: "/salao/dono/index.html" },
      // Sistemas completos — 5 SPAs Vue (hash router; modos cliente e dono na mesma SPA)
      { source: "/petshop", destination: "/petshop/index.html" },
      { source: "/petshop/", destination: "/petshop/index.html" },
      { source: "/ferragista", destination: "/ferragista/index.html" },
      { source: "/ferragista/", destination: "/ferragista/index.html" },
      { source: "/acougue", destination: "/acougue/index.html" },
      { source: "/acougue/", destination: "/acougue/index.html" },
      { source: "/mercado", destination: "/mercado/index.html" },
      { source: "/mercado/", destination: "/mercado/index.html" },
      { source: "/distribuidora", destination: "/distribuidora/index.html" },
      { source: "/distribuidora/", destination: "/distribuidora/index.html" },
      // Vitrine comercial — 4 painéis lado a lado
      { source: "/vitrine-segmentos", destination: "/vitrine-segmentos/index.html" },
      { source: "/vitrine-segmentos/", destination: "/vitrine-segmentos/index.html" },
      // Apresentação executiva EasyNuP — HTML estático auto-contido (home + 3 momentos + 5 pilares)
      { source: "/easynup", destination: "/easynup/index.html" },
      { source: "/easynup/", destination: "/easynup/index.html" },
      { source: "/easynup/setup", destination: "/easynup/setup.html" },
      { source: "/easynup/setup/", destination: "/easynup/setup.html" },
      { source: "/easynup/execucao", destination: "/easynup/execucao.html" },
      { source: "/easynup/execucao/", destination: "/easynup/execucao.html" },
      { source: "/easynup/auditoria", destination: "/easynup/auditoria.html" },
      { source: "/easynup/auditoria/", destination: "/easynup/auditoria.html" },
      { source: "/easynup/pilares/:slug", destination: "/easynup/pilares/:slug.html" },
      { source: "/easynup/pilares/:slug/", destination: "/easynup/pilares/:slug.html" },
      // ── easynup2 (revisão dupla-lente comercial+técnico) ────
      { source: "/easynup2", destination: "/easynup2/index.html" },
      { source: "/easynup2/", destination: "/easynup2/index.html" },
      { source: "/easynup2/setup", destination: "/easynup2/setup.html" },
      { source: "/easynup2/setup/", destination: "/easynup2/setup.html" },
      { source: "/easynup2/execucao", destination: "/easynup2/execucao.html" },
      { source: "/easynup2/execucao/", destination: "/easynup2/execucao.html" },
      { source: "/easynup2/auditoria", destination: "/easynup2/auditoria.html" },
      { source: "/easynup2/auditoria/", destination: "/easynup2/auditoria.html" },
      { source: "/easynup2/arquitetura", destination: "/easynup2/arquitetura.html" },
      { source: "/easynup2/arquitetura/", destination: "/easynup2/arquitetura.html" },
      { source: "/easynup2/conformidade", destination: "/easynup2/conformidade.html" },
      { source: "/easynup2/conformidade/", destination: "/easynup2/conformidade.html" },
      { source: "/easynup2/comercial", destination: "/easynup2/comercial.html" },
      { source: "/easynup2/comercial/", destination: "/easynup2/comercial.html" },
      { source: "/easynup2/implantacoes", destination: "/easynup2/implantacoes.html" },
      { source: "/easynup2/implantacoes/", destination: "/easynup2/implantacoes.html" },
      { source: "/easynup2/pilares/:slug", destination: "/easynup2/pilares/:slug.html" },
      { source: "/easynup2/pilares/:slug/", destination: "/easynup2/pilares/:slug.html" },
      // Sistema solar — nup-energy hospedado no Railway próprio.
      // Vitrine atua como proxy externo (URL pública mantida).
      // assets do Vite ficam sob /energy-assets/ pra não colidir com /assets/ da Marketing.
      { source: "/energiasolar", destination: "https://nup-energy-production.up.railway.app" },
      { source: "/energiasolar/:path*", destination: "https://nup-energy-production.up.railway.app/:path*" },
      { source: "/energy-assets/:path*", destination: "https://nup-energy-production.up.railway.app/energy-assets/:path*" },
    ];
  },
};

module.exports = nextConfig;
