import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  image?: string;
  noIndex?: boolean;
};

function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image || DEFAULT_OG_IMAGE;
  const type = input.type ?? "website";

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    authors: input.authors?.map((name) => ({ name })),
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      ...(type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function articleOgImage(title: string) {
  return `${SITE_URL}/og-image.png?title=${encodeURIComponent(title.slice(0, 140))}`;
}
