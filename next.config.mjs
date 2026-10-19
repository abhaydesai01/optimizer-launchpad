import { RETIRED_ARTICLE_REDIRECTS } from "./lib/retired-articles.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...Object.entries(RETIRED_ARTICLE_REDIRECTS).map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
