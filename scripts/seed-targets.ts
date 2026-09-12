import mongoose from "mongoose";
import { GEO_SEED_TARGETS } from "../lib/geo-targets";
import { loadLocalEnv } from "./load-env";

loadLocalEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

async function main() {
  await mongoose.connect(uri as string);
  const Target = (await import("../lib/models/Target")).default;

  await Target.deleteMany({});
  await Target.insertMany(
    GEO_SEED_TARGETS.map((target) => ({
      prompt: target.prompt,
      keyword: target.keyword,
      secondaryKeywords: [...target.secondaryKeywords],
      priority: target.priority,
      status: "pending",
    })),
  );

  console.log(`Seeded ${GEO_SEED_TARGETS.length} GEO targets.`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
