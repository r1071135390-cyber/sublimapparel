import { V9Navbar } from "@/components/v9/navbar";
import { V9Footer } from "@/components/v9/footer";
import { V9Switcher } from "@/components/v9/switcher";

export default function V9Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f3]">
      <V9Navbar />
      <main className="flex-1">{children}</main>
      <V9Footer />
      <V9Switcher />
    </div>
  );
}
