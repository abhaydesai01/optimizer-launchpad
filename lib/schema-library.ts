type FAQItem = {
  question: string;
  answer: string;
};

type QAPageAnswer = {
  text: string;
  upvoteCount?: number;
  dateCreated?: string;
  authorName?: string;
};

type QAPageQuestion = {
  question: string;
  answer: QAPageAnswer;
  upvoteCount?: number;
  dateCreated?: string;
  authorName?: string;
};

export function buildOrganizationSchema(input: {
  name: string;
  url: string;
  description: string;
  sameAs?: string[];
  founderName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    description: input.description,
    sameAs: input.sameAs || [],
    founder: input.founderName
      ? {
          "@type": "Person",
          name: input.founderName,
        }
      : undefined,
  };
}

export function buildFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildQAPageSchema(items: QAPageQuestion[]) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      upvoteCount: item.upvoteCount || 0,
      dateCreated: item.dateCreated,
      author: {
        "@type": "Person",
        name: item.authorName || "Optimizer360 Team",
      },
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.text,
        upvoteCount: item.answer.upvoteCount || 0,
        dateCreated: item.answer.dateCreated,
        author: {
          "@type": "Person",
          name: item.answer.authorName || "Optimizer360 Team",
        },
      },
    })),
  };
}

export function buildProductSchema(input: {
  name: string;
  description: string;
  brandName: string;
  url: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: {
      "@type": "Brand",
      name: input.brandName,
    },
    url: input.url,
    offers: input.price
      ? {
          "@type": "Offer",
          price: input.price,
          priceCurrency: input.priceCurrency || "INR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function buildCourseSchema(input: {
  name: string;
  description: string;
  providerName: string;
  providerUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: input.providerName,
      sameAs: input.providerUrl,
    },
  };
}

export function buildLocalBusinessSchema(input: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  image?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    description: input.description,
    url: input.url,
    telephone: input.telephone,
    image: input.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.addressLocality || "Mumbai",
      addressRegion: input.addressRegion || "Maharashtra",
      postalCode: input.postalCode || "400001",
      addressCountry: input.addressCountry || "IN",
    },
  };
}

export function buildMedicalBusinessSchema(input: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: input.name,
    description: input.description,
    url: input.url,
    telephone: input.telephone,
    image: input.image,
  };
}

export const schemaTemplateLibrary = {
  FAQPage: buildFAQSchema,
  Organization: buildOrganizationSchema,
  Course: buildCourseSchema,
  MedicalBusiness: buildMedicalBusinessSchema,
  LocalBusiness: buildLocalBusinessSchema,
  Product: buildProductSchema,
  QAPage: buildQAPageSchema,
};
