"use client";

import { useState } from "react";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  items: number;
  total: number;
  status: "pending" | "fulfilled" | "pre-order";
  shippingAddress: string;
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-5102",
    customerName: "Jane Cooper",
    customerEmail: "jane@example.com",
    date: "2026-04-28",
    items: 3,
    total: 215.50,
    status: "fulfilled",
    shippingAddress: "123 Main St, Toronto, ON M5V 1A1",
  },
  {
    id: "ORD-5101",
    customerName: "Robert Fox",
    customerEmail: "robert@example.com",
    date: "2026-04-27",
    items: 1,
    total: 89.00,
    status: "pending",
    shippingAddress: "456 King St W, Toronto, ON M5H 1A1",
  },
  {
    id: "ORD-5100",
    customerName: "Wade Warren",
    customerEmail: "wade@example.com",
    date: "2026-04-27",
    items: 2,
    total: 180.00,
    status: "pre-order",
    shippingAddress: "789 Queen St, Toronto, ON M5C 1B5",
  },
  {
    id: "ORD-5099",
    customerName: "Esther Howard",
    customerEmail: "esther@example.com",
    date: "2026-04-26",
    items: 1,
    total: 45.00,
    status: "fulfilled",
    shippingAddress: "321 Spadina Ave, Toronto, ON M5T 2E7",
  },
  {
    id: "ORD-5098",
    customerName: "Cameron Williamson",
    customerEmail: "cameron@example.com",
    date: "2026-04-26",
    items: 4,
    total: 380.00,
    status: "fulfilled",
    shippingAddress: "654 Yonge St, Toronto, ON M4Y 1Z3",
  },
  {
    id: "ORD-5097",
    customerName: "Brooklyn Simmons",
    customerEmail: "brooklyn@example.com",
    date: "2026-04-25",
    items: 2,
    total: 165.00,
    status: "pending",
    shippingAddress: "987 Bloor St W, Toronto, ON M6H 1L5",
  },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  let filteredOrders = mockOrders;
  
  if (selectedStatus) {
    filteredOrders = filteredOrders.filter((o) => o.status === selectedStatus);
  }
  
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    fulfilled: mockOrders.filter((o) => o.status === "fulfilled").length,
    preOrder: mockOrders.filter((o) => o.status === "pre-order").length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="mt-2 text-zinc-600">Manage customer orders and fulfillment</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 sm:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-2 text-sm font-medium text-zinc-600">Total Orders</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="mb-2 text-sm font-medium text-amber-700">Pending</div>
          <div className="text-3xl font-bold text-amber-700">{stats.pending}</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="mb-2 text-sm font-medium text-emerald-700">Fulfilled</div>
          <div className="text-3xl font-bold text-emerald-700">{stats.fulfilled}</div>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="mb-2 text-sm font-medium text-blue-700">Pre-orders</div>
          <div className="text-3xl font-bold text-blue-700">{stats.preOrder}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-zinc-900 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              selectedStatus === null
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus("pending")}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              selectedStatus === "pending"
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedStatus("fulfilled")}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              selectedStatus === "fulfilled"
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Fulfilled
          </button>
          <button
            onClick={() => setSelectedStatus("pre-order")}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              selectedStatus === "pre-order"
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Pre-orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white">
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
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Total
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{order.customerName}</div>
                    <div className="text-xs text-zinc-600">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-medium">${order.total.toFixed(2)} CAD</td>
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
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedOrder.id}</h2>
                <p className="mt-1 text-sm text-zinc-600">
                  {new Date(selectedOrder.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-500 hover:text-zinc-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-600">Customer</h3>
                <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                <p className="text-sm text-zinc-600">{selectedOrder.customerEmail}</p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-600">Shipping Address</h3>
                <p className="text-sm text-zinc-600">{selectedOrder.shippingAddress}</p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-600">Order Summary</h3>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex justify-between text-sm">
                    <span>{selectedOrder.items} items</span>
                    <span className="font-semibold">${selectedOrder.total.toFixed(2)} CAD</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-600">Status</h3>
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium ${
                    selectedOrder.status === "fulfilled"
                      ? "bg-emerald-100 text-emerald-700"
                      : selectedOrder.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              {selectedOrder.status === "pending" && (
                <button className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800">
                  Mark as fulfilled
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
