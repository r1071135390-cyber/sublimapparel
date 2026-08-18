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
    "Sublimation on polyester, DTG & DTF on 100% cotton. MOQ 50, DDP to your door in 100+ countries, US warehouse in Fontana CA. Yiwu factory est. 2018.",
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
      "Sublimation on polyester, DTG & DTF on 100% cotton. MOQ 50, DDP worldwide, US warehouse in Fontana CA.",
    images: [
      {
        url: "/og-default.jpg",
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
      "Sublimation on polyester, DTG & DTF on 100% cotton. MOQ 50, DDP worldwide, US warehouse in Fontana CA.",
    images: ["/og-default.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={faqPageJsonLd} />
        <JsonLd data={aboutArticleJsonLd} />
        <UtilityBar />
        <Navbar />
        <RequestQuoteProvider>
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <FloatingChat />
        </RequestQuoteProvider>
      </body>
    </html>
  );
}
