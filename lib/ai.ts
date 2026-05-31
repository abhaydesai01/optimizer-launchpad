import Anthropic from "@anthropic-ai/sdk";

export const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export function extractJson(text: string) {
  const cleaned = text.trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Could not parse model JSON output");
    return JSON.parse(match[0]);
  }
}

export function applyInternalLinks(
  content: string,
  links: { anchorText: string; targetUrl: string }[],
) {
  let nextContent = content;
  for (const link of links) {
    const escaped = link.anchorText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`);
    if (regex.test(nextContent)) {
      nextContent = nextContent.replace(
        regex,
        `[${link.anchorText}](${link.targetUrl})`,
      );
    }
  }
  return nextContent;
}
