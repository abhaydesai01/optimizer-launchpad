import mongoose, { Document, Schema } from "mongoose";

export type ArticleStatus =
  | "brief_pending"
  | "draft_pending"
  | "awaiting_review"
  | "review_done"
  | "schema_injected"
  | "published";

export interface IArticleBrief {
  h1: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h2s: string[];
  keyPoints: string[];
  statsToInclude: { stat: string; context: string; source: string }[];
  angle: string;
  wordCountTarget: number;
}

export interface IArticleSchema {
  faqSchema: Record<string, unknown>;
  articleSchema: Record<string, unknown>;
  internalLinks: { anchorText: string; targetUrl: string; context: string }[];
}

export interface IArticle extends Document {
  targetId: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  brief: IArticleBrief;
  draft: string;
  humanNotes: string;
  finalContent: string;
  schemaJson: IArticleSchema;
  status: ArticleStatus;
  wordCount: number;
  published: boolean;
  publishedAt?: Date;
  linkedinDraft?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    targetId: { type: Schema.Types.ObjectId, ref: "Target", required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    brief: { type: Schema.Types.Mixed, default: {} },
    draft: { type: String, default: "" },
    humanNotes: { type: String, default: "" },
    finalContent: { type: String, default: "" },
    schemaJson: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, default: "brief_pending" },
    wordCount: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    linkedinDraft: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);
