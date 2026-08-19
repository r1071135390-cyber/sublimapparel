import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  Heart,
  Layers,
  MapPin,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsServiceJsonLd, forEventsFaqJsonLd } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title:
    "Custom Race Shirts & Event Apparel | Marathon, 5K, Charity Run | MOQ 50 | DDP USA",
  description:
    "Custom event apparel for race organizers, charity runs, marathons, and festivals. Participant shirts, volunteer uniforms, and sponsor apparel with flexible 90-day production planning. MOQ 50 pcs, DDP to 100+ countries, US warehouse in Fontana CA. Since 2018.",
  keywords: [
    "custom race shirts",
    "race event apparel",
    "marathon shirts manufacturer",
    "5K race shirts",
    "charity run apparel",
    "custom event t-shirts",
    "volunteer uniforms",
    "sponsor apparel",
    "race shirt supplier",
    "event apparel manufacturer",
    "bulk event shirts",
    "China race shirt factory",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/event-apparel/",
  },
  openGraph: {
    title:
      "Custom Race Shirts & Event Apparel Manufacturer | SublimApparel",
    description:
      "Marathon, 5K, charity run, festival apparel. Participant, volunteer, sponsor. 90-day production planning. MOQ 50. DDP to 100+ countries.",
    url: "https://sublimapparel.com/event-apparel/",
    images: ["/esports-jersey-prodigy.webp"],
  },
};

const eventTypes = [
  {
    icon: Trophy,
    title: "Marathon & Half-Marathon",
    desc: "Participant shirts, finisher medals apparel, sponsor visibility. From 5K to full 26.2-mile events.",
  },
  {
    icon: Flag,
    title: "5K, 10K & Fun Runs",
    desc: "Small to mid-size races. Quick-turn quotes, group orders, family-friendly sizing.",
  },
  {
    icon: Heart,
    title: "Charity Walks & Fundraisers",
    desc: "Branded apparel for participants and teams. Bulk order support, sponsor logo integration.",
  },
  {
    icon: Users,
    title: "Cycling & Outdoor Events",
    desc: "Jerseys, moisture-wicking shirts, and casual wear for cycling tours and outdoor gatherings.",
  },
  {
    icon: Sparkles,
    title: "Festivals & Community Events",
    desc: "Staff uniforms, volunteer shirts, sponsor apparel. From 100 to 10,000+ pieces.",
  },
  {
    icon: MapPin,
    title: "Conferences & Trade Shows",
    desc: "Branded apparel for exhibitors, staff, and attendees. Logo and design placement across multiple SKUs.",
  },
];

const whatWeMake = [
  {
    label: "Participant Shirts",
    examples: "Race shirts, finisher tees, bib-graphic designs",
    icon: Shirt,
  },
  {
    label: "Volunteer Uniforms",
    examples: "Easy-to-spot colorways, often 1-2 color prints",
    icon: Users,
  },
  {
    label: "Staff Apparel",
    examples: "Polo shirts, performance tees, branded outerwear",
    icon: Shield,
  },
  {
    label: "Sponsor Visibility",
    examples: "Multi-logo placement, color-matched brand standards",
    icon: Layers,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Will the shirts arrive before race day?",
    pain: "Most US events lock final headcount 30 days out. US printers need 6-8 weeks. The math doesn't work.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Quote today, design tomorrow, lock in 60 days, ship in 30.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Ruler,
    title: "Sizing is a guessing game.",
    pain: "US sizing runs different from Chinese specs. A Medium from one supplier is a Small from another.",
    fix: "US-spec measurement charts, free sample swatches, and a downloadable Excel size collection template for your registration system.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Shield,
    title: "What if the bulk doesn't match the sample?",
    pain: "You've heard the stories: the sample is perfect, then 3,000 shirts arrive and the colors are off.",
    fix: "4-stage inspection with AQL 2.5 standard. Pre-production sample approval locked before bulk cut. Photo evidence at each stage.",
    link: { label: "Our QC Process", href: "/quality-control" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "You're not sure if you have time. You don't want to overcommit before your event is finalized.",
    fix: "Event Timeline Calculator. Enter your event date, get the latest order date, the design lock date, and the final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const timeline = [
  {
    days: "T-90 days",
    title: "Reserve your slot",
    desc: "Submit your inquiry. Lock in your event date, design direction, and estimated quantity (e.g. 500-1,000 pcs). We hold production capacity and you don't owe us a final number yet.",
  },
  {
    days: "T-60 days",
    title: "Design + sample",
    desc: "Free digital mockup. Pay for one physical sample (refunded on bulk order). Approve colors, placement, sizing. Production sample is the contract.",
  },
  {
    days: "T-30 days",
    title: "Lock final quantity",
    desc: "Your registration numbers are set. We adjust production to your real count: 480-520 pcs around your 500 estimate. No panic, no penalty.",
  },
  {
    days: "T-15 days",
    title: "Production + QC",
    desc: "Bulk cut, print, sew, inspect. Photo updates at each of 4 QC stages. We flag any issue before it reaches the box.",
  },
  {
    days: "T-0",
    title: "At your door",
    desc: "DDP shipping to 100+ countries. US warehouse in Fontana, CA offers 2-5 day domestic delivery for race-week emergencies.",
  },
];

const trustSignals = [
  { number: "2018", label: "Year founded in Yiwu" },
  { number: "12", label: "Production lines" },
  { number: "100+", label: "Countries DDP shipped" },
  { number: "50", label: "Piece MOQ (sublimation cut & sew)" },
];

const faqs = [
  {
    q: "How far in advance do I need to order race shirts?",
    a: "Our 90-day program lets you start as early as 90 days out. We can also handle 30-day emergency orders via air freight, though 60+ days gives the best pricing. Use the Event Timeline Calculator to see your specific dates.",
  },
  {
    q: "What's the minimum order for a small local 5K?",
    a: "MOQ is 50 pieces for sublimation cut & sew. For smaller events (under 50), we offer DTG and DTF print on blank stock with 10-piece minimum. Talk to us about your specific headcount.",
  },
  {
    q: "Can you print sponsor logos on the back?",
    a: "Yes. Sublimation allows all-over printing with multiple logos, sponsor names, and bib numbers. We work with your artwork files (AI, PSD, PDF) or help design from scratch.",
  },
  {
    q: "Do you ship to the US?",
    a: "Yes. DDP (Delivered Duty Paid) to all 50 US states. Most orders ship ocean freight (3-4 weeks) with air freight available for urgent needs. We also have a US warehouse in Fontana, CA for fast domestic fulfillment.",
  },
  {
    q: "What about sizing for participants of all body types?",
    a: "We follow US-spec measurements (XS through 3XL, with 4XL-5XL available for bulk). Free size sample sets are available before you commit. We also provide an Excel template for collecting size data from your registration system.",
  },
];

export default function ForEventsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Custom Apparel for Events",
      path: "/event-apparel/",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={forEventsServiceJsonLd()} />
      <JsonLd data={forEventsFaqJsonLd(faqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/esports-jersey-prodigy.webp"
            alt="Custom sublimated race jerseys for marathon and event participants"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
              <Trophy className="h-3.5 w-3.5" />
              For race & event organizers
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom event apparel
              <br />
              <span className="text-[#ff4d00]">delivered before your start gun.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              Marathon shirts, 5K tees, charity run apparel, volunteer uniforms,
              sponsor-branded gear. <strong className="text-white">MOQ 50 pcs</strong>,
              {" "}15-25 day production, DDP shipping to 100+ countries. Plan
              90 days out, lock the final count 30 days before your event.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633] hover:shadow-[0_8px_24px_rgba(255,77,0,0.4)]"
              >
                Get a quote for your event
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/event-timeline"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Calendar className="h-4 w-4" />
                Check your timeline
              </Link>
            </div>

            {/* Trust signals inline */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {trustSignals.map((t) => (
                <div key={t.label}>
                  <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">
                    {t.number}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              What we make
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom apparel for every event format.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a local 5K to a 10,000-person marathon, the production math
              is the same. The only variable is your deadline and your count.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((evt) => (
              <div
                key={evt.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <evt.icon className="h-8 w-8 text-[#ff4d00] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{evt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {evt.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your event</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-white">
                    <w.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm font-black">{w.label}</div>
                    <div className="mt-0.5 text-xs text-black/60">
                      {w.examples}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS + SOLUTIONS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              The 4 problems every race organizer hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              Other suppliers say "no problem." We give you the specific tool
              for each problem.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00]/10 text-[#ff4d00]">
                    <p.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-black">The pain:</span>{" "}
                      {p.pain}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-[#ff4d00]">Our fix:</span>{" "}
                      {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff4d00] hover:gap-2.5"
                    >
                      {p.link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-DAY PROGRAM TIMELINE */}
      <section className="bg-[#0a0a0a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              The 90-Day Event Apparel Program
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              From &ldquo;we should probably do shirts&rdquo; to shirts at the start line.
            </h2>
            <p className="mt-3 text-base text-white/70">
              We don&apos;t fight your timeline. We design around it. Reserve
              capacity early, lock the count late.
            </p>
          </div>

          <div className="relative">
            {/* vertical line on desktop */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[#ff4d00] via-[#ff4d00]/50 to-transparent md:block" />

            <div className="space-y-8">
              {timeline.map((step, idx) => (
                <div key={step.days} className="relative flex gap-6">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#ff4d00] bg-[#0a0a0a]">
                    <span className="text-xs font-black text-[#ff4d00]">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-1 rounded-sm border border-white/10 bg-white/5 p-6">
                    <div className="mb-2 inline-block rounded-sm bg-[#ff4d00] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black">
                      {step.days}
                    </div>
                    <h3 className="text-xl font-black">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-sm border-2 border-[#ff4d00]/30 bg-[#ff4d00]/5 p-6">
            <p className="text-sm leading-relaxed text-white/90">
              <strong className="text-[#ff4d00]">Pro tip:</strong> If you&apos;re
              under 60 days out, we can still help. Air-freight production
              compresses to 30-35 days.{" "}
              <Link
                href="/event-timeline"
                className="font-bold text-[#ff4d00] underline hover:no-underline"
              >
                Open the Timeline Calculator
              </Link>{" "}
              to see your specific dates.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US (trust) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                Why race organizers choose us
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                We&apos;ve shipped 8 years of race apparel.
                <br />
                <span className="text-black/40">Here&apos;s what that means for you.</span>
              </h2>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "Last-minute is our default, not an emergency",
                    desc: "30% of our event orders arrive with final counts locked under 30 days before the event. We plan for this.",
                  },
                  {
                    title: "One PO, multiple SKUs",
                    desc: "Participant shirt + volunteer shirt + staff polo + sponsor-branded hoodie — same factory, same shipment, one invoice.",
                  },
                  {
                    title: "US warehouse for race-week emergencies",
                    desc: "Need 50 extra shirts 3 days before the event? Our Fontana, CA warehouse can ship same-day.",
                  },
                  {
                    title: "No setup fees for standard designs",
                    desc: "We don't charge per color or per print placement. Sublimation is built for all-over graphics.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-[#ff4d00]"
                      strokeWidth={2.5}
                    />
                    <div>
                      <div className="font-black">{item.title}</div>
                      <div className="mt-1 text-sm text-black/70">
                        {item.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-black/10">
              <Image
                src="/esports-travel-hoodie.webp"
                alt="Custom sublimated event hoodies and race apparel manufactured in our Yiwu facility"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Common questions from race organizers
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Contact />
    </>
  );
}
