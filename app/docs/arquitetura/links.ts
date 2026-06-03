// Utilitários puros (client + server safe) — slug e resolução de links internos.

const BASE = "/docs/arquitetura";

/** slug determinístico para ids de heading e TOC (mantém acentos, como o GitHub). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** flatten de children do react-markdown para texto (para extrair título de heading). */
export function nodeToText(children: unknown): string {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(nodeToText).join("");
  const props = (children as { props?: { children?: unknown } })?.props;
  if (props && "children" in props) return nodeToText(props.children);
  return "";
}

/**
 * Resolve um href de markdown para uma rota do portal.
 * - http/mailto/# → inalterado (externo/âncora)
 * - *.md relativo → /docs/arquitetura/<resolvido>
 * - viewer/ e likec4/ → /arquitetura (o dashboard visual)
 */
export function resolveHref(href: string | undefined, currentDir: string): string {
  if (!href) return "#";
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("#")) return href;

  const [pathPart, hash] = href.split("#");
  const bare = pathPart.replace(/\/$/, "").split("/").pop() || "";
  if (bare === "viewer" || bare === "likec4") return "/arquitetura";

  if (!pathPart.endsWith(".md")) return href; // dir/desconhecido — mantém

  const baseSegs = currentDir ? currentDir.split("/") : [];
  const stack = [...baseSegs];
  for (const s of pathPart.replace(/\.md$/, "").split("/")) {
    if (s === "." || s === "") continue;
    if (s === "..") stack.pop();
    else stack.push(s);
  }
  let route = `${BASE}/${stack.join("/")}`;
  if (hash) route += `#${hash}`;
  return route;
}

export const DOCS_BASE = BASE;
