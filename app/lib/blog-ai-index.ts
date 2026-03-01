import {
  generateEmbedding,
  upsertVectors,
  findRelatedPosts,
  deleteVectorsForSlug,
  stripHtml,
  type BlogVectorMetadata,
} from "./pinecone";

/* ═══════════════════════════════════════════════════════════
   Blog AI Index — Etapa 6: Embedding + Indexação + Related
   Called after the main pipeline (Etapas 1-5) completes.
   ═══════════════════════════════════════════════════════════ */

interface IndexablePost {
  slug: string;
  title: string;
  tag: string;
  publishedAt: string;
  executiveSummary?: string;
  description: string;
  keyTakeaways: string[];
  sections: {
    id: string;
    heading: string;
    content: string;
    depth?: number;
  }[];
}

/**
 * Index a processed article in Pinecone.
 * Creates multiple vectors per article for granular search:
 * - 1 "full" vector (concatenation of all content)
 * - 1 "summary" vector (executive summary + key takeaways)
 * - N "section" vectors (one per depth 0+1 section)
 *
 * Returns the auto-generated relatedSlugs.
 */
export async function indexArticle(post: IndexablePost): Promise<{
  vectorCount: number;
  relatedSlugs: string[];
}> {
  // Remove old vectors first (in case of re-index)
  await deleteVectorsForSlug(post.slug);

  const vectors: {
    id: string;
    values: number[];
    metadata: BlogVectorMetadata;
  }[] = [];

  // ── 1. Full article embedding ──────────────────────────────
  const allText = post.sections.map((s) => `${s.heading}\n${stripHtml(s.content)}`).join("\n\n");
  const totalWords = allText.split(/\s+/).length;

  const fullEmbedding = await generateEmbedding(allText.slice(0, 8000)); // limit input

  vectors.push({
    id: post.slug,
    values: fullEmbedding,
    metadata: {
      slug: post.slug,
      title: post.title,
      tag: post.tag,
      type: "full",
      publishedAt: post.publishedAt,
      wordCount: totalWords,
      textPreview: (post.executiveSummary ?? post.description).slice(0, 200),
    },
  });

  // ── 2. Summary embedding ───────────────────────────────────
  const summaryText = [
    post.executiveSummary ?? post.description,
    ...post.keyTakeaways,
  ].join("\n");

  const summaryEmbedding = await generateEmbedding(summaryText);

  vectors.push({
    id: `${post.slug}#summary`,
    values: summaryEmbedding,
    metadata: {
      slug: post.slug,
      title: post.title,
      tag: post.tag,
      type: "summary",
      publishedAt: post.publishedAt,
      wordCount: summaryText.split(/\s+/).length,
      textPreview: (post.executiveSummary ?? post.description).slice(0, 200),
    },
  });

  // ── 3. Section embeddings (depth 0 + 1 only) ──────────────
  const indexableSections = post.sections.filter(
    (s) => (s.depth ?? 0) <= 1
  );

  for (const section of indexableSections) {
    const sectionText = `${section.heading}\n${stripHtml(section.content)}`;
    const sectionWords = sectionText.split(/\s+/).length;

    // Skip very short sections
    if (sectionWords < 20) continue;

    const sectionEmbedding = await generateEmbedding(sectionText);

    vectors.push({
      id: `${post.slug}#${section.id}`,
      values: sectionEmbedding,
      metadata: {
        slug: post.slug,
        title: post.title,
        tag: post.tag,
        type: "section",
        depth: section.depth ?? 0,
        sectionId: section.id,
        sectionHeading: section.heading,
        publishedAt: post.publishedAt,
        wordCount: sectionWords,
        textPreview: stripHtml(section.content).slice(0, 200),
      },
    });
  }

  // ── 4. Upsert all vectors ──────────────────────────────────
  await upsertVectors(vectors);

  // ── 5. Find related posts ──────────────────────────────────
  // Small delay to allow index to update
  await new Promise((r) => setTimeout(r, 1000));
  const relatedSlugs = await findRelatedPosts(post.slug);

  return {
    vectorCount: vectors.length,
    relatedSlugs,
  };
}
