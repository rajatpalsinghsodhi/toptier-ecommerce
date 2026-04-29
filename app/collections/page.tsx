import Link from "next/link";

const collections = [
  {
    name: "Essentials — Tops",
    description:
      "Foundation layers — tees, fleece, breathable knits stacked for layering logic.",
    href: "/shop?category=Tops",
  },
  {
    name: "Bottoms archive",
    description:
      "Cargos, denim, athletics — proportional balance against whatever you throw over them.",
    href: "/shop?category=Bottoms",
  },
  {
    name: "Shell & outerwear",
    description:
      "Wind, rain, nightclub AC — membranes and matte shells that fold into weekender bags.",
    href: "/shop?category=Outerwear",
  },
];

export default function CollectionsPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="font-mono-tt text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--ink-muted)]">
          Taxonomy
        </p>
        <h1 className="font-display mt-5 max-w-3xl text-[clamp(2.35rem,5vw,4rem)] font-extrabold tracking-tighter text-[var(--ink)]">
          Collections are slices, not silos — pick a lane.
        </h1>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="clip-card border border-transparent bg-[var(--surface-elevated)] p-8 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--ink)]"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)]">{collection.name}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-muted)]">{collection.description}</p>

              <span className="font-mono-tt mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]">
                Enter aisle
                <span aria-hidden>↗</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="clip-card mt-14 border border-[var(--border)] bg-[var(--wash)] px-8 py-12 text-[color-mix(in_oklab,var(--surface)_86%,transparent)] lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--surface)]">
                Want everything at once?
              </h2>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/58">
                The shop index aggregates every SKU with filter + sort primitives — mirrors what your buyers will actually use.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex bg-[var(--accent)] px-8 py-3.5 font-mono-tt text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent-fg)]"
            >
              Open index
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
