import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight } from "next/font/google";
import {
  buildFAQSchema,
  buildOrganizationSchema,
  buildProductSchema,
} from "@/lib/schema-library";
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

const orgSchema = buildOrganizationSchema({
  name: "Optimizer360",
  url: "https://optimizer360.ai",
  description:
    "Optimizer360 GEO gets your business cited in ChatGPT, Perplexity, Google AI Overviews, and every AI engine your buyers are using.",
  founderName: "Salil Chaturvedi",
  sameAs: [
    "https://linkedin.com/company/optimizer360",
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360",
  ],
});

const productSchema = buildProductSchema({
  name: "Optimizer360 GEO",
  description:
    "GEO SaaS platform plus managed service. Tracks and improves brand citations across ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini.",
  brandName: "Optimizer360",
  url: "https://optimizer360.ai",
  price: "35000",
  priceCurrency: "INR",
});

const faqSchema = buildFAQSchema([
    {
      question: "What is Generative Engine Optimization (GEO)?",
      answer:
        "Generative Engine Optimization (GEO) is the practice of structuring your brand's content and authority signals so that AI engines like ChatGPT, Perplexity, and Google AI Overviews cite your business in their responses.",
    },
    {
      question: "How is Optimizer360 different from tools like Profound or Peec AI?",
      answer:
        "Profound and Peec AI are tracking-only tools, while Optimizer360 combines tracking with a dedicated execution team that improves citations for you.",
    },
    {
      question: "Does Optimizer360 GEO replace my existing SEO?",
      answer:
        "No. GEO works alongside SEO and adds AI-specific layers such as schema markup, question-based content, FAQ optimization, and entity building.",
    },
    {
      question: "How long does it take to see GEO results?",
      answer:
        "Most clients see their first AI citations within 4 to 6 weeks, while full citation authority usually builds over 3 to 6 months.",
    },
    {
      question: "Is Optimizer360 suitable for early-stage startups?",
      answer:
        "Yes. Early-stage teams can build citation authority sooner and gain a compounding advantage, with a plan designed for founder budgets.",
    },
    {
      question: "What AI engines does Optimizer360 track?",
      answer:
        "Optimizer360 tracks ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini.",
    },
  ]);

export const metadata: Metadata = {
  metadataBase: new URL("https://optimizer360.ai"),
  title:
    "Optimizer360 GEO - Get Your Brand Cited by ChatGPT, Perplexity & Google AI",
  description:
    "Optimizer360 GEO tracks and improves your brand's AI citations. SaaS dashboard + done-for-you execution. Free audit delivered in 48 hours.",
  alternates: {
    canonical: "https://optimizer360.ai",
  },
  openGraph: {
    title:
      "Optimizer360 GEO - Get Your Brand Cited by ChatGPT, Perplexity & Google AI",
    description:
      "Optimizer360 GEO tracks and improves your brand's AI citations. SaaS dashboard + done-for-you execution. Free audit delivered in 48 hours.",
    url: "https://optimizer360.ai",
    siteName: "Optimizer360",
    type: "website",
    images: [
      {
        url: "https://optimizer360.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Optimizer360 GEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Optimizer360 GEO - Get Your Brand Cited by ChatGPT, Perplexity & Google AI",
    description:
      "Optimizer360 GEO tracks and improves your brand's AI citations. SaaS dashboard + done-for-you execution.",
    images: ["https://optimizer360.ai/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </body>
    </html>
  );
}
