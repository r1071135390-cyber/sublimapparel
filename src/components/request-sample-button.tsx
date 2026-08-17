"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "8619817930190";
const SAMPLE_DISPLAY = "+86 198 1793 0190";

type Variant = "primary" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

type Props = {
  /** Optional message override (default: prefilled with page context) */
  message?: string;
  /** Visual variant */
  variant?: Variant;
  /** Size */
  size?: Size;
  /** Classname */
  className?: string;
  /** Children (text + icon) */
  children: React.ReactNode;
};

/**
 * A button that opens WhatsApp chat with a pre-filled sample-kit request.
 * Includes the current page URL so the team knows where the request came from.
 */
export function RequestSampleButton({
  message,
  variant = "outline",
  size = "md",
  className,
  children,
}: Props) {
  const pathname = usePathname();
  const href = React.useMemo(() => {
    const defaultMsg = `Hi SublimApparel! I'd like to request a sample kit. I came from: ${pathname}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message ?? defaultMsg)}`;
  }, [pathname, message]);

  const base =
    "inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] focus-visible:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[#25D366] text-white hover:bg-[#1da851] hover:scale-[1.02]",
    outline:
      "border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white",
    "outline-light":
      "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0a0a0a]",
  };

  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}

export { SAMPLE_DISPLAY, WHATSAPP_NUMBER };
