import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white">
      <div className="grid border-b-2 border-black md:grid-cols-4">
        <div className="border-r-2 border-black p-8 md:col-span-2">
          <p className="text-3xl font-black uppercase leading-none text-black">
            VIVID/PRINT
          </p>
          <p className="mt-3 text-sm text-black">
            SUBLIMATION FACTORY // YIWU, CHINA // EST. 2014
          </p>
        </div>
        <div className="border-r-2 border-black p-8">
          <p className="text-xs font-black uppercase tracking-widest text-black">
            → NAVIGATION
          </p>
          <ul className="mt-4 space-y-1.5 text-sm font-bold">
            <li><Link href="/v8" className="hover:underline">INDEX</Link></li>
            <li><Link href="/v8/products" className="hover:underline">PRODUCTS</Link></li>
            <li><Link href="/v8/about" className="hover:underline">ABOUT</Link></li>
            <li><Link href="/v8/contact" className="hover:underline">CONTACT</Link></li>
          </ul>
        </div>
        <div className="p-8">
          <p className="text-xs font-black uppercase tracking-widest text-black">
            → CONTACT
          </p>
          <ul className="mt-4 space-y-1.5 text-sm font-bold">
            <li>HELLO@VIVIDPRINT.CN</li>
            <li>+86 0579-8888 9999</li>
            <li>YIWU // ZHEJIANG // CN</li>
          </ul>
        </div>
      </div>
      <div className="bg-black px-4 py-4 text-center text-xs font-black uppercase tracking-widest text-white">
        © 2025 VIVID/PRINT — ALL RIGHTS RESERVED — PRINTED IN CMYK
      </div>
    </footer>
  );
}
