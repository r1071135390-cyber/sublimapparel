import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "DDP vs FOB Shipping: Which Is Right? | SublimApparel",
  description:
    "DDP (Delivered Duty Paid) vs FOB (Free on Board) shipping for overseas apparel orders. Who pays duties, who handles customs, which is riskier, and which saves money.",
  openGraph: {
    title: "DDP vs FOB — Which Shipping Terms Fit Your Apparel Order?",
    description:
      "Duty exposure, customs clearance, risk, and total landed cost. Side-by-side for B2B buyers sourcing from China.",
    type: "article",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Compare", path: "https://sublimapparel.com/compare/" },
  { name: "DDP vs FOB", path: "https://sublimapparel.com/compare/ddp-vs-fob/" },
]);

const faqItems = [
  {
    q: "Is DDP more expensive than FOB?",
    a:
      "On paper, FOB looks cheaper because you only pay the factory + ocean freight. With DDP, the freight forwarder's quote includes duties, customs brokerage, and last-mile delivery. In practice, DDP is often cheaper in total because the forwarder buys duties at trade rates and consolidates shipments — most B2B buyers see 5-15% savings on landed cost with DDP.",
  },
  {
    q: "What happens if customs holds a FOB shipment?",
    a:
      "If you're on FOB terms, the shipment is in your name. You (or your broker) have to clear it, pay any duties owed, respond to any customs query, and arrange final delivery. If you're a small brand without a US/EU customs broker, this can stall your shipment at the port for 2-4 weeks. DDP avoids that because the factory's forwarder handles everything before delivery.",
  },
  {
    q: "Can I switch from FOB to DDP on the same order?",
    a:
      "Yes, but only before the goods leave the origin port. Once the cargo is on the vessel under FOB terms, ownership has transferred. If you realize mid-production that you can't handle customs, you can re-route the cargo to a DDP forwarder — but expect a 10-20% premium for the late change.",
  },
  {
    q: "Do US buyers really need DDP for small orders?",
    a:
      "For orders under $800 per shipment entering the US, Section 321 de minimis lets the package enter duty-free under a single consignee — this is what most dropshippers and small brands use. Once your shipment exceeds $800 (per consignee, per day), full customs clearance kicks in, and DDP becomes valuable.",
  },
  {
    q: "Which incoterm is best for first-time importers?",
    a:
      "DDP. If you have never imported before, you don't have a customs broker relationship, you don't know HTS classification, and you don't have a duty-payment account set up. DDP lets you receive the goods at your warehouse with one invoice. FOB is appropriate once you're doing 5+ containers per year and have a broker on retainer.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqItems);

const rows = [
  {
    label: "Who pays duties",
    fob: "You (the buyer)",
    ddp: "The factory's forwarder",
  },
  {
    label: "Who handles customs clearance",
    fob: "You or your broker",
    ddp: "Factory's forwarder",
  },
  {
    label: "Who owns goods in transit",
    fob: "You, once goods cross the ship's rail at origin port",
    ddp: "Forwarder, until goods are delivered to your door",
  },
  {
    label: "Risk during transit",
    fob: "Yours (from origin port onward)",
    ddp: "Forwarder's (door-to-door)",
  },
  {
    label: "Best for small / first-time buyers",
    fob: "No — requires customs broker",
    ddp: "Yes — one invoice, no broker needed",
  },
  {
    label: "Best for high-volume importers",
    fob: "Yes — direct control, lower per-unit duty",
    ddp: "Sometimes — depends on forwarder rates",
  },
  {
    label: "Total landed cost visibility",
    fob: "Hidden — duty added on top of factory + freight quote",
    ddp: "Transparent — all-in one delivered price",
  },
  {
    label: "Cash flow",
    fob: "Pay factory, then freight, then duties (3 invoices, 3 timings)",
    ddp: "Pay one delivered invoice",
  },
  {
    label: "Customs holdup risk",
    fob: "High if you don't have a broker",
    ddp: "Low — forwarder handles it daily",
  },
  {
    label: "Lead time from PO to door",
    fob: "25-45 days (port-to-port, plus your clearance)",
    ddp: "20-40 days (door-to-door, predictable)",
  },
];

export default function DdpVsFobPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
              Buyer&apos;s Guide · Shipping Terms Comparison
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              DDP vs FOB shipping: which terms fit your order?
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#6b6b6b] md:text-xl">
              Both terms get the goods from China to your door. The difference is who
              pays duties, who handles customs, and who owns the risk in transit. Here&apos;s
              the side-by-side.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Quick answer
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border-2 border-black bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00c2ff]">
                  Choose FOB if
                </p>
                <p className="mt-2 text-lg font-bold">
                  You have a US/EU customs broker and import 5+ containers per year.
                </p>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  Best for: large brands, vertical retailers, frequent importers.
                </p>
              </div>
              <div className="rounded-lg border-2 border-black bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
                  Choose DDP if
                </p>
                <p className="mt-2 text-lg font-bold">
                  You&apos;re a small brand, first-time importer, or want a one-invoice landed cost.
                </p>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  Best for: dropshippers, e-com brands, agencies, event merch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Side-by-side comparison
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="w-1/4 py-4 pr-4 text-sm font-bold uppercase tracking-widest">
                      Dimension
                    </th>
                    <th className="w-3/8 py-4 pr-4 text-sm font-bold uppercase tracking-widest text-[#00c2ff]">
                      FOB
                    </th>
                    <th className="w-3/8 py-4 text-sm font-bold uppercase tracking-widest text-[#ff4d00]">
                      DDP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-[#e5e5e5] align-top">
                      <td className="py-5 pr-4 font-bold">{row.label}</td>
                      <td className="py-5 pr-4 text-sm text-[#1a1a1a]">{row.fob}</td>
                      <td className="py-5 text-sm text-[#1a1a1a]">{row.ddp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-16 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              When DDP saves money
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-[#a0a0a0]">
              DDP looks like a premium service, but on small-to-medium B2B orders the
              factory&apos;s forwarder usually beats your own broker on three line items:
            </p>
            <ul className="mt-6 space-y-4 text-lg">
              <li className="flex gap-3">
                <span className="text-[#00c2ff]">›</span>
                <p>
                  <span className="font-bold">Duty rate.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    Forwarders negotiate trade-rate discounts (often 1-3% below posted
                    duty) and consolidate HTS classifications across clients.
                  </span>
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00c2ff]">›</span>
                <p>
                  <span className="font-bold">Last-mile delivery.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    They have daily consolidation trucks; a one-off importer pays LTL
                    rates that are 30-50% higher per carton.
                  </span>
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00c2ff]">›</span>
                <p>
                  <span className="font-bold">Demurrage risk.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    If customs holds the shipment, demurrage at the destination port is
                    $80-300/day. The forwarder absorbs that on DDP; you pay it on FOB.
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border-2 border-[#e5e5e5] bg-white p-5 [&[open]]:border-black"
                >
                  <summary className="cursor-pointer text-lg font-bold marker:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-[#3a3a3a]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Want a DDP quote with all duties included?
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              Send us your delivery ZIP / postal code. We&apos;ll quote factory price,
              freight, duties, and last-mile delivery as one delivered number.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <RequestQuoteLink
                label="Get a DDP quote"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-widest text-black hover:bg-[#ff5d1a]"
              >
                Request a DDP quote
              </RequestQuoteLink>
              <a
                href="/shipping/ddp/"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-4 text-base font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white"
              >
                How DDP works
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <JsonLd data={breadcrumb} />
    </>
  );
}
