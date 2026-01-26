import { ExternalLink, Play } from "lucide-react";
import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import { AptTag } from "@/components/apt/AptTag";
import type { GalleryItem } from "@/data/gallery";

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const isVideo = item.platform === "youtube";
  const buttonLabel = isVideo ? "View Video" : "View Album";

  return (
    <AptCard variant="interactive" className="overflow-hidden group">
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Video Play Overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-destructive flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 text-destructive-foreground fill-current ml-1" />
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Location Row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
            {item.title}
          </h3>
          <AptTag variant="outline" size="sm" className="shrink-0">
            {item.location}
          </AptTag>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Action Button */}
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <AptButton variant="outline" className="w-full gap-2">
            {buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </AptButton>
        </a>
      </div>
    </AptCard>
  );
}
