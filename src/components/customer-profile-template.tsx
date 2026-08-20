"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  ShoppingCart,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Award,
  Sparkles,
  Briefcase,
  Trophy,
  Mic2,
  GraduationCap,
  Coffee,
  Wine,
  Megaphone,
  Flag,
  Tv,
  Building2,
  Store,
  Music,
  PartyPopper,
  Mountain,
  Heart,
  Gamepad2,
  Tag,
  ListChecks,
  Boxes,
  BadgePercent,
  Headphones,
  HelpCircle,
} from "lucide-react";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";
import type { CustomerProfileData } from "@/lib/customer-profile-data";

import { RelatedProducts } from "@/components/related-products";
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Award,
  Sparkles,
  Briefcase,
  Trophy,
  Mic2,
  GraduationCap,
  Coffee,
  Wine,
  Megaphone,
  Flag,
  Tv,
  Building2,
  Store,
  Music,
  PartyPopper,
  Mountain,
  Heart,
  Gamepad2,
  Tag,
  ListChecks,
  Boxes,
  BadgePercent,
  Headphones,
  HelpCircle,
};

function resolveIcon(name: string): React.ComponentType<{ className?: string }> {
  return ICON_MAP[name] ?? Shirt;
}

export function CustomerProfilePage({ data }: { data: CustomerProfileData }) {
  const breadcrumb = useMemo(
    () =>
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries/" },
        { name: data.badge.replace(/^For\s+/, ""), path: data.slug },
      ]),
    [data.badge, data.slug]
  );

  return (
    <main className="bg-white text-black">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-4 text-xs font-bold tracking-[0.18em] text-[#ff4d00] uppercase">
            {data.badge}
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {data.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {data.heroBody}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#ff4d00] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ff5e1a] sm:text-base"
            >
              {data.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/60 sm:text-base"
            >
              {data.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-black/60 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-bold tracking-[0.18em] text-[#ff4d00] uppercase">
              {data.solutionsSection.eyebrow}
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              {data.solutionsSection.title}
            </h2>
            <p className="mt-4 text-base text-black/70 md:text-lg">
              {data.solutionsSection.subtitle}
            </p>
          </div>
          <div className="space-y-12">
            {data.solutionsSection.sections.map((cat) => {
              const Icon = resolveIcon(cat.icon);
              return (
                <div key={cat.title}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ff4d00]/10 text-[#ff4d00]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-lg border border-black/10 bg-white p-5 transition-shadow hover:shadow-md"
                      >
                        <div className="mb-3 text-base font-bold text-[#0a0a0a]">
                          {item.name}
                        </div>
                        <ul className="space-y-1.5 text-sm text-black/70">
                          {item.details.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="text-[#ff4d00]">·</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-bold tracking-[0.18em] text-[#ff4d00] uppercase">
              {data.whySection.eyebrow}
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              {data.whySection.title}
            </h2>
            {data.whySection.subtitle && (
              <p className="mt-4 text-base text-white/70 md:text-lg">
                {data.whySection.subtitle}
              </p>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.whySection.features.map((f) => {
              const Icon = resolveIcon(f.icon);
              return (
                <div
                  key={f.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <Icon className="mb-4 h-6 w-6 text-[#ff4d00]" />
                  <div className="mb-2 text-lg font-bold">{f.title}</div>
                  <p className="text-sm leading-relaxed text-white/70">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-bold tracking-[0.18em] text-[#ff4d00] uppercase">
              {data.perfectFor.eyebrow}
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              {data.perfectFor.title}
            </h2>
          </div>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.perfectFor.items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-3 rounded-lg border border-black/10 bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff4d00]" />
                <span className="text-sm font-medium text-[#0a0a0a]">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Solutions - cross-link to parent solution page for SEO */}
      {(() => {
        const relatedMap: Record<string, { slug: string; label: string; desc: string }[]> = {
          "sports-teams-leagues": [
            { slug: "teams-sports-apparel", label: "Teams & Sports Apparel", desc: "Sublimated jerseys, performance wear, team accessories" },
          ],
          "endurance-race-events": [
            { slug: "teams-sports-apparel", label: "Teams & Sports Apparel", desc: "Race shirts, marathon apparel, endurance gear" },
          ],
          "events-conferences": [
            { slug: "event-festivals-conferences", label: "Events, Festivals & Conferences", desc: "Event t-shirts, conference merch, festival apparel" },
          ],
          "music-festival-tour-merchandise": [
            { slug: "event-festivals-conferences", label: "Events, Festivals & Conferences", desc: "Tour merch, band apparel, festival shirts" },
          ],
          "corporate-employee-programs": [
            { slug: "corporate-organization-apparel", label: "Corporate & Organization Apparel", desc: "Employee uniforms, branded merch, team apparel" },
          ],
          "schools-universities-greek-life": [
            { slug: "corporate-organization-apparel", label: "Corporate & Organization Apparel", desc: "Greek life apparel, university merch, student organization shirts" },
          ],
          "breweries-coffee-hospitality": [
            { slug: "promotional-marketing-apparel", label: "Promotional & Marketing Apparel", desc: "Branded merch, hospitality uniforms, customer giveaway apparel" },
          ],
          "promotional-marketing-agencies": [
            { slug: "promotional-marketing-apparel", label: "Promotional & Marketing Apparel", desc: "Client merch, campaign apparel, branded giveaway shirts" },
          ],
          "trade-shows-display": [
            { slug: "promotional-marketing-apparel", label: "Promotional & Marketing Apparel", desc: "Booth staff uniforms, branded giveaways, event merch" },
          ],
          "apparel-brands-agencies": [
            { slug: "apparel-brands-agencies", label: "Apparel Brands & Agencies", desc: "Private label production, ODM, brand-ready apparel" },
          ],
          "political-campaigns": [
            { slug: "promotional-marketing-apparel", label: "Promotional & Marketing Apparel", desc: "Campaign shirts, yard signs, rally merch" },
          ],
          "e-commerce-fulfillment": [
            { slug: "e-commerce-fulfillment", label: "E-commerce & Fulfillment", desc: "Dropship, POD, white-label production, blind ship" },
          ],
        };
        const related = relatedMap[data.slug];
        if (!related) return null;
        return (
          <section className="border-t border-black/10 bg-white py-14 md:py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
              <div className="mb-6 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff4d00]">Explore the parent capability</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a0a0a] md:text-3xl">
                  See the full apparel capability for your industry
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}/`}
                    className="group flex items-start gap-4 rounded-2xl border border-black/10 bg-[#fafafa] p-5 transition-colors hover:border-[#ff4d00]/40 hover:bg-white"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-black text-[#0a0a0a]">{r.label}</p>
                      <p className="mt-1 text-sm text-black/65">{r.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* RELATED PRODUCTS (tag-driven) */}
      <RelatedProducts industrySlug={data.slug.replace(/^\/industries\/|\/$/g, "")} />

      {/* FAQ */}
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              {data.faqTitle}
            </h2>
            <p className="mt-3 text-base text-black/60 md:text-lg">
              {data.faqSubtitle}
            </p>
          </div>
          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <details
                key={f.q}
                className="group rounded-lg border border-black/10 bg-white p-5"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#0a0a0a]">
                  <span>{f.q}</span>
                  <span className="text-xl text-[#ff4d00] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            {data.ctaBody}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#ff4d00] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ff5e1a] sm:text-base"
            >
              {data.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="mailto:sales@sublimapparel.com"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/60 sm:text-base"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Email Us
            </a>
            <a
              href="tel:+8615857980086"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/60 sm:text-base"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
