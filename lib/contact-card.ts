import { buildVCard, splitName, type VCardInput } from "./vcard";
import type { ActiveTemplate } from "./card-templates";

// Hardcoded fallback for when no admin template is configured.
// Mirrors the legacy values from /api/share-card and /public/comercial/contato.vcf.
export const DEFAULT_CONTACT = {
  fullName: "Silkeny Ferreira",
  title: "Diretor Comercial",
  org: "NuPtechs",
  phone: "+55 62 98550-7649",
  email: "silkeny@nuptechs.com",
  websitePath: "/comercial",
  note: "Canal comercial NuPtechs",
} as const;

export type ResolvedContact = {
  fullName: string;
  title: string;
  org: string;
  primaryPhone: string;       // human display
  primaryPhoneDigits: string; // digits-only for wuid/sendContact
  secondaryPhone: string | null;
  email: string;
  websiteUrl: string;
  address: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  photo: { mime: string; bytes: Buffer } | null;
};

export function resolveContact(
  template: ActiveTemplate | null,
  siteUrl: string
): ResolvedContact {
  const fullName = template?.contactName?.trim() || DEFAULT_CONTACT.fullName;
  const title = template?.contactTitle?.trim() || DEFAULT_CONTACT.title;
  const org = template?.contactOrg?.trim() || DEFAULT_CONTACT.org;
  const rawPhone = template?.contactPhone?.trim() || DEFAULT_CONTACT.phone;
  const phoneDigits = rawPhone.replace(/\D/g, "") || "5562985507649";
  const phoneDisplay = rawPhone.startsWith("+") || /\D/.test(rawPhone)
    ? rawPhone
    : `+${phoneDigits}`;
  const email = template?.contactEmail?.trim() || DEFAULT_CONTACT.email;
  const websiteUrl =
    template?.contactWebsiteUrl?.trim() ||
    `${siteUrl}${DEFAULT_CONTACT.websitePath}`;
  const secondaryPhone = template?.contactSecondaryPhone?.trim() || null;
  const address = template?.contactAddress?.trim() || null;
  const linkedinUrl = template?.contactLinkedinUrl?.trim() || null;
  const instagramUrl = template?.contactInstagramUrl?.trim() || null;
  const photo =
    template?.contactPhotoBytes && template.contactPhotoMime
      ? { mime: template.contactPhotoMime, bytes: template.contactPhotoBytes }
      : null;

  return {
    fullName,
    title,
    org,
    primaryPhone: phoneDisplay,
    primaryPhoneDigits: phoneDigits,
    secondaryPhone,
    email,
    websiteUrl,
    address,
    linkedinUrl,
    instagramUrl,
    photo,
  };
}

export function contactToVCard(c: ResolvedContact): string {
  const { given, family } = splitName(c.fullName);
  const phones: VCardInput["phones"] = [
    { label: "WORK,VOICE", value: c.primaryPhone },
  ];
  if (c.secondaryPhone) {
    phones.push({ label: "CELL,VOICE", value: c.secondaryPhone });
  }
  return buildVCard({
    fullName: c.fullName,
    givenName: given,
    familyName: family,
    title: c.title,
    org: c.org,
    phones,
    emails: [{ label: "INTERNET,WORK", value: c.email }],
    urls: [c.websiteUrl],
    address: c.address,
    linkedinUrl: c.linkedinUrl,
    instagramUrl: c.instagramUrl,
    photo: c.photo,
    note: DEFAULT_CONTACT.note,
  });
}
