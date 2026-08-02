import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Hero from '@/components/home/hero';
import StatsBar from '@/components/home/stats-bar';
import WhyUs from '@/components/home/why-us';
import ProductsShowcase from '@/components/home/products-showcase';
import SupplyChain from '@/components/home/supply-chain';
import DdpHighlight from '@/components/home/ddp-highlight';
import Industries from '@/components/home/industries';
import InquiryForm from '@/components/home/inquiry-form';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhyUs />
        <ProductsShowcase />
        <SupplyChain />
        <DdpHighlight />
        <Industries />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
