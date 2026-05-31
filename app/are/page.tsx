import type { Metadata } from "next";
import { AREPageClient } from "@/components/are/AREPageClient";
import { buildFAQSchema, buildProductSchema } from "@/lib/schema-library";

export const metadata: Metadata = {
  title: "ARE - Distribution Infrastructure for Your Brand | Optimizer360",
  description:
    "ARE is the Autonomous Revenue Engine that runs your brand's distribution on autopilot. Lead generation, outreach, nurturing, and closing - without a human sales team.",
  alternates: {
    canonical: "https://optimizer360.ai/are",
  },
  openGraph: {
    title: "ARE - Distribution Infrastructure for Your Brand | Optimizer360",
    description:
      "ARE is the Autonomous Revenue Engine that runs your brand's distribution on autopilot. Lead generation, outreach, nurturing, and closing - without a human sales team.",
    images: ["https://optimizer360.ai/are-og-image.png"],
  },
};

const areProductSchema = buildProductSchema({
  name: "Optimizer360 ARE - Autonomous Revenue Engine",
  description:
    "ARE is distribution infrastructure for brands — a full GTM automation system that gets your product in front of the right buyer automatically, without a human sales team.",
  brandName: "Optimizer360",
  url: "https://optimizer360.ai/are",
  price: "45000",
  priceCurrency: "INR",
});

const areFaqSchema = buildFAQSchema([
    {
      question: "What is an Autonomous Revenue Engine (ARE)?",
      answer:
        "An Autonomous Revenue Engine (ARE) is a full-stack GTM automation system that replaces manual sales and marketing labour with AI agents. ARE prospects, qualifies, reaches out, nurtures, and closes deals automatically.",
    },
    {
      question: "How is ARE different from HubSpot or Salesforce?",
      answer:
        "CRMs store and track your pipeline, while ARE runs distribution autonomously by prospecting, writing outreach, following up, and syncing CRM data.",
    },
    {
      question: "Does ARE completely replace my sales team?",
      answer:
        "ARE removes repetitive distribution work so your human team can focus on relationships and complex closes.",
    },
    {
      question: "How long does it take to set up ARE?",
      answer:
        "Initial setup usually takes 5 to 7 business days with full distribution velocity by weeks 3 to 4.",
    },
    {
      question: "What channels does ARE operate on?",
      answer:
        "ARE currently runs email and LinkedIn outreach, with SMS available for enterprise plans.",
    },
    {
      question: "Is ARE suitable for businesses with no existing sales team?",
      answer:
        "Yes, ARE is built to act as complete distribution infrastructure for founder-led or lean teams.",
    },
  ]);

export default function AREPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areFaqSchema) }}
      />
      <AREPageClient />
    </>
  );
}
