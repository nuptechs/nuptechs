"use client";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  tech: string[];
  category: "platform" | "devtools" | "ai" | "productivity";
}

const products: Product[] = [
  {
    id: "easynup",
    name: "EasyNuP",
    tagline: "Contract & Workflow Management",
    description:
      "Enterprise platform for IT contract lifecycle management with AI-powered document analysis, visual BPMN workflow designer, and 360° executive dashboards. Built for Brazilian public sector compliance.",
    stats: [
      { label: "Lines of code", value: "490k" },
      { label: "Automated tests", value: "5,850+" },
      { label: "Permission rules", value: "511" },
      { label: "Domain entities", value: "150+" },
    ],
    tech: ["Java 21", "Spring Boot", "Vue 3", "PostgreSQL", "Redis", "BullMQ"],
    category: "platform",
  },
  {
    id: "nupidentify",
    name: "NuPIdentify",
    tagline: "Identity & Access Management",
    description:
      "Production-grade IAM with OIDC/OAuth 2.1, SAML 2.0, SCIM provisioning, WebAuthn/Passkeys, and multi-layered authorization (RBAC + ABAC + ReBAC). Multi-tenant, Stripe-integrated billing.",
    stats: [
      { label: "Database tables", value: "70" },
      { label: "Auth protocols", value: "5" },
      { label: "Unit tests", value: "2,110+" },
      { label: "Frontend pages", value: "53" },
    ],
    tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Drizzle ORM"],
    category: "platform",
  },
  {
    id: "debug-probe",
    name: "Debug Probe",
    tagline: "Multi-Layer Runtime Debugging",
    description:
      "Captures and correlates events across browser, network, server, and database layers into unified timelines. Real-time dashboard with distributed tracing waterfall visualization.",
    stats: [
      { label: "Test cases", value: "1,200+" },
      { label: "TS packages", value: "10" },
      { label: "DB adapters", value: "6" },
      { label: "Capture layers", value: "4" },
    ],
    tech: ["TypeScript", "React 19", "Playwright", "WebSocket", "PostgreSQL"],
    category: "devtools",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "AI-Powered QA → Code Fix Pipeline",
    description:
      "Records browser sessions, correlates with backend traces, and uses AI to diagnose root causes and generate code corrections automatically. From bug report to pull request.",
    stats: [
      { label: "Diagnosis confidence", value: "94%" },
      { label: "Avg fix time", value: "< 2min" },
      { label: "Integrations", value: "4" },
      { label: "Issue categories", value: "7" },
    ],
    tech: ["Node.js", "Express 5", "Claude AI", "rrweb", "PostgreSQL"],
    category: "ai",
  },
  {
    id: "manifest",
    name: "Manifest",
    tagline: "Code Analysis & Security Policy Automation",
    description:
      "Maps full-stack applications end-to-end and generates security policies, compliance reports, Keycloak realms, and OPA Rego policies. AI-powered semantic classification of every endpoint.",
    stats: [
      { label: "Output formats", value: "7" },
      { label: "AI classifications", value: "12" },
      { label: "Framework support", value: "6+" },
      { label: "Criticality scoring", value: "0–100" },
    ],
    tech: ["Java", "Node.js", "React", "OpenAI", "Drizzle ORM"],
    category: "devtools",
  },
  {
    id: "nup-chunks",
    name: "NuP-Chunks",
    tagline: "Document Processing & Semantic Search",
    description:
      "Ingests multi-format documents, applies domain-aware intelligent chunking, generates embeddings, and enables semantic search and AI-powered Q&A through vector databases.",
    stats: [
      { label: "Document formats", value: "6" },
      { label: "Domain strategies", value: "5" },
      { label: "Embedding dims", value: "1,024" },
      { label: "Content spaces", value: "∞" },
    ],
    tech: ["Python", "FastAPI", "Pinecone", "Claude", "Mistral AI"],
    category: "ai",
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "platform", label: "Platforms" },
  { key: "devtools", label: "Dev Tools" },
  { key: "ai", label: "AI & Data" },
];

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

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
              <div className="psc__card-header">
                <h3 className="psc__card-name">{product.name}</h3>
                <span className="psc__card-tagline">{product.tagline}</span>
              </div>

              <p className="psc__card-desc">{product.description}</p>

              {/* Stats grid — visible on expand */}
              <div className={`psc__stats${isExpanded ? " psc__stats--visible" : ""}`}>
                {product.stats.map((s) => (
                  <div key={s.label} className="psc__stat">
                    <span className="psc__stat-value">{s.value}</span>
                    <span className="psc__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="psc__tech">
                {product.tech.map((t) => (
                  <span key={t} className="psc__tech-badge">{t}</span>
                ))}
              </div>

              <span className="psc__expand-hint">
                {isExpanded ? "Click to collapse" : "Click to expand"}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
