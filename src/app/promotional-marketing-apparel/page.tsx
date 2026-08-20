import type { Metadata } from "next";
import Link from "next/link";
import {
  Shirt,
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
} from "lucide-react";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";

export const dynamic = "force-static";

const siteUrl = "https://sublimapparel.com";

export const metadata: Metadata = {
  title: "Custom Promotional Apparel Manufacturer | Marketing Merchandise Supplier — SublimApparel",
  description:
    "Custom promotional apparel manufacturer for trade shows, marketing campaigns, giveaways and brand activations. Promotional t-shirts, branded merchandise and marketing apparel with flexible MOQ, fast production and DDP worldwide shipping.",
  keywords: [
    "promotional apparel",
    "promotional t shirts",
    "branded merchandise supplier",
    "marketing apparel",
    "trade show shirts",
    "giveaway shirts",
    "promotional clothing",
    "event giveaways",
    "custom event t-shirts",
    "bulk promotional apparel",
  ],
  alternates: { canonical: `${siteUrl}/promotional-marketing-apparel/` },
  openGraph: {
    title: "Custom Promotional Apparel Manufacturer | Marketing Merchandise Supplier",
    description:
      "Promotional t-shirts, branded merchandise and marketing apparel for trade shows, giveaways and brand activations. Flexible MOQ. DDP worldwide.",
    url: `${siteUrl}/promotional-marketing-apparel/`,
    siteName: "SublimApparel",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Custom Promotional Apparel — SublimApparel" }],
  },
};

const pains = [
  { icon: Clock, title: "Deadline pressure", body: "Event shirts must arrive 7–14 days before the event. Miss it, and your brand is the one attendees remember — for the wrong reason." },
  { icon: Layers, title: "All-over print demands", body: "Sponsorship walls, full back graphics, mismatched panel layouts — your printer bails at 50+ unique names per event. We don't." },
  { icon: Users, title: "Reorders for next year", body: "Reordering 500 shirts 11 months later, with new sponsor names, used to mean starting from zero. We keep your master file and re-run in days." },
];

const delivers = [
  { icon: TrendingUp, title: "25-day production", body: "From approved design to delivered carton. We commit to a date and reverse-engineer the schedule." },
  { icon: PackageCheck, title: "Direct-to-venue delivery", body: "DDP to 100+ countries. We handle duties, customs, and the last mile so your shirts land at the venue, not the port." },
  { icon: DollarSign, title: "MOQ 50, no setup fee", body: "Small runs for niche events. No screen charges. No surprise re-proof fees." },
  { icon: Award, title: "Color-match guarantee", body: "Sponsor logos reproduced in CMYK with a 2-week pre-event sample window. Your brand stays exact." },
];

const scenarios = [
  { title: "Trade shows & expos", body: "Booth team shirts + attendee giveaways. Pre-event delivery to your hotel or convention center. Sponsor panels.", icon: Zap },
  { title: "Marketing campaigns", body: "Product launches, brand activations, influencer kits. All-over print, no setup fee, fast turnaround.", icon: MessageSquare },
  { title: "Distributor & reseller", body: "Multi-region rollout, white-label packaging, retail-ready kits for promotional product distributors.", icon: Globe },
  { title: "Pop-up & sampling events", body: "Store openings, product sampling, brand activations. Bulk pricing for high-volume giveaways.", icon: Award },
];

const process = [
  { day: "Day 1", title: "Inquiry & sizing", body: "Tell us your event date, quantity, and design status. We lock the production slot." },
  { day: "Day 3", title: "Design & proof", body: "Free artwork adjustment, mockups on the actual garment, color match to sponsor logos." },
  { day: "Day 5", title: "Sample (optional)", body: "Physical sample shipped via DHL for visual sign-off. 3-day turnaround." },
  { day: "Day 7", title: "Production", body: "All-over sublimation print, cut & sew, in-line QC. 12 lines running in parallel." },
  { day: "Day 25", title: "DDP delivery", body: "Direct to venue, hotel, or your US warehouse in Fontana. Duties included." },
];

const faqs = [
  {
    q: "What's the minimum order for custom event t-shirts?",
    a: "MOQ is 50 pieces per design. For tiered events (e.g., attendee + volunteer + staff), each tier can start at 50 pieces, and we run them in one production batch to keep costs down.",
  },
  {
    q: "Can you print sponsor logos with exact color matching?",
    a: "Yes. We work in CMYK with optional Pantone spot colors for critical sponsor marks. We provide a pre-production sample for sign-off 14 days before bulk production so you can verify the match against your brand guidelines.",
  },
  {
    q: "How do you handle events with 50+ unique names or numbers?",
    a: "Names and numbers are sublimated into the fabric, not printed on top, so individual personalization doesn't add setup cost. We accept a CSV/Excel file and run variable data at the print stage. There's no per-name surcharge.",
  },
  {
    q: "What if my event date is less than 30 days away?",
    a: "Tell us immediately. We have a rush lane that can compress production to 12–15 days for an expedited fee (typically 15–20% premium). For events under 21 days out, we recommend printing locally or sourcing blank garments for now.",
  },
  {
    q: "Do you ship directly to the event venue?",
    a: "Yes. DDP shipping to 100+ countries means we deliver to your venue, hotel, or convention center with duties and customs fully included. You don't need to clear anything or arrange last-mile transport.",
  },
  {
    q: "Can you match last year's design for returning events?",
    a: "Yes. We archive your master file (artwork, sizing ratios, sponsor list) for 24 months. Reorders for returning events typically take 5 days to confirm and 20 days to produce, with no re-setup fee.",
  },
];

export default function CustomEventTShirtsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/" },
    { name: "Promotional & Marketing Apparel", path: "/promotional-marketing-apparel/" },
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
            <MessageSquare className="h-3.5 w-3.5 text-[#ff4d00]" /> Promotional & Marketing Apparel
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Custom promotional apparel <span className="text-[#ff4d00]">that helps brands get noticed.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            Bulk apparel solutions for campaigns, exhibitions, promotions and marketing activities. Trade shows,
            marketing campaigns, promotional events, distributor support — one factory, one DDP shipment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff4d00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff4d00]/25 transition hover:bg-[#ff5d1a] hover:scale-[1.02]"
            >
              Get a quote for your event <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/event-timeline/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Plan your timeline <Clock className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              { v: "25 days", l: "Avg. production" },
              { v: "MOQ 50", l: "No setup fee" },
              { v: "100+", l: "Countries DDP" },
              { v: "12 lines", l: "Parallel capacity" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-white md:text-3xl">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL APPAREL CATEGORIES WE PRODUCE */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Promotional Apparel Categories</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Custom promotional apparel for every campaign</h2>
            <p className="mt-3 text-neutral-600">
              Sublimated and stitched apparel for trade shows, marketing campaigns, giveaways and brand activations.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Trade Shows", body: "Booth staff uniforms, attendee giveaways, branded tote shirts. Designed to be worn — and remembered." },
              { name: "Marketing Campaigns", body: "Limited-run brand activations, product launches, and influencer kits. All-over print, no setup fee." },
              { name: "Promotional Events", body: "Pop-ups, store openings, sampling events, brand activations. Bulk pricing for high-volume giveaways." },
              { name: "Distributor Support", body: "Reseller programs, multi-region rollout, retail-ready packaging. White-label friendly." },
            ].map((s) => (
              <div key={s.name} className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-sm">
                <h3 className="text-base font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRANDS CHOOSE US */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why brands choose us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for marketing and promotional reality</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "Small campaigns accepted", b: "MOQ 50 pieces — perfect for a single trade show, a regional giveaway, or a soft launch." },
              { t: "Accurate sizing", b: "US-spec size runs from Youth XS to Adult 5XL. Sample sizing sets on request for first-time orders." },
              { t: "Full customization", b: "All-over print, embroidery, custom labels, retail packaging. Designed to be worn, not just distributed." },
              { t: "Fast production", b: "25-day standard lead time. 15-day expedited lane for last-minute trade shows and events." },
              { t: "DDP delivery", b: "Delivered duty-paid to your trade show venue, warehouse, office, or event hotel in 100+ countries." },
            ].map((w) => (
              <div key={w.t} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <CheckCircle2 className="mb-3 h-5 w-5 text-[#ff4d00]" />
                <h3 className="text-base font-bold">{w.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why brands and marketers switch to us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your last promo-apparel problem (and why it won't happen here)</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything a promotional apparel program needs</h2>
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Where these shirts show up</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">From a single trade show to nationwide rollout</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A 25-day plan, reverse-engineered from your event date</h2>
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Free tools for event organizers</h2>
            <p className="mt-3 text-neutral-600">Stop guessing deadlines, sizes, and quality. Use the same tools our repeat customers do.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/event-timeline/", title: "Event Timeline Calculator", body: "Enter your event date. Get a day-by-day production plan." },
              { href: "/us-size-guide/", title: "US Size Guide + Excel Template", body: "Standard US sizing for men's, women's, and youth. Download the collection sheet." },
              { href: "/quality-control/", title: "4-Step Quality Control", body: "How we check every shirt before it ships. AQL 2.5 standard." },
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

      {/* CASE STUDIES */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Case studies</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Promotional & marketing apparel we&apos;ve shipped</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/event-festivals-conferences/", title: "Events & Conferences", body: "Booth staff uniforms, attendee giveaways, speaker shirts. Tight deadlines, multi-SKU." },
              { href: "/corporate-organization-apparel/", title: "Corporate & Employee Programs", body: "Branded apparel for trade show booth, employee programs, client gifts and corporate events." },
              { href: "/apparel-brands-agencies/", title: "Apparel Brands & Agencies", body: "Private label production for growing brands and creative agencies needing promo runs." },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[#ff4d00]">{c.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{c.body}</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#ff4d00] transition group-hover:translate-x-1" />
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions event organizers ask us</h2>
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
