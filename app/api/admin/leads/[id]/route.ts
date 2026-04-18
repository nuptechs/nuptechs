import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../../lib/auth";
import { getContainer } from "../../../../../lib/core/container";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const leadId = parseInt(id);
  if (isNaN(leadId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const { leads } = getContainer();
  const [lead, timeline] = await Promise.all([
    leads.findById(leadId),
    leads.getTimeline(leadId),
  ]);

  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ lead, timeline });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const leadId = parseInt(id);
  if (isNaN(leadId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await request.json();
  const { leads, audit } = getContainer();
  const userName = session.user.name || session.user.email || session.user.sub;
  let lead;

  if (body.status) {
    if (body.status === "lost" && body.lostReason) {
      lead = await leads.markLost(leadId, body.lostReason, userName);
    } else {
      lead = await leads.updateStatus(leadId, body.status, userName);
    }
    await audit.log({
      action: "lead.status_changed",
      entityType: "lead",
      entityId: String(leadId),
      detail: { from: body.previousStatus, to: body.status },
      performedBy: session.user.sub,
      performedByName: userName,
      ipAddress: request.headers.get("x-forwarded-for") || null,
    });
  }

  if (body.notes !== undefined) {
    lead = await leads.updateNotes(leadId, body.notes, userName);
    await audit.log({
      action: "lead.notes_updated",
      entityType: "lead",
      entityId: String(leadId),
      detail: { notes: body.notes.slice(0, 200) },
      performedBy: session.user.sub,
      performedByName: userName,
      ipAddress: request.headers.get("x-forwarded-for") || null,
    });
  }

  if (body.score !== undefined) {
    lead = await leads.updateScore(leadId, body.score);
    await audit.log({
      action: "lead.scored",
      entityType: "lead",
      entityId: String(leadId),
      detail: { score: body.score },
      performedBy: session.user.sub,
      performedByName: userName,
      ipAddress: request.headers.get("x-forwarded-for") || null,
    });
  }

  if (body.assignedTo !== undefined) {
    lead = await leads.assign(leadId, body.assignedTo, userName);
    await audit.log({
      action: "lead.assigned",
      entityType: "lead",
      entityId: String(leadId),
      detail: { assignedTo: body.assignedTo },
      performedBy: session.user.sub,
      performedByName: userName,
      ipAddress: request.headers.get("x-forwarded-for") || null,
    });
  }

  if (!lead) {
    lead = await leads.findById(leadId);
  }

  return NextResponse.json({ lead });
}
