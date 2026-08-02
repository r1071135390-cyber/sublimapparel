import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'VividPrint | Full-Color Sublimation Apparel Manufacturer',
    template: '%s | VividPrint',
  },
  description:
    'Professional dye-sublimation apparel manufacturer from Yiwu, China. Full-cotton & polyester all-over print. DDP shipping worldwide — no customs, no duties, delivered to your door.',
  keywords: [
    'sublimation printing',
    'all-over print',
    'custom apparel',
    'dye sublimation',
    'full cotton sublimation',
    'DDP shipping',
    'custom sportswear',
    'event apparel',
    'promotional clothing',
    'OEM apparel manufacturer',
    'Yiwu factory',
  ],
  authors: [{ name: 'VividPrint', url: 'https://vividprint.com' }],
  generator: 'Coze Code',
  openGraph: {
    title: 'VividPrint | Full-Color Sublimation Apparel Manufacturer',
    description:
      'Professional dye-sublimation apparel manufacturer. Full-cotton & polyester all-over print. DDP shipping worldwide.',
    url: 'https://vividprint.com',
    siteName: 'VividPrint',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VividPrint | Sublimation Apparel Manufacturer',
    description:
      'Full-cotton & polyester all-over print. DDP shipping worldwide — no customs, no duties.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased bg-white text-[#0a0a0a]`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
