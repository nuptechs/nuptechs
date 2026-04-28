// vCard 3.0 generator for the commercial card.
// Spec: RFC 2426. Line endings MUST be CRLF; long lines folded at 75 octets.

export type VCardInput = {
  fullName: string;
  givenName?: string;
  familyName?: string;
  title?: string | null;
  org?: string | null;
  // Multiple phones, e.g. [{label: "WORK,VOICE", value: "+5562985507649"}]
  phones?: { label: string; value: string }[];
  emails?: { label: string; value: string }[];
  urls?: string[];
  // Single-line address; we shove it into the LABEL field too.
  address?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  // Embed a binary photo (JPEG/PNG) as base64. Detected mime e.g. "image/jpeg".
  photo?: { mime: string; bytes: Buffer } | null;
  note?: string | null;
};

// vCard 3.0 requires the property/value text to escape these characters.
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// Fold long lines at 75 octets per RFC 2426 §2.6 ("\r\n " continuation).
function foldLine(line: string): string {
  const MAX = 75;
  if (line.length <= MAX) return line;
  const parts: string[] = [];
  let remaining = line;
  parts.push(remaining.slice(0, MAX));
  remaining = remaining.slice(MAX);
  while (remaining.length > 0) {
    parts.push(" " + remaining.slice(0, MAX - 1));
    remaining = remaining.slice(MAX - 1);
  }
  return parts.join("\r\n");
}

function photoMimeToType(mime: string): string {
  const m = mime.toLowerCase();
  if (m.includes("png")) return "PNG";
  if (m.includes("webp")) return "JPEG"; // WhatsApp/iOS contacts don't render WEBP — convert upstream if needed
  return "JPEG";
}

export function buildVCard(input: VCardInput): string {
  const lines: string[] = [];
  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");

  const family = input.familyName ?? "";
  const given = input.givenName ?? "";
  lines.push(`N:${escapeText(family)};${escapeText(given)};;;`);
  lines.push(`FN:${escapeText(input.fullName)}`);

  if (input.org) lines.push(`ORG:${escapeText(input.org)}`);
  if (input.title) lines.push(`TITLE:${escapeText(input.title)}`);

  for (const p of input.phones ?? []) {
    if (!p.value) continue;
    lines.push(`TEL;TYPE=${p.label}:${escapeText(p.value)}`);
  }
  for (const e of input.emails ?? []) {
    if (!e.value) continue;
    lines.push(`EMAIL;TYPE=${e.label}:${escapeText(e.value)}`);
  }
  for (const u of input.urls ?? []) {
    if (!u) continue;
    lines.push(`URL:${escapeText(u)}`);
  }

  if (input.address) {
    // ADR has 7 components; we only fill street.
    lines.push(`ADR;TYPE=WORK:;;${escapeText(input.address)};;;;`);
    lines.push(`LABEL;TYPE=WORK:${escapeText(input.address)}`);
  }

  if (input.linkedinUrl) {
    lines.push(
      `X-SOCIALPROFILE;TYPE=linkedin:${escapeText(input.linkedinUrl)}`
    );
  }
  if (input.instagramUrl) {
    lines.push(
      `X-SOCIALPROFILE;TYPE=instagram:${escapeText(input.instagramUrl)}`
    );
  }

  if (input.photo && input.photo.bytes.length > 0) {
    const type = photoMimeToType(input.photo.mime);
    const b64 = input.photo.bytes.toString("base64");
    // PHOTO is single-line value but very long → foldLine handles wrapping.
    lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${b64}`);
  }

  if (input.note) lines.push(`NOTE:${escapeText(input.note)}`);

  lines.push("END:VCARD");

  return lines.map(foldLine).join("\r\n") + "\r\n";
}

// Minimal helper to split a "Silkeny Ferreira" into given/family for N:.
export function splitName(fullName: string): { given: string; family: string } {
  const trimmed = fullName.trim();
  if (!trimmed) return { given: "", family: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { given: parts[0]!, family: "" };
  return { given: parts[0]!, family: parts.slice(1).join(" ") };
}
