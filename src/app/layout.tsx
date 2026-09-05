import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UtilityBar } from "@/components/utility-bar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { RequestQuoteProvider } from "@/components/request-quote-modal";
import { FloatingChat } from "@/components/floating-chat";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd, localBusinessJsonLd, personJsonLd, faqPageJsonLd, aboutArticleJsonLd } from "@/lib/json-ld-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sublimapparel.com"),
  title: {
    default: "SublimApparel — Custom Print. Any Material. Any Product.",
    template: "%s | SublimApparel",
  },
  description:
    "Sublimation on polyester, All-over digital print 100% cotton. MOQ 50, DDP to your door in 100+ countries, US warehouse in Fontana CA. Yiwu factory est. 2018.",
  keywords: [
    "custom sublimation apparel",
    "sublimation printing factory",
    "Yiwu apparel manufacturer",
    "all-over print clothing",
    "DDP shipping worldwide",
    "B2B custom apparel",
    "polyester sublimation",
    "100% cotton sublimation",
    "bulk custom clothing",
    "private label apparel manufacturer",
  ],
  alternates: {
    canonical: "./",
    languages: {
      en: "https://sublimapparel.com/",
      "x-default": "https://sublimapparel.com/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "SublimApparel",
    locale: "en_US",
    title: "SublimApparel — Yiwu Sublimation & All-Over Cotton Printing Factory, DDP to 100+ Countries",
    description:
      "Sublimation on polyester, All-over digital print 100% cotton. MOQ 50, DDP worldwide, US warehouse in Fontana CA.",
    images: [
      {
        url: "/og/og-home.webp",
        width: 1200,
        height: 630,
        alt: "SublimApparel — Yiwu sublimation & cotton printing factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SublimApparel — Yiwu Sublimation & All-Over Cotton Printing Factory, DDP to 100+ Countries",
    description:
      "Sublimation on polyester, All-over digital print 100% cotton. MOQ 50, DDP worldwide, US warehouse in Fontana CA.",
    images: ["/og/og-home.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  // Google Search Console verification
  // To activate: register https://sublimapparel.com in Google Search Console,
  // choose "HTML tag" verification method, copy the content="..." value,
  // and set GOOGLE_SITE_VERIFICATION in the Cloudflare Pages env vars.
  // Get the code at: https://search.google.com/search-console
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-black antialiased">
        {/* LCP preloads — mobile hero is inlined as AVIF data URI in hero.tsx,
            so it doesn't need a preload. Desktop hero is a real file request. */}
        <link
          rel="preload"
          as="image"
          href="/factory-floor.avif"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={faqPageJsonLd} />
        <JsonLd data={aboutArticleJsonLd} />
        <UtilityBar />
        <Navbar />
        <RequestQuoteProvider>
          <main className="pb-28 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <FloatingChat />
        </RequestQuoteProvider>
      </body>
    </html>
  );
}
