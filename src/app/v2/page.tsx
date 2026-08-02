import V2Navbar from '@/components/v2/navbar';
import V2Footer from '@/components/v2/footer';
import V2Switcher from '@/components/v2/switcher';
import V2Hero from '@/components/v2/hero';
import V2Features from '@/components/v2/features';
import V2Products from '@/components/v2/products';
import V2Process from '@/components/v2/process';
import V2Ddp from '@/components/v2/ddp';
import V2Contact from '@/components/v2/contact';

export default function V2Home() {
  return (
    <>
      <V2Navbar />
      <main>
        <V2Hero />
        <V2Features />
        <V2Products />
        <V2Process />
        <V2Ddp />
        <V2Contact />
      </main>
      <V2Footer />
      <V2Switcher />
    </>
  );
}
