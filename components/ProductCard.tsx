import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { getCoverImage } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;
  const src = getCoverImage(product);

  return (
    <Link href={`/products/${product.slug}`} className="group relative block">
      <div className="clip-card relative mb-5 aspect-[4/5] overflow-hidden bg-[var(--surface)] ring-2 ring-transparent transition-[box-shadow,transform] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0_0_var(--accent-glow)] group-hover:ring-[var(--ink)]">
        <Image
          src={src}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover contrast-[1.02] saturate-[0.92] transition duration-700 group-hover:saturate-100 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(12,11,10,0.55)_100%)] opacity-70" />

        {product.isPreOrder ? (
          <div className="absolute bottom-4 left-4 z-10 font-mono-tt text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--surface)] mix-blend-difference">
            Pre-order
          </div>
        ) : null}
        {hasDiscount && !product.isPreOrder ? (
          <div className="absolute right-4 top-4 z-10 rotate-[-6deg] border-2 border-[var(--accent)] bg-[var(--ink)] px-2 py-1 font-mono-tt text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
            Sale
          </div>
        ) : null}
      </div>

      <div className="pl-1">
        <p className="font-mono-tt text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--ink-muted)]">
          {product.category}
        </p>
        <h3 className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight text-[var(--ink)] group-hover:text-[color-mix(in_oklab,var(--ink)_88%,transparent)]">
          <span className="bg-[length:0%_2px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
            {product.name}
          </span>
        </h3>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono-tt text-sm font-semibold tracking-tight text-[var(--ink)]">
            ${displayPrice}&nbsp;<span className="font-normal uppercase text-[var(--ink-muted)]">cad</span>
          </span>
          {hasDiscount ? (
            <span className="font-mono-tt text-xs text-[var(--ink-muted)] line-through">
              ${product.price}
            </span>
          ) : null}
        </div>
        {product.isPreOrder && product.preOrderShipDate ? (
          <p className="font-mono-tt mt-2 text-[10px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
            Ships&nbsp;
            {new Date(product.preOrderShipDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
