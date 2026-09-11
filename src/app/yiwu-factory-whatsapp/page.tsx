import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Clock, Package, Truck, Shield } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata = buildPageMetadata({
  title: "Yiwu Factory WhatsApp — +86-198-1793-0190 | 1-Day Reply",
  description: "Message our Yiwu factory direct on WhatsApp +86-198-1793-0190. Custom sublimated apparel, MOQ 50 pcs, DDP shipping to 100+ countries, US warehouse in Fontana CA. Real production managers reply within 1 business day.",
  keywords: [
    "Yiwu factory WhatsApp",
    "Yiwu factory contact WhatsApp",
    "sublimation factory WhatsApp number",
    "China apparel factory WhatsApp",
    "Yiwu manufacturer WhatsApp direct",
    "sublimation factory direct line",
    "WhatsApp quote Yiwu",
    "Chinese factory WhatsApp contact",
    "all-over print factory WhatsApp",
    "B2B apparel factory WhatsApp",
  ],
  canonical: "/yiwu-factory-whatsapp",
});

const WHATSAPP_NUMBER = "+8619817930190";
// wa.me link (international format without + or spaces)
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SublimApparel, I'd like a quote for custom sublimated apparel. Product type / quantity / target delivery country / deadline:"
)}`;

export default function YiwuFactoryWhatsappPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Yiwu Factory WhatsApp", path: "/yiwu-factory-whatsapp" },
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom Sublimation Apparel Manufacturing",
    provider: { "@id": "https://sublimapparel.com/#organization" },
    areaServed: "Worldwide",
    description:
      "Direct WhatsApp line to the SublimApparel production team in Yiwu, China. Custom sublimated and all-over print apparel, MOQ 50 pcs, DDP shipping to 100+ countries.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceRange: "$8–$28",
      availability: "https://schema.org/InStock",
    },
  };

  // 2026-09-11 push (Round 6): add FAQPage JSON-LD on /yiwu-factory-whatsapp/
  // to capture PAA-style rich results for the high-exposure query
  // "Yiwu factory WhatsApp". Each Q is the exact phrasing buyers search.
  const faqJsonLd = buildFaqJsonLd([
    {
      q: "Is +86-198-1793-0190 a real Yiwu factory WhatsApp number?",
      a: "Yes. +86 198 1793 0190 is the direct WhatsApp line of SublimApparel's Yiwu production team. The number is registered on a corporate account, the line is monitored Monday–Saturday 08:00–22:00 China Standard Time, and a real production manager (not a chatbot) replies. You can also email info@sublimapparel.com or use the form on /contact/.",
    },
    {
      q: "Can I message the factory direct without signing up?",
      a: "Yes. No account, no form, no portal — send a WhatsApp with your product type, quantity, target delivery country, and deadline. The first reply usually comes within 1 business day with a mockup + landed DDP quote. If you already have tech packs or reference photos, attach them on the first message to save a round-trip.",
    },
    {
      q: "What's the minimum order quantity (MOQ) for sublimated apparel?",
      a: "MOQ is 50 pieces per design for cut-and-sew sublimation on polyester, and 30 pieces per design on re-orders. For DTG on 100% cotton, MOQ is 30 pieces per design. We can do trial runs of 5–10 pieces for samples before committing to bulk.",
    },
    {
      q: "Do you ship DDP (delivered duty paid) to my country?",
      a: "Yes — DDP to 100+ countries including US, UK, EU, AU, CA, LATAM, MENA, and most of SE Asia. The quote you receive is the landed cost at your door: production, freight, duties, customs clearance, and last-mile. The only thing not included is local sales tax / VAT on the commercial invoice.",
    },
    {
      q: "How long does a Yiwu-to-USA shipment take?",
      a: "Standard ocean DDP to US: 18–25 days door-to-door including production (15 days) + ocean + customs + last-mile. Air DDP upgrade: 10–14 days. For urgent restocks we also offer 2–5 day domestic shipping from our Fontana, CA warehouse if we hold buffer stock for your design.",
    },
    {
      q: "What payment terms do you accept for a first order?",
      a: "First order: 30% T/T deposit on order confirmation, 70% balance before shipment. After 3 successful orders we offer Net 30 for buyers in the US, UK, EU, AU, and CA. We accept T/T (wire), PayPal for small orders (under $5,000), and L/C for orders over $50,000.",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <main>
        {/* Hero — WhatsApp CTA front and center */}
        <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
          <div className="absolute inset-0">
            <Image
              src="/contact-hero.webp"
              alt="SublimApparel team in Yiwu office — reachable on WhatsApp"
              fill
              className="object-cover object-[center_35%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 via-35% to-transparent" />
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
              <div className="mb-4 inline-block bg-[#25D366] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                WhatsApp · Direct Line
              </div>
              <h1 className="text-[40px] font-black leading-[1.05] tracking-tight md:text-[56px] lg:text-[64px]">
                Message our Yiwu factory direct on WhatsApp.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Skip the contact form. Skip the sales rep queue. Send a WhatsApp
                to a real production manager in Yiwu, China — average reply
                time under 1 business day, no signup required.
              </p>

              {/* WhatsApp CTA button */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-md bg-[#25D366] px-6 py-4 text-base font-black text-black transition-colors hover:bg-[#1ebd57] md:text-lg"
                >
                  <MessageCircle className="h-6 w-6" />
                  Chat on WhatsApp
                </a>
                <div className="text-sm text-white/80">
                  <div className="font-mono text-lg font-bold tracking-wider md:text-xl">
                    {WHATSAPP_NUMBER}
                  </div>
                  <div className="text-xs text-white/60">
                    Tap to open WhatsApp · International format
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                MOQ 50 pcs · 15-25 day production · DDP shipping to 100+
                countries · US warehouse in Fontana CA for 2-5 day domestic
                delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Why WhatsApp works for B2B */}
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-10">
              <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Why B2B buyers prefer WhatsApp
              </div>
              <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-black md:text-5xl">
                Direct to the production team.
                <br />
                <span className="text-[#cc3d00]">Not a chatbot.</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Pillar
                icon={<Clock className="h-6 w-6" />}
                title="Under 24 h reply"
                body="Business-day replies from a senior account manager — not an autoresponder. Senior reps average 10+ years in export trade."
              />
              <Pillar
                icon={<Package className="h-6 w-6" />}
                title="Artwork + tech pack"
                body="Send AI / PDF / PSD / even hand sketches. We free-check every artwork and reply with a 3D mockup before you commit."
              />
              <Pillar
                icon={<Truck className="h-6 w-6" />}
                title="DDP landed quote"
                body="One WhatsApp conversation → landed quote with freight, duties, and last-mile delivery. We ship to 100+ countries door-to-door."
              />
              <Pillar
                icon={<Shield className="h-6 w-6" />}
                title="Sample before bulk"
                body="$50-150 refundable on 200+ pc orders. 5-7 day sample lead time. We won't put you in production until you sign off on the sample."
              />
            </div>
          </div>
        </section>

        {/* Conversation flow */}
        <section className="border-b-2 border-black bg-[#f5f5f5]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                What happens after you WhatsApp us
              </div>
              <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-black md:text-5xl">
                From first message to landed quote in 5 steps.
              </h2>
            </div>
            <ol className="space-y-4">
              <FlowStep
                num={1}
                title="You send the brief"
                body="Product type (jersey / tee / hoodie / etc), quantity, target delivery country, deadline, and any reference artwork. Plain text is fine — we'll ask the right follow-ups."
              />
              <FlowStep
                num={2}
                title="We confirm feasibility in 4-6 h"
                body="Same business day we tell you whether the spec works with our production lines, what fabric and print process fits, and any cost drivers (metallic inks, glow-in-the-dark, complex panels, etc)."
              />
              <FlowStep
                num={3}
                title="We send a landed DDP quote"
                body="Per-unit price + setup + sample cost + freight + duties + last-mile. No hidden fees, no &ldquo;plus shipping&rdquo; surprises. Valid for 14 days."
              />
              <FlowStep
                num={4}
                title="Sample run (optional but recommended)"
                body="$50-150 per piece, 5-7 day turnaround. Refundable on bulk order 200+ pcs. Free material swatches and printed color cards shipped with the sample."
              />
              <FlowStep
                num={5}
                title="Bulk production + DDP delivery"
                body="15-25 day production after sample sign-off. DDP shipping via sea or air to 100+ countries — you receive the goods at your door with no customs paperwork."
              />
            </ol>
          </div>
        </section>

        {/* FAQ — short list of objections */}
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="mb-10">
              <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Common questions
              </div>
              <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-black md:text-5xl">
                Quick answers before you message.
              </h2>
            </div>
            <dl className="divide-y-2 divide-black border-y-2 border-black">
              <FAQItem
                q="What is the WhatsApp number for your Yiwu factory?"
                a="Our direct line is +86-198-1793-0190. The number routes to a senior account manager (Ramon, Lily, Mark, or Chris) during China business hours (UTC+8). Average reply time is under 1 business day."
              />
              <FAQItem
                q="Can I send artwork over WhatsApp?"
                a="Yes — we accept AI, PDF, PSD, PNG, JPG, and even hand-sketch photos. For files over 16 MB, send via WeChat or email info@sublimapparel.com. We'll free-check the printability and reply with a 3D mockup on the actual garment."
              />
              <FAQItem
                q="What is the MOQ for a custom sublimated order?"
                a="50 pieces per design per colorway, with as little as 1 piece per size. For repeat orders we can usually drop to 30 pcs. The full order has a 50 pc minimum total."
              />
              <FAQItem
                q="Do you ship DDP to the US and EU?"
                a="Yes. We ship DDP (Delivered Duty Paid) to 100+ countries, meaning freight, customs clearance, duties, taxes, and last-mile delivery are all in our quote. US orders can also ship from our Fontana CA warehouse for 2-5 day domestic delivery."
              />
              <FAQItem
                q="How long does production take?"
                a="15-25 business days for bulk production after sample sign-off. Sample lead time is 5-7 days. Rush service (7-10 day bulk) is available for an additional 20% on select product types."
              />
              <FAQItem
                q="Is the WhatsApp line staffed 24/7?"
                a="Business-day coverage: Mon-Fri 09:00-18:00 China time (UTC+8). Outside those hours, leave a message and you'll get a reply the next business morning. We do not use WhatsApp auto-responders."
              />
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <h2 className="text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Ready to talk?
              <br />
              <span className="text-[#25D366]">WhatsApp us right now.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              One message, one senior account manager, one landed quote — usually
              within 1 business day. No signup, no chatbot, no waiting.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-md bg-[#25D366] px-8 py-4 text-base font-black text-black transition-colors hover:bg-[#1ebd57] md:text-lg"
              >
                <MessageCircle className="h-6 w-6" />
                Chat on WhatsApp · {WHATSAPP_NUMBER}
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Or use the contact form
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/50">
              Or email <a href="mailto:info@sublimapparel.com" className="underline hover:text-white/80">info@sublimapparel.com</a> · Mon-Fri 09:00-18:00 China time (UTC+8)
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="border-2 border-black bg-[#f5f5f5] p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-black text-white">
        {icon}
      </div>
      <h3 className="text-lg font-black leading-tight text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-black/70">{body}</p>
    </div>
  );
}

function FlowStep({
  num,
  title,
  body,
}: {
  num: number;
  title: string;
  body: string;
}) {
  return (
    <li className="grid gap-4 border-2 border-black bg-white p-5 md:grid-cols-[auto_1fr] md:items-start md:gap-6 md:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#ff4d00] text-2xl font-black text-black">
        {num}
      </div>
      <div>
        <h3 className="text-lg font-black leading-tight text-black md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-black/70 md:text-base">
          {body}
        </p>
      </div>
    </li>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="grid gap-3 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
      <dt className="text-base font-black leading-snug text-black md:text-lg">{q}</dt>
      <dd
        className="text-sm leading-relaxed text-black/75 md:text-base"
        dangerouslySetInnerHTML={{ __html: a }}
      />
    </div>
  );
}
