import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'VividPrint | Premium Sublimation Apparel, Delivered to Your Door',
  description:
    'Yiwu-based sublimation factory. Custom cotton & polyester apparel, full-color all-over print, DDP worldwide shipping. From design to doorstep.',
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-sans antialiased`}>
      {children}
    </div>
  );
}
