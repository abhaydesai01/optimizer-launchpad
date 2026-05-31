import PipelineLog from "@/lib/models/PipelineLog";

export async function logPipelineFailure(
  articleId: string | undefined,
  step: "brief" | "draft" | "review" | "schema" | "publish",
  reason: string,
) {
  if (!articleId) return;
  try {
    await PipelineLog.create({
      articleId,
      step,
      status: "failed",
      notes: reason.slice(0, 500),
    });
  } catch (error) {
    console.error("Failed to write pipeline failure log", error);
  }
}
