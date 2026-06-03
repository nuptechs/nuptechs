# Modelo LikeC4 — Arquitetura como Código (navegável)

> Representação **as-code** da Arquitetura Corporativa da NuPTechs. Mesma fonte de verdade dos documentos TOGAF em `../`, mas executável: gera um site navegável com **drill-down** real e expõe a arquitetura via **MCP** para agentes de IA.

## O que é

[`model.c4`](model.c4) descreve, em DSL, os 4 pilares de plataforma, os produtos verticais, as bibliotecas e as integrações — distinguindo **adoção real** (`#adopts`) de **adoção-alvo / gap de consolidação** (`#target`). É o complemento de engenharia do dashboard de pitch em [`../viewer/`](../viewer/).

## Como rodar

```bash
cd docs/enterprise-architecture/likec4
npm install

npm run dev        # http://localhost:5173 — preview navegável (hot-reload ao editar o .c4)
npm run build      # site estático em ./dist (hospedável em qualquer lugar)
npm run mcp        # servidor MCP — agentes de IA consultam a arquitetura
npm run export:png # exporta cada view como PNG em ./exports
```

> Validado: `npx likec4 build` compila o modelo sem erros (165 módulos, ~0,5s).

## Views disponíveis (drill-down)

| View | O que mostra |
|---|---|
| **index** | Paisagem corporativa completa (4 pilares + produtos + externos) |
| **pilares** | Só os 4 pilares e quem se conecta a eles |
| **gaps** | Relações-alvo 🎯 — a fila de trabalho das Ondas 1 e 2 |
| **flagship** | easynup e todas as suas integrações (drill-down) |
| **identidadeView** | P1 · NuPIdentify — quem autentica e quem deveria |
| **iaView** | P3 · nupai-gateway — a IA que deveria fluir por aqui |
| **qualidadeView** | P4 · Sentinel — a suite de qualidade |

No preview, clique num elemento para navegar para a view dele (drill-down), e use o painel lateral para ver descrição/tecnologia.

## Por que LikeC4 (decisão de ferramenta)

Escolhido por cruzamento de referências de mercado — ver [`../08-visualization-state-of-art.md`](../08-visualization-state-of-art.md). Resumo: é *architecture-as-code* (versionado em git, alinhado à cultura ADR da casa), gera saída **navegável com drill-down**, detecta *architectural drift*, e — diferencial decisivo para o fluxo AI-first da NuPTechs — **expõe o modelo via MCP** para Claude Code / agentes consumirem.

## Manutenção

Ao mudar a arquitetura (novo produto, nova integração, um gap fechado):
1. Edite [`model.c4`](model.c4) — troque `#target` por `#adopts` quando uma adoção for concluída.
2. `npm run dev` valida ao vivo.
3. Atualize também a matriz no dashboard ([`../viewer/index.html`](../viewer/index.html)) e os documentos TOGAF afetados.

> `node_modules/` e `dist/` não são versionados (ver `.gitignore`).
