/**
 * IndexNow tells Bing (and other participating engines) about new or changed pages.
 * The key is public by design: it must be readable at KEY_LOCATION so the engines can verify it.
 */
export const INDEXNOW_HOST = "optimizer360.ai";
export const INDEXNOW_KEY = "8971e0ab903f4c5aed39b57704caab93";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Returns "submitted" on success (HTTP 200/202) or "failed_<status>". Throws on network errors. */
export async function submitToIndexNow(urls: string[]): Promise<string> {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: urls,
    }),
  });
  return response.status === 200 || response.status === 202 ? "submitted" : `failed_${response.status}`;
}
