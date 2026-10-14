import { readdirSync, readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { INDEXNOW_KEY, INDEXNOW_KEY_LOCATION, submitToIndexNow } from "./indexnow";

describe("IndexNow", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("serves a key file whose name and content match the key", () => {
    const files = readdirSync("public").filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
    expect(files).toEqual([`${INDEXNOW_KEY}.txt`]);
    expect(readFileSync(`public/${files[0]}`, "utf8").trim()).toBe(INDEXNOW_KEY);
  });

  it("posts the host, key, key location and URLs, and reports success on 200/202", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 202 });
    vi.stubGlobal("fetch", fetchMock);
    const status = await submitToIndexNow(["https://optimizer360.ai/blog/x"]);
    expect(status).toBe("submitted");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.indexnow.org/indexnow");
    expect(JSON.parse(init.body)).toEqual({
      host: "optimizer360.ai",
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: ["https://optimizer360.ai/blog/x"],
    });
  });

  it("reports the HTTP status on failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 403 }));
    expect(await submitToIndexNow(["https://optimizer360.ai/"])).toBe("failed_403");
  });
});
