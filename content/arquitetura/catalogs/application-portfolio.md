# Catálogo de Aplicações (Application Portfolio Catalog)

> **Artefato TOGAF de conteúdo.** Ficha técnica de cada um dos 24 repositórios ativos da NuPTechs, baseada em evidência lida do código em 2026-06-02. Ordenado por tipo e maturidade.

**Legenda de maturidade:** 🟢 Produção · 🟡 MVP/ativo · 🔴 Estagnado/experimento

---

## Pilares de plataforma

### NuPIdentify 🟢
- **Papel:** Pilar P1 — Provedor de identidade (IdP) central do parque.
- **Stack:** Node/TS (ESM), Express 4, PostgreSQL (Drizzle), Redis (ioredis), React 18 + Vite + Radix. Auth: `openid-client`, `@node-saml/node-saml`, `otplib`, `@simplewebauthn`, `jsonwebtoken`. OTel + prom-client + pino. Stripe (billing), Resend (email), GCS.
- **Capacidades:** OIDC/OAuth2 (auth_code + device_code), SAML IdP, SCIM, MFA/TOTP + passkeys, RBAC + ABAC + ReBAC (Zanzibar), orgs/teams multi-tenant, licenciamento/billing por sistema, webhooks, simulador de permissões.
- **Domínio:** schema Drizzle por domínio (`identity/rbac/abac/rebac/oidc/saml/scim/licensing/billing`); 40+ rotas; `system_manifests` é a fonte de permissões do parque.
- **Integrações:** É o IdP (não autentica contra terceiros). Provê SSO para easynup, School, Study, Sales, kan, AIM, Sentinel via `register-*-client.ts`. Externos: Stripe, Resend, GCS.
- **Deploy:** Railway + Dockerfile portável (AWS/GCP/Azure/Fly). Migrations no startup.
- **Maturidade:** 🟢 Produção. ~51k LOC server; 202 arquivos de teste; Playwright E2E; Stryker mutation; fast-check.

### nup-platform 🟢
- **Papel:** Pilar P2 — Monorepo de pacotes compartilhados `@nuptechs/*`.
- **Stack:** TypeScript puro, Node ≥22, Turborepo + npm workspaces, tsup (ESM/CJS), Vitest, Biome, Changesets.
- **Capacidades:** pagamentos multi-PSP (Stripe/MercadoPago) com outbox+idempotência; billing/assinaturas + runtime + admin; payment-link + customer-portal; commerce; delivery/geo; conferência (mediasoup SFU + HLS); messaging (core/react/vue); voice-agent; CLI nup-suite; shared-kernel (Money/CPF/Email/idempotência).
- **Domínio:** ~30 pacotes (`shared-kernel`, `platform-ports/adapters`, `payments-core`, `billing*`, `commerce`, `messaging-*`, `conference-*`, `voice-agent-*`, `nup-suite`).
- **Integrações:** Consumido por NuP-School (13 pkgs), NuP-Sales, NuP-Salon, NuPIdentify. Event bus Postgres Outbox + Redis Streams; consumidores Java via webhook.
- **Deploy:** Sem deploy próprio — `changeset publish` → GitHub Packages.
- **Maturidade:** 🟢 Produção (pacotes core 0.2–1.0). 149 arquivos de teste; 8 ADRs. ~35,7k LOC.
- **Nota:** Este é o repositório que hospeda esta EA (`docs/enterprise-architecture/`).

### nupai-gateway 🟡
- **Papel:** Pilar P3 (pretendido) — Gateway de LLM provider-agnostic hexagonal.
- **Stack:** TS, Node ≥20.11, Turborepo, Vitest. LiteLLM, Langfuse, LLM Guard, BAML, Inngest, MCP. Adapters: Anthropic, OpenAI, LiteLLM, Pinecone, Postgres/pgvector, Redis, Langfuse, Cohere.
- **Capacidades:** chat OpenAI-compatible com `quality` policy; recipes versionadas de RAG; vector store + hybrid search + reranker + semantic cache; gestão multi-tenant de projetos/API keys; guardrails; observabilidade; MCP inbound.
- **Domínio:** bounded contexts (`project/recipe/retrieval/execution/eval/billing/policy`); **17 ports outbound** (README diz 14 — desatualizado); 6 use cases.
- **Integrações:** Auth própria por API key (`nupai_*`), **não** via IdP. Inclui `@nuptechs/audit-chain` + chat-bridge (usado pelo easynup /chat-ia).
- **Deploy:** Só infra dev (docker-compose). **Deploy de produção não evidenciado** — lacuna a fechar na Onda 2.b.
- **Maturidade:** 🟡 Funcional/early. ~13,7k LOC. Vários itens "planned" (BAML, filesystem loader, SDK/CLI).

### nup-sentinel 🟢
- **Papel:** Pilar P4 (hub) — Orquestrador de inteligência de código.
- **Stack:** Node ≥20 ESM, Express 5, pg, node-cron, prom-client, ws, MCP SDK, Anthropic SDK. React SPA (`packages/web`). 17 ports hexagonais.
- **Capacidades:** correlaciona findings de 5 fontes (dedup por símbolo, eleva confiança); ingest Finding v2 + SARIF 2.1; pipeline finding→diagnose→correct→verify→open-PR; 4 verifiers (Constitutional/CoVe/TestFilter/Composite); abre PR real no GitHub; cron interno (codelens-emit + detectores).
- **Integrações:** codelens (cron emit), NuPIdentify (PKCE public), Anthropic (AIPort), OpenAI (embeddings), probe (webhook HMAC). MCP server com 12 tools (consumido por Claude Code).
- **Deploy:** Railway + Docker Compose + Helm chart + ghcr.io + npm `@nuptechs/sentinel`.
- **Maturidade:** 🟢 Mais maduro da suite. ~30k LOC. ADR-044 Onda 1 entregue; **loop self-healing NÃO fecha** — não há `LocalTestRunner`; o "verify" é auto-crítica de LLM (Constitutional/CoVe) + sanidade de patch, **não execução de teste real** (`pipeline-orchestrator.service.js`). Onda 2 incompleta.

### nup-sentinel-manifest 🟢
- **Papel:** Pilar P4 (análise estática auth/schema) — "sabe o que existe".
- **Stack:** TS, Node 20, Drizzle+Postgres, Express 5, React 18 + Radix, openai, jose. Sub-engine Java. Extensão VSCode.
- **Capacidades:** repository-scanner + analyzers; 8 geradores (manifest, OpenAPI 3.0, Policy Matrix, **OPA Rego**, compliance-report, NuPIdentity bundle, AGENTS.md, Keycloak realm); SecurityOmissionEngine (permission drift).
- **Integrações:** → nup-sentinel (Finding v2 `auto_manifest`); NuPIdentify (auth_code confidential). openai direto.
- **Deploy:** Railway + Dockerfile + nixpacks. 🟢 v1.0.0 produção. ~33,7k LOC TS + 1,3k Java.
- **Nota (corrigida por código):** gera **compliance LGPD Art. 37 + SOC2 + OPA/Policy genérico** — `grep '14.133|11.246|pncp'` nos geradores = **vazio**. O "compliance setor público BR (Lei 14.133/Decreto 11.246/PNCP)" **NÃO existe no Sentinel**; vive no **domínio do easynup** (ex: `ExerciseDataSubjectRightServiceV1.java:234`). Ver [EVIDENCE-REGISTER C6](../EVIDENCE-REGISTER.md).

### nup-sentinel-probe 🟡
- **Papel:** Pilar P4 (captura runtime).
- **Stack:** TS 5.7 strict, Node ≥20 ESM, Turborepo (9 packages), Playwright, Express 4 + ws, React 19 dashboard.
- **Capacidades:** captura multi-camada (browser/network/logs/DB interceptors pg/mysql/mongo/redis); correlation engine (request-id/temporal/url); relatórios HTML/JSON/MD; SDK Node+browser; dashboard real-time.
- **Integrações:** → nup-sentinel via webhook HMAC-SHA256 (anti-replay); correlação cross-process com easynup via `metadata.probeSessionId`. Sem OIDC/Pinecone/LLM.
- **Deploy:** Docker multi-stage. Sem Railway (lib/SDK + server local). 🟡 v0.1.0. ~37k LOC.

### codelens 🟢
- **Papel:** Pilar P4 (análise AST/grafo) — repo `nup-sentinel-code`.
- **Stack:** TS monorepo (npm workspaces, Node ≥20). TS Compiler API; Vue via `@vue/compiler-sfc`; Java via jar JavaParser. Web React 19 + Vite + Monaco + Sigma. CLI Express + commander. Anthropic SDK.
- **Capacidades:** scan, grafo imports, PageRank/entry-points, símbolos/reachability/dead-branch, dead-code (knip), explicação PT por IA com validação byte-a-byte de citações + cache, UI navegável.
- **Integrações:** → nup-sentinel (`sentinel-client.ts`, emit dead_code via reusable GH workflow). Anthropic only.
- **Deploy:** npm/monorepo + jar Maven. Consumido como CLI/CI. 🟢 (README desatualizado diz "stub", código vai além). ~12,9k LOC TS + 211 Java.

---

## Produtos verticais

### easynup 🟢 — FLAGSHIP
- **Papel:** Produto-bandeira — gestão de contratos públicos de TI (Lei 14.133/2021).
- **Stack:** Vue 3.4 + Naive UI + TanStack Query (frontend); Express ESM Node ≥20 (gateway); Spring Boot + Java 21 + JPA/Hibernate/Liquibase (backend); PostgreSQL 16 + Redis; Tempo/Prometheus/Grafana.
- **Capacidades:** 15 áreas funcionais — contratos, workflow engine + rules + human tasks, aceite + SLA + divergências, profissionais + timesheet, análises de tamanho (PF/SnapPoint/UST), generic process + custom fields, Document Intelligence + IA + RAG + voice, compliance + audit + permissões, financeiro, arcabouço legal, Schema-as-Code, apoio à decisão (DecisionAdvice), absorção de demandas externas, mensagens i18n.
- **Domínio:** 210 entidades JPA; 266 migrations Liquibase; 637 web services `WsV1`; 39 arquivos de rota no gateway.
- **Integrações:** NuPIdentify (OIDC systemId=easynup + ReBAC + DataScope); Anthropic (porta hex); Pinecone+pgvector (RAG legal isolado por tenant); Tolgee (i18n + webhook HMAC); `@nuptechs/nup-xlsx-preview`; Sentinel (MCP, ADR-044).
- **Arquitetura:** 6 ports & adapters; Schema-as-Code (ConfigDefinition/Version/Draft); FEEL/DMN engine; audit HMAC chain cross-process.
- **Deploy:** Railway HML automático; produção manual (`DEPLOY_PROD=1`).
- **Maturidade:** 🟢 Muito alta. 42 ADRs. **~608k LOC** (Java ~201k, Vue ~213k, TS ~71k, JS ~123k).

### NuP-School 🟢
- **Papel:** Gestão escolar (educação básica).
- **Stack:** React 18.3 + Vite 6 + TS, React Router 6, TanStack Query, Radix/Tailwind. Express 5 ESM, Drizzle, PostgreSQL, node-cron.
- **Capacidades:** dashboard, alunos/famílias, faltas, ocorrências, ouvidoria+denúncia anônima, autorizações, carteirinhas QR, mural, reserva de salas, armários, calendário, BNCC, avaliações, gamificação, aula ao vivo (mediasoup), campanhas, pagamentos (Stripe), voice-agent (ElevenLabs).
- **Domínio:** ~54 tabelas core + schemas por módulo (~118 pgTable).
- **Integrações:** NuPIdentify (OIDC + ReBAC sync); 13 pacotes `@nuptechs/*` (billing/payments/voice/platform); Stripe; ElevenLabs; mediasoup; Sentinel/Probe/Manifest. **Banco compartilhado** com NuP-Salon (5433).
- **Deploy:** Railway (RAILPACK, db:migrate + voice:sync no preDeploy).
- **Maturidade:** 🟢 Produção. 671 commits. ~210k LOC.

### nup-study 🟢
- **Papel:** Plataforma de aprendizagem adaptativa com IA (concursos).
- **Stack:** React 18.3 + Vite 5 + TS, Wouter, TanStack Query, i18next. Express 4 ESM + express-ws, Drizzle, PostgreSQL.
- **Capacidades:** tutoria IA, diagnóstico, mapas mentais (xyflow), flashcards+SRS, quizzes, metas, simulado preditivo, análise de edital, RAG (Pinecone), ingestão de materiais, voice agent, PWA.
- **Domínio:** 276 exports de schema (prefixo `nup_study`).
- **Integrações:** NuPIdentify (OIDC + permissions sync); OpenAI + Anthropic + Gemini; Pinecone; Telegram/WhatsApp; GCS/Uppy; ElevenLabs. Declara-se standalone (sem `@nuptechs/*`).
- **Deploy:** Replit/Docker/manual (sem railway.toml). 🔴 infra.
- **Maturidade:** 🟢 Maduro (1.854 commits, ~151k LOC), mas acoplado só ao IdP.

### NuP-Sales 🟡
- **Papel:** Varejo/comércio (PDV + e-commerce + fidelidade), 3 perfis.
- **Stack:** Turborepo. Express 5 + Drizzle (hexagonal). React 19 + Vite 6 + Tailwind 4. React Native + Expo (mobile). PostgreSQL 16 + Redis.
- **Capacidades:** catálogo, estoque, pedidos, carrinho, wishlist, PDV/caixa, cupons, fidelidade, referral, avaliações, lojas/localização.
- **Domínio:** domínio hexagonal rico (product/order/cart/loyalty/referral) + VOs (money/cpf).
- **Integrações:** NuPIdentify (OIDC/PKCE web+mobile); Stripe (via payments-core); WhatsApp + Expo Push.
- **Deploy:** Railway + Dockerfile + Caddyfile; mobile EAS.
- **Maturidade:** 🟡 MVP novo bem arquitetado (43 commits). ~31k LOC.

### kan 🟡
- **Papel:** Kanban (boards/tasks/WIP/analytics/colaboração) — "NuP-Kan".
- **Stack:** Express + Drizzle + PostgreSQL (Neon), Redis/BullMQ, passport/openid-client. React 18 + Vite + shadcn + Wouter + react-beautiful-dnd. CQRS + microservices internos.
- **Capacidades:** boards/tasks/columns + WIP, tags, custom fields, task events (audit), assignees, board sharing, teams N:N, export PDF/xlsx, email SendGrid.
- **Domínio:** 21 tabelas Drizzle.
- **Integrações:** NuPIdentify (`permissions.json` sync 5min + valida JWT). SendGrid. Neon.
- **Deploy:** Replit Autoscale. 🟡 MVP recente (último commit 2026-06-01). ~31,9k LOC.

### NuP-Salon-Client 🟡
- **Papel:** App mobile cliente de salão/barbearia (white-label por shop).
- **Stack:** React Native 0.83 + Expo 55 + React 19 + TS, React Navigation, socket.io-client. EAS Build.
- **Capacidades:** auth, onboarding, seleção de loja, agendamento, fila real-time (WS), chat, carrinho/checkout, Pix, histórico, mapa, promoções, referral, push.
- **Integrações:** backend próprio `nup-salon-production.up.railway.app`; `@nuptechs/commerce` + `@nuptechs/shared-kernel`; WhatsApp. **Não** usa NuPIdentify.
- **Deploy:** EAS + Expo Updates. 🟡 Ativo (v1.1.0, último commit 2026-06-01). ~6,7k LOC (só cliente).

### nup-aim 🟡
- **Papel:** Impact Analysis Generator (análise de impacto + FPA IFPUG).
- **Stack:** Express + TS, Drizzle (schema `nup_aim`), React 18 + Vite + Tailwind. JWT + bcrypt.
- **Capacidades:** auth + RBAC, auto-save, import IA, OCR (Vision/Tesseract/TF), export .docx, pipeline FPA IFPUG CPM 4.3.1 de 5 estágios com detecção de alucinação por citação.
- **Integrações:** NuPIdentify (OIDC opt-in, SDK vendorizado); Gemini (primário) + Anthropic/OpenAI nas deps; Vision/SendGrid/Resend.
- **Deploy:** Railway + Netlify ambos presentes (ambíguo); origem Replit.
- **Maturidade:** 🟡 Produto ativo (v1.0.0). ~34k LOC. **Sobrepõe `PfAnalysis` do easynup.**

### Orbit 🟡
- **Papel:** Plataforma de marketing digital com IA (geração de conteúdo para PMEs).
- **Stack:** Node 20 + Express ESM + PostgreSQL + Redis/Bull (hexagonal). React 19 + Vite 6 + Tailwind 4.
- **Capacidades:** content director, geração de copy, positioning, competitive intel, nurture, optimizer, GBP, meta-ads, billing (Free/Pro/Enterprise), 90 endpoints, 87 E2E.
- **Integrações:** Anthropic, Meta/IG/FB, LinkedIn, YouTube/GBP, HeyGen, ElevenLabs, Instantly, Resend, WhatsApp, Stripe. Auth API key própria. **Não** usa IdP nem `@nuptechs/*`.
- **Deploy:** Backend Railway + Frontend Vercel.
- **Maturidade:** 🟡 MVP/experimento. ~15,3k LOC. ⚠️ **`ANTHROPIC_API_KEY` + `ENCRYPTION_KEY` hardcoded no docker-compose** — risco crítico.

### NupTechs-AIHub 🟡
- **Papel:** Hub centralizado de serviços de IA.
- **Stack:** Python 3.11 + FastAPI + LangChain (backend); React 19 + Vite + Shadcn + Wouter (frontend); Node/Express host. PyMuPDF/pdfplumber/Tesseract.
- **Capacidades:** chat multi-provider, extração de docs, catálogo `/api/services` (riscos, function-points, code-review, flashcards, mindmap, summarize), análise de contratos RAG, sumarização hierárquica, API OpenAI-compatible. Fine-tuning planejado.
- **Integrações:** Ollama (local, túnel Cloudflare) → OpenAI → Anthropic; Pinecone (`nuptechs-contracts-v2`). **Não** usa NuPIdentify.
- **Deploy:** Replit Autoscale. 🔴 infra frágil (LLM primário num Mac via túnel).
- **Maturidade:** 🟡 Misto (último commit 2026-04-15). ~5,4k Python + ~9,5k TS. **Capacidade sobrepõe gateway + Chunks + easynup.**

### NuP-Chunks 🔴
- **Papel:** Pré-processamento de documentos + RAG + chat semântico.
- **Stack:** Flask + SQLAlchemy + gunicorn, Python 3.11, PostgreSQL. Frontend Next.js 14 + React 18. Pinecone + Mistral + Claude + OpenAI.
- **Capacidades:** upload multi-formato, chunking contextual por domínio, embeddings, busca semântica com isolamento por ContentSpace/Context, chat RAG, API key auth, batch, mindmap/summarizer.
- **Integrações:** Pinecone, Mistral, Anthropic, OpenAI. **Não** usa IdP nem `@nuptechs/*`.
- **Deploy:** Replit Autoscale. 🔴 Estagnado (último commit 2026-04-15; pasta `temporary_old_files`).
- **Maturidade:** 🔴 MVP estagnado. ~91,8k linhas (inflado). **RAG candidato a virar recipe do gateway.**

### NuP-Services 🔴
- **Papel:** Marketplace hiperlocal de serviços (profissionais por prédio/bairro).
- **Stack:** React 18.3 + Vite + TS, Wouter, TanStack Query. Express 4 ESM, Drizzle, **Neon serverless**, Socket.io.
- **Capacidades:** cadastro de profissionais, busca por categoria/localização/prédio, perfis/portfólios, chat (Socket.io), reviews.
- **Domínio:** 9 tabelas Drizzle (UUID PKs).
- **Integrações:** **Auth própria** (passport-local + bcrypt). Sem `@nuptechs/*`, sem externos. Neon.
- **Deploy:** Replit Autoscale. 🔴 MVP/parado (último commit 2026-04-15 — o mais antigo). ~13k LOC. **Outlier total** — fora de todos os contratos de plataforma.

---

## Bibliotecas publicadas (família nup-xlsx)

### nup-xlsx-core 🟢
- Parser .xlsx/CSV leve, Edge-compatible, com resolução de estilos. TS puro + tsup + fflate (única dep). Publicado `@nuptechs/nup-xlsx-core@0.1.1` (GH Packages). É peer de `preview`. ~4,7k LOC. Último commit 2026-06-01.

### nup-xlsx-preview 🟢
- Componente de visualização Excel (virtual scroll 100K+ linhas, adapters React/Vue/Vanilla). Publicado `@nuptechs/nup-xlsx-preview@1.1.4`. **Consumido pelo easynup** (`SpreadsheetImport.vue` via `/vue`). ~14k LOC.

### nup-xlsx-tokens 🟢
- Design tokens para estilos de Excel (4 temas, WCAG, <15KB). Publicado `@nuptechs/nup-xlsx-tokens@0.2.0`. Peer opcional de `preview`. ~10,7k LOC.

### nup-xlsx-editor 🟡
- Editor estilo Google Sheets (WebGL, fórmulas). Demo `rest-express` (Replit) — **lib ainda não extraída/publicada**. ~7,7k LOC. Último commit 2026-04-15.

---

## Site e utilitários

### nuptechs 🟢
- **Papel:** Portal institucional + vitrine comercial.
- **Stack:** Next.js 14 + React 18 + Tailwind 4 + Drizzle/postgres + AI SDK + Pinecone + Resend + jose.
- **Capacidades:** landing, produtos/serviços/blog, i18n (`[lang]`), Schema Markup SEO, `/api/schedule`, admin. Hospeda os pitch sites EasyNuP (`/easynup`, `/easynup2`) e demos de segmento (`/padaria`, `/salao`, etc.).
- **Portfólio declarado publicamente:** 16 produtos (EasyNuP, NuPIdentify, nupai-gateway, NuP-Services, School, Sales, Debug Probe, Manifest, Sentinel, Chunks, AIM, Study, AIHub, KAN, XLSX Editor).
- **Deploy:** Railway + Vercel. 🟢 Produção (último commit 2026-06-01).

### nuptechs-nfc (utilitário)
- **Papel:** App Android HCE que emula tag NFC apontando para `nuptechs.com/comercial` (cartão de visita digital).
- **Stack:** Kotlin + Android Gradle (HostApduService ISO 7816-4).
- **Maturidade:** Utilitário interno. **Não é repositório git** (só pasta com build). ~293 LOC Kotlin. Datado 2026-04-16.
