"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchIndex } from "./search-index";
import { DOCS_BASE } from "./links";

export default function DocsSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const tokens = query.split(/\s+/);
    return searchIndex
      .map((d) => {
        const hay = (d.title + " " + d.headings.join(" ") + " " + d.text).toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (!hay.includes(t)) return { d, score: -1 };
          if (d.title.toLowerCase().includes(t)) score += 5;
          if (d.headings.some((h) => h.toLowerCase().includes(t))) score += 2;
          score += 1;
        }
        return { d, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [q]);

  function go(slug: string) {
    setOpen(false);
    setQ("");
    router.push(`${DOCS_BASE}/${slug}`);
  }

  return (
    <div className="docs-search" ref={boxRef}>
      <input
        ref={inputRef}
        value={q}
        placeholder="Buscar na arquitetura…  (⌘K)"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, results.length - 1));
          if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
          if (e.key === "Enter" && results[active]) go(results[active].d.slug);
        }}
        aria-label="Buscar na documentação de arquitetura"
      />
      {open && results.length > 0 && (
        <ul className="docs-search-results" role="listbox">
          {results.map((r, i) => (
            <li
              key={r.d.slug}
              role="option"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                go(r.d.slug);
              }}
            >
              <span className="r-title">{r.d.title}</span>
              <span className="r-slug">{r.d.slug}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
