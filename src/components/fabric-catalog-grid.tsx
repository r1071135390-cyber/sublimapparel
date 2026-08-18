"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Filter, X } from "lucide-react";
import type { Fabric } from "@/lib/fabric-data";

type Props = {
  fabrics: Fabric[];
};

const SORT_OPTIONS = [
  { id: "popular", label: "Popular" },
  { id: "name", label: "A–Z" },
  { id: "weight-asc", label: "Light → Heavy" },
  { id: "weight-desc", label: "Heavy → Light" },
];

const PRINT_METHODS = [
  { id: "sublimation", label: "Sublimation" },
  { id: "dtg", label: "DTG" },
  { id: "dtf", label: "DTF" },
  { id: "screen-print", label: "Screen Print" },
  { id: "embroidery", label: "Embroidery" },
];

const USE_CATEGORIES = [
  { id: "activewear", label: "Activewear" },
  { id: "streetwear", label: "Streetwear" },
  { id: "workwear", label: "Workwear" },
  { id: "swimwear", label: "Swimwear" },
  { id: "polo", label: "Polo" },
  { id: "hoodies", label: "Hoodies" },
  { id: "dress", label: "Dresses" },
  { id: "flags", label: "Flags / Banners" },
  { id: "linings", label: "Linings" },
  { id: "formal", label: "Formal" },
];

const COMPOSITION_GROUPS = [
  { id: "polyester", label: "Polyester" },
  { id: "cotton", label: "Cotton" },
  { id: "nylon", label: "Nylon" },
  { id: "wool", label: "Wool" },
  { id: "linen", label: "Linen" },
  { id: "silk", label: "Silk" },
  { id: "rayon", label: "Rayon / Modal" },
  { id: "blend", label: "Blend" },
  { id: "leather", label: "Leather" },
];

export function FabricCatalogGrid({ fabrics }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => setActiveTags([]);

  const filtered = useMemo(() => {
    let list = fabrics;
    if (activeTags.length > 0) {
      list = list.filter((f) => activeTags.every((t) => f.tags.includes(t)));
    }
    const sorted = [...list];
    if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "weight-asc") {
      sorted.sort((a, b) => parseWeight(a.gsm) - parseWeight(b.gsm));
    } else if (sort === "weight-desc") {
      sorted.sort((a, b) => parseWeight(b.gsm) - parseWeight(a.gsm));
    }
    return sorted;
  }, [fabrics, activeTags, sort]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 border-2 border-black bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black bg-[#faf9f6] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black">
            <Filter className="h-4 w-4" strokeWidth={2.5} />
            {filtered.length} of {fabrics.length} fabrics
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-2 inline-flex items-center gap-1 border border-black bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white"
              >
                <X className="h-3 w-3" strokeWidth={3} />
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="fabric-sort"
              className="text-[10px] font-black uppercase tracking-widest text-black"
            >
              Sort:
            </label>
            <select
              id="fabric-sort"
              aria-label="Sort fabrics"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-2 border-black bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white"
            >
              {showFilters ? "Hide filters" : "Show filters"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4 p-4">
            <FilterGroup
              title="Print method"
              tags={PRINT_METHODS}
              activeTags={activeTags}
              onToggle={toggleTag}
            />
            <FilterGroup
              title="Composition"
              tags={COMPOSITION_GROUPS}
              activeTags={activeTags}
              onToggle={toggleTag}
            />
            <FilterGroup
              title="Use"
              tags={USE_CATEGORIES}
              activeTags={activeTags}
              onToggle={toggleTag}
            />
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-black/30 bg-[#faf9f6] p-12 text-center text-sm text-black/60">
          No fabrics match these filters. Try clearing one.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((f) => (
            <Link
              key={f.slug}
              href={`/fabric/${f.slug}`}
              className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
            >
              <div className="relative aspect-square w-full overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                <Image
                  src={`/fabric-sw-${f.swatch}.webp`}
                  alt={`${f.name} fabric swatch`}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-3 md:p-4">
                <h3 className="mb-1 text-sm font-black uppercase leading-tight text-black md:text-base">
                  {f.name}
                </h3>
                <p className="mb-2 text-[10px] uppercase tracking-wide text-[#6b6b6b] md:mb-3 md:text-xs">
                  {f.comp}
                </p>
                <p className="mb-3 flex-1 text-[11px] leading-relaxed text-[#3a3a3a] md:text-xs">
                  {f.description}
                </p>
                <div className="mb-2 space-y-0.5 border-t border-black/10 pt-2 text-[10px] md:text-[11px]">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold uppercase tracking-wider text-[#6b6b6b]">Weight</span>
                    <span className="text-right text-black">{f.gsm} gsm</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold uppercase tracking-wider text-[#6b6b6b]">Best for</span>
                    <span className="truncate text-right text-black">{f.use}</span>
                  </div>
                </div>
                <div className="mt-auto border-t border-black/10 pt-2 md:pt-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ff4d00] md:text-xs">
                    Sublimation fit: {f.fit} <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-black/50">
        ★ rating = how well the fabric holds sublimation dye. ★★★★★ = full all-over color, ★ = needs special process (we do all of them — including 100% cotton via DTG/DTF).
      </p>
    </div>
  );
}

function FilterGroup({
  title,
  tags,
  activeTags,
  onToggle,
}: {
  title: string;
  tags: { id: string; label: string }[];
  activeTags: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-black">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => {
          const active = activeTags.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onToggle(t.id)}
              className={
                "border-2 px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors " +
                (active
                  ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                  : "border-black bg-white text-black hover:bg-black hover:text-white")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function parseWeight(gsm: string): number {
  const m = gsm.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
