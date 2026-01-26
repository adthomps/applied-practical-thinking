import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const emblemVariants = cva(
  "relative flex items-center justify-center rounded-full border-2 font-bold select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-sm border",
        md: "h-12 w-12 text-lg",
        lg: "h-20 w-20 text-3xl",
        xl: "h-32 w-32 text-5xl",
      },
      glow: {
        none: "",
        subtle: "shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
        strong: "shadow-[0_0_40px_hsl(var(--primary)/0.5),0_0_80px_hsl(var(--primary)/0.2)]",
      },
    },
    defaultVariants: {
      size: "lg",
      glow: "strong",
    },
  }
);

export interface AptEmblemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emblemVariants> {
  animated?: boolean;
}

export function AptEmblem({
  className,
  size,
  glow,
  animated = true,
  ...props
}: AptEmblemProps) {
  return (
    <div className="relative">
      {/* Animated glow ring */}
      {animated && glow !== "none" && (
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-60",
            "bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0",
            "animate-[apt-emblem-spin_4s_linear_infinite]"
          )}
          style={{
            filter: "blur(8px)",
          }}
        />
      )}
      
      {/* Main emblem */}
      <div
        className={cn(
          emblemVariants({ size, glow }),
          "border-primary/60 bg-background/80 backdrop-blur-sm text-primary",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        <span className="relative z-10">A</span>
      </div>
    </div>
  );
}
