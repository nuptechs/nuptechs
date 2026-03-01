import { z } from "zod";

/* ═══════════════════════════════════════════════════════════
   Blog AI Schemas — Zod contracts for all pipeline stages
   Used with Vercel AI SDK structured output (Output.object)
   ═══════════════════════════════════════════════════════════ */

/* ── Mind Map ──────────────────────────────────────────────── */
export const MindMapLeafSchema = z.object({
  label: z.string().max(20).describe("Nome da folha (max 20 chars)"),
});

export const MindMapBranchSchema = z.object({
  label: z.string().max(25).describe("Nome do ramo (max 25 chars)"),
  children: z
    .array(MindMapLeafSchema)
    .min(2)
    .max(5)
    .describe("Folhas do ramo — conceitos específicos"),
});

export const MindMapNodeSchema = z.object({
  label: z
    .string()
    .max(30)
    .describe("Nome curto do conceito central (max 30 chars, cabe no círculo SVG)"),
  children: z
    .array(MindMapBranchSchema)
    .min(2)
    .max(4)
    .describe("Ramos principais — max 4 para legibilidade no SVG"),
});

/* ── Mnemonic ──────────────────────────────────────────────── */
export const MnemonicBreakdownSchema = z.object({
  letter: z.string().length(1).describe("Uma letra do acrônimo"),
  word: z.string().max(30).describe("Palavra-chave que a letra representa"),
  hint: z
    .string()
    .max(60)
    .describe("Dica curta que ajuda a memorizar (max 60 chars)"),
});

export const MnemonicSchema = z.object({
  acronym: z
    .string()
    .min(3)
    .max(7)
    .describe("Acrônimo pronunciável em português (3-7 letras)"),
  breakdown: z
    .array(MnemonicBreakdownSchema)
    .min(3)
    .max(7)
    .describe("Cada letra do acrônimo com palavra e dica"),
});

/* ── Review schemas ────────────────────────────────────────── */
export const ReviewedMindMapSchema = z.object({
  score: z
    .number()
    .min(1)
    .max(10)
    .describe("Nota de qualidade: coerência, completude, concisão"),
  issues: z
    .array(z.string())
    .describe("Problemas encontrados (vazio se score >= 8)"),
  revised: MindMapNodeSchema.describe("Versão revisada/melhorada do mind map"),
});

export const ReviewedMnemonicSchema = z.object({
  score: z
    .number()
    .min(1)
    .max(10)
    .describe("Nota: memorabilidade, pronúncia, relevância"),
  issues: z
    .array(z.string())
    .describe("Problemas encontrados (vazio se score >= 8)"),
  revised: MnemonicSchema.describe("Versão revisada/melhorada do mnemônico"),
});

/* ── Etapa 1: Structural Analysis ──────────────────────────── */
export const ConceptSchema = z.object({
  id: z.string().describe("ID único do conceito, ex: 'c1', 'c2'"),
  title: z.string().max(80).describe("Nome do conceito"),
  summary: z
    .string()
    .max(200)
    .describe("Resumo do conceito em 1-2 frases"),
  complexity: z
    .number()
    .min(1)
    .max(10)
    .describe("Complexidade: 1=leigo, 10=PhD"),
  audience: z.enum(["leigo", "gerente", "tecnico", "especialista"]),
  dependsOn: z
    .array(z.string())
    .describe("IDs dos conceitos que este depende"),
  estimatedWords: z
    .number()
    .describe("Estimativa de palavras para explicar"),
  originalExcerpt: z
    .string()
    .describe("Trecho original do input relacionado"),
});

export const StructuralAnalysisSchema = z.object({
  concepts: z.array(ConceptSchema).min(3).max(30),
  suggestedTitle: z.string().max(80),
  suggestedTag: z.string().max(25),
  totalComplexityRange: z
    .string()
    .describe("Ex: '3-9' indicando range do conteúdo"),
  suggestedMaxDepth: z
    .enum(["1", "2", "3"])
    .describe("Profundidade recomendada"),
});

/* ── Etapa 2: Layer Allocation ─────────────────────────────── */
export const LayerSectionPlanSchema = z.object({
  id: z.string(),
  heading: z.string().max(80),
  conceptIds: z
    .array(z.string())
    .describe("Conceitos cobertos nesta seção"),
  parentSectionId: z
    .string()
    .nullable()
    .describe("Seção pai (null para depth 0)"),
  estimatedWords: z.number(),
});

export const LayerPlanSchema = z.object({
  depth: z.enum(["0", "1", "2", "3"]),
  conceptIds: z
    .array(z.string())
    .describe("IDs dos conceitos nesta camada"),
  sections: z.array(LayerSectionPlanSchema),
});

export const LayerAllocationSchema = z.object({
  layers: z.array(LayerPlanSchema),
  unallocatedConcepts: z
    .array(z.string())
    .describe("Deve ser vazio — tudo alocado"),
});

/* ── Etapa 3: Layer Content ────────────────────────────────── */
export const GeneratedSectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  content: z.string().describe("HTML do conteúdo da seção"),
  depth: z.number().min(0).max(3),
  parentId: z.string().nullable(),
  wordCount: z.number(),
});

export const GeneratedCalloutSchema = z.object({
  type: z.enum(["tip", "warning", "insight", "example"]),
  title: z.string().max(40),
  body: z.string().max(200),
  afterSectionId: z.string(),
  depth: z.number().min(0).max(3),
});

export const LayerContentSchema = z.object({
  sections: z.array(GeneratedSectionSchema),
  callouts: z.array(GeneratedCalloutSchema),
});

/* ── Etapa 4: Aids ─────────────────────────────────────────── */
export const GeneratedAidsSchema = z.object({
  executiveSummary: z
    .string()
    .max(500)
    .describe("Resumo executivo de 2-3 frases"),
  keyTakeaways: z
    .array(z.string().max(150))
    .min(3)
    .max(7)
    .describe("5-7 pontos principais cross-layer"),
  keywords: z
    .array(z.string().max(40))
    .min(3)
    .max(8)
    .describe("Keywords SEO do artigo"),
  readTimeByDepth: z
    .record(z.string(), z.string())
    .describe("Ex: { '0': '2 min', '1': '5 min', '2': '8 min', '3': '15 min' }"),
});

/* ── Etapa 5: Quality Review ───────────────────────────────── */
export const LayerScoreSchema = z.object({
  depth: z.number(),
  score: z.number().min(1).max(10),
  issues: z.array(z.string()),
});

export const SuggestedFixSchema = z.object({
  sectionId: z.string(),
  issue: z.string(),
  suggestion: z.string(),
});

export const QualityReviewSchema = z.object({
  overallScore: z.number().min(1).max(10),
  layerScores: z.array(LayerScoreSchema),
  accessibilityCheck: z.object({
    depth0UnderstandableByLayperson: z.boolean(),
    depth1StandaloneWithoutDeeper: z.boolean(),
    depth2AddsRealValue: z.boolean(),
    depth3CoversAllInput: z.boolean(),
    noInfoLost: z.boolean(),
  }),
  suggestedFixes: z.array(SuggestedFixSchema),
});

/* ── Type exports ──────────────────────────────────────────── */
export type MindMapNodeData = z.infer<typeof MindMapNodeSchema>;
export type MnemonicData = z.infer<typeof MnemonicSchema>;
export type ReviewedMindMap = z.infer<typeof ReviewedMindMapSchema>;
export type ReviewedMnemonic = z.infer<typeof ReviewedMnemonicSchema>;
export type StructuralAnalysis = z.infer<typeof StructuralAnalysisSchema>;
export type LayerAllocation = z.infer<typeof LayerAllocationSchema>;
export type LayerContent = z.infer<typeof LayerContentSchema>;
export type GeneratedAids = z.infer<typeof GeneratedAidsSchema>;
export type QualityReview = z.infer<typeof QualityReviewSchema>;
