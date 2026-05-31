import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">
            <span className="gradient-text">O</span>ptimizer360
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            AI-native products, autonomous systems, and compounding growth infrastructure.
          </p>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Products</p>
          <Link href="/are" className="block hover:text-foreground">
            ARE flagship
          </Link>
          <Link href="/pricing" className="block hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#geo" className="block hover:text-foreground">
            GEO systems
          </Link>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Company</p>
          <Link href="/about" className="block hover:text-foreground">
            About
          </Link>
          <Link href="/careers" className="block hover:text-foreground">
            Careers
          </Link>
          <Link href="/blog" className="block hover:text-foreground">
            Blog
          </Link>
          <Link href="/contact" className="block hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Contact</p>
          <p>Mumbai, India</p>
          <p>hello@optimizer360.com</p>
          <Link href="/privacy" className="block hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="block hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
