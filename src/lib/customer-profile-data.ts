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
