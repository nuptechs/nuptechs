"use client";

import { useEffect, useRef, useState } from "react";
import type { Post, Callout } from "../blog/[slug]/page";
import InteractiveMindMap from "./InteractiveMindMap";
import MnemonicCards from "./MnemonicCards";

/* ═══════════════════════════════════════════════════════════
   ArticleShell — Premium interactive article layout
   Features:
   • Reading progress bar
   • Sticky TOC sidebar (desktop)
   • Collapsible mobile TOC
   • Key Takeaways box
   • Rich callout blocks (tip, warning, insight, example)
   • Visual mind map summary
   • Mnemonic memory aid
   • Related posts section
   ═══════════════════════════════════════════════════════════ */

/* ── Callout icons ────────────────────────────────────────── */
const calloutConfig: Record<Callout["type"], { icon: string; label: string; className: string }> = {
  tip:     { icon: "💡", label: "Dica",     className: "callout--tip"     },
  warning: { icon: "⚠️", label: "Atenção",  className: "callout--warning" },
  insight: { icon: "📊", label: "Insight",  className: "callout--insight" },
  example: { icon: "🔍", label: "Exemplo",  className: "callout--example" },
};

/* ── Main Component ───────────────────────────────────────── */
export default function ArticleShell({ post, related }: { post: Post; related: Post[] }) {
  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);

  /* Reading progress */
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - viewportH;
      setProgress(total > 0 ? Math.min(1, scrolled / total) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active section observer */
  useEffect(() => {
    const targets = post.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [post.sections]);

  return (
    <>
      {/* ── Progress bar ──────────────────────────────────── */}
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* ── Article header ────────────────────────────────── */}
      <header className="article-header">
        <div className="inner">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><a href="/">Início</a></li>
              <li aria-hidden="true" className="breadcrumb__sep">›</li>
              <li><a href="/blog">Blog</a></li>
              <li aria-hidden="true" className="breadcrumb__sep">›</li>
              <li className="breadcrumb__current">{post.title.length > 50 ? post.title.slice(0, 50) + "…" : post.title}</li>
            </ol>
          </nav>

          <div className="article-header__meta">
            <span className="badge badge-accent">{post.tag}</span>
            <span className="article-meta-dot">·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span className="article-meta-dot">·</span>
            <span>{post.readTime} leitura</span>
          </div>

          <h1 className="article-header__title">{post.title}</h1>
          <p className="article-header__desc">{post.description}</p>

          <div className="article-header__author">
            <div className="article-header__avatar" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
            <div>
              <p className="article-header__author-name">{post.author.name}</p>
              <p className="article-header__author-role">{post.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content layout: sidebar TOC + article ─────────── */}
      <div className="article-layout inner">
        {/* Sidebar TOC — desktop */}
        <aside className="article-toc" aria-label="Índice do artigo">
          <div className="article-toc__sticky">
            <p className="article-toc__title">Neste artigo</p>
            <ul className="article-toc__list">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`article-toc__link${activeSectionId === s.id ? " article-toc__link--active" : ""}`}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
            <div className="article-toc__progress-label">
              {Math.round(progress * 100)}% lido
            </div>
          </div>
        </aside>

        {/* Mobile TOC toggle */}
        <div className="article-toc-mobile">
          <button
            className="article-toc-mobile__toggle"
            onClick={() => setTocOpen(!tocOpen)}
            aria-expanded={tocOpen}
            aria-controls="mobile-toc"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Índice do artigo
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}>
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {tocOpen && (
            <ul id="mobile-toc" className="article-toc-mobile__list">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="article-toc-mobile__link" onClick={() => setTocOpen(false)}>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Article content */}
        <article ref={articleRef} className="article-content prose-nuptechs">
          {/* Key Takeaways */}
          <div className="key-takeaways">
            <div className="key-takeaways__header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Principais pontos</span>
            </div>
            <ul className="key-takeaways__list">
              {post.keyTakeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Sections with interspersed callouts */}
          {post.sections.map((section, sIdx) => {
            const calloutsAfter = post.callouts.filter((_, i) => {
              const interval = Math.ceil(post.callouts.length / post.sections.length);
              return Math.floor(i / interval) === sIdx && i % interval === 0;
            });

            return (
              <div key={section.id}>
                <section id={section.id} className="article-section">
                  <h2>{section.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </section>

                {/* Callout after this section (distribute evenly) */}
                {sIdx < post.callouts.length && post.callouts[sIdx] && (
                  <div className={`callout ${calloutConfig[post.callouts[sIdx].type].className}`}>
                    <div className="callout__header">
                      <span className="callout__icon" aria-hidden="true">{calloutConfig[post.callouts[sIdx].type].icon}</span>
                      <span className="callout__title">{post.callouts[sIdx].title}</span>
                    </div>
                    <p className="callout__body">{post.callouts[sIdx].body}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Remaining callouts not yet shown */}
          {post.callouts.slice(post.sections.length).map((c, i) => (
            <div key={`extra-callout-${i}`} className={`callout ${calloutConfig[c.type].className}`}>
              <div className="callout__header">
                <span className="callout__icon" aria-hidden="true">{calloutConfig[c.type].icon}</span>
                <span className="callout__title">{c.title}</span>
              </div>
              <p className="callout__body">{c.body}</p>
            </div>
          ))}

          {/* ── Mind Map ─────────────────────────────────── */}
          <InteractiveMindMap data={post.mindMap} />

          {/* ── Mnemonic ─────────────────────────────────── */}
          {post.mnemonic && <MnemonicCards data={post.mnemonic} />}
        </article>
      </div>

      {/* ── Related posts ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="article-related" aria-labelledby="related-heading">
          <div className="inner">
            <h2 id="related-heading" className="section-heading mb-8">Continue lendo</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <a key={r.slug} href={`/blog/${r.slug}`} className="card group flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="badge badge-accent text-xs">{r.tag}</span>
                    <span className="text-xs text-[var(--subtle)]">{r.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold leading-snug text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">{r.description}</p>
                  <span className="text-xs font-medium text-[var(--accent)] mt-auto flex items-center gap-1">
                    Ler artigo
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
