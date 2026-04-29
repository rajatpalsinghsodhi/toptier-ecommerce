"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
    );
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-[var(--paper)]">
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-mono-tt text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--ink-muted)]">
            Index
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold tracking-tighter text-[var(--ink)]">
            All pieces
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-muted)]">
            Filter by category, sort by tariff. Same prototype data — this is where your lookbook grid breathes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-[var(--border)] pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`font-mono-tt border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                selectedCategory === null
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--accent)]"
                  : "border-transparent bg-[var(--surface)] text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-mono-tt border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                  selectedCategory === category
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--accent)]"
                    : "border-transparent bg-[var(--surface)] text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="font-mono-tt flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)] sm:flex-row sm:items-center">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-[11px] font-medium normal-case tracking-normal text-[var(--ink)]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price · low → high</option>
              <option value="price-high">Price · high → low</option>
            </select>
          </label>
        </div>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="font-mono-tt py-24 text-center text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">
            Nothing in this lane — reset filters.
          </p>
        ) : null}
      </div>
    </main>
  );
}
