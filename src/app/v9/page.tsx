import { V9Hero } from "@/components/v9/hero";
import { V9Features } from "@/components/v9/features";
import { V9Products } from "@/components/v9/products";
import { V9Process } from "@/components/v9/process";
import { V9DDP } from "@/components/v9/ddp";
import { V9Contact } from "@/components/v9/contact";

export default function V9Page() {
  return (
    <>
      <V9Hero />
      <V9Features />
      <V9Products />
      <V9Process />
      <V9DDP />
      <V9Contact />
    </>
  );
}
