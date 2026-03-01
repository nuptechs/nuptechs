import { NextResponse } from "next/server";
import { indexArticle } from "../../../lib/blog-ai-index";

/* ═══════════════════════════════════════════════════════════
   POST /api/blog/index-article
   Standalone endpoint for indexing an existing post in Pinecone.
   Used for migration (indexing existing posts) or re-indexing.
   ═══════════════════════════════════════════════════════════ */

export const maxDuration = 30;

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.BLOG_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { post } = body as {
      post: {
        slug: string;
        title: string;
        tag: string;
        publishedAt: string;
        description: string;
        executiveSummary?: string;
        keyTakeaways: string[];
        sections: {
          id: string;
          heading: string;
          content: string;
          depth?: number;
        }[];
      };
    };

    if (!post?.slug || !post?.sections?.length) {
      return NextResponse.json(
        { error: "Required: post object with slug, title, sections[]" },
        { status: 400 }
      );
    }

    const result = await indexArticle(post);

    return NextResponse.json({
      success: true,
      indexed: result,
    });
  } catch (error) {
    console.error("[index-article] Error:", error);
    return NextResponse.json(
      {
        error: "Indexing failed.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
