import { NextResponse } from "next/server";

type SchedulePayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  tool?: string;
  timeslot?: string;
  summary?: string;
};

const TOOL_LINKS: Record<string, string | undefined> = {
  "Google Calendar": process.env.SCHEDULING_LINK_GOOGLE,
  "Microsoft Bookings": process.env.SCHEDULING_LINK_MICROSOFT,
  Calendly: process.env.SCHEDULING_LINK_CALENDLY,
  "Cal.com": process.env.SCHEDULING_LINK_CALCOM,
  "HubSpot Meetings": process.env.SCHEDULING_LINK_HUBSPOT
};

export async function POST(request: Request) {
  const payload = (await request.json()) as SchedulePayload;

  if (!payload?.name || !payload?.email || !payload?.tool) {
    return NextResponse.json(
      { message: "Dados obrigatórios ausentes." },
      { status: 400 }
    );
  }

  const redirectUrl = TOOL_LINKS[payload.tool];

  if (!redirectUrl) {
    return NextResponse.json(
      {
        message:
          "Integração não configurada para a ferramenta escolhida. Informe um link oficial de agenda para habilitar.",
        tool: payload.tool
      },
      { status: 501 }
    );
  }

  return NextResponse.json({
    status: "received",
    message:
      "Recebemos seu pedido. Abra o link da agenda para confirmar o horário com a NuPtechs.",
    redirectUrl,
    data: payload
  });
}
