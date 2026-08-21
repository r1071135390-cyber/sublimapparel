import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Handshake,
  MessageSquare,
  Package,
  Shield,
  Ship,
  Wallet,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata = buildPageMetadata({
    title: "How to Source Custom Apparel from China | 5-Step Process",
    description: "How to source custom apparel from China: 5-step process from inquiry to delivery. Learn about quoting, sample, production, QC, and shipping for event, corporat…",
    keywords: ["how to source custom apparel", "import apparel from China", "China apparel sourcing guide", "custom clothing manufacturing process", "apparel sourcing step by step", "sublimation apparel sourcing"],
    alternates: {
    canonical: "https://sublimapparel.com/how-to-source/",
  },
    ogTitle: "How to Source Custom Apparel from China | 5-Step Process",
    ogDescription: "5-step process from inquiry to delivery. Quoting, sample, production, QC, and shipping.",
    ogImage: "https://sublimapparel.com/how-to-source/",
  });;

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "How to Source Custom Apparel", path: "/how-to-source/" },
]);

const steps = [
  {
    n: 1,
    icon: MessageSquare,
    title: "Inquiry & Quote",
    timing: "Day 1-3",
    summary:
      "Send us your inquiry: product type, quantity, design, target delivery date. We respond with a quote within 24 business hours.",
    details: [
      "Email: hello@sublimapparel.com (or use the form on our contact page)",
      "Include product type (T-shirt, jersey, hoodie, etc.), estimated quantity, design file or reference image, target delivery date, and your company/organization info",
      "We respond within 24 business hours with: per-piece pricing, MOQ, fabric options, sample cost, and estimated lead time",
      "Pricing is held for 30 days (vs. 7 days at most factories)",
      "No deposit or commitment required to get a quote",
    ],
  },
  {
    n: 2,
    icon: ClipboardList,
    title: "Sample & Sign-Off",
    timing: "Day 5-15",
    summary:
      "Physical sample on production fabric, with your exact colors and design. You approve before bulk cut.",
    details: [
      "Sample cost: $80-150 per design (refunded on bulk order)",
      "Sample production time: 7-10 days for first-time designs, 3-5 days for re-orders",
      "Sample includes: production fabric, your exact colors, full print, sewn construction",
      "Shipped via DHL/FedEx to your door, 3-5 business days",
      "Sample sign-off is the contract for bulk. We don&apos;t start bulk until you approve the sample.",
    ],
  },
  {
    n: 3,
    icon: Wallet,
    title: "Deposit & Production Planning",
    timing: "Day 16-20",
    summary:
      "30% deposit, 70% before shipment. We book your slot in the production schedule.",
    details: [
      "Deposit: 30% of total order value",
      "Payment: T/T (wire transfer), PayPal (small orders), or LC at sight (large orders)",
      "Production slot confirmed in our 30-day rolling schedule",
      "You receive a production schedule with milestones (T-60, T-30, T-15, T-7, T-3)",
      "Communication: one named account manager for the duration of your order",
    ],
  },
  {
    n: 4,
    icon: Package,
    title: "Production & 4-Stage QC",
    timing: "Day 21-60",
    summary:
      "Cut, print, sew, inspect. 4-stage quality control with photo evidence. 15 business days for most orders.",
    details: [
      "Fabric inspection before cut",
      "Cut, print, sew in 12-15 business days for most orders",
      "Stage 1: Pre-production sample (locked at sample sign-off)",
      "Stage 2: In-line inspection (first 30 pieces, then 10% random)",
      "Stage 3: AQL 2.5 final random inspection",
      "Stage 4: Pre-shipment photo evidence (you see it before it ships)",
    ],
  },
  {
    n: 5,
    icon: Ship,
    title: "Shipping & Delivery",
    timing: "Day 61-90",
    summary:
      "DDP shipping arranged. Ocean, air, or US warehouse domestic. Customs handled.",
    details: [
      "Final payment: 70% balance before shipping",
      "DDP (Delivered Duty Paid): we handle customs, duties, and last-mile delivery",
      "Ocean: 25-35 days from Yiwu to US West Coast, 5-7 days to your door via truck",
      "Air: 7-10 days from Yiwu to US door (for time-sensitive orders)",
      "US warehouse: 2-5 days domestic delivery for stocked items",
      "Tracking provided. Container photo at pickup.",
    ],
  },
];

const paymentMethods = [
  {
    method: "T/T (Wire Transfer)",
    best: "Standard for all orders",
    fee: "$15-30 per wire",
    timing: "2-3 business days",
  },
  {
    method: "PayPal",
    best: "Sample orders, <$5,000 orders",
    fee: "3-5% surcharge",
    timing: "Instant",
  },
  {
    method: "L/C at Sight",
    best: "Large orders >$50,000",
    fee: "Bank fees",
    timing: "5-7 business days",
  },
  {
    method: "30/70 Net-30",
    best: "Repeat customers, established accounts",
    fee: "0%",
    timing: "Net-30 from delivery",
  },
];

const shippingOptions = [
  {
    method: "Ocean DDP",
    time: "25-35 days port-to-door",
    cost: "$$ (lowest)",
    best: "Orders >1,000 pcs, not time-sensitive",
  },
  {
    method: "Air DDP",
    time: "7-10 days door-to-door",
    cost: "$$$",
    best: "Orders <1,000 pcs, time-sensitive",
  },
  {
    method: "US Warehouse",
    time: "2-5 days domestic",
    cost: "$$",
    best: "Re-orders, designs we already stock",
  },
  {
    method: "Express (DHL/FedEx)",
    time: "3-5 days door-to-door",
    cost: "$$$$",
    best: "Samples only",
  },
];

export default function HowToSourcePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="border-b border-black/10 bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
            <FileText className="h-3.5 w-3.5" />
            Sourcing guide
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            How to source
            <br />
            <span className="text-[#ff4d00]">custom apparel from China.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            5 steps from first inquiry to delivered boxes. 30 years of
            sourcing experience distilled into one page. Use this as your
            checklist whether you work with us or another supplier.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            The 5-step process.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            We&apos;ve refined this process over 8 years and 1,200+ orders.
            Each step has a clear deliverable, a clear timing, and a clear
            handoff. No mystery.
          </p>

          <div className="relative mt-12 space-y-6">
            {steps.map((s, idx) => (
              <div key={s.n} className="relative">
                {idx < steps.length - 1 && (
                  <div className="absolute left-7 top-16 h-6 w-0.5 bg-[#ff4d00]/20" />
                )}
                <div className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6 md:p-8">
                  <div className="flex flex-wrap items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-black">
                      <s.icon className="h-7 w-7" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-black">
                          Step {s.n}: {s.title}
                        </h3>
                        <span className="rounded-sm bg-black/5 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-black/60">
                          {s.timing}
                        </span>
                      </div>
                      <p className="mt-2 text-base font-bold text-black/80">
                        {s.summary}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {s.details.map((d, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-sm text-black/70"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4d00]"
                              strokeWidth={2.5}
                            />
                            <span dangerouslySetInnerHTML={{ __html: d }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Payment options.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            We support multiple payment methods depending on order size and
            customer relationship.
          </p>

          <div className="mt-10 overflow-x-auto rounded-sm border-2 border-black/10 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black/10">
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Method
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Best for
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Fee
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Timing
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentMethods.map((p, idx) => (
                  <tr
                    key={p.method}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#faf9f6]/50"}
                  >
                    <td className="px-4 py-4 font-black">{p.method}</td>
                    <td className="px-4 py-4 text-black/70">{p.best}</td>
                    <td className="px-4 py-4 text-black/70">{p.fee}</td>
                    <td className="px-4 py-4 text-black/70">{p.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SHIPPING */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Shipping options.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            DDP (Delivered Duty Paid) is the default. We handle customs,
            duties, and last-mile delivery so you receive a single invoice.
          </p>

          <div className="mt-10 overflow-x-auto rounded-sm border-2 border-black/10 bg-[#faf9f6]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black/10 bg-white">
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Method
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Time
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Cost
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {shippingOptions.map((s, idx) => (
                  <tr
                    key={s.method}
                    className={idx % 2 === 0 ? "" : "bg-white"}
                  >
                    <td className="px-4 py-4 font-black">{s.method}</td>
                    <td className="px-4 py-4 text-black/70">{s.time}</td>
                    <td className="px-4 py-4 text-black/70">{s.cost}</td>
                    <td className="px-4 py-4 text-black/70">{s.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Common sourcing questions.
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "What&apos;s the minimum order quantity (MOQ)?",
                a: "MOQ is 50 pieces per design. For per-piece customization (names, numbers), MOQ is 100 pieces. We do not accept single-piece orders.",
              },
              {
                q: "Do you accept custom designs or only stock designs?",
                a: "We accept any design. Send us your artwork (vector .ai/.eps/.svg preferred, or 300+ DPI PNG/PDF). We create a digital mockup for your approval before sample production.",
              },
              {
                q: "How do I know I can trust a Chinese factory?",
                a: "Ask for: (1) factory photos/video, (2) customer references, (3) sample before bulk, (4) third-party inspection access. We provide all four. We also have a US warehouse in California for transparency.",
              },
              {
                q: "What if I need a 100% cotton feel, not poly?",
                a: "We do offer cotton-feel sublimation (cotton-rich blends with sublimation coating). It&apos;s a 2-3 day longer process and slightly higher cost. Many event organizers use this for marathon shirts where comfort is the top priority.",
              },
              {
                q: "Can I split an order into multiple shipments?",
                a: "Yes. Many events have a pre-event shipment (volunteer/staff shirts) and a main-event shipment (participant shirts). We can ship in waves if production allows. Standard wave shipping is 1 wave + 1 main shipment.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span dangerouslySetInnerHTML={{ __html: f.q }} />
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/70"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
