import * as React from "react";
import { cn } from "./utils";

export interface AptTagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted" | "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default";
  className?: string;
}

export function AptTag({ children, variant = "default", size = "default", className }: AptTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
        {
          "bg-secondary text-secondary-foreground": variant === "default",
          "border border-primary/40 bg-primary/10 text-primary": variant === "accent",
          "bg-muted text-muted-foreground": variant === "muted",
          "bg-primary/20 text-primary": variant === "primary",
          "bg-secondary/80 text-secondary-foreground": variant === "secondary",
          "border border-border bg-transparent text-foreground": variant === "outline",
          "bg-transparent text-muted-foreground": variant === "ghost",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
