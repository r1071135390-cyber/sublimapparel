import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Star, Quote } from "lucide-react";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { buildBlogPostGraph } from "@/lib/breadcrumb";
import {
  filterReviewsForBlog,
  hasAggregateableReviews,
  computeAggregateRating,
  toSchemaReview,
} from "@/lib/reviews";

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    return {
      title: post.metaTitle,
      description: post.metaDescription,
      keywords: post.tags,
      alternates: { canonical: `/blog/${post.slug}/` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: [post.coverImage],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  // 2026-09-11 (R31): per-blog-post review aggregation. Pull the
  // subset of verifiedReviews that are linked to this post
  // (relatedBlogSlug === post.slug). Gated by the same contract as
  // R27/R28/R29/R30 — verifiedReviews empty today, so the spread
  // strips both fields at JSON-LD build time.
  const blogReviews = filterReviewsForBlog(post.slug);
  const blogAggregate = hasAggregateableReviews(blogReviews)
    ? computeAggregateRating(blogReviews)
    : null;

  // 2026-09-11 push (Round 8 part 1): upgrade Article → BlogPosting +
  // link the post to the global entity graph via @id. BlogPosting is
  // a more specific @type than Article — it tells Google the page is
  // a "blog post inside a blog" rather than a stand-alone article, so
  // the post becomes eligible for the blog carousel rich result and
  // joins the same entity chain (publisher → #organization, author →
  // #person-ramon) that all other content on the site uses.
  //
  // 2026-09-12 (R35-D): consolidate the previous 3 JSON-LD objects
  // (articleSchema + breadcrumbSchema + faqSchema) inside one JsonLd
  // array into a single @graph block via buildBlogPostGraph. The
  // BlogPosting payload (headline, datePublished, dateModified,
  // author @id, publisher @id, isPartOf #blog, embedded review +
  // aggregateRating when reviews exist, wordCount, timeRequired)
  // is fed straight into the helper; the helper wraps it with
  // WebPage #webpage, Person #person-ramon (defined inline so the
  // author @id resolves without an external lookup), BreadcrumbList
  // #breadcrumb, and FAQPage #faq (when post.faqs.length > 0),
  // all joined via @id so Google parses the entire entity surface
  // in one pass.
  const blogGraph = buildBlogPostGraph({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    date: post.date,
    author: post.author,
    category: post.category,
    tags: post.tags,
    readTime: post.readTime,
    content: post.content,
    faqs: post.faqs,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` },
    ],
    ...(blogReviews.length > 0
      ? { review: blogReviews.map(toSchemaReview) }
      : {}),
    ...(blogAggregate
      ? {
          aggregateRating: {
            ratingValue: blogAggregate.ratingValue,
            reviewCount: blogAggregate.reviewCount,
            bestRating: blogAggregate.bestRating,
            worstRating: blogAggregate.worstRating,
          },
        }
      : {}),
  });

  return (
    <main>
      <JsonLd data={blogGraph} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b-2 border-black bg-[#faf9f6]"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b] md:px-8 md:py-4 md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#cc3d00]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog/" className="hover:text-[#cc3d00]">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-black">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
          <Link
            href="/blog/"
            className="mb-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#6b6b6b] transition-colors hover:text-[#cc3d00] md:mb-8"
          >
            <ArrowLeft className="h-3 w-3" />
            All articles
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider md:mb-6">
            <span className="bg-black px-2.5 py-1 text-white">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[#6b6b6b]">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 text-[#6b6b6b]">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-[#6b6b6b]">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
          <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#3a3a3a] md:mt-6 md:text-lg">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Cover image */}
      <div className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
          <div className="relative aspect-[16/9] overflow-hidden border-2 border-black bg-[#f5f5f5]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          {/* Intro */}
          <div className="space-y-4 text-base leading-relaxed text-[#1a1a1a] md:space-y-5 md:text-lg [&_a]:text-[#cc3d00] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#ff4d00]">
            {post.intro.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-black first-letter:leading-none first-letter:text-[#cc3d00] md:first-letter:text-7xl"
                    : ""
                }
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>

          {/* Key takeaways (callout) */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <aside className="my-10 border-2 border-black bg-[#faf9f6] p-6 md:my-12 md:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:mb-4 md:text-sm">
                Key Takeaways
              </p>
              <ul className="space-y-2.5 md:space-y-3">
                {post.keyTakeaways.map((takeaway, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#1a1a1a] md:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[#ff4d00]" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Sections */}
          {post.sections.map((section, i) => (
            <div key={i} className="mt-10 md:mt-12">
              <h2 className="mb-4 text-2xl font-black leading-tight tracking-tight text-black md:mb-6 md:text-3xl">
                <span className="mr-2 text-[#cc3d00]">0{i + 1}.</span>
                {section.heading}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[#1a1a1a] md:space-y-5 md:text-lg [&_a]:text-[#cc3d00] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#ff4d00]">
                {section.paragraphs.map((para, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          ))}

          {/* FAQ section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 md:mt-16">
                <h2 className="mb-6 text-2xl font-black leading-tight tracking-tight text-black md:mb-8 md:text-3xl">
                  <span className="mr-2 text-[#cc3d00]">?</span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6 md:space-y-8">
                  {post.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-[#ff4d00] bg-[#faf9f6] p-5 md:p-6"
                    >
                      <h3 className="mb-3 text-lg font-bold leading-snug text-black md:text-xl">
                        {faq.q}
                      </h3>
                      <p className="text-base leading-relaxed text-[#1a1a1a] md:text-lg">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
          )}

          {/* Internal CTA */}
          <div className="mt-12 border-2 border-[#ff4d00] bg-[#ff4d00]/5 p-6 md:mt-16 md:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
              Ready to start?
            </p>
            <h3 className="mb-3 text-xl font-black leading-tight text-black md:mb-4 md:text-2xl">
              Get a custom quote in 24 hours.
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[#3a3a3a] md:mb-6 md:text-base">
              Send us your design, quantity, and deadline. We will recommend
              the right technique and provide a transparent DDP quote
              including shipping to your door.
            </p>
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 bg-[#ff4d00] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64500] md:px-6 md:py-3 md:text-base"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Buyer feedback — per-blog-post review surface.
          2026-09-11 (R31): mirrors the /about/, /cases/*, and
          /products/* review blocks, but scoped to this post
          (filtered by relatedBlogSlug === post.slug). Renders only
          when at least one review is attached to this post — when
          empty (today's state), the entire section is omitted to
          keep the post focused on its content. The /about/ page
          already shows the global "Reviews coming soon" placeholder;
          repeating it on every blog post would be visual noise. The
          embedded schema fields (BlogPosting.review + BlogPosting.
          aggregateRating) and the UI section light up simultaneously
          the day a real review with relatedBlogSlug === post.slug is
          added to verifiedReviews. */}
      {blogReviews.length > 0 && (
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Buyer feedback
                </div>
                <h2 className="text-3xl font-black leading-tight text-black md:text-5xl">
                  What readers say
                  <br />
                  <span className="text-[#cc3d00]">after applying this post.</span>
                </h2>
              </div>
              {blogAggregate ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#cc3d00]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={
                          "h-5 w-5 " +
                          (i <= Math.round(blogAggregate.ratingValue)
                            ? "fill-[#cc3d00]"
                            : "opacity-30")
                        }
                      />
                    ))}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-black">
                    {blogAggregate.ratingValue.toFixed(1)} / 5
                    <span className="ml-1 text-black/60">
                      · {blogAggregate.reviewCount} review
                      {blogAggregate.reviewCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogReviews.map((r) => (
                <article
                  key={r.id}
                  className="flex flex-col border-2 border-black bg-[#faf9f6] p-6"
                >
                  <div className="mb-3 flex items-center gap-1 text-[#cc3d00]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={
                          "h-4 w-4 " +
                          (typeof r.ratingValue === "number" &&
                          i <= Math.round(r.ratingValue)
                            ? "fill-[#cc3d00]"
                            : "opacity-30")
                        }
                      />
                    ))}
                    {typeof r.ratingValue === "number" ? (
                      <span className="ml-1 text-xs font-black uppercase tracking-widest text-black/70">
                        {r.ratingValue.toFixed(1)} / 5
                      </span>
                    ) : null}
                  </div>
                  <Quote className="mb-2 h-5 w-5 text-[#00c2ff]" />
                  <p className="flex-1 text-base leading-relaxed text-black">
                    {r.reviewBody}
                  </p>
                  <div className="mt-4 border-t-2 border-black/10 pt-3 text-xs font-black uppercase tracking-widest text-black/70">
                    {r.author}
                    {r.authorRole ? ` · ${r.authorRole}` : ""}
                    <span className="ml-2 text-black/40">
                      {r.datePublished}
                    </span>
                    {r.url ? (
                      <a
                        href={r.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="ml-2 text-[#00c2ff] underline"
                      >
                        Source ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="border-t-2 border-black bg-[#faf9f6]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
              Continue reading
            </p>
            <h2 className="mb-8 text-2xl font-black uppercase leading-tight tracking-tight text-black md:mb-12 md:text-4xl">
              More from the journal.
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
                  className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                    <Image
                      src={p.coverImage}
                      alt={p.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <h3 className="mb-2 text-base font-black leading-tight text-black md:text-lg">
                      {p.title}
                    </h3>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-[#3a3a3a] md:text-sm">
                      {p.excerpt}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#cc3d00] transition group-hover:gap-2">
                      Read article
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
