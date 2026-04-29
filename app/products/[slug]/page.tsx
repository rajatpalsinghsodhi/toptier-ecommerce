"use client";

import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, products, getCoverImage } from "@/lib/products";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const product = getProduct(resolvedParams.slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const gallery = product.images.length ? product.images : [getCoverImage(product)];

  const variantKey = `${selectedSize}-${selectedColor}`;
  const stockCount = product.stock[variantKey] || 0;
  const isInStock = stockCount > 0 || product.isPreOrder;
  const canAddToCart = selectedSize && selectedColor && (isInStock || product.isPreOrder);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addToCart(product.id, variantKey, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="font-mono-tt mb-10 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          <Link href="/" className="hover:text-[var(--ink)]">
            Index
          </Link>
          <span className="text-[var(--ink-muted)]/50">/</span>
          <Link href="/shop" className="hover:text-[var(--ink)]">
            Shop
          </Link>
          <span className="text-[var(--ink-muted)]/50">/</span>
          <span className="text-[var(--ink)]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <div className="clip-card relative aspect-square overflow-hidden bg-[var(--surface)] ring-1 ring-black/5">
              <Image
                src={gallery[activeImage] ?? gallery[0]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              {product.isPreOrder ? (
                <div className="absolute left-4 top-4 z-10 bg-[var(--ink)] px-4 py-2 font-mono-tt text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Pre-order · ships{" "}
                  {new Date(product.preOrderShipDate!).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              ) : null}
              {product.salePrice && !product.isPreOrder ? (
                <div className="absolute bottom-4 right-4 z-10 rotate-[-4deg] border-2 border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 font-mono-tt text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-fg)]">
                  Sale window
                </div>
              ) : null}
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`clip-card-sm relative aspect-square overflow-hidden ring-2 ring-offset-2 ring-offset-[var(--paper)] transition ${
                      activeImage === i ? "ring-[var(--accent)]" : "ring-transparent hover:ring-[var(--ink)]"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="font-mono-tt mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--ink-muted)]">
              {product.category}
            </p>
            <h1 className="font-display mb-6 max-w-xl text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold tracking-tighter text-[var(--ink)]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8 flex flex-wrap items-baseline gap-4 border-b border-[var(--border)] pb-8">
              <span className="font-mono-tt text-3xl font-semibold tracking-tight text-[var(--ink)]">
                ${product.salePrice || product.price}{" "}
                <span className="text-sm font-normal uppercase text-[var(--ink-muted)]">cad</span>
              </span>
              {product.salePrice ? (
                <span className="font-mono-tt text-lg text-[var(--ink-muted)] line-through">
                  ${product.price}
                </span>
              ) : null}
            </div>

            {/* Description */}
            <p className="mb-10 max-w-prose leading-relaxed text-[15px] text-[var(--ink-muted)]">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="font-mono-tt mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`border px-5 py-2.5 font-mono-tt text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                      selectedSize === size
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="font-mono-tt mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]">
                Colour
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`border px-5 py-2.5 font-mono-tt text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                      selectedColor === color
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="font-mono-tt mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]">
                Quantity
              </label>
              <div className="flex w-fit items-center gap-0 border border-[var(--border)] bg-[var(--surface-elevated)]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 font-mono-tt text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
                >
                  −
                </button>
                <span className="min-w-[2.75rem] text-center font-mono-tt text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 font-mono-tt text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
                >
                  +
                </button>
              </div>
            </div>

            {selectedSize && selectedColor ? (
              <div className="mb-6 font-mono-tt text-[11px] uppercase tracking-[0.12em]">
                {product.isPreOrder ? (
                  <p className="text-[var(--ink)]">
                    Ship window:&nbsp;
                    {new Date(product.preOrderShipDate!).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : stockCount > 0 ? (
                  <p className="text-[var(--ink)]">{stockCount} units available</p>
                ) : (
                  <p className="text-red-700">Sold through in this variant</p>
                )}
              </div>
            ) : null}

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`w-full px-8 py-4 font-mono-tt text-[11px] font-bold uppercase tracking-[0.26em] transition ${
                canAddToCart
                  ? addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-[1.03]"
                  : "cursor-not-allowed bg-[color-mix(in_oklab,var(--ink)_14%,transparent)] text-[var(--ink-muted)]"
              }`}
            >
              {addedToCart ? "Added — cart updated" : product.isPreOrder ? "Reserve pre-order" : "Stage in cart"}
            </button>

            {!selectedSize || !selectedColor ? (
              <p className="font-mono-tt mt-3 text-[11px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                Select fit + colourway first
              </p>
            ) : null}

            {/* Shipping Info */}
            <div className="clip-card mt-10 border border-[var(--border)] bg-[var(--surface-elevated)] p-8">
              <h3 className="font-display text-lg font-semibold text-[var(--ink)]">Fulfillment sketch</h3>
              <ul className="mt-4 space-y-2 font-mono-tt text-[11px] leading-relaxed uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                <li className="normal-case tracking-normal">
                  Complimentary freight over $75 CAD (demo thresholds).
                </li>
                <li className="normal-case tracking-normal">Origin Canada — export/US routing placeholder.</li>
                {product.isPreOrder ? (
                  <li className="font-semibold normal-case tracking-normal text-[var(--ink)]">
                    Pre-order inventory wave locked to{" "}
                    {new Date(product.preOrderShipDate!).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                    .
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section className="mt-24 border-t border-[var(--border)] pt-16">
            <h2 className="font-display mb-10 text-3xl font-extrabold tracking-tighter text-[var(--ink)]">
              Adjacent pieces
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
