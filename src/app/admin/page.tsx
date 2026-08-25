import Link from "next/link";
import type { Metadata } from "next";
import { FileEdit, Upload, History, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sales Tools — SublimApparel",
  description: "Create proforma invoices, upload existing PIs, and manage customer payments.",
  // Noindex this from search engines - it's an internal tool
  robots: { index: false, follow: false },
  other: {
    "robots": "noindex, nofollow",
  },
});

export default function AdminLandingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#0a0a0a] font-black text-white">
              SA
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
                Internal · Sales Team
              </div>
              <div className="text-lg font-black leading-none">Proforma Invoice Tools</div>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
            Create a Proforma Invoice
          </h1>
          <p className="max-w-2xl text-lg text-[#6b6b6b]">
            Two ways to get started. Pick the one that matches what you have on hand.
          </p>
        </div>

        {/* Two options */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Option 1: Fill manually */}
          <Link
            href="/admin/new-pi/"
            className="group block border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(255,77,0,1)]"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center border-2 border-black bg-[#ff4d00] text-white">
              <FileEdit className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h2 className="mb-2 text-2xl font-black uppercase leading-tight tracking-tight">
              Fill the form manually
            </h2>
            <p className="mb-4 text-[#6b6b6b]">
              Use when you have all the details in your head. Type in customer info, line items, and totals.
            </p>
            <ul className="mb-6 space-y-1.5 text-sm text-[#6b6b6b]">
              <li>✓ Full control over every field</li>
              <li>✓ Best for straightforward quotes</li>
              <li>✓ Add unlimited line items</li>
            </ul>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-black group-hover:text-[#ff4d00]">
              Open form
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </div>
          </Link>

          {/* Option 2: Upload PI */}
          <Link
            href="/admin/upload-pi/"
            className="group block border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(255,77,0,1)]"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center border-2 border-black bg-[#00c2ff] text-white">
              <Upload className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h2 className="mb-2 text-2xl font-black uppercase leading-tight tracking-tight">
              Upload existing PI
            </h2>
            <p className="mb-4 text-[#6b6b6b]">
              Got a PI in Word, Excel, or PDF? Upload a screenshot or paste the text. Our AI extracts customer, items, and totals for you to review.
            </p>
            <ul className="mb-6 space-y-1.5 text-sm text-[#6b6b6b]">
              <li>✓ Paste text from any source</li>
              <li>✓ Or upload a screenshot of the PI</li>
              <li>✓ AI auto-fills the form for review</li>
            </ul>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-black group-hover:text-[#00c2ff]">
              Upload PI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Help section */}
        <div className="mt-12 border-t-2 border-black pt-8">
          <h2 className="mb-4 text-xl font-black uppercase tracking-tight">How it works</h2>
          <ol className="space-y-3 text-[#6b6b6b]">
            <li>
              <span className="mr-2 font-black text-black">1.</span>
              Create or upload a PI here. The system saves it and creates a Stripe payment intent.
            </li>
            <li>
              <span className="mr-2 font-black text-black">2.</span>
              Copy the generated link (e.g. <code className="rounded bg-[#0a0a0a] px-1.5 py-0.5 text-xs text-white">sublimapparel.com/pay/?pi=SA202608250001</code>) and send it to your customer via email, WhatsApp, or WeChat.
            </li>
            <li>
              <span className="mr-2 font-black text-black">3.</span>
              Customer opens the link, sees the PI, and pays by card (Stripe) or by bank wire (T/T).
            </li>
            <li>
              <span className="mr-2 font-black text-black">4.</span>
              You get a notification when the PI is paid. Start production.
            </li>
          </ol>
        </div>

        {/* Reference link */}
        <div className="mt-10 border-2 border-dashed border-[#6b6b6b] p-6">
          <div className="flex items-start gap-3">
            <History className="mt-1 h-5 w-5 text-[#6b6b6b]" />
            <div>
              <div className="text-sm font-black uppercase tracking-wider">PI number format</div>
              <div className="mt-1 text-sm text-[#6b6b6b]">
                <code className="rounded bg-white px-1.5 py-0.5">SA{`{YYYYMMDD}{NNNN}`}</code> — 4-digit daily counter. Example: <code className="rounded bg-white px-1.5 py-0.5">SA202608250001</code>. The form will auto-suggest the next number.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
