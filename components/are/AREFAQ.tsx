"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FAQS = [
  {
    q: "What is an Autonomous Revenue Engine (ARE)?",
    a: "An Autonomous Revenue Engine (ARE) is distribution infrastructure for brands — a full-stack system that gets your product in front of the right buyer automatically. ARE prospects, qualifies, reaches out, nurtures, and closes deals without human intervention, running your complete distribution pipeline around the clock.",
  },
  {
    q: "How is ARE different from HubSpot or Salesforce?",
    a: "CRMs like HubSpot and Salesforce store and track your pipeline — but a human still has to work it. ARE runs the distribution autonomously. It prospects automatically, writes and sends outreach, follows up adaptively, and updates your CRM without anyone touching it.",
  },
  {
    q: "Does ARE completely replace my sales team?",
    a: "Not necessarily — ARE replaces the manual, repetitive parts of distribution (prospecting, outreach, follow-up, data entry). Your best people focus on what humans do best: building relationships and closing complex deals. Most clients use ARE to eliminate their SDR function while making their AEs significantly more productive.",
  },
  {
    q: "How long does it take to set up ARE?",
    a: "Initial setup takes 5–7 business days. We configure your ICP, train the AI on your product and messaging, integrate with your existing CRM, and run a test batch before going live. Full distribution velocity is typically reached in weeks 3–4.",
  },
  {
    q: "What channels does ARE operate on?",
    a: "ARE currently operates across email and LinkedIn for outreach, with SMS available on Enterprise plans. All channels managed from one dashboard with unified reporting.",
  },
  {
    q: "Is ARE suitable for businesses with no existing sales team?",
    a: "Yes — ARE is specifically designed for this. For founders and small teams with no dedicated distribution function, ARE acts as your complete distribution infrastructure from day one, at a fraction of the cost of hiring even one full-time sales rep.",
  },
];

export function AREFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="are-faq" className="are-section section-pad border-y border-[var(--border-color)] bg-[#F8FAFD]">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          ARE FAQ for distribution infrastructure buyers
        </h2>

        <div className="mt-8">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border-b border-[#E2E7F0] py-5">
                <button
                  className="flex w-full items-center justify-between text-left text-base font-medium text-[var(--text-primary)]"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 leading-relaxed text-[var(--text-muted)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
