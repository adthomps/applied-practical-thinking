import { AptButton } from "@/components/apt";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X, Tag, Cpu, Cloud, Activity } from "lucide-react";

export interface FilterConfig {
  topics?: string[];
  types?: string[];
  platforms?: string[];
  technologies?: string[];
  statuses?: string[];
}

export interface SelectedFilters {
  topics?: string[];
  types?: string[];
  platforms?: string[];
  technologies?: string[];
  statuses?: string[];
}

interface ContentFiltersProps {
  config: FilterConfig;
  selected: SelectedFilters;
  onChange: (filters: SelectedFilters) => void;
  resultCount: number;
  totalCount: number;
  /** Override default label for topics filter (e.g., "Location") */
  topicsLabel?: string;
}

const filterMeta: Record<keyof FilterConfig, { label: string; icon: typeof Filter }> = {
  topics: { label: "Topics", icon: Tag },
  types: { label: "Type", icon: Filter },
  platforms: { label: "Platform", icon: Cloud },
  technologies: { label: "Tech", icon: Cpu },
  statuses: { label: "Status", icon: Activity },
};

export function ContentFilters({
  config,
  selected,
  onChange,
  resultCount,
  totalCount,
  topicsLabel,
}: ContentFiltersProps) {
  const toggle = (key: keyof FilterConfig, value: string) => {
    const current = selected[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...selected, [key]: updated });
  };

  const clearAll = () => {
    onChange({
      topics: [],
      types: [],
      platforms: [],
      technologies: [],
      statuses: [],
    });
  };

  const hasActiveFilters = Object.values(selected).some(
    (arr) => arr && arr.length > 0
  );

  // Order of filters to display
  const filterOrder: (keyof FilterConfig)[] = [
    "types",
    "topics",
    "platforms",
    "technologies",
    "statuses",
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {filterOrder.map((key) => {
          const options = config[key];
          if (!options || options.length === 0) return null;

          const meta = filterMeta[key];
          const label = key === "topics" && topicsLabel ? topicsLabel : meta.label;
          const Icon = meta.icon;
          const selectedCount = selected[key]?.length || 0;

          return (
            <DropdownMenu key={key}>
              <DropdownMenuTrigger asChild>
                <AptButton
                  variant={selectedCount > 0 ? "secondary" : "ghost"}
                  size="sm"
                >
                  <Icon className="h-3.5 w-3.5 mr-1.5" />
                  {label}
                  {selectedCount > 0 && (
                    <span className="ml-1.5 bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">
                      {selectedCount}
                    </span>
                  )}
                </AptButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-popover max-h-64 overflow-y-auto z-50"
              >
                {options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={selected[key]?.includes(option) || false}
                    onCheckedChange={() => toggle(key, option)}
                    className="capitalize"
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}

        {/* Clear All */}
        {hasActiveFilters && (
          <AptButton
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-muted-foreground"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </AptButton>
        )}
      </div>

      {/* Result count */}
      <span className="text-sm text-muted-foreground">
        {resultCount} of {totalCount}
      </span>
    </div>
  );
}
