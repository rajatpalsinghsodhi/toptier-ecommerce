import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">Order confirmed!</h1>
        <p className="mb-8 text-lg text-zinc-600">
          Thank you for your order. We&apos;ve sent a confirmation email with your order details.
        </p>

        <div className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
          <div className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-600">
            Order Number
          </div>
          <div className="text-3xl font-bold">#ORD-1047</div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-8 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
