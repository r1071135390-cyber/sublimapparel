import type { Metadata } from "next";

export interface CustomerProfileItem {
  name: string;
  details: string[];
}

export interface CustomerProfileCategory {
  title: string;
  icon: string;
  items: CustomerProfileItem[];
}

export interface CustomerProfileFeature {
  icon: string;
  title: string;
  body: string;
}

export interface CustomerProfileData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: string;
  badge: string;
  h1: string;
  heroTitle: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { value: string; label: string }[];
  solutionsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sections: CustomerProfileCategory[];
  };
  whySection: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    features: CustomerProfileFeature[];
  };
  perfectFor: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  faqTitle: string;
  faqSubtitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  /**
   * Optional social-share OG image (1200x630). If omitted, falls back to `hero`.
   * The OG image is what LinkedIn/Twitter/FB/Slack show when the URL is shared.
   */
  ogImage?: string;
  // 2026-09-13 (R59): per-industry HowTo block. When supplied,
  // the customer-profile-template emits a HowTo node in the
  // @graph so Google can surface the buyer journey as a HowTo
  // rich result for "how to" / step-by-step queries (PAA
  // cluster). The shape mirrors buildHowToNode() from
  // breadcrumb.ts (name + description + ordered steps with
  // name/text), so every industry page can opt in by adding
  // a `howto` field. Omitted / undefined = the @graph stays
  // byte-equivalent to the pre-R59 schema.
  howto?: {
    /** HowTo rich result title, e.g. "How we make custom
     *  sublimation team jerseys for clubs and leagues". */
    name: string;
    /** One-line description. Lands in the HowTo rich
     *  result subtitle and AI Overview extraction. */
    description: string;
    /** ISO 8601 total time for the whole procedure,
     *  e.g. "P30D" (30 days) for a typical bulk run. */
    totalTime?: string;
    /** Ordered list of 4-7 steps. 5 is the sweet spot
     *  per Google HowTo best practice (3-10 range). */
    steps: Array<{ name: string; text: string }>;
  };
}

export function buildMetadata(data: CustomerProfileData): Metadata {
  const ogImage = data.ogImage ?? data.hero;
  // Truncate title to 60 chars to fit Google SERP limit (no template suffix)
  const truncatedTitle = (data.metaTitle || "").length > 60
    ? (data.metaTitle || "").slice(0, 59) + "…"
    : data.metaTitle;
  return {
    title: { absolute: truncatedTitle },
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: data.slug },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: data.slug,
      type: "website",
      siteName: "SublimApparel",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: data.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [ogImage],
    },
  };
}
