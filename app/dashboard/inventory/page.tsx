"use client";

import { products, getProductById } from "@/lib/products";
import { formatVariantLabel } from "@/lib/variant-label";
import { ProductThumb } from "@/components/ProductThumb";
import { useState } from "react";

type VariantStock = {
  productId: string;
  productName: string;
  variantKey: string;
  stock: number;
};

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all variants into a list
  const allVariants: VariantStock[] = [];
  products.forEach((product) => {
    Object.entries(product.stock).forEach(([variantKey, stock]) => {
      allVariants.push({
        productId: product.id,
        productName: product.name,
        variantKey,
        stock,
      });
    });
  });

  const filteredVariants = allVariants.filter((v) =>
    v.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.variantKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockVariants = filteredVariants.filter((v) => v.stock < 10 && v.stock > 0);
  const outOfStockVariants = filteredVariants.filter((v) => v.stock === 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="mt-2 text-zinc-600">Track and manage stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Total Variants</div>
          <div className="text-3xl font-bold">{allVariants.length}</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="mb-2 text-sm font-medium text-amber-700">Low Stock</div>
          <div className="text-3xl font-bold text-amber-700">{lowStockVariants.length}</div>
          <div className="mt-1 text-xs text-amber-600">Less than 10 units</div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="mb-2 text-sm font-medium text-red-700">Out of Stock</div>
          <div className="text-3xl font-bold text-red-700">{outOfStockVariants.length}</div>
          <div className="mt-1 text-xs text-red-600">Needs restock</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by product or variant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-zinc-900 focus:outline-none"
        />
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Variant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredVariants.map((variant) => {
                const isLowStock = variant.stock < 10 && variant.stock > 0;
                const isOutOfStock = variant.stock === 0;
                const prod = getProductById(variant.productId);

                return (
                  <tr key={`${variant.productId}-${variant.variantKey}`} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {prod ? <ProductThumb product={prod} size={40} /> : null}
                        <div className="text-sm font-medium">{variant.productName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {formatVariantLabel(variant.variantKey)}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${
                        isOutOfStock ? "text-red-600" : isLowStock ? "text-amber-600" : "text-zinc-900"
                      }`}>
                        {variant.stock} units
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isOutOfStock ? (
                        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                          Out of stock
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                          Low stock
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          In stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-zinc-900 hover:underline">
                        Adjust
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
