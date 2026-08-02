import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ContactPageContent from './contact-content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get a free quote for custom sublimation apparel. DDP shipping worldwide. Response within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}
