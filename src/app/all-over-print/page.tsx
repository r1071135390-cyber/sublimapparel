import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Shirt,
  Layers,
  Scissors,
  Palette,
  Ruler,
  Zap,
  Globe,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "All-Over Print Manufacturer | Edge-to-Edge Sublimation & Cotton | MOQ 50",
  description:
    "All-over print clothing manufacturer in Yiwu, China. Edge-to-edge sublimation on polyester, allover digital print on 100% cotton, plus DTF, DTG and cut-and-sew. MOQ 50 pcs, no setup fee, DDP shipping to 100+ countries.",
  keywords: [
    "all-over print",
    "all over print manufacturer",
    "all over print clothing",
    "sublimation all over print",
    "all over print t-shirt",
    "all over print hoodie",
    "all over print factory",
    "edge to edge printing",
    "full body sublimation",
    "cut and sew sublimation",
    "allover digital print cotton",
    "sublimation China factory",
    "DDP sublimation printing",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/all-over-print/",
  },
  openGraph: {
    title:
      "All-Over Print Manufacturer | Edge-to-Edge Sublimation & Cotton | SublimApparel",
    description:
      "Yiwu factory. Polyester sublimation, allover cotton print, DTG, DTF, cut-and-sew. MOQ 50 pcs, no setup fee, DDP worldwide.",
    url: "https://sublimapparel.com/all-over-print/",
    images: ["/factory-floor.webp"],
  },
};

const processes = [
  {
    icon: Layers,
    title: "Polyester sublimation",
    desc: "Heat-press dye-sublimation transfers CMYK ink into 100% polyester at the molecular level. Print becomes part of the fabric — zero hand feel, photorealistic color, no cracking or peeling through 50+ washes.",
    best: "Sportswear, esports jerseys, cycling, streetwear, race kits",
  },
  {
    icon: Sparkles,
    title: "Allover digital print on cotton",
    desc: "Reactive-dye cut-and-sew workflow prints edge-to-edge on 100% cotton. Same seamless look as poly sublimation — but on real cotton, with a soft hand feel that DTG and DTF cannot match.",
    best: "Premium tees, lifestyle, fashion, eco-conscious brands, baby/kids",
  },
  {
    icon: Palette,
    title: "DTG + DTF (panel print)",
    desc: "Direct-to-garment for light cottons, DTF heat-transfer film for dark cottons. A4 to A3 print area per panel, no cut-and-sew required. Soft hand, full color, MOQ as low as 50 pcs.",
    best: "Small runs, single-color placements, fashion tees, dropship",
  },
];

const materials = [
  { name: "100% Polyester", gsm: "110–300", use: "Sublimation · DTF" },
  { name: "Poly-spandex", gsm: "180–260", use: "Sublimation · Compression" },
  { name: "100% Cotton", gsm: "180–220", use: "Allover digital · DTG · DTF" },
  { name: "Organic Cotton", gsm: "200–220", use: "GOTS · DTG · DTF" },
  { name: "Poly-cotton blend", gsm: "180–240", use: "Sublimation · DTG" },
  { name: "Pique / French terry", gsm: "200–320", use: "Sublimation · DTF" },
  { name: "Polar fleece", gsm: "200–300", use: "Sublimation" },
  { name: "Recycled rPET", gsm: "140–280", use: "Sublimation · GRS" },
];

const categories = [
  {
    num: "01",
    name: "T-Shirts",
    desc: "100% cotton or poly. Allover print, edge to edge, no panel seams.",
    href: "/tag/category/t-shirt/",
  },
  {
    num: "02",
    name: "Hoodies",
    desc: "320–400 GSM French Terry. Allover print on front, back, sleeves.",
    href: "/tag/category/hoodie/",
  },
  {
    num: "03",
    name: "Jerseys & Kits",
    desc: "Full sublimation for team sports. Numbers, names, logos included.",
    href: "/tag/category/jersey-kit/",
  },
  {
    num: "04",
    name: "Polo Shirts",
    desc: "Pique or birdseye. Sublimated body, embroidered or printed chest.",
    href: "/tag/category/polo-shirt/",
  },
  {
    num: "05",
    name: "Tank Tops & Camis",
    desc: "Lightweight poly or cotton. Race day, training, layering.",
    href: "/tag/category/tank-top-camis/",
  },
  {
    num: "06",
    name: "Activewear & Leggings",
    desc: "Poly-spandex compression. Sublimation that moves with the fabric.",
    href: "/tag/category/leggings/",
  },
  {
    num: "07",
    name: "Jackets & Outerwear",
    desc: "Insulated ski, snowboard, windshell. Edge-to-edge allover print.",
    href: "/tag/category/jacket/",
  },
  {
    num: "08",
    name: "Flags & Banners",
    desc: "Outdoor fade-resistant sublimation. SEG fabric, feather flags.",
    href: "/products/#flags",
  },
  {
    num: "09",
    name: "Home & Living",
    desc: "Cushions, throws, curtains, aprons. Print your art on soft goods.",
    href: "/products/#home",
  },
  {
    num: "10",
    name: "Bags & Accessories",
    desc: "Drawstring bags, backpacks, caps, bandanas, lanyards.",
    href: "/products/#accessories",
  },
  {
    num: "11",
    name: "Hard Goods",
    desc: "Mousepads, coasters, puzzles, mugs, phone cases, acrylic panels.",
    href: "/products/#hardgoods",
  },
  {
    num: "12",
    name: "Custom Cut & Sew",
    desc: "Your pattern, your labels. Polyester, cotton, or blend — your call.",
    href: "/products/#custom",
  },
];

const industries = [
  "Events & Conferences",
  "Promotional Distributors",
  "Sports Teams & Leagues",
  "Music, Tour & Festival Merch",
  "Trade Show & Display",
  "Corporate & Employee Programs",
  "Apparel Brands & Agencies",
  "Schools & Greek Life",
  "Political Campaigns",
  "Breweries & Hospitality",
  "Endurance & Race Events",
  "E-commerce & Fulfillment",
];

const whyUs = [
  {
    icon: Zap,
    title: "MOQ 50 pcs, no setup fee",
    desc: "We do short runs as seriously as long runs. No screen charges, no setup fees, no minimum reprints. Production starts after artwork approval and deposit.",
  },
  {
    icon: Layers,
    title: "Polyester AND 100% cotton",
    desc: "Most factories pick one. We run both. Sublimation on poly, allover digital print on cotton, DTG/DTF for small panel prints. One supplier, all substrates.",
  },
  {
    icon: Globe,
    title: "DDP to 100+ countries",
    desc: "Yiwu is China's logistics hub. We handle customs, duties, last-mile. US orders ship from our Fontana warehouse in 2–5 days. Landed, duty-paid pricing.",
  },
  {
    icon: FlaskConical,
    title: "In-house chemistry",
    desc: "Cotton needs reactive dyes, proper pre-treatment, steam fixation. We run the full chemistry chain in-house — most sublimation shops skip cotton because they don't have the equipment.",
  },
];

const faqs = [
  {
    q: "What is all-over print?",
    a: "All-over print (also called allover print, AOP, or edge-to-edge print) is a printing process where the graphic covers the entire garment — front, back, sleeves, and any panel — without visible white borders or seams. The fabric is printed first, then cut and sewn into the final garment. This is different from DTG or DTF, which print A4–A3 panels onto a pre-sewn blank.",
  },
  {
    q: "What's the difference between sublimation and all-over print on cotton?",
    a: "Sublimation works on polyester — heat and pressure turn solid dye into gas that bonds with the synthetic fiber. All-over print on cotton uses reactive dyes that bond with natural cellulose fibers; the fabric is pre-treated, printed, then steam-fixed. The visual result is similar (edge-to-edge, photorealistic), but the substrate and chemistry are different. We run both.",
  },
  {
    q: "What is the MOQ for all-over print?",
    a: "MOQ is 50 pieces per design for polyester sublimation, DTG, and DTF. For allover digital print on cotton (cut-and-sew workflow), MOQ is 100 pieces per design. Smaller runs can be quoted case-by-case for established clients.",
  },
  {
    q: "Can you print my exact Pantone color?",
    a: "Sublimation and allover cotton use CMYK process printing — we can hit approximately 85–90% of the Pantone solid-coated range. For exact Pantone matching, we offer DTF with Pantone-specific inks as a premium add-on. Send us your Pantone code and we'll do a strike-off sample before production.",
  },
  {
    q: "How long does production take?",
    a: "Polyester sublimation: 7–12 days. Allover digital print on cotton: 20–25 days (cut-and-sew adds lead time). DTG/DTF: 7–10 days. Air or sea shipping on top — typically 5–10 days for DDP to most countries, or 2–5 days for US domestic from our Fontana warehouse.",
  },
  {
    q: "What file formats do you accept?",
    a: "AI, PSD, PDF, PNG, JPG, SVG, or even a hand sketch. We offer free artwork check and 3D mockup before production. For best results, send vector files (AI, SVG, PDF) at 150 DPI minimum with all fonts outlined.",
  },
  {
    q: "Do you ship DDP (delivered duty paid)?",
    a: "Yes. We ship DDP to 100+ countries — EU, UK, AU, CA, Middle East, Asia, and more. Single invoice, one price, door delivery. Your team never deals with customs paperwork or surprise duty bills. For US clients, we also ship domestically from our Fontana, CA warehouse (2–5 day delivery, zero customs).",
  },
];

const allOverPrintSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://sublimapparel.com/all-over-print/#webpage",
      url: "https://sublimapparel.com/all-over-print/",
      name: "All-Over Print Manufacturer | Edge-to-Edge Sublimation & Cotton",
      description:
        "Yiwu factory producing all-over print clothing — polyester sublimation, allover digital print on cotton, DTG, DTF, cut-and-sew. MOQ 50 pcs, no setup fee, DDP to 100+ countries.",
      keywords:
        "all-over print, all over print manufacturer, sublimation all over print, all over print t-shirt, all over print hoodie, all over print factory, edge to edge printing, full body sublimation, cut and sew sublimation, allover digital print cotton, sublimation China factory, DDP sublimation printing",
      inLanguage: "en",
      isPartOf: {
        "@id": "https://sublimapparel.com/#website",
      },
      about: {
        "@type": "Service",
        name: "All-Over Print Manufacturing",
        serviceType: "Custom Apparel Manufacturing",
        provider: { "@id": "https://sublimapparel.com/#organization" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sublimapparel.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "All-Over Print",
          item: "https://sublimapparel.com/all-over-print/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function AllOverPrintPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allOverPrintSchema),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/factory-floor.webp"
            alt="All-over print production line in Yiwu factory — 1.9m sublimation printer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80 brightness-110"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.2) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-8">
            <div className="mb-4 inline-flex items-center gap-2 bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" />
              All-Over Print · Edge to Edge
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              All-over print.
              <br />
              <span className="text-[#ff4d00]">Any material.</span>
              <br />
              Any product.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-200 md:text-xl">
              Yiwu factory specializing in edge-to-edge all-over print on
              polyester, 100% cotton, and blends. Sublimation, allover digital
              print, DTG, DTF, cut-and-sew — one supplier, all substrates.{" "}
              <strong className="text-white">MOQ 50 pcs.</strong>{" "}
              <strong className="text-white">No setup fee.</strong>{" "}
              <strong className="text-white">DDP worldwide.</strong>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#ff5d1a]"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products/all/"
                className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
              >
                Browse 100 products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-neutral-300">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#ff4d00]" /> MOQ 50 pcs
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#ff4d00]" /> No setup fee
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#ff4d00]" /> 7–25 day lead time
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#ff4d00]" /> DDP 100+ countries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS ALL-OVER PRINT */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              001
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              What is all-over print?
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-lg leading-relaxed text-neutral-700">
                <strong>All-over print (AOP)</strong> is a production process
                where the fabric is printed first, then cut and sewn into the
                final garment. Because the print covers the entire fabric
                surface, the finished product has edge-to-edge graphics on
                front, back, sleeves, and every panel — no white borders, no
                visible panel seams in the middle of the artwork.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                This is fundamentally different from screen printing, DTG, and
                DTF, which all print <em>onto</em> a pre-sewn blank within an
                A4–A3 frame per panel. For designs with continuous full-bleed
                graphics — gradients, photographic backgrounds, all-over
                patterns — AOP is the only way to get a true edge-to-edge
                result.
              </p>
            </div>
            <div className="rounded-lg border-2 border-black bg-neutral-50 p-6">
              <h3 className="text-lg font-black uppercase tracking-tight">
                Two ways to get AOP
              </h3>
              <ol className="mt-4 space-y-3 text-base text-neutral-800">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#ff4d00] text-sm font-black text-white">
                    1
                  </span>
                  <span>
                    <strong>Polyester sublimation</strong> — print on poly,
                    cut & sew. Soft hand, vibrant color, MOQ 50.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#ff4d00] text-sm font-black text-white">
                    2
                  </span>
                  <span>
                    <strong>Allover digital print on cotton</strong> — print on
                    cotton with reactive dyes, cut & sew. Same look, real
                    cotton, MOQ 100.
                  </span>
                </li>
              </ol>
              <p className="mt-4 text-sm text-neutral-600">
                Both produce seamless all-over results. The choice depends on
                your fabric preference, order size, and end use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PROCESSES */}
      <section className="border-b-2 border-black bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              002
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Three print processes. One factory.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {processes.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-lg border-2 border-black bg-white p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-[#ff4d00] text-white">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-700">
                  {p.desc}
                </p>
                <div className="mt-4 border-t-2 border-black pt-3 text-xs font-bold uppercase tracking-wide text-[#ff4d00]">
                  Best for: <span className="text-black">{p.best}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIAL MATRIX */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              003
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Materials we print on
            </h2>
          </div>
          <p className="mb-8 max-w-3xl text-lg text-neutral-700">
            Eight substrate families, all printable in-house. Stocked in
            standard weights, custom GSM available for orders over 500 pcs.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black text-left">
              <thead>
                <tr className="bg-[#0a0a0a] text-white">
                  <th className="px-4 py-3 text-sm font-black uppercase tracking-wide">
                    Material
                  </th>
                  <th className="px-4 py-3 text-sm font-black uppercase tracking-wide">
                    GSM range
                  </th>
                  <th className="px-4 py-3 text-sm font-black uppercase tracking-wide">
                    Compatible processes
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr
                    key={m.name}
                    className={
                      i % 2 === 0
                        ? "border-b border-neutral-200 bg-white"
                        : "border-b border-neutral-200 bg-neutral-50"
                    }
                  >
                    <td className="px-4 py-3 font-bold text-black">
                      {m.name}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{m.gsm}</td>
                    <td className="px-4 py-3 text-neutral-700">{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Link
              href="/fabric/"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#ff4d00] hover:underline"
            >
              See full fabric catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12 CATEGORIES */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              004
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              12 categories. 100 products.
            </h2>
          </div>
          <p className="mb-8 max-w-3xl text-lg text-neutral-300">
            From t-shirts to trade-show SEG fabric, from ski jackets to
            ceramic mugs. Every product in our catalog supports all-over
            print.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.num}
                href={c.href}
                className="group flex gap-4 rounded-lg border-2 border-white/10 bg-white/5 p-5 transition hover:border-[#ff4d00] hover:bg-white/10"
              >
                <div className="font-mono text-2xl font-black text-[#ff4d00]">
                  {c.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black transition group-hover:text-[#ff4d00]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-300">{c.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 self-center text-neutral-400 transition group-hover:translate-x-1 group-hover:text-[#ff4d00]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              005
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Why all-over print with us
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="rounded-lg border-2 border-black bg-neutral-50 p-5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-[#ff4d00] text-white">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b-2 border-black bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              006
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Who we make all-over print for
            </h2>
          </div>
          <p className="mb-8 max-w-3xl text-lg text-neutral-700">
            12 industries. From marathon organizers to music festivals, from
            corporate gifting to political campaigns. Click any to see case
            studies and product samples.
          </p>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {industries.map((ind, i) => {
              const slug = ind
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return (
                <Link
                  key={ind}
                  href={`/cases/${slug}/`}
                  className="group flex items-center justify-between rounded border-2 border-black bg-white p-4 transition hover:bg-[#ff4d00] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#ff4d00] group-hover:text-white">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="text-sm font-bold">{ind}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-[#ff4d00]">
              007
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              All-over print FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-lg border-2 border-black bg-white open:bg-neutral-50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-black">
                  <span>{f.q}</span>
                  <span className="text-2xl text-[#ff4d00] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-base leading-relaxed text-neutral-700">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24">
          <div className="mb-4 inline-flex items-center gap-2 bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            <Zap className="h-3.5 w-3.5" /> Reply within 1 business day
          </div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Send us your design.
            <br />
            Get a landed, duty-paid quote.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
            We will reply with a single line item — unit price + shipping +
            duties — no hidden fees, no surprise add-ons. If your deadline is
            not achievable, we will say so in the same reply.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-widest text-white transition hover:bg-[#ff5d1a]"
            >
              Get a quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/products/all/"
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-base font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
            >
              Browse 100 products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
