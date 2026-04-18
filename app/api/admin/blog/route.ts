import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";
import type { BlogPostStatus } from "../../../../lib/core/ports/blog.port";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as BlogPostStatus | null;
  const tag = searchParams.get("tag") || undefined;
  const search = searchParams.get("search") || undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { blog } = getContainer();
  const [items, total, stats, contentHealth] = await Promise.all([
    blog.findAll({ status: status || undefined, tag, search }, limit, offset),
    blog.count({ status: status || undefined, tag, search }),
    blog.getStats(),
    blog.getContentHealth(),
  ]);

  return NextResponse.json({ items, total, stats, contentHealth });
}

/** POST — sync source posts into DB */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.posts || !Array.isArray(body.posts)) {
    return NextResponse.json({ error: "posts array required" }, { status: 400 });
  }

  const { blog } = getContainer();
  const synced = await blog.syncFromSource(body.posts);

  return NextResponse.json({ synced });
}
