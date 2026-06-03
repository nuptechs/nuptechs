# System/Technology Matrix

> **Artefato TOGAF — Phase D.** Mapeia cada aplicação às tecnologias/plataformas que usa. Revela padrões de fato, divergências e o grau de portabilidade/on-prem. Complementa o [Technology Standards Catalog](../catalogs/technology-standards.md).

**Legenda:** ✅ usa · — não · 🔴 fora do padrão-alvo

---

## 1. Matriz aplicação × tecnologia (verificada por código)

| App ↓ | Runtime | Framework web | ORM | Banco | Cache/Fila | Frontend | Deploy | Observ. |
|---|---|---|---|---|---|---|---|---|
| **easynup** | Java 21 + Node 20 | Spring Boot 3.5.11 + Express 4.21 | JPA/Hibernate + Liquibase | PostgreSQL 16 | Redis | Vue 3.4 | ✅ Railway | ✅ OTel/Tempo/Prom/Grafana |
| **NuPIdentify** | Node 22 | Express | Drizzle | PostgreSQL (Neon driver) | Redis | React 18 | ✅ Railway (+Docker portável) | ✅ OTel/Prom/pino |
| **nup-platform** | Node 22 (lib) | — | — | (consumidor) | — | — | npm (GH Packages) | OTel adapter |
| **nupai-gateway** | Node 20 | Express | pg/pgvector | PostgreSQL | Redis | — | 🔴 **sem deploy** (só dev) | Langfuse |
| **nup-sentinel** | Node 20 | Express 5 | pg | PostgreSQL | — | React | ✅ Railway+Docker+Helm | ✅ Prometheus |
| **manifest** | Node 20 + Java | Express 5 | Drizzle | PostgreSQL | — | React 18 | ✅ Railway | 🟡 |
| **probe** | Node 20 | Express 4 + ws | — | (postgres-storage) | — | React 19 | 🟡 Docker (lib) | ✅ (é probe) |
| **codelens** | Node 20 + Java | Express | — | — | — | React 19 | npm/CLI | 🟡 |
| **NuP-School** | Node 20 | Express 5.2 | Drizzle | PostgreSQL (cluster 5433) | — | React 18 | ✅ Railway (RAILPACK) | 🟡 |
| **nup-study** | Node 20 | Express 4.21 + ws | Drizzle | PostgreSQL | — | React 18 | 🔴 Replit | 🔴 |
| **NuP-Sales** | Node 20 | Express 5.1 | Drizzle | PostgreSQL 16 | Redis | React 19 + RN/Expo | 🔴 sem deploy (compose) | 🟡 |
| **NuP-Salon-Client** | RN/Expo | — | — | — | — | React Native | ✅ EAS | 🔴 |
| **kan** | Node 20 | Express 4.21 | Drizzle | 🔴 Neon + 🔴 MongoDB | Redis/BullMQ | React 18 | 🔴 Replit | 🔴 |
| **nup-aim** | Node 20 | Express 4.21 | Drizzle | PostgreSQL | — | React 18 | 🔴 Railway+Netlify+Replit | 🔴 |
| **Orbit** | Node 20 | Express | pg | PostgreSQL | Redis/Bull | React 19 | 🟡 Railway+Vercel | 🔴 |
| **NupTechs-AIHub** | 🔴 Python 3.11 | FastAPI + LangChain | — | PostgreSQL | — | React 19 | 🔴 Replit | 🔴 |
| **NuP-Chunks** | 🔴 Python 3.11 | Flask | SQLAlchemy | PostgreSQL | — | Next.js 14 | 🔴 Replit | 🔴 |
| **NuP-Services** | Node 20 | Express 4.21 | Drizzle | 🔴 Neon | — | React 18 | 🔴 Replit | 🔴 |
| **nuptechs (site)** | Node 20 | Next.js 14 | Drizzle | PostgreSQL | — | React 18 | ✅ Railway+Vercel | 🟡 |

---

## 2. Padrões de fato (consolidados por código)

| Categoria | Padrão dominante | Cobertura | Exceções |
|---|---|---|---|
| Runtime backend | **Node 20+ (ESM)** | ~16 apps | easynup (+Java 21), AIHub/Chunks (Python) |
| ORM | **Drizzle** | ~12 apps | easynup (JPA), Chunks (SQLAlchemy) |
| Banco | **PostgreSQL 16** | universal | 🔴 Neon (Services, kan), 🔴 +MongoDB (kan) |
| Frontend | **React + Vite** | maioria | easynup (Vue), site (Next.js) |
| Cache/fila | **Redis** | easynup/Identify/Sales/Orbit/kan | — |
| Auth | **OIDC via NuPIdentify** | ~70% | satélites (auth própria) |
| Deploy | **Railway+Docker** | 8 apps | 🔴 Replit (5), gateway (nenhum) |

---

## 3. Análise de portabilidade / on-prem (requisito gov)

| Nível | Apps | Avaliação |
|---|---|---|
| **On-prem-ready** (Docker + healthcheck + migrations no startup) | easynup, NuPIdentify, Sentinel, manifest | 🟢 Vendável a cliente gov com requisito on-prem |
| **Deployável mas não portável** | School (RAILPACK), site, Orbit | 🟡 |
| **Não deployável / Replit** | study, Services, Chunks, kan, AIHub, **nupai-gateway** | 🔴 Bloqueia on-prem |

> **NuPIdentify é o exemplar de portabilidade** — Dockerfile com claim explícito "Railway/AWS ECS/GCP Cloud Run/Azure/Fly.io", non-root, tini, healthcheck, migrations no entrypoint. É o template-alvo (PT-01).

---

## 4. Divergências priorizadas

| # | Divergência | Severidade | Resolução |
|---|---|---|---|
| 1 | **nupai-gateway sem deploy** | 🔴 Alta | Criar Dockerfile + railway (Onda 2.b) — bloqueia o pilar P3 |
| 2 | **5 apps em Replit** (study/Services/Chunks/kan/AIHub) | 🔴 Alta | Migrar para Docker/Railway (Onda 3) |
| 3 | **Neon + MongoDB** (kan, Services) | 🟡 Média | Consolidar em Postgres gerenciado |
| 4 | **Python (AIHub/Chunks)** coexistindo | 🟡 Média | Absorver capacidades no gateway (Node) ou manter se for serviço de IA dedicado |
| 5 | **Stripe API version divergente** (School vs Sales) | 🟡 Média | Centralizar no `payments-core` |
| 6 | **Observabilidade ausente** na maioria | 🟡 Média | Stack OTel padrão (Onda 3) |
| 7 | Express 4 vs 5; React vs Vue | 🟢 Baixa | Tolerável; padronizar gradualmente |

> O par de divergências #1 e #2 são as que mais atrapalham o pitch on-prem/escala — e ambas têm resolução clara nas ondas.
