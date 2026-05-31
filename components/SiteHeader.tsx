"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#geo", label: "GEO" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/are", label: "ARE" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "/contact";
  const isExternalCal = /^https?:\/\//i.test(calLink);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          <span className="gradient-text">O</span>ptimizer360
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href.split("#")[0] && "bg-white/5 text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          {isExternalCal ? (
            <a
              href={calLink}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Book a call
            </a>
          ) : (
            <Link href={calLink} className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Book a call
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
