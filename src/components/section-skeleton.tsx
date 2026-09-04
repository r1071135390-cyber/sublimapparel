"use client";

import { cn } from "@/lib/utils";

type SectionVariant =
  | "features"
  | "process"
  | "beyond-apparel"
  | "artwork-cta"
  | "how-it-works"
  | "products"
  | "ddp";

// Approximate min-height for each section (in Tailwind v4 arbitrary units, viewport-based).
// Tuned to roughly match the actual section height so the layout doesn't jump when content streams in.
const SIZES: Record<SectionVariant, string> = {
  features: "min-h-[800px]",
  process: "min-h-[600px]",
  "beyond-apparel": "min-h-[400px]",
  "artwork-cta": "min-h-[300px]",
  "how-it-works": "min-h-[500px]",
  products: "min-h-[900px]",
  ddp: "min-h-[400px]",
};

export default function SectionSkeleton({
  variant,
  className,
}: {
  variant: SectionVariant;
  className?: string;
}) {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "w-full",
        SIZES[variant],
        "bg-black/[0.02] dark:bg-white/[0.02]",
        "flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-2 w-24 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-2 w-16 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
      </div>
    </section>
  );
}
