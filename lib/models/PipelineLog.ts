import mongoose, { Document, Schema } from "mongoose";

export interface IPipelineLog extends Document {
  articleId: mongoose.Types.ObjectId;
  step: "brief" | "draft" | "review" | "schema" | "publish";
  status: "started" | "completed" | "failed";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const PipelineLogSchema = new Schema<IPipelineLog>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    step: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.PipelineLog ||
  mongoose.model<IPipelineLog>("PipelineLog", PipelineLogSchema);
