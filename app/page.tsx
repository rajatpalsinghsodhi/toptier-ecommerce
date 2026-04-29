import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { heroImage, categoryShot } from "@/lib/image-urls";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const categories = ["Tops", "Bottoms", "Outerwear"] as const;

  return (
    <main className="flex-1 bg-[var(--paper)]">
      {/* Hero — split / editorial */}
      <section className="relative overflow-hidden grain">
        <div className="grid min-h-[min(92vh,52rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative flex flex-col justify-between bg-[var(--wash)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 top-24 hidden h-[28rem] w-[28rem] rounded-full blur-3xl md:block"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(212,255,74,0.22), transparent 55%)",
              }}
            />

            <p className="font-mono-tt relative z-[1] text-[11px] font-medium uppercase tracking-[0.35em] text-[color-mix(in_oklab,var(--surface)_55%,transparent)]">
              Catalogue 02 · Canada / US
            </p>

            <div className="relative z-[1] max-w-xl">
              <h1 className="font-display text-[clamp(2.6rem,8vw,4.75rem)] font-extrabold leading-[0.92] tracking-tighter text-[var(--surface)]">
                Clothing
                <br />
                with a&nbsp;
                <span className="bg-[var(--accent)] px-1 text-[var(--accent-fg)]">sharp bias.</span>
              </h1>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[color-mix(in_oklab,var(--surface)_78%,transparent)]">
                Narrow drops, obsessive patterning, textiles that behave in motion. Fewer SKU, louder silhouettes —
                staged here as an interactive prototype.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex bg-[var(--accent)] px-8 py-3.5 font-mono-tt text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent-fg)] transition hover:brightness-105"
                >
                  Shop the drop
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex border border-[color-mix(in_oklab,var(--surface)_35%,transparent)] px-8 py-3.5 font-mono-tt text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--surface)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Index
                </Link>
              </div>
            </div>

            <dl className="relative z-[1] mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2">
              <div>
                <dt className="font-mono-tt text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
                  Dispatch
                </dt>
                <dd className="font-display mt-2 text-xl font-semibold tracking-tight text-[var(--surface)]">
                  From Canada · $75 CAD ships free
                </dd>
              </div>
              <div>
                <dt className="font-mono-tt text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
                  Currency
                </dt>
                <dd className="font-display mt-2 text-xl font-semibold tracking-tight text-[var(--surface)]">
                  CAD baseline · USD at checkout
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[22rem] lg:min-h-full">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--wash)]/90 via-transparent to-transparent lg:bg-gradient-to-r" />
            <p className="font-mono-tt absolute bottom-6 left-6 right-6 z-[1] max-w-[16rem] text-[10px] uppercase leading-relaxed tracking-[0.25em] text-white/85 drop-shadow lg:left-auto lg:right-8 lg:text-right">
              Styling mock · replace with branded campaign photography
            </p>
          </div>
        </div>
      </section>

      {/* Rolling strip */}
      <div className="diagonal-stripes border-y border-[var(--border)] bg-[var(--surface)] py-3">
        <p className="font-mono-tt text-center text-[10px] font-semibold uppercase leading-relaxed tracking-[0.35em] text-[var(--ink-muted)]">
          Pre-order splits · low-inventory signals · honest tax line items · built to swap in your own photo production
        </p>
      </div>

      {/* Featured */}
      <section className="relative border-b border-[var(--border)] bg-[var(--surface-elevated)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <span className="font-mono-tt inline-block rounded-sm border border-[var(--ink)] bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent-fg)]">
                02 — Essentials
              </span>
              <h2 className="font-display mt-5 text-4xl font-extrabold tracking-tighter text-[var(--ink)] md:text-5xl">
                In-frame now
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                A handful of archetypes repeated until the pattern breaks — tees, cargos, shell layers when the weather cheats.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex shrink-0 items-center gap-2 self-start lg:self-auto"
            >
              <span className="font-mono-tt text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--ink)]">
                View full matrix
              </span>
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--ink)] bg-[var(--paper)] transition group-hover:bg-[var(--accent)]"
              >
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="grain relative bg-[var(--paper)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display max-w-xl text-4xl font-extrabold tracking-tighter text-[var(--ink)] md:text-[2.85rem] leading-[0.95]">
              Taxonomy,<br /><span className="text-[var(--ink-muted)]">not novelty.</span>
            </h2>
            <p className="max-w-xs font-mono-tt text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[var(--ink-muted)]">
              Three pillars — cut the noise, choreograph the racks.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((category, i) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative isolate aspect-[3/4] overflow-hidden rounded-sm lg:aspect-[10/13]"
              >
                <Image
                  src={categoryShot[category]}
                  alt=""
                  fill
                  className="object-cover saturate-[0.9] transition duration-700 group-hover:saturate-100 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 34vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/78 via-black/35 to-transparent" />
                <div className="absolute left-6 top-6 font-mono-tt text-[10px] font-bold tabular-nums text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-3xl font-bold tracking-tighter text-[var(--surface)]">
                    {category}
                  </h3>
                  <p className="font-mono-tt mt-2 text-[10px] uppercase tracking-[0.28em] text-white/72">
                    Open rack →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                k: "Pattern-first",
                b: "Block-fused patterns and seam logic you can inspect up close.",
              },
              {
                k: "Honest scarcity",
                b: "Pre-order and low counts surface here on purpose — not as theatre.",
              },
              {
                k: "Transparent ops",
                b: "This build is sandbox — Stripe, carriers, locale logic wire in cleanly.",
              },
            ].map((item) => (
              <article key={item.k} className="border-l-4 border-[var(--accent)] pl-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
                  {item.k}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-muted)]">{item.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
