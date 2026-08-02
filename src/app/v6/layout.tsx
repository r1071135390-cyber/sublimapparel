import { V6Navbar } from "@/components/v6/navbar";
import { V6Footer } from "@/components/v6/footer";
import { V6Switcher } from "@/components/v6/switcher";

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <V6Navbar />
      <main>{children}</main>
      <V6Footer />
      <V6Switcher />
    </div>
  );
}
