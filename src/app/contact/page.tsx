import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, MessageCircle, Package, Ruler, Sparkles, Truck, Wrench } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildContactGraph } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";
import { TeamSection } from "@/components/contact-team";

export const metadata = buildPageMetadata({
    // 2026-09-11 (R15-P0-1): was 74 chars — Google SERP limit is ~60, was truncated. Shortened to 51.
    title: "Get a Yiwu Factory Quote | MOQ 50 · DDP · 1-Day Reply",
    // 2026-09-11 (R15-P0-2): was 288 chars — Google meta description limit is ~160, was being truncated. Rewrote to 158 chars, kept the most actionable info (MOQ, DDP, contact, reply SLA).
    description: "Request a custom sublimation quote from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries. WhatsApp +86-198-1793-0190, reply in 1 business day.",
    keywords: ["sublimation quote Yiwu factory", "custom apparel quote MOQ 50", "DDP shipping quote", "sublimated jersey manufacturer contact", "Yiwu factory WhatsApp", "all-over print cotton quote", "B2B apparel inquiry", "Fontana CA warehouse pickup", "Rotterdam EU rep contact", "bulk custom apparel quote"],
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });;

export default function ContactPage() {
  // 2026-09-11 push (Round 6): add FAQPage JSON-LD on /contact/ to capture
  // PAA-style rich results for "how to contact Yiwu factory", "MOQ 50
  // quote", "DDP shipping quote" — the three query clusters GSC shows
  // pointing at /contact/ with low CTR in Sep-2026.
  const contactFaqs = [
    {
      q: "How do I contact the Yiwu factory directly?",
      a: "Three channels: (1) WhatsApp +86 198 1793 0190 (fastest — 1 business day reply, no signup). (2) Email info@sublimapparel.com (1 business day reply). (3) The form on /contact/ or /get-a-quote/ (1 business day reply). All three go to the same Yiwu production managers — no call center, no chat bot, no funnel.",
    },
    {
      q: "What's the minimum order quantity (MOQ)?",
      a: "MOQ is 50 pieces per design for cut-and-sew sublimation on polyester, and 30 pieces per design on re-orders. For DTG on 100% cotton the MOQ is 30 pieces per design. Sample runs start at 5–10 pieces with a 7–10 day turnaround, sample cost is refundable on bulk order of 100+ pieces.",
    },
    {
      q: "Do you ship DDP (delivered duty paid) to my country?",
      a: "Yes — DDP shipping to 100+ countries including the US, UK, EU, AU, CA, MENA, LATAM, and most of SE Asia. The quote you receive is the landed cost at your door: garment, print, freight, import duties, customs clearance, and last-mile delivery. The only thing not included is your local sales tax / VAT on the commercial invoice.",
    },
    {
      q: "How long does it take to get a quote?",
      a: "Most quotes go out within 1 business day. If your inquiry is missing a critical detail (size breakdown, deadline, destination) we reply with a clarification request the same day. Once artwork is approved, full bulk production takes 15–25 days, plus 7–14 days for DDP ocean or air freight to your door.",
    },
    {
      q: "Can I get a sample before placing a bulk order?",
      a: "Yes. Pre-production samples with your design cost $25–60 per piece plus express shipping; we refund the sample cost when you place a bulk order of 100+ pieces. We also send free material swatches and printed color cards so you can check the hand feel and color before committing.",
    },
    {
      q: "What file formats do you accept for artwork?",
      a: "AI, PSD, PDF, PNG, JPG — even a hand sketch. We free-check every artwork for printability (resolution, color profile, seam alignment) and send back a 3D mockup on the actual garment before production. Revisions are unlimited until you lock the design.",
    },
  ];

  // 2026-09-12 (R38): the 8 "While you wait" resource
  // cards lifted to a top-level const so we can hand them
  // straight to buildContactGraph as the ItemList
  // #next-step-list node. The helper emits them at
  // /contact/#next-step-list so /contact/ exposes the full
  // next-step resource hierarchy to Google in one shot
  // instead of just pointing at hub pages. Same pattern as
  // the about page "Dive deeper" ItemList (R37).
  const contactNextSteps = [
    { href: "/get-a-quote/", title: "Detailed quote form" },
    { href: "/get-a-quote-express/", title: "Express 30-min quote" },
    { href: "/yiwu-factory-whatsapp/", title: "WhatsApp the factory" },
    { href: "/samples/", title: "Order a custom sample" },
    { href: "/fabric/", title: "Fabric library" },
    { href: "/all-over-print/", title: "All-over print catalog" },
    { href: "/shipping/ddp/", title: "DDP shipping guide" },
    { href: "/resources/", title: "All tools & calculators" },
  ];

  // 2026-09-12 (R38): consolidate the 3 separate JSON-LD
  // <script> tags (BreadcrumbList + FAQPage + ContactPage)
  // into a single @graph payload via buildContactGraph. The
  // new graph:
  //   - joins the WebPage, ContactPage, Person #person-ramon,
  //     FAQPage #faq, ItemList #next-step-list, and
  //     BreadcrumbList into a single @graph with all @id
  //     cross-linking
  //   - ContactPage.mainEntity → #organization so Google
  //     recognizes /contact/ as the brand's authoritative
  //     contact surface (same pattern as the about page R37)
  //   - Person #person-ramon is inlined so the publisher
  //     author chain is self-contained (matches R36-C,
  //     R35-D, and R37)
  //   - The 8 "While you wait" resource cards are emitted as
  //     an ItemList so Google sees the full B2B conversion
  //     path from /contact/ in a single ItemList
  const contactGraph = buildContactGraph({
    faq: contactFaqs,
    nextSteps: contactNextSteps,
  });

  return (
    <>
      <JsonLd data={contactGraph} />
      <main>
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Background image — full bleed */}
        <div className="absolute inset-0">
          <Image
            src="/contact-hero.webp"
            alt="SublimApparel team working at desks in the office"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
          {/* Gradient mask — solid dark on left under text, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 via-35% to-transparent" />
          {/* Subtle blur on the left half under the text */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
              maskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Get a Quote · MOQ 50
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight md:text-[56px] lg:text-[64px]">
              Talk to a Yiwu factory manager — direct quote in 1 business day.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Real production managers in Yiwu, China — not chatbots.
              WhatsApp +86-198-1793-0190, email info@sublimapparel.com.
              Average reply time: under 24 hours. No signup required.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              MOQ 50 pcs · 15-25 day production · DDP shipping to 100+ countries ·
              US warehouse in Fontana CA for 2-5 day domestic delivery.
            </p>
          </div>
        </div>
      </section>
      <TeamSection />
      <Contact />

      {/* 2026-09-11 (R18-P1): /contact/ was a complete link dead-end — 16
          pages poured PageRank into this page (highest inbound count on the
          entire site) but /contact/ had ZERO outbound internal links,
          meaning all that accumulated equity was trapped and never flowed
          on to other important pages (e.g. /get-a-quote/, /samples/,
          /fabric/, /yiwu-factory-whatsapp/). On a B2B site, /contact/ is
          typically a near-end-of-funnel page; the user has just submitted
          a form or copied the email, so this is exactly the right place
          to show next-step resources they may also want while they wait
          for a reply (a sample order form, fabric library, DDP shipping
          guide, WhatsApp number, etc.). Each card is a real utility link,
          not SEO filler — the same buyer persona benefits from them. */}
      <section className="border-t-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00]">
              While you wait for our reply
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl">
              Useful resources before we get back to you
            </h2>
            <p className="mt-3 text-sm text-black/70 md:text-base">
              Most quotes go out within 1 business day. If you want to keep
              moving while you wait, these pages are the most useful next
              steps for a B2B apparel buyer — sample ordering, fabric library,
              shipping guide, and direct WhatsApp.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/get-a-quote/",
                icon: FileText,
                title: "Detailed quote form",
                body: "Step-by-step inquiry with size breakdown, deadline, destination. Best for orders 200+ pcs.",
              },
              {
                href: "/get-a-quote-express/",
                icon: Sparkles,
                title: "Express 30-min quote",
                body: "Skip the form. Get a fast rough quote by WhatsApp, email or our 1-step express page.",
              },
              {
                href: "/yiwu-factory-whatsapp/",
                icon: MessageCircle,
                title: "WhatsApp the factory",
                body: "Direct chat with a Yiwu production manager. +86 198 1793 0190. No signup, no bot.",
              },
              {
                href: "/samples/",
                icon: Package,
                title: "Order a custom sample",
                body: "Pre-production sample with your design, $25-60/pc, refunded on bulk 100+ order.",
              },
              {
                href: "/fabric/",
                icon: Ruler,
                title: "Fabric library",
                body: "Polyester sublimation vs DTG/DTF on 100% cotton — GSM, hand-feel, best use case.",
              },
              {
                href: "/all-over-print/",
                icon: Sparkles,
                title: "All-over print catalog",
                body: "120 products, 14 categories. Filter by sport, scenario & garment type.",
              },
              {
                href: "/shipping/ddp/",
                icon: Truck,
                title: "DDP shipping guide",
                body: "What duty-paid delivery includes, lead times by region, US warehouse 2-5 day.",
              },
              {
                href: "/resources/",
                icon: Wrench,
                title: "All tools & calculators",
                body: "Event timeline calculator, US size guide, 90-day program, how-to-source guide.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col gap-3 border-2 border-black bg-white p-5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#000]"
              >
                <card.icon className="h-5 w-5 text-[#ff4d00]" strokeWidth={2.5} />
                <h3 className="text-base font-black uppercase tracking-tight text-black">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/70">
                  {card.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ff4d00] transition-colors group-hover:text-[#cc3d00]">
                  Open <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
