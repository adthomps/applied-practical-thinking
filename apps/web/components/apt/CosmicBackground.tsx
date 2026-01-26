import { cn } from "@/lib/utils";

interface CosmicBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "normal" | "strong";
}

export function CosmicBackground({
  className,
  children,
  intensity = "normal",
}: CosmicBackgroundProps) {
  const starOpacity = {
    subtle: "opacity-30",
    normal: "opacity-50",
    strong: "opacity-70",
  }[intensity];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Base gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 0%, hsl(var(--accent) / 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 20% 10%, hsl(var(--primary) / 0.1), transparent)
          `,
        }}
      />

      {/* Star field layer 1 - small stars */}
      <div
        className={cn("absolute inset-0", starOpacity)}
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, hsl(var(--foreground) / 0.8), transparent),
            radial-gradient(1px 1px at 40px 70px, hsl(var(--foreground) / 0.6), transparent),
            radial-gradient(1px 1px at 50px 160px, hsl(var(--foreground) / 0.7), transparent),
            radial-gradient(1px 1px at 90px 40px, hsl(var(--foreground) / 0.5), transparent),
            radial-gradient(1px 1px at 130px 80px, hsl(var(--foreground) / 0.6), transparent),
            radial-gradient(1px 1px at 160px 120px, hsl(var(--foreground) / 0.4), transparent),
            radial-gradient(1px 1px at 200px 200px, hsl(var(--foreground) / 0.7), transparent),
            radial-gradient(1px 1px at 230px 50px, hsl(var(--foreground) / 0.5), transparent),
            radial-gradient(1px 1px at 280px 140px, hsl(var(--foreground) / 0.6), transparent),
            radial-gradient(1px 1px at 320px 30px, hsl(var(--foreground) / 0.5), transparent),
            radial-gradient(1px 1px at 350px 180px, hsl(var(--foreground) / 0.4), transparent),
            radial-gradient(1px 1px at 400px 90px, hsl(var(--foreground) / 0.7), transparent)
          `,
          backgroundSize: "400px 200px",
        }}
      />

      {/* Star field layer 2 - medium stars */}
      <div
        className={cn("absolute inset-0", starOpacity)}
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 100px 50px, hsl(var(--foreground) / 0.9), transparent),
            radial-gradient(1.5px 1.5px at 250px 150px, hsl(var(--foreground) / 0.7), transparent),
            radial-gradient(1.5px 1.5px at 180px 30px, hsl(var(--foreground) / 0.8), transparent),
            radial-gradient(1.5px 1.5px at 380px 120px, hsl(var(--foreground) / 0.6), transparent),
            radial-gradient(2px 2px at 50px 120px, hsl(var(--primary) / 0.4), transparent),
            radial-gradient(2px 2px at 300px 80px, hsl(var(--accent) / 0.3), transparent)
          `,
          backgroundSize: "500px 200px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
