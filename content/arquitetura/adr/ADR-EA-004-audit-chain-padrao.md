# ADR-EA-004 — `@nuptechs/audit-chain` como cadeia de auditoria padrão

| | |
|---|---|
| **Status** | ✅ Accepted |
| **Data** | 2026-06-03 |
| **Decisor** | Yuri F. (Architecture Owner) |
| **Princípio** | [PT-02 Auditoria fail-closed e tamper-proof](../catalogs/principles-catalog.md) |
| **Requisitos** | REQ-SEC-04, REQ-SEC-05, REQ-SEC-08 |
| **Onda** | T3 (WP-AUDIT) |

## Context
A cadeia de auditoria HMAC é um diferencial real (fail-closed em 3 camadas, cross-process Java↔Node, `CHAIN_VERSION 3`) — mas só está em produção no **easynup** e no **Sentinel**. Os demais produtos (School, Study, Sales…) não têm trilha tamper-proof uniforme. Há ainda dois débitos: o segredo `AUDIT_HASH_SECRET` é **reusado como salt de anonimização LGPD** (R6), e o fallback de dev é uma constante pública (cadeia de hml forjável se rodar com ela).

## Decision
**Todo produto que trata dado sensível registra eventos na cadeia `@nuptechs/audit-chain`** (a mesma lib que garante compatibilidade byte-a-byte com o `AuditHashChainComponent` Java). Regras:
1. Nunca remover o listener de auditoria (garantido por teste de arquitetura — ArchUnit/equivalente).
2. `AUDIT_HASH_SECRET` ≥ 32 chars, gerido como segredo de plataforma; **separado** do salt de anonimização LGPD.
3. **hml nunca contém dado de tenant de produção** (porque pode rodar com a chave de fallback).

## Consequences
- **Positivas:** trilha tamper-proof unificada cross-produto (habilita o "rio da prova" do [III-RM](../target-at-scale/technical-reference-model.md)); auditoria de fluxo cross-produto.
- **Custo:** plugar a lib nos produtos sensíveis; separar os dois segredos.
- **Risco fechado:** R6, R12.

## Conformidade
Verificável por: ArchUnit garante o integrator/listener registrado; `/verify-integrity` = 🟢; duas chaves distintas para audit e LGPD.
