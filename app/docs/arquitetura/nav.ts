// Information Architecture do portal — ordem DIDÁTICA do macro ao micro.
// Cada item.slug corresponde a content/arquitetura/<slug>.md

export interface NavItem {
  title: string;
  slug: string;
  note?: string;
}
export interface NavGroup {
  title: string;
  hint?: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    title: "Comece por aqui",
    hint: "O macro",
    items: [
      { title: "Visão de Arquitetura & os 4 Pilares", slug: "01-architecture-vision" },
      { title: "Mapa de Stakeholders", slug: "matrices/stakeholder-map" },
      { title: "Sumário executivo (índice completo)", slug: "README" },
    ],
  },
  {
    title: "Fundamentos",
    hint: "Preliminary",
    items: [
      { title: "Princípios & Framework", slug: "00-preliminary" },
      { title: "Repositório & Metamodelo TOGAF", slug: "00b-architecture-repository-metamodel" },
      { title: "Catálogo de Princípios", slug: "catalogs/principles-catalog" },
      { title: "Registro de Evidência & Frescura", slug: "EVIDENCE-REGISTER" },
    ],
  },
  {
    title: "Negócio (B)",
    items: [{ title: "Arquitetura de Negócio", slug: "02-business-architecture" }],
  },
  {
    title: "Dados (C)",
    hint: "do macro ao micro",
    items: [
      { title: "Arquitetura de Dados", slug: "03-data-architecture" },
      { title: "Catálogo de Entidades (210)", slug: "catalogs/data-entity-catalog" },
      { title: "Matriz CRUD App/Dados", slug: "matrices/crud-application-data-matrix" },
    ],
  },
  {
    title: "Aplicação (C)",
    items: [
      { title: "Arquitetura de Aplicação", slug: "04-application-architecture" },
      { title: "Portfólio de Aplicações", slug: "catalogs/application-portfolio" },
      { title: "Matriz de Integrações", slug: "catalogs/integration-matrix" },
    ],
  },
  {
    title: "Tecnologia (D)",
    items: [
      { title: "Arquitetura de Tecnologia", slug: "05-technology-architecture" },
      { title: "Padrões de Tecnologia", slug: "catalogs/technology-standards" },
      { title: "Matriz Sistema/Tecnologia", slug: "matrices/system-technology-matrix" },
      { title: "Reference Models (TRM + III-RM)", slug: "target-at-scale/technical-reference-model" },
    ],
  },
  {
    title: "Requisitos",
    hint: "Requirements Management",
    items: [
      { title: "Especificação de Requisitos (ARS)", slug: "09-architecture-requirements-specification" },
    ],
  },
  {
    title: "Evolução (E/F)",
    items: [
      { title: "Oportunidades & Migração", slug: "06-opportunities-migration" },
      { title: "Matriz Gaps-Soluções-Dependências", slug: "matrices/consolidated-gaps-solutions-dependencies" },
      { title: "Transition Architectures (T0–T3)", slug: "phases/transition-architectures" },
      { title: "Plano de Execução da Onda T1", slug: "phases/wave-t1-execution-plan" },
    ],
  },
  {
    title: "Governança & Decisões (G/H)",
    items: [
      { title: "Governança de Arquitetura", slug: "07-governance" },
      { title: "Avaliação de Maturidade", slug: "phases/capability-assessment" },
      { title: "ADRs Corporativos — índice", slug: "adr/README" },
      { title: "ADR-EA-001 · IdP único", slug: "adr/ADR-EA-001-nupidentify-idp-unico" },
      { title: "ADR-EA-002 · IA gateway único", slug: "adr/ADR-EA-002-nupai-gateway-ponto-unico-ia" },
      { title: "ADR-EA-003 · Deploy Docker/Railway", slug: "adr/ADR-EA-003-deploy-docker-railway" },
      { title: "ADR-EA-004 · Audit-chain padrão", slug: "adr/ADR-EA-004-audit-chain-padrao" },
      { title: "ADR-EA-005 · Tenant key + RLS", slug: "adr/ADR-EA-005-tenant-key-rls" },
      { title: "ADR-EA-006 · Fábrica de Software", slug: "adr/ADR-EA-006-fabrica-de-software" },
    ],
  },
  {
    title: "Transversais",
    hint: "atravessam todas as fases",
    items: [
      { title: "Arquitetura de Segurança", slug: "cross-cutting/security-architecture" },
      { title: "Privacidade & LGPD", slug: "cross-cutting/privacy-lgpd-architecture" },
      { title: "Registro de Riscos", slug: "cross-cutting/risk-register" },
      { title: "Runbook DPIA · biometria de menores", slug: "cross-cutting/dpia-runbook-biometria-menores" },
    ],
  },
  {
    title: "Escala & Futuro",
    hint: "o micro vira indústria",
    items: [
      { title: "Benchmark Mundial (vs padrão-ouro)", slug: "benchmark/ea-benchmark-world-class" },
      { title: "Fábrica de Software (alvo em escala)", slug: "target-at-scale/software-factory-target" },
      { title: "Golden Path · nup new-product", slug: "target-at-scale/golden-path-new-product" },
    ],
  },
  {
    title: "Anexos",
    items: [
      { title: "Estado da Arte em Visualização", slug: "08-visualization-state-of-art" },
    ],
  },
];

/** mapa slug → título curto (para breadcrumb/prev-next). */
export const TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((i) => [i.slug, i.title]))
);

/** ordem linear (para anterior/próximo). */
export const FLAT_SLUGS: string[] = NAV.flatMap((g) => g.items.map((i) => i.slug));
