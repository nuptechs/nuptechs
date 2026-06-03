# Catálogo de Padrões de Tecnologia (Technology Standards Catalog)

> **Artefato TOGAF de conteúdo.** O padrão-alvo por categoria tecnológica e o grau de conformidade de cada repositório. Serve de checklist para a governança de implementação (Fase G).

---

## 1. Padrões-alvo por categoria

| Categoria | Padrão-alvo | Justificativa |
|---|---|---|
| **Linguagem backend (apps)** | TypeScript + Node ≥20 (ESM) | Padrão de fato em ~18 repos |
| **Linguagem backend (escala/core)** | Java 21 + Spring Boot | Apropriado ao easynup (208k LOC) |
| **ORM (Node)** | Drizzle ORM | Dominante; type-safe |
| **ORM (Java)** | JPA/Hibernate + Liquibase | Migrations numeradas governadas |
| **Banco relacional** | PostgreSQL 16 (gerenciado) | Universal no parque |
| **Cache/fila/sessão** | Redis | Padrão consolidado |
| **Vetor/RAG** | Pinecone + pgvector via `nupai-gateway` | Centralizar governança |
| **Frontend** | React + Vite + Radix/Tailwind | Maioria (easynup=Vue é exceção tolerada) |
| **Monorepo** | Turborepo + npm workspaces | Padrão para multi-pacote |
| **Build de lib** | tsup (ESM+CJS) | Padrão nup-platform |
| **Identidade** | OIDC via NuPIdentify | Pilar P1 |
| **IA** | `nupai-gateway` (porta hexagonal) | Pilar P3 |
| **Pagamentos** | `@nuptechs/payments-core` | Pilar P2 |
| **Auditoria** | `@nuptechs/audit-chain` (HMAC) | Diferencial de compliance |
| **Deploy** | Dockerfile + Railway (healthcheck + migrations) | Reprodutível + on-prem |
| **Observabilidade** | OpenTelemetry → Tempo/Prometheus/Grafana | Padrão easynup |
| **Logs** | pino (estruturado) | Padrão Node |
| **Testes** | Vitest/Jest (Node), JUnit 5 (Java), Playwright (E2E) | Consolidado |
| **Lint/format** | Biome ou ESLint + regras custom em ERROR | Gate de CI |
| **Decisões** | ADR em `docs/adr/` | Governança |
| **Commits/PR** | Conventional commits + merge commit (worktree) | Fluxo maduro |

---

## 2. Conformidade por repositório

Legenda: ✅ conforme · 🟡 parcial · 🔴 divergente · — n/a

| Repositório | Backend | ORM | Auth (IdP) | IA (gateway) | Deploy | Observ. | ADR |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **easynup** | ✅ Java | ✅ JPA | ✅ | 🔴 adapter | ✅ Railway | ✅ OTel | ✅ 42 |
| **NuPIdentify** | ✅ Node | ✅ Drizzle | (é o IdP) | — | ✅ Railway | ✅ OTel | ✅ |
| **nup-platform** | ✅ TS lib | — | — | — | — npm | 🟡 | ✅ 8 |
| **nupai-gateway** | ✅ Node | ✅ pg | 🔴 API key | (é o gateway) | 🔴 só dev | 🟡 Langfuse | 🟡 |
| **nup-sentinel** | ✅ Node | ✅ pg | ✅ PKCE | 🟡 porta hex | ✅ Railway+Helm | ✅ prom | ✅ |
| **manifest** | ✅ Node | ✅ Drizzle | ✅ conf. | 🔴 openai direto | ✅ Railway | 🟡 | ✅ |
| **probe** | ✅ Node | 🟡 planned | — | — | 🟡 Docker | ✅ (é probe) | 🟡 |
| **codelens** | ✅ Node | — | — | 🔴 Anthropic | — npm | 🟡 | 🔴 |
| **NuP-School** | ✅ Node E5 | ✅ Drizzle | ✅ ReBAC | 🔴 ElevenLabs direto | ✅ Railway | 🟡 | 🔴 |
| **nup-study** | 🟡 Node E4 | ✅ Drizzle | ✅ | 🔴 3 providers | 🔴 Replit | 🔴 | 🔴 |
| **NuP-Sales** | ✅ Node E5 | ✅ Drizzle | ✅ PKCE | — | ✅ Railway | 🟡 | 🔴 |
| **kan** | ✅ Node | ✅ Drizzle | ✅ sync | — | 🔴 Replit | 🔴 | 🔴 |
| **NuP-Salon-Client** | — mobile | — | 🔴 própria | — | ✅ EAS | 🔴 | 🔴 |
| **nup-aim** | ✅ Node | ✅ Drizzle | 🟡 opt-in | 🔴 Gemini direto | 🟡 ambíguo | 🔴 | 🔴 |
| **Orbit** | ✅ Node | ✅ pg | 🔴 API key | 🔴 Anthropic direto | 🟡 Railway+Vercel | 🔴 | 🔴 |
| **NupTechs-AIHub** | 🔴 Python | 🟡 | 🔴 nenhuma | 🔴 Ollama+ | 🔴 Replit | 🔴 | 🔴 |
| **NuP-Chunks** | 🔴 Python | 🔴 SQLAlchemy | 🔴 API key | 🔴 Mistral+ | 🔴 Replit | 🔴 | 🔴 |
| **NuP-Services** | 🟡 Node E4 | ✅ Drizzle | 🔴 própria | — | 🔴 Replit | 🔴 | 🔴 |
| **nup-xlsx-core/preview/tokens** | ✅ TS lib | — | — | — | ✅ npm | — | 🟡 |
| **nuptechs (site)** | ✅ Next | ✅ Drizzle | 🟡 jose | 🔴 OpenAI direto | ✅ Railway+Vercel | 🟡 | 🔴 |

---

## 3. Divergências priorizadas (o que padronizar primeiro)

### Prioridade 1 — resolvidas pelas ondas de consolidação
1. **IA direto (sem gateway)** — 9 repos 🔴. Resolvido pela Onda 2.
2. **Auth própria** — Services/Chunks/Orbit/AIHub/Salon 🔴. Resolvido pela Onda 1.
3. **Deploy em Replit** — study/Services/Chunks/kan/AIHub 🔴. Resolvido pela Onda 3.

### Prioridade 2 — endurecimento
4. **Observabilidade ausente** na maioria dos verticais — adotar OTel padrão (Onda 3, G7).
5. **Sem ADR** nos verticais — adotar governança ao entrar na consolidação.
6. **Backend Python** (AIHub/Chunks) — justificável só se for serviço de IA; senão absorver no gateway.

### Prioridade 3 — cosmético / tolerável
7. **Express 4 vs 5** — padronizar em 5 gradualmente.
8. **Router (React Router vs Wouter)** — sem ação necessária.
9. **Vue (easynup) vs React (resto)** — manter; easynup é grande demais para migrar e não há ganho.
10. **Branding `@aspect` → `@nuptechs`** nos READMEs xlsx — correção rápida.

---

## 4. Padrões arquiteturais de excelência (a preservar e propagar)

Estes não são "divergências" — são **boas práticas já presentes** que devem virar padrão explícito:

| Padrão | Origem | Propagar para |
|---|---|---|
| **Ports & Adapters** | easynup, gateway, Sentinel, Sales, Orbit | Todo novo serviço |
| **Schema-as-Code** | easynup (ADR-006+) | Configurabilidade de outros produtos |
| **Audit HMAC chain** | easynup + audit-chain | Todo produto com dado sensível |
| **Manifesto de permissões + sync** | easynup, kan, Sentinel | Todo consumidor do IdP |
| **Anti-alucinação por citação verificada** | easynup, codelens, nup-aim | Toda feature de IA |
| **Outbox + idempotência** | nup-platform payments | Toda integração assíncrona |
| **Worktree + PR merge-commit** | easynup AGENTS.md | Todo repositório |
| **Diátaxis para docs** | easynup manual | Documentação de produto |

---

## 5. Checklist de conformidade para novo produto

Antes de declarar um produto "cidadão da plataforma", verificar:

- [ ] Autentica via NuPIdentify (client registrado + `permissions.json` + sync)
- [ ] Toda IA passa pelo `nupai-gateway`
- [ ] Capacidades transversais (pagamento/billing/messaging) via `@nuptechs/*`
- [ ] Dado sensível registra na cadeia `@nuptechs/audit-chain`
- [ ] Multi-tenant por `organization_id` + DataScope/ReBAC
- [ ] Dockerfile + healthcheck + migrations no startup + `.env.example`
- [ ] Deploy em Railway (ou cloud genérica), **não Replit**
- [ ] Observabilidade OTel
- [ ] Decisões de padrão em ADR
- [ ] Nenhum segredo versionado
