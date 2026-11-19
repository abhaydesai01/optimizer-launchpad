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
    <main className="mk-wrap max-w-7xl pb-24 pt-52 md:pt-60">
      <header>
        <p className="mk-kicker">Use Cases</p>
        <h1 className="mk-h2 mt-5 max-w-3xl text-[var(--paper)]">
          GEO playbooks by segment and role
        </h1>
        <p className="mk-body mt-6 max-w-2xl">
          Built with a strategic marketing lens: each use case maps market context,
          demand behavior, role priorities, and a practical operating model to turn
          AI visibility into qualified pipeline.
        </p>
      </header>

      <section className="mk-card mt-10 p-6">
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
          <article key={item.slug} className="mk-card p-6">
            <p className="mk-kicker">{item.segment}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--paper)]">
              {item.shortTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--paper-soft)]">{item.tagline}</p>
            <p className="mt-3 text-sm text-[var(--paper-muted)]">{item.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.roles.map((entry) => (
                <span
                  key={entry}
                  className="rounded-full border border-[var(--ink-line-strong)] px-2 py-1 text-xs font-medium text-[var(--paper-soft)]"
                >
                  {entry}
                </span>
              ))}
            </div>
            <Link
              href={`/usecases/${item.slug}`}
              className="mk-btn mk-btn-primary mt-5"
            >
              Open detailed playbook →
            </Link>
          </article>
        ))}
      </section>
      {filtered.length === 0 ? (
        <section className="mk-card mt-8 border-dashed p-8 text-center text-sm text-[var(--paper-muted)]">
          No playbooks match this filter yet. Try selecting "All Segments" and "All Roles".
        </section>
      ) : null}
    </main>
  );
}
