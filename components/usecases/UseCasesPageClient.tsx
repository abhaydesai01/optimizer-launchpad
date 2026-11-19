"use client";

import { EntryCard } from "@/components/marketing/EntryCard";
import { PageHeader } from "@/components/marketing/PageHeader";
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
    <main>
      <PageHeader
        title="GEO playbooks by segment and role"
        intro="Built with a strategic marketing lens: each use case maps market context, demand behavior, role priorities, and a practical operating model to turn AI visibility into qualified pipeline."
      />
      <div className="mk-wrap pb-24">

      <section className="mk-card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-[var(--paper)]">
            Segment
            <select
              value={segment}
              onChange={(event) => setSegment(event.target.value as FilterSegment)}
              className="mk-input mt-2 h-11"
            >
              <option value="All Segments">All Segments</option>
              {useCaseSegments.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-[var(--paper)]">
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as FilterRole)}
              className="mk-input mt-2 h-11"
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
              className="mk-btn mk-btn-ghost h-11 w-full"
            >
              Reset filters
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--paper-muted)]">
          Showing <span className="font-semibold text-[var(--paper)]">{filtered.length}</span>{" "}
          playbooks
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <EntryCard
            key={item.slug}
            href={`/usecases/${item.slug}`}
            // the segment only when it adds something the title does not say
            label={item.segment === item.shortTitle ? undefined : item.segment}
            title={item.shortTitle}
            meta={
              <span className="flex flex-wrap gap-2">
                {item.roles.map((entry) => (
                  <span key={entry} className="rounded-full border border-[var(--ink-line-strong)] px-2.5 py-1 text-[12px] font-medium text-[var(--paper-soft)]">
                    {entry}
                  </span>
                ))}
              </span>
            }
          >
            <p className="text-[var(--paper)]">{item.tagline}</p>
            <p className="mt-2">{item.intro}</p>
          </EntryCard>
        ))}
      </section>
      {filtered.length === 0 ? (
        <section className="mk-card mt-8 border-dashed p-8 text-center text-sm text-[var(--paper-muted)]">
          No playbooks match this filter yet. Try selecting "All Segments" and "All Roles".
        </section>
      ) : null}
      </div>
    </main>
  );
}
