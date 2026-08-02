import { V10Hero } from "@/components/v10/hero";
import { V10Features } from "@/components/v10/features";
import { V10Products } from "@/components/v10/products";
import { V10Process } from "@/components/v10/process";
import { V10DDP } from "@/components/v10/ddp";
import { V10Contact } from "@/components/v10/contact";

export default function V10Page() {
  return (
    <>
      <V10Hero />
      <V10Features />
      <V10Products />
      <V10Process />
      <V10DDP />
      <V10Contact />
    </>
  );
}
