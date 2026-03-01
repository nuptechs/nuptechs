import { NextResponse } from "next/server";
import { semanticSearch, type BlogVectorMetadata } from "../../../lib/pinecone";

/* ═══════════════════════════════════════════════════════════
   GET /api/blog/search?q=...&tag=...&limit=5
   Public semantic search endpoint for the blog.
   Uses Pinecone to find articles by meaning, not just keywords.
   ═══════════════════════════════════════════════════════════ */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const tag = searchParams.get("tag");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "5"), 20);

  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required (min 2 chars)." },
      { status: 400 }
    );
  }

  try {
    const startTime = Date.now();

    // Build filter
    const filter: Record<string, unknown> = {};
    if (tag) {
      filter.tag = { $eq: tag };
    }

    const matches = await semanticSearch(query, { topK: limit * 2, filter });

    // Deduplicate by slug (sections from same article)
    const seen = new Set<string>();
    const results = matches
      .filter((m) => {
        const meta = m.metadata as unknown as BlogVectorMetadata;
        if (!meta?.slug || seen.has(meta.slug)) return false;
        seen.add(meta.slug);
        return true;
      })
      .slice(0, limit)
      .map((m) => {
        const meta = m.metadata as unknown as BlogVectorMetadata;
        return {
          slug: meta.slug,
          title: meta.title,
          tag: meta.tag,
          score: Math.round((m.score ?? 0) * 100) / 100,
          textPreview: meta.textPreview,
          matchedSection: meta.type === "section" ? meta.sectionHeading : undefined,
        };
      });

    const latency = `${Date.now() - startTime}ms`;

    return NextResponse.json({
      results,
      meta: {
        query,
        totalResults: results.length,
        latency,
      },
    });
  } catch (error) {
    console.error("[search] Error:", error);
    return NextResponse.json(
      { error: "Search failed.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
