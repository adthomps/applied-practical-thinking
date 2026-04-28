import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const aptCardVariants = cva(
  "rounded-lg border text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card",
        elevated: "bg-card shadow-elevation-3",
        interactive:
          "bg-card hover:border-primary/50 hover:shadow-elevation-3 cursor-pointer",
        hero: "bg-card/50 backdrop-blur-sm shadow-elevation-4 rounded-xl",
        subtle: "bg-muted/50 border-transparent",
        feature:
          "bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:bg-card transition-all",
      },
      padding: {
        default: "p-6",
        compact: "p-4",
        large: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface AptCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aptCardVariants> {}

const AptCard = React.forwardRef<HTMLDivElement, AptCardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(aptCardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
AptCard.displayName = "AptCard";

const AptCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
AptCardHeader.displayName = "AptCardHeader";

const AptCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));
AptCardTitle.displayName = "AptCardTitle";

const AptCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
AptCardDescription.displayName = "AptCardDescription";

const AptCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
AptCardContent.displayName = "AptCardContent";

const AptCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 mt-4 pt-4 border-t border-border", className)}
    {...props}
  />
));
AptCardFooter.displayName = "AptCardFooter";

export {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptCardFooter,
  aptCardVariants,
};
