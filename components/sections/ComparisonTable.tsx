import { Reveal } from "@/components/Reveal";

const ROWS = [
  ["Real-time citation tracking", "✓", "✓", "✗", "✗", "✓"],
  ["Done-for-you execution", "✗", "✗", "✓", "✓", "✓"],
  ["SaaS dashboard", "✓", "✓", "✗", "✗", "✓"],
  ["Content writing included", "✗", "✗", "✓", "✓", "✓"],
  ["PR placements included", "✗", "✗", "✓", "✓", "✓"],
  ["India market pricing", "✗", "✗", "✓", "✓", "✓"],
  ["White-label for agencies", "✗", "✗", "✗", "✗", "✓"],
  ["Audit → track → fix loop", "✗", "✗", "✗", "✗", "✓"],
];

const CHECK = "text-[var(--accent-green)]";
const CROSS = "text-[var(--text-faint)]";

export function ComparisonTable() {
  return (
    <section className="section-pad">
      <Reveal className="section-wrap overflow-x-auto">
        <h2 className="display text-4xl font-bold md:text-5xl">
          How Optimizer360 compares
        </h2>
        <table className="mt-8 w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="text-left text-sm text-[var(--text-muted)]">
              <th className="border border-[var(--border-color)] p-3">Feature</th>
              <th className="border border-[var(--border-color)] p-3">Profound</th>
              <th className="border border-[var(--border-color)] p-3">Peec AI</th>
              <th className="border border-[var(--border-color)] p-3">Vryse</th>
              <th className="border border-[var(--border-color)] p-3">upGrowth</th>
              <th className="border border-[var(--border-color)] bg-[#00E5A010] p-3 font-semibold text-[var(--accent-green)]">
                Optimizer360
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row[0]} className="text-sm">
                <td className="border border-[var(--border-color)] p-3 text-[var(--text-primary)]">
                  {row[0]}
                </td>
                {row.slice(1).map((cell, idx) => (
                  <td
                    key={`${row[0]}-${idx}`}
                    className={`border border-[var(--border-color)] p-3 text-center ${cell === "✓" ? CHECK : CROSS}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-lg">
          "Every other tool either tracks or executes. We do both."
        </p>
        <p className="mt-2 text-[var(--text-muted)]">
          What costs ₹2.25 lakh/month globally, we deliver for ₹85,000 - built
          in India for India, with global-grade output.
        </p>
      </Reveal>
    </section>
  );
}
