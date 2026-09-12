import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor extends Document {
  slug: string;
  name: string;
  role: string;
  bio: string;
  sameAs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: "" },
    bio: { type: String, default: "" },
    sameAs: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.Author ||
  mongoose.model<IAuthor>("Author", AuthorSchema);
