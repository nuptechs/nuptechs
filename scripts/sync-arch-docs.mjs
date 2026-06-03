#!/usr/bin/env node
/**
 * Sincroniza os documentos da Arquitetura Corporativa (EA TOGAF) do repo
 * nup-platform para o conteúdo do site (content/arquitetura/), e gera o índice
 * de busca client-side.
 *
 * Fonte de verdade: nup-platform/docs/enterprise-architecture/ (snapshot aqui).
 * Uso: node scripts/sync-arch-docs.mjs   (ou: ARCH_DOCS_SRC=/caminho node ...)
 */
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const SRC =
  process.env.ARCH_DOCS_SRC ||
  path.resolve(repoRoot, "..", "nup-platform/docs/enterprise-architecture");
const DEST = path.resolve(repoRoot, "content/arquitetura");
const INDEX = path.resolve(repoRoot, "app/docs/arquitetura/search-index.ts");

if (!fs.existsSync(SRC)) {
  console.error(`[sync-arch-docs] fonte não encontrada: ${SRC}`);
  console.error("Defina ARCH_DOCS_SRC ou deixe nup-platform como repo irmão.");
  process.exit(1);
}

/** lista recursiva de .md (ignora node_modules/dist) */
function walk(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", "exports", ".likec4"].includes(entry.name)) continue;
    const rel = path.join(base, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs, rel));
    else if (entry.name.endsWith(".md")) out.push(rel);
  }
  return out;
}

const files = walk(SRC);
fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });

const index = [];
for (const rel of files) {
  const raw = fs.readFileSync(path.join(SRC, rel), "utf8");
  const destPath = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, raw);

  const slug = rel.replace(/\.md$/, "");
  const title =
    (raw.match(/^#\s+(.+)$/m)?.[1] || path.basename(slug)).replace(/[`*_]/g, "").trim();
  // headings h2/h3 para reforçar a busca
  const headings = [...raw.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) =>
    m[1].replace(/[`*_]/g, "").trim()
  );
  // texto pra busca: remove blocos de código/mermaid e marcação pesada
  const text = raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>|*_`\-]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 1400);
  index.push({ slug, title, headings, text });
}

const header = `// GERADO por scripts/sync-arch-docs.mjs — NÃO editar à mão.\n// Índice de busca do portal de Arquitetura. Re-gere com: npm run docs:sync\n`;
fs.mkdirSync(path.dirname(INDEX), { recursive: true });
fs.writeFileSync(
  INDEX,
  `${header}export interface SearchDoc { slug: string; title: string; headings: string[]; text: string }\n` +
    `export const searchIndex: SearchDoc[] = ${JSON.stringify(index, null, 0)};\n`
);

console.log(`[sync-arch-docs] ${files.length} documentos sincronizados → content/arquitetura/`);
console.log(`[sync-arch-docs] índice de busca → app/docs/arquitetura/search-index.ts`);
