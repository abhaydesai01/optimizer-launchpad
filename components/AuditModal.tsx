"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuditModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError({});
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      brand: String(formData.get("brand") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      industry: String(formData.get("industry") || "").trim(),
      competitors: String(formData.get("competitors") || "").trim(),
      product: String(formData.get("product") || "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (!payload.name) nextErrors.name = "Full name is required.";
    if (!payload.email) nextErrors.email = "Email is required.";
    if (!payload.brand) nextErrors.brand = "Brand or company name is required.";
    if (!payload.website) nextErrors.website = "Website URL is required.";
    if (!payload.industry) nextErrors.industry = "Industry is required.";
    if (!payload.product) nextErrors.product = "Main product/service is required.";
    if (Object.keys(nextErrors).length > 0) {
      setError(nextErrors);
      return;
    }

    let recaptchaToken = "";
    try {
      recaptchaToken = await getRecaptchaToken("audit_submit");
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
    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, recaptchaToken }),
    });
    setLoading(false);

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError({ form: body.error || "Unable to submit audit request." });
      return;
    }

    setSubmittedEmail(payload.email);
    setSuccess(true);
    setTimeout(() => {
      router.push(
        `/thank-you?type=audit&brand=${encodeURIComponent(payload.brand)}&name=${encodeURIComponent(payload.name)}&email=${encodeURIComponent(payload.email)}`,
      );
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
            className="surface-card w-full max-w-lg p-6"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="display text-3xl font-bold">Get Your Free GEO Audit</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  We'll map your brand's AI citation footprint in 48 hours. Free.
                </p>
              </div>
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
                ✓ Audit requested! Check {submittedEmail} in 48 hours.
              </div>
            ) : (
              <form className="space-y-3" onSubmit={onSubmit}>
                <Input name="name" placeholder="Full Name *" />
                {error.name && <p className="text-xs text-red-300">{error.name}</p>}
                <Input type="email" name="email" placeholder="Email *" />
                {error.email && <p className="text-xs text-red-300">{error.email}</p>}
                <Input name="brand" placeholder="Brand / Company Name *" />
                {error.brand && <p className="text-xs text-red-300">{error.brand}</p>}
                <Input name="website" type="url" placeholder="Website URL *" />
                {error.website && <p className="text-xs text-red-300">{error.website}</p>}
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
                {error.industry && <p className="text-xs text-red-300">{error.industry}</p>}
                <Input name="competitors" placeholder="Primary competitors" />
                <Textarea
                  name="product"
                  rows={3}
                  placeholder="What's your main product/service? *"
                />
                {error.product && <p className="text-xs text-red-300">{error.product}</p>}
                {error.form && <p className="text-xs text-red-300">{error.form}</p>}
                <Button
                  className="w-full rounded-lg bg-[var(--accent-green)] px-4 py-3 text-[#0A0A0F]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Request My Free Audit →"}
                </Button>
                <p className="text-center text-xs text-[var(--text-muted)]">
                  Delivered as a PDF to your email within 48 hours. No credit card.
                  No sales call unless you want one.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
