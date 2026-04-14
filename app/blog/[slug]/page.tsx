import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavLinks from "../../components/NavLinks";
import ThemeToggle from "../../components/ThemeToggle";
import ArticleShell from "../../components/ArticleShell";
import SiteFooter from "../../components/SiteFooter";
import { allPosts } from "../posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

/* ═══════════════════════════════════════════════════════════
   POST DATA — CRUD-ready structure
   Each post is self-contained with rich metadata, structured
   sections, callouts, key takeaways, and a mind map.
   In the future, swap this object for a CMS/DB fetch.
   ═══════════════════════════════════════════════════════════ */

export interface PostSection {
  id: string;
  heading: string;
  content: string; // HTML
  depth?: 0 | 1 | 2 | 3;
  parentId?: string;
}

export interface Callout {
  type: "tip" | "warning" | "insight" | "example";
  title: string;
  body: string;
  afterSectionId?: string;
  depth?: 0 | 1 | 2 | 3;
}

export interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

export interface Post {
  slug: string;
  tag: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;
  readTimeByDepth?: Record<number, string>;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string };
  executiveSummary?: string;
  snapshot?: { label: string; value: string }[];
  keyTakeaways: string[];
  sections: PostSection[];
  callouts: Callout[];
  mindMap: MindMapNode;
  mnemonic?: { acronym: string; breakdown: { letter: string; word: string; hint: string }[] };
  maxDepth?: 1 | 2 | 3;
  relatedSlugs: string[];
}

export const posts: Record<string, Post> = allPosts;



/* ═══════════════════════════════════════════════════════════
   STATIC PARAMS & METADATA
   ═══════════════════════════════════════════════════════════ */

type BlogParams = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: `${post.title} — NuPtechs Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}`, languages: { "pt-BR": `${siteUrl}/blog/${post.slug}` } },
    openGraph: {
      title: `${post.title} — NuPtechs Blog`,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteUrl],
      tags: post.keywords,
      siteName: "NuPtechs",
      locale: "pt_BR",
      images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}&lang=pt`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@nuptechs",
      title: post.title,
      description: post.description,
      images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description)}&lang=pt`, alt: post.title }],
    },
  };
}

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function BlogPost({ params }: BlogParams) {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) notFound();
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  const wordCount = post.sections.reduce((sum, s) => sum + s.content.replace(/<[^>]+>/g, "").split(/\s+/).length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        wordCount,
        keywords: post.keywords.join(", "),
        articleSection: post.tag,
        inLanguage: "pt-BR",
        author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "NuPtechs" },
        publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "NuPtechs", logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg`, width: 200, height: 60 } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
        isPartOf: { "@type": "Blog", "@id": `${siteUrl}/blog#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  const related = post.relatedSlugs
    .map((s) => posts[s])
    .filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
        <ArticleShell post={post} related={related} canonicalUrl={canonicalUrl} />
      </main>

      <SiteFooter />
    </>
  );
}
