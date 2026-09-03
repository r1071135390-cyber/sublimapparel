import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Production & Lead Times: Calendar, Rush, Holidays | SublimApparel",
  description:
    "How long custom apparel takes to produce at SublimApparel: standard lead time, rush options, the production calendar from PO to delivery, and Chinese holiday slowdowns.",
  openGraph: {
    title: "Production & Lead Times — PO to Door",
    description:
      "Real lead times, rush options, and the production calendar. No vague '6-8 weeks' — here's exactly when each step happens.",
    type: "article",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Production & lead times", path: "https://sublimapparel.com/production/" },
]);

const faqItems = [
  {
    q: "What is the standard lead time for sublimated apparel?",
    a:
      "Standard production is 12-18 business days from artwork approval and deposit receipt. For 1,000+ pieces, allow 18-25 business days. Add 25-35 days for ocean freight to the US/EU. Total door-to-door standard: 35-50 days from PO.",
  },
  {
    q: "Can you do rush?",
    a:
      "Yes, on most orders. Rush production (7-10 business days) is possible for orders under 500 pieces, with a +20% production surcharge and subject to line capacity. We don't accept rush for new clients or first-time designs — we need a 5-day pre-production sample to dial in colors.",
  },
  {
    q: "When are the Chinese factory holidays?",
    a:
      "Chinese New Year (Spring Festival) is the big one — typically 10 days off in late January or February. We stop taking new orders about 3 weeks before and resume 2 weeks after. Plan any large order around the holiday with a buffer. Mid-Autumn Festival and National Day (Oct 1) are 3-5 day breaks that don't usually affect lead times.",
  },
  {
    q: "Can I split a large order into multiple shipments?",
    a:
      "Yes. For 2,000+ piece orders, we offer staggered shipments at no extra cost. We produce in batches of 500-700 and ship as each batch finishes. Useful for events with multiple dates or for replenishing stock without overloading your warehouse.",
  },
  {
    q: "What if my shipment misses the vessel?",
    a:
      "Vessel cut-off is typically 3 days before scheduled departure. If we miss the cut-off due to a production delay on our side, we rebook the next available vessel at our cost and refund any demurrage. This has happened fewer than 5 times in the last 12 months.",
  },
  {
    q: "How do I track production progress?",
    a:
      "Every order gets a tracking link: you can see design approval status, fabric in stock, printing progress, cut & sew progress, QC photos, packing photos, and shipment booking — all in real time, updated by the line supervisor.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqItems);

const steps = [
  { day: "Day 0", title: "PO & deposit", desc: "Order confirmed, 30% deposit received" },
  { day: "Day 1–2", title: "Artwork finalization", desc: "Mock-up, color proof, size spec sheet approved" },
  { day: "Day 2–3", title: "Fabric & trim procurement", desc: "Poly or cotton blank sourced, custom labels ordered" },
  { day: "Day 3–5", title: "Sublimation printing", desc: "Design printed on transfer paper, calendar-pressed onto fabric" },
  { day: "Day 5–8", title: "Cut & sew", desc: "Fabric cut to pattern, panels sewn, decorations attached" },
  { day: "Day 8–10", title: "QC & pressing", desc: "Each piece inspected, steamed, folded, bagged" },
  { day: "Day 10–12", title: "Carton packing", desc: "Export cartons packed, marks & labels applied" },
  { day: "Day 12–14", title: "Export clearance", desc: "Customs declaration, container loading at Yiwu port" },
  { day: "Day 14–18", title: "Pre-shipment sample (optional)", desc: "We send a finished sample for your approval before vessel departure" },
  { day: "Day 18", title: "Vessel departure", desc: "Ocean freight Yiwu → Long Beach / Hamburg / Sydney" },
  { day: "Day 18–45", title: "Ocean transit", desc: "22–27 days depending on destination" },
  { day: "Day 45–55", title: "DDP delivery", desc: "Customs cleared, last-mile to your warehouse" },
];

export default function ProductionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
              Buyer&apos;s Guide · Production
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Production &amp; lead times: PO to door
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#6b6b6b] md:text-xl">
              No vague &quot;6–8 weeks.&quot; Here&apos;s the day-by-day calendar from
              deposit to delivery, plus the rush options and holiday windows that
              actually affect your order.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              The production calendar
            </h2>
            <p className="mt-3 text-[#6b6b6b]">
              Standard 500-piece sublimation order, ocean freight to US East Coast.
              Larger or smaller orders scale proportionally.
            </p>
            <ol className="mt-8 space-y-0">
              {steps.map((step, i) => (
                <li key={step.day} className="flex gap-4 border-b border-[#e5e5e5] py-4 last:border-b-0">
                  <div className="flex w-24 shrink-0 flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
                      {step.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold">{step.title}</p>
                    <p className="mt-1 text-sm text-[#6b6b6b]">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Lead times at a glance
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-black p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
                  Standard
                </p>
                <p className="mt-2 text-3xl font-extrabold">35–50 days</p>
                <p className="mt-2 text-sm text-[#3a3a3a]">
                  PO to door, ocean freight. Production: 12–18 business days. Transit:
                  22–32 days.
                </p>
              </div>
              <div className="rounded-lg border-2 border-[#ff4d00] bg-[#fff8f3] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
                  Rush (+20% production)
                </p>
                <p className="mt-2 text-3xl font-extrabold">25–35 days</p>
                <p className="mt-2 text-sm text-[#3a3a3a]">
                  Production compressed to 7–10 business days. Available for orders
                  under 500 pcs and existing designs.
                </p>
              </div>
              <div className="rounded-lg border-2 border-[#00c2ff] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00c2ff]">
                  Air freight
                </p>
                <p className="mt-2 text-3xl font-extrabold">15–22 days</p>
                <p className="mt-2 text-sm text-[#3a3a3a]">
                  Production 10 days + air transit 5–7 days. Adds $1.20–$2.50 per shirt
                  vs ocean.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-16 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              What can delay your order
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                ["Artwork changes after production start", "Each round of revision adds 2-3 days. Approve the mock-up before we go to print."],
                ["Custom fabric (non-stock color or GSM)", "Adds 7-12 days for dyeing + testing. Order fabric 3 weeks before design final."],
                ["Holiday windows", "Chinese New Year: stop taking orders 3 weeks before, resume 2 weeks after. Plan around it."],
                ["Pantone / spot color match", "We can CMYK-match 95% of Pantone colors. True spot color adds $200 setup + 2 days."],
                ["Custom labels or tags", "If you supply your own labels, send them 2 weeks before production. We can also source for you."],
              ].map(([title, body]) => (
                <li key={title} className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4 md:flex-row md:items-baseline md:gap-6">
                  <p className="font-bold md:w-1/3 text-[#ff4d00]">⚠ {title}</p>
                  <p className="text-sm text-[#a0a0a0] md:w-2/3">{body}</p>
                </li>
              ))}
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
              Need a delivery date for your event?
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              Tell us your event date or restock deadline. We&apos;ll work backward and
              tell you exactly when the PO needs to land.
            </p>
            <div className="mt-8">
              <RequestQuoteLink
                label="Get a production plan"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-widest text-white hover:bg-[#ff5d1a]"
              >
                Get a production plan
              </RequestQuoteLink>
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
