import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-full">
      <div className="bg-atmosphere pointer-events-none fixed inset-0" />
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-40" />
      <ScrollProgress />
      <Navbar />
      <div className="relative">{children}</div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
}
