import { V10Navbar } from "@/components/v10/navbar";
import { V10Footer } from "@/components/v10/footer";
import { V10Switcher } from "@/components/v10/switcher";

export default function V10Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <V10Navbar />
      <main className="flex-1">{children}</main>
      <V10Footer />
      <V10Switcher />
    </div>
  );
}
