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
