import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";
import { TeamSection } from "@/components/contact-team";

export const metadata = {
  title: "How to Reach Our Yiwu Factory — WhatsApp, Email, DDP Quote in 12h",
  description:
    "How to reach our Yiwu factory: WhatsApp / WeChat +86-137-5793-1042, email sales@sublimapparel.com, US hub in Fontana CA, EU rep in Rotterdam NL. Real production managers — not chatbots. DDP quote in 12 working hours, sample in 5 days, bulk in 21 days.",

  openGraph: {
    images: ["/contact-hero.webp"],
  },
  authors: [{ name: "Ramon Wang", url: "https://sublimapparel.com/about" }],
  other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
};

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
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Contact
            </div>
            <h1 className="text-[44px] font-black leading-[1.05] tracking-tight md:text-[64px] lg:text-[72px]">
              Let&apos;s
              <br />
              <span className="text-[#ff4d00]">talk.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              Real production managers in Yiwu, China — not chatbots.
              WhatsApp, email. Average reply time: under 24 hours.
            </p>
          </div>
        </div>
      </section>
      <TeamSection />
      <Contact /></main>
    </>
  );
}
