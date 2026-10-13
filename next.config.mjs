/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Pricing is quoted per engagement, so /pricing goes to the audit request page.
      // A real redirect (not a client-side one) so crawlers can follow it.
      // Temporary: swap for a pricing-guidance page once the client approves the wording.
      { source: "/pricing", destination: "/request-audit", permanent: false },
    ];
  },
};

export default nextConfig;
