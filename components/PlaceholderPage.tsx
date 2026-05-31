import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Return home
          </Link>
          <Link href="/#contact" className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold">
            Request an audit
          </Link>
        </div>
      </div>
    </section>
  );
}
