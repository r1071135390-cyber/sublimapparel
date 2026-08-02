import V2Navbar from '@/components/v2/navbar';
import V2Footer from '@/components/v2/footer';
import { Switcher as V2Switcher } from "@/components/v2/switcher";
import V2Contact from '@/components/v2/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | VividPrint',
  description: 'Get a quote for your custom sublimation apparel project. DDP worldwide shipping available.',
};

export default function V2ContactPage() {
  return (
    <>
      <V2Navbar />
      <main>
        <V2Contact />
      </main>
      <V2Footer />
      <V2Switcher />
    </>
  );
}
