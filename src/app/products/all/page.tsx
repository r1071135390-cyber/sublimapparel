import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { Sparkles, ArrowRight, Truck, BadgeCheck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProductCatalog } from "@/components/product-catalog";
import { HeroGallery } from "@/components/hero-gallery";
import { products, allSports, allScenarios } from "@/lib/products-data";
import { pickHeroImagesWithAlts } from "@/lib/product-images";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata = buildPageMetadata({
    title: "100 All-Over Print Products | Apparel by Garment, Sport",
    description: "100 all-over print apparel products, cross-filtered by garment type (29), sport (42) and scenario (27). From polyester sublimation to all-over digital print on…",
    keywords: ["all-over print catalog", "sublimation apparel wholesale", "all-over digital print on cotton", "custom jerseys China", "DDP apparel factory", "Yiwu apparel factory", "custom workwear China", "promotional apparel bulk"],
    alternates: { canonical: "./" },
    ogTitle: "100 All-Over Print Products | Apparel by Garment, Sport",
    ogDescription: "100 all-over print apparel products, cross-filtered by garment, sport and scenario. Polyester sublimation + all-over digital…",
    ogImage: "/products/all/",
  });;

const breadcrumbLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Products", path: "/products/" },
  { name: "All Products", path: "/products/all/" },
]);

export default function AllProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0A0A0A] text-white">
        <div className="absolute inset-0 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,77,0,0.35) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,194,255,0.25) 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The full catalog · {products.length} products</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:items-end">
            <div>
              <h1 className="mb-4 text-3xl font-black uppercase leading-[0.95] tracking-tight md:mb-6 md:text-5xl lg:text-6xl">
                Pick a garment.<br />
                Pick a sport.<br />
                <span className="text-[#cc3d00]">Pick a scenario.</span>
              </h1>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/80 md:mb-8 md:text-base">
                {products.length} all-over print products, cross-filtered three ways. Polyester sublimation or all-over digital print on cotton. MOQ {products[0]?.moq ?? 50} pcs. DDP to your door — duty paid.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
                  {products.length} products
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c2ff]" />
                  {allSports.length} sports
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {allScenarios.length} scenarios
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm md:text-xs">
                  <Truck className="h-3 w-3" />
                  DDP worldwide
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-a-quote/"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-[#e64500] md:text-base"
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#catalog"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-transparent px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Filter the catalog ↓
                </Link>
              </div>
            </div>
            <HeroGallery images={pickHeroImagesWithAlts(products, 4, "all-products")} />
          </div>
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <section className="border-b-2 border-black bg-[#1A1A1A] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            { value: "50", label: "Min. order qty" },
            { value: "14–20d", label: "Sample lead" },
            { value: "25–35d", label: "Bulk lead" },
            { value: "DDP", label: "Door-to-door" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 text-center md:p-6">
              <div className="text-2xl font-black tracking-tight md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/80 md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG WITH 3-DIM FILTER */}
      <ProductCatalog />

      {/* HOW IT WORKS — closed loop */}
      <section className="border-t-2 border-black bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 text-center md:mb-12">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
              Closed loop, in-house
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              One factory. From yarn to door.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { step: "01", title: "Pick", body: "Choose your product, fabric, GSM, technique — anything custom." },
              { step: "02", title: "Sample", body: "Free mockup + paid sample in 7–10 days, shipped express." },
              { step: "03", title: "Bulk", body: "25–35 day production, in-line QC at 4 stages, AQL 2.5 final." },
              { step: "04", title: "Door", body: "DDP to your warehouse — duties paid, customs cleared." },
            ].map((s) => (
              <div key={s.step} className="border-2 border-white/15 bg-white/5 p-4 md:p-6">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d00] text-base font-black text-black md:h-12 md:w-12 md:text-xl">
                  {s.step}
                </div>
                <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-white md:text-lg">
                  {s.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-white/70 md:text-sm">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 rounded-sm bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-[#e64500] md:text-base"
            >
              Get a quote on your pick
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b-2 border-t-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: <BadgeCheck className="h-6 w-6 text-[#cc3d00]" />,
                title: "BSCI / SEDEX audited",
                body: "Independent social-compliance audits every 12 months.",
              },
              {
                icon: <Truck className="h-6 w-6 text-[#0078a8]" />,
                title: "DDP to 50+ countries",
                body: "Duty-paid door delivery via our DDP logistics partner.",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-[#cc3d00]" />,
                title: "20 decoration techniques",
                body: "Sublimation, DTG, DTF, screen, embroidery, 3D puff, rhinestone — all in-house.",
              },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-3 border-l-4 border-[#ff4d00] bg-[#f5f5f5] p-4 md:p-5">
                <div className="shrink-0">{t.icon}</div>
                <div>
                  <h3 className="mb-1 text-sm font-black uppercase text-black md:text-base">
                    {t.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[#6b6b6b] md:text-xs">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
