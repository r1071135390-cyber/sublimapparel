import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import Image from "next/image";
import {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Camera,
  ImageOff,
} from "lucide-react";
import { industries, getIndustryBySlug } from "@/lib/cases";
import { products, type Product } from "@/lib/products-data";
import { tagArchiveLink } from "@/lib/tag-utils";
import { getProductImages } from "@/lib/product-images";

const iconMap: Record<string, typeof CalendarDays> = {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) return { title: "Case Studies " };
  return {
    title: `${ind.title} Case Studies — SublimApparel`,
    description: ind.blurb,
    robots: { index: false, follow: true },
  };
}

export default async function CaseCategoryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) notFound();

  const Icon = iconMap[ind.icon] ?? Camera;
  const hasCases = ind.cases.length > 0;

  return (
    <>
      {/* Top utility bar */}
      <div className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Global DDP shipping</span>
            <span className="text-[#00c2ff]">·</span>
            <span>US stock in Fontana, CA</span>
            <span className="text-[#00c2ff]">·</span>
            <span>MOQ from 50 pcs</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Replies within 1 business day</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            href="/cases"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black/70 transition-colors hover:text-[#ff4d00]"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            All case studies
          </Link>

          <div className="flex items-start gap-4">
            <div className="hidden h-16 w-16 flex-shrink-0 items-center justify-center border-2 border-black bg-[#ff4d00] text-white md:flex">
              <Icon size={32} strokeWidth={2.5} />
            </div>
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                [ Industry / {String(industries.findIndex((i) => i.slug === ind.slug) + 1).padStart(3, "0")} ]
              </div>
              <h1 className="mb-4 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                {ind.title}
              </h1>
              <p className="max-w-2xl text-base font-bold leading-relaxed md:text-lg">
                {ind.blurb}
              </p>
            </div>
          </div>

          {/* The value pitch (orange highlight) */}
          <div className="mt-8 border-l-4 border-[#ff4d00] bg-[#fff7f0] px-4 py-3 text-sm font-bold leading-relaxed text-black md:text-base">
            {ind.pitch}
          </div>
        </div>
      </section>

      {/* Related products — pulled from /products/all matching the industry's scenario tag */}
      {(() => {
        const related: Product[] = products
          .filter(
            (p) =>
              p.scenarios.includes(ind.relatedScenario) &&
              (!ind.relatedCategory || p.category === ind.relatedCategory) &&
              (!ind.relatedSport || p.sports.includes(ind.relatedSport)),
          )
          .slice(0, 8);
        if (related.length === 0) return null;
        return (
          <section className="border-b-2 border-black bg-[#faf9f6]">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                    [ Related products ]
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                    Built for {ind.title.toLowerCase()}
                  </h2>
                </div>
                <Link
                  href={tagArchiveLink("scenario", ind.relatedScenario)}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black transition-colors hover:text-[#ff4d00]"
                >
                  See all {ind.relatedScenario} products
                  <ArrowRight size={14} strokeWidth={3} />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/all/${p.slug}/`}
                    className="group flex flex-col border-2 border-black bg-white p-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#ff4d00]"
                  >
                  {(() => {
                    const imgs = getProductImages(p.number);
                    const first = imgs[0];
                    if (first) {
                      return (
                        <div className="relative mb-3 aspect-square overflow-hidden border-2 border-black bg-[#F5F5F5]">
                          <Image
                            src={first}
                            alt={`${p.name} - custom ${p.category.toLowerCase()} from SublimApparel`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    }
                    return (
                      <div className="mb-3 flex aspect-square items-center justify-center border-2 border-black bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-5xl font-black text-white">
                        {p.category.charAt(0)}
                      </div>
                    );
                  })()}
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
                      {p.category}
                    </div>
                    <h3 className="mt-0.5 text-sm font-black uppercase leading-tight tracking-tight line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium leading-snug text-black/65 line-clamp-2">
                      {p.description}
                    </p>
                    <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-black/55">
                      MOQ {p.moq}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Gallery */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          {hasCases ? (
            <>
              <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-4">
                <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                  {ind.cases.length} case stud{ind.cases.length === 1 ? "y" : "ies"}
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ind.cases.map((c) => (
                  <article
                    key={c.id}
                    className="flex flex-col border-2 border-black bg-white p-5"
                  >
                    <div className="mb-4 aspect-[4/3] overflow-hidden border-2 border-black bg-[#faf9f6]">
                      {c.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.images[0]}
                          alt={c.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-black/30">
                          <ImageOff size={36} />
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-black uppercase leading-tight">
                      {c.title}
                    </h3>
                    {c.client && (
                      <div className="mb-3 text-xs font-bold uppercase tracking-wider text-black/60">
                        {c.client}
                        {c.year ? ` · ${c.year}` : ""}
                      </div>
                    )}
                    <p className="text-sm font-medium leading-relaxed text-black/75">
                      {c.summary}
                    </p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            /* Empty state — gallery under construction */
            <div className="border-2 border-dashed border-black/30 bg-[#faf9f6] px-6 py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-black bg-white text-[#ff4d00]">
                <ImageOff size={36} strokeWidth={2.5} />
              </div>
              <h2 className="mb-3 text-2xl font-black uppercase leading-tight md:text-3xl">
                Gallery under construction
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base font-bold leading-relaxed text-black/70">
                We&apos;re putting together real examples for this category. In the meantime, send us your artwork and we&apos;ll come back with a free mockup and a landed, duty-paid quote within 1 business day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <RequestQuoteLink label="[slug] / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1">Get a quote
                  <ArrowRight size={16} strokeWidth={3} /></RequestQuoteLink>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white"
                >
                  Browse other categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related industries */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            12 industries · serving 50+ countries · since 2014
          </p>
          <h2 className="mb-6 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            [ Other industries — {industries.length - 1} more ]
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {industries
              .filter((i) => i.slug !== ind.slug)
              .map((i) => {
                const OtherIcon = iconMap[i.icon] ?? Camera;
                const otherIdx = industries.findIndex((x) => x.slug === i.slug) + 1;
                return (
                  <Link
                    key={i.slug}
                    href={`/cases/${i.slug}`}
                    className="group relative flex items-center gap-3 border-2 border-black bg-white px-4 py-3 transition-all hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white"
                  >
                    <OtherIcon size={18} strokeWidth={2.5} className="shrink-0" />
                    <span className="flex-1 text-sm font-black uppercase">
                      {i.title}
                    </span>
                    <span className="font-mono text-[10px] font-bold opacity-40 group-hover:opacity-100">
                      {String(otherIdx).padStart(3, "0")}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
