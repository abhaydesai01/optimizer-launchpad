export function excerptFromMarkdown(markdown: string, maxWords = 55): string {
  const firstParagraph =
    markdown
      .replace(/^#{1,6}\s+.+$/gm, "")
      .split(/\n\s*\n/)
      .map((block) => block.replace(/[#*_>`[\]]/g, "").trim())
      .find((block) => block.length > 40) || markdown.replace(/\s+/g, " ").trim();

  const words = firstParagraph.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function sourcesFromBrief(
  stats?: Array<{ stat?: string; context?: string; source?: string }>,
): Array<{ stat: string; context: string; url?: string }> {
  if (!Array.isArray(stats)) return [];
  return stats
    .filter((item) => item.stat && item.context)
    .map((item) => {
      const source = (item.source || "").trim();
      const looksLikeUrl = /^https?:\/\//i.test(source);
      return {
        stat: item.stat as string,
        context: item.context as string,
        url: looksLikeUrl ? source : undefined,
      };
    });
}
