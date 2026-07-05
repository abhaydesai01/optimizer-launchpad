import type { MetadataRoute } from "next";

/**
 * GEO/AEO-friendly robots policy: explicitly welcome every major
 * AI crawler and answer-engine user agent alongside classic search bots.
 */
export const geoRobotsTemplate: MetadataRoute.Robots = {
  rules: [
    { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    // OpenAI (ChatGPT training, search and browsing)
    { userAgent: "GPTBot", allow: "/" },
    { userAgent: "OAI-SearchBot", allow: "/" },
    { userAgent: "ChatGPT-User", allow: "/" },
    // Anthropic (Claude)
    { userAgent: "ClaudeBot", allow: "/" },
    { userAgent: "Claude-Web", allow: "/" },
    { userAgent: "anthropic-ai", allow: "/" },
    // Perplexity
    { userAgent: "PerplexityBot", allow: "/" },
    { userAgent: "Perplexity-User", allow: "/" },
    // Google (AI Overviews, Gemini)
    { userAgent: "Google-Extended", allow: "/" },
    { userAgent: "GoogleOther", allow: "/" },
    // Microsoft / Bing (Copilot)
    { userAgent: "Bingbot", allow: "/" },
    // Others commonly used to source AI answers
    { userAgent: "Applebot-Extended", allow: "/" },
    { userAgent: "meta-externalagent", allow: "/" },
    { userAgent: "CCBot", allow: "/" },
    { userAgent: "cohere-ai", allow: "/" },
  ],
  sitemap: "https://optimizer360.ai/sitemap.xml",
  host: "https://optimizer360.ai",
};
