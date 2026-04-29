"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-[var(--accent)] bg-[var(--wash)] text-[color-mix(in_oklab,var(--surface)_82%,transparent)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl font-extrabold tracking-tighter text-[var(--surface)] md:text-5xl">
              TOP<span className="text-[var(--accent)]">TIER</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklab,var(--surface)_70%,transparent)]">
              Clothing with a deliberate silhouette — small catalogue, obsessive fit, occasional loud colour.
              Built as a storefront mock; swap assets and copy anytime.
            </p>
          </div>

          <div className="font-mono-tt md:col-span-3 md:col-start-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
              Navigate
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="hover:text-[var(--accent)] transition-colors" href="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--accent)] transition-colors" href="/collections">
                  Collections
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--accent)] transition-colors" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="font-mono-tt md:col-span-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
              Dispatch
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[color-mix(in_oklab,var(--surface)_75%,transparent)]">
              Ships from Canada • Free over $75 CAD
              <br />
              Taxes shown at checkout (demo rates)
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono-tt text-[11px] uppercase tracking-widest text-white/35">
            © {new Date().getFullYear()} Top Tier · Mock storefront
          </p>
          <p className="font-mono-tt max-w-xl text-[11px] leading-relaxed text-white/35">
            Photography via Unsplash for prototype only — replace with branded campaign stills before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
