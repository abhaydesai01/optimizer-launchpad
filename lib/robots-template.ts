import type { MetadataRoute } from "next";

export const geoRobotsTemplate: MetadataRoute.Robots = {
  rules: [
    { userAgent: "*", allow: "/" },
    { userAgent: "GPTBot", allow: "/" },
    { userAgent: "PerplexityBot", allow: "/" },
    { userAgent: "ClaudeBot", allow: "/" },
    { userAgent: "Google-Extended", allow: "/" },
  ],
  sitemap: "https://optimizer360.ai/sitemap.xml",
  host: "https://optimizer360.ai",
};
