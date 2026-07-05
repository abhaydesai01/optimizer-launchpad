import { Reveal } from "@/components/marketing/Reveal";

export function TheShift() {
  return (
    <section className="mk-section mk-hairline" aria-labelledby="the-shift-heading">
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">The shift</p>
          <h2 id="the-shift-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            The way buyers find brands has already changed.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded border border-[var(--ink-line)] bg-[var(--ink-line)] md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full bg-[var(--ink-900)] p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper-muted)]">
                Yesterday
              </p>
              <h3 className="mk-h3 mt-4 text-[var(--paper-soft)]">
                Ten blue links
              </h3>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--ink-line-strong)]" aria-hidden="true" />
                  A buyer typed a query into Google and scanned a page of results.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--ink-line-strong)]" aria-hidden="true" />
                  If you ranked, you got the click — and the chance to make your case.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--ink-line-strong)]" aria-hidden="true" />
                  Ten positions meant ten chances to be seen.
                </li>
              </ul>
              <div className="mt-10 space-y-2.5" aria-hidden="true">
                {[92, 78, 84, 62, 70, 55].map((width, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-[11px] tabular-nums text-[var(--paper-muted)]">
                      {index + 1}
                    </span>
                    <span
                      className="h-1.5 rounded-full bg-[var(--ink-800)]"
                      style={{ width: `${width * 0.7}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="relative h-full bg-[var(--ink-850)] p-8 md:p-12">
              <span
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--mint)] to-transparent opacity-60"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mint)]">
                Today
              </p>
              <h3 className="mk-h3 mt-4 text-[var(--paper)]">
                One synthesised answer
              </h3>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--paper-soft)]">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
                  A buyer asks AI a question and gets one confident answer back.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
                  The answer names just a few brands. There is no page two.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
                  If the AI doesn&apos;t name you, you were never in the
                  consideration set.
                </li>
              </ul>
              <div className="mt-10 rounded border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-5" aria-hidden="true">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--mint)]" />
                  <span className="h-1.5 w-2/3 rounded-full bg-[var(--ink-800)]" />
                </div>
                <div className="mt-3 space-y-2">
                  <span className="block h-1.5 w-full rounded-full bg-[var(--ink-800)]" />
                  <span className="block h-1.5 w-5/6 rounded-full bg-[var(--ink-800)]" />
                  <span className="block h-1.5 w-3/4 rounded-full bg-[var(--ink-800)]" />
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full border border-[var(--mint)] px-3 py-1 text-[11px] text-[var(--mint)]">
                    Brand A
                  </span>
                  <span className="rounded-full border border-[var(--ink-line-strong)] px-3 py-1 text-[11px] text-[var(--paper-muted)]">
                    Brand B
                  </span>
                  <span className="rounded-full border border-[var(--ink-line-strong)] px-3 py-1 text-[11px] text-[var(--paper-muted)]">
                    Brand C
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
