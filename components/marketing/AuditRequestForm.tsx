"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { CAL_LINK } from "@/lib/site";

const CATEGORIES = [
  "Healthcare",
  "Finance & Banking",
  "Real Estate",
  "Education",
  "Jewellery",
  "Hospitality",
  "Other",
];

export function AuditRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !company || !website || !category) {
      setError("Please complete all required fields.");
      return;
    }

    const normalizedWebsite = /^https?:\/\//i.test(website)
      ? website
      : `https://${website}`;

    let recaptchaToken = "";
    try {
      recaptchaToken = await getRecaptchaToken("audit_submit");
    } catch (captchaError) {
      setError(
        captchaError instanceof Error
          ? captchaError.message
          : "Captcha verification failed. Please try again.",
      );
      return;
    }

    setStatus("submitting");
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        brand: company,
        website: normalizedWebsite,
        industry: category,
        product: [role ? `Role: ${role}.` : "", message]
          .filter(Boolean)
          .join(" ") || "Requested via the audit page.",
        recaptchaToken,
      }),
    }).catch(() => null);

    if (!response || !response.ok) {
      const body = response
        ? ((await response.json().catch(() => ({}))) as { error?: string })
        : {};
      setStatus("idle");
      setError(
        body.error ||
          "We couldn't submit your request just now. Please try again, or email hello@optimizer360.ai.",
      );
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-10 text-center md:p-12"
        role="status"
      >
        <CheckCircle2
          className="mx-auto h-10 w-10 text-[var(--mint)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="mt-6 font-serif-display text-2xl text-[var(--paper)]">
          Your audit request is in.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--paper-muted)]">
          Your audit arrives by email within 48 hours — engine-by-engine
          findings, every one of them yours to verify. A GEO strategist will
          then offer a 20-minute walkthrough.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noreferrer"
          className="mk-btn mk-btn-ghost mt-7"
        >
          Want to talk sooner? Book a call
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-name" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="audit-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mk-input"
          />
        </div>
        <div>
          <label htmlFor="audit-email" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            id="audit-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mk-input"
          />
        </div>
        <div>
          <label htmlFor="audit-company" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Company <span aria-hidden="true">*</span>
          </label>
          <input
            id="audit-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className="mk-input"
          />
        </div>
        <div>
          <label htmlFor="audit-role" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Role
          </label>
          <input
            id="audit-role"
            name="role"
            type="text"
            autoComplete="organization-title"
            className="mk-input"
          />
        </div>
        <div>
          <label htmlFor="audit-website" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Website <span aria-hidden="true">*</span>
          </label>
          <input
            id="audit-website"
            name="website"
            type="text"
            required
            inputMode="url"
            placeholder="yourbrand.com"
            className="mk-input"
          />
        </div>
        <div>
          <label htmlFor="audit-category" className="mb-2 block text-sm text-[var(--paper-soft)]">
            What category are you in? <span aria-hidden="true">*</span>
          </label>
          <select id="audit-category" name="category" required className="mk-input">
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="audit-message" className="mb-2 block text-sm text-[var(--paper-soft)]">
            Anything we should know? (optional)
          </label>
          <textarea
            id="audit-message"
            name="message"
            rows={4}
            className="mk-input resize-y"
          />
        </div>
      </div>

      {error ? (
        <p className="mt-5 border-l-2 border-[var(--amber)] pl-3 text-sm text-[var(--amber)]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mk-btn mk-btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Request my audit"}
      </button>
    </form>
  );
}
