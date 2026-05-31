"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const FAQS = [
  {
    q: "What is Generative Engine Optimization (GEO)?",
    a: "Generative Engine Optimization (GEO) is the practice of structuring your brand's content and authority signals so that AI engines like ChatGPT, Perplexity, and Google AI Overviews cite your business in their responses. Unlike SEO which targets rankings, GEO targets citations - being the source AI recommends when your buyers ask questions.",
  },
  {
    q: "How is Optimizer360 different from tools like Profound or Peec AI?",
    a: "Profound and Peec AI are tracking-only tools - they show you where you're not showing up, but you still have to fix it yourself. Optimizer360 combines the tracking dashboard with a dedicated execution team. We fix the citations, not just measure them.",
  },
  {
    q: "Does Optimizer360 GEO replace my existing SEO?",
    a: "No - GEO works alongside your SEO. Strong fundamentals (content quality, site speed, backlinks) support GEO performance. Optimizer360 adds the AI-specific layer on top: schema markup, question-based content, FAQ optimisation, and external entity building that AI engines rely on.",
  },
  {
    q: "How long does it take to see GEO results?",
    a: "Most clients see their first AI citations within 4-6 weeks of implementation. Full citation authority - consistent appearance across multiple AI engines for target queries - builds over 3-6 months. Our dashboard shows your progress in real time throughout.",
  },
  {
    q: "Is Optimizer360 suitable for early-stage startups?",
    a: "Yes - early stage is actually the best time to start. AI engines build citation patterns over time. Brands that establish GEO authority early earn a compounding advantage that late movers cannot easily close. Our Starter plan is built specifically for founder budgets.",
  },
  {
    q: "What AI engines does Optimizer360 track?",
    a: "We track citations across ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, and Microsoft Copilot - covering 95%+ of the AI search volume your buyers use today.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-pad border-y border-[var(--border-color)] bg-[var(--bg-surface)]">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-8">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="border-b border-[var(--border-color)] py-5">
                <button
                  className="flex w-full items-center justify-between text-left text-base font-medium"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div className="overflow-hidden">
                    <p className="pt-3 leading-relaxed text-[var(--text-muted)]">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
