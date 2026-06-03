# CRUD Application/Data Matrix

> **Artefato TOGAF — Phase C.** Mostra qual aplicação **C**ria/**R**ead/**U**pdate/**D**elete cada domínio de dado. Expõe sistemas-dono (quem é "C/owner"), acoplamentos de dado e violações do princípio "fonte única por domínio" (PD-02).

**Legenda:** C=Create(owner) · R=Read · U=Update · D=Delete · — = sem acesso · ⚠️=acesso fora do dono (acoplamento a vigiar)

---

## 1. Matriz núcleo — domínios de dado × aplicações

| Domínio de dado ↓ \ App → | NuPIdentify | easynup | School | Study | Sales | nupai-gw | Sentinel | nup-platform |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **Identidade & Permissão** | **CRUD** | R (sync) | R (sync) | R (sync) | R | — | R | — |
| **Autorização (RBAC/ABAC/ReBAC)** | **CRUD** | R | R+W tuplas | R | R | — | R | — |
| **Contratos públicos** | — | **CRUD** | — | — | — | — | — | — |
| **OS / Aceite / SLA** | — | **CRUD** | — | — | — | — | — | — |
| **Financeiro (contrato)** | — | **CRUD** | — | — | — | — | — | — |
| **Educação (escolar)** | R (auth) | — | **CRUD** | — | — | — | — | — |
| **Aprendizagem** | R (auth) | — | — | **CRUD** | — | — | — | — |
| **Comércio / Pedidos** | R (auth) | — | — | — | **CRUD** | — | — | R (lib) |
| **Pagamentos / Billing** | **CRU** (licenças) | — | ⚠️ CRU | — | ⚠️ CRU | — | — | **owner-lib** |
| **IA / RAG / Embeddings** | — | ⚠️ CRUD (próprio) | — | ⚠️ CRUD | — | **CRUD** (alvo) | R | — |
| **Auditoria (HMAC)** | C | **CRU** | (alvo) | (alvo) | — | C | **CRU** | lib (audit-chain) |
| **Findings de código** | — | — (emite) | — (emite) | — | — | — | **CRUD** | — |
| **Custom Fields (JSONB)** | — | **CRUD** | — | — | — | — | — | — |

---

## 2. Leituras arquiteturais da matriz

### 2.1 Sistemas-dono limpos (bom)
- **NuPIdentify** é dono único de Identidade/Autorização; todos os outros são **R via sync** (manifesto+sync) ou validação de token. Respeita PD-02. ✅
- **easynup** é dono único de Contratos/OS/SLA/Financeiro/CustomFields. ✅
- **nup-platform** é o owner-lib de Pagamentos/Billing (a lógica), mesmo que o dado persista no banco do consumidor.

### 2.2 Violações / acoplamentos a vigiar (⚠️)
- **Pagamentos com múltiplos "C"** — School e Sales fazem `new Stripe()` **direto** (CRU próprio), mesmo consumindo `payments-core`. O pacote *envolve* mas não *intermedia* totalmente. Acoplamento ao Stripe espalhado → risco de divergência de versão de API (School `2025-11-17.clover`, Sales `2026-03-25.dahlia`). Mitigação: rotear todo pagamento pela porta do `payments-core`.
- **IA / RAG com 5 "CRUD" paralelos** (easynup, study, + aim/AIHub/Chunks fora da matriz núcleo) — cada app é dono do próprio RAG. Viola "fonte única". É o **gap G1**: alvo é o `nupai-gateway` ser o owner único (coluna "alvo").
- **Auditoria com múltiplos "C"** — easynup, Sentinel e nupai-gateway escrevem cadeias HMAC. Compatíveis (CHAIN_VERSION 3) mas não unificadas operacionalmente (G6).

### 2.3 Domínios sem dono claro / dispersos
- **RAG/Embeddings** não tem dono — 6 consumidores de Pinecone. O alvo (gateway como dono) resolve governança de custo e isolamento.

---

## 3. Matriz de acesso a dado pessoal (recorte LGPD)

Quem toca PII, para a [Privacy/LGPD Architecture](../cross-cutting/privacy-lgpd-architecture.md).

| Dado pessoal ↓ \ App → | NuPIdentify | easynup | School | Study | Sales |
|---|:--:|:--:|:--:|:--:|:--:|
| Credenciais / MFA | **CRUD** | — | — | — | — |
| CPF / identificação | R | CRU (Vendor/Prof.) | CRU (alunos) | CRU | CRU |
| **Dado sensível (Art. 11)** | — | — | ⚠️ **biometria menores** | ⚠️ saúde (dificuldade aprendizagem) | — |
| Dado financeiro / pagamento | CRU (Stripe cust.) | CRU (banco vendor) | CRU | — | CRU |
| Dado de menor (Art. 14) | — | — | ⚠️ **CRUD** | possível | — |

> 🔴 **NuP-School concentra o risco LGPD máximo do parque** — biometria de menores (foto-prova) = sensível + menor. Exige DPIA (R5).

---

## 4. Ações derivadas

1. **Rotear pagamento pela porta** (`payments-core`) em School/Sales — eliminar `new Stripe()` direto.
2. **Gateway como dono de RAG** — migrar os 5 consumidores (Onda 2).
3. **Padronizar tenant key** — destrava RLS e completa a varredura LGPD (R2/R4).
4. **DPIA NuP-School** antes de escrutínio público.
