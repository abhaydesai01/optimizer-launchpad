import mongoose, { Document, Schema } from "mongoose";

export interface ITarget extends Document {
  prompt: string;
  keyword: string;
  secondaryKeywords: string[];
  priority: number;
  status: "pending" | "in_progress" | "published";
  articleId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TargetSchema = new Schema<ITarget>(
  {
    prompt: { type: String, required: true },
    keyword: { type: String, required: true },
    secondaryKeywords: { type: [String], default: [] },
    priority: { type: Number, default: 1 },
    status: { type: String, default: "pending" },
    articleId: { type: Schema.Types.ObjectId, ref: "Article" },
  },
  { timestamps: true },
);

export default mongoose.models.Target ||
  mongoose.model<ITarget>("Target", TargetSchema);
