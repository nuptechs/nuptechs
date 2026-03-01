# Plano de Evolução — Blog NuPtechs

> **Objetivo:** Tornar o blog da NuPtechs a referência #1 em conteúdo técnico sobre desenvolvimento de software, IA e automação no Brasil.
>
> **Data da análise:** 1 de março de 2026
>
> **Status:** 🟡 Em revisão — evoluir antes de implementar

---

## Diagnóstico Atual

### O que temos

| Dimensão | Estado | Nota |
|---|---|---|
| Quantidade de posts | 6 artigos | 3/10 |
| Diversidade de tags | 5 tags (Automação, IA Aplicada, BI, Dev Ágil, Integrações) | 6/10 |
| Profundidade média | ~1.000–1.500 palavras por artigo | 5/10 |
| Mnemônicos | Apenas 1 de 6 posts tem (`FAPRI`) | 2/10 |
| Mind maps | 6 de 6 ✓ | 10/10 |
| Key takeaways | 6 de 6 ✓ | 10/10 |
| Callouts | 2–3 por post ✓ | 7/10 |
| Interlinks (relatedSlugs) | 2 por post, rede circular ✓ | 6/10 |

### Diferenciais competitivos genuínos (nenhum concorrente tem)

- ✅ Mind map SVG interativo com expand/collapse e cores por ramo
- ✅ Flashcards mnemônicos com auto-play e keyboard nav
- ✅ Barra de progresso de leitura com TOC scroll-spy
- ✅ Structured data completo (Article + BreadcrumbList + Blog)

### Infraestrutura técnica

- Post interface CRUD-ready (`Post`, `PostSection`, `Callout`, `MindMapNode`)
- `ArticleShell` com layout premium
- `InteractiveMindMap` — SVG puro, zero deps
- `MnemonicCards` — flashcards animados
- JSON-LD, Open Graph, Twitter Cards, sitemap, robots.txt

---

## Problemas Identificados

### 🔴 SEO — Críticos

| # | Problema | Impacto | Solução |
|---|---|---|---|
| S1 | **Datas `publishedAt` no futuro (2026-02-xx)** | Google pode penalizar ou não indexar | Corrigir para datas reais passadas |
| S2 | **Sem `dateModified` real** | Artigos parecem abandonados | Adicionar `updatedAt` a todos os posts |
| S3 | **Posts sem hreflang individual** | Perda de sinalização de idioma por artigo | Adicionar `alternates.languages` na metadata de cada post |
| S4 | **Zero imagens nos artigos** | Sem indexação no Google Images, CTR menor em redes sociais | Adicionar diagramas SVG, screenshots ou ilustrações |
| S5 | **Sem `<meta name="author">` por post** | Não aparece nos SERPs como autoria | Renderizar author como meta tag |

### 🔴 Conversão — Críticos

| # | Problema | Impacto | Solução |
|---|---|---|---|
| C1 | **Zero CTAs inline nos artigos** | Taxa de conversão <0.1% | CTA contextual no meio/final de cada artigo |
| C2 | **Artigos não linkam para serviços/produtos** | Zero conversão interna | Link para serviço relevante em cada post |
| C3 | **Sem newsletter/lead magnet** | Sem captura de leads | Formulário de email + lead magnet por cluster |
| C4 | **Sem botões de compartilhamento** | Dificulta viralização | Botões LinkedIn, X, copiar link |

### 🟡 Conteúdo — Importantes

| # | Problema | Impacto | Solução |
|---|---|---|---|
| T1 | **5 de 6 posts sem mnemônico** | Componente premium subutilizado | Criar mnemônicos para todos os posts |
| T2 | **Posts com ~1.200 palavras** | Abaixo do mínimo para ranquear (2.500+) | Expandir com exemplos, código, tabelas |
| T3 | **Sem topic clusters** | Google não reconhece autoridade temática | Criar pillar pages + artigos satélites |
| T4 | **Sem exemplos de código** | Público técnico espera snippets | Adicionar code blocks com syntax highlighting |
| T5 | **Volume: apenas 6 posts** | Impossível construir autoridade com tão pouco | Meta: 50+ artigos em 6 meses |

### 🟡 UX — Importantes

| # | Problema | Impacto | Solução |
|---|---|---|---|
| U1 | **Tags não são filtráveis** | Usuário não encontra conteúdo por tema | Tornar tags clicáveis com filtro no index |
| U2 | **Sem busca interna** | Usuário não encontra conteúdo específico | Fuse.js client-side |
| U3 | **Sem estimativa de tempo restante** | Menor completion rate | Adicionar "X min restantes" ao progress bar |
| U4 | **`dangerouslySetInnerHTML` no content** | Impossibilita componentes React inline | Migrar para MDX ou parser customizado |
| U5 | **Callout placement sem controle editorial** | Distribuição automática pode não fazer sentido | Campo `afterSectionId` nos dados do callout |
| U6 | **Sem paginação no blog index** | Problema com 50+ posts | Implementar paginação ou infinite scroll |

---

## Plano de Ação — Priorizado por impacto × esforço

### 🏆 Tier 1 — Alto impacto, esforço médio (fazer PRIMEIRO)

- [ ] **IA1** — Implementar pipeline de processamento de artigos com IA (ver seção 🧠 Explosão em Camadas)
- [ ] **IA2** — Geração automática de Mind Map + Mnemônico integrada ao pipeline (ver seção 🤖)
- [ ] **IA3** — Componentes frontend: DepthSelector, DepthExpander, ArticleShell v2
- [ ] **IA4** — Converter os 6 posts existentes para o novo formato com camadas
- [ ] **IA5** — Pinecone: indexação vetorial + busca semântica + related posts automáticos (ver seção 📌)
- [ ] **S1** — Corrigir datas `publishedAt` para datas reais
- [ ] **S2** — Adicionar `updatedAt` a todos os posts
- [ ] **C1** — CTA contextual inline ao final de cada artigo (antes do mind map)
- [ ] **C2** — Link para serviço/produto relevante dentro do conteúdo
- [ ] **U1** — Tornar tags clicáveis/filtráveis no blog index
- [ ] **C4** — Botões de compartilhamento (LinkedIn, X, copiar link)

### 🥈 Tier 2 — Alto impacto, esforço alto (próximas 2–4 semanas)

- [ ] **T2** — Expandir cada post para 2.500+ palavras com exemplos concretos
- [ ] **T3** — Criar 6–12 artigos satélites (1 cluster por tema, 2–3 satélites cada)
- [ ] **S4** — Adicionar imagens/diagramas SVG a cada artigo
- [ ] **C3** — Sistema de newsletter com lead magnet por cluster
- [ ] **U2** — ~~Busca full-text com Fuse.js~~ → Busca semântica com Pinecone (movido para IA5)
- [ ] **T4** — Adicionar code blocks com syntax highlighting

### 🥉 Tier 3 — Médio impacto, esforço variável (após consolidar Tier 1+2)

- [ ] **U4** — Migrar conteúdo para MDX (eliminar `dangerouslySetInnerHTML`)
- [ ] **S3** — hreflang individual por post
- [ ] **S5** — Meta author tag por post
- [ ] **U5** — Callout placement editorial (`afterSectionId`)
- [ ] **U6** — Paginação/infinite scroll no blog index
- [ ] **U3** — Tempo restante de leitura
- [ ] Author pages com bio e links (E-E-A-T do Google)
- [ ] Sistema de comentários (Giscus)

---

---

## 🤖 SISTEMA AUTOMÁTICO — Geração de Mind Map + Mnemônico por IA

> **Objetivo:** Ao cadastrar um novo post no blog (apenas `title`, `description`, `sections`, `callouts`, `keyTakeaways`), o sistema gera automaticamente o `mindMap` e o `mnemonic` com qualidade revisada por IA — sem intervenção manual.

*(Detalhes completos na seção original abaixo)*

---

## 🧠 SISTEMA DE EXPLOSÃO EM CAMADAS — Artigos com Profundidade Progressiva

> **A grande ideia:** O usuário cola um conteúdo bruto de qualquer tamanho (5 ou 50 páginas).
> A IA organiza automaticamente em **camadas de complexidade crescente** — de uma visão
> abstrata e acessível até a profundidade total do material original — sem perder nenhuma informação.
>
> O leitor começa entendendo o tema em 2 minutos. Se quiser, vai aprofundando camada por camada
> até dominar tudo. **Cada pessoa para no nível de profundidade que precisa.**

### O conceito: Artigos em Camadas (Depth Layers)

```
┌──────────────────────────────────────────────────────────────────┐
│  CAMADA 0 — VISÃO GERAL (sempre visível)                        │
│  "O que é e por que importa" — 2 min de leitura                 │
│  → Key Takeaways + Resumo executivo + Mind Map                  │
│  → Qualquer pessoa entende, sem conhecimento prévio              │
├──────────────────────────────────────────────────────────────────┤
│  CAMADA 1 — CONCEITOS FUNDAMENTAIS (expandível)                 │
│  "Como funciona na prática" — +5 min                            │
│  → Seções com explicações claras, analogias, exemplos reais     │
│  → Profissional não-técnico consegue acompanhar                  │
├──────────────────────────────────────────────────────────────────┤
│  CAMADA 2 — APROFUNDAMENTO TÉCNICO (expandível)                 │
│  "O detalhe que faz diferença" — +8 min                         │
│  → Dados, benchmarks, comparativos, código de exemplo           │
│  → Desenvolvedor / analista técnico                              │
├──────────────────────────────────────────────────────────────────┤
│  CAMADA 3 — PROFUNDIDADE TOTAL (expandível)                     │
│  "Tudo que foi inserido, sem perder nada" — +15 min             │
│  → Material original reorganizado, edge cases, referências      │
│  → Especialista / pesquisador / implementação real               │
└──────────────────────────────────────────────────────────────────┘
```

### Como funciona na prática (fluxo do autor)

```
1. AUTOR abre painel → "Novo artigo"
2. Preenche: título, tag, e cola conteúdo bruto (texto livre, qualquer tamanho)
3. Clica "Processar com IA"
4. IA retorna preview do artigo organizado em camadas
5. AUTOR revisa, ajusta se quiser → publica
```

### Nova interface Post (evolução da atual)

```typescript
// ═══ EVOLUÇÃO DA INTERFACE — Profundidade progressiva ═══

// Cada seção agora tem um nível de profundidade
export interface PostSection {
  id: string;
  heading: string;
  content: string;          // HTML
  depth: 0 | 1 | 2 | 3;    // 🆕 camada de profundidade
  parentId?: string;        // 🆕 seção-pai (para aninhamento)
}

// Cada callout pode estar vinculado a uma seção específica
export interface Callout {
  type: "tip" | "warning" | "insight" | "example";
  title: string;
  body: string;
  afterSectionId?: string;  // 🆕 posicionamento editorial
  depth?: 0 | 1 | 2 | 3;   // 🆕 aparece só nesta camada+
}

export interface Post {
  slug: string;
  tag: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;                     // tempo total (todas as camadas)
  readTimeByDepth?: Record<number, string>; // 🆕 "Camada 0: 2min, 1: 5min..."
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string };
  
  // Camada 0 — sempre visível
  executiveSummary: string;             // 🆕 resumo de 2-3 frases
  keyTakeaways: string[];
  mindMap: MindMapNode;
  mnemonic?: MnemonicData;
  
  // Conteúdo em camadas
  sections: PostSection[];              // agora com depth + parentId
  callouts: Callout[];                  // agora com afterSectionId + depth
  maxDepth: 1 | 2 | 3;                 // 🆕 profundidade máxima deste artigo
  
  relatedSlugs: string[];
}
```

### Arquitetura da IA — Pipeline de processamento

```
┌─────────────────────────────────────────────────────────────┐
│  ENTRADA: texto bruto (qualquer tamanho)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 1 — ANÁLISE ESTRUTURAL (gpt-4o)                     │
│                                                             │
│  Input: texto bruto completo                                │
│  Output estruturado:                                        │
│    • Lista de CONCEITOS extraídos (com nível de complexidade│
│      de 1-10 atribuído pela IA)                             │
│    • DEPENDÊNCIAS entre conceitos (qual precisa de qual)     │
│    • CLASSIFICAÇÃO por audiência:                            │
│      - Leigo / Gerente / Técnico / Especialista             │
│    • Estimativa de palavras por conceito                    │
│                                                             │
│  Prompt-chave:                                              │
│  "Analise este conteúdo como um professor que precisa       │
│   ensinar para 4 audiências diferentes. Identifique cada    │
│   conceito distinto, classifique sua complexidade e mapeie  │
│   quais conceitos dependem de quais."                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 2 — DISTRIBUIÇÃO EM CAMADAS (gpt-4o)                │
│                                                             │
│  Input: conceitos + dependências + classificação             │
│  Output: alocação de cada conceito em depth 0/1/2/3         │
│                                                             │
│  Regras de alocação:                                        │
│  ┌─────────┬──────────────────────────────────────────────┐ │
│  │ Depth 0 │ Complexidade 1-3 + sem dependências          │ │
│  │         │ → "O que é e por que importa"                │ │
│  │         │ → Max 300 palavras, analogias simples        │ │
│  ├─────────┼──────────────────────────────────────────────┤ │
│  │ Depth 1 │ Complexidade 3-5 + depende só de depth 0    │ │
│  │         │ → "Como funciona na prática"                 │ │
│  │         │ → Exemplos reais, passo-a-passo              │ │
│  ├─────────┼──────────────────────────────────────────────┤ │
│  │ Depth 2 │ Complexidade 5-8 + depende de depth 0-1     │ │
│  │         │ → "O detalhe que faz diferença"              │ │
│  │         │ → Dados, código, benchmarks, trade-offs      │ │
│  ├─────────┼──────────────────────────────────────────────┤ │
│  │ Depth 3 │ Complexidade 8-10 + material completo       │ │
│  │         │ → "Profundidade total"                       │ │
│  │         │ → Edge cases, referências, impl. avançada    │ │
│  └─────────┴──────────────────────────────────────────────┘ │
│                                                             │
│  Constraint: NENHUMA informação do input é descartada.      │
│  Tudo vai para alguma camada.                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 3 — REDAÇÃO POR CAMADA (gpt-4o-mini, paralelo)     │
│                                                             │
│  Para cada camada, gerar as sections com regras de estilo:  │
│                                                             │
│  Depth 0: Tom conversacional, zero jargão,                  │
│           analogias do cotidiano, frases curtas             │
│                                                             │
│  Depth 1: Tom profissional-acessível,                       │
│           termos técnicos SEMPRE com explicação inline,     │
│           exemplos concretos com números                    │
│                                                             │
│  Depth 2: Tom técnico direto,                               │
│           código quando relevante, tabelas comparativas,    │
│           dados de benchmark, trade-offs explícitos         │
│                                                             │
│  Depth 3: Tom especialista,                                 │
│           referências a papers/docs, edge cases,            │
│           implementação real, gotchas de produção           │
│                                                             │
│  Cada section inclui: id, heading, content (HTML), depth,   │
│  parentId (referência à seção depth-1 que expande)          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 4 — GERAÇÃO DE AIDS (paralelo, gpt-4o-mini + 4o)   │
│                                                             │
│  Reutiliza o sistema já planejado:                          │
│  ├─ Mind Map (baseado em Depth 0+1)                         │
│  ├─ Mnemônico (baseado em keyTakeaways)                     │
│  ├─ Executive Summary (3 frases, baseado em Depth 0)        │
│  ├─ Key Takeaways (5-7 pontos, cross-layer)                │
│  ├─ Callouts posicionados (com afterSectionId + depth)      │
│  ├─ Keywords SEO (baseado no conteúdo completo)             │
│  └─ readTimeByDepth (contagem de palavras por camada)       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 5 — REVISÃO DE QUALIDADE (gpt-4o)                   │
│                                                             │
│  Verifica o artigo COMPLETO montado:                        │
│                                                             │
│  ✓ Depth 0 é compreensível por um leigo de 15 anos?        │
│  ✓ Depth 1 → faz sentido sem ler Depth 2+?                 │
│  ✓ Depth 2 → adiciona valor real vs Depth 1?               │
│  ✓ Depth 3 → cobre TUDO do input original?                 │
│  ✓ Nenhuma informação do input foi perdida?                 │
│  ✓ Transições entre camadas são suaves?                     │
│  ✓ Cada seção expandida enriquece a seção-pai?              │
│                                                             │
│  Score por camada (1-10) + score global                     │
│  Se score < 7 em qualquer camada: re-gera só essa camada    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 6 — INDEXAÇÃO PINECONE (text-embedding-3-small)     │
│                                                             │
│  1. Gerar embeddings: summary + sections depth 0+1 + full   │
│  2. Upsert no Pinecone com metadata (slug, tag, depth...)   │
│  3. Query top-5 K-NN → atualizar relatedSlugs              │
│                                                             │
│  Custo: ~$0.001 por artigo — desprezível                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  OUTPUT: Post completo no formato da interface,             │
│  com relatedSlugs automáticos, pronto para publicação       │
└─────────────────────────────────────────────────────────────┘
```

### UX — Como o leitor experimenta as camadas

#### Opção A: Expansion Cards (recomendada)

```
┌─────────────────────────────────────────────────────┐
│  [Visão Geral]  [Prático]  [Técnico]  [Completo]   │  ← Depth selector
│      ●             ○          ○          ○          │
└─────────────────────────────────────────────────────┘

  📋 Principais pontos
  • Ponto 1...
  • Ponto 2...

  ─── Seção: O que é automação ──────────────────
  Parágrafo de visão geral (depth 0)...

     ┌─ 🔍 Aprofundar: Como funciona na prática ──────┐
     │  [clicável — expande depth 1 inline]             │
     │                                                   │
     │  Conteúdo depth 1 aparece aqui quando expandido   │
     │                                                   │
     │     ┌─ ⚙️ Detalhe técnico ──────────────────┐    │
     │     │  [clicável — expande depth 2]          │    │
     │     │  Código, benchmarks, etc.              │    │
     │     │                                         │    │
     │     │     ┌─ 🔬 Profundidade total ────┐     │    │
     │     │     │  Edge cases, refs, impl.   │     │    │
     │     │     └─────────────────────────────┘     │    │
     │     └─────────────────────────────────────────┘    │
     └───────────────────────────────────────────────────┘
```

**Comportamentos:**
- O leitor pode expandir seções individuais (clique no card)
- Ou usar o depth selector global para expandir TUDO até aquele nível
- Cada expansão tem animação suave (height transition)
- TOC sidebar atualiza dinamicamente com as seções visíveis
- Progress bar conta apenas o conteúdo visível (não o oculto)
- O depth selecionado persiste via `localStorage`

#### Indicadores visuais por depth

| Depth | Ícone | Cor da borda | Label |
|---|---|---|---|
| 0 | 🎯 | — (sem borda, é o base) | Visão Geral |
| 1 | 🔍 | `var(--accent)` indigo | Aprofundar |
| 2 | ⚙️ | `#10b981` emerald | Detalhe Técnico |
| 3 | 🔬 | `#f59e0b` amber | Profundidade Total |

### Schemas Zod — Pipeline completo

```typescript
// ═══ ETAPA 1: Análise Estrutural ═══
const ConceptSchema = z.object({
  id: z.string().describe("ID único do conceito, ex: 'c1', 'c2'"),
  title: z.string().max(80).describe("Nome do conceito"),
  summary: z.string().max(200).describe("Resumo do conceito em 1-2 frases"),
  complexity: z.number().min(1).max(10).describe("Complexidade: 1=leigo, 10=PhD"),
  audience: z.enum(["leigo", "gerente", "tecnico", "especialista"]),
  dependsOn: z.array(z.string()).describe("IDs dos conceitos que este depende"),
  estimatedWords: z.number().describe("Estimativa de palavras para explicar"),
  originalExcerpt: z.string().describe("Trecho original do input relacionado"),
});

const StructuralAnalysisSchema = z.object({
  concepts: z.array(ConceptSchema).min(3).max(30),
  suggestedTitle: z.string().max(80),
  suggestedTag: z.string().max(25),
  totalComplexityRange: z.string().describe("Ex: '3-9' indicando range do conteúdo"),
  suggestedMaxDepth: z.enum(["1", "2", "3"]).describe("Profundidade recomendada"),
});

// ═══ ETAPA 2: Distribuição em Camadas ═══
const LayerAllocationSchema = z.object({
  layers: z.array(z.object({
    depth: z.enum(["0", "1", "2", "3"]),
    conceptIds: z.array(z.string()).describe("IDs dos conceitos nesta camada"),
    sections: z.array(z.object({
      id: z.string(),
      heading: z.string().max(80),
      conceptIds: z.array(z.string()).describe("Conceitos cobertos nesta seção"),
      parentSectionId: z.string().nullable().describe("Seção pai (null para depth 0)"),
      estimatedWords: z.number(),
    })),
  })),
  unallocatedConcepts: z.array(z.string()).describe("Deve ser vazio — tudo alocado"),
});

// ═══ ETAPA 3: Redação por Camada ═══
const LayerContentSchema = z.object({
  sections: z.array(z.object({
    id: z.string(),
    heading: z.string(),
    content: z.string().describe("HTML do conteúdo da seção"),
    depth: z.number().min(0).max(3),
    parentId: z.string().nullable(),
    wordCount: z.number(),
  })),
  callouts: z.array(z.object({
    type: z.enum(["tip", "warning", "insight", "example"]),
    title: z.string().max(40),
    body: z.string().max(200),
    afterSectionId: z.string(),
    depth: z.number().min(0).max(3),
  })),
});

// ═══ ETAPA 5: Revisão de Qualidade ═══
const QualityReviewSchema = z.object({
  overallScore: z.number().min(1).max(10),
  layerScores: z.array(z.object({
    depth: z.number(),
    score: z.number().min(1).max(10),
    issues: z.array(z.string()),
  })),
  accessibilityCheck: z.object({
    depth0UnderstandableByLayperson: z.boolean(),
    depth1StandaloneWithoutDeeper: z.boolean(),
    depth2AddsRealValue: z.boolean(),
    depth3CoversAllInput: z.boolean(),
    noInfoLost: z.boolean(),
  }),
  suggestedFixes: z.array(z.object({
    sectionId: z.string(),
    issue: z.string(),
    suggestion: z.string(),
  })),
});
```

### Prompts-chave

#### Etapa 1 — Análise Estrutural
```
Você é um professor universitário com PhD e 20 anos de experiência ensinando
temas complexos para audiências de todos os níveis.

Analise o conteúdo abaixo e extraia TODOS os conceitos distintos.

Para cada conceito, determine:
1. COMPLEXIDADE (1-10): 1 = qualquer pessoa entende sem preparação,
   10 = exige conhecimento especializado profundo
2. AUDIÊNCIA: leigo / gerente / técnico / especialista
3. DEPENDÊNCIAS: quais outros conceitos o leitor precisa entender
   ANTES de compreender este
4. TRECHO ORIGINAL: cite o trecho do texto que originou este conceito

REGRA CRÍTICA: NÃO descarte NENHUMA informação do texto original.
Cada frase, dado, exemplo do input deve estar mapeado em pelo menos
um conceito. Se sobrar informação não mapeada, crie um conceito para ela.
```

#### Etapa 3 — Redação (uma por depth)
```
Você é um redator técnico premiado, especialista em tornar temas
complexos acessíveis sem perder profundidade.

Escreva o conteúdo das seções de DEPTH {N} seguindo estas regras:

DEPTH 0 (Visão Geral):
- Imagine que o leitor tem 15 anos e nunca ouviu falar do tema
- Use analogias do cotidiano (ex: "como uma esteira de fábrica")
- Máximo 300 palavras por seção
- Zero jargão — se precisar de um termo técnico, explique entre parênteses
- Termine cada seção com uma frase que convida a aprofundar

DEPTH 1 (Prático):
- Leitor é profissional não-técnico (gerente, analista)
- Exemplos concretos com números reais (custos, tempos, percentuais)
- Passos acionáveis ("Faça X, depois Y, meça Z")
- Termos técnicos permitidos SE explicados inline na primeira aparição
- Cada seção é compreensível sem ler Depth 2+

DEPTH 2 (Técnico):
- Leitor é desenvolvedor ou analista técnico
- Código de exemplo quando relevante (com syntax highlighting)
- Tabelas comparativas, benchmarks, trade-offs
- Referências a ferramentas específicas com versões
- Dados quantitativos: latência, custo por request, throughput

DEPTH 3 (Profundidade Total):
- Leitor é especialista ou implementador
- Edge cases, failure modes, gotchas de produção
- Referências a documentação oficial, papers, RFCs
- Arquitetura detalhada, diagramas de sequência em texto
- TODO o material original que não coube nas camadas anteriores

REGRA ABSOLUTA: A soma de todas as camadas deve conter 100% da
informação do input original. Nada pode ser perdido.
```

### API Route: POST /api/blog/process-article

```
POST /api/blog/process-article
Headers: { x-api-key: BLOG_API_KEY }
Body: {
  rawContent: string     // texto bruto, qualquer tamanho
  title?: string         // opcional — IA sugere se não fornecido
  tag?: string           // opcional — IA sugere se não fornecido
  forceMaxDepth?: 1|2|3  // opcional — override da profundidade
}

Response: {
  post: Post             // artigo completo pronto para publicar
  meta: {
    conceptsExtracted: number,
    wordsInput: number,
    wordsOutput: number,
    depthDistribution: { 0: number, 1: number, 2: number, 3: number },
    qualityScores: { overall: number, byDepth: Record<number, number> },
    processingTime: string,
    cost: string,
    attempts: number,
  }
}
```

### Custo estimado (artigo grande, ~5.000 palavras input)

| Etapa | Modelo | Input tokens | Output tokens | Custo |
|---|---|---|---|---|
| 1. Análise | gpt-4o | ~6.000 | ~2.000 | ~$0.04 |
| 2. Distribuição | gpt-4o | ~3.000 | ~1.500 | ~$0.02 |
| 3. Redação ×4 | gpt-4o-mini | ~8.000 | ~12.000 | ~$0.03 |
| 4. Aids | gpt-4o-mini + 4o | ~2.000 | ~1.000 | ~$0.02 |
| 5. Revisão | gpt-4o | ~15.000 | ~1.000 | ~$0.05 |
| 6. Pinecone | text-embedding-3-small | ~4.000 | — | ~$0.001 |
| **Total** | | | | **~$0.16 (~R$0,85)** |

Para artigo de 20.000 palavras: ~$0.50 (~R$2,65). Ainda trivial.

### Componente ArticleShell — Evolução necessária

O `ArticleShell` atual renderiza seções flat (sem depth). A evolução:

```typescript
// Novo estado no ArticleShell
const [activeDepth, setActiveDepth] = useState(0);
const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

// Filtragem: mostrar seções cujo depth <= activeDepth OU está no expandedSections
const visibleSections = post.sections.filter(s =>
  s.depth <= activeDepth || expandedSections.has(s.id)
);
```

**Novos sub-componentes:**

| Componente | Função |
|---|---|
| `DepthSelector` | Barra com 4 pills (Visão Geral / Prático / Técnico / Completo) |
| `DepthExpander` | Card clicável "🔍 Aprofundar: {heading}" que expande inline |
| `DepthBadge` | Indicador visual (ícone + cor) do nível da seção |
| `DepthProgress` | Progress bar que conta apenas conteúdo visível |

### Comparação: Blog tradicional vs. NuPtechs com camadas

| Aspecto | Blog tradicional | NuPtechs Depth Layers |
|---|---|---|
| Leitor leigo | Desiste no 2º parágrafo técnico | Lê Depth 0 e entende tudo |
| Gerente | Procura resumo executivo que não existe | Key Takeaways + Depth 0+1 |
| Dev júnior | Falta contexto, sobra complexidade | Depth 0→1→2 progressivo |
| Especialista | Artigo raso demais, vai embora | Depth 3 com material completo |
| Tempo gasto | Fixo: lê tudo ou desiste | Variável: 2min a 30min por escolha |
| SEO | 1 público-alvo | 4 públicos, mais keywords, mais tempo na página |
| Retenção | Bounce alto em conteúdo longo | Cada leitor encontra seu nível |

### Relação com o sistema de Mind Map + Mnemônico

O pipeline de camadas **inclui** a geração de aids na Etapa 4:
- Mind map é gerado com base em Depth 0+1 (conceitos-chave acessíveis)
- Mnemônico é gerado com base nos keyTakeaways (cross-layer)
- Callouts são distribuídos com `afterSectionId` + `depth` (precisão editorial)
- Tudo passa pela revisão dupla (Etapa 5)

### Arquivos a criar / modificar

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/api/blog/process-article/route.ts` | 🆕 Criar | Pipeline completo de processamento |
| `app/lib/blog-ai-schemas.ts` | 🆕 Criar | Schemas Zod de todas as etapas |
| `app/lib/blog-ai-prompts.ts` | 🆕 Criar | Prompts de análise, redação, revisão |
| `app/lib/blog-ai-generate-aids.ts` | 🆕 Criar | Geração de mind map + mnemônico (extraído) |
| `app/blog/[slug]/page.tsx` | ✏️ Modificar | Interface Post com depth, novo tipo PostSection |
| `app/components/ArticleShell.tsx` | ✏️ Modificar | Depth selector, expansion cards, depth filtering |
| `app/components/DepthSelector.tsx` | 🆕 Criar | Barra de seleção de profundidade |
| `app/components/DepthExpander.tsx` | 🆕 Criar | Card expandível por seção |
| `app/components/SearchDialog.tsx` | 🆕 Criar | Modal Cmd+K com busca semântica Pinecone |
| `app/lib/pinecone.ts` | 🆕 Criar | Cliente Pinecone + helpers (embed, upsert, query) |
| `app/lib/blog-ai-index.ts` | 🆕 Criar | Etapa 6: embedding + indexação + related posts |
| `app/api/blog/search/route.ts` | 🆕 Criar | API de busca semântica (pública) |
| `app/api/blog/index-article/route.ts` | 🆕 Criar | API de indexação vetorial (interna) |
| `app/globals.css` | ✏️ Modificar | Estilos de depth layers, expansion, badges |

### Checklist de implementação

**Fase 1 — Backend (Pipeline IA):**
- [ ] Instalar deps: `ai`, `@ai-sdk/openai`, `zod`, `@pinecone-database/pinecone`
- [ ] Criar schemas Zod (`blog-ai-schemas.ts`)
- [ ] Criar prompts (`blog-ai-prompts.ts`)
- [ ] Criar geração de aids (`blog-ai-generate-aids.ts`)
- [ ] Criar cliente Pinecone (`pinecone.ts`) + indexação (`blog-ai-index.ts`)
- [ ] Criar API Route `/api/blog/process-article` (Etapas 1-6)
- [ ] Criar API Route `/api/blog/generate-aids` (mind map + mnemônico standalone)
- [ ] Criar API Route `/api/blog/search` (busca semântica pública)
- [ ] Criar API Route `/api/blog/index-article` (indexação standalone)
- [ ] Configurar env vars (`OPENAI_API_KEY`, `BLOG_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX`)
- [ ] Criar index `nuptechs-blog` no Pinecone (dim: 1536, cosine)
- [ ] Testar com artigo existente (input: conteúdo do post automação)

**Fase 2 — Frontend (Depth Layers UX):**
- [ ] Evoluir interface `Post` com `depth`, `parentId`, `executiveSummary`, `maxDepth`
- [ ] Criar `DepthSelector` component
- [ ] Criar `DepthExpander` component
- [ ] Criar `SearchDialog` component (Cmd+K busca semântica Pinecone)
- [ ] Evoluir `ArticleShell` com depth filtering + expansion
- [ ] Atualizar TOC sidebar para mostrar apenas seções visíveis
- [ ] Atualizar progress bar para contar só conteúdo visível
- [ ] CSS: estilos de depth cards, badges, animações
- [ ] Testar responsividade (mobile depth UX)

**Fase 3 — Migração + Indexação:**
- [ ] Converter os 6 posts existentes para o novo formato (via API)
- [ ] Indexar os 6 posts no Pinecone (via API)
- [ ] Validar busca semântica e related posts automáticos
- [ ] Validar visualmente todos os artigos
- [ ] Deploy + validação em produção

### Compatibilidade retroativa

A evolução é **100% compatível** com posts antigos:

```typescript
// Posts sem depth continuam funcionando:
// depth default = 0 (tudo visível)
// parentId default = null
// maxDepth default = 1
// executiveSummary default = description
```

O `ArticleShell` detecta se o post tem camadas:
- Se `maxDepth === 1` e nenhuma section tem `depth > 0` → renderiza flat (como hoje)
- Se `maxDepth > 1` → ativa depth selector + expansion cards

### Arquitetura escolhida

```
┌─────────────────────────────────────────────────────────────┐
│  AUTOR cadastra post (sections + keyTakeaways + callouts)   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  API Route: POST /api/blog/generate-aids                    │
│                                                             │
│  1. Recebe: title, sections[].heading, sections[].content,  │
│     keyTakeaways[], tag                                     │
│                                                             │
│  2. ETAPA 1 — Geração (gpt-4o-mini, structured output):    │
│     ├─ Prompt de GERAÇÃO do mind map (MindMapNode)          │
│     └─ Prompt de GERAÇÃO do mnemônico (Mnemonic)            │
│                                                             │
│  3. ETAPA 2 — Revisão (gpt-4o, structured output):          │
│     ├─ Recebe o mind map gerado + artigo original            │
│     ├─ Avalia: coerência, completude, concisão, utilidade   │
│     ├─ Retorna versão revisada + score de qualidade         │
│     ├─ Recebe o mnemônico gerado + artigo original           │
│     ├─ Avalia: memorabilidade, coerência, pronúncia,         │
│     │  relevância de cada letra                              │
│     └─ Retorna versão revisada + score de qualidade         │
│                                                             │
│  4. Se score < 7/10 → re-gera (max 2 tentativas)           │
│                                                             │
│  5. Retorna JSON final: { mindMap, mnemonic, scores }       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  AUTOR cola o JSON no post data OU (futuro) salva no CMS    │
└─────────────────────────────────────────────────────────────┘
```

### Por que duas etapas (Geração + Revisão)?

| Aspecto | Só geração | Geração + Revisão IA |
|---|---|---|
| Qualidade do mnemônico | ~60% — acrônimos forçados, letras irrelevantes | ~90% — revisão descarta mnemônicos ruins |
| Mind map coerência | ~75% — pode ter ramos redundantes ou vagos | ~95% — revisão elimina redundância |
| Custo por artigo | ~$0.005 (gpt-4o-mini) | ~$0.02 (mini + 4o) |
| Latência | ~2s | ~5s |
| Confiabilidade | Precisa de revisão humana sempre | Revisão humana opcional (score alto = pronto) |

**Decisão: Geração com gpt-4o-mini (barato/rápido) + Revisão com gpt-4o (inteligente). Custo: ~R$0,10 por artigo.**

### Stack técnica

| Componente | Tecnologia | Por quê |
|---|---|---|
| API Route | Next.js Route Handler (`app/api/blog/generate-aids/route.ts`) | Já temos infra Next.js |
| SDK IA | **Vercel AI SDK** (`ai` + `@ai-sdk/openai`) | Structured output nativo com Zod, retry, streaming |
| Schema validation | **Zod** | Type-safe, integra com AI SDK via `Output.object()` |
| Vector DB | **Pinecone Serverless** (`@pinecone-database/pinecone`) | Managed, zero infra, busca semântica, related posts automáticos |
| Embeddings | **text-embedding-3-small** (OpenAI) | 1536 dims, barato ($0.02/1M tokens), preciso |
| Modelo geração | `gpt-4o-mini` | Rápido, barato, bom para seguir schemas |
| Modelo revisão | `gpt-4o` | Mais inteligente para avaliar qualidade |
| Autenticação | API key via header (`x-api-key`) | Proteção simples para endpoint interno |

### Schemas Zod (contratos de saída)

```typescript
// Mind Map — exatamente o que InteractiveMindMap espera
const MindMapNodeSchema = z.object({
  label: z.string().max(30).describe("Nome curto do conceito (max 30 chars, cabe no círculo SVG)"),
  children: z.array(
    z.object({
      label: z.string().max(25).describe("Nome do ramo (max 25 chars)"),
      children: z.array(
        z.object({
          label: z.string().max(20).describe("Nome da folha (max 20 chars)")
        })
      ).min(2).max(5).describe("Folhas do ramo — conceitos específicos")
    })
  ).min(2).max(4).describe("Ramos principais — max 4 para legibilidade no SVG")
});

// Mnemônico — exatamente o que MnemonicCards espera
const MnemonicSchema = z.object({
  acronym: z.string().min(3).max(7).describe("Acrônimo pronunciável em português (3-7 letras)"),
  breakdown: z.array(
    z.object({
      letter: z.string().length(1).describe("Uma letra do acrônimo"),
      word: z.string().max(30).describe("Palavra-chave que a letra representa"),
      hint: z.string().max(60).describe("Dica curta que ajuda a memorizar (max 60 chars)")
    })
  ).min(3).max(7).describe("Cada letra do acrônimo com palavra e dica")
});

// Revisão — score + versão melhorada
const ReviewedMindMapSchema = z.object({
  score: z.number().min(1).max(10).describe("Nota de qualidade: coerência, completude, concisão"),
  issues: z.array(z.string()).describe("Problemas encontrados (vazio se score >= 8)"),
  revised: MindMapNodeSchema.describe("Versão revisada/melhorada do mind map")
});

const ReviewedMnemonicSchema = z.object({
  score: z.number().min(1).max(10).describe("Nota: memorabilidade, pronúncia, relevância"),
  issues: z.array(z.string()).describe("Problemas encontrados (vazio se score >= 8)"),
  revised: MnemonicSchema.describe("Versão revisada/melhorada do mnemônico")
});
```

### Prompts (núcleo da qualidade)

#### Prompt de Geração — Mind Map
```
Você é um especialista em design instrucional e visualização de informação.

Dado o artigo abaixo, crie um MAPA MENTAL hierárquico que:

REGRAS OBRIGATÓRIAS:
1. O nó raiz resume o tema central em 2-4 palavras
2. Use 2-4 ramos principais (nunca mais) — cada um agrupa um conceito-chave
3. Cada ramo tem 2-5 folhas com conceitos específicos e acionáveis
4. Labels CURTOS: raiz ≤30 chars, ramos ≤25 chars, folhas ≤20 chars
5. NÃO repita conceitos entre ramos — cada informação aparece uma vez
6. Priorize: frameworks, números, decisões, ações — não abstrações
7. A pessoa que vê o mapa deve conseguir reconstruir 80% do artigo

ANTI-PADRÕES (evitar):
- Ramos genéricos como "Benefícios", "Vantagens", "Conclusão"
- Folhas que são sinônimos do ramo pai
- Mais de 4 ramos (fica ilegível no SVG circular)
```

#### Prompt de Geração — Mnemônico
```
Você é especialista em técnicas de memorização e design instrucional.

Dado o artigo abaixo, crie um MNEMÔNICO (acrônimo) que:

REGRAS OBRIGATÓRIAS:
1. O acrônimo deve ser PRONUNCIÁVEL em português (ex: FAPRI, MEDIR, CERTO)
2. 3 a 7 letras — cada letra = 1 conceito-chave do artigo
3. Cada palavra-chave deve ser imediatamente compreensível sem contexto
4. Cada "hint" deve ser uma frase curta que reforce a memorização
5. O acrônimo deve criar uma palavra real ou pseudo-palavra memorável
6. A sequência das letras deve seguir uma lógica (cronológica, importância, ou fluxo)

ANTI-PADRÕES (evitar):
- Acrônimos impronunciáveis (XPTK, BGHJ)
- Palavras-chave vagas ("Análise", "Estratégia", "Qualidade")
- Hints que repetem a palavra-chave sem agregar
- Acrônimos com mais de 7 letras (perde memorabilidade)
```

#### Prompt de Revisão — Mind Map
```
Você é um revisor especialista em design instrucional.

Avalie o mapa mental abaixo considerando o artigo original.

CRITÉRIOS (cada um vale até 2 pontos, total 10):
1. COERÊNCIA: O mapa reflete fielmente o conteúdo do artigo?
2. COMPLETUDE: Os conceitos mais importantes estão representados?
3. CONCISÃO: Os labels são curtos e cabem em círculos SVG?
4. HIERARQUIA: A estrutura raiz→ramo→folha faz sentido lógico?
5. UTILIDADE: Alguém consegue revisar o artigo olhando só o mapa?

Se score < 8: reescreva a versão revisada corrigindo os problemas.
Se score >= 8: retorne o original como "revised" sem mudanças.
```

#### Prompt de Revisão — Mnemônico
```
Você é um revisor especialista em técnicas de memorização.

Avalie o mnemônico abaixo considerando o artigo original.

CRITÉRIOS (cada um vale até 2 pontos, total 10):
1. PRONUNCIABILIDADE: O acrônimo soa natural em português?
2. MEMORABILIDADE: É fácil de lembrar após 1 leitura?
3. RELEVÂNCIA: Cada letra representa um conceito central do artigo?
4. CLAREZA: As hints ajudam a reconstruir o conceito?
5. COESÃO: As letras formam uma sequência lógica?

Se score < 7: crie um novo mnemônico do zero (acrônimos ruins são irrecuperáveis).
Se score >= 7: refine a versão existente.
```

### Fluxo de execução detalhado

```
1. POST /api/blog/generate-aids
   Body: { title, tag, sections, keyTakeaways, callouts }

2. Extrair texto limpo (strip HTML das sections)

3. Chamadas PARALELAS (gpt-4o-mini):
   ├─ generateText({ output: Output.object({ schema: MindMapNodeSchema }), ... })
   └─ generateText({ output: Output.object({ schema: MnemonicSchema }), ... })

4. Chamadas PARALELAS de revisão (gpt-4o):
   ├─ generateText({ output: Output.object({ schema: ReviewedMindMapSchema }), ... })
   └─ generateText({ output: Output.object({ schema: ReviewedMnemonicSchema }), ... })

5. Se algum score < threshold:
   └─ Re-gerar APENAS o componente com score baixo (max 2 retries)

6. Response: {
     mindMap: { ...revised },
     mnemonic: { ...revised },
     meta: {
       mindMapScore: 9,
       mnemonicScore: 8,
       attempts: 1,
       cost: "$0.02",
       model: { generation: "gpt-4o-mini", review: "gpt-4o" }
     }
   }
```

### Constraints de design (garantem visual perfeito)

| Constraint | Motivo | Enforcement |
|---|---|---|
| Raiz: max 30 chars | Cabe no círculo r=38 | Zod `.max(30)` |
| Ramo: max 25 chars | Cabe no círculo r=28 | Zod `.max(25)` |
| Folha: max 20 chars | Cabe no círculo r=24 | Zod `.max(20)` |
| Max 4 ramos | SVG radial legível | Zod `.max(4)` |
| Max 5 folhas por ramo | Não sobrecarrega | Zod `.max(5)` |
| Acrônimo: 3-7 letras | Memorável e cabível no strip | Zod `.min(3).max(7)` |
| Hint: max 60 chars | Cabe no card expandido | Zod `.max(60)` |
| Palavra: max 30 chars | Cabe no card front | Zod `.max(30)` |

### Dependências necessárias

```bash
npm install ai @ai-sdk/openai zod @pinecone-database/pinecone
```

- `ai` — Vercel AI SDK core (generateText, Output.object)
- `@ai-sdk/openai` — Provider OpenAI para AI SDK
- `zod` — Schema validation (já necessário para AI SDK structured output)
- `@pinecone-database/pinecone` — SDK oficial Pinecone (busca semântica, indexação)

### Variáveis de ambiente

```env
OPENAI_API_KEY=sk-...
BLOG_API_KEY=chave-secreta-para-proteger-endpoint
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX=nuptechs-blog
```

### Custo estimado

| Cenário | Custo por artigo | Custo 50 artigos |
|---|---|---|
| Geração (gpt-4o-mini) × 2 | ~$0.005 | ~$0.25 |
| Revisão (gpt-4o) × 2 | ~$0.015 | ~$0.75 |
| Re-geração (30% dos casos) | ~$0.005 | ~$0.25 |
| **Total estimado** | **~$0.025 (~R$0,13)** | **~R$6,50** |

### Arquivos a criar

| Arquivo | Responsabilidade |
|---|---|
| `app/api/blog/generate-aids/route.ts` | API Route — orquestra geração + revisão |
| `app/lib/blog-ai-schemas.ts` | Schemas Zod compartilhados |
| `app/lib/blog-ai-prompts.ts` | Prompts de geração e revisão |

### Fallback para posts sem IA

O campo `mnemonic` continua **opcional** na interface `Post` (`mnemonic?:`).
O campo `mindMap` continua **obrigatório** — se a IA falhar, usamos um fallback simples:

```typescript
// Fallback mind map: gera a partir dos headings das sections
function fallbackMindMap(post: Post): MindMapNode {
  return {
    label: post.title.slice(0, 30),
    children: post.sections.slice(0, 4).map(s => ({
      label: s.heading.slice(0, 25),
      children: [] // sem folhas
    }))
  };
}
```

### Checklist de implementação

- [ ] Instalar dependências: `ai`, `@ai-sdk/openai`, `zod`, `@pinecone-database/pinecone`
- [ ] Criar `app/lib/blog-ai-schemas.ts` com schemas Zod
- [ ] Criar `app/lib/blog-ai-prompts.ts` com prompts
- [ ] Criar `app/api/blog/generate-aids/route.ts` com lógica completa
- [ ] Configurar `OPENAI_API_KEY`, `BLOG_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX` no `.env.local`
- [ ] Testar com 1 artigo existente e comparar com mnemônico manual (FAPRI)
- [ ] Gerar mnemônicos para os 5 posts que não têm
- [ ] Validar visualmente no InteractiveMindMap e MnemonicCards
- [ ] Documentar uso no README

---

## 📌 PINECONE — Busca Semântica + Related Posts + Base de Conhecimento

> **Objetivo:** Usar Pinecone como camada vetorial pós-processamento para habilitar busca semântica
> no blog (substitui Fuse.js), related posts automáticos (substitui `relatedSlugs` manual),
> e uma base de conhecimento que fica mais inteligente a cada artigo publicado.
>
> **Pré-requisito:** Assinatura Pinecone ativa ✅ + API key disponível ✅

### Onde Pinecone agrega valor real (e onde NÃO)

#### ❌ Onde NÃO faz sentido

| Etapa | Por que Pinecone não ajuda |
|---|---|
| Etapas 1-5 (processamento do artigo) | São chamadas LLM com structured output. Não há busca por similaridade — a IA recebe texto bruto completo e gera output. |
| Geração de Mind Map / Mnemônico | Input completo → output estruturado. Sem necessidade de retrieval. |
| Armazenamento dos posts | Temos 6 posts (meta: 50). JSON estático é suficiente. Pinecone é para busca, não storage. |

#### ✅ Onde FAZ sentido

| Uso | Valor real | Quando brilha |
|---|---|---|
| **Busca semântica no blog** | "integrar mensageria com meu sistema" encontra o post de WhatsApp API — Fuse.js não consegue (palavras diferentes, mesmo significado) | Desde o 1º post |
| **Related posts automáticos** | K-nearest neighbors no espaço vetorial. Post 51 se relaciona automaticamente com os mais similares, sem tocar código | Com 10+ posts |
| **RAG cross-article (Depth 3)** | Ao escrever Depth 3, IA puxa trechos de outros artigos que complementam. Ex: benchmark de custo do artigo SaaS aparece no artigo de automação | Com 20+ posts |
| **Detecção de gaps** | Quais áreas temáticas têm poucos vetores = pouca cobertura = oportunidade de conteúdo | Com 50+ posts |
| **Verificação de duplicidade** | "O blog já cobriu esse tema?" — antes de gerar, verificar similaridade com conteúdo existente | Desde o 1º post |

### Arquitetura — Pinecone como Etapa 6

```
┌─────────────────────────────────────────────────────────────┐
│  PIPELINE DE PROCESSAMENTO (Etapas 1→5 — sem mudanças)      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ETAPA 6 — INDEXAÇÃO NO PINECONE (nova, pós-processamento)  │
│                                                             │
│  1. Gerar embeddings do artigo processado:                  │
│     ├─ 1 embedding do executiveSummary (busca rápida)       │
│     ├─ 1 embedding por seção depth 0+1 (busca semântica)    │
│     └─ 1 embedding do artigo completo (related posts)       │
│                                                             │
│  2. Upsert no Pinecone com metadata:                        │
│     {                                                       │
│       slug, tag, depth, sectionId, title, publishedAt,      │
│       wordCount, maxDepth, author                           │
│     }                                                       │
│                                                             │
│  3. Atualizar related posts automaticamente:                │
│     Query top-5 mais similares → salvar como relatedSlugs   │
│                                                             │
│  Modelo: text-embedding-3-small ($0.02/1M tokens)           │
│  Custo por artigo: ~$0.001 (~R$0,005) — desprezível         │
└─────────────────────────────────────────────────────────────┘
```

### API Routes — Busca e Indexação

#### POST /api/blog/index-article (interna — chamada pelo pipeline)

```
POST /api/blog/index-article
Headers: { x-api-key: BLOG_API_KEY }
Body: {
  slug: string
  post: Post              // artigo completo processado
}

Response: {
  indexed: {
    vectorCount: number,  // quantos vetores foram criados
    relatedSlugs: string[], // top-5 posts mais similares
  }
}
```

#### GET /api/blog/search (pública — usada pelo frontend)

```
GET /api/blog/search?q=como+integrar+whatsapp&tag=integracoes&limit=5

Response: {
  results: [
    {
      slug: "integracao-api-whatsapp-business",
      title: "...",
      description: "...",
      tag: "Integrações",
      score: 0.92,         // similaridade (0-1)
      matchedSection?: string,  // seção mais relevante
    },
    ...
  ],
  meta: {
    query: "como integrar whatsapp",
    totalResults: 3,
    latency: "85ms",
  }
}
```

### Schema do índice Pinecone

```typescript
// Namespace: "blog-articles"
// Dimension: 1536 (text-embedding-3-small)
// Metric: cosine

interface PineconeVector {
  id: string;           // formato: "{slug}" | "{slug}#{sectionId}"
  values: number[];     // embedding 1536-dim
  metadata: {
    slug: string;
    title: string;
    tag: string;
    type: "full" | "summary" | "section";  // tipo do embedding
    depth?: number;     // para embeddings de seção
    sectionId?: string;
    sectionHeading?: string;
    publishedAt: string;
    wordCount: number;
    textPreview: string;  // primeiros 200 chars (para exibir nos resultados)
  };
}
```

### Granularidade dos embeddings

| Tipo | ID format | Conteúdo embedado | Uso principal |
|---|---|---|---|
| `full` | `{slug}` | Artigo completo concatenado | Related posts (K-NN) |
| `summary` | `{slug}#summary` | executiveSummary + keyTakeaways | Busca rápida |
| `section` | `{slug}#{sectionId}` | Conteúdo de 1 seção (depth 0+1) | Busca granular + RAG |

**Total por artigo:** 1 full + 1 summary + N sections (depth 0+1)
**Artigo típico (6 seções depth 0+1):** 8 vetores × 1536 dims = ~12KB no Pinecone

### Busca semântica vs. Fuse.js — comparação

| Aspecto | Fuse.js (fuzzy text) | Pinecone (semantic) |
|---|---|---|
| "integrar mensageria" → WhatsApp API | ❌ Não encontra | ✅ Encontra (significado) |
| "custo de IA para empresa" → LLMs corporativo | ❌ Parcial (match "IA") | ✅ Encontra (semântica) |
| "como escolher banco de dados" → Stack tecnológica | ❌ Não encontra | ✅ Encontra (conceito) |
| Latência | ~5ms (client-side) | ~100ms (API call) |
| Bundle size | +18KB gzipped | 0 (server-side) |
| Funciona offline | ✅ | ❌ |
| Escala com 1000+ posts | 🟡 Fica lento | ✅ Sem degradação |
| Custo | Grátis | ~$0.001/query (desprezível) |

**Decisão: Pinecone para busca principal. Fallback client-side com filtro por tag (sem JS bundle extra).**

### Related Posts automáticos — como funciona

```typescript
// Após indexar um artigo novo:
async function updateRelatedPosts(slug: string, pinecone: PineconeIndex) {
  // 1. Pegar embedding "full" do artigo recém-indexado
  const articleVector = await pinecone.fetch([slug]);
  
  // 2. Query top-6 mais similares (exclui o próprio)
  const results = await pinecone.query({
    vector: articleVector.records[slug].values,
    topK: 6,
    filter: { type: "full", slug: { $ne: slug } },
    includeMetadata: true,
  });
  
  // 3. Top-5 (excluindo o próprio) → relatedSlugs
  const relatedSlugs = results.matches
    .filter(m => m.score > 0.7) // threshold mínimo de similaridade
    .slice(0, 5)
    .map(m => m.metadata.slug);
  
  return relatedSlugs; // salvar no Post
}
```

**Benefício:** Ao publicar o artigo 51, todos os `relatedSlugs` se atualizam automaticamente. Zero trabalho manual.

### RAG cross-article — enriquecimento do Depth 3

```typescript
// Na Etapa 3 (Redação), ao escrever Depth 3:
async function enrichDepth3WithRAG(
  sectionConcepts: string[],
  currentSlug: string,
  pinecone: PineconeIndex
) {
  // Buscar seções de OUTROS artigos que complementam
  const enrichments = await Promise.all(
    sectionConcepts.map(concept =>
      pinecone.query({
        vector: await embed(concept),
        topK: 3,
        filter: {
          type: "section",
          slug: { $ne: currentSlug }, // não buscar no próprio artigo
          depth: { $lte: 2 },         // puxar depth 0-2 de outros artigos
        },
        includeMetadata: true,
      })
    )
  );
  
  // Retornar trechos relevantes para incluir no prompt de redação
  return enrichments
    .flat()
    .filter(m => m.score > 0.8)
    .map(m => ({
      fromSlug: m.metadata.slug,
      heading: m.metadata.sectionHeading,
      preview: m.metadata.textPreview,
    }));
}
```

**Resultado no artigo:** "Conforme analisamos em [Automação de Processos](/blog/como-automatizar-processos-manuais), o custo médio de implementação é..." — referências orgânicas, automáticas.

### Detecção de gaps e sugestão de tópicos (futuro, 50+ posts)

```typescript
// Análise de cobertura temática
async function analyzeContentGaps(pinecone: PineconeIndex) {
  // 1. Listar todos os tags e contar vetores por tag
  const stats = await pinecone.describeIndexStats({
    filter: { type: "full" }
  });
  
  // 2. Para cada cluster planejado, verificar cobertura
  const clusters = ["Automação", "IA Aplicada", "BI", "Dev Ágil", "Integrações"];
  
  const gaps = await Promise.all(
    clusters.map(async tag => {
      const count = await pinecone.query({
        vector: await embed(tag),
        topK: 100,
        filter: { type: "full", tag },
      });
      return { tag, articleCount: count.matches.length };
    })
  );
  
  // Tags com < 5 artigos = gap = oportunidade
  return gaps.filter(g => g.articleCount < 5);
}
```

### Integração com o pipeline existente

A Etapa 6 é chamada **automaticamente** ao final do `POST /api/blog/process-article`:

```
Etapas 1→2→3→4→5 (como planejado)
        │
        ▼
  Etapa 6: indexArticle(processedPost)
        │
        ├─ Gerar embeddings (text-embedding-3-small)
        ├─ Upsert no Pinecone (blog-articles namespace)
        ├─ Query related posts (top-5 K-NN)
        └─ Atualizar relatedSlugs no post final
        │
        ▼
  OUTPUT: Post completo com relatedSlugs automáticos
```

### Stack técnica (adição ao pipeline)

| Componente | Tecnologia | Por quê |
|---|---|---|
| Vector DB | **Pinecone Serverless** | Managed, zero infra, pay-per-query |
| SDK | `@pinecone-database/pinecone` | SDK oficial, TypeScript nativo |
| Embeddings | `text-embedding-3-small` (OpenAI) | 1536 dims, barato, preciso |
| Busca frontend | `SearchDialog` component | Cmd+K / Ctrl+K, debounce, results preview |

### Custo estimado (Pinecone)

| Operação | Custo | Volume |
|---|---|---|
| Embedding por artigo (~8 vetores) | ~$0.001 | Desprezível |
| Storage (Pinecone serverless) | ~$0.33/mês por 1M vetores | 50 artigos = ~400 vetores → grátis no free tier |
| Query (busca do usuário) | ~$0.01 por 1K queries | 1000 buscas/mês = ~$0.01 |
| **Total mensal (50 artigos, 1K buscas)** | **< $0.05 (~R$0,25)** | Praticamente grátis |

### Variáveis de ambiente (adição)

```env
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX=nuptechs-blog
```

### Dependência necessária

```bash
npm install @pinecone-database/pinecone
```

### Arquivos a criar / modificar

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/lib/pinecone.ts` | 🆕 Criar | Cliente Pinecone singleton + helpers (embed, upsert, query) |
| `app/lib/blog-ai-index.ts` | 🆕 Criar | Lógica da Etapa 6: embedding + indexação + related posts |
| `app/api/blog/search/route.ts` | 🆕 Criar | API Route de busca semântica (pública) |
| `app/api/blog/index-article/route.ts` | 🆕 Criar | API Route de indexação (interna) |
| `app/components/SearchDialog.tsx` | 🆕 Criar | Modal Cmd+K com busca semântica + preview |
| `app/api/blog/process-article/route.ts` | ✏️ Modificar | Adicionar chamada à Etapa 6 no final |

### Checklist de implementação (Pinecone)

- [ ] Instalar dep: `@pinecone-database/pinecone`
- [ ] Criar index `nuptechs-blog` no dashboard Pinecone (dimension: 1536, metric: cosine)
- [ ] Configurar env vars (`PINECONE_API_KEY`, `PINECONE_INDEX`)
- [ ] Criar `app/lib/pinecone.ts` (cliente + helpers)
- [ ] Criar `app/lib/blog-ai-index.ts` (Etapa 6: embed + upsert + related)
- [ ] Criar `app/api/blog/search/route.ts`
- [ ] Criar `app/api/blog/index-article/route.ts`
- [ ] Criar `app/components/SearchDialog.tsx` (Cmd+K)
- [ ] Integrar Etapa 6 no pipeline `process-article`
- [ ] Indexar os 6 posts existentes
- [ ] Testar busca semântica (queries variadas)
- [ ] Testar related posts automáticos

---

## Mnemônicos a Criar (Tier 1 — item T1)

> **Nota:** Com o sistema de IA acima implementado, todos os mnemônicos serão gerados automaticamente. A tabela abaixo será preenchida pela IA.

| Post | Acrônimo proposto | Status |
|---|---|---|
| `como-automatizar-processos-manuais` | FAPRI ✓ (manual) | ✅ |
| `llms-no-mundo-corporativo` | *Será gerado por IA* | ⬜ |
| `dashboard-bi-para-pmes` | *Será gerado por IA* | ⬜ |
| `como-escolher-stack-tecnologica` | *Será gerado por IA* | ⬜ |
| `integracao-api-whatsapp-business` | *Será gerado por IA* | ⬜ |
| `software-sob-medida-vs-saas` | *Será gerado por IA* | ⬜ |

---

## Topic Clusters Planejados (Tier 2 — item T3)

### Cluster 1: Automação de Processos
- **Pillar:** `como-automatizar-processos-manuais` (expandir)
- Satélite: "Como automatizar entrada de dados com n8n — tutorial passo a passo"
- Satélite: "ROI de automação: como calcular com planilha modelo"
- Satélite: "Automação de follow-ups com WhatsApp API"

### Cluster 2: IA Corporativa
- **Pillar:** `llms-no-mundo-corporativo` (expandir)
- Satélite: "Como implementar RAG na sua empresa em 2 semanas"
- Satélite: "Custo real de IA: comparativo OpenAI vs. Claude vs. modelos open-source"
- Satélite: "Prompt engineering para processos empresariais — guia prático"

### Cluster 3: Business Intelligence
- **Pillar:** `dashboard-bi-para-pmes` (expandir)
- Satélite: "Grafana vs. Metabase vs. Superset: qual escolher para PMEs"
- Satélite: "Como criar um ETL simples com Python e PostgreSQL"

### Cluster 4: Stack Tecnológica
- **Pillar:** `como-escolher-stack-tecnologica` (expandir)
- Satélite: "PostgreSQL vs. MongoDB vs. MySQL: guia definitivo 2026"
- Satélite: "Next.js vs. Remix vs. SvelteKit: qual framework fullstack escolher"

### Cluster 5: Integrações
- **Pillar:** `integracao-api-whatsapp-business` (expandir)
- Satélite: "Webhook + n8n: como criar integrações em minutos sem código"
- Satélite: "LGPD para desenvolvedores: o que você precisa implementar"

### Cluster 6: SaaS vs. Sob Medida
- **Pillar:** `software-sob-medida-vs-saas` (expandir)
- Satélite: "Quanto custa um software sob medida em 2026 — tabela realista"
- Satélite: "5 sinais de que você precisa migrar do SaaS para software próprio"

---

## Mapeamento Post → Serviço/Produto (para CTAs — item C1/C2)

| Post | Serviço relacionado | Produto relacionado |
|---|---|---|
| `como-automatizar-processos-manuais` | `/servicos/automacao-inteligente` | FlowOps |
| `llms-no-mundo-corporativo` | `/servicos/ia-aplicada` | ChatCore |
| `dashboard-bi-para-pmes` | `/servicos/dashboards-bi` | DataPulse |
| `como-escolher-stack-tecnologica` | `/servicos/automacao-inteligente` | — |
| `integracao-api-whatsapp-business` | `/servicos/integracoes-api` | ChatCore |
| `software-sob-medida-vs-saas` | `/servicos/automacao-inteligente` | — |

---

## Benchmark — O que blogs referência fazem

| Funcionalidade | NuPtechs | Referências (RD, Rock Content, Alura) | Gap |
|---|---|---|---|
| Volume de conteúdo | 6 posts | 200–2.000+ | 🔴 |
| Frequência | Estático | 2–4x/semana | 🔴 |
| Profundidade | 1.000–1.500 palavras | 2.500–5.000 | 🟡 |
| Topic clusters | Não | Sim | 🔴 |
| Busca interna | Não | Sim | 🟡 |
| Filtro por categoria | Não | Sim | 🟡 |
| Imagens/gráficos | Não | Sim (abundante) | 🔴 |
| Código de exemplo | Não | Sim | 🟡 |
| CTA contextual | Não | Sim (múltiplos) | 🔴 |
| Newsletter/lead magnet | Não | Sim | 🔴 |
| Mind maps interativos | **SIM ✓** | **Não** | ✅ Diferencial |
| Mnemônicos animados | **SIM ✓** | **Não** | ✅ Diferencial |
| Reading progress | **SIM ✓** | Raro | ✅ Diferencial |
| Busca semântica (Pinecone) | **SIM ✓** | **Não** (só fuzzy text) | ✅ Diferencial |
| Related posts automáticos (K-NN) | **SIM ✓** | Manual / tag-based | ✅ Diferencial |
| Artigos em camadas de profundidade | **SIM ✓** | **Não** | ✅ Diferencial |

---

## Conclusão

> O blog tem **infraestrutura técnica de primeiro mundo** presa em uma **estratégia de conteúdo embrionária**.
>
> Com o **Sistema de Explosão em Camadas** + **Pinecone**, o blog da NuPtechs se torna algo que **não existe em nenhum blog técnico do Brasil** — e possivelmente do mundo:
>
> 1. **Qualquer pessoa** consegue entender qualquer tema (Depth 0)
> 2. **Profissionais** conseguem aplicar na prática (Depth 1)
> 3. **Desenvolvedores** conseguem implementar (Depth 2)
> 4. **Especialistas** encontram profundidade total (Depth 3)
> 5. **Tudo no mesmo artigo**, sem perder nada do conteúdo original
> 6. **Mind map + mnemônico gerados por IA** para cada artigo automaticamente
> 7. **Autor cola texto bruto → IA organiza tudo** → publicação
> 8. **Busca semântica** que entende significado, não apenas palavras
> 9. **Related posts automáticos** via Pinecone — zero trabalho manual
> 10. **Base de conhecimento** que fica mais inteligente a cada artigo
>
> Isso transforma o blog de "mais um blog de tech" em um **recurso educacional único** — onde a complexidade é diluída em camadas, não simplificada, e onde o conhecimento se conecta automaticamente. **Diferencial impossível de copiar facilmente.**

---

*Última atualização: 1 de março de 2026*
