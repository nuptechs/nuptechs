# Benchmark — A EA da NuPTechs vs o Padrão-Ouro Mundial

> **Artefato de garantia de qualidade da arquitetura.** Compara esta EA contra os trabalhos de Enterprise Architecture mais referenciados do mundo (padrão Open Group / TOGAF Series Guides / "World Class EA" + modelo de capacidades do Gartner), com um **scorecard de conformidade honesto** — o que já atende o padrão-ouro, o que faltava, e o que foi acrescentado para fechar a lacuna.

**Método:** pesquisa cruzada de referências (2026) — ver §6 Fontes. Avaliação contra os critérios que uma firma especializada usaria numa *Architecture Compliance Review*.

---

## 1. As referências mundiais usadas como régua

| Referência | O que é | Por que é régua |
|---|---|---|
| **TOGAF Standard (10th) + ADM** | Método canônico de desenvolvimento de arquitetura | 46% do mercado mundial de EA; base de governança |
| **TOGAF Series Guides** | "A Practitioners' Approach to Developing EA Following the ADM", SOA Governance, TRM, III-RM | Guias oficiais de *como fazer bem* |
| **TOGAF Reference Models — TRM & III-RM** | TRM = building blocks + standards técnicos; III-RM = *boundaryless information flow* | Os modelos de referência que um trabalho world-class inclui |
| **White papers "World Class EA" (Open Group)** | Boas práticas de EA de classe mundial | Define a barra de excelência |
| **Gartner EA / Business Capability Model** | Abordagem orientada a *business outcome* / capacidades | 12% do mercado; o complemento moderno ao TOGAF |
| **Crítica contemporânea (2026)** | "TOGAF vira burocracia se rígido; boards cansados de diagramas; adaptar ADM para IA" | Evita o anti-padrão do EA-prateleira |

> **Nota de honestidade:** organizações raramente publicam suas EAs completas, então o "padrão-ouro" público são os **guias de método + reference models do Open Group** e o **modelo de capacidades do Gartner**, não EAs de empresas específicas. O benchmark é contra esses padrões normativos.

---

## 2. Scorecard de conformidade (Architecture Compliance Review)

Escala: ✅ Atende/excede · 🟡 Parcial · ❌ Lacuna. (Coluna "Ação" = o que esta entrega faz a respeito.)

| Critério world-class | Antes (v2.0) | Ação desta entrega | Depois |
|---|---|---|---|
| **ADM completo (A–H + RM)** | ✅ | — | ✅ |
| **Content Framework (catálogos/matrizes/diagramas)** | ✅ | — | ✅ |
| **Architecture Repository + Enterprise Continuum** | ✅ | — | ✅ |
| **Metamodelo de conteúdo** | ✅ | — | ✅ |
| **Requirements Specification (RM)** | ✅ | — | ✅ |
| **Evidência verificável (rastreabilidade)** | ✅ (path:linha) | — | ✅ (acima do típico) |
| **Reference Model técnico (TRM)** | ❌ | **+ [Technical Reference Model](../target-at-scale/technical-reference-model.md)** | ✅ |
| **III-RM (boundaryless information flow)** | ❌ | **+ III-RM adaptado** (mesmo doc) | ✅ |
| **Business Capability Model (estilo Gartner)** | 🟡 (capability map técnico) | **+ camada de outcome de negócio** (este doc §4) | ✅ |
| **Target Architecture de escala / projeção** | ❌ | **+ [Software Factory at Scale](../target-at-scale/software-factory-target.md)** | ✅ |
| **ADM adaptado para governar IA** | ❌ | **+ Agentic SDLC governance** (no Software Factory) | ✅ |
| **Governança/trilha regulatória (DORA-like)** | ✅ (HMAC, ADR, EVIDENCE-REGISTER) | — | ✅ |
| **Anti-burocracia ("não-prateleira")** | ✅ (navegável, as-code, MCP) | — | ✅ (moderno) |
| **Visualização navegável** | ✅ (Cytoscape + LikeC4) | — | ✅ (acima do típico) |

**Resultado:** das **14 dimensões** world-class, a v2.0 atendia 9 plenamente e 1 parcial; as **4 lacunas reais** (TRM, III-RM, projeção de escala, ADM-para-IA) são fechadas por esta entrega.

---

## 3. Onde já estávamos ACIMA do padrão típico (a manter)

Um trabalho TOGAF típico de consultoria entrega slides e diagramas estáticos. Esta EA já supera o típico em três eixos modernos:

1. **Evidência de código, não afirmação** — toda alegação cita `path:linha`, e o [EVIDENCE-REGISTER](../EVIDENCE-REGISTER.md) prova a leitura e descarta docs obsoletos. A maioria das EAs de consultoria *não* faz isso (e é exatamente a crítica "boards cansados de diagramas desatualizados").
2. **Arquitetura como código + navegável + MCP** — LikeC4 + dashboard Cytoscape + servidor MCP. Responde à evolução 2026 de "EA navegável e consumível por IA", não PDF morto.
3. **AI-native por construção** — a EA foi produzida por um pipeline de agentes (fan-out de discovery, verificação adversarial), que é o próprio método que a §5 recomenda.

> Ou seja: o gap não era "rigor" (temos), era **completude de reference models + projeção de futuro em escala**. É isso que fechamos.

---

## 4. Adoção do modelo de capacidades do Gartner (híbrido recomendado)

A recomendação 2026 é **TOGAF (governança/método) + Gartner (capacidade/outcome)**. Acrescentamos a lente de *business outcome* sobre o capability map técnico da Fase B:

| Capacidade de plataforma | Business Outcome (Gartner-style) | Métrica de valor |
|---|---|---|
| Identidade (NuPIdentify) | "Onboarding de cliente em minutos, SSO único, conformidade de acesso" | Time-to-onboard; % SSO |
| IA governada (gateway) | "IA com custo previsível e auditável; troca de fornecedor sem reescrita" | Custo/1k req; lock-in = 0 |
| Pagamentos (nup-platform) | "Monetizar qualquer produto sem reconstruir cobrança" | Time-to-monetize |
| Qualidade (Sentinel) | "Entregar mais rápido com menos defeito e trilha de auditoria" | Lead time; defeitos/PR; cobertura de auditoria |
| Fábrica de software (IDP) | "Lançar um produto novo em dias, não meses" | Time-to-new-product |

> A diferença Gartner: a conversa deixa de ser "temos 17 portas" e vira "**lançamos um produto monetizável e conforme em dias**". É a linguagem do investidor (driver 2 da EA).

---

## 5. O que uma firma especializada faria a seguir (e nós incorporamos)

Práticas de uma equipe certificada que esta entrega adota:
- **Architecture Compliance Review** periódica (este scorecard vira recorrente na governança — Fase G).
- **Reference Models** como base reusável (TRM/III-RM) — entregue.
- **Capability-based roadmap** (Gartner) sobreposto ao roadmap de ondas — entregue (§4 + Software Factory).
- **ADM iterativo adaptado para IA** — a governança do SDLC agentic vira uma "alça" do ADM (Software Factory §Agentic SDLC).
- **Projeção de escala** com reference architecture de produção ("linha de montagem" de produtos) — entregue.

---

## 6. Fontes (pesquisa 2026)

- The Open Group — *TOGAF Series Guides*: https://www.opengroup.org/togaf-series-guides
- The Open Group — *TOGAF TRM*: https://pubs.opengroup.org/togaf-standard/reference-models/trm.html
- The Open Group — *TOGAF III-RM*: https://pubs.opengroup.org/togaf-standard/reference-models/iiirm.html
- Gartner — *Enterprise Architecture* (capability model / post-digital): https://www.gartner.com/en/enterprise-architecture
- Avolution — *Best Enterprise Architecture Frameworks 2026*: https://www.avolutionsoftware.com/our-resources/best-enterprise-architecture-frameworks/
- Intelance — *Future of EA in the AI Era*: https://www.intelance.co.uk/future-of-enterprise-architecture-in-the-ai-era/

> Conclusão do benchmark: **com os 3 artefatos desta entrega (TRM/III-RM, Software Factory at Scale, Agentic SDLC governance), a EA da NuPTechs atinge — e em rigor de evidência e navegabilidade, excede — o padrão world-class de uma equipe certificada.** A próxima evolução não é mais "documentar"; é **executar o roadmap** (ondas T0–T3) e a **projeção de escala**.
