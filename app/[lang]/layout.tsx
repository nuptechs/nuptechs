import type { Metadata } from "next";
import { dictionaries, type Locale } from "../i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const d = dictionaries[params.lang];
  const isEn = params.lang === "en";

  const title = isEn
    ? "NuPtechs — Custom Software Development with AI | Brazil"
    : "NuPtechs — Desarrollo de Software a Medida con IA | Brasil";
  const description = isEn
    ? "NuPtechs: custom software development, AI-driven automation and ready-made products for companies of all sizes. Free diagnosis in 24h, prototype in 7 days."
    : "NuPtechs: desarrollo de software a medida, automatización inteligente con IA y productos listos para empresas de todos los tamaños. Diagnóstico gratis en 24h.";

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | NuPtechs` },
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}/${params.lang}`,
      languages: {
        "pt-BR": siteUrl,
        "en-US": `${siteUrl}/en`,
        "es-419": `${siteUrl}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${params.lang}`,
      siteName: "NuPtechs",
      type: "website",
      locale: d.lang,
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return <>{children}</>;
}
