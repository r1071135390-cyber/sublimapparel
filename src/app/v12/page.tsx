import { V12Hero } from "@/components/v12/hero";
import { V12Features } from "@/components/v12/features";
import { V12Products } from "@/components/v12/products";
import { V12Process } from "@/components/v12/process";
import { V12DDP } from "@/components/v12/ddp";
import { V12Industries } from "@/components/v12/industries";
import { V12Contact } from "@/components/v12/contact";

export default function V12Home() {
  return (
    <main>
      <V12Hero />
      <V12Features />
      <V12Products />
      <V12Process />
      <V12DDP />
      <V12Industries />
      <V12Contact />
    </main>
  );
}
