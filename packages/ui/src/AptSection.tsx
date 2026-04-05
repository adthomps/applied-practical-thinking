import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const aptSectionVariants = cva("w-full", {
  variants: {
    spacing: {
      default: "py-12 md:py-16",
      compact: "py-8 md:py-12",
      none: "",
    },
    tone: {
      default: "",
      subtle: "bg-muted/30",
      elevated: "bg-card/50 border-y border-border/50",
    },
  },
  defaultVariants: {
    spacing: "default",
    tone: "default",
  },
});

const aptSectionContentVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      prose: "max-w-[65ch]",
      content: "max-w-4xl",
      wide: "max-w-6xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    width: "content",
  },
});

export interface AptSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof aptSectionVariants>,
    VariantProps<typeof aptSectionContentVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  contentClassName?: string;
}

const AptSection = React.forwardRef<HTMLElement, AptSectionProps>(
  (
    {
      className,
      contentClassName,
      spacing,
      tone,
      width,
      title,
      description,
      eyebrow,
      actions,
      children,
      ...props
    },
    ref
  ) => (
    <section
      ref={ref}
      className={cn(aptSectionVariants({ spacing, tone, className }))}
      {...props}
    >
      <div className={cn(aptSectionContentVariants({ width }), contentClassName)}>
        {title || description || eyebrow || actions ? (
          <header className="mb-6 space-y-3">
            {eyebrow ? <div>{eyebrow}</div> : null}
            {title ? (
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-sm md:text-base text-muted-foreground">{description}</p>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  )
);
AptSection.displayName = "AptSection";

export { AptSection, aptSectionVariants, aptSectionContentVariants };
