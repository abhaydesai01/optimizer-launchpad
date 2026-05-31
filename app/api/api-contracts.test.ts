import { describe, expect, it, vi } from "vitest";

describe("public API validation", () => {
  it("rejects malformed contact payloads with 400", async () => {
    vi.resetModules();
    vi.doMock("@/lib/mongodb", () => ({
      default: vi.fn().mockResolvedValue(undefined),
    }));
    vi.doMock("@/lib/models/SubmissionLog", () => ({
      default: {
        create: vi.fn().mockResolvedValue({ _id: "log-contact" }),
      },
    }));

    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "10.0.0.1",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("rejects malformed audit payloads with 400", async () => {
    vi.resetModules();
    vi.doMock("@/lib/mongodb", () => ({
      default: vi.fn().mockResolvedValue(undefined),
    }));
    vi.doMock("@/lib/models/SubmissionLog", () => ({
      default: {
        create: vi.fn().mockResolvedValue({ _id: "log-audit" }),
      },
    }));

    const { POST } = await import("@/app/api/audit/route");
    const response = await POST(
      new Request("http://localhost/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "10.0.0.2",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(400);
  });
});

describe("admin API auth guard", () => {
  it("returns 401 when requireAdmin blocks request", async () => {
    vi.resetModules();
    vi.doMock("@/lib/require-admin", async () => {
      const { NextResponse } = await import("next/server");
      return {
        requireAdmin: vi
          .fn()
          .mockResolvedValue(NextResponse.json({ error: "Unauthorized" }, { status: 401 })),
      };
    });

    const { POST } = await import("@/app/api/admin/start-pipeline/route");
    const response = await POST(
      new Request("http://localhost/api/admin/start-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: "abc" }),
      }),
    );

    expect(response.status).toBe(401);
  });
});
