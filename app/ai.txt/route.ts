import { buildAiTxt } from "@/lib/geo-discovery";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(buildAiTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
