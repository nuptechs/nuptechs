"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Media = {
  id: number;
  templateId?: number;
  position: number;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

type Template = {
  id: number;
  name: string;
  caption: string;
  includeContact: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  media: Media[];
};

type DraftState = {
  mode: "create" | "edit";
  id?: number;
  name: string;
  caption: string;
  includeContact: boolean;
  pendingFiles: File[]; // only for create, or to append on edit
  existingMedia: Media[]; // for edit mode
};

const EMPTY_DRAFT: DraftState = {
  mode: "create",
  name: "",
  caption: "",
  includeContact: true,
  pendingFiles: [],
  existingMedia: [],
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

// WhatsApp markdown-ish renderer for preview: *bold* _italic_ ~strike~ ```mono```
function renderWhatsApp(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/```([\s\S]+?)```/g, "<code>$1</code>")
    .replace(/(^|\s)\*([^*\n]+)\*(?=\s|$|[.,!?])/g, "$1<strong>$2</strong>")
    .replace(/(^|\s)_([^_\n]+)_(?=\s|$|[.,!?])/g, "$1<em>$2</em>")
    .replace(/(^|\s)~([^~\n]+)~(?=\s|$|[.,!?])/g, "$1<span style=\"text-decoration:line-through\">$2</span>")
    .replace(/\n/g, "<br/>");
}

export default function CartoesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [saving, setSaving] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/card-templates", { cache: "no-store" });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Falha ao carregar");
      const data = await r.json();
      setTemplates(data.templates || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const activeTemplate = useMemo(() => templates.find((t) => t.isActive) || null, [templates]);

  function openCreate() {
    setDraftError(null);
    setDraft({ ...EMPTY_DRAFT, mode: "create" });
  }

  function openEdit(t: Template) {
    setDraftError(null);
    setDraft({
      mode: "edit",
      id: t.id,
      name: t.name,
      caption: t.caption,
      includeContact: t.includeContact,
      pendingFiles: [],
      existingMedia: [...t.media],
    });
  }

  function closeDraft() {
    setDraft(null);
    setDraftError(null);
  }

  async function activate(id: number) {
    if (!confirm("Tornar este modelo o ativo para envios do /comercial?")) return;
    const r = await fetch(`/api/admin/card-templates/${id}/activate`, { method: "POST" });
    if (!r.ok) {
      alert("Falha ao ativar");
      return;
    }
    await load();
  }

  async function remove(id: number, name: string) {
    if (!confirm(`Excluir o modelo "${name}"? Essa ação não pode ser desfeita.`)) return;
    const r = await fetch(`/api/admin/card-templates/${id}`, { method: "DELETE" });
    if (!r.ok) {
      alert("Falha ao excluir");
      return;
    }
    await load();
  }

  async function removeMedia(templateId: number, mediaId: number) {
    const r = await fetch(`/api/admin/card-templates/${templateId}/media/${mediaId}`, {
      method: "DELETE",
    });
    if (!r.ok) {
      alert("Falha ao remover imagem");
      return;
    }
    await load();
    setDraft((d) => {
      if (!d || d.mode !== "edit") return d;
      return { ...d, existingMedia: d.existingMedia.filter((m) => m.id !== mediaId) };
    });
  }

  async function saveDraft(activateAfter: boolean) {
    if (!draft) return;
    setDraftError(null);
    if (!draft.name.trim()) {
      setDraftError("Dê um nome ao modelo");
      return;
    }
    if (draft.mode === "create" && draft.pendingFiles.length === 0) {
      setDraftError("Adicione ao menos uma imagem antes de salvar.");
      return;
    }

    setSaving(true);
    try {
      if (draft.mode === "create") {
        const fd = new FormData();
        fd.append("name", draft.name);
        fd.append("caption", draft.caption);
        fd.append("includeContact", String(draft.includeContact));
        fd.append("activate", String(activateAfter));
        for (const f of draft.pendingFiles) fd.append("files", f);
        // eslint-disable-next-line no-console
        console.log("[cartoes] POST /api/admin/card-templates", {
          name: draft.name,
          files: draft.pendingFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        });
        const r = await fetch("/api/admin/card-templates", { method: "POST", body: fd });
        const txt = await r.text();
        // eslint-disable-next-line no-console
        console.log("[cartoes] response", r.status, txt);
        if (!r.ok) {
          let msg = "Falha ao salvar";
          try { msg = JSON.parse(txt).error || msg; } catch {}
          throw new Error(`${msg} (HTTP ${r.status})`);
        }
      } else {
        const r = await fetch(`/api/admin/card-templates/${draft.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: draft.name,
            caption: draft.caption,
            includeContact: draft.includeContact,
          }),
        });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          throw new Error(`${j.error || "Falha ao salvar"} (HTTP ${r.status})`);
        }

        if (draft.pendingFiles.length > 0) {
          const fd = new FormData();
          for (const f of draft.pendingFiles) fd.append("files", f);
          const r2 = await fetch(`/api/admin/card-templates/${draft.id}/media`, {
            method: "POST",
            body: fd,
          });
          if (!r2.ok) {
            const j = await r2.json().catch(() => ({}));
            throw new Error(`${j.error || "Falha ao enviar imagens"} (HTTP ${r2.status})`);
          }
        }

        if (activateAfter) {
          const r3 = await fetch(`/api/admin/card-templates/${draft.id}/activate`, { method: "POST" });
          if (!r3.ok) {
            const j = await r3.json().catch(() => ({}));
            throw new Error(`${j.error || "Falha ao ativar"} (HTTP ${r3.status})`);
          }
        }
      }
      await load();
      setDraft(null);
      setDraftError(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[cartoes] saveDraft error", e);
      setDraftError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setSaving(false);
    }
  }

  function onPickFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    // eslint-disable-next-line no-console
    console.log("[cartoes] picked files", arr.map((f) => ({ name: f.name, size: f.size, type: f.type })));
    const MAX = 5 * 1024 * 1024;
    const allowed = new Set(["image/png", "image/jpeg", "image/webp"]);
    for (const f of arr) {
      if (!allowed.has(f.type)) {
        setDraftError(`Tipo não suportado: ${f.name} (${f.type || "?"}). Use PNG, JPEG ou WEBP.`);
        return;
      }
      if (f.size > MAX) {
        setDraftError(`Arquivo ${f.name} excede 5 MB.`);
        return;
      }
    }
    setDraftError(null);
    setDraft((d) => {
      if (!d) return d;
      const next = [...d.pendingFiles, ...arr];
      if (next.length + d.existingMedia.length > 6) {
        setDraftError("Máximo de 6 imagens por modelo.");
        return d;
      }
      return { ...d, pendingFiles: next };
    });
  }

  function removePendingFile(idx: number) {
    setDraft((d) => {
      if (!d) return d;
      const next = [...d.pendingFiles];
      next.splice(idx, 1);
      return { ...d, pendingFiles: next };
    });
  }

  const previewCaption = draft?.caption ?? "";
  const previewMediaUrls = useMemo(() => {
    if (!draft) return [] as string[];
    const fromExisting = draft.existingMedia.map((m) => `/api/card-media/${m.id}`);
    const fromPending = draft.pendingFiles.map((f) => URL.createObjectURL(f));
    return [...fromExisting, ...fromPending];
  }, [draft]);

  // Revoke blob URLs when draft closes or changes
  useEffect(() => {
    return () => {
      for (const url of previewMediaUrls) {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      }
    };
  }, [previewMediaUrls]);

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <div>
          <h1>Cartões comerciais</h1>
          <p className="admin-subtitle">
            Modelos enviados via WhatsApp pelo formulário{" "}
            <code>/comercial</code>. Suba imagens, escreva a mensagem e troque
            o modelo ativo quando quiser.
          </p>
        </div>
        <button className="wa-btn wa-btn-primary" onClick={openCreate}>
          + Novo modelo
        </button>
      </div>

      {activeTemplate && (
        <div
          className="admin-section"
          style={{
            border: "1px solid rgba(124,58,237,0.35)",
            background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                fontSize: 28,
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: 12,
                background: "rgba(124,58,237,0.15)",
              }}
            >
              ★
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Modelo ativo</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{activeTemplate.name}</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {activeTemplate.media.length} imagem
                {activeTemplate.media.length === 1 ? "" : "s"} ·{" "}
                {activeTemplate.includeContact ? "com vCard" : "sem vCard"} · atualizado{" "}
                {formatDate(activeTemplate.updatedAt)}
              </div>
            </div>
            <button className="wa-btn wa-btn-secondary" onClick={() => openEdit(activeTemplate)}>
              Editar
            </button>
          </div>
        </div>
      )}

      {loading && <div className="admin-section">Carregando modelos…</div>}
      {error && (
        <div className="wa-alert" style={{ borderColor: "rgba(239,68,68,0.4)" }}>
          {error}
        </div>
      )}

      {!loading && !error && templates.length === 0 && (
        <div className="admin-section" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪪</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
            Nenhum modelo ainda
          </div>
          <div style={{ opacity: 0.7, marginBottom: 20 }}>
            Crie seu primeiro modelo para começar a enviar cartões personalizados.
          </div>
          <button className="wa-btn wa-btn-primary" onClick={openCreate}>
            Criar primeiro modelo
          </button>
        </div>
      )}

      {!loading && templates.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              tpl={t}
              onEdit={() => openEdit(t)}
              onActivate={() => activate(t.id)}
              onDelete={() => remove(t.id, t.name)}
            />
          ))}
        </div>
      )}

      {draft && (
        <DraftEditor
          draft={draft}
          setDraft={setDraft}
          saving={saving}
          draftError={draftError}
          onClose={closeDraft}
          onSave={() => saveDraft(false)}
          onSaveAndActivate={() => saveDraft(true)}
          onPickFiles={onPickFiles}
          onRemovePending={removePendingFile}
          onRemoveExisting={(mediaId) => draft.id && removeMedia(draft.id, mediaId)}
          fileInputRef={fileInputRef}
          previewCaption={previewCaption}
          previewMediaUrls={previewMediaUrls}
        />
      )}
    </div>
  );
}

function TemplateCard({
  tpl,
  onEdit,
  onActivate,
  onDelete,
}: {
  tpl: Template;
  onEdit: () => void;
  onActivate: () => void;
  onDelete: () => void;
}) {
  const first = tpl.media[0];
  return (
    <div
      className="wa-card"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: "#0b0b12",
          display: "grid",
          placeItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {first ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/card-media/${first.id}`}
            alt={tpl.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ opacity: 0.4, fontSize: 14 }}>sem imagem</div>
        )}
        {tpl.isActive && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(124,58,237,0.9)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            ★ ATIVO
          </div>
        )}
        {tpl.media.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: 12,
            }}
          >
            +{tpl.media.length - 1}
          </div>
        )}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{tpl.name}</div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
            {tpl.media.length} imagem{tpl.media.length === 1 ? "" : "s"} ·{" "}
            {formatDate(tpl.updatedAt)}
          </div>
        </div>
        <div
          style={{
            fontSize: 13,
            opacity: 0.8,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 54,
            whiteSpace: "pre-wrap",
          }}
        >
          {tpl.caption || <em style={{ opacity: 0.5 }}>sem mensagem</em>}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          {!tpl.isActive && (
            <button className="wa-btn wa-btn-primary" onClick={onActivate} style={{ flex: 1 }}>
              Ativar
            </button>
          )}
          <button className="wa-btn wa-btn-secondary" onClick={onEdit} style={{ flex: 1 }}>
            Editar
          </button>
          <button
            className="wa-btn wa-btn-danger"
            onClick={onDelete}
            title="Excluir"
            style={{ paddingLeft: 12, paddingRight: 12 }}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

function DraftEditor({
  draft,
  setDraft,
  saving,
  draftError,
  onClose,
  onSave,
  onSaveAndActivate,
  onPickFiles,
  onRemovePending,
  onRemoveExisting,
  fileInputRef,
  previewCaption,
  previewMediaUrls,
}: {
  draft: DraftState;
  setDraft: React.Dispatch<React.SetStateAction<DraftState | null>>;
  saving: boolean;
  draftError: string | null;
  onClose: () => void;
  onSave: () => void;
  onSaveAndActivate: () => void;
  onPickFiles: (files: FileList | null) => void;
  onRemovePending: (idx: number) => void;
  onRemoveExisting: (mediaId: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  previewCaption: string;
  previewMediaUrls: string[];
}) {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 100%)",
          maxHeight: "92vh",
          overflow: "hidden",
          borderRadius: 16,
          background: "#0f0f17",
          color: "#e7e7ea",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {draft.mode === "create" ? "Novo modelo" : "Editar modelo"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.65 }}>
              Cartão WhatsApp com mensagem personalizada e imagens
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 8,
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", flex: 1, minHeight: 0 }}>
          {/* LEFT: form */}
          <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
            <label style={{ display: "block" }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nome do modelo</div>
              <input
                type="text"
                value={draft.name}
                maxLength={80}
                onChange={(e) => setDraft((d) => (d ? { ...d, name: e.target.value } : d))}
                placeholder="Ex: Apresentação comercial — abril"
                style={inputStyle}
              />
            </label>

            <label style={{ display: "block" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Mensagem (caption)</span>
                <span style={{ fontWeight: 400, opacity: 0.6 }}>{draft.caption.length}/2000</span>
              </div>
              <textarea
                value={draft.caption}
                maxLength={2000}
                onChange={(e) => setDraft((d) => (d ? { ...d, caption: e.target.value } : d))}
                placeholder={"Ex: *Cartão Comercial — NuPtechs*\n\n_Fale com nosso time._"}
                rows={10}
                style={{ ...inputStyle, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", lineHeight: 1.5 }}
              />
              <div style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
                Formatação WhatsApp: <code>*negrito*</code> <code>_itálico_</code>{" "}
                <code>~tachado~</code> <code>```mono```</code>
              </div>
            </label>

            <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={draft.includeContact}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, includeContact: e.target.checked } : d))
                }
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  Enviar também o vCard (contato Silkeny)
                </div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  O contato é adicionado à conversa antes das imagens.
                </div>
              </div>
            </label>

            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Imagens ({draft.existingMedia.length + draft.pendingFiles.length}/6)
              </div>

              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  onPickFiles(e.dataTransfer.files);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                role="button"
                tabIndex={0}
                style={{
                  border: `2px dashed ${dragActive ? "rgba(124,58,237,0.9)" : "rgba(255,255,255,0.3)"}`,
                  background: dragActive ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: "32px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                  Arraste imagens aqui ou clique para selecionar
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                  PNG, JPEG ou WEBP · até 5 MB por arquivo · máx 6 imagens
                </div>
              </div>
              {/* File input lives OUTSIDE the clickable div to avoid any event collisions */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                onChange={(e) => {
                  onPickFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              {(draft.existingMedia.length > 0 || draft.pendingFiles.length > 0) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  {draft.existingMedia.map((m) => (
                    <Thumb
                      key={`e-${m.id}`}
                      src={`/api/card-media/${m.id}`}
                      label={m.fileName}
                      sub={formatBytes(m.sizeBytes)}
                      onRemove={() => onRemoveExisting(m.id)}
                    />
                  ))}
                  {draft.pendingFiles.map((f, i) => (
                    <Thumb
                      key={`p-${i}-${f.name}-${f.size}`}
                      src={previewMediaUrls[draft.existingMedia.length + i] || ""}
                      label={f.name}
                      sub={`${formatBytes(f.size)} · novo`}
                      onRemove={() => onRemovePending(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: preview */}
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              background: "#0a0a10",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{
                padding: "12px 20px",
                fontSize: 12,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                opacity: 0.6,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              Prévia
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                background:
                  "linear-gradient(#0e1a14,#0a1410), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path fill='rgba(255,255,255,0.01)' d='M0 0h40v40H0z'/></svg>\")",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280, marginLeft: "auto" }}>
                {draft.includeContact && (
                  <div style={{ ...bubbleStyle, padding: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: 8,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "#25D366",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 18,
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        S
                      </div>
                      <div style={{ fontSize: 13 }}>
                        <div style={{ fontWeight: 600 }}>Silkeny Ferreira</div>
                        <div style={{ opacity: 0.7, fontSize: 11 }}>NuPtechs · vCard</div>
                      </div>
                    </div>
                  </div>
                )}

                {previewMediaUrls.length === 0 && (
                  <div style={{ ...bubbleStyle, padding: 12, opacity: 0.7, fontSize: 13 }}>
                    <em>nenhuma imagem ainda</em>
                  </div>
                )}

                {previewMediaUrls.map((url, i) => (
                  <div key={url + i} style={{ ...bubbleStyle, overflow: "hidden", padding: 3 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      style={{ width: "100%", borderRadius: 6, display: "block" }}
                    />
                    {i === 0 && previewCaption.trim() && (
                      <div
                        style={{ padding: "8px 10px 6px", fontSize: 13, lineHeight: 1.45 }}
                        dangerouslySetInnerHTML={{ __html: renderWhatsApp(previewCaption) }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {draftError && (
            <div
              style={{
                marginRight: "auto",
                color: "#fecaca",
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.35)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                maxWidth: "60%",
              }}
              role="alert"
            >
              {draftError}
            </div>
          )}
          <button className="wa-btn wa-btn-secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button className="wa-btn wa-btn-secondary" onClick={onSave} disabled={saving}>
            {saving ? "Salvando…" : "Salvar"}
          </button>
          <button className="wa-btn wa-btn-primary" onClick={onSaveAndActivate} disabled={saving}>
            {saving ? "Salvando…" : "Salvar e ativar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Thumb({
  src,
  label,
  sub,
  onRemove,
}: {
  src: string;
  label: string;
  sub: string;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        overflow: "hidden",
        background: "#0b0b12",
      }}
    >
      <div style={{ aspectRatio: "1 / 1", background: "#000" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "6px 8px" }}>
        <div
          style={{
            fontSize: 11,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={label}
        >
          {label}
        </div>
        <div style={{ fontSize: 10, opacity: 0.6 }}>{sub}</div>
      </div>
      <button
        onClick={onRemove}
        aria-label="Remover"
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "none",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: "22px",
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.03)",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  resize: "vertical",
};

const bubbleStyle: React.CSSProperties = {
  background: "#005c4b",
  color: "#fff",
  borderRadius: 8,
  boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
};
