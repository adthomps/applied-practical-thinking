import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface DecisionBlockProps {
  title?: string;
  decisions: string[];
  className?: string;
}

export function DecisionBlock({
  title = "Key Decisions",
  decisions,
  className,
}: DecisionBlockProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
        {title}
      </h4>
      <ul className="space-y-2">
        {decisions.map((decision, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />
            <span className="text-muted-foreground">{decision}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
