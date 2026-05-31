import mongoose, { Document, Schema } from "mongoose";

export type SubmissionType = "contact" | "audit";
export type SubmissionStatus = "received" | "processed" | "blocked" | "failed";
export type EmailStatus = "pending" | "sent" | "failed" | "skipped";

export interface ISubmissionLog extends Document {
  requestType: SubmissionType;
  requestStatus: SubmissionStatus;
  ipAddress: string;
  requestPayload: Record<string, unknown>;
  ownerEmailStatus: EmailStatus;
  ownerEmailId?: string;
  ownerEmailError?: string;
  customerEmailStatus: EmailStatus;
  customerEmailId?: string;
  customerEmailError?: string;
  founderEmailStatus: EmailStatus;
  founderEmailId?: string;
  founderEmailError?: string;
  founderEmailScheduledFor?: Date;
  founderEmailAttempts?: number;
  founderEmailLastAttemptAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionLogSchema = new Schema<ISubmissionLog>(
  {
    requestType: {
      type: String,
      enum: ["contact", "audit"],
      required: true,
    },
    requestStatus: {
      type: String,
      enum: ["received", "processed", "blocked", "failed"],
      default: "received",
    },
    ipAddress: { type: String, default: "unknown" },
    requestPayload: { type: Schema.Types.Mixed, default: {} },
    ownerEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "skipped"],
      default: "pending",
    },
    ownerEmailId: { type: String, default: "" },
    ownerEmailError: { type: String, default: "" },
    customerEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "skipped"],
      default: "pending",
    },
    customerEmailId: { type: String, default: "" },
    customerEmailError: { type: String, default: "" },
    founderEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "skipped"],
      default: "pending",
    },
    founderEmailId: { type: String, default: "" },
    founderEmailError: { type: String, default: "" },
    founderEmailScheduledFor: { type: Date },
    founderEmailAttempts: { type: Number, default: 0 },
    founderEmailLastAttemptAt: { type: Date },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.SubmissionLog ||
  mongoose.model<ISubmissionLog>("SubmissionLog", SubmissionLogSchema);
