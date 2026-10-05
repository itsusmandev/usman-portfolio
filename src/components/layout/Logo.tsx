import Link from "next/link";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="#top"
      onClick={onClick}
      aria-label={`${profile.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface"
      >
        <span className="absolute inset-0 bg-linear-to-br from-accent/30 to-accent-2/20 opacity-80 transition-opacity group-hover:opacity-100" />
        <span className="relative font-heading text-sm font-bold tracking-tight text-text">
          {profile.name.slice(0, 1)}
        </span>
      </span>
      <span className="font-heading text-lg font-bold tracking-tight text-text">
        {profile.name}
        <span className="text-accent">.</span>
      </span>
    </Link>
  );
}
