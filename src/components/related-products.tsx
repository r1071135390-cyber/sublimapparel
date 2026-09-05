import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products, type Product } from "@/lib/products-data";
import { SOLUTIONS, INDUSTRIES, filterProductsBySolution, filterProductsByIndustry } from "@/lib/taxonomy";

interface RelatedProductsProps {
  solutionSlug?: string;
  industrySlug?: string;
  limit?: number;
  title?: string;
  description?: string;
  emptyMessage?: string;
}

export function RelatedProducts({
  solutionSlug,
  industrySlug,
  limit = 8,
  title,
  description,
  emptyMessage = "Browse our full catalog for apparel options to complement this category.",
}: RelatedProductsProps) {
  let matched: Product[] = [];
  let sectionTitle = title ?? "";
  let viewAllHref = "/products/all/";

  if (solutionSlug) {
    matched = filterProductsBySolution(products, solutionSlug);
    const sol = SOLUTIONS.find((s) => s.slug === solutionSlug);
    sectionTitle = title ?? (sol ? `${sol.name} Products` : "Related Products");
    viewAllHref = `/products/all/#sol=${solutionSlug}`;
  } else if (industrySlug) {
    matched = filterProductsByIndustry(products, industrySlug);
    const ind = INDUSTRIES.find((i) => i.slug === industrySlug);
    sectionTitle = title ?? (ind ? `${ind.name} Products` : "Related Products");
    viewAllHref = `/products/all/#ind=${industrySlug}`;
  }

  const visible = matched.slice(0, limit);

  return (
    <section className="bg-[#0a0a0a] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4d00] md:text-xs">
              Browse the catalog
            </p>
            <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
              {sectionTitle}
            </h2>
            {description && (
              <p className="mt-3 max-w-2xl text-sm text-[#a0a0a0] md:text-base">
                {description}
              </p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black"
          >
            View All
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12">
            <p className="text-sm text-[#a0a0a0] md:text-base">{emptyMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {matched.length > limit && (
          <div className="mt-8 text-center md:mt-12">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00c2ff] hover:underline"
            >
              See all {matched.length} products in this category
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const href = `/products/all/${product.slug}/`;
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[#ff4d00]/50"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <Image
          src={`/products/${product.number}/1.webp`}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition group-hover:scale-105"
        />
        <div className="absolute left-2 top-2">
          <span className="rounded-full bg-[#ff4d00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-[#ff4d00] md:text-base">
          {product.name}
        </h3>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {product.sports.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#a0a0a0] md:text-[10px]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#6b6b6b] md:text-xs">
          <span>MOQ {product.moq}</span>
          <span className="font-medium text-[#00c2ff]">View details →</span>
        </div>
      </div>
    </Link>
  );
}
