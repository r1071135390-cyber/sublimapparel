"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useRequestQuote, type QuoteSource } from "@/components/request-quote-modal";

/**
 * Returns a function that opens the global Request Quote modal
 * with the current page (pathname + auto-derived label) as the source.
 *
 * Usage:
 *   const openQuote = useOpenQuote();
 *   <button onClick={() => openQuote({ prefill: { garment: 'Hoodie' } })}>Get a quote</button>
 */
export function useOpenQuote(): (extra?: {
  prefill?: QuoteSource["prefill"];
  label?: string;
  path?: string;
}) => void {
  const pathname = usePathname();
  const { openQuote } = useRequestQuote();

  return React.useCallback(
    (extra) => {
      const label = extra?.label ?? autoLabelFromPath(pathname);
      openQuote({ label, path: extra?.path ?? pathname, prefill: extra?.prefill });
    },
    [pathname, openQuote]
  );
}

/** Derives a friendly label from a URL path, e.g. "/products/hoodies/" -> "Products: Hoodies" */
function autoLabelFromPath(path: string | null): string {
  if (!path || path === "/") return "Home";
  const clean = path.replace(/^\/+|\/+$/g, "");
  const segs = clean.split("/");
  // Handle known patterns
  if (segs[0] === "products" && segs.length === 1) return "Products";
  if (segs[0] === "products" && segs[1] && !segs[2]) {
    return `Products: ${humanize(segs[1])}`;
  }
  if (segs[0] === "products" && segs[1] === "all" && segs[2]) {
    return `Product: ${humanize(segs[2])}`;
  }
  if (segs[0] === "tag" && segs[1] && segs[2]) {
    return `Tag: ${humanize(segs[2])} (${segs[1]})`;
  }
  if (segs[0] === "cases" && segs[1]) {
    return `Case: ${humanize(segs[1])}`;
  }
  if (segs[0] === "blog" && segs[1]) {
    return `Blog: ${humanize(segs[1])}`;
  }
  if (segs[0] === "technique" && segs[1]) {
    return `Technique: ${humanize(segs[1])}`;
  }
  if (segs[0] === "fabric" && segs[1]) {
    return `Fabric: ${humanize(segs[1])}`;
  }
  if (segs[0] === "about" && segs[1]) {
    return `About: ${humanize(segs[1])}`;
  }
  return `Page: ${humanize(segs[0])}`;
}

function humanize(s: string): string {
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
