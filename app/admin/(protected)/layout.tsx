import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <AdminSidebar />
      <section className="flex-1 p-6 md:p-8">{children}</section>
    </div>
  );
}
