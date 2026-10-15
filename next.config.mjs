import { RETIRED_ARTICLE_SLUGS } from "./lib/retired-articles.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...RETIRED_ARTICLE_SLUGS.map((slug) => ({
        source: `/blog/${slug}`,
        destination: "/blog",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
