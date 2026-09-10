import Image from "next/image";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";
import { TeamSection } from "@/components/contact-team";

export const metadata = buildPageMetadata({
    title: "Get a Yiwu Factory Quote — MOQ 50 · DDP to 100+ Countries · Reply in 1 Day",
    description: "Request a custom sublimation or all-over cotton print quote directly from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. WhatsApp +86-198-1793-0190, info@sublimapparel.com. Replies within 1 business day, no signup required.",
    keywords: ["sublimation quote Yiwu factory", "custom apparel quote MOQ 50", "DDP shipping quote", "sublimated jersey manufacturer contact", "Yiwu factory WhatsApp", "all-over print cotton quote", "B2B apparel inquiry", "Fontana CA warehouse pickup", "Rotterdam EU rep contact", "bulk custom apparel quote"],
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])} />
      <main>
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Background image — full bleed */}
        <div className="absolute inset-0">
          <Image
            src="/contact-hero.webp"
            alt="SublimApparel team working at desks in the office"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
          {/* Gradient mask — solid dark on left under text, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 via-35% to-transparent" />
          {/* Subtle blur on the left half under the text */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
              maskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Get a Quote · MOQ 50
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight md:text-[56px] lg:text-[64px]">
              Talk to a Yiwu factory manager — direct quote in 1 business day.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Real production managers in Yiwu, China — not chatbots.
              WhatsApp +86-198-1793-0190, email info@sublimapparel.com.
              Average reply time: under 24 hours. No signup required.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              MOQ 50 pcs · 15-25 day production · DDP shipping to 100+ countries ·
              US warehouse in Fontana CA for 2-5 day domestic delivery.
            </p>
          </div>
        </div>
      </section>
      <TeamSection />
      <Contact /></main>
    </>
  );
}
