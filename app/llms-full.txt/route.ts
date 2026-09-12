import { buildLlmsFullTxt } from "@/lib/geo-discovery";

export const dynamic = "force-dynamic";

export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
