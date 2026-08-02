import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import AboutPageContent from './about-content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about VividPrint — a professional dye-sublimation apparel manufacturer in Yiwu, China with complete supply chain from design to DDP delivery.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}
