import { Hero } from "@/components/hero";
import { InquiryCTA } from "@/components/inquiry-cta";
import { ArtworkCTA } from "@/components/artwork-cta";
import { BeyondApparel } from "@/components/beyond-apparel";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Products } from "@/components/products";
import { Process } from "@/components/process";
import { FactoryFloor } from "@/components/factory-floor";
import { DDP } from "@/components/ddp";
import { Industries } from "@/components/industries";
import { Contact } from "@/components/contact";

export const metadata = {
  title: "Yiwu Sublimation & All-Over Cotton Printing | DDP 100+",
  description:
    "Sublimation on polyester (true all-over, edge-to-edge). DTG and DTF on 100% cotton (A4–A3 per panel, soft hand). Allover digital print on cotton also available (cut-and-sew, true full-body, MOQ 100). MOQ 50 for DTG/DTF, DDP shipping to 100+ countries, US warehouse in Fontana CA. 12 production lines, since 2014.",

  openGraph: {
    images: ["/hero-products.webp"],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <BeyondApparel />
      <InquiryCTA />
      <Features />
      <ArtworkCTA />
      <HowItWorks />
      <Products />
      <Process />
      <FactoryFloor />
      <DDP />
      <Industries />
      <Contact />
    </main>
  );
}
