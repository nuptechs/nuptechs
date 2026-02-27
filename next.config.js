/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

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
          { key: "X-Frame-Options",           value: "DENY" },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
              "frame-ancestors 'none'",
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
};

module.exports = nextConfig;
