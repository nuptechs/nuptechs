import { Pinecone } from "@pinecone-database/pinecone";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

/* ═══════════════════════════════════════════════════════════
   Pinecone Client — Singleton + helpers
   Handles embedding generation, upsert, and semantic search
   ═══════════════════════════════════════════════════════════ */

let _pinecone: Pinecone | null = null;

function getPinecone(): Pinecone {
  if (!_pinecone) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not set");
    }
    _pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  }
  return _pinecone;
}

export function getIndex() {
  const indexName = process.env.PINECONE_INDEX ?? "nuptechs-blog";
  return getPinecone().index(indexName);
}

/* ── Generate embedding for text ───────────────────────────── */
export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });
  return result.embedding;
}

/* ── Generate embeddings in batch ──────────────────────────── */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const results = await Promise.all(texts.map((t) => generateEmbedding(t)));
  return results;
}

/* ── Vector metadata interface ─────────────────────────────── */
export interface BlogVectorMetadata {
  slug: string;
  title: string;
  tag: string;
  type: "full" | "summary" | "section";
  depth?: number;
  sectionId?: string;
  sectionHeading?: string;
  publishedAt: string;
  wordCount: number;
  textPreview: string;
}

/* ── Upsert vectors ────────────────────────────────────────── */
export async function upsertVectors(
  vectors: {
    id: string;
    values: number[];
    metadata: BlogVectorMetadata;
  }[]
) {
  const index = getIndex();
  // Pinecone allows max 100 vectors per upsert
  const batchSize = 100;
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.upsert({
      records: batch.map((v) => ({
        id: v.id,
        values: v.values,
        metadata: v.metadata as unknown as Record<string, string | number | boolean>,
      })),
    });
  }
}

/* ── Semantic search ───────────────────────────────────────── */
export async function semanticSearch(
  query: string,
  options: {
    topK?: number;
    filter?: Record<string, unknown>;
  } = {}
) {
  const { topK = 5, filter } = options;
  const queryVector = await generateEmbedding(query);
  const index = getIndex();

  const results = await index.query({
    vector: queryVector,
    topK,
    filter,
    includeMetadata: true,
  });

  return results.matches ?? [];
}

/* ── Find related posts by slug ────────────────────────────── */
export async function findRelatedPosts(
  slug: string,
  topK: number = 5
): Promise<string[]> {
  const index = getIndex();

  // Fetch the full article vector
  const fetched = await index.fetch({ ids: [slug] });
  const record = fetched.records?.[slug];
  if (!record?.values) return [];

  // Query for similar articles
  const results = await index.query({
    vector: record.values,
    topK: topK + 1, // +1 because the article itself will be in the results
    filter: { type: { $eq: "full" } },
    includeMetadata: true,
  });

  return (results.matches ?? [])
    .filter((m) => (m.metadata as unknown as BlogVectorMetadata)?.slug !== slug)
    .filter((m) => (m.score ?? 0) > 0.7)
    .slice(0, topK)
    .map((m) => (m.metadata as unknown as BlogVectorMetadata).slug);
}

/* ── Delete vectors for a slug ─────────────────────────────── */
export async function deleteVectorsForSlug(slug: string) {
  const index = getIndex();
  // Delete all vectors with this slug prefix
  // Using metadata filter approach
  const results = await index.query({
    vector: new Array(1536).fill(0), // dummy vector
    topK: 100,
    filter: { slug: { $eq: slug } },
    includeMetadata: false,
  });

  const ids = (results.matches ?? []).map((m) => m.id);
  if (ids.length > 0) {
    await index.deleteMany(ids);
  }
}

/* ── Strip HTML tags from content ──────────────────────────── */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
