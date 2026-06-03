# Dashboard Interativo — Mapa Navegável da Arquitetura

> Vitrine navegável da Arquitetura Corporativa da NuPTechs. **Um arquivo, zero build.** Feito para uso imediato e para apresentação a investidor/cliente.

## Como abrir

```bash
# basta abrir no navegador:
open docs/enterprise-architecture/viewer/index.html        # macOS
# ou servir localmente:
npx serve docs/enterprise-architecture/viewer
```

> Requer internet (carrega Cytoscape.js via CDN). Para uso 100% offline, baixe `cytoscape.min.js` e troque o `<script src>` por um caminho local.

## O que dá pra fazer

- **Grafo interativo** dos 4 pilares (P1 Identidade · P2 Pacotes · P3 IA · P4 Qualidade) e dos 24 repositórios. Arraste, dê zoom, clique.
- **Clique num nó** → painel lateral com propósito, stack, escala (LOC), adoção por pilar e a recomendação de consolidação.
- **Linha sólida** = pilar adotado hoje · **linha tracejada 🎯** = adoção-alvo (gap de consolidação). O botão "Mostrar gaps" liga/desliga a camada de alvos.
- **Matriz de adoção** clicável (P1·P2·P3·P4·Audit) — clique numa linha para focar o produto no grafo.
- **Filtros** por maturidade (🟢 produção / 🟡 MVP / 🔴 estagnado) e troca de layout.
- **Cards de saúde** da plataforma (% via IdP, stacks de IA paralelos, gaps, satélites estagnados).

## Hospedar (pitch)

O arquivo é estático — pode ir direto para o site institucional:
- copie `index.html` para `nuptechs/public/arquitetura/` e exponha via rewrite (mesmo padrão de `/easynup`/`/easynup2`); ou
- publique em GitHub Pages / qualquer hospedagem estática.

## Fonte de dados

O modelo de dados está embutido no topo do `<script>` (constantes `PILLARS` e `APPS`), extraído da EA TOGAF em [`../`](../) com evidência por repositório. Ao atualizar a arquitetura, edite essas constantes (e mantenha o [`../likec4/model.c4`](../likec4/model.c4) em sincronia).

## Por que Cytoscape.js (decisão de ferramenta)

Ver [`../08-visualization-state-of-art.md`](../08-visualization-state-of-art.md). Resumo: para um grafo de ~24 nós com interatividade rica, filtros e drill-down, Cytoscape.js é o sweet-spot do consenso de mercado (análise + interatividade + layouts prontos) sem a curva do D3 nem o custo de performance do vis-network.
