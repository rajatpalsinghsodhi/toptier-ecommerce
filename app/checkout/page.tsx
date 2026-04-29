"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { getProductById, getCoverImage } from "@/lib/products";
import { formatVariantLabel } from "@/lib/variant-label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "CA",
    phone: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = cart.map((item) => ({
    ...item,
    product: getProductById(item.productId)!,
  })).filter(item => item.product);

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 75 ? 0 : shippingMethod === "standard" ? 8 : 18;
  const tax = subtotal * 0.13;
  const total = subtotal + shippingCost + tax;
  const hasPreOrderItems = cartItems.some((item) => item.product.isPreOrder);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length, router]);

  if (cart.length === 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      router.push("/checkout/confirmation");
    }, 2000);
  };

  const inputClass = "w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-zinc-900 focus:outline-none";

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex items-center justify-center gap-4">
          {["Shipping", "Payment", "Confirm"].map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    index === 0 ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className={index === 0 ? "text-sm font-medium" : "text-sm text-zinc-600"}>
                  {step}
                </span>
              </div>
              {index < 2 ? <div className="h-px w-12 bg-zinc-300" /> : null}
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-bold">Contact Information</h2>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                placeholder="you@example.com"
              />
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-bold">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">First Name</label>
                    <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Last Name</label>
                    <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Address</label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputClass} placeholder="123 Main St" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium">City</label>
                    <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Province/State</label>
                    <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className={inputClass} placeholder="ON" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Postal Code</label>
                    <input type="text" required value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className={inputClass} placeholder="M5V 1A1" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Country</label>
                  <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className={inputClass}>
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="(555) 123-4567" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-bold">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  ["standard", "Standard Shipping", "3-5 business days", subtotal > 75 ? "Free" : "$8 CAD"],
                  ["express", "Express Shipping", "1-2 business days", "$18 CAD"],
                ].map(([value, title, detail, price]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-zinc-300 p-4 transition-colors hover:border-zinc-400 has-[:checked]:border-zinc-900 has-[:checked]:bg-zinc-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={value}
                        checked={shippingMethod === value}
                        onChange={() => setShippingMethod(value as "standard" | "express")}
                        className="h-4 w-4"
                      />
                      <div>
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-zinc-600">{detail}</div>
                      </div>
                    </div>
                    <div className="font-semibold">{price}</div>
                  </label>
                ))}
              </div>
            </section>
          </form>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              {hasPreOrderItems && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="font-medium">Pre-order items in your order</p>
                  <p className="mt-1 text-xs">Expected ship date will be shown on confirmation</p>
                </div>
              )}

              <div className="mb-6 space-y-4 border-b border-zinc-200 pb-6">
                {cartItems.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  const cover = getCoverImage(item.product);

                  return (
                    <div key={`${item.productId}-${item.variantKey}`} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-zinc-900/5">
                        <Image src={cover} alt={item.product.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.product.name}</div>
                        <div className="text-xs text-zinc-600">
                          {formatVariantLabel(item.variantKey)} × {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-b border-zinc-200 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)} CAD`}</span>
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

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="mt-6 w-full rounded-full bg-zinc-900 py-4 text-sm font-semibold text-white hover:bg-zinc-800 disabled:bg-zinc-400"
              >
                {isProcessing ? "Processing..." : "Continue to payment"}
              </button>

              <Link
                href="/cart"
                className="mt-3 block text-center text-sm text-zinc-600 hover:text-zinc-900 underline"
              >
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
