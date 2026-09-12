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
  logo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    description: input.description,
    sameAs: input.sameAs || [],
    logo: input.logo
      ? {
          "@type": "ImageObject",
          url: input.logo,
        }
      : undefined,
    image: input.logo,
    founder: input.founderName
      ? {
          "@type": "Person",
          name: input.founderName,
        }
      : undefined,
  };
}

export function buildPersonSchema(input: {
  name: string;
  url: string;
  description?: string;
  jobTitle?: string;
  sameAs?: string[];
  worksFor?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    url: input.url,
    description: input.description,
    jobTitle: input.jobTitle,
    sameAs: input.sameAs || [],
    worksFor: input.worksFor
      ? { "@type": "Organization", name: input.worksFor }
      : undefined,
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildSoftwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory || "BusinessApplication",
    operatingSystem: input.operatingSystem || "Web",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };
}

export function buildArticleSchema(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  publisherName?: string;
  publisherUrl?: string;
  publisherLogo?: string;
}) {
  const publisherName = input.publisherName || "Optimizer360.ai";
  const publisherUrl = input.publisherUrl || "https://optimizer360.ai";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Person",
      name: input.authorName,
      url: input.authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: publisherUrl,
      logo: input.publisherLogo
        ? { "@type": "ImageObject", url: input.publisherLogo }
        : undefined,
    },
    image: input.image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    url: input.url,
  };
}

export function buildBlogSchema(input: {
  name: string;
  description: string;
  url: string;
  posts: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: input.name,
    description: input.description,
    url: input.url,
    blogPost: input.posts.map((post, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: post.name,
      url: post.url,
    })),
  };
}

export function buildItemListSchema(input: {
  name: string;
  description?: string;
  items: Array<{ name: string; url?: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

export function buildContactPageSchema(input: {
  name: string;
  url: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    url: input.url,
    description: input.description,
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
  Person: buildPersonSchema,
  BreadcrumbList: buildBreadcrumbSchema,
  SoftwareApplication: buildSoftwareApplicationSchema,
  Article: buildArticleSchema,
  Blog: buildBlogSchema,
  ItemList: buildItemListSchema,
  ContactPage: buildContactPageSchema,
};
