import { Check, X, AlertTriangle } from "lucide-react";
import { 
  getContrastRatioFromHSL, 
  getWCAGLevel, 
  aptColorPairs,
  type WCAGLevel,
  type ColorPair 
} from "@/lib/contrast";
import { cn } from "@/lib/utils";

function WCAGBadge({ level, ratio }: { level: WCAGLevel; ratio: number }) {
  const config = {
    AAA: { 
      bg: "bg-primary/20", 
      text: "text-primary", 
      icon: Check,
      label: "AAA"
    },
    AA: { 
      bg: "bg-primary/20", 
      text: "text-primary", 
      icon: Check,
      label: "AA"
    },
    "AA-large": { 
      bg: "bg-chart-4/20", 
      text: "text-chart-4", 
      icon: AlertTriangle,
      label: "AA Large"
    },
    Fail: { 
      bg: "bg-destructive/20", 
      text: "text-destructive", 
      icon: X,
      label: "Fail"
    },
  };

  const { bg, text, icon: Icon, label } = config[level];

  return (
    <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium", bg, text)}>
      <Icon className="h-3 w-3" />
      <span>{label}</span>
      <span className="opacity-70">({ratio.toFixed(2)}:1)</span>
    </div>
  );
}

function ContrastPairRow({ pair }: { pair: ColorPair }) {
  const ratio = getContrastRatioFromHSL(pair.background, pair.foreground);
  const level = ratio ? getWCAGLevel(ratio) : "Fail";

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card/50">
      {/* Preview */}
      <div 
        className={cn("w-24 h-12 rounded-md flex items-center justify-center text-sm font-medium border border-border/50", pair.bgClass)}
      >
        <span className={pair.fgClass}>Aa</span>
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{pair.name}</p>
        <p className="text-xs text-muted-foreground font-mono truncate">
          {pair.bgClass} + {pair.fgClass}
        </p>
      </div>
      
      {/* Badge */}
      <WCAGBadge level={level} ratio={ratio || 0} />
    </div>
  );
}

export function ContrastChecker() {
  const passingCount = aptColorPairs.filter((pair) => {
    const ratio = getContrastRatioFromHSL(pair.background, pair.foreground);
    return ratio && ratio >= 4.5;
  }).length;

  const aaaCount = aptColorPairs.filter((pair) => {
    const ratio = getContrastRatioFromHSL(pair.background, pair.foreground);
    return ratio && ratio >= 7;
  }).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <div className="h-3 w-3 rounded-full bg-accent" />
          <span className="text-sm">
            <span className="font-semibold">{aaaCount}</span>
            <span className="text-muted-foreground"> AAA (7:1+)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm">
            <span className="font-semibold">{passingCount}</span>
            <span className="text-muted-foreground"> AA+ (4.5:1+)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <span className="text-sm">
            <span className="font-semibold">{aptColorPairs.length}</span>
            <span className="text-muted-foreground"> Total pairs</span>
          </span>
        </div>
      </div>

      {/* WCAG Legend */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <h4 className="text-sm font-semibold mb-3">WCAG 2.1 Requirements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-foreground">AAA (7:1)</span>
              <p>Enhanced contrast for all text</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-foreground">AA (4.5:1)</span>
              <p>Minimum for normal text</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-chart-4 mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-foreground">AA Large (3:1)</span>
              <p>Minimum for 18px+ or 14px bold</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Pairs */}
      <div className="space-y-2">
        {aptColorPairs.map((pair) => (
          <ContrastPairRow key={pair.name} pair={pair} />
        ))}
      </div>
    </div>
  );
}
