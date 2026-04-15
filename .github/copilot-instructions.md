# NupTechs — AI Agent Guidelines

## Overview

NupTechs corporate website and blog platform. Next.js 14 App Router with static generation, SEO-optimized content, AI-assisted scheduling, and bilingual support (pt-BR / en-US).

## Tech Stack (Firmly Decided)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript + React 18.3 |
| Styling | TailwindCSS 4 |
| AI | OpenAI (@ai-sdk/openai) |
| Vector Search | Pinecone |
| Email | Resend |
| Validation | Zod |
| Deploy | Vercel / Static export |

## Project Structure

```
app/
  [lang]/               ← i18n routes (pt-BR, en-US)
  blog/                 ← Blog posts with mind maps, flashcards
  servicos/             ← Services pages
  produtos/             ← Products pages
  sobre/                ← About page
  api/
    blog/               ← Blog API routes
    contact/            ← Contact form endpoint
    schedule/           ← Scheduling endpoint
  components/           ← Shared UI (ThemeToggle, NavLinks, ParticleField, etc.)
next.config.js          ← Security headers (CSP, HSTS, X-Frame-Options), compression
```

## SEO Implementation

Fully implemented:
- Title templates, meta descriptions, keywords per page
- Canonical URLs, robots.txt, sitemap.xml
- JSON-LD structured data (WebSite, BreadcrumbList, Article, Blog)
- Open Graph + Twitter Cards
- GA4 integration via `@next/third-parties`
- hreflang pt-BR / en-US alternates
- Static generation with `generateStaticParams`

See `SEO-PLANO.md` for strategy details and `BLOG-PLANO.md` for content expansion plan.

## Blog Platform

- 6 pillar posts with interactive mind maps (SVG), mnemonic flashcards, key takeaways
- 5 content tags: Automação, IA Aplicada, BI, Dev Ágil, Integrações
- ArticleShell layout component, MnemonicCards component
- Cross-reference network via `relatedSlugs`

## Build & Test

```bash
npm run dev          # next dev
npm run build        # next build (SSG)
npm start            # next start
npm run lint         # ESLint
```

## Key Conventions

- All pages use static generation (no server-side rendering)
- Security headers configured in `next.config.js` (Helmet-equivalent)
- No database — content is co-located in source
- Blog posts define structured data inline
