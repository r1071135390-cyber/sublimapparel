import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Products } from "@/components/products";
import { Process } from "@/components/process";
import { DDP } from "@/components/ddp";
import { Industries } from "@/components/industries";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Products />
      <Process />
      <DDP />
      <Industries />
      <Contact />
    </main>
  );
}
