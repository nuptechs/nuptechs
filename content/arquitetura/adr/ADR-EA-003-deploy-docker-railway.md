# ADR-EA-003 — Docker + Railway como padrão de deploy de produção

| | |
|---|---|
| **Status** | ✅ Accepted |
| **Data** | 2026-06-03 |
| **Decisor** | Yuri F. (Architecture Owner) |
| **Princípio** | [PT-01 Deploy reprodutível e portável](../catalogs/principles-catalog.md) |
| **Requisitos** | REQ-TECH-01, REQ-TECH-04 |
| **Onda** | T3 (WP-INFRA) |

## Context
O deploy é disperso: Railway+Docker (8 apps), Vercel (frontends), EAS (mobile), e **5 serviços de produção em Replit** (study, Services, Chunks, kan, AIHub) + bancos em Neon/MongoDB. Replit não é infra de produção (sem reprodutibilidade, sem on-prem). On-prem é requisito de venda no setor público.

## Decision
**Todo serviço deployável segue o template:** Dockerfile multi-stage + healthcheck + migrations no startup + `.env.example` completo, rodável em **Railway** (HML auto em push para `main`; produção manual) **ou em cloud genérica/on-prem** (a imagem OCI é portável). O NuPIdentify (Dockerfile non-root + tini + claim Railway/AWS/GCP/Azure/Fly) é o **template de referência**. Frontends estáticos em Vercel e mobile em EAS permanecem (são apropriados). Replit fica só para protótipo.

## Consequences
- **Positivas:** reprodutibilidade; on-prem uniforme (pitch gov); base para o golden path de deploy da fábrica.
- **Custo:** migrar 5 apps do Replit; sair de Neon/Mongo para Postgres gerenciado.
- **Nota:** o **nupai-gateway não tem deploy nenhum** hoje — criar o seu Dockerfile é parte de WP-IA-0 (ADR-EA-002), não de WP-INFRA.

## Conformidade
Verificável por: presença de Dockerfile + healthcheck + `.env.example` em todo serviço; zero serviços de produção em `.replit`.
