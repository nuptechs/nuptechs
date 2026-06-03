# Anexo — Estado da Arte em Visualização Navegável de Arquitetura

> **Pesquisa de mercado cruzada** que fundamentou a escolha das ferramentas do mapa navegável ([`viewer/`](viewer/) + [`likec4/`](likec4/)). Cruza referências e **opiniões divergentes** — não é endosso de fornecedor.

---

## 1. As quatro categorias do mercado

Visualizar arquitetura "de forma navegável, estado da arte" não é um mercado único — são quatro, com filosofias e custos distintos:

| Categoria | Exemplos | Filosofia | Custo/peso |
|---|---|---|---|
| **Suites de EA** | LeanIX (SAP), Ardoq | Metamodelo + portfólio governado | 🔴 Alto (SaaS enterprise) |
| **Developer portals** | Backstage, Port, Cortex, OpsLevel | Catálogo *vivo* de serviços | 🟠 Médio-Alto |
| **Architecture-as-code** | Structurizr (C4), LikeC4 | Modelo em DSL versionado | 🟢 Baixo (open-source) |
| **Bespoke interativo** | Cytoscape.js, D3, Sigma | Visualização sob medida | 🟢 Baixo (lib) |

---

## 2. Suites de EA — LeanIX vs Ardoq (o topo enterprise)

A divergência de filosofia é o ponto central:
- **Ardoq** é **graph-based**: mapeia como sistemas/times/dados se conectam e *auto-gera* diagramas, heatmaps e *impact analysis* em tempo real a partir de dados estruturados. Apela a metamodelos não-padrão.
- **LeanIX** é **catálogo/APM**: portfólio limpo de aplicações, lifecycle, tag por capacidade de negócio — forte em *racionalização em escala*.

**Consenso (Gartner/Info-Tech):** LeanIX para racionalização de portfólio e transparência de custo; Ardoq para colaboração cloud-native e metamodelo flexível.

**Veredito para a NuPTechs:** poderosos, mas dimensionados para grandes corporações com times de EA dedicados. Para um founder solo, o custo e o overhead de modelagem não se pagam — **descartados**. (O *conceito* de racionalização de portfólio da LeanIX, porém, foi adotado: é a matriz de decisão da Fase E/F.)

---

## 3. Developer portals — a lição do Backstage

Backstage (Spotify) é o catálogo de software open-source de referência. Mas a evidência de mercado traz uma **opinião divergente importante e bem documentada**:

> A Spotify reporta ~99% de adoção interna; outras organizações que tentaram implementar relatam **~10% de adoção média** — porque Backstage "não é um produto pronto: exige investimento de engenharia contínuo e manutenção".

É por isso que surgiram os *managed portals* (**Port**, **Cortex**, **OpsLevel**) — trocam o esforço de engenharia por SaaS pago, com menor TCO e *time-to-value*.

**Veredito para a NuPTechs:** developer portals brilham para um **catálogo vivo de serviços** de um time grande (ownership, scorecards, self-service). Para *visualizar e navegar* a arquitetura corporativa de um founder solo, é peso e custo recorrente desnecessários — **descartados nesta fase**. (Reavaliar se/quando a NuPTechs tiver um time de plataforma.)

---

## 4. Architecture-as-code — Structurizr e LikeC4 (a escolha #1)

Esta categoria é o ponto-doce para a cultura da casa (git + ADR + IA):

- **Structurizr** (Simon Brown, criador do **C4 model**) — "models as code": um modelo em DSL gera N diagramas C4 interativos (zoom, embed, legenda automática). Structurizr Lite roda em Docker. É o padrão de rigor C4.
- **LikeC4** — a evolução *agentic*: DSL → **site navegável com drill-down** nos componentes/relações, detecção de *architectural drift*, embed via React/Web Components, e — decisivo — **expõe o modelo via servidor MCP** para agentes de IA.

**Opinião divergente válida (Simon Brown e a comunidade C4):** diagramas *auto-gerados* a partir do código tendem a virar "spaghetti" ilegível; o C4 defende um **modelo curado por humano** em níveis de abstração. Por isso escolhemos uma ferramenta *as-code* (modelo curado) e **não** um auto-gerador de diagrama a partir do source.

**Escolhido: LikeC4** — sobre o Structurizr clássico, pela saída navegável pronta sem Docker e pela integração MCP, que encaixa no fluxo AI-first da NuPTechs. → [`likec4/`](likec4/).

---

## 5. Bespoke interativo — qual lib de grafo

Para o dashboard de pitch (vitrine sob medida), o consenso técnico cruzado (Memgraph, Cylynx, Linkurious, npm-compare):

| Lib | Força | Fraqueza | Quando |
|---|---|---|---|
| **D3.js** | Controle total, pixel-perfect | Curva íngreme | Visual único e custom, time JS forte |
| **Cytoscape.js** | Análise + interatividade + layouts prontos | Docs poderiam ser melhores | **Grafos de domínio, exploração interativa** |
| **Sigma.js** | Performance em grafos enormes | Menos algoritmos | Milhares de nós |
| **vis-network** | Fácil, físico embutido | O mais lento (1 ordem de grandeza) | Protótipo rápido |

**Escolhido: Cytoscape.js** — para ~24 nós com filtros, highlight de vizinhança e drill-down, é o equilíbrio ideal entre interatividade rica e simplicidade, sem a curva do D3 nem o gargalo do vis-network. → [`viewer/`](viewer/).

---

## 6. Decisão final (e por que dois artefatos)

| Artefato | Ferramenta | Audiência | Papel |
|---|---|---|---|
| [`likec4/`](likec4/) | LikeC4 (as-code) | Engenharia / IA | Modelo navegável **mantível**, drill-down, MCP, detecta drift |
| [`viewer/`](viewer/) | Cytoscape.js (bespoke) | Investidor / pitch | Vitrine **zero-fricção**, 1 arquivo, hospedável no site |

Os dois consomem a **mesma fonte de verdade** (a EA TOGAF deste diretório). Não há suite EA paga nem portal: a combinação open-source + bespoke entrega "navegável estado da arte" no tamanho certo para a NuPTechs hoje, com caminho de evolução (se a empresa crescer, um developer portal como Port/Cortex passa a fazer sentido para o catálogo *vivo*).

---

## Fontes

- Cortex — *Backstage Alternatives: What Engineering Leaders Need to Know in 2026*: https://www.cortex.io/post/backstage-alternatives-what-engineering-leaders-need-to-know-in-2026
- Port — *Top 4 Backstage Alternatives for 2025*: https://www.port.io/blog/top-backstage-alternatives
- OpsLevel — *Backstage alternatives*: https://www.opslevel.com/resources/backstage-io-alternatives-4-top-tools-to-use-instead
- Structurizr (Simon Brown / C4 model): https://structurizr.com/ · https://c4model.com/
- LikeC4 — *architecture as code*: https://likec4.dev/
- Gartner Peer Insights — *Ardoq vs LeanIX*: https://www.gartner.com/reviews/market/enterprise-architecture-tools/compare/product/ardoq-vs-leanix-enterprise-architecture
- Info-Tech SoftwareReviews — *LeanIX EAM vs Ardoq*: https://www.infotech.com/software-reviews/categories/enterprise-architecture/compare/leanix-enterprise-architecture-vs-ardoq
- Memgraph — *Graph Visualization Tool: Fast, Easy, Popular — Pick Two*: https://memgraph.com/blog/you-want-a-fast-easy-to-use-and-popular-graph-visualization-tool
- Cylynx — *A Comparison of JavaScript Graph / Network Visualisation Libraries*: https://www.cylynx.io/blog/a-comparison-of-javascript-graph-network-visualisation-libraries/
- Linkurious — *Top JavaScript graph visualization libraries*: https://linkurious.com/blog/top-javascript-graph-libraries/

> Pesquisa realizada em 2026-06-02. Mercado de ferramentas muda rápido — revalidar a cada revisão maior da EA.
