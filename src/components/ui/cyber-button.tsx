import * as React from "react";
import { cn } from "@/lib/utils";
import { useRandomHoverEffect } from "@/hooks/useRandomHoverEffect";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  seed?: string;
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "default", size = "default", children, seed, ...props }, ref) => {
    const hoverProps = useRandomHoverEffect(seed);

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
          },
          hoverProps.className,
          className
        )}
        style={hoverProps.style}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";