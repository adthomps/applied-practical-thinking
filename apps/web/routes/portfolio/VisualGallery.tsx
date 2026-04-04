import { useState, useMemo } from "react";
import { Camera, CheckCircle2, Eye, Plane, Route } from "lucide-react";
import { AptCard, AptTag, ContentFilters, FilterConfig, SectionIntro, SelectedFilters } from "@/components/apt";
import { GalleryTabs } from "@/components/apt/gallery/GalleryTabs";
import { GalleryCard } from "@/components/apt/gallery/GalleryCard";
import { MapCard } from "@/components/apt/gallery/MapCard";
import {
  galleryCategories,
  galleryItems,
  mapItems,
  type GalleryCategory,
} from "@/data/gallery";

export default function PortfolioVisualGallery() {
  const [activeTab, setActiveTab] = useState<GalleryCategory | "maps">("photography");
  const [selected, setSelected] = useState<SelectedFilters>({
    platforms: [],
  });

  const isMapTab = activeTab === "maps";
  const activeCategory = galleryCategories.find((category) => category.id === activeTab);

  const principles = [
    {
      title: "Observation before interpretation",
      description:
        "The work starts with noticing patterns, light, movement, and context before forcing a narrative onto the scene.",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      title: "Constraints sharpen decisions",
      description:
        "Weather, terrain, equipment limits, and available perspective are part of the composition, not interruptions to it.",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      title: "Perspective changes meaning",
      description:
        "Ground, motion, and aerial views show how framing changes what becomes visible and what stays hidden.",
      icon: <Plane className="h-4 w-4" />,
    },
  ];

  const categoryPurpose: Record<GalleryCategory | "maps", string> = {
    photography:
      "Still images emphasize framing, timing, and pattern recognition through a single constrained moment.",
    video:
      "Motion pieces extend the same practice into sequence, pacing, and environmental change over time.",
    drone:
      "Aerial work changes the frame entirely, making systems, terrain, and relationships more visible.",
    maps:
      "Field maps document places, routes, and repeated points of observation behind the visual work.",
  };

  const categoryItems = useMemo(() => {
    if (isMapTab) return [];
    return galleryItems.filter((item) => item.category === activeTab);
  }, [activeTab, isMapTab]);

  const config = useMemo<FilterConfig>(() => {
    if (isMapTab) return {};
    const platforms = [...new Set(categoryItems.map((item) => item.platform))].sort();
    const locations = [...new Set(categoryItems.map((item) => item.location))].sort();
    return {
      platforms,
      topics: locations.length > 1 ? locations : undefined,
    };
  }, [categoryItems, isMapTab]);

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

  const handleTabChange = (tab: GalleryCategory | "maps") => {
    setActiveTab(tab);
    setSelected({ platforms: [], topics: [] });
  };

  return (
    <div className="container py-12 md:py-16 space-y-8">
      <SectionIntro
        title="Visual Gallery"
        description="Photography, motion, aerial work, and field maps framed as visual practice under constraint. This belongs in APT because observation, framing, limitation, and perspective are part of the same applied-thinking discipline."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={<AptTag variant="accent">Outside of Work</AptTag>}
      >
        <p className="max-w-2xl text-sm text-muted-foreground">
          The gallery is not separate from APT so much as adjacent to it: a quieter place where the same habits
          show up through visual composition instead of product or platform work.
        </p>
      </SectionIntro>

      <section className="space-y-6">
        <SectionIntro
          title="Why This Belongs Here"
          description="APT is interested in how framing changes meaning. The gallery shows that same discipline through image-making rather than software."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <AptCard key={principle.title} variant="subtle" className="h-full">
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">{principle.icon}</div>
                  <h3 className="text-lg font-semibold">{principle.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            </AptCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionIntro
          title="Browse the Work"
          description="Move between still images, motion, aerial views, and field maps. Each category represents a different way of observing the same environments."
        />

        <GalleryTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <AptCard variant="default" padding="default">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">{activeCategory?.label ?? "Field Maps"}</p>
              </div>
              <p className="text-sm text-muted-foreground">{categoryPurpose[activeTab]}</p>
            </div>

            {!isMapTab && (config.platforms?.length || config.topics?.length) ? (
              <div className="md:min-w-[280px]">
                <ContentFilters
                  config={config}
                  selected={selected}
                  onChange={setSelected}
                  resultCount={filteredItems.length}
                  totalCount={categoryItems.length}
                  topicsLabel="Location"
                />
              </div>
            ) : null}
          </div>
        </AptCard>

        {isMapTab ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mapItems.map((item) => (
              <MapCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {!isMapTab && filteredItems.length === 0 && (
        <div className="py-14 text-center text-muted-foreground">
          <Camera className="mx-auto mb-4 h-12 w-12 opacity-30" />
          <p>No gallery items match the current filters.</p>
          <p className="mt-2 text-sm">Try clearing the location or platform filters to broaden the view.</p>
        </div>
      )}
    </div>
  );
}
