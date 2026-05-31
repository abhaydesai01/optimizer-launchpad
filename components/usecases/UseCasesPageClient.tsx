"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useCases,
  useCaseRoles,
  useCaseSegments,
  type UseCaseRole,
  type UseCaseSegment,
} from "@/lib/usecases";

type FilterSegment = "All Segments" | UseCaseSegment;
type FilterRole = "All Roles" | UseCaseRole;

type UseCasesPageClientProps = {
  initialSegment?: FilterSegment;
  initialRole?: FilterRole;
};

export function UseCasesPageClient({
  initialSegment = "All Segments",
  initialRole = "All Roles",
}: UseCasesPageClientProps) {
  const [segment, setSegment] = useState<FilterSegment>(initialSegment);
  const [role, setRole] = useState<FilterRole>(initialRole);

  const filtered = useMemo(() => {
    return useCases.filter((item) => {
      const segmentOk = segment === "All Segments" || item.segment === segment;
      const roleOk = role === "All Roles" || item.roles.includes(role);
      return segmentOk && roleOk;
    });
  }, [segment, role]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">
      <header className="rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A27A]">
          Use Cases
        </p>
        <h1 className="display mt-3 text-3xl font-bold text-[#222735] md:text-5xl">
          GEO playbooks by segment and role
        </h1>
        <p className="mt-4 max-w-4xl text-sm text-[#5E667D]">
          Built with a strategic marketing lens: each use case maps market context,
          demand behavior, role priorities, and a practical operating model to turn
          AI visibility into qualified pipeline.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-[#222735]">
            Segment
            <select
              value={segment}
              onChange={(event) => setSegment(event.target.value as FilterSegment)}
              className="mt-2 block h-11 w-full rounded-xl border border-[#D7DDEC] bg-white px-3 text-sm text-[#1f2740]"
            >
              <option value="All Segments">All Segments</option>
              {useCaseSegments.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-[#222735]">
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as FilterRole)}
              className="mt-2 block h-11 w-full rounded-xl border border-[#D7DDEC] bg-white px-3 text-sm text-[#1f2740]"
            >
              <option value="All Roles">All Roles</option>
              {useCaseRoles.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSegment("All Segments");
                setRole("All Roles");
              }}
              className="h-11 w-full rounded-xl border border-[#D7DDEC] px-4 text-sm font-semibold text-[#1f2740] transition-colors hover:bg-[#f4f6fb]"
            >
              Reset filters
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#5E667D]">
          Showing <span className="font-semibold text-[#1f2740]">{filtered.length}</span>{" "}
          playbooks
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="rounded-2xl border border-[#E2E7F0] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#b9c8ea]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#00A27A]">
              {item.segment}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#222735]">{item.shortTitle}</h2>
            <p className="mt-2 text-sm text-[#5E667D]">{item.tagline}</p>
            <p className="mt-3 text-sm text-[#646D82]">{item.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.roles.map((entry) => (
                <span
                  key={entry}
                  className="rounded-full bg-[#EEF2FF] px-2 py-1 text-xs font-medium text-[#3730A3]"
                >
                  {entry}
                </span>
              ))}
            </div>
            <Link
              href={`/usecases/${item.slug}`}
              className="mt-5 inline-flex rounded-full bg-[#222735] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#111827]"
            >
              Open detailed playbook →
            </Link>
          </article>
        ))}
      </section>
      {filtered.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-[#C9D4EC] bg-white p-8 text-center text-sm text-[#5E667D]">
          No playbooks match this filter yet. Try selecting "All Segments" and "All Roles".
        </section>
      ) : null}
    </main>
  );
}
