import { NextResponse } from "next/server";
import { db } from "../../../../db";
import { pageViews } from "../../../../db/schema";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const { path, referrer, sessionId } = (await request.json()) as {
      path: string;
      referrer?: string;
      sessionId?: string;
    };

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") ?? undefined;
    const country = headersList.get("x-vercel-ip-country") ??
                    headersList.get("cf-ipcountry") ??
                    undefined;

    await db.insert(pageViews).values({
      path,
      referrer: referrer ?? null,
      userAgent: userAgent ?? null,
      country: country ?? null,
      sessionId: sessionId ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silently fail — analytics should never block
    return NextResponse.json({ ok: true });
  }
}
