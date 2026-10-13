import { LINKEDIN_URL } from "@/lib/site";

export const DEFAULT_AUTHOR = {
  slug: "geo-team",
  name: "Optimizer360 GEO team",
  role: "GEO strategists",
  bio: "The Optimizer360.ai GEO team writes definition-first explainers on Generative Engine Optimisation. We do not invent statistics, client names, awards, or citation guarantees.",
  sameAs: [LINKEDIN_URL],
} as const;
