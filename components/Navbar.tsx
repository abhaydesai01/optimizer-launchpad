"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  onHowItWorks?: () => void;
  onAudit?: () => void;
};

const NAV_LINKS = [
  { label: "GEO", href: "/#geo" },
  { label: "ARE", href: "/are" },
  { label: "Use Cases", dropdown: true as const },
  { label: "How It Works", action: "how" as const },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

const USE_CASES_BY_INDUSTRY = [
  {
    label: "E-commerce & D2C",
    description: "Own buying-intent AI answers before marketplaces.",
    href: "/usecases/geo-for-ecommerce-d2c-brands",
  },
  {
    label: "B2B SaaS",
    description: "Win shortlist conversations before review portals.",
    href: "/usecases/geo-for-b2b-saas-pipeline",
  },
  {
    label: "Healthcare & Dental",
    description: "Build trust for treatment and local provider queries.",
    href: "/usecases/geo-for-dental-and-clinic-growth",
  },
  {
    label: "Real Estate",
    description: "Capture locality and project research demand early.",
    href: "/usecases/geo-for-real-estate-developers-and-brokers",
  },
  {
    label: "Agencies",
    description: "Productize GEO as a sticky premium service line.",
    href: "/usecases/geo-for-growth-and-performance-agencies",
  },
];

const USE_CASES_BY_ROLE = [
  {
    label: "CMOs",
    description: "Compound demand and reduce paid dependency.",
    href: "/usecases?role=CMO",
  },
  {
    label: "Founders",
    description: "Run growth without building a large team.",
    href: "/usecases?role=Founder%20%2F%20CEO",
  },
  {
    label: "Growth Leads",
    description: "Ship weekly prompt and content optimization loops.",
    href: "/usecases?role=Growth%20Lead",
  },
  {
    label: "Agency Partners",
    description: "Launch GEO delivery with repeatable playbooks.",
    href: "/usecases?role=Agency%20Partner",
  },
];

export function Navbar({ onHowItWorks, onAudit }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [useCaseOpen, setUseCaseOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const useCaseMenuRef = useRef<HTMLDivElement>(null);
  const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseMenuTimeout() {
    if (closeMenuTimeoutRef.current) {
      clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
  }

  function openUseCaseMenu() {
    clearCloseMenuTimeout();
    setUseCaseOpen(true);
  }

  function closeUseCaseMenuWithDelay() {
    clearCloseMenuTimeout();
    closeMenuTimeoutRef.current = setTimeout(() => {
      setUseCaseOpen(false);
    }, 160);
  }

  function isActiveLink(href?: string) {
    if (!href) return false;
    if (href.startsWith("/#")) {
      return currentPath === "/";
    }
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!useCaseMenuRef.current) return;
      if (useCaseMenuRef.current.contains(event.target as Node)) return;
      setUseCaseOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      clearCloseMenuTimeout();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#f5f6fa]/90 backdrop-blur-md">
      <div className="bg-[linear-gradient(90deg,#0f4c81,#1368a3)] py-2 text-center text-sm font-medium text-white">
        GEO Early Access - Free brand audit in 48 hours →
      </div>
      <div className="section-wrap py-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#e6e8ef] bg-white px-5 py-3 shadow-[0_8px_30px_rgba(18,30,54,0.06)]">
          <Link href="/" className="display text-2xl font-bold text-[#1c2233]">
            <span>optimizer</span>
            <span className="text-[#7b5cff]">360</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-[#5f667b] md:flex">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  ref={useCaseMenuRef}
                  className="relative"
                  onMouseEnter={openUseCaseMenu}
                  onMouseLeave={closeUseCaseMenuWithDelay}
                >
                  <button
                    onClick={() => {
                      clearCloseMenuTimeout();
                      setUseCaseOpen((prev) => !prev);
                    }}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-[#1c2233] ${
                      currentPath.startsWith("/usecases")
                        ? "font-semibold text-[#1c2233]"
                        : ""
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${useCaseOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {useCaseOpen ? (
                    <div
                      className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[760px] -translate-x-1/2 rounded-2xl border border-[#e3e7f0] bg-white p-5 shadow-[0_14px_40px_rgba(18,30,54,0.14)]"
                      onMouseEnter={openUseCaseMenu}
                      onMouseLeave={closeUseCaseMenuWithDelay}
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7a859f]">
                            By Industry
                          </p>
                          <div className="space-y-1">
                            {USE_CASES_BY_INDUSTRY.map((entry) => (
                              <Link
                                key={entry.href}
                                href={entry.href}
                                onClick={() => setUseCaseOpen(false)}
                                className={`block rounded-xl px-3 py-2 transition-colors hover:bg-[#f4f6fb] ${
                                  isActiveLink(entry.href) ? "bg-[#f4f6fb]" : ""
                                }`}
                              >
                                <p className="text-sm font-semibold text-[#1c2233]">{entry.label}</p>
                                <p className="text-xs text-[#697389]">{entry.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7a859f]">
                            By Role
                          </p>
                          <div className="space-y-1">
                            {USE_CASES_BY_ROLE.map((entry) => (
                              <Link
                                key={entry.href}
                                href={entry.href}
                                onClick={() => setUseCaseOpen(false)}
                                className="block rounded-xl px-3 py-2 transition-colors hover:bg-[#f4f6fb]"
                              >
                                <p className="text-sm font-semibold text-[#1c2233]">{entry.label}</p>
                                <p className="text-xs text-[#697389]">{entry.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 border-t border-[#edf1f7] pt-3">
                        <Link
                          href="/usecases"
                          onClick={() => setUseCaseOpen(false)}
                          className="text-sm font-semibold text-[#3730a3] transition-colors hover:text-[#312e81]"
                        >
                          Browse all use cases →
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : link.action === "how" ? (
                onHowItWorks ? (
                  <button
                    key={link.label}
                    onClick={onHowItWorks}
                    className="transition-colors hover:text-[#1c2233]"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href="/contact"
                    className={`transition-colors hover:text-[#1c2233] ${
                      isActiveLink("/contact") ? "font-semibold text-[#1c2233]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  key={link.label}
                  href={link.href || "/"}
                  className={`transition-colors hover:text-[#1c2233] ${
                    isActiveLink(link.href) ? "font-semibold text-[#1c2233]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {onAudit ? (
              <button
                onClick={onAudit}
                className="rounded-full bg-[linear-gradient(135deg,#7d53f6,#9f55ff)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(125,83,246,0.35)] transition-all duration-200 hover:scale-[1.03]"
              >
                Book A Consult →
              </button>
            ) : (
              <Link
                href="/?audit=true"
                className="rounded-full bg-[linear-gradient(135deg,#7d53f6,#9f55ff)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(125,83,246,0.35)] transition-all duration-200 hover:scale-[1.03]"
              >
                Book A Consult →
              </Link>
            )}
          </div>

          <button
            aria-label="Open navigation"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg border border-[#dde1ec] p-2 text-[#1c2233] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#e6e8ef] bg-white md:hidden">
          <div className="section-wrap flex flex-col gap-4 py-4 text-sm text-[#5f667b]">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="space-y-2">
                  <p className="font-semibold text-[#1c2233]">{link.label}</p>
                  <div className="ml-2 space-y-2 border-l border-[#e6e8ef] pl-3">
                    {[...USE_CASES_BY_INDUSTRY, ...USE_CASES_BY_ROLE].map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        onClick={() => setOpen(false)}
                        className="block transition-colors hover:text-[#1c2233]"
                      >
                        {entry.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.action === "how" ? (
                onHowItWorks ? (
                  <button
                    key={link.label}
                    onClick={() => {
                      onHowItWorks();
                      setOpen(false);
                    }}
                    className="text-left transition-colors hover:text-[#1c2233]"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="transition-colors hover:text-[#1c2233]"
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  key={link.label}
                  href={link.href || "/"}
                  onClick={() => setOpen(false)}
                  className="transition-colors hover:text-[#1c2233]"
                >
                  {link.label}
                </Link>
              ),
            )}
            {onAudit ? (
              <button
                onClick={() => {
                  onAudit();
                  setOpen(false);
                }}
                className="rounded-full bg-[linear-gradient(135deg,#7d53f6,#9f55ff)] px-4 py-2 font-semibold text-white"
              >
                Book A Consult
              </button>
            ) : (
              <Link
                href="/?audit=true"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[linear-gradient(135deg,#7d53f6,#9f55ff)] px-4 py-2 text-center font-semibold text-white"
              >
                Book A Consult
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
