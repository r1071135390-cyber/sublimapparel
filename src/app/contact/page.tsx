import Image from "next/image";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";
import { TeamSection } from "@/components/contact-team";

export const metadata = buildPageMetadata({
    title: "Get a Yiwu Factory Quote — MOQ 50 · DDP to 100+ Countries · Reply in 1 Day",
    description: "Request a custom sublimation or all-over cotton print quote directly from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. WhatsApp +86-198-1793-0190, info@sublimapparel.com. Replies within 1 business day, no signup required.",
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
  const faqJsonLd = buildFaqJsonLd([
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
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])} />
      <JsonLd data={faqJsonLd} />
      {/* 2026-09-11 push (Round 8 part 1): add explicit ContactPage +
          WebPage JSON-LD on /contact/. ContactPage is the schema.org
          type dedicated to "how to reach this business" surfaces.
          Linking it via mainEntity → #organization, primaryImageOfPage,
          and `significantLink` to the WhatsApp landing page
          (/yiwu-factory-whatsapp/) and the request-a-quote page
          (/get-a-quote/) reinforces /contact/'s role as the canonical
          conversion entry-point for high-intent B2B queries and gives
          Google the cross-page entity graph to attach the
          WhatsApp-tap-to-call affordance consistently. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": "https://sublimapparel.com/contact/#webpage",
          url: "https://sublimapparel.com/contact/",
          name: "Contact SublimApparel — Yiwu Factory Quote in 1 Business Day",
          description:
            "Get a custom sublimation or all-over cotton print quote directly from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. WhatsApp +86-198-1793-0190, email info@sublimapparel.com. Replies within 1 business day, no signup required.",
          inLanguage: "en",
          isPartOf: { "@id": "https://sublimapparel.com/#website" },
          about: { "@id": "https://sublimapparel.com/#organization" },
          mainEntity: { "@id": "https://sublimapparel.com/#organization" },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://sublimapparel.com/contact-hero.webp",
          },
          // `significantLink` tells Google which outbound links from
          // this page are the most semantically important for users.
          // Both of these are direct conversion paths the user might
          // prefer over the contact form.
          significantLink: [
            "https://sublimapparel.com/get-a-quote/",
            "https://sublimapparel.com/yiwu-factory-whatsapp/",
            "https://sublimapparel.com/shipping/us-warehouse/",
          ],
          // 2026-09-11 push (Round 8 part 1): WebPage.speakable marks
          // which sections of the page are best-suited to voice-search
          // / Google-Assistant read-aloud answers. Voice search
          // optimization is a no-cost E-E-A-T win on contact pages
          // because users frequently ask "what's the phone number for
          // SublimApparel" or "how do I contact SublimApparel".
          speakable: {
            "@type": "SpeakableSpecification",
            xpath: [
              "/html/body//h1",
              "/html/body//section[contains(@class,'hero')]//p",
            ],
          },
          keywords:
            "contact SublimApparel, Yiwu factory contact, get a quote, MOQ 50, DDP shipping quote, Yiwu factory WhatsApp, info@sublimapparel.com, custom apparel quote",
        }}
      />
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
      <Contact /></main>
    </>
  );
}
