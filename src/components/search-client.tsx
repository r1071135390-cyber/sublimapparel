"use client";

/**
 * SearchClient — full-text client-side search for /search/.
 *
 * Reads the initial query from the URL (?q=...) on first render, then
 * updates the URL on every keystroke via a debounced push. Results
 * are filtered against the in-memory index built in src/lib/search-index.ts.
 *
 * The UI is built around five result types (Products / Fabric / Blog /
 * Techniques / Pages) and a "All" tab. Counts above each tab update
 * with the query so the user can tell at a glance which bucket has
 * the most matches.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import {
  type SearchResult,
  type SearchResultType,
  getSearchIndex,
  searchIndex,
  searchIndexCounts,
} from "@/lib/search-index";

const TYPE_TABS: { id: "all" | SearchResultType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Products" },
  { id: "fabric", label: "Fabric" },
  { id: "technique", label: "Techniques" },
  { id: "blog", label: "Blog" },
  { id: "case", label: "Industries" },
  { id: "page", label: "Pages" },
];

// 2026-09-11 (R25-C): popular searches that buyers actually type. These
// are the same queries buyers ask in PAA / on chat / in the inquiry form,
// so pre-populating them on the empty-state gives the page an entry
// point for every visitor.
const POPULAR_QUERIES: { q: string; intent: string }[] = [
  // 2026-09-11 (R26.5): replaced the previously incorrect popular-query
  // "sublimation cotton" with the technically correct buyer-intent
  // "allover cotton". Dye-sublimation ink cannot bond to cotton fiber
  // (it requires polyester or polyamide); on cotton we run allover
  // digital print (DTG / DTF), not classic heat-transfer sublimation.
  // The intent string is rewritten to make that explicit to the buyer.
  { q: "allover cotton", intent: "Allover digital print on 100% cotton (DTG/DTF, not sublimation)" },
  { q: "DDP shipping USA", intent: "Delivered duty paid to the US" },
  { q: "MOQ 50", intent: "Minimum order quantity" },
  { q: "cycling jersey", intent: "Cut-and-sew cycling apparel" },
  { q: "racing suit", intent: "Motorsport / go-kart sublimated suit" },
  { q: "polyester 220gsm", intent: "Mid-weight polyester jersey" },
  { q: "esports jersey", intent: "Custom esports team uniform" },
  { q: "music festival merch", intent: "All-cotton full-bleed merch" },
  { q: "school rush tees", intent: "Greek life / campus custom tees" },
  { q: "care guide", intent: "How to wash sublimated apparel" },
];

// Suggested categories shown below the search bar to give visual
// orientation when the user hasn't typed anything yet.
const QUICK_CATEGORIES: { href: string; label: string; blurb: string }[] = [
  { href: "/products/all/", label: "All products", blurb: "100+ all-over print apparel items" },
  { href: "/fabric/", label: "Fabric library", blurb: "60+ in-stock fabrics with full specs" },
  { href: "/technique/", label: "Techniques", blurb: "20 print & decoration methods compared" },
  { href: "/blog/", label: "Blog & guides", blurb: "Industry insights + factory stories" },
  { href: "/industries/", label: "Industries", blurb: "12 verticals, from race to brewery" },
  { href: "/get-a-quote/", label: "Get a quote", blurb: "Reply within 24 hours, DDP to your door" },
];

function highlight(text: string, q: string): React.ReactNode {
  const tokens = q
    .toLowerCase()
    .split(/[\s,\-_./]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
  if (tokens.length === 0) return text;
  const lc = text.toLowerCase();
  const ranges: { start: number; end: number }[] = [];
  for (const t of tokens) {
    let from = 0;
    while (true) {
      const idx = lc.indexOf(t, from);
      if (idx === -1) break;
      ranges.push({ start: idx, end: idx + t.length });
      from = idx + t.length;
    }
  }
  if (ranges.length === 0) return text;
  ranges.sort((a, b) => a.start - b.start);
  // Merge overlapping ranges
  const merged: { start: number; end: number }[] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) {
      last.end = Math.max(last.end, r.end);
    } else {
      merged.push({ ...r });
    }
  }
  const out: React.ReactNode[] = [];
  let cursor = 0;
  for (const r of merged) {
    if (cursor < r.start) out.push(text.slice(cursor, r.start));
    out.push(
      <mark
        key={r.start}
        className="bg-[#ff4d00]/30 px-0.5 font-bold text-black"
      >
        {text.slice(r.start, r.end)}
      </mark>
    );
    cursor = r.end;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return <>{out}</>;
}

function ResultCard({ result, q }: { result: SearchResult; q: string }) {
  return (
    <Link
      href={result.href}
      className="group block border-2 border-[#0a0a0a] bg-white p-5 transition-colors hover:border-[#ff4d00] hover:bg-[#fff5ee]"
    >
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00]">
        <span className="border border-[#0a0a0a] bg-[#0a0a0a] px-1.5 py-0.5 text-[#faf9f6]">
          {result.typeLabel}
        </span>
        {result.badge && (
          <span className="border border-[#0a0a0a] bg-[#faf9f6] px-1.5 py-0.5 text-[#0a0a0a]">
            {result.badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-extrabold leading-snug text-[#0a0a0a] group-hover:text-[#cc3d00] md:text-xl">
        {highlight(result.title, q)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a] line-clamp-2">
        {highlight(result.blurb, q)}
      </p>
      {result.tag && (
        <div className="mt-3 text-xs font-mono uppercase tracking-wider text-[#6b6b6b]">
          {result.tag}
        </div>
      )}
      <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#cc3d00] group-hover:text-[#ff4d00]">
        View
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={3} />
      </div>
    </Link>
  );
}

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [q, setQ] = useState(initialQuery);
  const [activeType, setActiveType] = useState<"all" | SearchResultType>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount, focus the search input.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Push query to URL (debounced) so the URL is shareable and Google can
  // index /search/?q=... result pages. We avoid push on initial mount
  // (initialQuery already matches the URL) to keep history clean.
  useEffect(() => {
    if (q === initialQuery) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const sp = new URLSearchParams(searchParamsHook?.toString() || "");
      if (q.trim()) sp.set("q", q.trim());
      else sp.delete("q");
      const qs = sp.toString();
      router.replace(qs ? `/search/?${qs}` : `/search/`, { scroll: false });
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Build the index once on the client. getSearchIndex() is memoized,
  // so re-renders are cheap.
  const index = useMemo(() => getSearchIndex(), []);

  // Live counts for the type tabs.
  const counts = useMemo(() => (q.trim() ? searchIndexCounts(q) : null), [q]);

  // Filtered + type-restricted results.
  const results = useMemo(() => {
    if (!q.trim()) return [];
    return searchIndex(q, activeType === "all" ? {} : { type: activeType });
  }, [q, activeType, index]);

  const totalCount = counts
    ? counts.product + counts.fabric + counts.blog + counts.technique + counts.case + counts.page
    : 0;

  const onClear = () => {
    setQ("");
    inputRef.current?.focus();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8">
      {/* Search input */}
      <div className="sticky top-0 z-10 -mx-4 border-b-2 border-[#0a0a0a] bg-white px-4 py-4 md:mx-0 md:px-0 md:py-6">
        <label htmlFor="site-search" className="sr-only">
          Search SublimApparel
        </label>
        <div className="relative flex items-center border-2 border-[#0a0a0a] bg-white focus-within:border-[#ff4d00]">
          <SearchIcon
            className="pointer-events-none absolute left-4 h-5 w-5 text-[#6b6b6b]"
            strokeWidth={2.5}
          />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, fabric, techniques, blog..."
            className="w-full bg-transparent px-12 py-4 text-base font-medium text-[#0a0a0a] placeholder:text-[#6b6b6b] focus:outline-none md:py-5 md:text-lg"
            autoComplete="off"
            spellCheck="false"
            // Submitting the form does nothing different (we filter
            // live) but Enter should keep focus in the input.
            onKeyDown={(e) => {
              if (e.key === "Escape") onClear();
            }}
          />
          {q && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute right-3 inline-flex h-8 w-8 items-center justify-center border border-[#0a0a0a] text-[#0a0a0a] transition-colors hover:bg-[#ff4d00] hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
        {q && counts && (
          <div className="mt-3 text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">
            {totalCount === 0
              ? `No matches for "${q}"`
              : `${totalCount} match${totalCount === 1 ? "" : "es"} for "${q}"`}
          </div>
        )}
      </div>

      {/* Type tabs */}
      {q.trim() && counts && totalCount > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {TYPE_TABS.map((t) => {
            const count =
              t.id === "all" ? totalCount : counts[t.id as SearchResultType] || 0;
            const isActive = activeType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={[
                  "inline-flex items-center gap-1.5 border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors",
                  isActive
                    ? "border-[#ff4d00] bg-[#ff4d00] text-black"
                    : "border-[#0a0a0a] bg-white text-[#0a0a0a] hover:border-[#ff4d00] hover:text-[#cc3d00]",
                ].join(" ")}
              >
                {t.label}
                <span
                  className={[
                    "rounded-sm px-1 text-[10px] font-mono",
                    isActive ? "bg-black/20" : "bg-[#0a0a0a] text-[#faf9f6]",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty state — no query yet */}
      {!q.trim() && (
        <div className="mt-10 space-y-12">
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
              [ Popular searches ]
            </h2>
            <p className="mt-2 text-base text-[#3a3a3a] md:text-lg">
              Buyers like you also ask:
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {POPULAR_QUERIES.map((p) => (
                <button
                  key={p.q}
                  type="button"
                  onClick={() => setQ(p.q)}
                  className="group inline-flex items-center gap-2 border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm font-bold text-[#0a0a0a] transition-colors hover:border-[#ff4d00] hover:bg-[#fff5ee] hover:text-[#cc3d00]"
                  title={p.intent}
                >
                  <SearchIcon className="h-3 w-3 text-[#6b6b6b] group-hover:text-[#cc3d00]" strokeWidth={2.5} />
                  {p.q}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
              [ Browse by section ]
            </h2>
            <p className="mt-2 text-base text-[#3a3a3a] md:text-lg">
              Or jump straight to one of the most-visited sections:
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {QUICK_CATEGORIES.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group block border-2 border-[#0a0a0a] bg-[#faf9f6] p-5 transition-colors hover:border-[#ff4d00] hover:bg-[#fff5ee]"
                >
                  <h3 className="text-base font-extrabold leading-tight text-[#0a0a0a] group-hover:text-[#cc3d00]">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3a3a3a]">
                    {c.blurb}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#cc3d00] group-hover:text-[#ff4d00]">
                    Open
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Results state — query present */}
      {q.trim() && (
        <div className="mt-8">
          {results.length === 0 ? (
            <div className="border-2 border-dashed border-[#0a0a0a] bg-[#faf9f6] p-10 text-center">
              <SearchIcon className="mx-auto h-10 w-10 text-[#6b6b6b]" strokeWidth={1.5} />
              <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                No results for &ldquo;{q}&rdquo;
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a]">
                Try one of the popular searches above, or send us a WhatsApp
                message — our Yiwu factory team replies within 1 business day.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/get-a-quote/"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400]"
                >
                  Request a quote
                </a>
                <a
                  href="/yiwu-factory-whatsapp/"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#0a0a0a] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">
                Showing {results.length} {results.length === 1 ? "result" : "results"}
                {activeType !== "all" && ` in ${TYPE_TABS.find((t) => t.id === activeType)?.label}`}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {results.map((r, i) => (
                  <ResultCard key={`${r.type}-${r.href}-${i}`} result={r} q={q} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
