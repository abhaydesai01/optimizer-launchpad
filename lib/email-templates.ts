function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailShell({
  preheader,
  title,
  subtitle,
  contentHtml,
}: {
  preheader: string;
  title: string;
  subtitle: string;
  contentHtml: string;
}) {
  return `
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#F4F6FB;padding:24px 12px;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border:1px solid #E5EAF3;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:#111827;color:#ffffff;">
              <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Optimizer360</p>
              <h1 style="margin:10px 0 6px;font-size:28px;line-height:1.2;font-weight:800;">${escapeHtml(title)}</h1>
              <p style="margin:0;font-size:16px;line-height:1.45;opacity:0.9;">${escapeHtml(subtitle)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;color:#1F2937;">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;border-top:1px solid #E5EAF3;color:#6B7280;font-size:12px;line-height:1.6;">
              <p style="margin:0;">Optimizer360 · AI-native GEO growth infrastructure</p>
              <p style="margin:4px 0 0;">hello@optimizer360.ai</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

export function contactOwnerTemplate(payload: {
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  source: string;
}) {
  const contentHtml = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">A new lead has submitted the contact form.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:12px;">
      <tr><td style="padding:8px 0;color:#6B7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(payload.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(payload.email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Company</td><td style="padding:8px 0;">${escapeHtml(payload.company)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Website</td><td style="padding:8px 0;"><a href="${escapeHtml(payload.website)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(payload.website)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Industry</td><td style="padding:8px 0;">${escapeHtml(payload.industry)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Source</td><td style="padding:8px 0;">${escapeHtml(payload.source)}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:14px;color:#374151;">SLA: reply within 24 hours.</p>
  `;

  return emailShell({
    preheader: `New lead from ${payload.company}`,
    title: "New Contact Lead",
    subtitle: `${payload.company} just requested details from Optimizer360.`,
    contentHtml,
  });
}

export function contactThankYouTemplate(payload: {
  name: string;
  company: string;
  calLink: string;
}) {
  const contentHtml = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">Hi ${escapeHtml(payload.name)},</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      Thank you for reaching out to Optimizer360. We have received your request for ${escapeHtml(payload.company)}
      and our team will reply within 24 hours with next steps.
    </p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
      If you want to accelerate this, book a strategy call with us directly.
    </p>
    <p style="margin:18px 0;">
      <a href="${escapeHtml(payload.calLink)}" style="display:inline-block;background:#10B981;color:#04130E;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:700;">
        Book a Strategy Call
      </a>
    </p>
    <p style="margin:0 0 10px;font-size:14px;color:#4B5563;">
      You can also request your free GEO audit here:
      <a href="https://optimizer360.ai/?audit=true" style="color:#2563EB;text-decoration:none;">optimizer360.ai/?audit=true</a>
    </p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;">— Team Optimizer360</p>
  `;

  return emailShell({
    preheader: "We received your request at Optimizer360",
    title: "Thanks for contacting Optimizer360",
    subtitle: "Your request is in our queue and we will get back shortly.",
    contentHtml,
  });
}

export function auditOwnerTemplate(payload: {
  name: string;
  email: string;
  brand: string;
  website: string;
  industry: string;
  competitors: string;
  product: string;
  auditId: string;
}) {
  const contentHtml = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">A new GEO audit lead has been submitted.</p>
    <p style="margin:0 0 14px;font-size:14px;color:#374151;"><strong>Audit ID:</strong> ${escapeHtml(payload.auditId)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6B7280;width:140px;">Contact</td><td style="padding:8px 0;">${escapeHtml(payload.name)} · <a href="mailto:${escapeHtml(payload.email)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(payload.email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Brand</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(payload.brand)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Website</td><td style="padding:8px 0;"><a href="${escapeHtml(payload.website)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(payload.website)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Industry</td><td style="padding:8px 0;">${escapeHtml(payload.industry)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;">Competitors</td><td style="padding:8px 0;">${escapeHtml(payload.competitors)}</td></tr>
      <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top;">Product</td><td style="padding:8px 0;">${escapeHtml(payload.product)}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:14px;color:#374151;">
      Action: prepare and send completed GEO audit PDF within 48 hours.
    </p>
  `;

  return emailShell({
    preheader: `New GEO audit lead: ${payload.brand}`,
    title: "New GEO Audit Request",
    subtitle: `${payload.brand} requested a full GEO visibility audit.`,
    contentHtml,
  });
}

export function auditThankYouTemplate(payload: {
  name: string;
  brand: string;
  calLink: string;
}) {
  const contentHtml = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">Hi ${escapeHtml(payload.name)},</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      Thanks for submitting your GEO audit request for <strong>${escapeHtml(payload.brand)}</strong>.
      Our team is now preparing your report.
    </p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      Over the next 48 hours, we will evaluate your visibility across ChatGPT, Perplexity,
      Google AI Overviews, Claude, and Gemini and send your PDF audit to this email.
    </p>
    <p style="margin:18px 0;">
      <a href="${escapeHtml(payload.calLink)}" style="display:inline-block;background:#10B981;color:#04130E;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:700;">
        Book a 30-min Strategy Call
      </a>
    </p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;">— Team Optimizer360</p>
  `;

  return emailShell({
    preheader: `Your GEO audit request for ${payload.brand} was received`,
    title: "Your GEO audit request is confirmed",
    subtitle: "We have started preparing your personalized report.",
    contentHtml,
  });
}

export function founderMessageTemplate(payload: {
  name: string;
  businessName: string;
  industry: string;
  calLink: string;
}) {
  const contentHtml = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">Hi ${escapeHtml(payload.name)},</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      I am Abhay, and I wanted to send you a personal note after seeing your request for
      <strong> ${escapeHtml(payload.businessName)}</strong>.
    </p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      For teams in <strong>${escapeHtml(payload.industry)}</strong>, traditional SEO alone no longer captures
      how buyers discover solutions. Today, high-intent prospects ask AI engines direct questions and
      trust the brands those systems cite first.
    </p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      <strong>Tagline: Visibility in AI answers becomes pipeline in your CRM.</strong>
    </p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;">
      At Optimizer360, we combine strategy + execution: query mapping, structured content,
      schema, internal linking, and iterative optimization. That is why clients do not just
      get reports; they get measurable movement in discovery.
    </p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
      If helpful, I can personally walk you through how we would prioritize GEO opportunities
      for ${escapeHtml(payload.businessName)} in the first 30 days.
    </p>
    <p style="margin:18px 0;">
      <a href="${escapeHtml(payload.calLink)}" style="display:inline-block;background:#10B981;color:#04130E;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:700;">
        Book a Founder-Led GEO Call
      </a>
    </p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;">— Abhay<br/>Optimizer360</p>
  `;

  return emailShell({
    preheader: `Founder note for ${payload.businessName}`,
    title: "A founder note on why GEO matters now",
    subtitle: "How Optimizer360 helps convert AI visibility into revenue outcomes.",
    contentHtml,
  });
}
