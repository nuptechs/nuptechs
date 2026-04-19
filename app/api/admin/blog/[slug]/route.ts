import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../lib/auth";
import { getContainer } from "../../../../../lib/core/container";
import type { BlogPostStatus } from "../../../../../lib/core/ports/blog.port";

type RouteParams = { params: { slug: string } };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { blog } = getContainer();
  const post = await blog.findBySlug(params.slug);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { blog, audit } = getContainer();

  let post;
  if (body.status) {
    post = await blog.updateStatus(params.slug, body.status as BlogPostStatus);
    await audit.log({
      action: body.status === "published" ? "blog.published" : "blog.updated",
      entityType: "blog",
      entityId: params.slug,
      detail: { status: body.status },
      performedBy: session.user.sub,
      performedByName: session.user.name ?? null,
      ipAddress: null,
    });
  } else {
    const meta: Record<string, string> = {};
    if (body.seoTitle !== undefined) meta.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) meta.seoDescription = body.seoDescription;
    if (body.featuredImage !== undefined) meta.featuredImage = body.featuredImage;

    post = await blog.updateMeta(params.slug, meta);
    await audit.log({
      action: "blog.updated",
      entityType: "blog",
      entityId: params.slug,
      detail: meta,
      performedBy: session.user.sub,
      performedByName: session.user.name ?? null,
      ipAddress: null,
    });
  }

  return NextResponse.json({ post });
}
