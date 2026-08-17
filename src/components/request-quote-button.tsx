"use client";

import * as React from "react";
import { useRequestQuote, type QuoteSource } from "@/components/request-quote-modal";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  /** Friendly label for which page they're on */
  sourceLabel: string;
  /** Optional source path override (defaults to current pathname) */
  sourcePath?: string;
  /** Optional product context (pre-fills garment field) */
  prefill?: QuoteSource["prefill"];
  /** Visual variant */
  variant?: Variant;
  /** Size */
  size?: Size;
  /** Extra className */
  className?: string;
  /** Children (text + optional icon) */
  children: React.ReactNode;
  /** Optional onClick before opening (e.g., analytics) */
  onBeforeOpen?: () => void;
};

/**
 * A button that opens the global Request Quote modal.
 * Use everywhere you currently have a "Get a quote" / "Request a quote" link
 * that points to /get-a-quote.
 */
export function RequestQuoteButton({
  sourceLabel,
  sourcePath,
  prefill,
  variant = "primary",
  size = "md",
  className,
  children,
  onBeforeOpen,
}: Props) {
  const { openQuote } = useRequestQuote();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBeforeOpen?.();
    openQuote({ label: sourceLabel, path: sourcePath, prefill });
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] focus-visible:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#ff4d00] text-white hover:bg-black hover:scale-[1.02]",
    secondary:
      "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]",
    outline:
      "border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white",
    ghost:
      "text-[#0a0a0a] hover:bg-[#0a0a0a]/5",
  };

  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}

/**
 * A link-styled button (renders as <a> for visual consistency with existing href buttons).
 * Still opens the modal on click. Use this to replace existing <Link href="/get-a-quote">.
 */
export function RequestQuoteLink({
  sourceLabel,
  sourcePath,
  prefill,
  variant = "primary",
  size = "md",
  className,
  children,
  onBeforeOpen,
}: Props) {
  const { openQuote } = useRequestQuote();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBeforeOpen?.();
    openQuote({ label: sourceLabel, path: sourcePath, prefill });
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] focus-visible:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#ff4d00] text-white hover:bg-black hover:scale-[1.02]",
    secondary:
      "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]",
    outline:
      "border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white",
    ghost:
      "text-[#0a0a0a] hover:bg-[#0a0a0a]/5",
  };

  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <a
      href="#"
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
