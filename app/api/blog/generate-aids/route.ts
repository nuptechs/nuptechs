import { NextResponse } from "next/server";
import { generateAids } from "../../../lib/blog-ai-generate-aids";

/* ═══════════════════════════════════════════════════════════
   POST /api/blog/generate-aids
   Standalone endpoint for generating Mind Map + Mnemonic
   for an existing post (without full pipeline processing).
   ═══════════════════════════════════════════════════════════ */

export const maxDuration = 60;

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.BLOG_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, tag, sections, keyTakeaways } = body as {
      title: string;
      tag: string;
      sections: { heading: string; content: string }[];
      keyTakeaways: string[];
    };

    if (!title || !sections?.length || !keyTakeaways?.length) {
      return NextResponse.json(
        { error: "Required: title, sections[], keyTakeaways[]" },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const result = await generateAids({ title, tag: tag ?? "", sections, keyTakeaways });

    return NextResponse.json({
      mindMap: result.mindMap,
      mnemonic: result.mnemonic,
      meta: {
        ...result.meta,
        processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
      },
    });
  } catch (error) {
    console.error("[generate-aids] Error:", error);
    return NextResponse.json(
      {
        error: "Aid generation failed.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
