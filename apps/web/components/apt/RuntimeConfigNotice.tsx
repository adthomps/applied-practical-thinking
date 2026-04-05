import { AptCard, AptTag } from "@apt/ui";
import { AlertTriangle } from "lucide-react";

type RuntimeConfigNoticeProps = {
  title?: string;
  message: string;
  envVar: string;
  expectedValue?: string;
  className?: string;
};

export function RuntimeConfigNotice({
  title = "Runtime Configuration Required",
  message,
  envVar,
  expectedValue,
  className,
}: RuntimeConfigNoticeProps) {
  return (
    <AptCard variant="feature" className={className}>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <AptTag variant="outline">{envVar}</AptTag>
          {expectedValue ? <AptTag variant="default">{expectedValue}</AptTag> : null}
        </div>

        <p className="text-xs text-muted-foreground">
          Add this value wherever the Pages frontend is built, then redeploy the frontend after the Worker.
        </p>
      </div>
    </AptCard>
  );
}
