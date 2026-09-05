import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import {
  ClipboardList,
  PenLine,
  Box,
  Scissors,
  Printer,
  Shirt,
  ShieldCheck,
  Package,
  Plane,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquareQuote,
} from "lucide-react";

export const metadata = buildPageMetadata({
    title: "Production Process · 7 Steps from Inquiry to Delivery",
    description: "Our 7-step production process: inquiry, quote, mockup, sample, bulk production, QC, shipping. 21-day average lead time from PO to delivery. Sublimation apparel…",
    keywords: ["production process", "sublimation production", "apparel manufacturing process", "lead time", "oem process", "factory workflow", "production timeline", "21 day production"],
  });;

const stats = [
  { value: "7", unit: "STEPS", label: "End-to-end process" },
  { value: "21", unit: "DAYS", label: "Average PO to delivery" },
  { value: "50+", unit: "CHECKS", label: "Quality gates" },
  { value: "99.6%", unit: "ON-TIME", label: "On-time delivery rate" },
];

const steps = [
  {
    day: "Day 0",
    icon: <MessageSquareQuote className="h-6 w-6" />,
    title: "Inquiry & brief",
    body: "You send the design (PNG / AI / PDF), quantity, target delivery date, and any spec. We confirm receipt within 4 business hours and assign a project manager.",
  },
  {
    day: "Day 1–2",
    icon: <FileText className="h-6 w-6" />,
    title: "Quote & tech-pack",
    body: "We come back with: per-piece price (EXW / FOB / DDP), production timeline, fabric options, print method, mockup positioning, and a tech-pack PDF for sign-off.",
  },
  {
    day: "Day 2–3",
    icon: <PenLine className="h-6 w-6" />,
    title: "Mockup & color approval",
    body: "We generate a digital mockup at scale showing seam placement, print size, color profile. You approve colors via Pantone / fabric swatch. ICC profile per fabric matched.",
  },
  {
    day: "Day 3–7",
    icon: <Box className="h-6 w-6" />,
    title: "Pre-production sample",
    body: "Optional but recommended. We produce 1-3 sample pieces in the actual fabric, print, and construction. You receive photos, then a physical sample via DHL ($35-65 freight).",
  },
  {
    day: "Day 7–8",
    icon: <ClipboardList className="h-6 w-6" />,
    title: "PO + deposit",
    body: "You send the PO, we send the invoice (30/70 split typical). Deposit clears in 1-2 business days via T/T or Wise. Production starts the day after deposit clears.",
  },
  {
    day: "Day 8–18",
    icon: <Printer className="h-6 w-6" />,
    title: "Bulk production",
    body: "Cutting → printing → sewing → heat-pressing → QC inline → finishing. 10-12 days for orders under 5,000 pieces. Three-shift capacity means no bottleneck during peak season.",
  },
  {
    day: "Day 18–21",
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Final QC + ship",
    body: "AQL 2.5 final inspection, photo report, packed to spec. Loaded for sea, air, or express per your Incoterm. DDP routes include customs + last-mile.",
  },
];

const timeline = [
  { stage: "Inquiry", days: "Same day" },
  { stage: "Quote + mockup", days: "1–2 days" },
  { stage: "Sample (optional)", days: "3–5 days" },
  { stage: "PO + deposit", days: "1–2 days" },
  { stage: "Bulk production", days: "10–12 days" },
  { stage: "Final QC + packing", days: "2–3 days" },
  { stage: "Ship + transit", days: "3–35 days" },
  { stage: "Total (sample)", days: "20–28 days" },
  { stage: "Total (no sample)", days: "15–22 days" },
];

const useCases = [
  { title: "Race event 1,000 pieces, 3-week deadline", body: "Day 0 inquiry, Day 2 quote, Day 5 sample approval via photo, Day 7 deposit, Day 18 ship, Day 21 arrive at event. Realistic for 1K-piece orders." },
  { title: "POD platform weekly 500-piece run", body: "Standing capacity, no per-order re-tooling. You send a CSV, we ship 7-10 days later under your platform's tracking." },
  { title: "School bulk 2,000 pieces, semester start", body: "Plan 6 weeks ahead. Sample at 4 weeks, bulk at 2 weeks, ship 1 week before semester. Always have buffer for reorders." },
  { title: "Brand launch 5,000 pieces, 2 SKUs", body: "Split across 4 production lines, parallel print, 14-day bulk. 2 SKUs at 2,500 pieces each is our sweet spot for 14-day turnaround." },
  { title: "Campaign merch 3,000 pieces, last-minute", body: "Surge capacity with 24/7 shifts. 8-day rush available for 3K-piece orders with surcharge. We've done 5K in 8 days for political campaigns." },
  { title: "Reorder 200 pieces, US warehouse", body: "If you've pre-stocked in our Fontana CA warehouse, reorder ships in 2-5 days. We pull from CA stock, no new production needed." },
];

const faqs = [
  { q: "What's the realistic rush turnaround?", a: "200 pieces: 5-7 days. 500 pieces: 7-9 days. 1,000 pieces: 9-12 days. 2,000+ pieces: 12-18 days. Rush incurs a 15-25% surcharge but is available on most orders." },
  { q: "Can I skip the pre-production sample?", a: "Yes, but you assume the risk. If colors shift or construction is off, bulk is wasted. For first-time orders or new fabric combinations, we strongly recommend a $35-65 sample before committing bulk." },
  { q: "What if my design has a lot of detail or color?", a: "Sublimation handles unlimited color at no extra cost. Fine detail (1mm line weight) and gradients are fine. We render the design at 300 DPI minimum, separated per fabric." },
  { q: "Can you split a single order across multiple shipping methods?", a: "Yes. Common: ship 20% rush via air (5-7 days), bulk 80% via sea (25-30 days). We split the packing list, bill cleanly, and you get two tracking numbers." },
];

export default function ProductionPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ 011 / About · production ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">Inquiry to ship.</span>
            <span className="block text-[#cc3d00]">21 days.</span>
            <span className="block">No black box.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            Seven steps. Each step has a deliverable, a deadline, and a person on our side
            who's accountable. You'll know exactly where your order is, every day, from
            quote to delivery.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <RequestQuoteLink label="production / page / Get a quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400] hover:border-[#e64400]">Start a project →</RequestQuoteLink>
            <Link href="/about/quality/" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">
              See our QC process →
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · STATS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-[#0a0a0a] border-x-2 border-[#0a0a0a] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center md:py-10">
              <div className="text-3xl font-extrabold leading-none text-[#0a0a0a] md:text-5xl">
                {s.value}
                <span className="ml-1 text-base font-bold text-[#cc3d00] md:text-lg">{s.unit}</span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ Why a defined process ]</div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            Most factories won't tell you the process.{" "}
            <span className="text-[#cc3d00]">We wrote it down.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              The hardest part of working with a Chinese factory isn't the price or the
              quality. It's the <em>uncertainty</em>. You send a deposit, then you wait.
              You don't know if they're cutting yet, or sewing, or stuck on fabric, or
              held up in QC, or sitting on the factory floor because the shipping forwarder
              missed the booking.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">We publish the process so you can plan around it.</strong>{" "}
              Seven steps, each with a day-count and a deliverable. You'll get an update at
              each gate — typically a photo or a milestone notification. If we slip, you'll
              know on day 8, not day 21.
            </p>
            <p>
              The 21-day average assumes a 500-1,000 piece order with a pre-approved sample.
              Rush is faster (8-12 days). Larger bulk (5,000+ pieces) adds 5-7 days for
              line balancing and split production.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · STEPS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0078a8]">[ 011.A / The 7 steps ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Step by step, day by day.</h2>
          </div>
          <ol className="space-y-px">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-[#1a1a1a] p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="flex shrink-0 items-center gap-3 md:w-48">
                    <div className="flex h-12 w-12 items-center justify-center border-2 border-[#ff4d00] text-[#cc3d00]">
                      {s.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
                        Step {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm font-bold text-white">{s.day}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold leading-snug md:text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0] md:text-base">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · TIMELINE TABLE */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 011.B / Timeline benchmarks ]</div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">The numbers, side by side.</h2>
          <div className="border-2 border-[#0a0a0a]">
            <table className="w-full text-left">
              <tbody className="divide-y-2 divide-[#0a0a0a]">
                {timeline.map((row) => (
                  <tr key={row.stage}>
                    <td className="w-1/2 bg-[#faf9f6] px-4 py-3 text-sm font-bold md:px-6 md:py-4 md:text-base">{row.stage}</td>
                    <td className="w-1/2 bg-white px-4 py-3 text-sm font-bold text-[#cc3d00] md:px-6 md:py-4 md:text-base">{row.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 · USE CASES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 011.C / Real timelines ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Six real order profiles.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.title} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-3 text-xs font-mono font-bold text-[#cc3d00]">0{i + 1}</div>
                <h3 className="text-lg font-bold leading-snug">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · FAQ */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 011.D / FAQ ]</div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">The timing questions.</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#cc3d00]">Q · {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold leading-snug md:text-xl">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a] md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 011.E / Start a project ]</div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Send your design. Get a 21-day plan back.</h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            We come back within 1 business day with a quote, a sample plan, and a production
            timeline that you can pin to your wall.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <RequestQuoteLink label="production / page / Get a quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400] hover:border-[#e64400]">Start a project →</RequestQuoteLink>
            <Link href="/about/quality/" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">
              See QC process →
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">Related</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/about/factory", title: "Factory", desc: "2,000 sqm, 12 lines, 24/7" },
              { href: "/about/quality", title: "Quality control", desc: "4-stage QC, 50+ checkpoints" },
              { href: "/fabric/cotton", title: "Allover digital print on cotton", desc: "Cut-and-sew, true full-body" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#cc3d00]">→</div>
                <div className="mt-2 text-lg font-bold">{r.title}</div>
                <div className="mt-1 text-sm text-[#6b6b6b] group-hover:text-[#a0a0a0]">{r.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
