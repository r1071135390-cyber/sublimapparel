import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Contact } from "@/components/contact";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { tagArchiveLink, resolveArchiveLink } from "@/lib/tag-utils";
import { CATEGORY_TAGS } from "@/lib/tag-archive";
import { KeywordCloud } from "@/components/keyword-cloud";

export const metadata = buildPageMetadata({
    title: "Which Custom Apparel Do You Need? — 123 Products, 14 Categories, MOQ 50",
    description: "Custom sublimated apparel for B2B: t-shirts, jerseys, hoodies, cycling kits, golf polos, racing suits. No setup fees, MOQ 50 pcs, full color all-over print, sa…",
    keywords: ["custom sublimation apparel", "all-over print manufacturer", "sublimated t-shirts", "custom jerseys", "sublimation hoodies", "cycling kits custom", "golf polos custom", "racing suits sublimation", "B2B apparel manufacturer", "MOQ 50 custom apparel", "all over print t-shirts", "sublimation factory China"],
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
    ogTitle: "Which Custom Apparel Do You Need? — 123 Products, 14 Categories",
    ogDescription: "123 custom sublimated apparel products for B2B: t-shirts, jerseys, hoodies, cycling kits, golf polos, racing suits, plus 100…",
  });;

type CategoryItem = { name: string; category?: keyof typeof CATEGORY_TAGS };

const categories: Array<{
  id: string;
  title: string;
  desc: string;
  items: CategoryItem[];
  note: string;
}> = [
  {
    id: "apparel",
    title: "Apparel",
    desc: "14 garment types: t-shirts, hoodies, jerseys, sportswear, polos, jackets, pants, skirts, shirts, tanks, uniforms, caps, home wear — all sublimation-ready.",
    items: [
      { name: "T-Shirts", category: "T-Shirt" },
      { name: "Hoodies", category: "Hoodie" },
      { name: "Sweatshirts", category: "Sweatshirt" },
      { name: "Jerseys", category: "Jersey" },
      { name: "Sportswear", category: "Sportswear" },
      { name: "Polo Shirts", category: "Polo Shirt" },
      { name: "Jackets", category: "Jacket" },
      { name: "Pants & Shorts", category: "Pants" },
      { name: "Skirts", category: "Skirt" },
      { name: "Shirts", category: "Shirt" },
      { name: "Tank Tops & Camis", category: "Tank Top & Camis" },
      { name: "Uniform & Workwear", category: "Uniform & Workwear" },
      { name: "Caps & Hats", category: "Cap" },
      { name: "Home Wear", category: "Home" },
    ],
    note: "Polyester or 100% cotton. Cotton runs on DTG/DTF (A4–A3 per panel); polyester runs on sublimation (true all-over, edge-to-edge). Allover digital print on cotton also available (cut-and-sew, true full-body, MOQ 50 pcs).",
  },
  {
    id: "home",
    title: "Home & Living",
    desc: "Custom printed home textiles. Bright patterns, soft fabrics, ready for retail or e-commerce.",
    items: [
      { name: "Throw Pillows" },
      { name: "Cushion Covers" },
      { name: "Blankets & Throws" },
      { name: "Curtains & Drapes" },
      { name: "Tablecloths" },
      { name: "Towels" },
      { name: "Bedding Sets" },
    ],
    note: "Polyester, cotton, or blended fabrics. Custom sizes available.",
  },
  {
    id: "accessories",
    title: "Bags & Accessories",
    desc: "Custom printed bags, hats, and fashion accessories. Great for events and brand merch.",
    items: [
      { name: "Drawstring Bags" },
      { name: "Backpacks" },
      { name: "Tote Bags" },
      { name: "Baseball Caps" },
      { name: "Bucket Hats" },
      { name: "Scarves & Bandanas" },
      { name: "Lanyards" },
      { name: "Aprons" },
    ],
    note: "Durable sublimation-ready materials. Custom hardware and closures.",
  },
  {
    id: "flags",
    title: "Flags & Banners",
    desc: "Indoor and outdoor flags, banners, and signage. Vibrant colors, fade-resistant.",
    items: [
      { name: "Garden Flags" },
      { name: "Beach Flags" },
      { name: "Hand Flags" },
      { name: "Trade Show Banners" },
      { name: "Pull-Up Banners" },
      { name: "Pennant Strings" },
    ],
    note: "Knitted polyester, flag fabric, or mesh. Pole pockets and hemming included.",
  },
  {
    id: "hardgoods",
    title: "Hard Goods & Lifestyle",
    desc: "Sublimation-ready hard goods and lifestyle products. Perfect for e-commerce and gifting.",
    items: [
      { name: "Mouse Pads" },
      { name: "Coasters" },
      { name: "Puzzles" },
      { name: "Phone Cases" },
      { name: "AirPods Cases" },
      { name: "Mugs (wrap print)" },
      { name: "Keychains" },
      { name: "Magnets" },
    ],
    note: "Pre-treated sublimation blanks. Custom shapes and packaging available.",
  },
  {
    id: "custom",
    title: "Custom Projects",
    desc: "Got something else? We love weird one-offs. Send us your idea and we'll figure out how to print it.",
    items: [
      { name: "Pet Apparel" },
      { name: "Shoe Uppers" },
      { name: "Lampshades" },
      { name: "Wall Art" },
      { name: "Festival Costumes" },
      { name: "Theatre Costumes" },
      { name: "Promotional Items" },
      { name: "Anything else you imagine" },
    ],
    note: "Tell us what you need. If it can be sublimated, we can probably do it.",
  },
];

const comparison = [
  { feature: "Print method", poly: "Dye-sublimation transfer", cotton: "Cotton-sublimation coating" },
  { feature: "Color vibrancy", poly: "Excellent", cotton: "Excellent (slightly softer)" },
  { feature: "Hand feel", poly: "Smooth, lightweight", cotton: "Soft, natural cotton feel" },
  { feature: "Durability", poly: "Won't fade, peel, or crack", cotton: "Won't fade, peel, or crack" },
  { feature: "Best for", poly: "Sports, performance, lightweight", cotton: "Fashion, lifestyle, premium feel" },
  { feature: "MOQ", poly: "50 pcs", cotton: "50 pcs" },
];

export default function ProductsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        {/* Full-bleed background image with floating text overlay */}
        <div className="relative h-[85vh] min-h-[640px] w-full">
          <Image
            src="/product-hero-products.webp"
            alt="Range of custom printed products — apparel, bags, home goods, hard substrates"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Floating text overlay */}
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6">
            <div className="max-w-2xl">
              <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                Products
              </div>
              <h1
                className="whitespace-nowrap text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl lg:text-8xl"
                style={{
                  WebkitTextStroke: "2px #ffffff",
                  paintOrder: "stroke fill",
                }}
              >
                Whatever you need
                <br />
                to customize
                <br />
                <span
                  className="text-[#cc3d00]"
                  style={{
                    WebkitTextStroke: "2px #ffffff",
                    paintOrder: "stroke fill",
                  }}
                >
                  we make it.
                </span>
              </h1>
              <p
                className="mt-6 max-w-xl text-base leading-snug text-black md:text-lg"
                style={{
                  WebkitTextStroke: "1px #ffffff",
                  paintOrder: "stroke fill",
                }}
              >
                Apparel is our bread and butter — but we print home goods, bags, flags, hard
                goods, and whatever custom project you bring us. Polyester or 100% cotton.
              </p>

              {/* Quick-filter tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { name: "All products", href: "/products/all/" },
                  { name: "Teams & Sports", href: "/teams-sports-apparel/" },
                  { name: "Events & Conferences", href: "/event-festivals-conferences/" },
                  { name: "Corporate Apparel", href: "/corporate-organization-apparel/" },
                  { name: "Promotional & Marketing", href: "/promotional-marketing-apparel/" },
                  { name: "Apparel Brands & Agencies", href: "/apparel-brands-agencies/" },
                  { name: "E-commerce & Fulfillment", href: "/e-commerce-fulfillment/" },
                ].map((q) => (
                  <Link
                    key={q.name}
                    href={q.href}
                    className="border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wide text-black transition-colors hover:bg-[#ff4d00] hover:text-white"
                  >
                    {q.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by category — 14 apparel categories */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="mb-5 text-center md:mb-7">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
              Browse by category
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-3xl">
              14 apparel categories, ready to print
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {Object.entries(CATEGORY_TAGS).map(([key, cat]) => (
              <Link
                key={key}
                href={tagArchiveLink("category", key)}
                className="group inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-2 text-xs font-black uppercase tracking-wide text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white hover:shadow-[3px_3px_0_0_#000] md:px-5 md:py-2.5 md:text-sm"
              >
                <span className="text-base md:text-lg" aria-hidden="true">
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 100-product catalog callout */}
      <section className="border-b-2 border-black bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-sm bg-[#ff4d00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest md:text-xs">
                <Sparkles className="h-3 w-3" />
                All-over print apparel catalog
              </div>
              <h2 className="mb-3 text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
                Browse our all-over print products
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                Cross-filter by garment (14 types), sport (42), and scenario (25). Polyester sublimation + all-over digital print on cotton. MOQ 50 pcs, DDP to door.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
              <Link
                href="/products/all/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#e64500] md:text-base"
              >
                See all products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-[10px] uppercase tracking-widest text-white/50 md:text-xs">
                Filter by sport, scenario &amp; garment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY KEYWORD — SEO */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
              Cross-link every page
            </p>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Jump to your custom apparel by keyword
            </h2>
            <p className="mt-3 text-sm text-black/70 md:text-base">
              {`Pick a sport, a use case, or an apparel type below — every link routes to a curated tag page with sublimation-printed garments ready for DDP shipping to your door. ${Object.keys(CATEGORY_TAGS).length} apparel types · 42 sports · 25 use cases.`}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <KeywordCloud dimension="category" title="By apparel type" />
            <KeywordCloud dimension="sport" title="By sport" />
            <KeywordCloud dimension="scenario" title="By use case" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="space-y-12">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                id={cat.id}
                className="border-2 border-black bg-white p-8 scroll-mt-32"
              >
                <div className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                      Category 0{i + 1}
                    </div>
                    <h2 className="text-4xl font-black text-black md:text-5xl">
                      {cat.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-black/70">
                      {cat.desc}
                    </p>
                    <p className="mt-4 border-l-4 border-[#00c2ff] pl-3 text-sm font-bold text-black/80">
                      {cat.note}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {cat.items.map((item) => {
                        const itemName = item.name;
                        // If item has an active category, link to it; otherwise link to /products/all/
                        const itemHref =
                          item.category && CATEGORY_TAGS[item.category]
                            ? tagArchiveLink("category", item.category)
                            : "/products/all/";
                        return (
                          <Link
                            key={itemName}
                            href={itemHref}
                            className="group flex items-center justify-between border-2 border-black bg-[#faf9f6] px-3 py-2.5 text-sm font-black text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white hover:shadow-[3px_3px_0_0_#000]"
                          >
                            <span>{itemName}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={3} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials comparison */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8">
            <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Materials
            </div>
            <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
              Polyester
              <br />
              <span className="italic">or 100% cotton.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
              Most sublimation factories can only print on polyester. We can print on both —
              with the same vivid color and durable finish.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-black text-white">
                    Feature
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#00c2ff]/10 text-black">
                    100% Polyester
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#ff4d00]/10 text-black">
                    100% Cotton
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}
                  >
                    <td className="p-4 text-sm font-black uppercase tracking-wider text-black">
                      {row.feature}
                    </td>
                    <td className="p-4 text-sm text-black/80">{row.poly}</td>
                    <td className="p-4 text-sm text-black/80">{row.cotton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-2 border-[#ff4d00] bg-[#ff4d00]/5 p-6">
            <div className="text-xs font-black uppercase tracking-widest text-[#cc3d00]">
              Our specialty
            </div>
            <p className="mt-2 text-lg font-bold text-black">
              Allover digital print on 100% cotton is rare. We run it in-house — true edge-to-edge, cut-and-sew workflow, photorealistic color, soft hand feel. MOQ 50 pcs per design.
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
