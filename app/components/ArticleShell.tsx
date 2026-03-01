"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Post, PostSection, Callout } from "../blog/[slug]/page";
import InteractiveMindMap from "./InteractiveMindMap";
import MnemonicCards from "./MnemonicCards";
import DepthSelector from "./DepthSelector";
import DepthExpander from "./DepthExpander";

/* ═══════════════════════════════════════════════════════════
   ArticleShell v2 — Premium interactive article layout
   Features:
   • Progressive depth layers (0–3) with DepthSelector
   • Inline DepthExpander cards for deeper content
   • Reading progress bar (depth-aware)
   • Sticky TOC sidebar (depth-filtered)
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

/* ── Depth helpers ────────────────────────────────────────── */
function hasDepthLayers(post: Post): boolean {
  return (post.maxDepth ?? 0) > 0 && post.sections.some((s) => (s.depth ?? 0) > 0);
}

function getVisibleSections(sections: PostSection[], activeDepth: number, expandedIds: Set<string>) {
  return sections.filter((s) => {
    const d = s.depth ?? 0;
    return d <= activeDepth || expandedIds.has(s.id);
  });
}

function getDeeperChildren(sections: PostSection[], parentId: string, activeDepth: number, expandedIds: Set<string>) {
  return sections.filter((s) => {
    const d = s.depth ?? 0;
    return s.parentId === parentId && d > activeDepth && !expandedIds.has(s.id);
  });
}

/* ── Main Component ───────────────────────────────────────── */
export default function ArticleShell({ post, related }: { post: Post; related: Post[] }) {
  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);

  /* ── Depth state ────────────────────────────────────────── */
  const isLayered = hasDepthLayers(post);
  const maxDepth = post.maxDepth ?? 0;

  const [activeDepth, setActiveDepth] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem("nuptechs-depth");
    const parsed = saved ? parseInt(saved, 10) : 0;
    return Math.min(parsed, maxDepth);
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleDepthChange = useCallback((depth: number) => {
    setActiveDepth(depth);
    setExpandedSections(new Set());
    localStorage.setItem("nuptechs-depth", String(depth));
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* ── Visible sections (depth-filtered or all) ───────────── */
  const visibleSections = useMemo(() => {
    if (!isLayered) return post.sections;
    return getVisibleSections(post.sections, activeDepth, expandedSections);
  }, [isLayered, post.sections, activeDepth, expandedSections]);

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

  /* Active section observer — re-observe when visible sections change */
  useEffect(() => {
    const targets = visibleSections
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
  }, [visibleSections]);

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

          {/* ── Depth Selector (only for layered posts) ── */}
          {isLayered && (
            <DepthSelector
              maxDepth={maxDepth}
              activeDepth={activeDepth}
              onDepthChange={handleDepthChange}
              readTimeByDepth={post.readTimeByDepth}
            />
          )}

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
              {visibleSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`article-toc__link${(s.depth ?? 0) > 0 ? ` article-toc__link--depth-${s.depth}` : ""}${activeSectionId === s.id ? " article-toc__link--active" : ""}`}
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
              {visibleSections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`article-toc-mobile__link${(s.depth ?? 0) > 0 ? ` article-toc-mobile__link--depth-${s.depth}` : ""}`} onClick={() => setTocOpen(false)}>
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

          {/* Executive summary (layered posts only) */}
          {isLayered && post.executiveSummary && (
            <div className="executive-summary">
              <div className="executive-summary__header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Resumo Executivo</span>
              </div>
              <p>{post.executiveSummary}</p>
            </div>
          )}

          {/* Sections with interspersed callouts + depth expanders */}
          {visibleSections.map((section, sIdx) => {
            // Get callouts that belong after this section
            const calloutsForSection = isLayered
              ? post.callouts.filter((c) => c.afterSectionId === section.id && (c.depth ?? 0) <= activeDepth)
              : sIdx < post.callouts.length && post.callouts[sIdx]
                ? [post.callouts[sIdx]]
                : [];

            // Get deeper children that can be expanded
            const deeperChildren = isLayered
              ? getDeeperChildren(post.sections, section.id, activeDepth, expandedSections)
              : [];

            return (
              <div key={section.id}>
                <section id={section.id} className={`article-section${(section.depth ?? 0) > 0 ? ` article-section--depth-${section.depth}` : ""}`}>
                  <h2>{section.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </section>

                {/* Depth expander cards for deeper children */}
                {deeperChildren.map((child) => (
                  <DepthExpander
                    key={child.id}
                    depth={child.depth ?? 1}
                    heading={child.heading}
                    content={child.content}
                    isExpanded={expandedSections.has(child.id)}
                    onToggle={() => toggleExpanded(child.id)}
                  />
                ))}

                {/* Callouts after this section */}
                {calloutsForSection.map((c, ci) => (
                  <div key={`callout-${section.id}-${ci}`} className={`callout ${calloutConfig[c.type].className}`}>
                    <div className="callout__header">
                      <span className="callout__icon" aria-hidden="true">{calloutConfig[c.type].icon}</span>
                      <span className="callout__title">{c.title}</span>
                    </div>
                    <p className="callout__body">{c.body}</p>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Remaining callouts not attached to sections (legacy compat) */}
          {!isLayered && post.callouts.slice(post.sections.length).map((c, i) => (
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
