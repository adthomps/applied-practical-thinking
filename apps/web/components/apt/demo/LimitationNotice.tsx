import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface LimitationNoticeProps {
  title?: string;
  limitations: string[];
  className?: string;
}

export function LimitationNotice({
  title = "Known Limitations",
  limitations,
  className,
}: LimitationNoticeProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border border-destructive/30 bg-destructive/5",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <ul className="space-y-1">
            {limitations.map((limitation, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {limitation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
