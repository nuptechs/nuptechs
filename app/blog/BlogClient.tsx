"use client";

import { useState, useEffect, useRef } from "react";
import type { Post } from "./[slug]/page";
import { formatDatePtBr } from "../lib/date";

const tagColors: Record<string, string> = {
  "Automação":            "badge-accent",
  "IA Aplicada":          "badge-accent",
  "Desenvolvimento Ágil": "badge-accent",
  "Business Intelligence":"badge-accent",
  "Integrações":          "badge-accent",
  "Cultura Tech":         "badge-accent",
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-blog-reveal]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

interface Props {
  postList: Post[];
  allTags: string[];
}

export default function BlogClient({ postList, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  useReveal();

  const filtered = activeTag
    ? postList.filter((p) => p.tag === activeTag)
    : postList;

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <>
      {/* ── Tag filter pills ─────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filtrar por categoria"
      >
        <button
          onClick={() => setActiveTag(null)}
          className={`badge text-xs px-3 py-1 cursor-pointer transition-all ${
            activeTag === null
              ? "badge-accent ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--bg)]"
              : "badge-accent opacity-60 hover:opacity-100"
          }`}
          aria-pressed={activeTag === null}
        >
          Todos
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`badge text-xs px-3 py-1 cursor-pointer transition-all ${
              activeTag === tag
                ? "badge-accent ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--bg)]"
                : "badge-accent opacity-60 hover:opacity-100"
            }`}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── Featured post ────────────────────────────────── */}
      {featured && (
        <article className="blog-featured" data-blog-reveal key={featured.slug}>
          <div className="blog-featured__accent" aria-hidden="true" />
          <div className="blog-featured__content">
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${tagColors[featured.tag] ?? "badge-accent"} text-xs`}>
                {featured.tag}
              </span>
              <span className="text-xs text-[var(--subtle)]">{featured.readTime} leitura</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[var(--text)] mb-3">
              <a
                href={`/blog/${featured.slug}`}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {featured.title}
              </a>
            </h2>
            <p className="text-base leading-relaxed text-[var(--muted)] mb-6 max-w-prose">
              {featured.description}
            </p>
            <div className="flex items-center justify-between">
              <time dateTime={featured.publishedAt} className="text-xs text-[var(--subtle)]">
                {formatDatePtBr(featured.publishedAt, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <a href={`/blog/${featured.slug}`} className="btn btn-primary btn-sm">
                Ler artigo
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </article>
      )}

      {/* ── Article grid ─────────────────────────────────── */}
      {rest.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {rest.map((post, i) => (
            <article
              key={post.slug}
              className="blog-card group"
              data-blog-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="blog-card__top">
                <span className={`badge ${tagColors[post.tag] ?? "badge-accent"} text-xs`}>
                  {post.tag}
                </span>
                <span className="text-xs text-[var(--subtle)]">{post.readTime} leitura</span>
              </div>

              <h2 className="blog-card__title">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>

              <p className="blog-card__excerpt">{post.description}</p>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 mt-auto">
                <time dateTime={post.publishedAt} className="text-xs text-[var(--subtle)]">
                  {formatDatePtBr(post.publishedAt, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <a href={`/blog/${post.slug}`} className="card-link">
                  Ler artigo
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] py-16">
          Nenhum artigo encontrado para essa categoria.
        </p>
      )}
    </>
  );
}
