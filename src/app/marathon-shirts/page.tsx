import type { Metadata } from "next";
import Link from "next/link";
import {
  Medal,
  Clock,
  Award,
  Layers,
  Zap,
  TrendingUp,
  DollarSign,
  Globe,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  PackageCheck,
  Users,
  Timer,
  Mountain,
  Trophy,
} from "lucide-react";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";

export const dynamic = "force-static";

const siteUrl = "https://sublimapparel.com";

export const metadata: Metadata = {
  title: "Custom Marathon Shirts | Sublimated for Distance Runners — SublimApparel",
  description:
    "Custom marathon shirts engineered for 26.2 miles. All-over sublimation, lightweight performance fabric, sponsor-grade color matching. Production for half & full marathons, ultras, and distance series. DDP to your expo.",
  keywords: [
    "custom marathon shirts",
    "marathon shirts bulk",
    "half marathon shirts",
    "marathon finisher shirts",
    "ultra marathon shirts",
    "distance running shirts",
  ],
  alternates: { canonical: `${siteUrl}/marathon-shirts/` },
  openGraph: {
    title: "Custom Marathon Shirts | Sublimated for Distance Runners",
    description:
      "Performance sublimation marathon shirts. Half, full, and ultra. DDP in 25 days.",
    url: `${siteUrl}/marathon-shirts/`,
    siteName: "SublimApparel",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Custom Marathon Shirts — SublimApparel" }],
  },
};

const pains = [
  { icon: Timer, title: "26.2 miles of unforgiving fabric", body: "Runners feel every seam, every hot spot, every non-breathable panel. Cheap shirts don't just feel bad — they finish badly." },
  { icon: Mountain, title: "Tiered fabric requirements", body: "Participant + finisher + elite need different weights and feels. Coordinating three fabric specs across one race is a logistics problem most printers can't solve." },
  { icon: Globe, title: "City-wide expo delivery", body: "Major marathons distribute at a 2-day expo, often across multiple hotels or a single convention center. Miss the drop window and your shirts don't make the race." },
];

const delivers = [
  { icon: TrendingUp, title: "25-day production", body: "From approved design to your expo hall. Locked delivery date, written commitment, no re-runs." },
  { icon: PackageCheck, title: "DDP to expo center", body: "Direct delivery to your packet pickup venue with duties and last-mile included." },
  { icon: Trophy, title: "Tiered fabric program", body: "Participant (140gsm poly), finisher (180gsm micro-pique), elite (sublimated mesh panels) — all in one run." },
  { icon: DollarSign, title: "Volume tier pricing", body: "Per-unit price drops at 1,000, 5,000, and 10,000 pieces. Designed for city-marathon economics." },
];

const scenarios = [
  { title: "Full marathons (26.2)", body: "City marathons, branded series, destination races. We've done 25,000+ piece orders with tiered fabric programs.", icon: Medal },
  { title: "Half marathons (13.1)", body: "Premium finisher tiers, sponsor-heavy designs, and the same tight expo-window delivery standards as full marathons.", icon: Trophy },
  { title: "Ultra & trail marathons", body: "Reflective trims, technical mesh panels, lightweight construction. Built for 50K, 100K, and beyond.", icon: Mountain },
  { title: "Marathon series & seasons", body: "Same brand, multiple races across a season. We archive the design system for fast re-orders year over year.", icon: Globe },
];

const process = [
  { day: "Day 1", title: "Race brief & sizing", body: "Tell us the race date, expected registration, tier breakdown. We propose a slot and a fabric spec." },
  { day: "Day 3", title: "Fabric sample", body: "Physical swatches of all 3 tiers shipped via DHL. Critical for hand-feel decisions." },
  { day: "Day 7", title: "Design & proof", body: "Front graphic, back sponsor wall, sleeve accents. Color-matched to sponsor brand guides." },
  { day: "Day 12", title: "Pre-production sample", body: "One full shirt from each tier, shipped for sign-off. 3-day turnaround via DHL." },
  { day: "Day 15", title: "Bulk production", body: "12 lines running in parallel across all 3 tiers. Continuous QC, AQL 2.5 inspection." },
  { day: "Day 25", title: "DDP to expo", body: "Direct to expo center, race HQ, or hotel block. Coordinate with packet-pickup schedule." },
];

const faqs = [
  {
    q: "What's the minimum order for marathon shirts?",
    a: "MOQ is 50 pieces per tier. Most marathons run participant + finisher tiers, with participant typically the larger volume. We can produce each tier in one continuous production run to keep your per-unit cost down.",
  },
  {
    q: "How do you handle the participant + finisher tier split?",
    a: "We recommend 140gsm poly interlock for participant tier (breathable, lightweight, competitive pricing) and 180gsm micro-pique for finisher tier (heavier hand-feel, premium perceived value). Both can be sublimated with all-over graphics. We can also offer a third 'elite' tier with mesh panels or technical fabric upgrades.",
  },
  {
    q: "What about 25,000+ piece marathon orders?",
    a: "For city-marathon scale, we recommend locking your production slot 90–120 days out to guarantee capacity. We've produced marathon orders up to 30,000 pieces across 3 tiers in a single continuous run. Volume pricing kicks in at 1,000, 5,000, and 10,000 pieces per tier.",
  },
  {
    q: "Can you print marathon graphics across the entire shirt?",
    a: "Yes. All-over sublimation means graphics wrap from front to back to sleeves with no seams interrupting the design. This is ideal for sponsor walls, scenic route graphics, and city-marathon branding where the entire shirt surface is part of the design language.",
  },
  {
    q: "How do you deliver to the expo center?",
    a: "DDP shipping to 100+ countries means we deliver to your expo venue, convention center, or hotel block with duties and customs fully included. For major marathons, we coordinate with your packet-pickup logistics team to land shirts inside the expo hall 24–48 hours before doors open.",
  },
  {
    q: "Can you handle multi-race series across a season?",
    a: "Yes. Many marathon series (spring/summer/fall) re-order the same design system with race-specific dates and locations. We archive your master file and brand spec for 24 months, so re-orders for series races typically take 3 days to confirm and 20 days to produce, with no re-setup fee.",
  },
];

export default function MarathonShirtsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Event Apparel", path: "/event-apparel/" },
    { name: "Marathon Shirts", path: "/marathon-shirts/" },
  ]);
  const faqJsonLd = forEventsFaqJsonLd(faqs);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,0,0.18),transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_30%)]" aria-hidden />
        <div className="relative mx-auto max-w-screen-xl px-6 py-20 md:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80">
            <Medal className="h-3.5 w-3.5 text-[#ff4d00]" /> Marathon Apparel
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Custom marathon shirts, <span className="text-[#ff4d00]">engineered for 26.2 miles.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            All-over sublimation marathon shirts built for half-marathons, full marathons, and ultras. Tiered
            fabric programs for participant, finisher, and elite. MOQ 50. DDP to your expo in 25 days.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff4d00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff4d00]/25 transition hover:bg-[#ff5d1a] hover:scale-[1.02]"
            >
              Get a quote for your marathon <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/event-timeline/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Plan your expo delivery <Clock className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              { v: "25 days", l: "Avg. production" },
              { v: "30,000+", l: "Largest marathon run" },
              { v: "3 tiers", l: "Participant/Finisher/Elite" },
              { v: "100+", l: "Countries DDP" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-white md:text-3xl">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why marathon directors switch to us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">The performance bar is higher at 26.2</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pains.map((p) => (
              <div key={p.title} className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">What you get</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for distance, designed for tiered programs</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {delivers.map((d) => (
              <div key={d.title} className="rounded-2xl border border-neutral-200 p-6">
                <d.icon className="mb-3 h-6 w-6 text-[#ff4d00]" />
                <h3 className="text-base font-bold">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Which marathons we serve</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">From half-marathons to ultras to city-wide series</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {scenarios.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <s.icon className="mb-3 h-6 w-6 text-[#00c2ff]" />
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">How we work</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A 25-day plan, expo-window locked</h2>
          </div>
          <ol className="space-y-4">
            {process.map((p, i) => (
              <li key={p.day} className="grid grid-cols-[80px_1fr] gap-4 rounded-2xl border border-neutral-200 bg-white p-5 md:grid-cols-[120px_1fr] md:p-6">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#ff4d00]">Step {i + 1}</span>
                  <span className="text-lg font-bold text-neutral-900">{p.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TOOL LINKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Free tools for marathon directors</h2>
            <p className="mt-3 text-neutral-600">Stop guessing deadlines, sizes, and quality. Use the same tools our repeat marathon customers do.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/event-timeline/", title: "Event Timeline Calculator", body: "Enter your race date. Get a day-by-day production plan back." },
              { href: "/us-size-guide/", title: "US Size Guide + Excel Template", body: "Standard US sizing for runners. Download the collection sheet." },
              { href: "/quality-control/", title: "4-Step Quality Control", body: "How we check every marathon shirt before it ships. AQL 2.5 standard." },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-md"
              >
                <h3 className="text-lg font-bold group-hover:text-[#ff4d00]">{t.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{t.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#ff4d00]">
                  Open tool <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions marathon directors ask us</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="flex items-start gap-2 text-base font-bold">
                  <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff4d00]" />
                  {f.q}
                </h3>
                <p className="mt-3 pl-7 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <Contact />
    </main>
  );
}
