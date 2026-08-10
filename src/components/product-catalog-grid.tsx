"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  productTypes,
  productSubcategories,
  productMainCategories,
  type Product,
} from "@/lib/products-data";
import { ArrowUpRight } from "lucide-react";

export function ProductCatalogGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Read from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const tags = hash.split(",").filter((t) => Object.keys(productSubcategories).includes(t) || true);
      if (tags.length > 0) setSelectedTags(tags);
    }
  }, []);

  // Update URL hash when tags change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (selectedTags.length > 0) {
      window.history.replaceState(null, "", "#" + selectedTags.join(","));
    } else {
      window.history.replaceState(null, "", "#");
    }
  }, [selectedTags]);

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return productTypes;
    return productTypes.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => setSelectedTags([]);

  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block border border-black/15 px-3 py-1 text-xs font-bold tracking-[0.18em]">
              ALL PRODUCTS
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black md:text-4xl lg:text-5xl">
              106 products, every print method.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-black/60 md:text-base">
              Click any tag to filter. Stack tags to narrow further. Every product
              can be cut, sewn, and printed in our Yiwu factory.
            </p>
          </div>
          <div className="text-sm text-black/60">
            Showing <span className="font-bold text-black">{filtered.length}</span>{" "}
            of <span className="font-bold text-black">{productTypes.length}</span>{" "}
            products
          </div>
        </div>

        {/* Tag filter grouped by main category */}
        <div className="mb-8 space-y-5">
          {productMainCategories.map((main) => {
            const mainSubcats = Object.entries(productSubcategories).filter(
              ([, info]) => info.mainCategory === main.id
            );
            if (mainSubcats.length === 0) return null;
            const totalInMain = productTypes.filter((p) => p.mainCategory === main.id).length;
            return (
              <div key={main.id}>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/50">
                  <span>{main.label}</span>
                  <span className="text-black/30">·</span>
                  <span className="text-black/40">{totalInMain} products</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mainSubcats.map(([slug, info]) => {
                    const count = productTypes.filter((p) =>
                      p.subcategorySlugs.includes(slug)
                    ).length;
                    if (count === 0) return null;
                    const isActive = selectedTags.includes(slug);
                    return (
                      <button
                        key={slug}
                        onClick={() => toggleTag(slug)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          isActive
                            ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                            : "border-black/15 bg-white text-black/70 hover:border-black/40"
                        }`}
                      >
                        {info.label} <span className={isActive ? "text-white/80" : "text-black/40"}>({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Process & other tags */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/50">
              <span>Process & Material</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { tag: "sublimation", label: "Sublimation" },
                { tag: "dtf", label: "DTF" },
                { tag: "dtg", label: "DTG" },
                { tag: "polyester", label: "Polyester" },
                { tag: "cotton", label: "Cotton" },
                { tag: "all-over-print", label: "All-Over Print" },
                { tag: "blank", label: "Blank" },
                { tag: "kids", label: "Kids" },
                { tag: "women", label: "Women" },
                { tag: "men", label: "Men" },
                { tag: "unisex", label: "Unisex" },
              ].map(({ tag, label }) => {
                const count = productTypes.filter((p) => p.tags.includes(tag)).length;
                if (count === 0) return null;
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                        : "border-black/15 bg-white text-black/70 hover:border-black/40"
                    }`}
                  >
                    {label} <span className={isActive ? "text-white/80" : "text-black/40"}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-black/60">Filtering by:</span>
            {selectedTags.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className="inline-flex items-center gap-1 rounded-full bg-[#ff4d00] px-2.5 py-1 font-semibold text-white hover:bg-[#e64500]"
              >
                {productSubcategories[t]?.label || t}
                <span aria-hidden>×</span>
              </button>
            ))}
            <button
              onClick={clearAll}
              className="ml-2 text-black/50 underline hover:text-black"
            >
              Clear
            </button>
          </div>
        )}

        {/* Product list — text-only, no images */}
        <div className="border border-black/10">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-4 border-b border-black/10 bg-neutral-50 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-black/60">
            <div>Product</div>
            <div>Subcategory</div>
            <div>Process</div>
            <div className="text-right">SKU</div>
          </div>
          {filtered.map((p) => (
            <ProductRow key={p.slug} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="border border-dashed border-black/20 bg-neutral-50 py-20 text-center">
            <p className="text-lg font-bold text-black/60">No products match your filters</p>
            <p className="mt-2 text-sm text-black/40">Try removing some tags</p>
            <button
              onClick={clearAll}
              className="mt-4 rounded-full bg-[#ff4d00] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e64500]"
            >
              Show all {productTypes.length} products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductRow({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-2 border-b border-black/5 px-4 py-3 transition last:border-b-0 hover:bg-[#fff4ef] md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1fr)_auto] md:items-center md:gap-4"
    >
      <div>
        <h3 className="text-sm font-bold leading-tight text-black group-hover:text-[#ff4d00] md:text-base">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-black/55 line-clamp-1">
          {product.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {product.subcategories.slice(0, 2).map((sub) => (
          <span
            key={sub}
            className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/70"
          >
            {sub}
          </span>
        ))}
        {product.subcategories.length > 2 && (
          <span className="text-[10px] font-semibold text-black/40">
            +{product.subcategories.length - 2}
          </span>
        )}
      </div>
      <div>
        <span className="rounded-full border border-black/15 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/70">
          {product.process}
        </span>
      </div>
      <div className="flex items-center justify-between md:justify-end md:gap-3">
        {product.sku && /^\d+$/.test(product.sku) ? (
          <span className="text-[10px] font-semibold text-black/50">
            {product.sku} SKUs
          </span>
        ) : (
          <span className="rounded-full bg-[#00c2ff]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#00c2ff]">
            Custom
          </span>
        )}
        <ArrowUpRight className="h-4 w-4 text-black/30 transition group-hover:text-[#ff4d00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

export default ProductCatalogGrid;
