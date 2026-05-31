import { describe, expect, it } from "vitest";
import { geoRobotsTemplate } from "@/lib/robots-template";

describe("geo robots template", () => {
  it("keeps required AI crawlers explicitly allowed", () => {
    const rules = Array.isArray(geoRobotsTemplate.rules)
      ? geoRobotsTemplate.rules
      : [geoRobotsTemplate.rules];

    const requiredBots = ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

    for (const bot of requiredBots) {
      const botRule = rules.find((rule) => rule.userAgent === bot);
      expect(botRule).toBeDefined();
      expect(botRule?.allow).toBe("/");
    }
  });
});
