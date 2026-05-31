"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Targets", href: "/admin/targets" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Lead Logs", href: "/admin/submissions" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <aside className="w-60 shrink-0 bg-[#111118] p-4 text-[#6B6B80]">
      <div className="mb-8 rounded-xl border border-[#1E1E2E] bg-[#151520] p-3">
        <p className="display text-xl font-bold text-white">
          Optimizer<span className="text-[#00E5A0]">360</span>
        </p>
        <p className="text-xs text-[#6B6B80]">Content pipeline admin</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active =
            currentPath === item.href || currentPath.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[#1E1E2E] text-[#00E5A0]"
                  : "hover:bg-[#1E1E2E] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-[#1E1E2E] pt-4">
        <p className="px-3 text-xs text-[#6B6B80]">Optimizer360 Admin</p>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#1E1E2E] hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
