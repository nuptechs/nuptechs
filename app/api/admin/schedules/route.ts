import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";
import type { ScheduleStatus } from "../../../../lib/core/ports/schedule.port";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as ScheduleStatus | null;
  const search = searchParams.get("search") || undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { schedules } = getContainer();
  const [items, total, stats] = await Promise.all([
    schedules.findAll({ status: status || undefined, search }, limit, offset),
    schedules.count({ status: status || undefined, search }),
    schedules.getStats(),
  ]);

  return NextResponse.json({ items, total, stats });
}
