"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tagArchiveLink, resolveArchiveLink } from "@/lib/tag-utils";
import { CATEGORY_TAGS } from "@/lib/tag-archive";
import { products } from "@/lib/products-data";

export function Products() {
  // Derive live counts per apparel category from the actual product data
  const apparelCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  // Build the 14 apparel categories from CATEGORY_TAGS keys (preserves the canonical order)
  const apparelCategories = Object.keys(CATEGORY_TAGS).map((key) => ({
    name: key.replace(/&/g, "and").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    tag: `category:${key}`,
    count: apparelCounts[key] || 0,
  }));

  const categories = [
    {
      label: "Apparel",
      headline: "From tees to team kits.",
      desc: `All-over sublimation on ${apparelCategories.length} apparel types — cotton, polyester, blends. MOQ 50 pcs, full-color print from collar to hem.`,
      items: apparelCategories,
      color: "bg-[#ff4d00]",
      href: "/products/all/",
    },
    {
      label: "Sports & Team",
      headline: "Built for game day.",
      desc: "Custom sublimated kits for cycling, running, soccer, basketball, rowing, esports. Full team packages with names and numbers.",
      items: [
        { name: "Cycling", tag: "sport:Cycling" },
        { name: "Running", tag: "sport:Running" },
        { name: "Soccer", tag: "sport:Soccer" },
        { name: "Esports", tag: "sport:Esports" },
      ],
      color: "bg-[#00c2ff]",
      href: tagArchiveLink("sport", "Cycling"),
    },
    {
      label: "Flags & Banners",
      headline: "Make a statement outdoors.",
      desc: "Custom flags, banners, pop-up displays, beach flags, feather banners. Fade-resistant for outdoor use.",
      items: [
        { name: "Garden flags", tag: "" },
        { name: "Trade show", tag: "" },
        { name: "Beach flags", tag: "" },
        { name: "Banners", tag: "" },
      ],
      color: "bg-[#ff4d00]",
      href: "/products/",
    },
    {
      label: "Home & Living",
      headline: "Print your art on soft goods.",
      desc: "Custom cushions, pillowcases, throws, curtains, bean bags, aprons. Perfect for boutique brands and home decor.",
      items: [
        { name: "Cushions", tag: "" },
        { name: "Throws", tag: "" },
        { name: "Curtains", tag: "" },
        { name: "Aprons", tag: "" },
      ],
      color: "bg-[#00c2ff]",
      href: "/products/",
    },
    {
      label: "Bags & Accessories",
      headline: "Carry your brand.",
      desc: "Drawstring bags, backpacks, tote bags, gym sacks, hats, scarves, bandanas, lanyards.",
      items: [
        { name: "Drawstring bags", tag: "" },
        { name: "Backpacks", tag: "" },
        { name: "Caps", tag: "" },
        { name: "Lanyards", tag: "" },
      ],
      color: "bg-[#ff4d00]",
      href: "/products/",
    },
    {
      label: "Hard Goods",
      headline: "Print on hard surfaces.",
      desc: "Mousepads, coasters, puzzles, phone cases, ceramic mugs, metal plates, acrylic photo panels.",
      items: [
        { name: "Mousepads", tag: "" },
        { name: "Mugs", tag: "" },
        { name: "Puzzles", tag: "" },
        { name: "Phone cases", tag: "" },
      ],
      color: "bg-[#00c2ff]",
      href: "/products/",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
              [ 007 / Products ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black md:text-6xl">
              What we make.
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            {apparelCategories.length} apparel types.<br />Endless customization.
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`group relative border-2 border-black bg-white p-6 ${
                i % 3 === 0 ? "md:rotate-[-1.5deg]" : i % 3 === 1 ? "md:rotate-[0.5deg]" : "md:rotate-[-0.5deg]"
              } transition-transform hover:rotate-0 hover:shadow-[6px_6px_0_0_#000]`}
            >
              {/* Color label */}
              <div
                className={`inline-block ${cat.color} mb-4 border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white`}
              >
                {cat.label}
              </div>

              {/* Headline */}
              <h3 className="mb-3 text-2xl font-black leading-tight text-black md:text-3xl">
                <Link
                  href={cat.href}
                  className="transition-colors hover:text-[#cc3d00]"
                >
                  {cat.headline}
                  <ArrowRight className="ml-2 inline h-5 w-5 align-middle" />
                </Link>
              </h3>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-black/70">{cat.desc}</p>

              {/* Items tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => {
                  const itemName = typeof item === "string" ? item : item.name;
                  let itemHref: string | null = null;
                  if (typeof item === "object" && item.tag) {
                    if (item.tag.startsWith("/")) {
                      itemHref = item.tag;
                    } else {
                      const [dim, value] = item.tag.split(":");
                      if (dim === "category") {
                        // Only link to category if it still exists in CATEGORY_TAGS
                        itemHref = CATEGORY_TAGS[value]
                          ? tagArchiveLink("category", value)
                          : "/products/all/";
                      } else if (dim === "sport")
                        itemHref = tagArchiveLink("sport", value);
                      else if (dim === "scenario")
                        itemHref = tagArchiveLink("scenario", value);
                      else if (CATEGORY_TAGS[item.tag])
                        itemHref = tagArchiveLink("category", item.tag);
                      else
                        itemHref = "/products/all/";
                    }
                  }
                  // Fallback: try resolveArchiveLink on the label itself
                  if (!itemHref) {
                    const resolved = resolveArchiveLink(itemName);
                    // Only use the resolved link if it points to an active category
                    if (resolved && !resolved.includes("/tag/category/apron/")
                      && !resolved.includes("/tag/category/baseball-cap/")
                      && !resolved.includes("/tag/category/bucket-hat/")
                      && !resolved.includes("/tag/category/jersey-kit/")
                      && !resolved.includes("/tag/category/sports-top-kit/")
                      && !resolved.includes("/tag/category/combat-gear/")
                      && !resolved.includes("/tag/category/sleepwear-and-underwear/")
                      && !resolved.includes("/tag/category/dress/")
                      && !resolved.includes("/tag/category/coord-set/")
                      && !resolved.includes("/tag/category/knitwear/")
                      && !resolved.includes("/tag/category/romper-and-jumpsuit/")
                      && !resolved.includes("/tag/category/bodysuit/")
                      && !resolved.includes("/tag/category/leggings/")
                    ) {
                      itemHref = resolved;
                    } else {
                      itemHref = "/products/all/";
                    }
                  }
                  // Last resort: link to /products/all/
                  if (!itemHref) itemHref = "/products/all/";
                  const baseCls =
                    "border border-black px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide";
                  if (itemHref) {
                    return (
                      <Link
                        key={itemName}
                        href={itemHref}
                        className={`${baseCls} group flex items-center gap-1.5 bg-[#faf9f6] text-black transition-colors hover:bg-[#ff4d00] hover:text-black`}
                      >
                        {itemName}
                        {"count" in item && item.count > 0 && (
                          <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-black text-white group-hover:bg-white group-hover:text-black">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    );
                  }
                  return (
                    <span
                      key={itemName}
                      className={`${baseCls} flex items-center gap-1.5 bg-[#faf9f6] text-black`}
                    >
                      {itemName}
                      {"count" in item && item.count > 0 && (
                        <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-black text-white">
                          {item.count}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>

              {/* Cotton badge for Apparel card */}
              {cat.label === "Apparel" && (
                <Link
                  href="/fabric/cotton/"
                  className="mt-4 inline-flex items-center gap-1.5 border-2 border-black bg-[#00c2ff] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-black transition-transform hover:-translate-y-0.5"
                >
                  100% cotton option
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 border-2 border-black bg-[#ff4d00] p-6 text-center text-black shadow-[6px_6px_0_0_#000] md:p-8">
          <p className="text-lg font-black uppercase tracking-tight md:text-2xl">
            Don&apos;t see your product? If it takes sublimation ink, we can print on it.
          </p>
          <p className="mt-2 text-sm font-bold text-white/90 md:text-base">
            Just send us your idea — we&apos;ll quote it in 24 hours.
          </p>
          <Link
            href="/contact/"
            className="mt-5 inline-flex items-center gap-2 border-2 border-white bg-black px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          >
            Send us your idea
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
