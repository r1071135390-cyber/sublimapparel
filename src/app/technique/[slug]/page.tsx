import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { techniques, getTechniqueBySlug, getRelatedTechniques } from "@/lib/techniques";
import { InquiryCTA } from "@/components/inquiry-cta";
import { JsonLd } from "@/components/json-ld";
import { buildHowToNode } from "@/lib/breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTechniqueBySlug(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: {
      canonical: `https://sublimapparel.com/technique/${t.slug}/`,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `https://sublimapparel.com/technique/${t.slug}/`,
      type: "article",
      images: [
        {
          url: `https://sublimapparel.com${t.heroImage}`,
          width: 1200,
          height: 1200,
          alt: t.heroAlt,
        },
      ],
    },
  };
}

export default async function TechniqueDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTechniqueBySlug(slug);
  if (!t) notFound();

  const related = getRelatedTechniques(t.related);

  const techUrl = `https://sublimapparel.com/technique/${t.slug}/`;
  const webpageId = `${techUrl}#webpage`;
  const breadcrumbId = `${techUrl}#breadcrumb`;
  const articleId = `${techUrl}#article`;
  const faqId = `${techUrl}#faq`;
  // 2026-09-12 (R49): every technique page already exposes a visible
  // numbered step list under the "How {shortName} Works" section
  // (t.process: { step, title, description }[]). That makes the page
  // a perfect match for Google's HowTo rich result — surfacing the
  // step list directly in SERPs and feeding step bullets into AI
  // Overviews for "how does {technique} work" queries. Map t.process
  // straight into buildHowToNode's { name, text } shape and drop the
  // returned node into the existing single @graph. 20 techniques
  // share this template so one change unlocks HowTo on every
  // /technique/[slug]/ page in the same build.
  const howToId = `${techUrl}#howto`;
  const howToNode = buildHowToNode({
    howToId,
    webpageId,
    name: `How ${t.shortName.toLowerCase()} works on custom apparel`,
    description: `Step-by-step ${t.shortName.toLowerCase()} process we use at SublimApparel: ${t.process
      .slice(0, 3)
      .map((s) => s.title.toLowerCase())
      .join(", ")} and final finishing. ${t.process.length} steps total.`,
    steps: t.process.map((s) => ({
      name: `Step ${s.step}: ${s.title}`,
      text: s.description,
    })),
  });

  // 2026-09-12 (R46): merge 3 separate JsonLd calls into a single @graph.
  // Article + BreadcrumbList + FAQPage all cross-linked via @id, with
  // WebPage anchoring the brand entity graph and mainEntity → FAQPage.
  // 2026-09-12 (R49): add HowTo as a 5th sibling node so the visible
  // step list is parseable as a Google HowTo rich result. mainEntity
  // stays on FAQPage to preserve the R46 contract; HowTo joins the
  // graph via its @id so Google can pick it up for how-to queries
  // without forcing a primary-entity reshuffle.
  const techniqueGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1 · WebPage — anchors the page to the brand entity graph
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: techUrl,
        name: `${t.name} — SublimApparel`,
        description: t.metaDescription,
        inLanguage: "en",
        isPartOf: { "@id": "https://sublimapparel.com/#website" },
        about: { "@id": "https://sublimapparel.com/#organization" },
        mainEntity: { "@id": faqId },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
      },
      // 2 · Article (the technique guide content node)
      {
        "@type": "Article",
        "@id": articleId,
        headline: `${t.name} — SublimApparel`,
        description: t.metaDescription,
        image: `https://sublimapparel.com${t.heroImage}`,
        inLanguage: "en",
        isPartOf: { "@id": webpageId },
        author: { "@id": "https://sublimapparel.com/#organization" },
        publisher: { "@id": "https://sublimapparel.com/#organization" },
        keywords: t.keywords.join(", "),
        url: techUrl,
      },
      // 3 · BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sublimapparel.com/" },
          { "@type": "ListItem", position: 2, name: "Technique", item: "https://sublimapparel.com/technique/" },
          { "@type": "ListItem", position: 3, name: t.name, item: techUrl },
        ],
      },
      // 4 · FAQPage
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: t.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      // 5 · HowTo (R49) — visible step list rendered as a Google
      // HowTo rich result candidate. Joins the entity graph via
      // isPartOf → #webpage + about → #organization from inside
      // buildHowToNode, so the step list is traceable back to the
      // page that hosts it.
      howToNode,
    ],
  };

  return (
    <>
      {/* 2026-09-12 (R46): single @graph — WebPage + Article + BreadcrumbList + FAQPage */}
      {/* 2026-09-12 (R49): + HowTo (visible step list as Google HowTo rich result) */}
      <JsonLd data={techniqueGraph} />

      <main className="bg-background text-foreground">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/40">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/technique/" className="hover:text-foreground">
              Technique
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{t.shortName}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
            <div className="flex flex-col justify-center">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                Decoration Technique
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                {t.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {t.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/technique/"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  All Techniques
                </Link>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={t.heroImage}
                alt={t.heroAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Quick specs */}
        <section className="border-b border-border bg-card/40">
          <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
            <SpecCell label="Best For" value={t.quickSpecs.bestFor} icon={<Sparkles className="h-4 w-4" />} />
            <SpecCell label="Fabric" value={t.quickSpecs.fabric} icon={<Layers className="h-4 w-4" />} />
            <SpecCell label="MOQ" value={t.quickSpecs.moq} icon={<CheckCircle2 className="h-4 w-4" />} />
            <SpecCell label="Durability" value={t.quickSpecs.durability} icon={<CheckCircle2 className="h-4 w-4" />} />
            <SpecCell label="Cost" value={t.quickSpecs.cost} icon={<DollarSign className="h-4 w-4" />} />
            <SpecCell label="Lead Time" value={t.quickSpecs.leadTime} icon={<Clock className="h-4 w-4" />} />
          </div>
        </section>

        {/* Intro */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              About {t.shortName}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              {t.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Pros */}
        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Why Choose {t.shortName}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {t.pros.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Best use cases */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Best Use Cases
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.bestUseCases.map((u, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              How {t.shortName} Works
            </h2>
            <ol className="mt-10 space-y-6">
              {t.process.map((s) => (
                <li
                  key={s.step}
                  className="grid gap-4 rounded-lg border border-border bg-background p-6 md:grid-cols-[80px_1fr] md:gap-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {t.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-card p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    {f.q}
                    <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related techniques */}
        {related.length > 0 && (
          <section className="border-b border-border bg-card/40">
            <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Related Techniques
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/technique/${r.slug}/`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition hover:border-foreground/30"
                  >
                    <div className="relative aspect-[4/3] bg-card">
                      <Image
                        src={r.heroImage}
                        alt={r.heroAlt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <h3 className="text-sm font-semibold">{r.name}</h3>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {r.tagline}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                        View details
                        <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Inquiry CTA */}
        <InquiryCTA />
      </main>
    </>
  );
}

function SpecCell({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 bg-card/40 p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold leading-tight">{value}</div>
    </div>
  );
}
