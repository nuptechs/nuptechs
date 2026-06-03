# ADR-EA-001 — NuPIdentify é o IdP único obrigatório do parque

| | |
|---|---|
| **Status** | ✅ Accepted |
| **Data** | 2026-06-03 |
| **Decisor** | Yuri F. (Architecture Owner) |
| **Princípio** | [PA-01 Identidade centralizada](../catalogs/principles-catalog.md) |
| **Requisitos** | REQ-ID-01, REQ-ID-03 ([ARS](../09-architecture-requirements-specification.md)) |
| **Onda** | T1 (WP-ID) |

## Context
A adoção de identidade é desigual (~70%): easynup, School, Study, Sales, kan e AIM integram NuPIdentify; **Services, Chunks, Orbit, AIHub e Salon usam auth própria** (sessão/API key). Coexistem ainda 5 padrões de integração distintos. Isso fragmenta segurança, impede SSO, e dispersa o ativo mais maduro do parque (OIDC + RBAC + ABAC + ReBAC Zanzibar, world-class).

## Decision
**Todo sistema com usuários autentica e autoriza via NuPIdentify.** Não se cria auth proprietária nova. Auth local é tolerada apenas como `DevBypass` explícito em desenvolvimento (gated por ausência de `NUPIDENTITY_ISSUER`). Cada produto registra seu manifesto de permissões (`permissions.json`) e sincroniza no startup.

## Consequences
- **Positivas:** SSO unificado; segurança consolidada; ABAC/ReBAC disponíveis a todos; onboarding de cliente padronizado.
- **Custo:** migrar 5 produtos (Services/Chunks/Orbit/AIHub/Salon) — só os marcados "consolidar/reposicionar" na decisão de portfólio (não migrar o que será arquivado).
- **Dependência:** convergência para um SDK de cliente único ([ADR-0014 do NuPIdentify](../../adr/) define o padrão v2) — ver REQ-ID-02.

## Conformidade
Verificável por: existência de client registrado + `[IdentitySync] Sync OK` no startup. Anti-padrão (auth própria nova) detectável por revisão de PR / Sentinel.
