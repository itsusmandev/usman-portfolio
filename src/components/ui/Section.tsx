import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-24 md:py-32", className)}
    >
      <div
        className={cn("mx-auto max-w-6xl px-5 md:px-8", containerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
