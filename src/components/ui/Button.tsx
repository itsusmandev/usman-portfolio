import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-linear-to-r from-accent to-accent-2 text-white shadow-[0_0_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] hover:opacity-90",
  secondary:
    "border border-border bg-transparent text-text hover:bg-surface",
} as const;

type Variant = keyof typeof variants;

type SharedProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

function buttonClasses(variant: Variant, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function Button(props: ButtonProps) {
  if (isLinkButton(props)) {
    const {
      href,
      target,
      rel,
      variant = "primary",
      children,
      className,
      onClick,
    } = props;
    const isExternal =
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.endsWith(".pdf");
    const classes = buttonClasses(variant, className);

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", children, className, type = "button", ...buttonProps } =
    props;

  return (
    <button type={type} className={buttonClasses(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
