import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { settings } = getContainer();
  const siteSettings = await settings.getSiteSettings();
  return NextResponse.json(siteSettings);
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { settings, audit } = getContainer();
  const userName = session.user.name || session.user.email || session.user.sub;

  await settings.updateSiteSettings(body);

  await audit.log({
    action: "settings.updated",
    entityType: "settings",
    entityId: "site_settings",
    detail: { fields: Object.keys(body) },
    performedBy: session.user.sub,
    performedByName: userName,
    ipAddress: request.headers.get("x-forwarded-for") || null,
  });

  const updated = await settings.getSiteSettings();
  return NextResponse.json(updated);
}
