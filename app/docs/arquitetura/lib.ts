// Helpers de servidor (fs) — leitura dos docs e extração de TOC.
import fs from "node:fs";
import path from "node:path";
import { slugify } from "./links";

export const CONTENT_DIR = path.join(process.cwd(), "content/arquitetura");

export function listSlugs(): string[] {
  const out: string[] = [];
  function walk(dir: string, base = "") {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${e.name}` : e.name;
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs, rel);
      else if (e.name.endsWith(".md")) out.push(rel.replace(/\.md$/, ""));
    }
  }
  walk(CONTENT_DIR);
  return out;
}

export function readDoc(slug: string): string | null {
  // proteção contra path traversal
  const safe = slug.replace(/\.\.+/g, "").replace(/^\/+/, "");
  const file = path.join(CONTENT_DIR, `${safe}.md`);
  if (!file.startsWith(CONTENT_DIR) || !fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function getTitle(raw: string): string {
  return (raw.match(/^#\s+(.+)$/m)?.[1] || "Documento").replace(/[`*_]/g, "").trim();
}

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractToc(raw: string): TocItem[] {
  const noCode = raw.replace(/```[\s\S]*?```/g, "");
  const items: TocItem[] = [];
  for (const m of noCode.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[`*_]/g, "").replace(/\s*\{#.*\}\s*$/, "").trim();
    items.push({ depth, text, id: slugify(text) });
  }
  return items;
}

export function dirOf(slug: string): string {
  const i = slug.lastIndexOf("/");
  return i === -1 ? "" : slug.slice(0, i);
}
