import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shirt, Trophy, Briefcase } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { ALL_TAGS, getAllTagSlugs, type TagDimension } from "@/lib/tag-archive";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  alternates: { canonical: "/tag/" },
  title: "Browse Custom Apparel by Tag | SublimApparel",
  description:
    "Browse our custom sublimation and all-over-print apparel by category, sport, and use case. T-shirts, hoodies, race jerseys, esports, team kits, and more.",
  
});

const DIMENSIONS: {
  dim: TagDimension;
  label: string;
  plural: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    dim: "category",
    label: "By Apparel Type",
    plural: "categories",
    desc: "Browse custom apparel by garment type — t-shirts, hoodies, polos, singlets, and more.",
    Icon: Shirt,
  },
  {
    dim: "sport",
    label: "By Sport",
    plural: "sports",
    desc: "Sport-specific sublimated uniforms and apparel for leagues, clubs, and event teams.",
    Icon: Trophy,
  },
  {
    dim: "scenario",
    label: "By Use Case",
    plural: "use cases",
    desc: "Apparel grouped by the use case — corporate events, festivals, race events, and more.",
    Icon: Briefcase,
  },
];

export default function TagIndexPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Browse the Catalog
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Custom apparel, organized your way
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Pick a tag dimension to browse our catalog. Each tag page shows
            product photography, fabric options, MOQ, and a quote form.
          </p>
        </div>
      </section>

      <div className="space-y-16 py-16 md:py-20">
        {DIMENSIONS.map(({ dim, label, plural, desc, Icon }) => {
          const tags = getAllTagSlugs(dim);
          return (
            <section key={dim} className="mx-auto max-w-6xl px-6">
              <div className="flex items-start gap-4 border-b border-border pb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{label}</h2>
                  <p className="mt-1 text-muted-foreground">{desc}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tags.map(({ slug, value }) => {
                  const labelText = ALL_TAGS[dim][value]?.label ?? value;
                  return (
                    <Link
                      key={`${dim}-${slug}`}
                      href={`/tag/${dim}/${slug}/`}
                      className="group flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                    >
                      <span>{labelText}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {tags.length} {plural}
              </p>
            </section>
          );
        })}
      </div>
    </main>
  );
}
