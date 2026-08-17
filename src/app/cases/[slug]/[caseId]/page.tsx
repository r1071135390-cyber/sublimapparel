import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Package, MapPin } from "lucide-react";
import { industries, getIndustryBySlug } from "@/lib/cases";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { products } from "@/lib/products-data";
import { getProductImages } from "@/lib/product-images";

type Props = {
  params: Promise<{ slug: string; caseId: string }>;
};

export async function generateStaticParams() {
  const params: { slug: string; caseId: string }[] = [];
  for (const ind of industries) {
    for (const c of ind.cases) {
      params.push({ slug: ind.slug, caseId: c.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, caseId } = await params;
  const ind = getIndustryBySlug(slug);
  const c = ind?.cases.find((x) => x.id === caseId);
  if (!c) return { title: "Case Study — SublimApparel" };
  return {
    title: `${c.title} | SublimApparel Case Study`,
    description: c.summary.slice(0, 160),
    robots: { index: true, follow: true },
  };
}

function getRelatedProduct(nameHint: string) {
  return products.find((p) =>
    p.name.toLowerCase().includes(nameHint.toLowerCase().split(" ")[0])
  );
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug, caseId } = await params;
  const ind = getIndustryBySlug(slug);
  const c = ind?.cases.find((x) => x.id === caseId);
  if (!ind || !c) notFound();

  // Collect related products
  const related = c.products
    .map((pName) => getRelatedProduct(pName))
    .filter((p): p is (typeof products)[number] => Boolean(p))
    .slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Link
            href={`/cases/${ind.slug}/`}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            {ind.title}
          </Link>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
            Case Study · {c.year} · {ind.title}
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
            {c.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <CalendarDays size={14} className="text-[#ff4d00]" />
              {c.year}
            </span>
            <span className="flex items-center gap-2">
              <Package size={14} className="text-[#ff4d00]" />
              {c.products.length} product type{c.products.length === 1 ? "" : "s"}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-[#ff4d00]" />
              {c.client}
            </span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:py-20">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#ff4d00]">
              The Project
            </h2>
            <p className="text-lg leading-relaxed text-[#0a0a0a] md:text-xl">
              {c.summary}
            </p>
          </div>
          <aside className="space-y-4 border-l-2 border-black pl-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                Client
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{c.client}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                Year
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{c.year}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                Industry
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{ind.title}</p>
            </div>
            <RequestQuoteLink
              label={`Case / ${c.id} / Get a quote like this`}
              className="inline-flex w-full items-center justify-center bg-[#ff4d00] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#e64500]"
            >
              Get a quote like this
            </RequestQuoteLink>
          </aside>
        </div>
      </section>

      {/* Products made */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="mb-8 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
            What we made
          </h2>
          <ul className="mb-12 grid gap-3 md:grid-cols-2">
            {c.products.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-3 border-2 border-black bg-white p-4"
              >
                <Package size={18} className="shrink-0 text-[#ff4d00]" />
                <span className="text-sm font-semibold text-black">{p}</span>
              </li>
            ))}
          </ul>

          {related.length > 0 && (
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-black/50">
                Related products you can order
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => {
                  const imgs = getProductImages(p.number);
                  return (
                    <Link
                      key={p.id}
                      href={`/products/all/${p.slug}/`}
                      className="group block border-2 border-black bg-white p-3 transition-colors hover:border-[#ff4d00]"
                    >
                      <div className="relative mb-3 aspect-square overflow-hidden border border-black/10 bg-[#f5f5f5]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgs[0]}
                          alt={p.name}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                        {p.category}
                      </p>
                      <p className="text-sm font-semibold leading-snug text-black">
                        {p.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <h2 className="mb-4 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
            Your project
            <br />
            <span className="text-[#ff4d00]">could be next.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/70 md:text-lg">
            Send us your design, quantity and deadline. We reply with a quote in 12 hours and
            ship samples in 5 days.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RequestQuoteLink
              label={`Case / ${c.id} / Bottom CTA / Start your project`}
              className="inline-flex items-center justify-center bg-[#ff4d00] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-[#e64500]"
            >
              Start your project
            </RequestQuoteLink>
            <Link
              href={`/cases/${ind.slug}/`}
              className="inline-flex items-center justify-center border-2 border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-white"
            >
              See more {ind.title} work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
