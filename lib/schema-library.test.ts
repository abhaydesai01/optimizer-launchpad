import { describe, expect, it } from "vitest";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildCourseSchema,
  buildFAQSchema,
  buildLocalBusinessSchema,
  buildMedicalBusinessSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildProductSchema,
  buildQAPageSchema,
  buildSoftwareApplicationSchema,
  schemaTemplateLibrary,
} from "@/lib/schema-library";

function expectSchemaEnvelope(schema: Record<string, unknown>, type: string) {
  expect(schema["@context"]).toBe("https://schema.org");
  expect(schema["@type"]).toBe(type);
}

describe("schema template library", () => {
  it("exposes all required template builders", () => {
    expect(Object.keys(schemaTemplateLibrary).sort()).toEqual(
      [
        "Article",
        "Blog",
        "BreadcrumbList",
        "ContactPage",
        "Course",
        "FAQPage",
        "ItemList",
        "LocalBusiness",
        "MedicalBusiness",
        "Organization",
        "Person",
        "Product",
        "QAPage",
        "SoftwareApplication",
      ].sort(),
    );
  });

  it("builds valid Organization schema envelope", () => {
    const schema = buildOrganizationSchema({
      name: "Optimizer360",
      url: "https://optimizer360.ai",
      description: "GEO platform",
      founderName: "Abhay",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "Organization");
  });

  it("builds valid FAQ schema envelope", () => {
    const schema = buildFAQSchema([
      { question: "What is GEO?", answer: "Generative Engine Optimization." },
    ]);
    expectSchemaEnvelope(schema as Record<string, unknown>, "FAQPage");
  });

  it("builds valid Course schema envelope", () => {
    const schema = buildCourseSchema({
      name: "GEO 101",
      description: "Intro to GEO",
      providerName: "Optimizer360",
      providerUrl: "https://optimizer360.ai",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "Course");
  });

  it("builds valid MedicalBusiness schema envelope", () => {
    const schema = buildMedicalBusinessSchema({
      name: "Clinic GEO",
      description: "Medical visibility",
      url: "https://example.com",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "MedicalBusiness");
  });

  it("builds valid LocalBusiness schema envelope", () => {
    const schema = buildLocalBusinessSchema({
      name: "Local GEO",
      description: "Local visibility",
      url: "https://example.com",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "LocalBusiness");
  });

  it("builds valid Product schema envelope", () => {
    const schema = buildProductSchema({
      name: "Optimizer360 GEO",
      description: "Product description",
      brandName: "Optimizer360",
      url: "https://optimizer360.ai",
      price: "35000",
      priceCurrency: "INR",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "Product");
  });

  it("builds Organization schema with logo", () => {
    const schema = buildOrganizationSchema({
      name: "Optimizer360.ai",
      url: "https://optimizer360.ai",
      description: "GEO firm",
      logo: "https://optimizer360.ai/og-image.png",
    });
    expect((schema.logo as { url?: string }).url).toBe("https://optimizer360.ai/og-image.png");
  });

  it("builds valid Article schema envelope", () => {
    const schema = buildArticleSchema({
      headline: "What is AI GEO?",
      description: "Definition",
      url: "https://optimizer360.ai/blog/what-is-ai-geo",
      datePublished: "2026-09-12T00:00:00.000Z",
      authorName: "Optimizer360 GEO team",
      image: "https://optimizer360.ai/og-image.png",
      publisherLogo: "https://optimizer360.ai/og-image.png",
    });
    expectSchemaEnvelope(schema as Record<string, unknown>, "Article");
    expect(schema.datePublished).toBe("2026-09-12T00:00:00.000Z");
  });

  it("builds valid Breadcrumb, Person, SoftwareApplication and ContactPage schemas", () => {
    expectSchemaEnvelope(
      buildBreadcrumbSchema([{ name: "Home", url: "https://optimizer360.ai" }]) as Record<
        string,
        unknown
      >,
      "BreadcrumbList",
    );
    expectSchemaEnvelope(
      buildPersonSchema({
        name: "Optimizer360 GEO team",
        url: "https://optimizer360.ai/authors/geo-team",
      }) as Record<string, unknown>,
      "Person",
    );
    expectSchemaEnvelope(
      buildSoftwareApplicationSchema({
        name: "Agency Platform",
        description: "White-label GEO",
        url: "https://optimizer360.ai/agency",
      }) as Record<string, unknown>,
      "SoftwareApplication",
    );
    expectSchemaEnvelope(
      buildContactPageSchema({
        name: "Contact",
        url: "https://optimizer360.ai/contact",
        description: "Talk to us",
      }) as Record<string, unknown>,
      "ContactPage",
    );
  });

  it("builds valid QAPage schema envelope", () => {
    const schema = buildQAPageSchema([
      {
        question: "How do we improve AI citations?",
        answer: {
          text: "Use structured content and entity signals.",
        },
      },
    ]);
    expectSchemaEnvelope(schema as Record<string, unknown>, "QAPage");
  });
});
