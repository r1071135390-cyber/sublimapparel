import { V5Navbar } from "@/components/v5/navbar";
import { V5Footer } from "@/components/v5/footer";
import { V5Switcher } from "@/components/v5/switcher";

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <V5Navbar />
      <main>{children}</main>
      <V5Footer />
      <V5Switcher />
    </div>
  );
}
