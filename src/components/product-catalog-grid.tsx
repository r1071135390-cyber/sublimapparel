"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { productTypes, productAllTags, productCategoryDisplay } from "@/lib/products-data";
import { ArrowUpRight } from "lucide-react";

export function ProductCatalogGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Read from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const tags = hash.split(",").filter((t) => productAllTags.includes(t));
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

  // Group unique tags by category for nicer display
  const topTags = [
    "all-over-print",
    "blank-garment",
    "sport",
    "industry",
    "home-living",
    "accessory",
    "footwear",
    "sublimation",
    "dtf",
    "dtg",
    "cotton",
    "polyester",
    "jersey",
    "hoodie",
    "t-shirt",
    "polo-shirt",
    "tank-top",
    "shorts",
    "dress",
    "apron",
    "cap",
    "bag",
    "kids",
    "uniform",
  ];

  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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

        {/* Tag filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-y border-black/10 py-4">
          <button
            onClick={clearAll}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              selectedTags.length === 0
                ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                : "border-black/15 bg-white text-black/70 hover:border-black/40"
            }`}
          >
            All ({productTypes.length})
          </button>
          {topTags.map((tag) => {
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
                {tag} ({count})
              </button>
            );
          })}
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
                {t}
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

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="group flex flex-col border border-black/10 bg-white transition hover:border-black/30 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {p.fabricCount > 0 && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white">
                    {p.fabricCount} fabrics
                  </span>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                  {p.process}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3">
                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-black">
                  {p.name}
                </h3>
                <p className="line-clamp-2 text-[11px] leading-snug text-black/55">
                  {p.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black/70"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] font-semibold text-black/50">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-black/60">
                  <span className="font-semibold uppercase tracking-wider">
                    {productCategoryDisplay[p.category] || p.category}
                  </span>
                  {p.sku && p.sku !== "custom" && p.sku !== "—" && (
                    <span>{p.sku} SKUs</span>
                  )}
                  {p.sku === "custom" && (
                    <span className="rounded-full bg-[#00c2ff]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#00c2ff]">
                      Custom
                    </span>
                  )}
                </div>
              </div>
            </div>
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

export default ProductCatalogGrid;
