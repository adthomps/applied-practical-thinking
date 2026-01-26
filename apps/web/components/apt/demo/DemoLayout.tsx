import { cn } from "@/lib/utils";

interface DemoLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function DemoLayout({
  title,
  description,
  children,
  className,
}: DemoLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DemoSection({ title, children, className }: DemoSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <div className="p-6 rounded-lg border bg-muted/30">{children}</div>
    </div>
  );
}
