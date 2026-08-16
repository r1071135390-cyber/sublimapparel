import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SublimApparel",
      logo: {
        "@type": "ImageObject",
        url: "/sublimapparel-logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}/`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "/blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <main>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b-2 border-black bg-[#faf9f6]"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b] md:px-8 md:py-4 md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ff4d00]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog/" className="hover:text-[#ff4d00]">
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
            className="mb-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#6b6b6b] transition-colors hover:text-[#ff4d00] md:mb-8"
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
          <div className="space-y-4 text-base leading-relaxed text-[#1a1a1a] md:space-y-5 md:text-lg">
            {post.intro.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-black first-letter:leading-none first-letter:text-[#ff4d00] md:first-letter:text-7xl"
                    : ""
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* Key takeaways (callout) */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <aside className="my-10 border-2 border-black bg-[#faf9f6] p-6 md:my-12 md:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:mb-4 md:text-sm">
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
                <span className="mr-2 text-[#ff4d00]">0{i + 1}.</span>
                {section.heading}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[#1a1a1a] md:space-y-5 md:text-lg">
                {section.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Internal CTA */}
          <div className="mt-12 border-2 border-[#ff4d00] bg-[#ff4d00]/5 p-6 md:mt-16 md:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
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
              className="inline-flex items-center gap-2 bg-[#ff4d00] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64500] md:px-6 md:py-3 md:text-base"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="border-t-2 border-black bg-[#faf9f6]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
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
                    <div className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ff4d00] transition group-hover:gap-2">
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
