import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Order Canceled | SublimApparel",
  description: "Your order was canceled. No payment was made.",
  robots: { index: false, follow: false },
});

export default function OrderCanceledPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black/20 bg-white">
            <XCircle className="h-10 w-10 text-black/40" strokeWidth={2} />
          </div>
          <div className="mb-4 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Canceled
          </div>
          <h1 className="mb-4 text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
            No payment was made.
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base text-black/70 md:text-lg">
            You canceled checkout on Stripe's secure payment page. Your cart is
            empty and no card was charged. You can try again or get a custom
            quote.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-[#cc3d00]"
            >
              Back to shop
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
            >
              Get a custom quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
