import type { Metadata } from "next";

const ROOT = {
  title: "SublimApparel — Custom Sublimation Apparel Manufacturer",
  description:
    "Yiwu-based sublimation & all-over cotton printing factory. MOQ 50, DDP to 100+ countries, US warehouse in Fontana CA.",
  ogImage: "/og/og-home.webp",
  siteName: "SublimApparel",
  keywords: [
    "sublimation apparel manufacturer",
    "custom sublimated clothing",
    "all-over print factory",
    "Yiwu apparel factory",
    "DDP shipping worldwide",
    "MOQ 50",
    "US warehouse Fontana CA",
    "B2B apparel manufacturer",
  ],
};

type Input = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  authors?: Metadata["authors"];
  other?: Metadata["other"];
  alternates?: Metadata["alternates"];
  robots?: Metadata["robots"];
  canonical?: string;
  noindex?: boolean;
};

const truncated = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

export function buildPageMetadata(input: Input = {}): Metadata {
  const title = input.title || ROOT.title;
  const description = input.description || ROOT.description;
  const ogTitle = input.ogTitle || title;
  const ogDescription = input.ogDescription || description;
  const ogImage = input.ogImage || ROOT.ogImage;
  const twitterTitle = input.twitterTitle || ogTitle;
  const twitterDescription = input.twitterDescription || ogDescription;

  const meta: Metadata = {
    title: truncated(title, 60),
    description: truncated(description, 160),
    keywords: input.keywords || ROOT.keywords,
    openGraph: {
      title: truncated(ogTitle, 60),
      description: truncated(ogDescription, 125),
      url: input.canonical,
      siteName: ROOT.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: truncated(twitterTitle, 70),
      description: truncated(twitterDescription, 200),
      images: [ogImage],
    },
  };

  if (input.authors) meta.authors = input.authors;
  if (input.other) meta.other = input.other;
  if (input.alternates) meta.alternates = input.alternates;
  if (input.robots) meta.robots = input.robots;
  if (input.canonical) {
    meta.alternates = { ...(meta.alternates as object), canonical: input.canonical };
  }
  if (input.noindex) {
    meta.robots = { index: false, follow: false, ...(input.robots as object) };
  }

  return meta;
}

export const ROOT_METADATA = ROOT;
