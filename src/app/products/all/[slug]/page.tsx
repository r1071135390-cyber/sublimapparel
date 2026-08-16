import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles, ArrowRight, Truck, Ruler } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { tagArchiveLink } from "@/lib/tag-utils";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
  type ProductCategory,
  type Sport,
  type Scenario,
} from "@/lib/products-data";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { ProductGallery } from "@/components/product-gallery";
import { getProductImages } from "@/lib/product-images";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const sportTags = product.sports.length ? ` for ${product.sports.slice(0, 3).join(", ")}` : "";
  return {
    title: `${product.name} — Custom All-Over Print | MOQ ${product.moq}`,
    description: `${product.name}. ${product.description} ${product.fabrics.length} fabric options${sportTags}. MOQ ${product.moq} pcs, DDP worldwide.`,
    keywords: [
      product.name,
      product.category.toLowerCase(),
      "all-over print",
      "custom apparel",
      "sublimation",
      "all-over digital print on cotton",
      "DDP apparel factory",
      "Yiwu apparel factory",
      ...product.sports.map((s) => `${s.toLowerCase()} jersey`),
    ],
    alternates: { canonical: `./` },
    openGraph: {
      title: `${product.name} — Custom All-Over Print`,
      description: product.description,
      url: `/products/all/${product.slug}/`,
      type: "website",
      images: ["/hero-products.webp"],
    },
  };
}

const PLACEHOLDER_GRADIENTS = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-teal-500 to-green-500",
];

function getGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return PLACEHOLDER_GRADIENTS[Math.abs(hash) % PLACEHOLDER_GRADIENTS.length];
}

function getCategoryEmoji(category: ProductCategory) {
  const map: Partial<Record<ProductCategory, string>> = {
    "Hoodie": "🧥",
    "T-Shirt": "👕",
    "Pants": "👖",
    "Sweatshirt": "👕",
    "Tank Top & Camis": "🎽",
    "Sportswear": "🏃",
    "Shirt": "👔",
    "Home": "🏠",
    "Skirt": "👗",
    "Polo Shirt": "👔",
    "Cap": "🧢",
    "Jacket": "🧥",
  };
  return map[category] ?? "👕";
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const gradient = getGradient(product.id);
  const emoji = getCategoryEmoji(product.category);

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products/" },
    { name: "All Products", path: "/products/all/" },
    { name: product.name, path: `/products/all/${product.slug}/` },
  ]);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: "https://sublimapparel.com/hero-products.webp",
    brand: { "@type": "Brand", name: "SublimApparel" },
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/MadeToOrder",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      url: `https://sublimapparel.com/products/all/${product.slug}/`,
      seller: { "@type": "Organization", name: "SublimApparel" },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={productLd} />

      {/* HERO BAND */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0A0A0A] text-white">
        <div className="absolute inset-0 opacity-30">
          <div
            className={`h-full w-full bg-gradient-to-br ${gradient}`}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <Link
            href="/products/all/"
            className="mb-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white md:text-xs"
          >
            <ArrowLeft className="h-3 w-3" />
            All 100 products
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest md:text-xs">
            <span className="rounded-sm bg-[#ff4d00] px-2 py-1 text-white">{product.category}</span>
            <span className="rounded-sm bg-white/15 px-2 py-1 text-white backdrop-blur-sm">
              MOQ {product.moq} pcs
            </span>
            {product.sports.slice(0, 2).map((s) => (
              <span key={s} className="rounded-sm bg-white/15 px-2 py-1 text-white backdrop-blur-sm">
                {s}
              </span>
            ))}
          </div>
          <h1 className="mb-3 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-tight md:mb-4 md:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            {product.description}
          </p>
        </div>
      </section>

      {/* IMAGE + SPEC */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            <ProductGallery
              images={getProductImages(product.number)}
              productName={product.name}
            />

            {/* Specs */}
            <div>
              <div className="mb-6 border-b-2 border-black pb-3 md:mb-8 md:pb-4">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] md:text-xs">
                  Specs at a glance
                </p>
                <h2 className="text-2xl font-black uppercase leading-tight text-black md:text-3xl">
                  {product.fabrics.length} fabric options
                </h2>
              </div>

              <div className="space-y-2 md:space-y-3">
                {product.fabrics.map((f, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 border-2 border-black/10 bg-[#f5f5f5] p-3 md:flex-row md:items-center md:justify-between md:gap-4 md:p-4"
                  >
                    <div className="flex-1">
                      <div className="text-[11px] font-black uppercase text-black md:text-sm">
                        {f.material}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[#6b6b6b] md:text-xs">
                        {f.process}
                      </div>
                      {f.gsmOptions && (
                        <div className="mt-0.5 text-[10px] text-[#6b6b6b] md:text-[11px]">
                          GSM: {f.gsmOptions}
                        </div>
                      )}
                    </div>
                    <div className="rounded-sm bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black md:text-xs">
                      {f.gsm}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row md:mt-8">
                <Link
                  href="/get-a-quote/"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-4 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#e64500] md:text-base"
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border-2 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-wide text-black transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00] md:text-base"
                >
                  Request a sample
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAGS BY DIMENSION */}
      <section className="border-y-2 border-black bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] md:text-xs">
            Cross-reference this product
          </p>
          <h2 className="mb-6 text-2xl font-black uppercase leading-tight tracking-tight md:mb-8 md:text-3xl">
            Where this fits
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div>
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/60 md:text-xs">
                Sports ({product.sports.length})
              </h3>
              {product.sports.length === 0 ? (
                <p className="text-sm text-white/50">— no specific sport —</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {product.sports.map((s) => (
                    <Link
                      key={s}
                      href={tagArchiveLink("sport", s)}
                      className="rounded-sm border-2 border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00] md:text-xs"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/60 md:text-xs">
                Scenarios ({product.scenarios.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.scenarios.map((s) => (
                  <Link
                    key={s}
                    href={tagArchiveLink("scenario", s)}
                    className="rounded-sm border-2 border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#00c2ff] hover:bg-[#00c2ff] md:text-xs"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/60 md:text-xs">
                Garment type
              </h3>
              <Link
                href={tagArchiveLink("category", product.category)}
                className="inline-flex rounded-sm border-2 border-[#ff4d00] bg-[#ff4d00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64500] md:text-xs"
              >
                {product.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE MAKE IT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 border-b-2 border-black pb-4 md:mb-12 md:pb-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
              Production, in-house
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-4xl">
              How we make {product.category.toLowerCase()}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {product.fabrics
              .filter((f) => f.process.toLowerCase().includes("sublimation"))
              .slice(0, 4)
              .map((f, i) => (
                <div key={i} className="border-2 border-black bg-[#f5f5f5] p-4 md:p-6">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d00] text-sm font-black text-white md:h-10 md:w-10 md:text-base">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-sm font-black uppercase text-black md:text-base">
                    {f.process}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[#3a3a3a] md:text-xs">
                    CMYK ink infused into {f.material.toLowerCase()} fibers at 200°C. Permanent,
                    breathable, no cracking or peeling.{" "}
                    {f.gsm !== "—" && `Standard ${f.gsm}.`}
                  </p>
                </div>
              ))}
            {product.fabrics
              .filter((f) => f.process.toLowerCase().includes("all-over digital print on cotton"))
              .slice(0, 4)
              .map((f, i) => (
                <div key={`cot-${i}`} className="border-2 border-black bg-[#f5f5f5] p-4 md:p-6">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#00c2ff] text-sm font-black text-white md:h-10 md:w-10 md:text-base">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-sm font-black uppercase text-black md:text-base">
                    {f.process}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[#3a3a3a] md:text-xs">
                    Cut & sew workflow — pre-cut fabric printed in panels, then assembled. Full
                    edge-to-edge coverage on {f.material.toLowerCase()}.
                    {f.gsm !== "—" && ` Standard ${f.gsm}.`}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="border-t-2 border-black bg-[#f5f5f5]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
            <div className="mb-6 flex items-end justify-between border-b-2 border-black pb-4 md:mb-10 md:pb-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] md:text-xs">
                  Cross-sell
                </p>
                <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-3xl">
                  Related products
                </h2>
              </div>
              <Link
                href="/products/all/"
                className="hidden text-[10px] font-bold uppercase tracking-wide text-[#ff4d00] hover:underline md:inline md:text-xs"
              >
                See all 100 →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/all/${p.slug}/`}
                  className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
                >
                  <div
                    className={`flex aspect-square w-full items-center justify-center border-b-2 border-black bg-gradient-to-br ${getGradient(p.id)} text-5xl md:text-7xl`}
                  >
                    <span className="opacity-80">{getCategoryEmoji(p.category)}</span>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-[11px] font-black uppercase leading-tight text-black md:text-sm">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[9px] uppercase tracking-wide text-[#6b6b6b] md:text-[10px]">
                      {p.category} · MOQ {p.moq}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BAND */}
      <section className="border-t-2 border-black bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] md:text-xs">
                Ready to order?
              </p>
              <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
                Send artwork.<br />
                Get a quote in 1 business day.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-4 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-[#e64500] md:text-base"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white bg-transparent px-4 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-white hover:text-black md:text-base"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
