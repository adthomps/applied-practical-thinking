import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const LAB_TAB_ITEMS = [
  { label: "All", path: "/labs" },
  { label: "Concepts", path: "/labs/concepts" },
  { label: "Mocks", path: "/labs/mocks" },
  { label: "Prototypes", path: "/labs/prototypes" },
  { label: "Live Demos", path: "/labs/live-demos" },
] as const;

export function LabsTabs() {
  const location = useLocation();

  return (
    <div className="border-b border-border/60">
      <nav className="flex flex-wrap items-center gap-1" aria-label="Labs tabs">
        {LAB_TAB_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

