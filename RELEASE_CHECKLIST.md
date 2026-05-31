# Optimizer360 Release Checklist

Use this checklist before promoting staging to production.

## 1) Environment and Configuration

- [ ] `MONGODB_URI` configured and reachable.
- [ ] `ANTHROPIC_API_KEY` configured.
- [ ] `NEXTAUTH_SECRET` and `NEXTAUTH_URL` configured.
- [ ] `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured.
- [ ] `RESEND_API_KEY` and `TO_EMAIL` configured.
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` configured.
- [ ] `FOUNDER_EMAIL_DELAY_MINUTES` and `FOUNDER_QUEUE_SECRET` configured.
- [ ] Optional `INDEXNOW_KEY` validated if enabled.

## 2) Build and Test Gates

- [ ] `npx vitest run` passes.
- [ ] `npm run build` passes.
- [ ] Ensure no blocking runtime warnings in server logs at startup.

## 3) Staging Functional Verification

### Public funnel

- [ ] `/about`, `/pricing`, `/contact`, `/privacy`, `/terms`, `/careers` render real content.
- [ ] Contact flow:
  - [ ] Valid submission returns success.
  - [ ] Missing required fields return `400`.
  - [ ] Invalid/missing captcha returns validation error.
  - [ ] Repeated rapid submissions return `429`.
- [ ] Audit flow:
  - [ ] Valid submission returns success.
  - [ ] Missing required fields return `400`.
  - [ ] Invalid/missing captcha returns validation error.
  - [ ] Repeated rapid submissions return `429`.

### Admin flow

- [ ] Repeated invalid login attempts are throttled.
- [ ] Admin pipeline executes all steps:
  - [ ] start pipeline
  - [ ] generate brief
  - [ ] generate draft
  - [ ] review
  - [ ] inject schema
  - [ ] publish
- [ ] Publish succeeds even when IndexNow ping fails.
- [ ] `PipelineLog` records both success and failure states.
- [ ] Founder email queue processor endpoint runs successfully and sends due founder emails.

### SEO

- [ ] `/sitemap.xml` includes static pages and published `/blog/[slug]` entries.
- [ ] Newly published article appears in sitemap.

## 4) Production Readiness Decision

Release is approved only if:

- [ ] No critical functional failures in staging.
- [ ] No unresolved security control gaps from this release scope.
- [ ] No unresolved `500` errors in target flows.

## 5) Rollback Criteria

Rollback immediately if any of the following occur after deploy:

- Contact or audit submissions fail for more than 10 minutes.
- Admin login is unusable for valid credentials due to throttling/regression.
- Pipeline publish path produces persistent `500` failures.
- Production sitemap generation fails and returns non-`200`.
- Unexpected spike in error rate or severe latency regressions.

## 6) Rollback Procedure

1. Re-deploy the previous known-good release.
2. Re-validate core health endpoints and primary flows:
   - `/`
   - `/contact`
   - `/api/contact`
   - `/api/audit`
   - `/admin/login`
3. Disable optional integrations (such as IndexNow) if they are contributing to failure.
4. Open incident note with timestamp, impacted endpoints, and immediate mitigation.

## 7) Post-Release Monitoring (First 24 Hours)

- [ ] Monitor `4xx/5xx` rates on public APIs.
- [ ] Monitor admin pipeline failures per step.
- [ ] Monitor contact and audit submission volume for bot anomalies.
- [ ] Confirm no unexplained drop in sitemap accessibility.
