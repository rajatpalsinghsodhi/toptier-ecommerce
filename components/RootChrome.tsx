"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export function RootChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) return <>{children}</>;

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}

