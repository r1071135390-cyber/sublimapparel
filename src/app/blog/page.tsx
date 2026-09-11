import type { Metadata } from"next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import Link from"next/link";
import Image from"next/image";
import { ArrowRight, Clock, Calendar } from"lucide-react";
import { blogPosts, getFeaturedPost, getAllCategories } from"@/lib/blog";

export const metadata = buildPageMetadata({
    title: "Blog | Sublimation Apparel Insights & Factory Stories",
    description: "Industry guides, factory stories, and B2B apparel manufacturing insights from a 2,000 m² Yiwu sublimation factory. Sublimation vs DTG, DDP shipping, fabric gui…",
    keywords: ["sublimation printing blog", "apparel manufacturing insights", "Yiwu factory", "B2B apparel guide", "DTG vs DTF", "DDP shipping guide", "esports jersey fabric"],
    alternates: { canonical:"./" },
    ogTitle: "SublimApparel Blog — Apparel Manufacturing Insights",
    ogDescription: "Industry guides, factory stories, and B2B apparel insights. Written by the team behind our 2,000 m² Yiwu sublimation factory.",
    ogImage: "/blog/",
  });;

export default function BlogIndexPage() {
  const featured = getFeaturedPost()!;
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const categories = getAllCategories();

  // 2026-09-11 push (Round 7): add Blog + ItemList JSON-LD on /blog/.
  // Google treats /blog/ as a flat archive of <a> links by default, which
  // misses the fact that each link is a distinct Article. With Blog as the
  // @type and an ItemList enumerating the actual blog post URLs, Google's
  // crawler can map the index → individual posts without re-walking
  // internal links, and the index itself becomes eligible for "Articles
  // from this site" rich-result groups in the SERP carousel.
  const blogList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://sublimapparel.com/blog/#blog",
    url: "https://sublimapparel.com/blog/",
    name: "SublimApparel Blog — Apparel Manufacturing Insights",
    description:
      "Industry guides, factory stories, and B2B apparel manufacturing insights from a 2,000 m² Yiwu sublimation factory. Sublimation vs DTG, DDP shipping, fabric guides, esports jersey fabric, and more.",
    inLanguage: "en",
    publisher: { "@id": "https://sublimapparel.com/#organization" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blogPosts.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: blogPosts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sublimapparel.com/blog/${p.slug}/`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ])} />
      <JsonLd data={blogList} />
      <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:mb-4 md:text-sm">
            [ The Journal ]
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-7xl">
            Apparel, from the
            <br />
            <span className="text-[#cc3d00]">factory floor.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base text-[#3a3a3a] md:mt-8 md:text-lg">
            Industry guides, factory stories, and B2B apparel manufacturing
            insights — written by the team behind our 2,000 m² Yiwu sublimation
            factory. No recycled content. No AI fluff. Just what we have
            learned in over a decade of making custom apparel.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <div className="mb-6 flex items-end justify-between border-b-2 border-black pb-4 md:mb-8 md:pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
                Featured article
              </p>
              <span className="hidden text-xs text-[#6b6b6b] md:block">
                Most read
              </span>
            </div>
            <Link
              href={`/blog/${featured.slug}/`}
              className="group grid gap-8 md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-black bg-[#f5f5f5]">
                <Image
                  src={featured.coverImage}
                  alt={featured.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                  <span className="bg-black px-2 py-0.5 text-white">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year:"numeric",
                      month:"short",
                      day:"numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-black leading-tight tracking-tight text-black md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#3a3a3a] md:mt-6 md:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#cc3d00] transition group-hover:gap-3">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
              Topics:
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="border-2 border-black bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-4 md:mb-12 md:pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
                Latest articles
              </p>
              <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-4xl">
                All posts.
              </h2>
            </div>
            <p className="hidden text-sm text-[#6b6b6b] md:block">
              {blogPosts.length} articles
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-[#6b6b6b] md:text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year:"numeric",
                        month:"short",
                        day:"numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-black leading-tight text-black md:text-lg">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-[#3a3a3a] md:text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#cc3d00] transition group-hover:gap-2">
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-09-11 push (Round 7): internal cross-link band on /blog/.
          The blog previously had only "Get a Free Quote" as an
          outbound link below the post grid, so the page was a one-way
          funnel that ate up crawl budget without giving Google a way
          to discover the higher-value transactional hubs. The 3
          cross-link cards route link equity back to /products/,
          /industries/, and /cases/ and give readers who finished an
          article an obvious next step into the buyer's journey. */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
            Keep exploring
          </p>
          <h2 className="mb-3 text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-4xl">
            From the journal to the catalog
          </h2>
          <p className="mb-8 max-w-3xl text-sm text-black/70 md:text-base">
            Every post is rooted in real production experience — so the
            natural next step is the catalog, the 12 industry hubs, or the
            case-study gallery.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/products/"
              className="group flex flex-col border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
            >
              <div className="text-[10px] font-black uppercase tracking-widest">
                Catalog
              </div>
              <div className="mt-2 text-lg font-black uppercase leading-tight">
                All 119 products
              </div>
              <div className="mt-2 flex-1 text-sm">
                T-shirts, hoodies, jerseys, sportswear, polos, jackets, pants, sweatshirts, shirts, skirts, caps, home textiles, workwear, and tank tops. Filter by sport, scenario, and garment type.
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                Open the catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/industries/"
              className="group flex flex-col border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
            >
              <div className="text-[10px] font-black uppercase tracking-widest">
                Industries
              </div>
              <div className="mt-2 text-lg font-black uppercase leading-tight">
                12 verticals
              </div>
              <div className="mt-2 flex-1 text-sm">
                Sports teams, race events, conferences, music festivals, schools, breweries, hospitality, marketing, trade shows, brands, political campaigns, and e-commerce fulfillment.
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                See all industries
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/cases/"
              className="group flex flex-col border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
            >
              <div className="text-[10px] font-black uppercase tracking-widest">
                Case Studies
              </div>
              <div className="mt-2 text-lg font-black uppercase leading-tight">
                6,000+ projects
              </div>
              <div className="mt-2 flex-1 text-sm">
                Real briefs, fabric choices, and delivery outcomes from sports leagues, race events, music festivals, conferences, schools, and more.
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                Open the gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center md:px-8 md:py-16">
          <h2 className="mb-3 text-2xl font-black uppercase leading-tight md:mb-4 md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mb-6 text-sm md:mb-8 md:text-base">
            Send us your design and quantity. We will recommend the right
            technique and quote within 24 hours.
          </p>
          <Link
            href="/get-a-quote/"
            className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-[#cc3d00] md:px-8 md:py-4 md:text-base"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
