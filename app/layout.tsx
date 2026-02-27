import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollObserver from "./components/ScrollObserver";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuptechs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NuPtechs — Desenvolvimento de Software Sob Medida com IA | Brasil",
    template: "%s | NuPtechs"
  },
  description:
    "NuPtechs: desenvolvimento de software sob medida, automação inteligente com IA e produtos prontos para empresas de todos os portes. Diagnóstico grátis em 24h, protótipo em 7 dias. Atendemos todo o Brasil.",
  keywords: [
    // Cauda curta — pilares
    "software sob medida",
    "desenvolvimento de software personalizado",
    "automação empresarial com IA",
    "sistemas de gestão empresarial",
    "desenvolvimento ágil de software",
    // Cauda longa — serviços
    "desenvolvimento de software sob medida para fintech",
    "software de gestão de contratos para empresas",
    "sistema de agendamento inteligente com WhatsApp",
    "dashboard de business intelligence em tempo real",
    "desenvolvimento de aplicativo móvel empresarial",
    "plataforma SaaS para gestão de estoque com IA",
    "automação de processos com inteligência artificial",
    "sistema educacional e-learning responsivo",
    // Geográficas
    "empresa de software Brasília",
    "desenvolvimento de software Distrito Federal",
    "empresa de tecnologia Brasil",
    // Inglês (SEO internacional)
    "custom software development Brazil",
    "agile software development company",
    "AI-driven business automation",
    "SaaS solutions for enterprise",
    "software development agency Latin America",
    // Marca
    "NuPtechs",
    "NuPtechs software",
    "NuPtechs automação"
  ],
  authors: [{ name: "NuPtechs", url: siteUrl }],
  creator: "NuPtechs",
  publisher: "NuPtechs",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "NuPtechs — Desenvolvimento de Software Sob Medida com IA",
    description:
      "Sistemas personalizados, automação com IA e protótipos em 7 dias para empresas em todo o Brasil. Diagnóstico grátis.",
    url: siteUrl,
    siteName: "NuPtechs",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NuPtechs — Desenvolvimento de Software Sob Medida com IA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NuPtechs — Desenvolvimento de Software Sob Medida com IA",
    description:
      "Sistemas personalizados, automação com IA e protótipos em 7 dias. Diagnóstico grátis em 24h.",
    images: [`${siteUrl}/og-image.png`]
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/en"
    }
  },
  verification: {
    google: "google-site-verification-placeholder"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ScrollObserver />
          {children}
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
