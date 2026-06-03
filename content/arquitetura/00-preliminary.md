# Fase Preliminary — Framework e Princípios de Arquitetura

> **TOGAF ADM · Preliminary Phase.** Define *como* a NuPTechs faz arquitetura: o framework, os princípios que governam decisões, e o modelo de governança. Tudo aqui é a "constituição" sobre a qual as fases A–H operam.

---

## 1. Contexto do engajamento

A NuPTechs cresceu como uma software house solo-founder + IA, produzindo muitos produtos em paralelo numa velocidade alta (24 repositórios ativos, ~1,8 milhão de LOC somados). O resultado é um parque com **forte fundação de plataforma** mas **acoplamento desigual** — alguns produtos são cidadãos plenos da plataforma, outros são satélites isolados que apenas *parecem* parte do mesmo todo.

Esta EA inaugura uma **camada de intenção arquitetural explícita** sobre esse parque: nomeia os pilares de plataforma, mede a adoção real, e define o alvo de consolidação.

### Drivers do negócio (confirmados com o patrocinador)

1. **Consolidação técnica** — reduzir duplicação, padronizar integrações, eliminar stacks paralelos, baixar custo de manutenção.
2. **Narrativa de plataforma para investidor** — demonstrar que a NuPTechs é uma *plataforma coerente e madura*, não uma coleção de apps.

Os dois drivers convergem: a mesma consolidação que reduz custo técnico é a que produz a história de "plataforma" defensável.

---

## 2. Princípios de Arquitetura

Princípios são regras duráveis que orientam decisões. Cada um tem **enunciado · razão · implicação**. Estão ordenados por prioridade.

### PA-01 · Identidade é centralizada, sempre

- **Enunciado:** Todo sistema que tem usuários autentica e autoriza via **NuPIdentify**. Não há auth proprietária nova.
- **Razão:** O IdP é o ativo mais maduro e estratégico do parque (OIDC/SAML/SCIM/RBAC/ABAC/ReBAC). Auth duplicada fragmenta segurança, impede SSO e dilui o investimento.
- **Implicação:** NuP-Services, NuP-Chunks, Orbit e NupTechs-AIHub precisam migrar para o IdP (ver gap G2). Auth local só é tolerada como *DevBypass* explícito em dev.

### PA-02 · IA passa por uma porta única governada

- **Enunciado:** Todo acesso a LLM/embeddings/RAG flui por um **gateway de IA com contrato hexagonal** (`nupai-gateway`), falando vocabulário de domínio (`quality: high`), nunca tipos de provider crus.
- **Razão:** Existem 5 stacks de IA paralelos hoje. Centralizar permite governança de custo, observabilidade, guardrails, troca de provider sem refactor, e auditoria — tudo de uma vez.
- **Implicação:** Adapters Anthropic/OpenAI/Gemini/Ollama/Pinecone deixam de viver em cada app e passam a ser configuração do gateway. On-prem se torna uma decisão de deploy do gateway, não reescrita de N apps.

### PA-03 · Capacidade comum vira pacote, não cópia

- **Enunciado:** Pagamentos, billing, messaging, voice, conferência, validações de domínio (CPF, Money) e auditoria são **pacotes `@nuptechs/*`** do `nup-platform`, consumidos via registry, nunca reimplementados por produto.
- **Razão:** Reuso reduz superfície de bug e custo; já há ~30 pacotes prontos e validados.
- **Implicação:** Antes de implementar qualquer capacidade transversal, busca-se o pacote existente (regra de reuso obrigatório, herdada do easynup `AGENTS.md §2.5`).

### PA-04 · Auditoria é fail-closed e tamper-proof

- **Enunciado:** Eventos sensíveis entram numa **cadeia de auditoria HMAC** encadeada, cross-process compatível, que falha fechado.
- **Razão:** É diferencial competitivo real (setor público, licitação, LGPD) e já existe (`@nuptechs/audit-chain`, `AuditHashChainComponent` no easynup).
- **Implicação:** Nunca remover o listener de auditoria; toda nova capacidade sensível registra na cadeia.

### PA-05 · Deploy é reprodutível e portável

- **Enunciado:** Todo serviço deployável tem **Dockerfile + healthcheck + migrations no startup**, rodável em Railway, cloud genérica ou on-prem.
- **Razão:** On-prem é requisito de venda no setor público; Replit não é infra de produção; reprodutibilidade é pré-requisito de escala.
- **Implicação:** Produtos em Replit (Study, Services, Chunks, kan, AIHub) migram para o padrão Docker/Railway (gap G3).

### PA-06 · Multi-tenant por desenho, não por remendo

- **Enunciado:** Todo dado de aplicação carrega escopo de tenant (`organization_id`) e o acesso é mediado por `DataScope`/ReBAC.
- **Razão:** A plataforma serve múltiplos clientes; vazamento cross-tenant é falha crítica (já houve incidentes no easynup).
- **Implicação:** Specs/queries filtram por organização; RLS Postgres como defesa em profundidade.

### PA-07 · Decisão de arquitetura vira ADR antes do código

- **Enunciado:** Mudança de padrão (novo port, novo framework, entidade Node vs Java) precisa de **ADR aprovada** antes de virar código.
- **Razão:** Já é a prática madura do easynup (42 ADRs) e da suite Sentinel; estende-se ao parque.
- **Implicação:** Repos sem governança ADR (a maioria dos satélites) adotam o padrão quando entram no ciclo de consolidação.

### PA-08 · Evidência sobre especulação

- **Enunciado:** Toda afirmação técnica cita `arquivo:linha`. Não se afirma capacidade sem verificar no código.
- **Razão:** Princípio operacional já cravado no `easynup/AGENTS.md §2.2`; sustenta a confiabilidade da própria EA.
- **Implicação:** Esta EA inteira é construída assim; revisões futuras mantêm o padrão.

---

## 3. Framework de arquitetura adotado

- **Método:** TOGAF 10 ADM (fases A–H + Requirements Management central).
- **Documentação de produto:** Diátaxis (tutorial/how-to/reference/explanation) — já é o padrão do `easynup/docs/manual`.
- **Decisões:** ADR (Architecture Decision Records) em `docs/adr/` por repositório.
- **Modelagem de capacidade:** Business Capability Map (Fase B).
- **Notação de diagrama:** C4 (Context/Container) + Mermaid embutido em markdown (já usado em `easynup/docs/architecture/c4-diagram.md`).

### Por que TOGAF aqui (e não só "documentar o que existe")

TOGAF força a separar **baseline** (o que é) de **target** (o que deveria ser) e a planejar a **transição** entre os dois. Para a NuPTechs, cuja dor é justamente "muitos apps que poderiam ser uma plataforma", essa separação é o coração do valor: o baseline mostra a fragmentação medida, o target nomeia os 4 pilares, e a Fase E/F desenha as ondas de migração.

---

## 4. Modelo de governança de arquitetura

| Papel | Responsável | Função |
|---|---|---|
| **Architecture Owner** | Yuri F. | Aprova ADRs, prioriza ondas de consolidação |
| **Conselho de Arquitetura** | Yuri + sessões de IA assistente | Revisa conformidade com princípios PA-01..08 |
| **Repository of record** | `nup-platform/docs/enterprise-architecture/` | Fonte de verdade da EA (este conjunto) |

### Hierarquia de fontes de verdade (herdada do easynup)

1. **Código no `main`** (verdade absoluta)
2. **ADRs aprovadas**
3. **Esta EA** (intenção arquitetural corporativa)
4. **Manuais de produto** (`docs/manual/`)
5. **READMEs**

### Cadência

- A EA é **revisada a cada onda de consolidação concluída** (ver roadmap Fase E/F).
- Mudanças que afetam um princípio PA-* exigem nota de revisão nesta pasta.

---

## 5. Escopo e fronteiras

**Dentro do escopo:** os 24 repositórios ativos da org `nuptechs` listados no [catálogo de aplicações](catalogs/application-portfolio.md).

**Fora do escopo (nesta versão):**
- Infraestrutura de rede/DNS/certificados de baixo nível (tratada como serviço Railway/Vercel).
- Processos de negócio não-software (comercial, jurídico da empresa).
- `nuptechs-nfc` (utilitário Android isolado, não é repositório git versionado — apenas catalogado).

---

## 6. Próximos passos do ADM

→ [Fase A — Architecture Vision](01-architecture-vision.md): a visão de plataforma, os stakeholders e a proposta de valor que ancora o pitch.
