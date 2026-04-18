import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { analytics } = getContainer();
  const [overview, topPages, dailyViews, topReferrers] = await Promise.all([
    analytics.getOverview(),
    analytics.getTopPages(30, 10),
    analytics.getDailyViews(30),
    analytics.getTopReferrers(30, 10),
  ]);

  return NextResponse.json({ overview, topPages, dailyViews, topReferrers });
}
