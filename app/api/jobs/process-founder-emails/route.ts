import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import { processFounderEmailQueue } from "@/lib/founder-email-queue";
import { authOptions } from "@/lib/auth";

async function isAuthorized(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    return true;
  }

  const expected = process.env.FOUNDER_QUEUE_SECRET;

  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }

  const headerSecret = request.headers.get("x-founder-queue-secret");
  const bearer = request.headers.get("authorization");
  const bearerToken = bearer?.startsWith("Bearer ") ? bearer.slice(7).trim() : "";

  return headerSecret === expected || bearerToken === expected;
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const result = await processFounderEmailQueue(50);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process founder email queue",
      },
      { status: 500 },
    );
  }
}
