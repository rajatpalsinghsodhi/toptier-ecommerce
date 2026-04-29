"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

const navLink =
  "font-mono-tt text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ink-muted)] transition hover:text-[var(--ink)]";

export function Header() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-elevated)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="font-display text-xl font-extrabold tracking-tighter text-[var(--ink)] sm:text-2xl">
            TOP
          </span>
          <span className="font-display text-xl font-extrabold tracking-tighter text-[var(--accent-fg)] [text-shadow:none] sm:text-2xl">
            <span className="bg-[var(--accent)] px-1.5 py-0.5 group-hover:brightness-105">
              TIER
            </span>
          </span>
        </Link>

        <nav className="hidden gap-10 md:flex">
          <Link href="/shop" className={navLink}>
            Shop
          </Link>
          <Link href="/collections" className={navLink}>
            Collections
          </Link>
          <Link href="/about" className={navLink}>
            Studio
          </Link>
        </nav>

        <div className="flex items-center gap-5 md:gap-6">
          <button
            type="button"
            className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
            aria-label="Search (coming soon)"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            href="/cart"
            className="relative text-[var(--ink-muted)] hover:text-[var(--ink)]"
            aria-label={`Cart (${cartCount} items)`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex min-h-[1.15rem] min-w-[1.15rem] items-center justify-center bg-[var(--ink)] px-1 font-mono-tt text-[9px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/dashboard"
            className="hidden rounded-none border border-[var(--ink)] bg-transparent px-3 py-1.5 font-mono-tt text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--surface)] md:inline-flex"
          >
            Admin
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="font-mono-tt text-[10px] font-semibold uppercase tracking-widest text-[var(--ink)] md:hidden"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[var(--border)] bg-[var(--surface-elevated)] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-6">
            <Link
              href="/shop"
              className={`${navLink} py-3`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className={`${navLink} py-3`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`${navLink} py-3`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link
              href="/dashboard"
              className={`${navLink} py-3`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
