import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DocsShell from "../DocsShell";
import Markdown from "../Markdown";
import { readDoc, listSlugs, extractToc, getTitle, dirOf } from "../lib";
import { FLAT_SLUGS, TITLE_BY_SLUG } from "../nav";
import { DOCS_BASE } from "../links";
import "../docs.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return listSlugs().map((s) => ({ slug: s.split("/") }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }): Metadata {
  const slug = params.slug.join("/");
  const raw = readDoc(slug);
  const title = raw ? getTitle(raw) : "Arquitetura";
  return {
    title: `${title} · Arquitetura Corporativa NuPtechs`,
    description: "Documentação de Arquitetura Corporativa TOGAF da NuPtechs.",
  };
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const raw = readDoc(slug);
  if (!raw) notFound();

  const toc = extractToc(raw);
  const idx = FLAT_SLUGS.indexOf(slug);
  const prev = idx > 0 ? FLAT_SLUGS[idx - 1] : null;
  const next = idx >= 0 && idx < FLAT_SLUGS.length - 1 ? FLAT_SLUGS[idx + 1] : null;

  return (
    <DocsShell toc={toc}>
      <Markdown source={raw} currentDir={dirOf(slug)} />
      <nav className="docs-prevnext" aria-label="Navegação entre documentos">
        {prev ? (
          <Link href={`${DOCS_BASE}/${prev}`} className="pn prev">
            ← {TITLE_BY_SLUG[prev] ?? prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${DOCS_BASE}/${next}`} className="pn next">
            {TITLE_BY_SLUG[next] ?? next} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </DocsShell>
  );
}
