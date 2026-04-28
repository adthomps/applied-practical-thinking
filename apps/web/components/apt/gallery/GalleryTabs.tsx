import { cn } from "@/lib/utils";
import { galleryCategories, type GalleryCategory } from "@/data/gallery";

interface GalleryTabsProps {
  activeTab: GalleryCategory | "maps";
  onTabChange: (tab: GalleryCategory | "maps") => void;
}

export function GalleryTabs({ activeTab, onTabChange }: GalleryTabsProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2 rounded-lg border border-border bg-muted/40 p-1 sm:min-w-0 sm:flex-wrap">
        {galleryCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeTab === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onTabChange(category.id)}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border border-border bg-background text-foreground shadow-elevation-1"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
