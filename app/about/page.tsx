export default function AboutPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="font-mono-tt text-[11px] font-medium uppercase tracking-[0.38em] text-[var(--ink-muted)]">
          Studio note
        </p>
        <h1 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold tracking-tighter text-[var(--ink)]">
          Top Tier isn&apos;t a slogan — it&apos;s a restraint.
        </h1>

        <div className="mt-14 space-y-8 text-[16px] leading-[1.75] text-[var(--ink-muted)]">
          <p>
            Small seasonal drops instead of perpetual novelty. Pieces are staged here as a storefront mock —
            typography, pacing, photography, and scarcity states are deliberate so you can feel the system
            before you wire payments.
          </p>
          <p>
            Ships from Canada with clear North American duty expectations at checkout once integrated. Fewer
            pages, sharper language, monochrome shell with one voltage accent colour so the product photography
            has room to bleed.
          </p>
        </div>

        <div className="mt-14 border border-[var(--border)] bg-[var(--surface-elevated)] p-8 lg:p-10">
          <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
            Operational defaults
          </h2>
          <ul className="mt-6 space-y-4 font-mono-tt text-[12px] leading-relaxed text-[var(--ink-muted)]">
            <li className="border-l-2 border-[var(--accent)] pl-5">
              HST demo line-items — swap for Stripe Tax / Quaderno in production.
            </li>
            <li className="border-l-2 border-[var(--accent)] pl-5">
              Pre-order + in-stock coexist in cart — same logic you mocked in the roadmap.
            </li>
            <li className="border-l-2 border-[var(--accent)] pl-5">
              Imagery placeholders via Unsplash only — replace with graded campaign stills.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
