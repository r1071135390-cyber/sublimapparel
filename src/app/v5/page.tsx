import { V5Hero } from "@/components/v5/hero";
import { V5Features } from "@/components/v5/features";
import { V5Products } from "@/components/v5/products";
import { V5Process } from "@/components/v5/process";
import { V5DDP } from "@/components/v5/ddp";
import { V5Contact } from "@/components/v5/contact";

export default function V5Home() {
  return (
    <>
      <V5Hero />
      <V5Features />
      <V5Products />
      <V5Process />
      <V5DDP />
      <V5Contact />
    </>
  );
}
