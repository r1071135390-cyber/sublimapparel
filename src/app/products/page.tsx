import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ProductsPageContent from './products-content';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Full range of dye-sublimation products: custom t-shirts, sports jerseys, hoodies, vests, flags, banners, and accessories. All-over print on polyester and cotton.',
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ProductsPageContent />
      </main>
      <Footer />
    </>
  );
}
