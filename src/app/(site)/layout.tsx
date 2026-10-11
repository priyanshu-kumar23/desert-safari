import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-red-500 px-5 py-3 text-sm font-bold text-sand-50 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
