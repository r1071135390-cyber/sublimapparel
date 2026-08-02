import { Hero } from "@/components/v8/hero";
import { Features } from "@/components/v8/features";
import { Products } from "@/components/v8/products";
import { Process } from "@/components/v8/process";
import { DDP } from "@/components/v8/ddp";
import { Contact } from "@/components/v8/contact";

export default function V8Home() {
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
