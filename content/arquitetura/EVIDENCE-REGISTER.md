# Registro de Evidência e Frescura (Evidence & Freshness Register)

> **Artefato de governança de arquitetura.** Comprova *o que foi efetivamente lido* para produzir esta EA, distingue evidência fresca de documentação obsoleta, e registra as **correções factuais** aplicadas após a leitura profunda de código. Responde diretamente à exigência: *"certifique-se de que leu tudo que precisava e não está lendo documentos desatualizados"*.

| Campo | Valor |
|---|---|
| **Método** | Leitura de código em `main` (verdade absoluta — hierarquia de fontes §6 do Preliminary) + manifestos + ADRs. READMEs tratados como suspeitos até confirmados. |
| **Profundidade** | 2 ondas: (1) discovery de baseline por repo; (2) discovery profundo de evidência (entidades, rotas, controles de segurança, schemas) para os artefatos formais. |
| **Data da leitura profunda** | 2026-06-02 |
| **Cobertura** | 24 repositórios ativos + cross-cutting (segurança, LGPD, identidade, event bus) |

---

## 1. Cobertura de leitura por repositório (o que foi lido, em que profundidade)

| Repositório | Profundidade | Evidência lida (amostra) |
|---|---|---|
| **easynup** | 🔬 Código profundo | `pom.xml` (Java 21 / Spring Boot 3.5.11), `persistence/entities/` (contagem real), `services/web/**` (`@Ws`), `services/gateway/src/proxy.js`, `AuditHashChainComponent.java`, `HibernateAuditEventListener.java`, `ExerciseDataSubjectRightServiceV1.java`, `LgpdRightType.java`, `0263_*rls*.xml`, `packages/auth/src/`, `docs/adr/` (listagem real), `docs/manual/areas-funcionais/` (cabeçalhos de fidelidade) |
| **NuPIdentify** | 🔬 Código profundo | `server/routes/oidc.routes.ts`, `saml.routes.ts`, `scim.routes.ts`, `authorize.routes.ts`, `systems.routes.ts`, `shared/schema/{rbac,abac,rebac,organization,licensing,billing}.ts`, `services/rebac/rebac-engine.ts`, `services/policy/policy-evaluator.ts`, `mfa.service.ts`, `Dockerfile`, `packages/sdk/`, `docs/adr/ADR-0014` |
| **nup-platform** | 🔬 Código profundo | `packages/*/package.json` (versões reais), grafo de deps, `outbox-worker/src/worker.ts`, `payments-core/src/adapters/{postgres,redis}/`, `platform-ports/src/`, `shared-kernel/src/`, `docs/adr/0001-0008`, greps cross-repo de consumidores |
| **nupai-gateway** | 🔬 Código profundo | `packages/core/.../ports/outbound/` (contagem real = 17), `use-cases/`, `adapters/` (real vs noop), `packages/recipes/src/hybrid-search.ts`, `apps/gateway/` (ausência de Dockerfile), `container.ts` |
| **nup-sentinel** | 🔬 Código profundo | `src/core/services/*` (detectores), `pipeline-orchestrator.service.js`, `src/adapters/code-change/github-pr.adapter.js`, `src/mcp/server.js` (12 tools), `src/adapters/verifier/`, `src/jobs/codelens-emit.job.js`, leitura integral do ADR-044 |
| **nup-sentinel-manifest** | 🔬 Código profundo | `server/generators/*` (8 geradores), `opa-rego-generator.ts`, `compliance-report-generator.ts` (LGPD/SOC2, **sem Lei 14.133**) |
| **nup-sentinel-probe** | 🔬 Código profundo | `packages/browser-agent/src/adapters/playwright.adapter.ts`, `postgres-storage.adapter.ts` (real, não "planned") |
| **codelens** | 🔬 Código profundo | `packages/analyzer/src/program/`, `importance/pagerank.ts`, `packages/cli/src/emit/sentinel-client.ts` |
| **NuP-School** | 🔬 Código profundo | `server/index.ts` (OIDC+M2M+ReBAC), `server/lib/rebac.ts`, `server/db/schema.ts` + módulos, `server/modules/edu/` (foto-prova/biometria), `railway.toml`, `package.json` (13 pacotes) |
| **nup-study** | 🔬 Código profundo | `shared/schema.ts` (98 tabelas, `nup_study`), `server/services/nup-identify/`, `permissions.json`, `PermissionSyncService.ts` |
| **NuP-Sales** | 🔬 Código profundo | `server/src/` (hexagonal), `packages/auth/src/container.ts`, `payment-gateway.port.ts`, `StripePaymentAdapter`, schema Drizzle |
| **NuP-Salon-Client** | 🔬 Código profundo | `src/store/auth.ts` (auth própria), `eas.json`, `@nuptechs/commerce` |
| **kan** | 🔬 Código profundo | `shared/schema.ts` (20 tabelas), `server/routes.ts` (bcrypt local), `identitySyncService.ts`, `.replit` |
| **nup-aim** | 🔬 Código profundo | `server/schema.ts` (`nup_aim`), `server/nupidentity.ts`, **`.replit` (JWT_SECRET hardcoded)** |
| **Orbit** | 🔬 Código profundo | **`docker-compose.yml:28-29` (chave Anthropic viva + ENCRYPTION_KEY)**, `middleware/auth.js` (API key própria), histórico git (`672c51a`) |
| **NuP-Chunks** | 📄 Médio | `backend/app/`, `pyproject.toml`, status git (estagnado) |
| **NuP-Services** | 📄 Médio | `server/routes.ts` (passport-local), status git (estagnado) |
| **NupTechs-AIHub** | 📄 Médio | `backend/main.py` (FastAPI, sem auth), `server/routes.ts` (stub morto) |
| **nup-xlsx-core/preview/tokens/editor** | 📄 Médio | `package.json` (versões publicadas), grafo de peers, consumo pelo easynup |
| **nuptechs (site)** | 📄 Médio | `app/data/products.ts` (15 produtos), `next.config.js` (rewrites, CSP), `public/arquitetura/` |
| **nuptechs-nfc** | 📄 Raso | `NfcCardService.kt` (não é repo git) |

🔬 = leitura de código com extração de evidência citável · 📄 = leitura de manifesto/estrutura/status

---

## 2. Correções factuais aplicadas (README/EA inicial → código real)

A leitura profunda corrigiu afirmações que a primeira EA herdara de READMEs desatualizados. **Todas as correções abaixo já estão refletidas nos artefatos desta versão.**

| # | Afirmação anterior (incorreta) | Realidade (código) | Fonte |
|---|---|---|---|
| C1 | easynup tem 134 entidades | **210 entidades JPA** | `ls src/main/java/easynup/persistence/entities/` |
| C2 | easynup expõe 476 web services | **634 `WsV1`** (636 com `@Ws`) | `grep -rl 'class.*WsV1'` |
| C3 | easynup tem 175 migrations | **267 migrations**, última `0265_*` | `ls src/main/resources/db/migrations/` |
| C4 | nupai-gateway tem 14 portas | **17 portas** outbound exportadas | `ports/index.ts` |
| C5 | Sentinel expõe 11 MCP tools | **12 MCP tools** | `src/mcp/server.js` |
| C6 | Compliance Lei 14.133 ancorado no Sentinel/manifest | Sentinel gera **LGPD Art.37 + SOC2 + OPA genérico** — **zero Lei 14.133/Decreto 11.246/PNCP**. O 14.133 vive no **domínio do easynup** | `grep '14.133' manifest/server/generators/` = vazio; `ExerciseDataSubjectRightServiceV1.java:234` |
| C7 | Loop self-healing entrega o ciclo fechado | **Não fecha**: sem `LocalTestRunner`; "verify" = auto-crítica LLM, não execução de teste real. ADR-044 Onda 2 incompleta | `grep -ri testrunner nup-sentinel/src` = vazio; `pipeline-orchestrator.service.js` |
| C8 | nupai-gateway é deployável (pilar pronto) | **Sem deploy de produção** — sem Dockerfile do app, sem railway. Só infra dev | `apps/gateway/` |
| C9 | Sentinel usa LLM via porta nupai-core | **Desconectados** — Sentinel usa `@anthropic-ai/sdk` direto; composição do ADR-044 não wired | `grep nupai nup-sentinel/src` = vazio |
| C10 | RLS é defesa-em-profundidade ativa | **RLS DORMENTE** — sem `FORCE`, app conecta como superuser, `SET LOCAL` não wired → bypassado | `0263_*rls*.xml:24-47` |
| C11 | NuPIdentify é IdP SAML completo | **SAML é SP-only** (consome IdPs externos, não emite assertions) | `saml.service.ts` |
| C12 | NuPIdentify tem passkeys/WebAuthn | **Schema-only** — tabela existe, zero handlers/service | `identity.ts:70` + ausência de rotas |
| C13 | easynup consome nup-platform (payments/billing) | **Não consome** — bridge Java↔Streams é design, não wired. easynup usa audit-chain/nupai/nupidentity-sdk/xlsx-preview | grep cross-repo |
| C14 | (novo) — | **nup-aim tem `JWT_SECRET` hardcoded** versionado em `.replit` | `nup-aim/.replit` |
| C15 | (novo) — | **NuP-School tem `WEBHOOK_SECRET` real** hardcoded em `docker-compose.yml` | `NuP-School/docker-compose.yml:34` |
| C16 | (novo) — | **NuP-School processa biometria de menores** (foto-prova/face-match) — LGPD Art.11+14 | `server/modules/edu/use-cases/listar-foto-prova-runs.ts` |

---

## 3. Lista "NÃO CONFIAR" — documentos obsoletos excluídos da EA

Documentos identificados como desatualizados ou contraditórios com o código. **Nenhum foi citado como verdade nesta EA.**

| Documento | Data | Motivo da exclusão |
|---|---|---|
| `easynup/docs/baseline/*`, `docs/architecture/sprint-*-status.md` | pré-2026/04 | Declarado obsoleto pelo próprio AGENTS.md §6 |
| READMEs de contagem do easynup (134/476/175) | — | Defasados — usados os números de código (C1–C3) |
| `NuP-Chunks/NuP-Chunks_Architecture_Documentation.md` | 2025-09 | Diz embeddings via Mistral; código usa openai/anthropic |
| `NuP-Chunks/temporary_old_files/*` | — | Auto-declara obsolescência |
| `NuP-Services/replit.md` | 2025-09 | Scaffold Replit |
| `NupTechs-AIHub/{QUICKSTART,README,replit}.md` | 2025-12 | Descrevem só FastAPI; camada Node é stub morto |
| `nup-xlsx-*/replit.md`, `design_guidelines.md` | 2025-12 | Scaffolds de bootstrap pré-publicação |
| `Orbit/orbit-v{2,3,35}.jsx`, `orbit-platform.jsx` | 2026-04 | Protótipos superseded por `orbit-frontend/src/` |
| `Orbit/orbit-intelligence-brief-v4.md` | 2026-04 | Doc de marketing, não estado do sistema |
| `nuptechs/{SEO-PLANO,BLOG-PLANO,README}.md` | fev–mar 2026 | Docs de plano; README descreve estágio inicial já superado |
| `NuPIdentify/{AUTH-PERMISSION-*,ECOSYSTEM-GAP-ANALYSIS,ONDA-3.5-*}.md` (raiz) | abr 2026 | Diagnósticos com imprecisões (ex: ADR-0014 marca passkeys ✅ — código é schema-only) |
| `nupai-gateway/README.md` (contagem de portas/status) | — | Diz "14 ports" (são 17) e se contradiz sobre Postgres/SDK |
| `nup-sentinel-probe/README.md` (StoragePort) | — | Diz "planned"; código tem postgres-storage real |

---

## 4. Documentos confiáveis usados como apoio (frescos, batem com código)

- `easynup/docs/manual/areas-funcionais/*/README.md` — cabeçalhos de fidelidade datados 2026-05 (12 de 15 áreas 🟢; 3 🟡 revalidadas no código).
- `easynup/docs/adr/*` — 42 ADRs com data/status (verdade arquitetural §6).
- `nup-platform/docs/adr/0001-0008` — datados abr–mai 2026, batem com os pacotes.
- `NuPIdentify/docs/adr/ADR-0014` — Status *Proposed* (não Accepted) — tratado como roadmap, não realidade.

---

## 5. Lacunas de evidência conscientes (a fechar em próxima iteração)

O ADM é iterativo. Itens onde a evidência atual é parcial e que merecem aprofundamento:

1. **Enforcement real de RLS em runtime** — confirmado *provisionado* (0263) e *dormente*; falta validar o estado do role Postgres em produção (DBA).
2. **Áreas 🟡 do manual easynup** (`schema-as-code`, `generic-process-custom-fields`, `arcabouco-legal`) — revalidar afirmações finas no código antes de cravar.
3. **Algoritmo de hash de senha** do NuPIdentify — não inspecionado nesta passada.
4. **Backends correspondentes** de NuP-Salon e Orbit (repos separados) — não lidos.
5. **Estado de prod vs hml** dos segredos (`WEBHOOK_SECRET` School, fallback HMAC) — exige checar variáveis Railway de produção.

> Este registro é parte da governança (Fase G): toda revisão maior da EA atualiza as seções 1–3 antes de cravar novas afirmações.
