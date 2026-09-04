"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/section-skeleton";

// Below-fold sections are wrapped here as client-only components so the
// initial HTML payload stays small (avoids the 354KB home page). Each gets
// a lightweight skeleton that matches its approximate height to prevent CLS
// when the real content hydrates.

const Features = dynamic(
  () => import("@/components/features").then((m) => ({ default: m.Features })),
  { ssr: false, loading: () => <SectionSkeleton variant="features" /> }
);
export { Features };

const Process = dynamic(
  () => import("@/components/process").then((m) => ({ default: m.Process })),
  { ssr: false, loading: () => <SectionSkeleton variant="process" /> }
);
export { Process };

const BeyondApparel = dynamic(
  () => import("@/components/beyond-apparel").then((m) => ({ default: m.BeyondApparel })),
  { ssr: false, loading: () => <SectionSkeleton variant="beyond-apparel" /> }
);
export { BeyondApparel };

const ArtworkCTA = dynamic(
  () => import("@/components/artwork-cta").then((m) => ({ default: m.ArtworkCTA })),
  { ssr: false, loading: () => <SectionSkeleton variant="artwork-cta" /> }
);
export { ArtworkCTA };

const HowItWorks = dynamic(
  () => import("@/components/how-it-works").then((m) => ({ default: m.HowItWorks })),
  { ssr: false, loading: () => <SectionSkeleton variant="how-it-works" /> }
);
export { HowItWorks };

const Products = dynamic(
  () => import("@/components/products").then((m) => ({ default: m.Products })),
  { ssr: false, loading: () => <SectionSkeleton variant="products" /> }
);
export { Products };

const DDP = dynamic(
  () => import("@/components/ddp").then((m) => ({ default: m.DDP })),
  { ssr: false, loading: () => <SectionSkeleton variant="ddp" /> }
);
export { DDP };
