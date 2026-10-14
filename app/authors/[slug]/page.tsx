import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { DEFAULT_AUTHOR } from "@/lib/default-author";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Author from "@/lib/models/Author";
import { pageMeta } from "@/lib/page-metadata";
import { buildPersonSchema } from "@/lib/schema-library";
import { SITE_URL } from "@/lib/site";
import { STATIC_PILLAR_ARTICLES } from "@/lib/static-pillars";
import { RETIRED_ARTICLE_SLUGS, isRetiredArticle } from "@/lib/retired-articles.mjs";

export const dynamic = "force-dynamic";

async function getAuthor(slug: string) {
  try {
    await connectDB();
    const fromDb = await Author.findOne({ slug }).lean();
    if (fromDb) return fromDb;
    if (slug === DEFAULT_AUTHOR.slug) return DEFAULT_AUTHOR;
    return null;
  } catch (error) {
    console.error(`Failed to load author ${slug}:`, error);
    if (slug === DEFAULT_AUTHOR.slug) return DEFAULT_AUTHOR;
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const author = await getAuthor(params.slug);
  if (!author) return {};
  return pageMeta({
    title: author.name,
    description: author.bio || `${author.name} writes about AI GEO for Optimizer360.ai.`,
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: { slug: string };
}) {
  const author = await getAuthor(params.slug);
  if (!author) notFound();

  let posts: { slug: string; title: string; excerpt?: string; metaDescription?: string }[] = [];
  try {
    await connectDB();
    posts = await Article.find({
      published: true,
      authorSlug: author.slug,
      slug: { $nin: RETIRED_ARTICLE_SLUGS },
    })
      .sort({ publishedAt: -1 })
      .select("slug title excerpt metaDescription")
      .lean();
  } catch {
    posts = [];
  }
  if (author.slug === DEFAULT_AUTHOR.slug) {
    const seen = new Set(posts.map((post) => post.slug));
    posts = [
      ...posts,
      ...STATIC_PILLAR_ARTICLES.filter((post) => !seen.has(post.slug) && !isRetiredArticle(post.slug)).map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        metaDescription: post.metaDescription,
      })),
    ];
  }

  return (
    <SubPageShell
      kicker={author.role || "Author"}
      title={author.name}
      intro={author.bio}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: author.name },
      ]}
    >
      <JsonLd
        id="author-person"
        data={buildPersonSchema({
          name: author.name,
          url: `${SITE_URL}/authors/${author.slug}`,
          description: author.bio,
          jobTitle: author.role,
          sameAs: author.sameAs,
          worksFor: "Optimizer360.ai",
        })}
      />
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-sm text-[var(--paper-muted)]">No published articles yet.</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="mk-card p-6">
              <h2 className="text-lg font-semibold text-[var(--paper)]">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--paper-muted)]">
                {post.excerpt || post.metaDescription}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block font-semibold text-[var(--mint)]"
              >
                Read article →
              </Link>
            </article>
          ))
        )}
      </div>
    </SubPageShell>
  );
}
