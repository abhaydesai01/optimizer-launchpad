import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const RECIPIENTS = ["abhay@optimizer360.ai", "abhay.desai0001@gmail.com"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    // Basic validation
    if (!data || typeof data !== "object") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const safe = (v: unknown) =>
      String(v ?? "—").replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;")).slice(0, 1000);

    const html = `
      <h2>New Contact / Demo Form Submission</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Name</b></td><td style="padding:6px 12px">${safe(data.name)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Company</b></td><td style="padding:6px 12px">${safe(data.company)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Role</b></td><td style="padding:6px 12px">${safe(data.role)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Email</b></td><td style="padding:6px 12px">${safe(data.email)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Phone</b></td><td style="padding:6px 12px">${safe(data.phone)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Centres</b></td><td style="padding:6px 12px">${safe(data.centers)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Vertical</b></td><td style="padding:6px 12px">${safe(data.vertical)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4"><b>Interest</b></td><td style="padding:6px 12px">${safe(data.interest)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f4f4f4;vertical-align:top"><b>Challenge</b></td><td style="padding:6px 12px;white-space:pre-wrap">${safe(data.challenge)}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#888;margin-top:16px">Sent from optimizer360.ai contact form</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Optimizer360 <noreply@optimizer360.ai>",
        to: RECIPIENTS,
        reply_to: data.email ? String(data.email).slice(0, 255) : undefined,
        subject: `New Lead: ${safe(data.name)} — ${safe(data.company)}`,
        html,
      }),
    });

    const body = await res.json();
    if (!res.ok) {
      console.error("Resend error", body);
      return new Response(JSON.stringify({ error: "Email send failed", details: body }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: body.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Handler error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
