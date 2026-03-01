import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  MindMapNodeSchema,
  MnemonicSchema,
  ReviewedMindMapSchema,
  ReviewedMnemonicSchema,
  type MindMapNodeData,
  type MnemonicData,
} from "./blog-ai-schemas";
import {
  MIND_MAP_GENERATION_PROMPT,
  MNEMONIC_GENERATION_PROMPT,
  MIND_MAP_REVIEW_PROMPT,
  MNEMONIC_REVIEW_PROMPT,
} from "./blog-ai-prompts";
import { stripHtml } from "./pinecone";

/* ═══════════════════════════════════════════════════════════
   Blog AI Generate Aids — Mind Map + Mnemonic generation
   Two-stage pipeline: Generation (gpt-4o-mini) → Review (gpt-4o)
   ═══════════════════════════════════════════════════════════ */

interface AidInput {
  title: string;
  tag: string;
  sections: { heading: string; content: string }[];
  keyTakeaways: string[];
}

interface AidResult {
  mindMap: MindMapNodeData;
  mnemonic: MnemonicData;
  meta: {
    mindMapScore: number;
    mnemonicScore: number;
    attempts: number;
    models: { generation: string; review: string };
  };
}

/** Extracts clean text from sections for LLM prompts */
function buildArticleContext(input: AidInput): string {
  const sectionsText = input.sections
    .map((s) => `## ${s.heading}\n${stripHtml(s.content)}`)
    .join("\n\n");

  return `TÍTULO: ${input.title}
TAG: ${input.tag}

PONTOS-CHAVE:
${input.keyTakeaways.map((t) => `• ${t}`).join("\n")}

CONTEÚDO:
${sectionsText}`;
}

const GENERATION_MODEL = "gpt-4o-mini";
const REVIEW_MODEL = "gpt-4o";
const MIN_MIND_MAP_SCORE = 8;
const MIN_MNEMONIC_SCORE = 7;
const MAX_RETRIES = 2;

/**
 * Generate mind map and mnemonic with AI review.
 * Stage 1: Generate with gpt-4o-mini (fast/cheap)
 * Stage 2: Review with gpt-4o (smart/quality)
 * Re-generates if score is below threshold (max 2 retries)
 */
export async function generateAids(input: AidInput): Promise<AidResult> {
  const context = buildArticleContext(input);
  let attempts = 0;

  // ── Stage 1: Generate in parallel ──────────────────────────
  const [mindMapResult, mnemonicResult] = await Promise.all([
    generateObject({
      model: openai(GENERATION_MODEL),
      schema: MindMapNodeSchema,
      prompt: `${MIND_MAP_GENERATION_PROMPT}\n\n---\n\n${context}`,
    }),
    generateObject({
      model: openai(GENERATION_MODEL),
      schema: MnemonicSchema,
      prompt: `${MNEMONIC_GENERATION_PROMPT}\n\n---\n\n${context}`,
    }),
  ]);
  attempts++;

  let mindMap = mindMapResult.object;
  let mnemonic = mnemonicResult.object;

  // ── Stage 2: Review in parallel ────────────────────────────
  const [mindMapReview, mnemonicReview] = await Promise.all([
    generateObject({
      model: openai(REVIEW_MODEL),
      schema: ReviewedMindMapSchema,
      prompt: `${MIND_MAP_REVIEW_PROMPT}\n\nMAPA MENTAL GERADO:\n${JSON.stringify(mindMap, null, 2)}\n\n---\n\nARTIGO ORIGINAL:\n${context}`,
    }),
    generateObject({
      model: openai(REVIEW_MODEL),
      schema: ReviewedMnemonicSchema,
      prompt: `${MNEMONIC_REVIEW_PROMPT}\n\nMNEMÔNICO GERADO:\n${JSON.stringify(mnemonic, null, 2)}\n\n---\n\nARTIGO ORIGINAL:\n${context}`,
    }),
  ]);

  mindMap = mindMapReview.object.revised;
  mnemonic = mnemonicReview.object.revised;

  let mindMapScore = mindMapReview.object.score;
  let mnemonicScore = mnemonicReview.object.score;

  // ── Retry loop for low scores ──────────────────────────────
  while (
    attempts < MAX_RETRIES &&
    (mindMapScore < MIN_MIND_MAP_SCORE || mnemonicScore < MIN_MNEMONIC_SCORE)
  ) {
    attempts++;

    const retryPromises: Promise<unknown>[] = [];

    if (mindMapScore < MIN_MIND_MAP_SCORE) {
      retryPromises.push(
        (async () => {
          const regen = await generateObject({
            model: openai(GENERATION_MODEL),
            schema: MindMapNodeSchema,
            prompt: `${MIND_MAP_GENERATION_PROMPT}\n\nPROBLEMAS DA VERSÃO ANTERIOR: ${mindMapReview.object.issues.join("; ")}\n\n---\n\n${context}`,
          });
          const review = await generateObject({
            model: openai(REVIEW_MODEL),
            schema: ReviewedMindMapSchema,
            prompt: `${MIND_MAP_REVIEW_PROMPT}\n\nMAPA MENTAL GERADO:\n${JSON.stringify(regen.object, null, 2)}\n\n---\n\nARTIGO ORIGINAL:\n${context}`,
          });
          mindMap = review.object.revised;
          mindMapScore = review.object.score;
        })()
      );
    }

    if (mnemonicScore < MIN_MNEMONIC_SCORE) {
      retryPromises.push(
        (async () => {
          const regen = await generateObject({
            model: openai(GENERATION_MODEL),
            schema: MnemonicSchema,
            prompt: `${MNEMONIC_GENERATION_PROMPT}\n\nPROBLEMAS DA VERSÃO ANTERIOR: ${mnemonicReview.object.issues.join("; ")}\n\n---\n\n${context}`,
          });
          const review = await generateObject({
            model: openai(REVIEW_MODEL),
            schema: ReviewedMnemonicSchema,
            prompt: `${MNEMONIC_REVIEW_PROMPT}\n\nMNEMÔNICO GERADO:\n${JSON.stringify(regen.object, null, 2)}\n\n---\n\nARTIGO ORIGINAL:\n${context}`,
          });
          mnemonic = review.object.revised;
          mnemonicScore = review.object.score;
        })()
      );
    }

    await Promise.all(retryPromises);
  }

  return {
    mindMap,
    mnemonic,
    meta: {
      mindMapScore,
      mnemonicScore,
      attempts,
      models: { generation: GENERATION_MODEL, review: REVIEW_MODEL },
    },
  };
}
