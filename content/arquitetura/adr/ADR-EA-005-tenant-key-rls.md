# ADR-EA-005 — Tenant key `organization_id` direto + RLS ativa

| | |
|---|---|
| **Status** | ✅ Accepted |
| **Data** | 2026-06-03 |
| **Decisor** | Yuri F. (Architecture Owner) |
| **Princípio** | [PD-01 Multi-tenant por desenho](../catalogs/principles-catalog.md) |
| **Requisitos** | REQ-SEC-02, REQ-SEC-03, REQ-PRIV-01 |
| **Onda** | T1 (WP-RLS → WP-LGPD) |

## Context
O isolamento multi-tenant repousa **inteiramente na camada de aplicação** (`TenantGuardComponent`, fail-closed). O RLS Postgres está **provisionado mas dormente** (migration 0263 sem `FORCE`, app conecta como superuser, `SET LOCAL` não wired → silenciosamente bypassado). Pior: só `contract` tem `organization_id` **direto**; as outras 11 entidades de custom-field são tenant-transitivas (FK→contract), o que faz o **direito LGPD do titular varrer só 1 de 12 entidades** (R4) e impede o RLS de funcionar de forma simples. Há histórico documentado de bugs cross-tenant (classe recorrente, R3).

## Decision
1. **Eixo de tenant padronizado:** denormalizar `organization_id` direto nas entidades tenant-transitivas (eliminar a dependência via FK para isolamento).
2. **RLS ativo é obrigatório** para dado multi-tenant: role Postgres **não-superuser** (`easynup_app`) com `NOBYPASSRLS` + `FORCE ROW LEVEL SECURITY` + wiring `SET LOCAL app.current_organization_id` no transaction manager.
3. **Teste negativo cross-tenant em CI** como gate por Spec/entidade nova.
4. O RLS é **pré-requisito de escala** (multi-tenancy celular pooled — [Fábrica de Software §5](../target-at-scale/software-factory-target.md)), não "defesa em profundidade opcional".

## Consequences
- **Positivas:** isolamento real em duas camadas; direito LGPD completável (varredura das 12 entidades); habilita o modelo celular.
- **Custo:** migração de schema (denormalização) + mudança de role Postgres (DBA, plano de 5 passos) + testes.
- **Riscos fechados:** R2, R3, R4.

## Conformidade
Verificável por: teste de integração cross-tenant falha sem `org_id`; `exerciseDataSubjectRight.v1` retorna linhas das 12 entidades; role de app é `NOBYPASSRLS`.
