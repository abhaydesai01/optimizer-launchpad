import Link from "next/link";
import {
  HeartPulse,
  Landmark,
  Building2,
  GraduationCap,
  Gem,
  ConciergeBell,
} from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const CATEGORIES = [
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Landmark, label: "Finance" },
  { icon: Building2, label: "Real estate" },
  { icon: GraduationCap, label: "Education" },
  { icon: Gem, label: "Jewellery" },
  { icon: ConciergeBell, label: "Hospitality" },
];

const PROFILES = [
  "Brands with real credentials that aren't showing up in AI answers.",
  "Enterprises whose competitors are already being named.",
  "Founders who want to own their category's answer before it hardens.",
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="mk-section mk-hairline" aria-labelledby="who-its-for-heading">
      <div className="mk-wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="mk-kicker">Who it&apos;s for</p>
            <h2 id="who-its-for-heading" className="mk-h2 mt-5 text-[var(--paper)]">
              Built for categories where trust decides the sale.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mk-body mt-7">
              When the purchase is significant — a hospital, a bank, a home, a
              school, an heirloom, a stay — buyers ask AI who to trust before
              they ask anyone else. These are the categories where the answer
              matters most.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CATEGORIES.map((category) => (
                <li
                  key={category.label}
                  className="flex items-center gap-2.5 border border-[var(--ink-line)] px-4 py-3.5 text-sm text-[var(--paper-soft)]"
                >
                  <category.icon
                    className="h-4 w-4 shrink-0 text-[var(--amber)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {category.label}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[var(--paper-muted)]">
              Running an agency?{" "}
              <Link
                href="/agency"
                className="font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
              >
                White-label the platform under your brand →
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="flex h-full flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper-muted)]">
              You&apos;ll recognise yourself here
            </p>
            <ul className="mt-6 space-y-6">
              {PROFILES.map((profile) => (
                <li
                  key={profile}
                  className="border-l border-[var(--mint)] pl-6 font-serif-display text-lg leading-relaxed text-[var(--paper-soft)] md:text-xl"
                >
                  {profile}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
