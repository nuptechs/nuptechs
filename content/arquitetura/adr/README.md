# Corporate / Enterprise Architecture ADRs (ADR-EA-NNN)

> **Log de decisões de arquitetura corporativa** — decisões *cross-repo* que governam todo o parque NuPTechs. Distintas dos ADRs de produto/pacote (ex: `nup-platform/docs/adr/0001-0008`, `easynup/docs/adr/ADR-NNN`), que decidem dentro de um repositório.

**Quando criar um ADR-EA:** uma decisão que vincula *múltiplos repositórios* ou define um padrão de plataforma (qual IdP, por onde flui a IA, padrão de deploy, modelo de tenant, etc.). Segue a governança da [Fase G](../07-governance.md) e rastreia a [Architecture Requirements Specification](../09-architecture-requirements-specification.md).

**Formato:** Status · Context · Decision · Consequences · Rastreabilidade (princípio → requisito → work package).

---

## Índice

| ADR | Decisão | Status | Princípio | Onda |
|---|---|---|---|---|
| [ADR-EA-001](ADR-EA-001-nupidentify-idp-unico.md) | NuPIdentify é o IdP único obrigatório do parque | ✅ Accepted | PA-01 | T1 |
| [ADR-EA-002](ADR-EA-002-nupai-gateway-ponto-unico-ia.md) | nupai-gateway é o ponto único de IA | ✅ Accepted | PA-02 | T2 |
| [ADR-EA-003](ADR-EA-003-deploy-docker-railway.md) | Docker + Railway como padrão de deploy de produção | ✅ Accepted | PT-01 | T3 |
| [ADR-EA-004](ADR-EA-004-audit-chain-padrao.md) | `@nuptechs/audit-chain` como cadeia de auditoria padrão | ✅ Accepted | PT-02 | T3 |
| [ADR-EA-005](ADR-EA-005-tenant-key-rls.md) | Tenant key `organization_id` direto + RLS ativa | ✅ Accepted | PD-01 | T1 |
| [ADR-EA-006](ADR-EA-006-fabrica-de-software.md) | **NuPTechs como Fábrica de Software** (IDP + golden paths + SDLC agentic + multi-tenancy celular) | ✅ Accepted (direção; industrialização pós-T3) | PN-01 | pós-T3 |

---

## Status possíveis
- **Proposed** — em discussão.
- **Accepted** — aprovada; vincula novos trabalhos.
- **Superseded by ADR-EA-NNN** — substituída.
- **Deprecated** — não mais aplicável.

## Governança
Toda ADR-EA é aprovada pelo Architecture Owner (Yuri F.). Mudança de uma decisão Accepted exige nova ADR que a supersede — nunca edição silenciosa. O cumprimento é verificável pelos critérios da [ARS](../09-architecture-requirements-specification.md) e, quando automatizável, pelo Sentinel (auto-conformidade — [governança §1.2](../07-governance.md)).
