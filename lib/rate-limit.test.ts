import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows up to configured limit", () => {
    const key = `rate-limit-test-${Date.now()}`;

    const first = checkRateLimit({ key, limit: 2, windowMs: 60_000 });
    const second = checkRateLimit({ key, limit: 2, windowMs: 60_000 });
    const third = checkRateLimit({ key, limit: 2, windowMs: 60_000 });

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.retryAfterSeconds).toBeGreaterThan(0);
  });
});
