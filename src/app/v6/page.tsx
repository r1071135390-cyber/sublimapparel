import { V6Hero } from "@/components/v6/hero";
import { V6Features } from "@/components/v6/features";
import { V6Products } from "@/components/v6/products";
import { V6Process } from "@/components/v6/process";
import { V6DDP } from "@/components/v6/ddp";
import { V6Contact } from "@/components/v6/contact";

export default function V6Home() {
  return (
    <>
      <V6Hero />
      <V6Features />
      <V6Products />
      <V6Process />
      <V6DDP />
      <V6Contact />
    </>
  );
}
