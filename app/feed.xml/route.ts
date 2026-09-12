import { buildRssXml } from "@/lib/geo-discovery";

export const dynamic = "force-dynamic";

export async function GET() {
  const body = await buildRssXml();
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
