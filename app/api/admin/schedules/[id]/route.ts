import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../../lib/auth";
import { getContainer } from "../../../../../lib/core/container";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const scheduleId = parseInt(id);
  if (isNaN(scheduleId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await request.json();
  const { schedules, audit } = getContainer();
  const userName = session.user.name || session.user.email || session.user.sub;
  let schedule;

  switch (body.action) {
    case "confirm":
      schedule = await schedules.confirm(scheduleId, body.meetingUrl);
      break;
    case "complete":
      schedule = await schedules.complete(scheduleId, body.summary);
      break;
    case "cancel":
      schedule = await schedules.cancel(scheduleId, body.reason);
      break;
    case "no_show":
      schedule = await schedules.markNoShow(scheduleId);
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  await audit.log({
    action: `schedule.${body.action}` as any,
    entityType: "schedule",
    entityId: String(scheduleId),
    detail: { action: body.action, ...(body.reason && { reason: body.reason }) },
    performedBy: session.user.sub,
    performedByName: userName,
    ipAddress: request.headers.get("x-forwarded-for") || null,
  });

  return NextResponse.json({ schedule });
}
