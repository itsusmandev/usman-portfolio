import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/80 p-6 shadow-[0_0_0_1px_transparent] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
