import { V11Hero } from "@/components/v11/hero";
import { V11Features } from "@/components/v11/features";
import { V11Products } from "@/components/v11/products";
import { V11Process } from "@/components/v11/process";
import { V11DDP } from "@/components/v11/ddp";
import { V11Industries } from "@/components/v11/industries";
import { V11Contact } from "@/components/v11/contact";

export default function V11Home() {
  return (
    <main>
      <V11Hero />
      <V11Features />
      <V11Products />
      <V11Process />
      <V11DDP />
      <V11Industries />
      <V11Contact />
    </main>
  );
}
