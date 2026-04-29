"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Overview", href: "/dashboard" },
      { label: "Products", href: "/dashboard/products" },
      { label: "Inventory", href: "/dashboard/inventory" },
      { label: "Orders", href: "/dashboard/orders" },
    ],
    []
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const nextIsDesktop = mql.matches;
      setIsDesktop(nextIsDesktop);
      if (nextIsDesktop) setMobileNavOpen(false);
    };
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Mobile top bar */}
      {!isDesktop ? (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
              aria-label="Open navigation"
            >
              <span className="text-base leading-none">☰</span>
              Menu
            </button>

            <Link href="/" className="text-sm font-bold tracking-tight">
              TOP TIER <span className="text-xs font-normal text-zinc-600">Admin</span>
            </Link>

            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-100 px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
            >
              Store
            </Link>
          </div>
        </header>
      ) : null}

      {/* Mobile drawer */}
      {!isDesktop && mobileNavOpen ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          />

          <aside className="absolute inset-y-0 left-0 w-[18rem] max-w-[85vw] border-r border-zinc-200 bg-white shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
              <Link href="/" className="text-sm font-bold tracking-tight">
                TOP TIER <span className="text-xs font-normal text-zinc-600">Admin</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-3">
              <Link
                href="/"
                className="block rounded-lg bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-200"
              >
                ← Back to store
              </Link>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      {isDesktop ? (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200 bg-white">
          <div className="flex h-16 items-center border-b border-zinc-200 px-6">
            <Link href="/" className="text-lg font-bold">
              TOP TIER <span className="text-xs font-normal text-zinc-600">Admin</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-4">
            <Link
              href="/"
              className="block rounded-lg bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-200"
            >
              ← Back to store
            </Link>
          </div>
        </aside>
      ) : null}

      {/* Main Content */}
      <main className={`flex-1 ${isDesktop ? "pl-64" : "pt-14"}`}>
        {children}
      </main>
    </div>
  );
}
