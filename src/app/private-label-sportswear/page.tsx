// 2026-09-15 (R69): /private-label-sportswear/ scenario landing page — restored.
// Targets "private label sportswear" buyer intent. Distinct from
// /apparel-brands-agencies/ (which is the broad private-label hub covering
// all product types) by being focused specifically on sportswear — team
// kits, gym wear, athletic brands, performance apparel, esports jerseys.
// The fraternity + sorority + Greek life keyword cluster gets meaningful
// coverage here that R68 audit found at near-zero. Greek life is one of
// the highest-volume B2B private-label sportswear buyers in the US.
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Package,
  Palette,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/private-label-sportswear/`;

export const metadata = buildPageMetadata({
  title: "Private Label Sportswear | Custom Athletic Apparel Manufacturer",
  description:
    "Private label sportswear — jerseys, hoodies, polos, gym wear, esports kits. Custom branding, packaging, hangtags. MOQ 50, NDA available, DDP worldwide.",
  keywords: [
    "private label sportswear",
    "private label athletic apparel",
    "private label sportswear manufacturer",
    "private label athletic apparel manufacturer",
    "private label sportswear factory",
    "private label sportswear supplier",
    "private label jerseys manufacturer",
    "private label team jerseys",
    "private label gym apparel",
    "private label gym wear",
    "private label performance apparel",
    "private label athletic wear",
    "custom sportswear manufacturer",
    "custom athletic apparel manufacturer",
    "custom sportswear factory",
    "custom athletic apparel factory",
    "white label sportswear",
    "white label athletic apparel",
    "white label sportswear manufacturer",
    "custom branded sportswear",
    "custom branded athletic apparel",
    "sportswear OEM",
    "athletic apparel OEM",
    "sportswear ODM",
    "athletic apparel ODM",
    "sportswear private label program",
    "athletic apparel private label program",
    "fraternity sportswear",
    "fraternity apparel",
    "fraternity jerseys",
    "fraternity shirts",
    "fraternity custom apparel",
    "sorority sportswear",
    "sorority apparel",
    "sorority jerseys",
    "sorority shirts",
    "sority custom apparel",
    "Greek life sportswear",
    "Greek life apparel",
    "Greek life jerseys",
    "Greek life custom apparel",
    "Greek apparel manufacturer",
    "Greek letter apparel",
    "custom Greek apparel",
    "rush week apparel",
    "bid day apparel",
    "philanthropy event apparel",
    "homecoming sportswear",
    "intramural sportswear",
    "club sports sportswear",
    "esports private label",
    "esports jersey manufacturer",
    "esports apparel private label",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Private Label Sportswear | Custom Athletic Apparel Manufacturer",
  ogDescription:
    "Private label sportswear — jerseys, hoodies, polos, gym wear, esports kits. Custom branding, MOQ 50, NDA available, DDP worldwide.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Trophy,
    title: "Athletic brands",
    desc: "Emerging and established sportswear brands scaling production without owning a factory. Custom branding, packaging, hangtags.",
  },
  {
    icon: GraduationCap,
    title: "Greek life (fraternity & sorority)",
    desc: "Custom Greek apparel — jerseys, hoodies, tees, rush week, bid day, philanthropy events. Pantone-matched to chapter colors.",
  },
  {
    icon: Sparkles,
    title: "Boutique fitness studios",
    desc: "Boutique gym brands, fitness studios, yoga brands. Branded apparel for instructors and retail customers.",
  },
  {
    icon: Award,
    title: "Esports & gaming teams",
    desc: "Esports jerseys, gaming team kits, tournament apparel. Custom branding, sponsor placement, fan merch.",
  },
];

const whatWeMake = [
  {
    label: "Team Jerseys",
    examples: "Sublimated, embroidered, or DTF logos",
    icon: Shirt,
  },
  {
    label: "Performance Tees",
    examples: "Moisture-wicking, all-over print, retail cut",
    icon: Shirt,
  },
  {
    label: "Athletic Hoodies",
    examples: "Premium feel, custom branding, retail-ready",
    icon: Package,
  },
  {
    label: "Polos & Quarter-Zips",
    examples: "Coach polos, training polos, branded outerwear",
    icon: Layers,
  },
];

const painPoints = [
  {
    icon: Palette,
    title: "Brand identity must be exact.",
    pain: "Private label buyers can't have shirts that look close to brand — they need exact Pantone match, exact hangtag spec, exact packaging. Off-brand inventory is dead inventory.",
    fix: "We match to Pantone, with physical lab dips for orders over 500 pcs. Custom hangtags, care labels, poly bags, and packaging available. NDA standard before any pattern work.",
    link: { label: "Quality control", href: "/quality-control" },
  },
  {
    icon: Clock,
    title: "Re-orders must match the original exactly.",
    pain: "Brand buyers re-order 3-6 months later. Off-color re-orders look like a different brand. Many suppliers can't maintain color consistency across runs.",
    fix: "We archive your approved Pantone recipe and color profile. Re-orders use the same fabric lot and ink batch. Sample approval before production is the contract.",
    link: { label: "See re-order process", href: "/90-day-program" },
  },
  {
    icon: Ruler,
    title: "Sizing consistency matters.",
    pain: "Brand buyers need size consistency across re-orders. Off-sizing drives returns and erodes brand trust.",
    fix: "Detailed measurement charts archived per buyer. Size confirmation before production. Mixed-size production for new drops. Same factory, same grading, same fit.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Shield,
    title: "Confidentiality matters for brand buyers.",
    pain: "Brand buyers often don't want their factory shared with competitors. Many suppliers don't sign NDAs or leak customer lists.",
    fix: "Mutual NDA standard before any pattern or branded label work. White-label shipping (your packing slip, your carton mark). Blind invoicing for dropship-to-customer orders.",
    link: { label: "See NDA process", href: "/about/factory" },
  },
];

const faqs = [
  {
    q: "What's the MOQ for private label sportswear?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton, MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround. Re-order MOQ is 30 pieces for any follow-up runs. Custom hangtags, care labels, and packaging have a one-time setup fee.",
  },
  {
    q: "Do you sign NDAs for brand buyers?",
    a: "Yes. Mutual NDA is standard before any pattern, grading, or branded label work. We also offer white-label shipping (your packing slip, your carton mark, no SublimApparel branding on the outward packaging) and blind invoicing for dropship-to-customer orders. NDA process is part of our standard onboarding for brand buyers.",
  },
  {
    q: "Can you do custom hangtags and packaging?",
    a: "Yes. Custom hangtags, care labels, fold tags, poly bags, tissue paper, and outer cartons — all available. One-time setup fee applies per hangtag/packaging design. Re-orders use the same setup with no repeat fee.",
  },
  {
    q: "What's the typical price range for private label sportswear?",
    a: "Per-piece FOB Yiwu starts at $9 for basic polyester tees with all-over sublimation. Heavier fabric, premium finishes, custom hangtags, or DTG on cotton push the per-piece range up to $18-35 depending on quantity and complexity. Quote is all-inclusive: garment, print, QC, packing, custom branding.",
  },
];

export default function PrivateLabelSportswearPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Private Label Sportswear", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Private Label Sportswear | Custom Athletic Apparel Manufacturer",
        description:
          "Private label sportswear — jerseys, hoodies, polos, gym wear, esports kits. Custom branding, packaging, hangtags. MOQ 50, NDA available, DDP worldwide.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${pageUrl}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Private Label Sportswear Manufacturing",
        serviceType: "Private label sportswear, custom branding, OEM/ODM, NDA available",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Japan" },
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceRange: "$$",
          availability: "https://schema.org/InStock",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageGraph} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/esports-jersey-product.webp"
            alt="Private label sportswear — custom athletic apparel manufactured in Yiwu"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#00c2ff]/40 bg-[#00c2ff]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00c2ff]">
              <Award className="h-3.5 w-3.5" />
              For athletic brands, Greek life, esports & boutique fitness
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Private label sportswear
              <br />
              <span className="text-[#00c2ff]">for athletic brands, Greek life &amp; esports.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Custom sportswear with your brand on the label.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From athletic brands to Greek life chapters, esports teams to boutique fitness studios —
              we help brand buyers produce{" "}
              <strong className="text-white">private label sportswear</strong> with their branding on
              the label.{" "}
              <strong className="text-white">
                Custom hangtags, packaging, Pantone-matched colors, MOQ 50, NDA available
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your brand
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about/factory/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Shield className="h-4 w-4" />
                About the factory + NDA
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Pieces MOQ
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">NDA</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Standard for brand buyers
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">Pantone</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Color-matched standard
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">100+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Countries DDP shipped
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Private label sportswear solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Sportswear for every brand and chapter.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From emerging sportswear labels to established Greek chapters, esports teams to boutique
              fitness studios. Same factory, same quality, same NDA-protected process.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <u.icon className="h-8 w-8 text-[#00c2ff] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for brands</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-black">
                    <w.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm font-black">{w.label}</div>
                    <div className="mt-0.5 text-xs text-black/60">{w.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              The 4 problems every brand buyer hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div key={p.title} className="rounded-sm border-2 border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
                    <p.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-black"
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-black">The pain:</span>{" "}
                      <span dangerouslySetInnerHTML={{ __html: p.pain }} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-[#00c2ff]">Our fix:</span> {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff] hover:gap-2.5"
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

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from brand buyers
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Quick answers.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#00c2ff]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#00c2ff] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedProducts solutionSlug="apparel-brands-agencies" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Private label sportswear"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}