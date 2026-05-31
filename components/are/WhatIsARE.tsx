import { Reveal } from "@/components/Reveal";

export function WhatIsARE() {
  return (
    <>
      <section id="distribution" className="are-section section-pad bg-white">
        <Reveal className="section-wrap">
          <h2 className="are-h2">
            Why distribution is the only problem that actually matters
          </h2>

          <div className="are-body mt-8 space-y-5">
            <p>
              You can have the best product in your category. If your
              distribution is broken — slow, inconsistent, dependent on one or
              two salespeople — you will lose to a worse product with better
              distribution. Every time.
            </p>
            <p>
              The companies that dominate their markets don't just have great
              products. They have distribution infrastructure that works at
              scale: a predictable, repeatable system for getting their product
              in front of the right buyer, at the right time, with the right
              message.
            </p>
            <p>
              For decades, building distribution meant building a sales team. It
              meant hiring, training, managing, and scaling humans through every
              stage of the pipeline. It was expensive, slow, and entirely
              dependent on individual performance.
            </p>
            <p>ARE changes that equation permanently.</p>
          </div>

          <div className="mt-8 rounded-2xl border border-transparent bg-[linear-gradient(white,white),linear-gradient(135deg,#00D2A0,#8B7BFF)] bg-origin-border bg-clip-padding p-6 shadow-sm">
            <p className="text-lg text-[var(--text-primary)]">
              "ARE is distribution infrastructure for your brand. We get your
              product in front of the right people — automatically, at scale,
              without a sales team."
            </p>
          </div>
        </Reveal>
      </section>

      <section id="what-is-are" className="are-section section-pad border-y border-[var(--border-color)] bg-[#F8FAFD]">
        <Reveal className="section-wrap">
          <h2 className="are-h2">
            What is an Autonomous Revenue Engine (ARE)?
          </h2>

          <div className="are-body mt-8 space-y-5">
            <p>
              An Autonomous Revenue Engine (ARE) is a full-stack distribution
              system that replaces the manual labour of sales and marketing with
              AI agents. Unlike traditional CRMs or automation tools that assist
              your team, ARE operates as your complete distribution
              infrastructure — prospecting, qualifying, reaching out, following
              up, nurturing, and closing deals without human intervention at each
              step.
            </p>
            <p>
              ARE is not a chatbot. It is not a campaign scheduler. It is a
              complete distribution operating system where AI agents handle every
              stage of the pipeline — from identifying a cold prospect to
              converting them into a paying client.
            </p>
            <p>
              Optimizer360 ARE is built for businesses that want to scale
              distribution without scaling headcount. Whether you're a founder
              with no sales team or an enterprise that wants to remove
              bottlenecks from an existing GTM function, ARE runs your
              distribution 24/7, at scale, without dropping a single follow-up.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
