import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { products, type Product } from "@/lib/products-data";
import { pickHeroImages, getMainImagePath } from "@/lib/product-images";
import { HeroGallery } from "@/components/hero-gallery";
import {
  ALL_TAGS,
  type TagDimension,
  getTagInfo,
  getAllTagSlugs,
  slugify,
  seoForTag,
} from "@/lib/tag-archive";
import { KeywordCloud } from "@/components/keyword-cloud";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

interface PageProps {
  params: Promise<{ dimension: string; slug: string }>;
}

const DIMENSION_LABEL: Record<TagDimension, string> = {
  category: "Apparel",
  sport: "Sport",
  scenario: "Use Case",
};

const DIMENSION_PLURAL: Record<TagDimension, string> = {
  category: "categories",
  sport: "sports",
  scenario: "use cases",
};

const DIMENSION_DESC: Record<TagDimension, string> = {
  category: "Garment type",
  sport: "Sport or activity",
  scenario: "Industry or use case",
};

export async function generateStaticParams() {
  const params: Array<{ dimension: string; slug: string }> = [];
  (["category", "sport", "scenario"] as TagDimension[]).forEach((dim) => {
    getAllTagSlugs(dim).forEach(({ slug }) => {
      params.push({ dimension: dim, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dimension, slug } = await params;
  const tag = findTagBySlug(dimension as TagDimension, slug);
  if (!tag) return {};
  const { label, dimension: dim, description } = tag;
  const seo = seoForTag(dim, label);
  const path = `/tag/${dim}/${slug}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      type: "website",
      images: ["/hero-products.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/hero-products.webp"],
    },
  };
}

function findTagBySlug(dimension: TagDimension, slug: string) {
  const dict = ALL_TAGS[dimension];
  if (!dict) return null;
  for (const [value, info] of Object.entries(dict)) {
    if (slugify(info.label) === slug) {
      return { ...info, dimension, value };
    }
  }
  return null;
}

function productsForTag(dimension: TagDimension, value: string): Product[] {
  if (dimension === "category") {
    return products.filter((p: Product) => p.category === value);
  }
  if (dimension === "sport") {
    return products.filter((p: Product) => p.sports.includes(value as never));
  }
  return products.filter((p: Product) => p.scenarios.includes(value as never));
}

const GRADIENTS = [
  "from-amber-500 to-rose-600",
  "from-violet-600 to-indigo-700",
  "from-emerald-500 to-teal-700",
  "from-sky-500 to-blue-700",
  "from-rose-500 to-pink-700",
  "from-orange-500 to-red-600",
  "from-fuchsia-500 to-purple-700",
  "from-cyan-500 to-blue-700",
  "from-lime-500 to-emerald-700",
];

function gradientFor(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export default async function TagArchivePage({ params }: PageProps) {
  const { dimension, slug } = await params;
  if (!["category", "sport", "scenario"].includes(dimension)) notFound();
  const dim = dimension as TagDimension;
  const tag = findTagBySlug(dim, slug);
  if (!tag) notFound();

  const matches = productsForTag(dim, tag.value);
  const allTagsInDim = Object.entries(ALL_TAGS[dim])
    .filter(([v]) => v !== tag.value)
    .slice(0, 18);

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: tag.label, path: `/tag/${dim}/${slug}` },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${tag.label} sublimation products`,
    itemListElement: matches.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/products/all/${p.slug}/`,
      name: p.name,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: seoForTag(dim, tag.label).title,
          description: seoForTag(dim, tag.label).description,
          url: `${SITE_URL}/tag/${dim}/${slug}/`,
          keywords: seoForTag(dim, tag.label).keywords.join(", "),
          inLanguage: "en",
        }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
            <nav className="flex items-center gap-1.5 text-xs text-background/60 mb-8">
              <Link href="/" className="hover:text-background">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/products/" className="hover:text-background">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-background/90">{tag.label}</span>
            </nav>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-end">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-background/80">
                    {DIMENSION_LABEL[dim]} archive
                  </span>
                  <span className="text-3xl">{tag.icon}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4">
                  {seoForTag(dim, tag.label).h1}
                </h1>
                <p className="text-sm text-background/60 mb-3 font-medium uppercase tracking-wider">
                  {tag.label} &middot; {DIMENSION_LABEL[dim]}
                </p>
                <p className="text-base sm:text-lg text-background/70 max-w-2xl leading-relaxed">
                  {tag.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full border border-background/20 px-3 py-1 text-background/80">
                    {matches.length} {matches.length === 1 ? "product" : "products"} available
                  </span>
                  <span className="rounded-full border border-background/20 px-3 py-1 text-background/80">
                    {DIMENSION_DESC[dim]}
                  </span>
                  <span className="rounded-full border border-background/20 px-3 py-1 text-background/80">
                    MOQ from 30 pcs
                  </span>
                </div>
                <Link
                  href={`/products/all/?${dim === "category" ? "category" : dim === "sport" ? "sport" : "scenario"}=${encodeURIComponent(tag.value)}`}
                  className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Open in filter view →
                </Link>
              </div>

              <HeroGallery images={pickHeroImages(matches, 4, `${dim}-${slug}`)} />
            </div>
          </div>
        </section>

        {/* Process + Benefits */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Recommended process
              </div>
              <div className="text-xl font-bold text-foreground">{tag.process}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Every {tag.label.toLowerCase()} product below is built with this process at our Yiwu factory.
                Print becomes part of the fabric — no peeling, no cracking, full edge-to-edge coverage.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                What you get
              </div>
              <ul className="space-y-2">
                {tag.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                All {tag.label} products ({matches.length})
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Full coverage, edge-to-edge, on your fabric of choice.
              </p>
            </div>
            <Link
              href={`/products/all/?${dim === "category" ? "category" : dim === "sport" ? "sport" : "scenario"}=${encodeURIComponent(tag.value)}`}
              className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              See with filters →
            </Link>
          </div>

          {matches.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No products in this archive yet. Browse{" "}
                <Link href="/products/all/" className="text-primary hover:underline">all 100 products</Link>{" "}
                or contact us for a custom quote.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {matches.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/all/${p.slug}/`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={getMainImagePath(p.number)}
                      alt={p.name}
                      width={600}
                      height={750}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 rounded bg-black/30 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white">
                      MOQ {p.moq}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1">
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {p.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Other tags in same dimension */}
        <section className="border-t border-border bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-lg font-bold tracking-tight mb-4">
              Other {DIMENSION_PLURAL[dim]}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTagsInDim.map(([value, info]) => (
                <Link
                  key={value}
                  href={`/tag/${dim}/${slugify(info.label)}/`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-dimension keyword directory - SEO */}
        <section className="border-t border-border bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-lg font-bold tracking-tight mb-2">
              Related custom apparel searches
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {`Continue browsing the catalog by ${dim === "category" ? "sport or use case" : "apparel type, sport, or use case"}. Every link below leads to a tag page with sublimation-printed garments ready to ship DDP worldwide.`}
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {dim !== "category" && <KeywordCloud dimension="category" title="By apparel type" />}
              {dim !== "sport" && <KeywordCloud dimension="sport" title="By sport" />}
              {dim !== "scenario" && <KeywordCloud dimension="scenario" title="By use case" />}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to print your {tag.label.toLowerCase()} order?
            </h2>
            <p className="text-sm text-background/70 mb-6 max-w-xl mx-auto">
              Send us your artwork — get a landed, duty-paid quote within one business day.
              30–50 pc MOQ, 7–10 day sample, DDP shipping to US/EU/UK/AU.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get a quote
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-md border border-background/30 bg-transparent px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
