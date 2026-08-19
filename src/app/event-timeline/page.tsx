import type { Metadata } from "next";
import { ArrowRight, AlertTriangle, Calendar, CheckCircle2, Clock, Plane } from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { TimelineCalculator } from "./timeline-calculator";

export const metadata: Metadata = {
  title:
    "Event Apparel Timeline Calculator | When to Order Custom Shirts | SublimApparel",
  description:
    "Free event apparel timeline calculator. Enter your event date, get exact dates for when to order, lock designs, and lock final counts. For race organizers, camps, corporate events, and clubs.",
  keywords: [
    "event timeline calculator",
    "when to order custom shirts",
    "race shirt lead time",
    "custom apparel production timeline",
    "event apparel schedule",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/event-timeline/",
  },
  openGraph: {
    title: "Event Apparel Timeline Calculator | SublimApparel",
    description:
      "Enter your event date. Get the exact order date, design lock date, and final count lock date.",
    url: "https://sublimapparel.com/event-timeline/",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Event Timeline Calculator", path: "/event-timeline/" },
]);

export default function EventTimelinePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="border-b border-black/10 bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
            <Calendar className="h-3.5 w-3.5" />
            Free planning tool
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Event Apparel
            <br />
            <span className="text-[#ff4d00]">Timeline Calculator</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            Enter your event date. We&apos;ll show you the exact order date,
            design lock date, and final-count lock date for your apparel.
            Saves the back-and-forth, locks the math.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-[#faf9f6] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <TimelineCalculator />
        </div>
      </section>

      {/* EXPLANATION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            How the math works.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Three milestones, one date. The math is the same whether you&apos;re
            ordering 50 shirts or 50,000.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] font-black text-black">
                  1
                </div>
                <div>
                  <div className="text-lg font-black">
                    Standard: 90 days out — order inquiry
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/70">
                    This is when you reach out. We hold production capacity
                    based on your estimate. Best pricing, most fabric options,
                    no rush fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] font-black text-black">
                  2
                </div>
                <div>
                  <div className="text-lg font-black">
                    60 days out — design lock + sample
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/70">
                    We send a physical sample on your exact fabric. You sign
                    off on color, fit, placement. The signed sample is the
                    contract — bulk must match.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] font-black text-black">
                  3
                </div>
                <div>
                  <div className="text-lg font-black">
                    30 days out — final count lock
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/70">
                    Your registration numbers are real. We adjust production
                    within 5% of your estimate. Late additions are processed
                    as a re-order. No panic, no penalty.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border-2 border-[#00c2ff]/30 bg-[#00c2ff]/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] font-black text-black">
                  <Plane className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-black">
                    Rush option: 30 days out — emergency order
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/70">
                    If you&apos;re under 60 days out, we can compress to a
                    30-day rush via air freight. Costs more, requires instant
                    design approval, and fabric availability is limited — but
                    it works for genuine emergencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Common questions about timeline.
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "What if I&apos;m under 30 days out?",
                a: "We can still help. Air-freight production compresses to 25-30 days, but pricing is 20-30% higher and fabric choices are limited. If you&apos;re under 15 days out, our US warehouse in Fontana, CA stocks blank apparel that we can decorate and ship domestically in 2-5 days.",
              },
              {
                q: "Can I change my design after the design lock date?",
                a: "Major design changes (different artwork, different layout) are not possible after the design lock. Minor tweaks (color adjustment, font size) can be accommodated with a small rush fee. This is why we lock the design 60 days out — to give you buffer.",
              },
              {
                q: "What if I overshoot my final count estimate?",
                a: "We adjust production within 5% above or below your estimate. If you need significantly more (10%+ above), we run a supplementary re-order at the same per-piece price (30 pc MOQ) and ship it separately. If you need less, you only pay for what&apos;s produced.",
              },
              {
                q: "Do you ship from the US or China?",
                a: "Both, depending on timeline. Standard 90-day orders ship ocean freight from China (25-40 days, lowest cost). Rush orders ship air freight from China (5-10 days). Emergency orders under 15 days ship from our US warehouse in Fontana, CA (2-5 days).",
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
