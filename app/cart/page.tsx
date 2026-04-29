"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { getProductById, getCoverImage } from "@/lib/products";
import { formatVariantLabel } from "@/lib/variant-label";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const cartItems = cart.map((item) => ({
    ...item,
    product: getProductById(item.productId)!,
  })).filter(item => item.product);

  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 8;
  const tax = subtotal * 0.13; // 13% HST (Ontario example)
  const total = subtotal + shipping + tax;

  const hasPreOrderItems = cartItems.some((item) => item.product.isPreOrder);

  if (cart.length === 0) {
    return (
      <main className="flex-1 bg-[var(--background)]">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-black text-zinc-950">Your cart is empty</h1>
          <p className="mb-8 text-zinc-600">Add some pieces to get started.</p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-900"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-black tracking-tight text-zinc-950">Shopping cart</h1>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => {
                const price = item.product.salePrice || item.product.price;
                const cover = getCoverImage(item.product);

                return (
                  <div
                    key={`${item.productId}-${item.variantKey}`}
                    className="flex gap-6 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm"
                  >
                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-900/5">
                      <Image
                        src={cover}
                        alt={item.product.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="font-semibold text-zinc-950 hover:underline"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-zinc-600">{formatVariantLabel(item.variantKey)}</p>
                            {item.product.isPreOrder && (
                              <p className="mt-1 text-sm font-medium text-amber-700">
                                Pre-order - Ships {new Date(item.product.preOrderShipDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.variantKey)}
                            className="text-zinc-500 hover:text-red-600"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantKey, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantKey, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">${(price * item.quantity).toFixed(2)} CAD</div>
                          <div className="text-sm text-zinc-600">${price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={clearCart}
              className="mt-6 text-sm text-zinc-600 hover:text-red-600 underline"
            >
              Clear cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              {hasPreOrderItems && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="font-medium">Pre-order items in cart</p>
                  <p className="mt-1 text-xs">
                    Items will ship on their expected dates. You&apos;ll be charged when your order is placed.
                  </p>
                </div>
              )}

              <div className="space-y-3 border-b border-zinc-300 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)} CAD`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Tax (HST)</span>
                  <span className="font-medium">${tax.toFixed(2)} CAD</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>

              {subtotal < 75 && (
                <p className="mt-4 text-xs text-zinc-600">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-zinc-900 py-4 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Proceed to checkout
              </Link>

              <Link
                href="/shop"
                className="mt-3 block w-full rounded-full border border-zinc-300 bg-white py-4 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
