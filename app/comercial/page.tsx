import type { Metadata, Viewport } from "next";
import CommercialCard from "./CommercialCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";
const pageUrl = `${siteUrl}/comercial`;
const title = "Silkeny Ferreira - Cartao Comercial";
const description = "Diretor Comercial da NuPtechs Tecnologia. Cartao digital com acesso rapido aos canais de contato.";
const ogImage = `${siteUrl}/og?title=Silkeny+Ferreira+%E2%80%94+NuPtechs&lang=pt`;

export const metadata: Metadata = {
  title,
  description,
  manifest: "/comercial/manifest.json",
  keywords: [
    "Silkeny Ferreira",
    "NuPtechs comercial",
    "cartao digital NuPtechs",
    "contato comercial NuPtechs"
  ],
  alternates: {
    canonical: "/comercial"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Silkeny · NuPtechs"
  },
  openGraph: {
    title: "Silkeny Ferreira - NuPtechs",
    description,
    url: pageUrl,
    siteName: "NuPtechs",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Cartao comercial de Silkeny Ferreira na NuPtechs"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Silkeny Ferreira - NuPtechs",
    description,
    images: [ogImage]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f9fc",
  colorScheme: "light"
};

export default function ComercialPage() {
  return <CommercialCard />;
}