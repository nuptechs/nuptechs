"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   SearchDialog — Cmd+K semantic search modal
   Uses Pinecone via /api/blog/search for meaning-based search.
   ═══════════════════════════════════════════════════════════ */

interface SearchResult {
  slug: string;
  title: string;
  tag: string;
  score: number;
  textPreview: string;
  matchedSection?: string;
}

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Debounced search
  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(q)}&limit=6`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
        setSelectedIndex(0);
      }
    } catch {
      // Silently fail — search is non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  };

  // Keyboard navigation
  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      window.location.href = `/blog/${results[selectedIndex].slug}`;
    }
  };

  if (!open) {
    return (
      <button
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Buscar no blog"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="search-trigger__label">Buscar...</span>
        <kbd className="search-trigger__kbd">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="search-overlay" onClick={() => setOpen(false)}>
      <div className="search-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Buscar no blog">
        <div className="search-dialog__input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-dialog__input"
            placeholder="Buscar por significado..."
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeydown}
            autoComplete="off"
          />
          {loading && <div className="search-dialog__spinner" aria-hidden="true" />}
          <kbd className="search-dialog__esc">Esc</kbd>
        </div>

        {results.length > 0 && (
          <ul className="search-dialog__results" role="listbox">
            {results.map((r, i) => (
              <li key={r.slug} role="option" aria-selected={i === selectedIndex}>
                <a
                  href={`/blog/${r.slug}`}
                  className={`search-dialog__result${i === selectedIndex ? " search-dialog__result--selected" : ""}`}
                >
                  <div className="search-dialog__result-header">
                    <span className="badge badge-accent text-xs">{r.tag}</span>
                    <span className="search-dialog__score">{Math.round(r.score * 100)}%</span>
                  </div>
                  <p className="search-dialog__result-title">{r.title}</p>
                  {r.matchedSection && (
                    <p className="search-dialog__result-section">
                      Seção: {r.matchedSection}
                    </p>
                  )}
                  <p className="search-dialog__result-preview">{r.textPreview}</p>
                </a>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && !loading && (
          <div className="search-dialog__empty">
            <p>Nenhum resultado para &quot;{query}&quot;</p>
          </div>
        )}

        <div className="search-dialog__footer">
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span>esc fechar</span>
        </div>
      </div>
    </div>
  );
}
