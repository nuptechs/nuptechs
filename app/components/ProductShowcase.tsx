"use client";
import { useState } from "react";
import { products, type Lang } from "../data/products";

const i18nCategories: Record<Lang, { key: string; label: string }[]> = {
  pt: [
    { key: "all", label: "Todos" },
    { key: "platform", label: "Plataformas" },
    { key: "vertical", label: "Verticais" },
    { key: "devtools", label: "Ferramentas Dev" },
    { key: "ai", label: "IA & Dados" },
    { key: "data", label: "Dados & Planilhas" },
    { key: "productivity", label: "Produtividade" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "platform", label: "Platforms" },
    { key: "vertical", label: "Verticals" },
    { key: "devtools", label: "Dev Tools" },
    { key: "ai", label: "AI & Data" },
    { key: "data", label: "Data & Sheets" },
    { key: "productivity", label: "Productivity" },
  ],
  es: [
    { key: "all", label: "Todos" },
    { key: "platform", label: "Plataformas" },
    { key: "vertical", label: "Verticales" },
    { key: "devtools", label: "Herramientas Dev" },
    { key: "ai", label: "IA & Datos" },
    { key: "data", label: "Datos & Hojas" },
    { key: "productivity", label: "Productividad" },
  ],
};

const i18nExpand: Record<Lang, { expand: string; collapse: string; live: string; beta: string; alpha: string }> = {
  pt: { expand: "Clique para expandir", collapse: "Clique para recolher", live: "Em produção", beta: "Beta", alpha: "Alpha" },
  en: { expand: "Click to expand", collapse: "Click to collapse", live: "In production", beta: "Beta", alpha: "Alpha" },
  es: { expand: "Clic para expandir", collapse: "Clic para contraer", live: "En producción", beta: "Beta", alpha: "Alpha" },
};

export default function ProductShowcase({ lang = "pt" }: { lang?: Lang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const categories = i18nCategories[lang] ?? i18nCategories.pt;
  const expandText = i18nExpand[lang] ?? i18nExpand.pt;

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="psc">
      {/* Filter tabs */}
      <div className="psc__tabs" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={activeCategory === cat.key}
            className={`psc__tab${activeCategory === cat.key ? " psc__tab--active" : ""}`}
            onClick={() => { setActiveCategory(cat.key); setExpanded(null); }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="psc__grid">
        {filtered.map((product) => {
          const isExpanded = expanded === product.id;
          const t = product.text[lang] ?? product.text.pt;
          const categoryLabel = categories.find((cat) => cat.key === product.category)?.label ?? product.category;
          const statusLabel = expandText[product.status];
          return (
            <article
              key={product.id}
              className={`psc__card${isExpanded ? " psc__card--expanded" : ""}`}
              onClick={() => setExpanded(isExpanded ? null : product.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(isExpanded ? null : product.id);
                }
              }}
            >
              <div className="psc__card-top">
                <span className="psc__category">{categoryLabel}</span>
                <span className="psc__live">
                  <span className="psc__live-dot" aria-hidden="true" />
                  {statusLabel}
                </span>
              </div>

              <div className="psc__card-header">
                <h3 className="psc__card-name">{product.name}</h3>
                <span className="psc__card-tagline">{t.tagline}</span>
              </div>

              <p className="psc__card-desc">{t.description}</p>

              {/* Stats grid — visible on expand */}
              <div className={`psc__stats${isExpanded ? " psc__stats--visible" : ""}`}>
                {t.stats.map((s) => (
                  <div key={s.label} className="psc__stat">
                    <span className="psc__stat-value">{s.value}</span>
                    <span className="psc__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="psc__tech">
                {product.tech.map((tech) => (
                  <span key={tech} className="psc__tech-badge">{tech}</span>
                ))}
              </div>

              <span className="psc__expand-hint">
                {isExpanded ? expandText.collapse : expandText.expand}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
