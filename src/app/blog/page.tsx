import type { Metadata } from"next";
import Link from"next/link";
import Image from"next/image";
import { ArrowRight, Clock, Calendar } from"lucide-react";
import { blogPosts, getFeaturedPost, getAllCategories } from"@/lib/blog";

export const metadata: Metadata = {
  title:"Blog | Sublimation Apparel Industry Insights & Factory Stories",
  description:
"Industry guides, factory stories, and B2B apparel manufacturing insights from a 8,000 m² Yiwu sublimation factory. Sublimation vs DTG, DDP shipping, fabric guides, and more.",
  keywords: [
"sublimation printing blog",
"apparel manufacturing insights",
"Yiwu factory",
"B2B apparel guide",
"DTG vs DTF",
"DDP shipping guide",
"esports jersey fabric",
  ],
  alternates: { canonical:"./" },
  openGraph: {
    title:"SublimApparel Blog — Apparel Manufacturing Insights",
    description:
"Industry guides, factory stories, and B2B apparel insights. Written by the team behind our 8,000 m² Yiwu sublimation factory.",
    url:"/blog/",
    type:"website",
  },
};

export default function BlogIndexPage() {
  const featured = getFeaturedPost()!;
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const categories = getAllCategories();

  return (
    <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:mb-4 md:text-sm">
            [ The Journal ]
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-7xl">
            Apparel, from the
            <br />
            <span className="text-[#ff4d00]">factory floor.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base text-[#3a3a3a] md:mt-8 md:text-lg">
            Industry guides, factory stories, and B2B apparel manufacturing
            insights — written by the team behind our 8,000 m² Yiwu sublimation
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
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
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#ff4d00] transition group-hover:gap-3">
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
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
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
                  <div className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ff4d00] transition group-hover:gap-2">
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-white">
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
            className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-[#ff4d00] md:px-8 md:py-4 md:text-base"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </main>
  );
}
