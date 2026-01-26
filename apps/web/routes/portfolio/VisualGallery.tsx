import { useState, useMemo } from "react";
import { Camera } from "lucide-react";
import { GalleryTabs } from "@/components/apt/gallery/GalleryTabs";
import { GalleryCard } from "@/components/apt/gallery/GalleryCard";
import { MapCard } from "@/components/apt/gallery/MapCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { 
  galleryItems, 
  mapItems, 
  type GalleryCategory 
} from "@/data/gallery";

export default function PortfolioVisualGallery() {
  const [activeTab, setActiveTab] = useState<GalleryCategory | "maps">("photography");
  const [selected, setSelected] = useState<SelectedFilters>({
    platforms: [],
  });

  const isMapTab = activeTab === "maps";

  // Get items for the current category (excluding maps)
  const categoryItems = useMemo(() => {
    if (isMapTab) return [];
    return galleryItems.filter((item) => item.category === activeTab);
  }, [activeTab, isMapTab]);

  // Get unique filter options for current category
  const config = useMemo<FilterConfig>(() => {
    if (isMapTab) return {};
    const platforms = [...new Set(categoryItems.map((item) => item.platform))].sort();
    const locations = [...new Set(categoryItems.map((item) => item.location))].sort();
    return { 
      platforms,
      // Use topics for locations since it's a common filter pattern
      topics: locations.length > 1 ? locations : undefined,
    };
  }, [categoryItems, isMapTab]);

  // Filter items based on selections
  const filteredItems = useMemo(() => {
    return categoryItems.filter((item) => {
      if (selected.platforms?.length && !selected.platforms.includes(item.platform)) {
        return false;
      }
      if (selected.topics?.length && !selected.topics.includes(item.location)) {
        return false;
      }
      return true;
    });
  }, [categoryItems, selected]);

  // Reset filters when tab changes
  const handleTabChange = (tab: GalleryCategory | "maps") => {
    setActiveTab(tab);
    setSelected({ platforms: [], topics: [] });
  };

  return (
    <div className="container py-12 md:py-16 space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Camera className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Visual Gallery
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Photography and drone work framed as visual exploration under constraint.
          Seeing patterns through composition and limitation.
        </p>
      </div>

      {/* Category Tabs */}
      <GalleryTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {!isMapTab && (config.platforms?.length || config.topics?.length) && (
        <ContentFilters
          config={config}
          selected={selected}
          onChange={setSelected}
          resultCount={filteredItems.length}
          totalCount={categoryItems.length}
          topicsLabel="Location"
        />
      )}

      {/* Gallery Grid */}
      {isMapTab ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mapItems.map((item) => (
            <MapCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isMapTab && filteredItems.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Camera className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No items match your current filters.</p>
        </div>
      )}
    </div>
  );
}
