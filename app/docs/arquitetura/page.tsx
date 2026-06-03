import type { Metadata } from "next";
import Link from "next/link";
import DocsShell from "./DocsShell";
import { NAV } from "./nav";
import { DOCS_BASE } from "./links";
import "./docs.css";

export const metadata: Metadata = {
  title: "Arquitetura Corporativa · NuPtechs",
  description:
    "Portal navegável da Arquitetura Corporativa (TOGAF) da NuPtechs — do macro ao micro: visão, pilares, fases ADM, catálogos, matrizes, segurança, riscos e a fábrica de software.",
};

export default function ArchHub() {
  return (
    <DocsShell>
      <div className="docs-hub">
        <h1>Arquitetura Corporativa NuPtechs</h1>
        <p className="docs-hub-lead">
          Documentação completa de Enterprise Architecture seguindo o <strong>TOGAF ADM</strong>,
          organizada do <strong>macro ao micro</strong>: da visão e dos 4 pilares de plataforma até
          os catálogos, matrizes, decisões e o caminho de evolução em escala. Toda afirmação é
          ancorada em <strong>evidência de código</strong>.
        </p>
        <p className="docs-hub-meta">
          33+ documentos · 9 fases do ADM + reference models · também disponível como{" "}
          <a href="/arquitetura">mapa visual interativo ↗</a>. Comece pela{" "}
          <Link href={`${DOCS_BASE}/01-architecture-vision`}>Visão de Arquitetura</Link>.
        </p>

        <div className="docs-hub-cards">
          {NAV.map((g) => (
            <div className="docs-hub-card" key={g.title}>
              <h3>
                {g.title}
                {g.hint && <span className="hint">{g.hint}</span>}
              </h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`${DOCS_BASE}/${it.slug}`}>{it.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
