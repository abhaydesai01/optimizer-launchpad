import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Inter_Tight } from "next/font/google";
import {
  buildFAQSchema,
  buildOrganizationSchema,
} from "@/lib/schema-library";
import { MARKETING_FAQ } from "@/lib/marketing-faq";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

const orgSchema = {
  ...buildOrganizationSchema({
    name: "Optimizer360.ai",
    url: "https://optimizer360.ai",
    description:
      "Optimizer360.ai is an AI SEO firm — Generative Engine Optimisation (GEO) — that helps enterprise brands get named, cited and correctly positioned inside AI answers across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
    sameAs: ["https://linkedin.com/company/optimizer360"],
  }),
  alternateName: ["Optimizer360", "Optimizer 360"],
  parentOrganization: {
    "@type": "Organization",
    name: "Stack Intel",
  },
  email: "hello@optimizer360.ai",
  knowsAbout: [
    "AI SEO",
    "Generative Engine Optimisation",
    "Answer Engine Optimisation",
    "AI search visibility",
    "AI citations",
    "Entity SEO",
    "Structured data",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Optimizer360.ai",
  url: "https://optimizer360.ai",
  description:
    "AI SEO for enterprise brands — Generative Engine Optimisation that makes your brand the answer AI gives.",
  publisher: { "@type": "Organization", name: "Optimizer360.ai" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI SEO — Generative Engine Optimisation (GEO)",
  serviceType: "AI SEO / Generative Engine Optimisation",
  provider: { "@type": "Organization", name: "Optimizer360.ai", url: "https://optimizer360.ai" },
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Enterprise brands in healthcare, finance, real estate, education, jewellery and hospitality",
  },
  description:
    "Optimizer360.ai structures a brand's credibility, content and evidence so AI engines — ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude — can read, trust and cite it. Baseline audit, gap diagnosis, gap-targeted content and entity structuring, and weekly citation tracking across all five engines. Engagements are scoped individually; request an audit for a quote.",
};

const faqSchema = buildFAQSchema([...MARKETING_FAQ]);

export const metadata: Metadata = {
  metadataBase: new URL("https://optimizer360.ai"),
  title: {
    default:
      "Optimizer360.ai — AI SEO & Generative Engine Optimisation (GEO) for Enterprise Brands",
    template: "%s | Optimizer360.ai",
  },
  description:
    "Be the brand AI recommends. Optimizer360.ai is the AI SEO (GEO) firm that makes your brand the answer AI gives — across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. A Stack Intel company. We never fabricate data.",
  keywords: [
    "AI SEO",
    "AI SEO agency",
    "Generative Engine Optimisation",
    "GEO",
    "Answer Engine Optimisation",
    "AEO",
    "AI Overviews optimisation",
    "AI citations",
    "AI search visibility",
    "ChatGPT brand visibility",
    "Perplexity citations",
    "enterprise GEO firm",
  ],
  alternates: {
    canonical: "https://optimizer360.ai",
  },
  openGraph: {
    title:
      "Optimizer360.ai — AI SEO & GEO for Enterprise Brands",
    description:
      "Be the brand AI recommends. AI SEO (Generative Engine Optimisation) across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
    url: "https://optimizer360.ai",
    siteName: "Optimizer360.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://optimizer360.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Optimizer360.ai — AI SEO & Generative Engine Optimisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimizer360.ai — AI SEO & GEO for Enterprise Brands",
    description:
      "Be the brand AI recommends. AI SEO (Generative Engine Optimisation) across all five major AI engines.",
    images: ["https://optimizer360.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </body>
    </html>
  );
}
