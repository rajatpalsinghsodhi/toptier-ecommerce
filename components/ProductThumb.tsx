import Image from "next/image";
import type { Product } from "@/lib/types";
import { getCoverImage } from "@/lib/products";

type Props = {
  product: Product;
  size?: number;
  className?: string;
};

/** Square catalog thumbnail — uses local `/catalog/*` URLs from product data */
export function ProductThumb({ product, size = 48, className = "" }: Props) {
  const src = getCoverImage(product);
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-lg bg-black/5 ring-1 ring-black/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={product.name}
        width={size}
        height={size}
        className="h-full w-full object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
