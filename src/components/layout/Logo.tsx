"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  showWordmark?: boolean;
};

/** Swiss ring monogram — open circle + geometric U */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8 text-text", className)}
      aria-hidden="true"
    >
      {/* Incomplete ring (gap at ~1 o'clock) */}
      <path
        d="M28.8 6.6A15.2 15.2 0 1 0 34.6 22.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Geometric U */}
      <path
        d="M13.2 10.5h3.6v12.2c0 2.35 1.75 4.15 3.95 4.15s3.95-1.8 3.95-4.15V10.5h3.6v12.2c0 4.35-3.35 7.75-7.55 7.75s-7.55-3.4-7.55-7.75V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  className,
  onClick,
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      href="#top"
      onClick={onClick}
      aria-label={`${profile.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <LogoMark className="transition-colors duration-300 group-hover:text-accent" />

      {showWordmark ? (
        <span className="relative flex flex-col justify-center">
          <span className="font-heading text-[0.95rem] font-semibold tracking-[0.22em] text-text uppercase md:text-[1rem]">
            {profile.name}
          </span>
          <span
            aria-hidden="true"
            className="mt-1 h-px w-full origin-left scale-x-75 bg-accent transition-transform duration-300 group-hover:scale-x-100"
          />
        </span>
      ) : null}
    </Link>
  );
}
