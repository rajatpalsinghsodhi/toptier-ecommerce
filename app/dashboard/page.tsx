"use client";

import { ProductThumb } from "@/components/ProductThumb";
import { products } from "@/lib/products";

export default function DashboardPage() {
  // Calculate stats
  const totalProducts = products.length;
  const totalRevenue = 12450.78; // Mock data
  const totalOrders = 84; // Mock data
  const lowStockCount = products.filter(p => {
    const totalStock = Object.values(p.stock).reduce((a, b) => a + b, 0);
    return totalStock < 10 && totalStock > 0;
  }).length;
  const preOrderCount = products.filter(p => p.isPreOrder).length;

  // Recent orders (mock data)
  const recentOrders = [
    { id: "ORD-5102", customer: "Jane Cooper", date: "Apr 28, 2026", items: 3, total: 215.50, status: "fulfilled" },
    { id: "ORD-5101", customer: "Robert Fox", date: "Apr 27, 2026", items: 1, total: 89.00, status: "pending" },
    { id: "ORD-5100", customer: "Wade Warren", date: "Apr 27, 2026", items: 2, total: 180.00, status: "pre-order" },
    { id: "ORD-5099", customer: "Esther Howard", date: "Apr 26, 2026", items: 1, total: 45.00, status: "fulfilled" },
  ];

  // Top products (mock data)
  const topProducts = [
    { name: "Essential Oversized Tee", sales: 45 },
    { name: "Cargo Utility Pants", sales: 32 },
    { name: "Classic Hoodie", sales: 28 },
    { name: "Minimal Windbreaker", sales: 15 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-zinc-600">Overview of your store performance</p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Total Revenue</div>
          <div className="mb-1 text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-emerald-600">+15.2% from last month</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Orders</div>
          <div className="mb-1 text-3xl font-bold">{totalOrders}</div>
          <div className="text-xs text-emerald-600">+8.5% from last month</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Low Stock Alerts</div>
          <div className="mb-1 text-3xl font-bold text-amber-600">{lowStockCount}</div>
          <div className="text-xs text-zinc-600">Items need restock</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Pre-Orders</div>
          <div className="mb-1 text-3xl font-bold">{preOrderCount}</div>
          <div className="text-xs text-zinc-600">Across {totalProducts} products</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 p-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <a href="/dashboard/orders" className="text-sm font-medium text-zinc-900 hover:underline">
                View all →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === "fulfilled"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 p-6">
              <h2 className="text-xl font-bold">Top Products</h2>
            </div>

            <div className="p-6 space-y-4">
              {topProducts.map((product) => {
                const p = products.find((x) => x.name === product.name);
                return (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p ? (
                      <ProductThumb product={p} size={40} />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600">
                        ?
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-zinc-600">{product.sales} sold</div>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>
            <div className="space-y-2">
              <a
                href="/dashboard/products?action=add"
                className="block rounded-lg bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800"
              >
                + Add Product
              </a>
              <a
                href="/dashboard/inventory"
                className="block rounded-lg border border-zinc-300 bg-white px-4 py-3 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Update Inventory
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
