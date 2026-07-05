import { redirect } from "next/navigation";

// Pricing is quoted per engagement — the pricing page permanently
// redirects to the audit request flow.
export default function PricingPage() {
  redirect("/request-audit");
}
