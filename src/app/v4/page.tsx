import { Hero } from "@/components/v4/hero";
import { Features } from "@/components/v4/features";
import { Products } from "@/components/v4/products";
import { Process } from "@/components/v4/process";
import { DDP } from "@/components/v4/ddp";
import { Contact } from "@/components/v4/contact";

export default function V4Home() {
  return (
    <>
      <Hero />
      <Features />
      <Products />
      <Process />
      <DDP />
      <Contact />
    </>
  );
}
