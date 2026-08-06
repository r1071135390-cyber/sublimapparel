import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UtilityBar } from "@/components/utility-bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SublimPrint — Custom Print. Any Material. Any Product.",
  description:
    "Yiwu HomeDorm Commordity Manufacturing Co., Ltd. — a sublimation printing factory in Yiwu, China (est. 2018). Custom print on apparel, mugs, mousepads, banners, home textiles and more. Polyester & 100% cotton. DDP shipping worldwide, US warehouse in Fontana, CA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
        <UtilityBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
