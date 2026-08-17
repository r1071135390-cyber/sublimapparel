"use client";

import { useRequestQuote } from "@/components/request-quote-modal";
import type { ReactNode, MouseEvent } from "react";

type Props = {
  /** Display label that appears in the modal title */
  label: string;
  /** Optional prefill for product detail pages */
  prefill?: {
    productName?: string;
    productCategory?: string;
    fabric?: string;
  };
  /** Optional className passthrough (e.g., button styles) */
  className?: string;
  children: ReactNode;
};

/**
 * Renders an <a> tag that opens the quote modal instead of navigating.
 * Falls back to /get-a-quote if JS is disabled.
 */
export function RequestQuoteLink({ label, prefill, className, children }: Props) {
  const { openQuote } = useRequestQuote();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier-click (open in new tab) and right-click
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openQuote({ label, prefill });
  };

  return (
    <a href="/get-a-quote" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
