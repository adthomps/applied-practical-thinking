import { cn } from "@/lib/utils";
import { galleryCategories, type GalleryCategory } from "@/data/gallery";

interface GalleryTabsProps {
  activeTab: GalleryCategory | "maps";
  onTabChange: (tab: GalleryCategory | "maps") => void;
}

export function GalleryTabs({ activeTab, onTabChange }: GalleryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-muted/50 rounded-lg border border-border">
      {galleryCategories.map((category) => {
        const Icon = category.icon;
        const isActive = activeTab === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onTabChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
              "flex-1 min-w-[140px] justify-center",
              isActive
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{category.label}</span>
            <span className="sm:hidden">{category.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
