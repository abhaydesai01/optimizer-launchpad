import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolveUniqueArticleSlug, slugify } from "@/lib/slug";

const { findOneMock } = vi.hoisted(() => ({
  findOneMock: vi.fn(),
}));

vi.mock("@/lib/models/Article", () => ({
  default: {
    findOne: findOneMock,
  },
}));

describe("slug utilities", () => {
  beforeEach(() => {
    findOneMock.mockReset();
  });

  it("slugify normalizes text", () => {
    expect(slugify("  Hello, GEO World!  ")).toBe("hello-geo-world");
  });

  it("resolveUniqueArticleSlug appends suffix when collisions exist", async () => {
    findOneMock
      .mockReturnValueOnce({
        select: () => ({ lean: async () => ({ _id: "1" }) }),
      })
      .mockReturnValueOnce({
        select: () => ({ lean: async () => ({ _id: "2" }) }),
      })
      .mockReturnValueOnce({
        select: () => ({ lean: async () => null }),
      });

    const result = await resolveUniqueArticleSlug("How GEO Works");
    expect(result).toBe("how-geo-works-2");
  });
});
