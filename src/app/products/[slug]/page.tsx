import type { Metadata } from "next";
import { productTypes, productBySlug, productCategoryDisplay } from "@/lib/products-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productTypes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Custom ${product.name} | SublimApparel`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const categoryLabel = productCategoryDisplay[product.category] || product.category;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#ff4d00] transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 border border-[#ff4d00] text-[#ff4d00]">
                  {product.plate}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 border border-white/20 text-white/60">
                  {categoryLabel}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 border border-white/20 text-white/60">
                  {product.process}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5 bg-white/10 border border-white/15 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-square bg-white/5 border border-white/10 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                About this {product.name.toLowerCase()}
              </h2>
              <div className="prose prose-lg max-w-none text-black/80 space-y-4">
                <p>
                  Our factory produces custom sublimated {product.name.toLowerCase()} for B2B
                  clients worldwide. We handle the full workflow in-house: pattern making,
                  fabric sourcing, sublimation printing, cutting, sewing, QC, and DDP
                  shipping.
                </p>
                <p>
                  {product.sku && /^\d+$/.test(product.sku) && (
                    <>We currently have <strong>{product.sku} active SKUs</strong> in this
                    category, covering multiple cuts, fabric weights, and print options.
                    </>
                  )}
                  {product.fabricCount > 0 && (
                    <>
                      {" "}
                      Available in <strong>{product.fabricCount} fabric options</strong>,
                      including 100% polyester, cotton, poly-cotton blends, and performance
                      knits.
                    </>
                  )}
                </p>
                <p>
                  Minimum order quantity starts at <strong>50 pieces</strong> per design, with
                  sample turnaround in 5–7 business days. Bulk production typically runs
                  15–25 days depending on quantity and complexity.
                </p>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight mt-12 mb-4">
                What we can do
              </h3>
              <ul className="space-y-3 text-black/80">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                  <span>Full-color all-over sublimation print (edge-to-edge, photographic detail)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                  <span>Custom patterns, team logos, brand artwork, and Pantone color matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                  <span>Cut and sewn to your spec — your pattern, your fit, your label</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                  <span>DDP shipping to 50+ countries — door-to-door, customs handled</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#ff4d00] flex-shrink-0 mt-0.5" />
                  <span>Sample runs as low as 1 piece, bulk MOQ 50 pieces per design</span>
                </li>
              </ul>
            </div>

            <aside>
              <div className="border border-black/10 bg-[#fafafa] p-6">
                <h3 className="text-sm font-bold tracking-widest uppercase text-black/60 mb-4">
                  Quick facts
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-black/60">Category</dt>
                    <dd className="font-semibold">{categoryLabel}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-black/60">Plate</dt>
                    <dd className="font-semibold">{product.plate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-black/60">Process</dt>
                    <dd className="font-semibold">{product.process}</dd>
                  </div>
                  {product.fabricCount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-black/60">Fabric options</dt>
                      <dd className="font-semibold">{product.fabricCount}</dd>
                    </div>
                  )}
                  {product.sku && /^\d+$/.test(product.sku) && (
                    <div className="flex justify-between">
                      <dt className="text-black/60">Active SKUs</dt>
                      <dd className="font-semibold">{product.sku}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-black/60">MOQ</dt>
                    <dd className="font-semibold">50 pcs</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-black/60">Sample time</dt>
                    <dd className="font-semibold">5–7 days</dd>
                  </div>
                </dl>
                <Link
                  href="/contact"
                  className="mt-6 block text-center bg-[#ff4d00] hover:bg-[#e63d00] text-white font-bold py-3 px-6 transition"
                >
                  Request a quote
                </Link>
              </div>

              {product.url && (
                <div className="mt-6 border border-black/10 p-6 text-sm">
                  <p className="text-black/60 mb-2">Reference SKU</p>
                  <p className="font-mono text-xs text-black/80 mb-3">{product.spu}</p>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff4d00] font-semibold hover:underline"
                  >
                    See example product →
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <RelatedProducts currentSlug={product.slug} tags={product.tags} />
    </main>
  );
}

function RelatedProducts({ currentSlug, tags }: { currentSlug: string; tags: string[] }) {
  const related = productTypes
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, 8);
  if (related.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
          Related products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex flex-col bg-white border border-black/10 hover:border-[#ff4d00] transition"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ff4d00] mb-1">
                  {p.process}
                </p>
                <h3 className="font-bold text-sm leading-tight line-clamp-2">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
