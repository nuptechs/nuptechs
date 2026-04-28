import { NextResponse } from "next/server";
import { getActiveCardTemplate } from "../../../lib/card-templates";
import { resolveContact, contactToVCard } from "../../../lib/contact-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuptechs.com";

export async function GET() {
  const template = await getActiveCardTemplate();
  const contact = resolveContact(template, SITE_URL);
  const vcard = contactToVCard(contact);
  const safeName = contact.fullName.replace(/[^\w.-]+/g, "_") || "contato";

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeName}.vcf"`,
      "Cache-Control": "no-store",
    },
  });
}
