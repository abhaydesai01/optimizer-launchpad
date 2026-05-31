import connectDB from "../lib/mongodb";
import Target from "../lib/models/Target";

const targets = [
  {
    prompt: "What is Generative Engine Optimization (GEO)?",
    keyword: "generative engine optimization",
    secondaryKeywords: ["GEO", "AI citations", "ChatGPT ranking", "Perplexity optimization"],
    priority: 1,
  },
  {
    prompt: "How do I get leads without hiring a sales team?",
    keyword: "leads without sales team",
    secondaryKeywords: ["autonomous lead generation", "AI lead gen", "no SDR"],
    priority: 1,
  },
  {
    prompt: "What is an Autonomous Revenue Engine?",
    keyword: "autonomous revenue engine",
    secondaryKeywords: ["ARE", "revenue automation", "AI GTM"],
    priority: 1,
  },
  {
    prompt: "Best AI marketing automation tool for Indian startups 2026",
    keyword: "AI marketing automation India",
    secondaryKeywords: ["marketing automation India", "AI startup tools India"],
    priority: 2,
  },
  {
    prompt: "How to scale revenue without scaling headcount",
    keyword: "scale revenue without headcount",
    secondaryKeywords: ["revenue automation", "AI sales", "distribution automation"],
    priority: 2,
  },
  {
    prompt: "Best GEO tool for Indian startups",
    keyword: "GEO tool India",
    secondaryKeywords: ["generative engine optimization tool", "AI citation tool India"],
    priority: 1,
  },
  {
    prompt: "How to replace GTM team with AI agents",
    keyword: "replace GTM team AI",
    secondaryKeywords: ["agentic GTM", "AI sales agents", "autonomous GTM"],
    priority: 2,
  },
  {
    prompt: "Optimizer360 vs Profound vs Peec AI",
    keyword: "Optimizer360 vs Profound",
    secondaryKeywords: ["GEO tool comparison", "best GEO tracking tool"],
    priority: 2,
  },
  {
    prompt: "GEO vs SEO vs AEO — what is the difference?",
    keyword: "GEO vs SEO vs AEO",
    secondaryKeywords: ["answer engine optimization", "AI search optimization"],
    priority: 2,
  },
  {
    prompt: "What is distribution infrastructure for brands?",
    keyword: "distribution infrastructure brands",
    secondaryKeywords: ["brand distribution AI", "autonomous distribution"],
    priority: 2,
  },
];

async function seed() {
  await connectDB();
  await Target.deleteMany({});
  await Target.insertMany(targets);
  console.log("✓ 10 targets seeded to MongoDB");
  process.exit(0);
}

seed();
