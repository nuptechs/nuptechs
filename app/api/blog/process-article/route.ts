import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  StructuralAnalysisSchema,
  LayerAllocationSchema,
  LayerContentSchema,
  GeneratedAidsSchema,
  QualityReviewSchema,
} from "../../../lib/blog-ai-schemas";
import {
  STRUCTURAL_ANALYSIS_PROMPT,
  LAYER_ALLOCATION_PROMPT,
  getLayerWritingPrompt,
  AIDS_GENERATION_PROMPT,
  QUALITY_REVIEW_PROMPT,
} from "../../../lib/blog-ai-prompts";
import { generateAids } from "../../../lib/blog-ai-generate-aids";
import { indexArticle } from "../../../lib/blog-ai-index";

/* ═══════════════════════════════════════════════════════════
   POST /api/blog/process-article
   Full 6-stage pipeline:
   1. Structural Analysis → concepts + dependencies
   2. Layer Allocation → distribute concepts into depth 0-3
   3. Layer Writing → generate HTML content per depth
   4. Aids Generation → mind map, mnemonic, takeaways, SEO
   5. Quality Review → score + fixes
   6. Pinecone Index → embeddings + related posts
   ═══════════════════════════════════════════════════════════ */

export const maxDuration = 120; // Allow up to 2 minutes for the pipeline

export async function POST(request: Request) {
  // ── Auth ────────────────────────────────────────────────────
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.BLOG_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { rawContent, title, tag, forceMaxDepth } = body as {
      rawContent: string;
      title?: string;
      tag?: string;
      forceMaxDepth?: 1 | 2 | 3;
    };

    if (!rawContent || rawContent.trim().length < 100) {
      return NextResponse.json(
        { error: "rawContent is required and must be at least 100 characters." },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const wordsInput = rawContent.split(/\s+/).length;

    // ═══ ETAPA 1 — Structural Analysis ══════════════════════
    console.log("[pipeline] Stage 1: Structural Analysis...");
    const analysis = await generateObject({
      model: openai("gpt-4o"),
      schema: StructuralAnalysisSchema,
      prompt: `${STRUCTURAL_ANALYSIS_PROMPT}\n\n---\n\nCONTEÚDO:\n${rawContent}`,
    });

    const concepts = analysis.object.concepts;
    const articleTitle = title ?? analysis.object.suggestedTitle;
    const articleTag = tag ?? analysis.object.suggestedTag;
    const maxDepth = forceMaxDepth ?? parseInt(analysis.object.suggestedMaxDepth) as 1 | 2 | 3;

    console.log(`[pipeline] Extracted ${concepts.length} concepts, suggested depth: ${maxDepth}`);

    // ═══ ETAPA 2 — Layer Allocation ═════════════════════════
    console.log("[pipeline] Stage 2: Layer Allocation...");
    const allocation = await generateObject({
      model: openai("gpt-4o"),
      schema: LayerAllocationSchema,
      prompt: `${LAYER_ALLOCATION_PROMPT}\n\nCONCEITOS EXTRAÍDOS:\n${JSON.stringify(concepts, null, 2)}\n\nPROFUNDIDADE MÁXIMA: ${maxDepth}`,
    });

    if (allocation.object.unallocatedConcepts.length > 0) {
      console.warn("[pipeline] Warning: unallocated concepts:", allocation.object.unallocatedConcepts);
    }

    // ═══ ETAPA 3 — Layer Writing (parallel per depth) ═══════
    console.log("[pipeline] Stage 3: Layer Writing...");
    const activeDepths = allocation.object.layers
      .filter((l) => l.sections.length > 0)
      .map((l) => parseInt(l.depth));

    const layerResults = await Promise.all(
      activeDepths.map(async (depth) => {
        const layer = allocation.object.layers.find((l) => parseInt(l.depth) === depth);
        if (!layer) return null;

        const layerConcepts = concepts.filter((c) =>
          layer.conceptIds.includes(c.id)
        );

        const result = await generateObject({
          model: openai("gpt-4o-mini"),
          schema: LayerContentSchema,
          prompt: `${getLayerWritingPrompt(depth)}\n\nPLANO DE SEÇÕES PARA DEPTH ${depth}:\n${JSON.stringify(layer.sections, null, 2)}\n\nCONCEITOS A COBRIR:\n${JSON.stringify(layerConcepts, null, 2)}\n\nCONTEÚDO ORIGINAL:\n${rawContent}`,
        });

        return result.object;
      })
    );

    // Merge all layer results
    const allSections = layerResults
      .filter(Boolean)
      .flatMap((r) => r!.sections);
    const allCallouts = layerResults
      .filter(Boolean)
      .flatMap((r) => r!.callouts);

    console.log(`[pipeline] Generated ${allSections.length} sections, ${allCallouts.length} callouts`);

    // ═══ ETAPA 4 — Aids Generation ══════════════════════════
    console.log("[pipeline] Stage 4: Aids Generation...");
    const [aidsResult, mindMapMnemonic] = await Promise.all([
      generateObject({
        model: openai("gpt-4o-mini"),
        schema: GeneratedAidsSchema,
        prompt: `${AIDS_GENERATION_PROMPT}\n\nTÍTULO: ${articleTitle}\nTAG: ${articleTag}\n\nSEÇÕES:\n${allSections.map((s) => `[Depth ${s.depth}] ${s.heading}: ${s.content.slice(0, 500)}`).join("\n\n")}`,
      }),
      generateAids({
        title: articleTitle,
        tag: articleTag,
        sections: allSections.map((s) => ({
          heading: s.heading,
          content: s.content,
        })),
        keyTakeaways: [], // Will be generated by aids
      }),
    ]);

    const aids = aidsResult.object;

    // ═══ ETAPA 5 — Quality Review ═══════════════════════════
    console.log("[pipeline] Stage 5: Quality Review...");
    const fullArticleForReview = allSections
      .map((s) => `[DEPTH ${s.depth}] ## ${s.heading}\n${s.content}`)
      .join("\n\n---\n\n");

    const review = await generateObject({
      model: openai("gpt-4o"),
      schema: QualityReviewSchema,
      prompt: `${QUALITY_REVIEW_PROMPT}\n\nARTIGO COMPLETO:\n${fullArticleForReview}\n\nCONTEÚDO ORIGINAL (INPUT):\n${rawContent.slice(0, 4000)}`,
    });

    console.log(`[pipeline] Quality score: ${review.object.overallScore}/10`);

    // ═══ Build the final Post object ════════════════════════
    const slug = articleTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    const wordsOutput = allSections.reduce((acc, s) => acc + s.wordCount, 0);
    const totalReadMin = Math.max(1, Math.ceil(wordsOutput / 200));

    const post = {
      slug,
      tag: articleTag,
      title: articleTitle,
      description: aids.executiveSummary.slice(0, 160),
      keywords: aids.keywords,
      readTime: `${totalReadMin} min`,
      readTimeByDepth: aids.readTimeByDepth,
      publishedAt: new Date().toISOString().split("T")[0],
      author: { name: "NuPtechs", role: "Engenharia & IA" },
      executiveSummary: aids.executiveSummary,
      keyTakeaways: aids.keyTakeaways,
      sections: allSections.map((s) => ({
        id: s.id,
        heading: s.heading,
        content: s.content,
        depth: s.depth as 0 | 1 | 2 | 3,
        parentId: s.parentId ?? undefined,
      })),
      callouts: allCallouts.map((c) => ({
        type: c.type,
        title: c.title,
        body: c.body,
        afterSectionId: c.afterSectionId,
        depth: c.depth as 0 | 1 | 2 | 3,
      })),
      mindMap: mindMapMnemonic.mindMap,
      mnemonic: mindMapMnemonic.mnemonic,
      maxDepth: maxDepth,
      relatedSlugs: [] as string[],
    };

    // ═══ ETAPA 6 — Pinecone Indexing ════════════════════════
    let indexResult = { vectorCount: 0, relatedSlugs: [] as string[] };
    try {
      if (process.env.PINECONE_API_KEY) {
        console.log("[pipeline] Stage 6: Pinecone Indexing...");
        indexResult = await indexArticle({
          ...post,
          sections: post.sections.map((s) => ({
            ...s,
            depth: s.depth,
          })),
        });
        post.relatedSlugs = indexResult.relatedSlugs;
        console.log(`[pipeline] Indexed ${indexResult.vectorCount} vectors, ${indexResult.relatedSlugs.length} related posts`);
      } else {
        console.log("[pipeline] Skipping Pinecone (no API key)");
      }
    } catch (e) {
      console.error("[pipeline] Pinecone indexing failed (non-blocking):", e);
    }

    const processingTime = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;
    console.log(`[pipeline] Complete in ${processingTime}`);

    // Build depth distribution
    const depthDistribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
    for (const s of allSections) {
      depthDistribution[s.depth as 0 | 1 | 2 | 3] += s.wordCount;
    }

    return NextResponse.json({
      post,
      meta: {
        conceptsExtracted: concepts.length,
        wordsInput,
        wordsOutput,
        depthDistribution,
        qualityScores: {
          overall: review.object.overallScore,
          byDepth: Object.fromEntries(
            review.object.layerScores.map((l) => [l.depth, l.score])
          ),
        },
        mindMapScore: mindMapMnemonic.meta.mindMapScore,
        mnemonicScore: mindMapMnemonic.meta.mnemonicScore,
        vectorsIndexed: indexResult.vectorCount,
        processingTime,
        attempts: mindMapMnemonic.meta.attempts,
      },
    });
  } catch (error) {
    console.error("[pipeline] Error:", error);
    return NextResponse.json(
      {
        error: "Pipeline processing failed.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
