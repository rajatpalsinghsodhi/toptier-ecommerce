"use client";

import { ProductThumb } from "@/components/ProductThumb";
import { products } from "@/lib/products";
import { useState } from "react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-2 text-zinc-600">Manage your product catalog</p>
        </div>
        <button className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800">
          + Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-zinc-900 focus:outline-none"
          />
        </div>
        <select className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 focus:border-zinc-900 focus:outline-none">
          <option>All Categories</option>
          <option>Tops</option>
          <option>Bottoms</option>
          <option>Outerwear</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Price
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
              {filteredProducts.map((product) => {
                const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
                const displayPrice = product.salePrice || product.price;

                return (
                  <tr key={product.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ProductThumb product={product} size={48} />
                        <div>
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs text-zinc-600">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">${displayPrice} CAD</div>
                      {product.salePrice && (
                        <div className="text-xs text-zinc-500 line-through">${product.price} CAD</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.isPreOrder ? (
                        <span className="text-sm text-amber-700 font-medium">Pre-order</span>
                      ) : (
                        <div>
                          <div className={`text-sm font-medium ${totalStock < 10 ? "text-amber-600" : "text-zinc-900"}`}>
                            {totalStock} units
                          </div>
                          {totalStock < 10 && totalStock > 0 && (
                            <div className="text-xs text-amber-600">Low stock</div>
                          )}
                          {totalStock === 0 && (
                            <div className="text-xs text-red-600">Out of stock</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-zinc-900 hover:underline">
                        Edit
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
