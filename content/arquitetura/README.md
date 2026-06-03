# Arquitetura Corporativa da NuPTechs — TOGAF ADM

> **Documento vivo de Enterprise Architecture (EA).** Estruturado segundo o **TOGAF 10 — Architecture Development Method (ADM)**.
> Toda afirmação técnica deste conjunto é ancorada em **evidência lida do código** dos 24 repositórios ativos da NuPTechs em 2026-06-02 (não especulação).

| Campo | Valor |
|---|---|
| **Versão** | **2.1** (Content Framework completo + Reference Models TRM/III-RM + benchmark world-class + target de escala "fábrica de software") |
| **Data** | 2026-06-02 |
| **Autor** | Engajamento de arquitetura corporativa (padrão equipe certificada TOGAF) |
| **Patrocinador** | Yuri F. (lead developer / fundador) |
| **Escopo** | Todo o parque tecnológico NuPTechs — 24 repositórios ativos |
| **Drivers** | (1) Consolidação técnica · (2) Narrativa de plataforma para investidor |
| **Status** | 🟢 Baseline verificado por código · target, roadmap, riscos e requisitos formalizados |
| **Método** | Leitura profunda de código em `main` (2 ondas, 7 frentes). Ver [EVIDENCE-REGISTER](EVIDENCE-REGISTER.md) |

> ⚠️ **Leia primeiro o [EVIDENCE-REGISTER](EVIDENCE-REGISTER.md)** — comprova *o que foi lido*, lista os documentos obsoletos **descartados**, e registra **16 correções factuais** que a leitura de código aplicou sobre a v1.0 (ex: nupai-gateway tem **17 portas** não 14; compliance Lei 14.133 vive no **easynup**, não no Sentinel; **RLS está dormente**; gateway **sem deploy**; loop self-healing **não fecha**). Onde um doc de fase (00–08) divergir do EVIDENCE-REGISTER, **o EVIDENCE-REGISTER prevalece**.

---

## Como navegar (Architecture Content Framework)

O TOGAF organiza a arquitetura num ciclo de fases (A→H) em torno do núcleo de Requirements Management, e o conteúdo em **deliverables · catálogos · matrizes · diagramas**. Este repositório materializa o conjunto.

### Núcleo do ADM (deliverables por fase)

| Fase ADM | Documento | O que responde |
|---|---|---|
| **Governança da EA** | [EVIDENCE-REGISTER.md](EVIDENCE-REGISTER.md) · [00b-architecture-repository-metamodel.md](00b-architecture-repository-metamodel.md) | Prova de leitura + correções · Architecture Repository, Enterprise Continuum, metamodelo |
| **Preliminary** | [00-preliminary.md](00-preliminary.md) | Princípios, framework, governança |
| **A — Vision** | [01-architecture-vision.md](01-architecture-vision.md) | Visão, 4 pilares, **pitch de plataforma** |
| **B — Business** | [02-business-architecture.md](02-business-architecture.md) | Capacidades, value streams, portfólio |
| **C — Data** | [03-data-architecture.md](03-data-architecture.md) | Multi-tenant, fluxos de dado, bancos |
| **C — Application** | [04-application-architecture.md](04-application-architecture.md) | Catálogo, integrações, dependências |
| **D — Technology** | [05-technology-architecture.md](05-technology-architecture.md) | Stack, deploy, divergências |
| **E/F — Migration** | [06-opportunities-migration.md](06-opportunities-migration.md) · [phases/transition-architectures.md](phases/transition-architectures.md) · [phases/wave-t1-execution-plan.md](phases/wave-t1-execution-plan.md) | Gaps, roadmap, **Transition Architectures T0–T3** + **plano executável da Onda T1** |
| **G/H — Governance** | [07-governance.md](07-governance.md) · [phases/capability-assessment.md](phases/capability-assessment.md) | Governança, ADRs, **maturidade + prontidão** |
| **Requirements Mgmt** | [09-architecture-requirements-specification.md](09-architecture-requirements-specification.md) | **ARS** — requisitos verificáveis rastreados a princípios/WP/risco |

### Visões transversais (cross-cutting — atravessam todas as fases)

| Documento | Conteúdo |
|---|---|
| [cross-cutting/security-architecture.md](cross-cutting/security-architecture.md) | Controles de segurança *como estão no código* (fortes vs aspiracionais); cadeia HMAC, RLS dormente, segredos |
| [cross-cutting/privacy-lgpd-architecture.md](cross-cutting/privacy-lgpd-architecture.md) | ROPA, direito do titular (Art. 18), **DPIA biometria de menores**, retenção |
| [cross-cutting/risk-register.md](cross-cutting/risk-register.md) | **Risk Register** — 12+ riscos por impacto×probabilidade, mitigação |
| [cross-cutting/dpia-runbook-biometria-menores.md](cross-cutting/dpia-runbook-biometria-menores.md) | **Runbook de DPIA/RIPD** — biometria de menores (NuP-School), endereça R5 |

### Catálogos (Architecture Building Blocks)

| Catálogo | Conteúdo |
|---|---|
| [catalogs/principles-catalog.md](catalogs/principles-catalog.md) | Princípios formais (Statement·Rationale·Implications) por domínio |
| [catalogs/application-portfolio.md](catalogs/application-portfolio.md) | Ficha técnica dos 24 repositórios |
| [catalogs/data-entity-catalog.md](catalogs/data-entity-catalog.md) | 210 entidades easynup por bounded context + domínios dos demais |
| [catalogs/integration-matrix.md](catalogs/integration-matrix.md) | Interface catalog (quem-chama-quem) |
| [catalogs/technology-standards.md](catalogs/technology-standards.md) | Padrões e divergências |

### Matrizes (relações entre blocos)

| Matriz | Conteúdo |
|---|---|
| [matrices/stakeholder-map.md](matrices/stakeholder-map.md) | Stakeholder × Concern × View + Communications Plan |
| [matrices/crud-application-data-matrix.md](matrices/crud-application-data-matrix.md) | CRUD aplicação × dado (sistemas-dono, acoplamentos) |
| [matrices/system-technology-matrix.md](matrices/system-technology-matrix.md) | Aplicação × tecnologia, portabilidade/on-prem |
| [matrices/consolidated-gaps-solutions-dependencies.md](matrices/consolidated-gaps-solutions-dependencies.md) | Gaps × Work Packages × dependências |

### Mapa navegável (Solutions Continuum)

| Artefato | O que é |
|---|---|
| [viewer/](viewer/) | **Dashboard interativo** (Cytoscape.js) — grafo dos 4 pilares + 24 apps + matriz. Pitch. Live em `nuptechs.com/arquitetura`. |
| [likec4/](likec4/) | **Modelo LikeC4** as-code — site navegável + MCP para IA + [PNGs do deck](likec4/diagrams/). |
| [08-visualization-state-of-art.md](08-visualization-state-of-art.md) | Pesquisa de tooling (LeanIX/Ardoq vs Backstage vs LikeC4 vs Cytoscape). |

### Benchmark mundial & Projeção de escala (v2.1)

| Artefato | O que é |
|---|---|
| [benchmark/ea-benchmark-world-class.md](benchmark/ea-benchmark-world-class.md) | **Benchmark** contra o padrão-ouro (TOGAF Series Guides / World Class EA / Gartner) + **scorecard de conformidade** (o que faltava, o que já excedíamos) |
| [target-at-scale/software-factory-target.md](target-at-scale/software-factory-target.md) | **Arquitetura-alvo em escala** — a NuPTechs como **fábrica de software AI-native**: IDP + golden paths + SDLC agentic governado + multi-tenancy celular + projeção de escala |
| [target-at-scale/technical-reference-model.md](target-at-scale/technical-reference-model.md) | **TRM + III-RM** (reference models TOGAF adaptados) — building blocks técnicos + *boundaryless information flow* |
| [target-at-scale/golden-path-new-product.md](target-at-scale/golden-path-new-product.md) | **Golden Path `nup new-product`** — spec implementável da linha de montagem (7 estações que plugam os 4 pilares) |

### Decisões de arquitetura corporativa (ADR-EA)

| Artefato | O que é |
|---|---|
| [adr/](adr/) | **Log de ADRs corporativos** (cross-repo): ADR-EA-001 IdP único · 002 IA gateway · 003 deploy Docker · 004 audit-chain · 005 tenant key/RLS · **006 Fábrica de Software** (com plano de industrialização I1–I4 pós-T3) |

---

## Maturidade da EA (cobertura do Content Framework)

| Disciplina TOGAF | Cobertura | Artefato |
|---|---|---|
| Princípios + governança | 🟢 | preliminary, principles-catalog, metamodel, EVIDENCE-REGISTER |
| Vision + stakeholders | 🟢 | 01-vision, stakeholder-map |
| Business architecture | 🟢 | 02-business, capability map, value streams |
| Data architecture | 🟢 | 03-data, data-entity-catalog, crud-matrix |
| Application architecture | 🟢 | 04-application, portfolio, integration-matrix |
| Technology architecture | 🟢 | 05-technology, system-technology-matrix |
| Migration planning | 🟢 | 06-migration, transition-architectures, gaps-matrix |
| Requirements management | 🟢 | ARS (09) |
| Security & Privacy | 🟢 | security-architecture, privacy-lgpd |
| Risk management | 🟢 | risk-register |
| Capability/maturity | 🟢 | capability-assessment |
| Reference Models (TRM + III-RM) | 🟢 | technical-reference-model |
| Benchmark world-class + conformidade | 🟢 | ea-benchmark-world-class |
| Target de escala (fábrica de software) | 🟢 | software-factory-target |
| ADM adaptado para IA (agentic SDLC) | 🟢 | software-factory-target §4 |
| **Iteração 2 (lacunas conscientes)** | 🟡 | enforcement RLS runtime, áreas 🟡 do manual, backends Salon/Orbit — ver [EVIDENCE-REGISTER §5](EVIDENCE-REGISTER.md) |

---

## Sumário executivo (1 página)

A NuPTechs é uma **software house multi-produto** que já construiu — orgânica e rapidamente — uma plataforma técnica coerente, mas cuja **adoção interna é desigual**. Existe um núcleo de plataforma de classe corporativa (identidade, pacotes compartilhados, gateway de IA, plataforma de qualidade) e um portfólio amplo de produtos verticais sobre ele.

### O que já é forte (ativos defensáveis)

1. **NuPIdentify** — IdP próprio de nível world-class: OIDC + SAML + SCIM + RBAC + ABAC + ReBAC (Zanzibar-style) + MFA/passkeys + billing de licenças. ~51k LOC, em produção, 202 arquivos de teste. É a espinha dorsal de identidade do parque.
2. **easynup** — produto-bandeira: ~608k LOC, 42 ADRs, gestão de contratos públicos sob Lei 14.133/2021 com **cadeia de auditoria HMAC tamper-proof**, IA jurídica com RAG multi-tenant isolado, Schema-as-Code + motor FEEL/DMN. Profundidade de domínio difícil de replicar — fosso competitivo real.
3. **nup-platform** — monorepo de ~30 pacotes `@nuptechs/*` (pagamentos multi-PSP, billing, messaging, conferência, voice, shared-kernel) publicados em GitHub Packages.
4. **Suite Sentinel** (orquestrador + manifest + probe + codelens) — plataforma própria de qualidade/segurança de código com loop diagnose→correct→verify→PR, on-prem, audit HMAC e compliance setor público BR (OPA Rego, Policy Matrix).
5. **nupai-gateway** — gateway de LLM hexagonal provider-agnostic (Anthropic/OpenAI/LiteLLM/Pinecone via portas).

### Onde está a dívida (teses de consolidação)

| # | Achado | Impacto |
|---|---|---|
| **G1** | **5 implementações paralelas de IA/RAG** (easynup, nup-aim, AIHub, NuP-Chunks, nup-study) — cada uma com seu próprio stack LLM. O `nupai-gateway`, feito para unificar isso, **não é consumido por ninguém**. | Custo, manutenção e governança de IA multiplicados por 5. |
| **G2** | **Auth fora do IdP** — NuP-Services, NuP-Chunks, Orbit e NupTechs-AIHub não usam NuPIdentify (auth própria por sessão/API key). | Fragmenta segurança, impede SSO, dispersa o ativo IdP. |
| **G3** | **Infra/deploy sem padrão** — Railway, Vercel, Replit, Neon, EAS coexistem; vários produtos ainda em Replit (Study, Services, Chunks, kan, AIHub). | Operação frágil, sem reprodutibilidade, sem on-prem uniforme. |
| **G4** | **Bancos dispersos** — Postgres em todo lugar, mas Neon serverless, cluster compartilhado, e schemas isolados sem governança de dados central. | Sem visão de dado corporativo, dificulta LGPD/auditoria. |
| **G5** | **Maturidade muito desigual** — de 608k LOC em produção (easynup) a satélites estagnados desde abril (NuP-Services, NuP-Chunks, AIHub). | Diluição de foco; candidatos a arquivar ou reposicionar. |

### Risco de segurança imediato (ação fora do ciclo EA)

⚠️ **`Orbit/docker-compose.yml`** contém `ANTHROPIC_API_KEY` e `ENCRYPTION_KEY` em **texto plano commitado**. Rotacionar as chaves e remover do histórico antes de qualquer outra coisa.

### A aposta arquitetural (alvo)

Consolidar tudo sobre **quatro pilares de plataforma** — **Identidade (NuPIdentify)**, **Pacotes compartilhados (nup-platform)**, **IA (nupai-gateway)** e **Qualidade (Sentinel)** — transformando um conjunto de apps que *coincidentemente* usam tecnologias parecidas numa **plataforma de produto coerente**, com SSO único, IA governada, deploy reprodutível e auditoria uniforme. Esse é, simultaneamente, o caminho de redução de custo técnico **e** a história que sustenta o pitch de "plataforma" (não "coleção de apps") para investidor.

O roadmap de migração em 4 ondas está em [06-opportunities-migration.md](06-opportunities-migration.md).
