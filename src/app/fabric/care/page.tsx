// 2026-09-11 (R21-C): /fabric/care — care, wash, and longevity guide for
// sublimated apparel. Targets long-tail PAA queries like "how to wash
// sublimated shirts", "can you tumble dry sublimation", "do sublimated
// shirts fade" — these questions are common, the answers are short, and
// Google rewards well-structured content with PAA + featured snippets.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, Sun, ThermometerSun, Shirt, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "How to Care for Sublimated Apparel — Wash, Dry, Iron, Store",
  description:
    "Wash, dry, iron, and store sublimated apparel the right way. Sublimation prints last 100+ washes with cold water, mild detergent, low-heat drying, and no bleach. Full care guide.",
  keywords: [
    "how to wash sublimated shirts",
    "sublimation care instructions",
    "do sublimated shirts fade",
    "can you tumble dry sublimation",
    "sublimated apparel care",
    "sublimation washing guide",
    "how to iron sublimated print",
    "sublimation longevity",
  ],
  canonical: "https://sublimapparel.com/fabric/care/",
});

const doRinse = [
  {
    icon: Droplets,
    title: "Cold or warm water (30°C / 86°F max)",
    body: "Wash inside-out in cold or warm water. Hot water (above 40°C / 104°F) weakens the polyester fibers over time and can cause edge curling on all-over prints.",
  },
  {
    icon: Sparkles,
    title: "Mild detergent, no bleach",
    body: "Use a standard mild liquid detergent. Avoid chlorine bleach, oxygen bleach, and whitening agents — they break down disperse dyes and cause fading on sublimated areas.",
  },
  {
    icon: Shirt,
    title: "Inside-out, similar colors",
    body: "Turn the garment inside-out before washing to protect the print face from friction. Wash with similar colors — sublimated dyes are colorfast but loose cotton fibers from other garments can stick to the print surface.",
  },
];

const doDry = [
  {
    icon: Sun,
    title: "Line dry is best",
    body: "Hang or flat-dry sublimated apparel away from direct sunlight. UV exposure is the single biggest cause of sublimation print fade over years of use. Line drying also avoids any heat damage from the dryer.",
  },
  {
    icon: ThermometerSun,
    title: "Tumble dry low (if you must)",
    body: "If you need to use a dryer, set it to low heat or air-fluff. High heat (above 70°C / 158°F) over many cycles can cause sublimation prints to look chalky or develop micro-cracks at stress points.",
  },
  {
    icon: ShieldCheck,
    title: "Remove promptly",
    body: "Take the garment out of the washer or dryer as soon as the cycle ends. Leaving a damp sublimated shirt crumpled in the machine for hours can cause dye migration from dark printed areas into the white polyester.",
  },
];

const doIron = [
  {
    icon: ThermometerSun,
    title: "Low heat, inside-out, with a cloth barrier",
    body: "Iron at the lowest polyester setting (typically 110°C / 230°F or below). Turn the garment inside-out, or place a thin cotton cloth between the iron and the print. Never iron directly on the sublimated surface — the heat will glaze the print.",
  },
  {
    icon: AlertTriangle,
    title: "No steam directly on the print",
    body: "Steam is fine on the inside of the garment, but avoid aiming a steam burst at the print face. The combination of high heat + moisture can lift the edges of a sublimated panel over time.",
  },
];

const doAvoid = [
  {
    title: "Chlorine bleach and fabric softener",
    body: "Both will degrade sublimation dyes. Fabric softener leaves a waxy film that masks the print's vibrancy and traps body oils in the fabric — and the waxy film is hard to remove.",
  },
  {
    title: "Dry cleaning",
    body: "Most dry cleaners use perchloroethylene (perc) or similar solvents that swell polyester fibers and lift disperse dyes out of the print. Sublimated apparel should not be dry cleaned.",
  },
  {
    title: "Direct sunlight for storage",
    body: "If you store sublimated apparel on a shelf or in a closet, keep it out of direct sunlight. UV is the #1 cause of sublimation fade. A drawer or opaque garment bag is ideal.",
  },
  {
    title: "Rough surfaces and Velcro",
    body: "Snags, Velcro, and abrasive surfaces (concrete benches, rough backpacks) can pull at sublimated prints. The print itself is durable, but pilling on the surface around the print dulls the look.",
  },
];

const faqs = [
  {
    q: "How do you wash sublimated shirts without fading?",
    a: "Wash sublimated shirts inside-out in cold or warm water (max 30°C / 86°F) with a mild liquid detergent. Skip chlorine bleach, oxygen bleach, and fabric softener. Tumble dry on low heat or, ideally, line dry away from direct sunlight. With this routine, a quality sublimated print will not fade perceptibly for 100+ wash cycles.",
  },
  {
    q: "Can you put sublimated shirts in the dryer?",
    a: "Yes, on low heat only. The sublimation process bonds dye at 200°C, so a dryer set to low (60–70°C / 140–158°F) is well below that threshold and will not damage the print. High-heat dryer cycles (above 80°C) over time can cause the print to look chalky or develop micro-cracks. For maximum print life, line dry.",
  },
  {
    q: "Do sublimated shirts fade over time?",
    a: "Properly sublimated shirts do not fade from washing — the dye is part of the polyester fiber, not a surface coating. The two real causes of fade are: (1) UV exposure from direct sunlight (significant over years of use), and (2) bleach / harsh chemicals. A sublimated polyester shirt worn and washed normally will hold its colors for the life of the garment.",
  },
  {
    q: "Can you iron a sublimated print?",
    a: "Yes, but never iron directly on the print face. Turn the garment inside-out and use the lowest polyester setting (around 110°C / 230°F). For extra protection, place a thin cotton cloth between the iron and the fabric. Direct high heat on the print will glaze the surface and dull the colors.",
  },
  {
    q: "How long do sublimated prints last?",
    a: "With normal care, sublimated prints last 100+ wash cycles without visible fade, and the polyester garment itself lasts 3–5+ years of regular wear. Our factory wash-tests every production batch to 50 cycles minimum before shipping. The print and the fabric are the same material — they age together.",
  },
  {
    q: "Can you use fabric softener on sublimated apparel?",
    a: "No. Fabric softener deposits a waxy cationic film on polyester fibers that masks the print's vibrancy, dulls colors, and traps body oils in the fabric. The film is hard to remove once it builds up. Skip the softener entirely — the print is soft to the touch on its own because the dye is inside the fiber, not on top of it.",
  },
];

export default function FabricCarePage() {
  const faqId = "https://sublimapparel.com/fabric/care/#faq";
  const webPageId = "https://sublimapparel.com/fabric/care/#webpage";

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Fabric", path: "/fabric/" },
    { name: "Care & washing", path: "/fabric/care/" },
  ]);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webPageId,
    url: "https://sublimapparel.com/fabric/care/",
    name: "How to Care for Sublimated Apparel — Wash, Dry, Iron, Store | SublimApparel",
    description:
      "Wash, dry, iron, and store sublimated apparel the right way. Sublimation prints last 100+ washes with cold water, mild detergent, low-heat drying, and no bleach.",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: { "@id": "https://sublimapparel.com/#organization" },
    mainEntity: { "@id": faqId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://sublimapparel.com/og/og-home.webp",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/body//h1", "/html/body//section[1]//p"],
    },
  };

  const faqJsonLd = buildFaqJsonLd(faqs);
  const { "@context": _bc, ...breadcrumbStripped } = breadcrumbJsonLd;
  const { "@context": _wp, ...webPageStripped } = webPageJsonLd;
  const { "@context": _faq, ...faqStripped } = faqJsonLd;
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbStripped,
      { ...webPageStripped },
      { ...faqStripped, "@id": faqId },
    ],
  };

  return (
    <main>
      <JsonLd data={pageGraph} />

      {/* HERO */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Care &amp; washing
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Wash it right.
            <br />
            <span className="text-[#00c2ff]">Print lasts 100+ cycles.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            Sublimation dyes are part of the polyester fiber, not a coating on
            top — so the print is permanent. The only real threats are UV,
            bleach, and high heat over time. This page covers the exact wash,
            dry, iron, and storage routine that keeps sublimated apparel
            looking factory-fresh for years.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/fabric/polyester/"
              className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              Polyester fabric guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/fabric/cotton/"
              className="group inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              Cotton fabric guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER — featured snippet for "how to wash sublimated shirts" */}
      <section id="quick-answer" className="border-b-2 border-black bg-[#e6f7ff]">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="mb-3 inline-block border-2 border-black bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Quick answer
          </div>
          <h2 className="mb-4 text-3xl font-black leading-[0.95] tracking-tight md:text-4xl">
            How to wash sublimated shirts
          </h2>
          <p className="text-lg leading-relaxed text-black">
            <strong>Turn the garment inside-out, wash in cold or warm water (max 30°C / 86°F) with a mild liquid detergent, skip bleach and fabric softener, then line dry away from direct sunlight.</strong>{" "}
            With this routine, a properly sublimated polyester shirt will hold its colors for 100+ wash cycles without visible fade — the dye is bonded to the fiber at 200°C during production, so normal household washing cannot lift it.
          </p>
        </div>
      </section>

      {/* WASH */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            [ 01 / Washing ]
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Cold water.
            <br />
            <span className="text-[#cc3d00]">Mild detergent.</span>
            <br />
            Inside-out.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {doRinse.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="border-2 border-black bg-[#faf9f6] p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-black/80 md:text-base">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DRY */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            [ 02 / Drying ]
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Line dry.
            <br />
            <span className="text-[#cc3d00]">Or low-heat tumble.</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {doDry.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="border-2 border-black bg-white p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-black/80 md:text-base">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IRON */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            [ 03 / Ironing ]
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Low heat.
            <br />
            <span className="text-[#cc3d00]">Inside-out, with a cloth.</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {doIron.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="border-2 border-black bg-[#faf9f6] p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-black/80 md:text-base">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVOID */}
      <section className="border-b-2 border-black bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-[#ff4d00] bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            [ 04 / What to avoid ]
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Four things
            <br />
            <span className="text-[#ff4d00]">that damage the print.</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {doAvoid.map((r, i) => (
              <div key={i} className="border-2 border-[#ff4d00] bg-[#0a0a0a] p-6">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#ff4d00]" strokeWidth={2.5} />
                  <h3 className="text-lg font-black leading-tight">{r.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/80 md:text-base">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LONGEVITY */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            [ 05 / Longevity ]
          </div>
          <h2 className="mb-6 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            How long does
            <br />
            <span className="text-[#cc3d00]">sublimation actually last?</span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-black/85 md:text-lg">
            <p>
              The sublimation print is <strong>part of the polyester fiber</strong>, not a coating on top of it. We bond the dye at 200°C in a heat press during production — the dye chemically opens the polyester, locks in, and becomes the fabric itself.
            </p>
            <p>
              That means normal household washing cannot lift the print. The two real failure modes are:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-base md:text-lg">
              <li>
                <strong>UV from direct sunlight</strong> — the dye is lightfast, but years of outdoor use will gradually mute colors. Store sublimated apparel out of direct sun.
              </li>
              <li>
                <strong>High heat + chemicals</strong> — bleach, fabric softener, dry cleaning solvents, and very hot dryers can degrade disperse dyes over many cycles.
              </li>
            </ul>
            <p>
              We wash-test every production batch to 50 cycles minimum before shipping, and our customers routinely report 100+ cycles of normal wear with no visible fade. The print and the fabric age together because they <em>are</em> the same thing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            FAQ
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Common questions
            <br />
            <span className="text-[#cc3d00]">about caring for sublimation.</span>
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="border-l-4 border-[#ff4d00] bg-[#faf9f6] p-6">
                <h3 className="mb-3 text-lg font-black leading-snug md:text-xl">{f.q}</h3>
                <p className="text-sm leading-relaxed text-black/80 md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            Related guides
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/fabric/polyester/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              Polyester fabric
              <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/fabric/cotton/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ff4d00] hover:shadow-[3px_3px_0_0_#000]"
            >
              Cotton fabric
              <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/fabric/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#cc3d00] hover:shadow-[3px_3px_0_0_#000]"
            >
              All fabric &amp; processes
              <ArrowRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Want sublimated apparel
            <br />
            <span className="text-black">that lasts?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/95 md:text-lg">
            We pre-shrink, wash-test, and quality-check every production run. Send us your
            design and we&apos;ll send back a sample in 7 days.
          </p>
          <Link
            href="/get-a-quote/"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get a quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
