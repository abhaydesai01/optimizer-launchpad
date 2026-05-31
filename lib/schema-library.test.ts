import { describe, expect, it } from "vitest";
import {
  buildCourseSchema,
  buildFAQSchema,
  buildLocalBusinessSchema,
  buildMedicalBusinessSchema,
  buildOrganizationSchema,
  buildProductSchema,
  buildQAPageSchema,
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
        "Course",
        "FAQPage",
        "LocalBusiness",
        "MedicalBusiness",
        "Organization",
        "Product",
        "QAPage",
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
