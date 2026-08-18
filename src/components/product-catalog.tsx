"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import {
  products,
  productCategories,
  allSports,
  allScenarios,
  type Product,
  type ProductCategory,
  type Sport,
  type Scenario,
} from "@/lib/products-data";
import { getProductMainSrc } from "@/lib/product-image-helpers";

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
    "Uniform & Workwear": "🦺",
  };
  return map[category] ?? "👕";
}

interface FilterState {
  categories: ProductCategory[];
  sports: Sport[];
  scenarios: Scenario[];
}

function readFromHash(): FilterState {
  if (typeof window === "undefined") return { categories: [], sports: [], scenarios: [] };
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return { categories: [], sports: [], scenarios: [] };
  const params = new URLSearchParams(hash);
  return {
    categories: (params.get("cat")?.split(",").filter(Boolean) as ProductCategory[]) ?? [],
    sports: (params.get("sport")?.split(",").filter(Boolean) as Sport[]) ?? [],
    scenarios: (params.get("use")?.split(",").filter(Boolean) as Scenario[]) ?? [],
  };
}

function writeToHash(filter: FilterState) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  if (filter.categories.length) params.set("cat", filter.categories.join(","));
  if (filter.sports.length) params.set("sport", filter.sports.join(","));
  if (filter.scenarios.length) params.set("use", filter.scenarios.join(","));
  const newHash = params.toString();
  const newUrl = `${window.location.pathname}${newHash ? `#${newHash}` : ""}`;
  window.history.replaceState(null, "", newUrl);
}

function matchesFilter(p: Product, filter: FilterState): boolean {
  if (filter.categories.length && !filter.categories.includes(p.category)) return false;
  if (filter.sports.length) {
    const intersect = p.sports.filter((s) => filter.sports.includes(s));
    if (intersect.length === 0) return false;
  }
  if (filter.scenarios.length) {
    const intersect = p.scenarios.filter((s) => filter.scenarios.includes(s));
    if (intersect.length === 0) return false;
  }
  return true;
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors md:text-xs ${
        active
          ? "border-[#ff4d00] bg-[#ff4d00] text-white"
          : "border-black/15 bg-white text-black hover:border-[#ff4d00]/50"
      }`}
    >
      {children}
    </button>
  );
}

export function ProductCatalog() {
  const [filter, setFilter] = useState<FilterState>({
    categories: [],
    sports: [],
    scenarios: [],
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFilter(readFromHash());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeToHash(filter);
  }, [filter, hydrated]);

  const filtered = useMemo(() => products.filter((p) => matchesFilter(p, filter)), [filter]);

  const toggle = <K extends keyof FilterState>(key: K, value: FilterState[K][number]) => {
    setFilter((prev) => {
      const list = prev[key] as Array<typeof value>;
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () => setFilter({ categories: [], sports: [], scenarios: [] });

  const activeCount = filter.categories.length + filter.sports.length + filter.scenarios.length;

  return (
    <div>
      {/* FILTER PANEL */}
      <section className="border-b-2 border-black bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
          <div className="mb-4 flex items-end justify-between md:mb-6">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
                Cross-filter 3 dimensions
              </p>
              <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-black md:text-3xl">
                Find your product
              </h2>
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black hover:border-[#ff4d00] hover:text-[#cc3d00] md:text-xs"
              >
                <X className="h-3 w-3" />
                Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
              </button>
            )}
          </div>

          {/* CLOTHING (categories) */}
          <div className="mb-4 md:mb-6">
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] md:text-xs">
              Clothing · {filter.categories.length || "all"}
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {productCategories.map((cat) => (
                <FilterChip
                  key={cat}
                  active={filter.categories.includes(cat)}
                  onClick={() => toggle("categories", cat)}
                >
                  {cat}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* SPORT */}
          <div className="mb-4 md:mb-6">
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] md:text-xs">
              Sport · {filter.sports.length || "all"}
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {allSports.map((sport) => (
                <FilterChip
                  key={sport}
                  active={filter.sports.includes(sport)}
                  onClick={() => toggle("sports", sport)}
                >
                  {sport}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* SCENARIO */}
          <div>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] md:text-xs">
              Scenario · {filter.scenarios.length || "all"}
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {allScenarios.map((sc) => (
                <FilterChip
                  key={sc}
                  active={filter.scenarios.includes(sc)}
                  onClick={() => toggle("scenarios", sc)}
                >
                  {sc}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULT COUNT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
          <p className="text-xs font-bold uppercase tracking-wide text-black md:text-sm">
            {filtered.length} of {products.length} products
            {activeCount > 0 && (
              <span className="ml-2 text-[#cc3d00]">— filtered by {activeCount} tag{activeCount > 1 ? "s" : ""}</span>
            )}
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 md:px-8 md:pb-20">
          {filtered.length === 0 ? (
            <div className="rounded-md border-2 border-dashed border-black/20 bg-[#f5f5f5] py-20 text-center">
              <p className="text-sm font-bold uppercase text-[#6b6b6b] md:text-base">
                No products match this combination
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 inline-flex items-center gap-1 rounded-full border-2 border-[#ff4d00] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#cc3d00] hover:bg-[#ff4d00] hover:text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/all/${p.slug}/`}
                  className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
                >
                  <div className="relative aspect-square w-full overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                    <Image
                      src={getProductMainSrc(p.number)}
                      alt={p.name}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallback !== "1") {
                          img.dataset.fallback = "1";
                          img.src = `/products/${p.number}/1.webp`;
                        }
                      }}
                    />
                    <div className="absolute left-2 top-2 rounded-sm bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white md:text-[10px]">
                      {p.category}
                    </div>
                    <div className="absolute right-2 top-2 rounded-sm bg-[#ff4d00] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white md:text-[10px]">
                      MOQ {p.moq}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="mb-1 text-[11px] font-black uppercase leading-tight text-black md:text-sm">
                      {p.name}
                    </h3>
                    <p className="mb-2 line-clamp-2 text-[10px] leading-relaxed text-[#6b6b6b] md:mb-3 md:text-[11px]">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1 border-t border-black/10 pt-2 md:pt-3">
                      {p.sports.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="rounded-sm bg-[#f5f5f5] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#3a3a3a] md:text-[9px]"
                        >
                          {s}
                        </span>
                      ))}
                      {p.scenarios.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="rounded-sm bg-[#fff5f0] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#cc3d00] md:text-[9px]"
                        >
                          {s}
                        </span>
                      ))}
                      {(p.sports.length > 2 || p.scenarios.length > 2) && (
                        <span className="rounded-sm bg-[#f5f5f5] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#6b6b6b] md:text-[9px]">
                          +{p.sports.length + p.scenarios.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
