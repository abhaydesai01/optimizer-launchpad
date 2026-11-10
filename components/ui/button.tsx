"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui Button, themed for the Optimizer360 ink + mint palette. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-950)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--mint)] text-[var(--ink-950)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--mint-strong)]",
        outline:
          "border border-[var(--ink-line-strong)] bg-white/[0.03] text-[var(--paper)] shadow-sm hover:border-[rgba(148,163,196,0.4)] hover:bg-white/[0.07]",
        secondary: "bg-[var(--ink-800)] text-[var(--paper)] hover:bg-[#18233d]",
        ghost: "text-[var(--paper-soft)] hover:bg-white/[0.06] hover:text-[var(--paper)]",
        link: "text-[var(--mint)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-[13px]",
        lg: "h-11 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  /** "solid" is the old name for "default", kept for existing call sites. */
  variant?: Variant | "solid";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const resolved: Variant | undefined = variant === "solid" ? "default" : variant;
    return <Comp className={cn(buttonVariants({ variant: resolved, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
