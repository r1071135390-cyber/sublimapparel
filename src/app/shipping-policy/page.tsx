import { ArrowLeft, Mail, Truck, Warehouse, Globe, Package } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Shipping Policy — SublimPrint",
  description:
    "How we ship, the difference between FOB / CIF / DDP, US warehouse fulfillment from Fontana CA, production lead times, tracking, and what to do if a shipment is lost or damaged.",
};

const INCOTERMS = [
  {
    code: "EXW",
    title: "Ex Works (Yiwu)",
    you_handle:
      "Pickup at our factory, export clearance, freight, customs, duties",
    we_handle: "Production, packing, marking, export documents",
    best_for: "Customers with their own freight forwarder in China",
  },
  {
    code: "FOB",
    title: "Free On Board (Ningbo / Shanghai)",
    you_handle: "Ocean freight, insurance, customs, duties, last mile",
    we_handle: "Production, packing, export clearance, loading on vessel",
    best_for: "Customers with import capability in destination country",
  },
  {
    code: "CIF",
    title: "Cost, Insurance & Freight",
    you_handle: "Customs clearance, duties, last-mile delivery",
    we_handle: "Production, packing, freight to destination port, insurance",
    best_for: "Customers who want port-to-port covered but handle import",
  },
  {
    code: "DDP",
    title: "Delivered Duty Paid (door-to-door)",
    you_handle: "Nothing — we deliver to your door",
    we_handle:
      "Production, packing, freight, insurance, customs, duties, last mile",
    best_for:
      "Most US / EU / UK / AU customers — one price, one invoice, no surprises",
  },
];

const REGION_LEAD_TIMES = [
  {
    region: "United States",
    production: "7–15 days",
    sea: "22–32 days (LA/LB port)",
    air: "5–9 days (LAX)",
    ddp: "9–18 days door-to-door",
  },
  {
    region: "Canada & Mexico",
    production: "7–15 days",
    sea: "25–35 days",
    air: "6–10 days",
    ddp: "11–22 days door-to-door",
  },
  {
    region: "United Kingdom & EU",
    production: "7–15 days",
    sea: "28–40 days",
    air: "5–8 days",
    ddp: "10–20 days door-to-door",
  },
  {
    region: "Australia & New Zealand",
    production: "7–15 days",
    sea: "25–38 days",
    air: "6–10 days",
    ddp: "11–25 days door-to-door",
  },
  {
    region: "Middle East & Africa",
    production: "7–15 days",
    sea: "30–45 days",
    air: "7–12 days",
    ddp: "12–30 days door-to-door",
  },
];

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* Hero */}
      <section className="border-b-2 border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#0a0a0a] hover:text-[#ff4d00]"
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO HOME
          </Link>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ff4d00]">
            [ 007 / SHIPPING ]
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Shipping policy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#0a0a0a]/70">
            How we move your order from Yiwu to your door — and from our
            California warehouse to your customer&rsquo;s mailbox in 2–5 days.
            Plain English, no hidden fees. Last updated August 2026.
          </p>
        </div>
      </section>

      {/* At-a-glance cards */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-[#0a0a0a] bg-white p-5">
              <Truck className="mb-3 h-6 w-6 text-[#ff4d00]" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#0a0a0a]/60">
                DDP TO 100+ COUNTRIES
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#0a0a0a]">
                One price,
              </p>
              <p className="text-sm text-[#0a0a0a]/70">
                duties and customs included.
              </p>
            </div>
            <div className="border-2 border-[#0a0a0a] bg-white p-5">
              <Warehouse className="mb-3 h-6 w-6 text-[#ff4d00]" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#0a0a0a]/60">
                US WAREHOUSE (FONTANA, CA)
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#0a0a0a]">
                2–5 days
              </p>
              <p className="text-sm text-[#0a0a0a]/70">
                domestic shipping to any US state.
              </p>
            </div>
            <div className="border-2 border-[#0a0a0a] bg-white p-5">
              <Globe className="mb-3 h-6 w-6 text-[#ff4d00]" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#0a0a0a]/60">
                PRODUCTION FROM YIWU
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#0a0a0a]">
                7–15 days
              </p>
              <p className="text-sm text-[#0a0a0a]/70">
                typical lead time after proof approval.
              </p>
            </div>
            <div className="border-2 border-[#0a0a0a] bg-white p-5">
              <Package className="mb-3 h-6 w-6 text-[#ff4d00]" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#0a0a0a]/60">
                TRACKING
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#0a0a0a]">
                Door-to-door,
              </p>
              <p className="text-sm text-[#0a0a0a]/70">
                live tracking link on every DDP order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Incoterms */}
      <section className="border-b-2 border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            Shipping terms (Incoterms 2020).
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Pick the level of door-to-door coverage that fits your team. We
            quote each option transparently so you can compare.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {INCOTERMS.map((term) => (
              <div
                key={term.code}
                className="border-2 border-[#0a0a0a] bg-[#faf9f6] p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-extrabold text-[#0a0a0a]">
                    {term.code}
                  </h3>
                  <span className="text-xs font-bold text-[#ff4d00]">
                    {term.title}
                  </span>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-bold text-[#0a0a0a]">We handle</dt>
                    <dd className="mt-1 text-[#0a0a0a]/75">{term.we_handle}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#0a0a0a]">You handle</dt>
                    <dd className="mt-1 text-[#0a0a0a]/75">
                      {term.you_handle}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#0a0a0a]">Best for</dt>
                    <dd className="mt-1 text-[#0a0a0a]/75">{term.best_for}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead times by region */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            Lead times by region.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Production starts after proof approval and deposit receipt.
            Quoted delivery times are estimates, not guarantees — see{" "}
            <Link href="/terms" className="font-bold underline">
              Terms of sale
            </Link>
            .
          </p>

          <div className="mt-10 overflow-x-auto border-2 border-[#0a0a0a] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-xs font-bold tracking-[0.1em] text-white">
                <tr>
                  <th className="p-3">Region</th>
                  <th className="p-3">Production</th>
                  <th className="p-3">Sea (port-to-port)</th>
                  <th className="p-3">Air (door-to-door)</th>
                  <th className="p-3">DDP (door-to-door)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0a0a0a]/15">
                {REGION_LEAD_TIMES.map((r, idx) => (
                  <tr
                    key={r.region}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}
                  >
                    <td className="p-3 font-bold text-[#0a0a0a]">{r.region}</td>
                    <td className="p-3 text-[#0a0a0a]/80">{r.production}</td>
                    <td className="p-3 text-[#0a0a0a]/80">{r.sea}</td>
                    <td className="p-3 text-[#0a0a0a]/80">{r.air}</td>
                    <td className="p-3 font-bold text-[#0a0a0a]">{r.ddp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#0a0a0a]/60">
            All times in business days, exclude public holidays in origin and
            destination countries, and assume the receiving address is a
            commercial (not residential) location.
          </p>
        </div>
      </section>

      {/* US warehouse */}
      <section className="border-b-2 border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            US warehouse fulfillment (Fontana, CA).
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
            We hold stock of best-selling blanks and finished goods in our
            Southern California warehouse. Once an order is in stock, it
            ships to any US address in <strong>2–5 business days</strong> via
            UPS, FedEx, or USPS, with tracking emailed automatically. This is
            ideal for POD platforms, drop-shippers, and brands with steady
            reorders.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
            For full US-warehouse case study, see{" "}
            <Link href="/shipping" className="font-bold underline">
              Shipping
            </Link>{" "}
            and{" "}
            <Link href="/shipping/ddp" className="font-bold underline">
              DDP shipping
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Tracking, customs, problems */}
      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-12">
          <article>
            <h2 className="text-2xl font-extrabold text-[#0a0a0a] md:text-3xl">
              Tracking.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
              For every DDP and air-freight order, we send a live tracking
              link as soon as the carrier picks up the shipment. The link
              shows real-time status, customs clearance, and final delivery.
              For ocean freight (FOB / CIF), we provide the master B/L number
              and the shipping line&rsquo;s tracking once the vessel sails.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-extrabold text-[#0a0a0a] md:text-3xl">
              Customs, duties &amp; import taxes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
              For DDP orders, all customs clearance fees, import duties, and
              applicable taxes are included in your quote and paid by us — no
              surprise bills on delivery. For non-DDP orders (EXW / FOB /
              CIF), you are responsible for clearing customs and paying
              duties in your country. We provide all required commercial
              invoices, packing lists, and certificates of origin free of
              charge.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-extrabold text-[#0a0a0a] md:text-3xl">
              Lost, damaged, or delayed shipments.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
              For DDP orders shipped by us, if a shipment is lost in transit
              or arrives damaged, we file the carrier claim and either
              reship at no cost or refund the affected units — at your
              option. For non-DDP orders, we assist with documentation but
              the carrier&rsquo;s liability terms apply. Report any issue
              within <strong>7 days</strong> of the expected delivery date
              with photos so we can act quickly.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-extrabold text-[#0a0a0a] md:text-3xl">
              Address changes &amp; failed delivery.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
              Once a shipment is with the carrier, address changes may
              incur a re-routing fee charged by the carrier. If delivery
              fails due to an incorrect address, refusal to pay duties (on
              non-DDP orders), or no one available to receive, the parcel
              will be returned to origin at the customer&rsquo;s cost.
            </p>
          </article>

          <div className="border-2 border-[#0a0a0a] bg-white p-6 md:p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#ff4d00]">
              NEED A SPECIFIC SHIPPING QUOTE?
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#0a0a0a]">
              Email our logistics team.
            </h3>
            <p className="mt-2 text-sm text-[#0a0a0a]/70">
              Send your country, ZIP / postal code, and order size — we&rsquo;ll
              reply with DDP / FOB / CIF options within one business day.
            </p>
            <a
              href="mailto:ramon@sublimprint.com?subject=Shipping%20quote%20request"
              className="mt-5 inline-flex items-center gap-2 bg-[#ff4d00] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e64500]"
            >
              <Mail className="h-4 w-4" />
              ramon@sublimprint.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
