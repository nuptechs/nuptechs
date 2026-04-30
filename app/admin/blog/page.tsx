"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminEmptyState } from "../components/AdminEmptyState";

type BlogPostStatus = "published" | "draft" | "scheduled" | "archived";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  tag: string;
  status: BlogPostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  sectionCount: number;
  wordCount: number;
  hasMindMap: boolean;
  hasMnemonic: boolean;
  hasCallouts: boolean;
  relatedCount: number;
  views?: number;
}

interface BlogStats {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
  archived: number;
  totalViews: number;
  avgSeoScore: number;
  contentHealth: number;
}

interface ContentHealth {
  slug: string;
  title: string;
  checks: {
    hasMindMap: boolean;
    hasMnemonic: boolean;
    hasCallouts: boolean;
    hasRelated: boolean;
    hasSeoTitle: boolean;
    hasSeoDescription: boolean;
    hasSections: boolean;
  };
  score: number;
}

const STATUS_LABELS: Record<BlogPostStatus, string> = {
  published: "Publicado",
  draft: "Rascunho",
  scheduled: "Agendado",
  archived: "Arquivado",
};

const TAG_COLORS: Record<string, string> = {
  Automação: "#6c5ce7",
  "IA Aplicada": "#00b894",
  BI: "#0984e3",
  "Dev Ágil": "#e17055",
  Integrações: "#fdcb6e",
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [health, setHealth] = useState<ContentHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogPostStatus | "">("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "health">("posts");
  const [toast, setToast] = useState("");
  const [seoEdit, setSeoEdit] = useState<{ title: string; description: string }>({ title: "", description: "" });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/admin/blog?${params}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setPosts(data.items ?? []);
          setStats(data.stats ?? null);
          setHealth(data.contentHealth ?? []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [statusFilter, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sync source posts to DB
  const syncPosts = async () => {
    showToast("Sincronizando posts do código-fonte...");
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: [] }), // Placeholder — real sync happens server-side
      });
      if (res.ok) {
        showToast("Posts sincronizados com sucesso");
        fetchData();
      }
    } catch {
      showToast("Erro ao sincronizar");
    }
  };

  const selected = useMemo(
    () => posts.find((p) => p.slug === selectedSlug),
    [posts, selectedSlug]
  );

  const selectedHealth = useMemo(
    () => health.find((h) => h.slug === selectedSlug),
    [health, selectedSlug]
  );

  useEffect(() => {
    if (selected) {
      setSeoEdit({
        title: selected.seoTitle ?? selected.title,
        description: selected.seoDescription ?? "",
      });
    }
  }, [selected]);

  const updateStatus = async (slug: string, status: BlogPostStatus) => {
    const res = await fetch(`/api/admin/blog/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      showToast(`Status atualizado para ${STATUS_LABELS[status]}`);
      fetchData();
    }
  };

  const saveSeo = async () => {
    if (!selectedSlug) return;
    const res = await fetch(`/api/admin/blog/${selectedSlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seoTitle: seoEdit.title,
        seoDescription: seoEdit.description,
      }),
    });
    if (res.ok) {
      showToast("SEO atualizado");
      fetchData();
    }
  };

  const healthScore = (h: ContentHealth) => {
    const passed = Object.values(h.checks).filter(Boolean).length;
    const total = Object.values(h.checks).length;
    return Math.round((passed / total) * 100);
  };

  return (
    <div className="admin-content">
      {toast && <div className="admin-toast">{toast}</div>}

      <AdminPageHeader
        title="Blog"
        subtitle="Gestão de conteúdo, SEO e saúde editorial"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Conteúdo" }, { label: "Blog" }]}
        actions={
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={syncPosts}>
            ↻ Sincronizar fonte
          </button>
        }
      />

      {/* Stats */}
      {stats && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total de posts</div>
            <div className="admin-stat-value">{stats.total}</div>
            <div className="admin-stat-footnote">
              {stats.published} publicados · {stats.draft} rascunhos
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Views totais</div>
            <div className="admin-stat-value">
              {stats.totalViews.toLocaleString("pt-BR")}
            </div>
            <div className="admin-stat-footnote">Todas as páginas do blog</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Saúde do conteúdo</div>
            <div className="admin-stat-value">{stats.contentHealth}%</div>
            <div className="admin-stat-footnote">
              Posts com mind map + callouts + mnemônico
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">SEO Score</div>
            <div className="admin-stat-value">{stats.avgSeoScore}%</div>
            <div className="admin-stat-footnote">
              Posts com title e description personalizados
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: "1rem" }}>
        <button
          className={`admin-tab ${activeTab === "posts" ? "admin-tab-active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`admin-tab ${activeTab === "health" ? "admin-tab-active" : ""}`}
          onClick={() => setActiveTab("health")}
        >
          Saúde editorial
        </button>
      </div>

      {activeTab === "posts" && (
        <>
          {/* Filters */}
          <div className="admin-filter-bar">
            <input
              className="admin-search"
              placeholder="Buscar posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="admin-filter-chips">
              {(["", "published", "draft", "scheduled", "archived"] as const).map(
                (s) => (
                  <button
                    key={s}
                    className={`admin-chip ${statusFilter === s ? "admin-chip-active" : ""}`}
                    onClick={() => setStatusFilter(s as BlogPostStatus | "")}
                  >
                    {s ? STATUS_LABELS[s as BlogPostStatus] : "Todos"}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Post list */}
          {loading ? (
            <div className="admin-card admin-skeleton" style={{ height: 320 }} />
          ) : posts.length === 0 ? (
            <AdminEmptyState
              variant="edit"
              title="Nenhum post encontrado"
              description={'Clique em "Sincronizar fonte" para importar posts do código-fonte.'}
            />
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Saúde</th>
                  <th>Publicado em</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const h = health.find((x) => x.slug === post.slug);
                  const score = h ? healthScore(h) : 0;
                  return (
                    <tr
                      key={post.slug}
                      className="admin-row-clickable"
                      onClick={() => setSelectedSlug(post.slug)}
                    >
                      <td>
                        <div style={{ fontWeight: 500 }}>{post.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                          /{post.slug} · {post.wordCount.toLocaleString("pt-BR")} palavras
                          · {post.sectionCount} seções
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "999px",
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            color: "#fff",
                            background: TAG_COLORS[post.tag] ?? "var(--muted)",
                          }}
                        >
                          {post.tag}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge admin-badge-${post.status === "published" ? "converted" : post.status === "draft" ? "new" : post.status === "scheduled" ? "qualified" : "lost"}`}>
                          {STATUS_LABELS[post.status]}
                        </span>
                      </td>
                      <td style={{ fontVariantNumeric: "tabular-nums" }}>
                        {(post.views ?? 0).toLocaleString("pt-BR")}
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                          <div className="admin-score-bar-bg" style={{ width: 48 }}>
                            <div
                              className="admin-score-bar-fill"
                              style={{
                                width: `${score}%`,
                                background:
                                  score >= 80
                                    ? "var(--accent)"
                                    : score >= 50
                                    ? "#fdcb6e"
                                    : "#e17055",
                              }}
                            />
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                            {score}%
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("pt-BR")
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}

      {activeTab === "health" && (
        <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="admin-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Post</th>
                <th style={{ textAlign: "center" }}>Mind Map</th>
                <th style={{ textAlign: "center" }}>Mnemônico</th>
                <th style={{ textAlign: "center" }}>Callouts</th>
                <th style={{ textAlign: "center" }}>Relacionados</th>
                <th style={{ textAlign: "center" }}>SEO Title</th>
                <th style={{ textAlign: "center" }}>SEO Desc</th>
                <th style={{ textAlign: "center" }}>Seções</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {health.map((h) => (
                <tr key={h.slug}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: "0.8125rem" }}>{h.title}</div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>
                      /{h.slug}
                    </div>
                  </td>
                  {Object.values(h.checks).map((ok, i) => (
                    <td key={i} style={{ textAlign: "center", fontSize: "1rem" }}>
                      {ok ? "✓" : "—"}
                    </td>
                  ))}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <div className="admin-score-bar-bg" style={{ width: 48 }}>
                        <div
                          className="admin-score-bar-fill"
                          style={{
                            width: `${h.score}%`,
                            background:
                              h.score >= 80
                                ? "var(--accent)"
                                : h.score >= 50
                                ? "#fdcb6e"
                                : "#e17055",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        {h.score}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer — Post detail */}
      {selected && (
        <div className="admin-drawer-overlay" onClick={() => setSelectedSlug(null)}>
          <aside
            className="admin-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="admin-drawer-header">
              <h2>{selected.title}</h2>
              <button
                className="admin-drawer-close"
                onClick={() => setSelectedSlug(null)}
              >
                ✕
              </button>
            </header>

            <div className="admin-drawer-body">
              {/* Post info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Slug
                  </label>
                  <div style={{ fontSize: "0.875rem", fontFamily: "monospace" }}>
                    /{selected.slug}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Tag
                  </label>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "999px",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: "#fff",
                        background: TAG_COLORS[selected.tag] ?? "var(--muted)",
                      }}
                    >
                      {selected.tag}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Palavras
                  </label>
                  <div style={{ fontSize: "0.875rem" }}>
                    {selected.wordCount.toLocaleString("pt-BR")}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Seções
                  </label>
                  <div style={{ fontSize: "0.875rem" }}>{selected.sectionCount}</div>
                </div>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Views
                  </label>
                  <div style={{ fontSize: "0.875rem" }}>
                    {(selected.views ?? 0).toLocaleString("pt-BR")}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                    Relacionados
                  </label>
                  <div style={{ fontSize: "0.875rem" }}>{selected.relatedCount} posts</div>
                </div>
              </div>

              {/* Content enrichments */}
              <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Enriquecimentos
              </h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {[
                  { label: "Mind Map", ok: selected.hasMindMap },
                  { label: "Mnemônico", ok: selected.hasMnemonic },
                  { label: "Callouts", ok: selected.hasCallouts },
                  { label: "Relacionados", ok: selected.relatedCount > 0 },
                ].map((item) => (
                  <span
                    key={item.label}
                    style={{
                      padding: "0.25rem 0.625rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      border: "1px solid",
                      borderColor: item.ok ? "var(--accent)" : "var(--border)",
                      color: item.ok ? "var(--accent)" : "var(--muted)",
                      background: item.ok ? "rgba(108,92,231,0.06)" : "transparent",
                    }}
                  >
                    {item.ok ? "✓" : "○"} {item.label}
                  </span>
                ))}
              </div>

              {/* SEO editing */}
              <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                SEO
              </h3>
              <div style={{ marginBottom: "0.75rem" }}>
                <label className="admin-input-label">SEO Title</label>
                <input
                  className="admin-input"
                  value={seoEdit.title}
                  onChange={(e) =>
                    setSeoEdit((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <div style={{ fontSize: "0.6875rem", color: seoEdit.title.length > 60 ? "#e17055" : "var(--muted)", marginTop: "0.125rem" }}>
                  {seoEdit.title.length}/60 caracteres
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label className="admin-input-label">Meta Description</label>
                <textarea
                  className="admin-textarea"
                  rows={3}
                  value={seoEdit.description}
                  onChange={(e) =>
                    setSeoEdit((s) => ({ ...s, description: e.target.value }))
                  }
                />
                <div style={{ fontSize: "0.6875rem", color: seoEdit.description.length > 160 ? "#e17055" : "var(--muted)", marginTop: "0.125rem" }}>
                  {seoEdit.description.length}/160 caracteres
                </div>
              </div>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={saveSeo}>
                Salvar SEO
              </button>

              {/* Content health detail */}
              {selectedHealth && (
                <>
                  <h3 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.05em", margin: "1.5rem 0 0.5rem" }}>
                    Saúde editorial — {selectedHealth.score}%
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div className="admin-score-bar-bg" style={{ flex: 1 }}>
                      <div
                        className="admin-score-bar-fill"
                        style={{
                          width: `${selectedHealth.score}%`,
                          background:
                            selectedHealth.score >= 80
                              ? "var(--accent)"
                              : selectedHealth.score >= 50
                              ? "#fdcb6e"
                              : "#e17055",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {selectedHealth.score}%
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Footer — status actions */}
            <footer className="admin-drawer-footer">
              {selected.status === "draft" && (
                <button
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  onClick={() => updateStatus(selected.slug, "published")}
                >
                  Publicar
                </button>
              )}
              {selected.status === "published" && (
                <>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => updateStatus(selected.slug, "archived")}
                  >
                    Arquivar
                  </button>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => updateStatus(selected.slug, "draft")}
                  >
                    Reverter para rascunho
                  </button>
                </>
              )}
              {selected.status === "archived" && (
                <button
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => updateStatus(selected.slug, "draft")}
                >
                  Restaurar como rascunho
                </button>
              )}
              <a
                href={`/blog/${selected.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                style={{ marginLeft: "auto" }}
              >
                Ver no site ↗
              </a>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
}
