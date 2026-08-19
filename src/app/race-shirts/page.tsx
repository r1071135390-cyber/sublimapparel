import type { Metadata } from "next";
import Link from "next/link";
import {
  Flag,
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
  Trophy,
} from "lucide-react";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";

export const dynamic = "force-static";

const siteUrl = "https://sublimapparel.com";

export const metadata: Metadata = {
  title: "Custom Race Shirts for 5K, 10K & Charity Runs | DDP in 25 Days — SublimApparel",
  description:
    "Custom race shirts with all-over sublimation. Bib numbers, finisher graphics, sponsor panels. MOQ 50, 25-day production, DDP to your race venue. Trusted by 5K, 10K, half-marathon, and charity run organizers.",
  keywords: [
    "custom race shirts",
    "race shirts bulk",
    "5k race shirts",
    "10k race shirts",
    "charity run shirts",
    "fun run t shirts",
  ],
  alternates: { canonical: `${siteUrl}/race-shirts/` },
  openGraph: {
    title: "Custom Race Shirts for 5K, 10K & Charity Runs",
    description:
      "All-over sublimation race shirts. Bib-ready sizing, sponsor panels, finisher graphics. DDP in 25 days.",
    url: `${siteUrl}/race-shirts/`,
    siteName: "SublimApparel",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Custom Race Shirts — SublimApparel" }],
  },
};

const pains = [
  { icon: Timer, title: "Race-day deadlines don't slip", body: "You can't move the start line. We plan backwards from gun-time and lock the production window 60 days out." },
  { icon: Layers, title: "Sponsor + finisher graphics stack", body: "Front logo, back sponsor wall, sleeve bib cut, finisher medal graphic — multiple panels per shirt, all printed in one run." },
  { icon: Users, title: "Last-minute registration spikes", body: "2,000 registered two weeks out becomes 3,200 the week of. We hold a buffer in production for reorders up to 10 days before race day." },
];

const delivers = [
  { icon: TrendingUp, title: "25-day production", body: "From approved design to your race venue. We guarantee a date and back it with a written delivery commitment." },
  { icon: PackageCheck, title: "Direct to packet pickup", body: "DDP shipping to your race HQ, hotel, or expo venue. Unbox and start stuffing bags." },
  { icon: Trophy, title: "Finisher + participant tiers", body: "Different fabrics, different graphics, same production run. Tiered pricing for premium finisher shirts." },
  { icon: DollarSign, title: "Volume pricing", body: "From 50 pieces (test event) to 50,000 pieces (city marathon). Tiered pricing kicks in at 500, 2,000, and 10,000." },
];

const scenarios = [
  { title: "5K & 10K races", body: "Community runs, fun runs, charity 5Ks. Quick-turnaround, friendly pricing for grassroots organizers.", icon: Flag },
  { title: "Half marathons", body: "Premium finisher shirts, sponsor-heavy designs, larger sizing curves. We've done 30+ half-marathon print runs.", icon: Trophy },
  { title: "Charity & cause runs", body: "Awareness ribbons, cause graphics, sponsor walls. Production cost won't eat your donation budget.", icon: Globe },
  { title: "Trail & themed races", body: "Color runs, mud runs, obstacle races, glow runs. We match any color palette and add reflective trims on request.", icon: Zap },
];

const process = [
  { day: "Day 1", title: "Race inquiry & sizing", body: "Tell us your race date, expected registration, tier breakdown. We propose a production slot." },
  { day: "Day 3", title: "Artwork & sponsor lock", body: "Free artwork prep. We accept sponsor logos in any format and align all panels to your brand guide." },
  { day: "Day 5", title: "Pre-production sample", body: "Optional physical sample shipped in 3 days. Critical for color-sensitive sponsor marks." },
  { day: "Day 7", title: "Bulk production", body: "12 lines running in parallel. Tier 1 + Tier 2 + finisher in one continuous print run." },
  { day: "Day 20", title: "Buffer stock", body: "We hold 10% buffer for late registrations, exchange sizes, and replacement orders." },
  { day: "Day 25", title: "DDP delivery", body: "Direct to packet pickup location, expo center, or your race HQ. Duties and customs included." },
];

const faqs = [
  {
    q: "What's the minimum order for custom race shirts?",
    a: "MOQ is 50 pieces per design. For tiered race programs (e.g., participant + finisher + volunteer), each tier can start at 50 pieces, and we run them in one production batch to keep your per-unit cost down.",
  },
  {
    q: "Can you handle half-marathon-sized orders?",
    a: "Yes. We've produced race shirt orders from 100 pieces (small charity 5K) to 30,000 pieces (city half-marathon series). For orders above 5,000 pieces, we recommend locking your slot 75–90 days out to guarantee your delivery date.",
  },
  {
    q: "How do you handle race-day size exchanges?",
    a: "We produce 10% buffer stock on every race order, finished and ready to ship. If a runner needs a different size at packet pickup, you can pull from buffer instead of waiting for a re-order. Buffer ships in 5–7 days if you need it expedited.",
  },
  {
    q: "Can you print bib numbers and finisher graphics?",
    a: "Yes. Bib numbers, names, finish times, and finisher graphics are sublimated into the fabric — not printed on top — so there's no per-name setup cost. We accept your runner CSV/Excel file and run variable data at the print stage.",
  },
  {
    q: "What's the difference between participant and finisher tier fabric?",
    a: "Standard participant shirts use 140–160gsm polyester interlock for breathable performance. Finisher premium tier can be upgraded to 180gsm micro-pique or a poly-cotton blend for a heavier hand-feel and higher perceived value. We help you choose based on your race positioning.",
  },
  {
    q: "Do you ship directly to the race venue?",
    a: "Yes. DDP shipping to 100+ countries means we deliver to your expo center, race HQ, or hotel with duties and customs fully included. You don't need to clear anything or arrange local transport. Timing is coordinated with your packet pickup schedule.",
  },
];

export default function RaceShirtsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Event Apparel", path: "/event-apparel/" },
    { name: "Race Shirts", path: "/race-shirts/" },
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
            <Flag className="h-3.5 w-3.5 text-[#ff4d00]" /> Race Apparel
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Custom race shirts, <span className="text-[#ff4d00]">finished before your packet pickup opens.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            All-over sublimation race shirts for 5K, 10K, half-marathons, and charity runs. Bib numbers, finisher
            graphics, sponsor panels — printed in one continuous production run. MOQ 50. DDP to your expo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff4d00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff4d00]/25 transition hover:bg-[#ff5d1a] hover:scale-[1.02]"
            >
              Get a quote for your race <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/event-timeline/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Plan backwards from race day <Clock className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              { v: "25 days", l: "Avg. production" },
              { v: "30,000", l: "Largest race run" },
              { v: "10% buffer", l: "Held for late adds" },
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why race directors switch to us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your last race-shirt problem (and why it won't happen here)</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything a race-shirt program needs</h2>
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Which races we serve</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">From community 5K to city half-marathon</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A 25-day race-shirt plan, gun-time locked</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Free tools for race directors</h2>
            <p className="mt-3 text-neutral-600">Stop guessing deadlines, sizes, and quality. Use the same tools our repeat race organizers do.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/event-timeline/", title: "Event Timeline Calculator", body: "Enter your race date. Get a day-by-day production plan back." },
              { href: "/us-size-guide/", title: "US Size Guide + Excel Template", body: "Standard US sizing for runners. Download the collection sheet." },
              { href: "/quality-control/", title: "4-Step Quality Control", body: "How we check every race shirt before it ships. AQL 2.5 standard." },
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions race directors ask us</h2>
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
