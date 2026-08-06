import { V3Hero } from "@/components/v3/hero";
import { V3Features } from "@/components/v3/features";
import { V3Products } from "@/components/v3/products";
import { V3Process } from "@/components/v3/process";
import { V3DDP } from "@/components/v3/ddp";
import { V3Industries } from "@/components/v3/industries";
import { V3Contact } from "@/components/v3/contact";

export default function V3Home() {
  return (
    <main>
      <V3Hero />
      <V3Features />
      <V3Products />
      <V3Process />
      <V3DDP />
      <V3Industries />
      <V3Contact />
    </main>
  );
}
