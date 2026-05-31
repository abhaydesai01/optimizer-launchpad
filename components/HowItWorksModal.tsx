"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Layers, ScanSearch, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function HowItWorksModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      industry: String(formData.get("industry") || "").trim(),
      source: String(formData.get("source") || "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (!payload.name) nextErrors.name = "Full name is required.";
    if (!payload.email) nextErrors.email = "Email is required.";
    if (!payload.company) nextErrors.company = "Company name is required.";
    if (!payload.website) nextErrors.website = "Website URL is required.";
    if (!payload.industry) nextErrors.industry = "Industry is required.";
    if (Object.keys(nextErrors).length > 0) {
      setError(nextErrors);
      return;
    }

    let recaptchaToken = "";
    try {
      recaptchaToken = await getRecaptchaToken("contact_submit");
    } catch (captchaError) {
      setError({
        form:
          captchaError instanceof Error
            ? captchaError.message
            : "Captcha verification failed.",
      });
      return;
    }

    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, recaptchaToken }),
    });
    setLoading(false);

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError({ form: body.error || "Something went wrong. Please try again." });
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/thank-you?type=contact");
    }, 2500);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="surface-card w-full max-w-4xl p-6 md:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <h3 className="display text-3xl font-bold">
                How optimizer360 GEO works
              </h3>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-md p-1 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
              >
                <X size={18} />
              </button>
            </div>

            {success ? (
              <div className="rounded-lg border border-[#00E5A040] bg-[#00E5A012] p-4 text-sm text-[var(--text-primary)]">
                ✓ Message received! We'll reply within 24 hours.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <ScanSearch className="text-[var(--accent-green)]" size={18} />
                      <p className="font-semibold">Step 1: We audit your brand</p>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                      Across 6 AI engines in 48 hours. You see exactly where you
                      appear and where you don't.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Layers className="text-[var(--accent-green)]" size={18} />
                      <p className="font-semibold">Step 2: Our team executes</p>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                      Content, schema, PR placements - everything needed to earn
                      and improve your AI citations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Activity className="text-[var(--accent-green)]" size={18} />
                      <p className="font-semibold">Step 3: You track everything</p>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                      Live dashboard. Every citation. Every engine. Real time.
                      You always know exactly what's happening.
                    </p>
                  </div>
                </div>

                <form className="space-y-3" onSubmit={onSubmit}>
                  <h4 className="text-xl font-semibold">Talk to us</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    We'll show you how it works for your specific brand.
                  </p>
                  <Input name="name" placeholder="Full Name *" />
                  {error.name && <p className="text-xs text-red-300">{error.name}</p>}
                  <Input type="email" name="email" placeholder="Email *" />
                  {error.email && <p className="text-xs text-red-300">{error.email}</p>}
                  <Input name="company" placeholder="Company Name *" />
                  {error.company && (
                    <p className="text-xs text-red-300">{error.company}</p>
                  )}
                  <Input name="website" type="url" placeholder="Website URL *" />
                  {error.website && (
                    <p className="text-xs text-red-300">{error.website}</p>
                  )}
                  <select
                    name="industry"
                    className="h-11 w-full rounded-lg border border-white/15 bg-[var(--bg-card)] px-3 text-sm text-[var(--text-primary)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Industry *
                    </option>
                    <option>Franchise & Retail</option>
                    <option>EdTech</option>
                    <option>Financial Services</option>
                    <option>Real Estate</option>
                    <option>Healthcare</option>
                    <option>SaaS & Technology</option>
                    <option>Other</option>
                  </select>
                  {error.industry && (
                    <p className="text-xs text-red-300">{error.industry}</p>
                  )}
                  <select
                    name="source"
                    className="h-11 w-full rounded-lg border border-white/15 bg-[var(--bg-card)] px-3 text-sm text-[var(--text-primary)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      How did you find us?
                    </option>
                    <option>LinkedIn</option>
                    <option>Google Search</option>
                    <option>ChatGPT or Perplexity</option>
                    <option>Referred by someone</option>
                    <option>Other</option>
                  </select>
                  {error.form && <p className="text-xs text-red-300">{error.form}</p>}
                  <Button
                    className="w-full rounded-lg bg-[var(--accent-green)] px-4 py-3 text-[#0A0A0F]"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send - we'll reply within 24 hours"}
                  </Button>
                  <p className="text-xs text-[var(--text-muted)]">
                    Or book directly:{" "}
                    <a
                      href="https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360"
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      cal.com/abhay-desai/free-geo-strategy-call-optimizer360
                    </a>
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
