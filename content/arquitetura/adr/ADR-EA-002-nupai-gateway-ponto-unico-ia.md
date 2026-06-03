# ADR-EA-002 — nupai-gateway é o ponto único de IA

| | |
|---|---|
| **Status** | ✅ Accepted |
| **Data** | 2026-06-03 |
| **Decisor** | Yuri F. (Architecture Owner) |
| **Princípio** | [PA-02 IA por gateway único](../catalogs/principles-catalog.md) |
| **Requisitos** | REQ-IA-01, REQ-IA-02, REQ-IA-03, REQ-IA-05 |
| **Onda** | T2 (WP-IA-0 → WP-IA) |

## Context
Existem **5+ stacks de IA/RAG paralelos** (easynup, nup-aim, AIHub, NuP-Chunks, nup-study), cada um com seu provider (Anthropic/OpenAI/Gemini/Ollama/Mistral) e seu Pinecone — sem governança central de custo, guardrail, observabilidade ou auditoria. O `nupai-gateway` foi construído exatamente para unificar isso (17 portas hexagonais, adapters reais, recipes RAG), mas **tem adoção zero e não tem deploy de produção** (sem Dockerfile/railway).

## Decision
**Todo acesso a LLM/embeddings/RAG flui pelo nupai-gateway**, falando vocabulário de domínio (`ModelPolicy.quality`), nunca tipos de provider crus. **Pré-condição obrigatória:** o gateway é endurecido e ganha deploy de produção (WP-IA-0) **antes** de qualquer migração de consumidor, validado por um piloto que compara latência/custo/qualidade byte-a-byte vs o baseline atual.

## Consequences
- **Positivas:** governança de custo/guardrail/observabilidade num ponto; troca de provider sem refactor (porta); RAG isolado por tenant governado; on-prem de IA viável (pitch gov).
- **Custo:** fechar os itens "planned" do gateway (BAML, recipe loader de filesystem, deploy); migrar 5 consumidores.
- **Risco:** gateway ainda é early — mitigado pelo piloto antes da migração em massa; rollback = manter o adapter atual.
- **Habilita:** o building block de IA do IDP da [Fábrica de Software](../target-at-scale/software-factory-target.md) (ADR-EA-006).

## Conformidade
Verificável por: ausência de imports diretos de SDK de LLM (`@anthropic-ai/sdk`, `openai`, `@google/genai`) fora do gateway; custo de IA observável num único painel.
