import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import { AptTag } from "@/components/apt/AptTag";
import type { GalleryItem as GalleryItemBase } from "@/data/gallery";

interface GalleryItem extends GalleryItemBase {
  embedUrl?: string;
}

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const isVideo = item.platform === "youtube";
  const buttonLabel = isVideo ? "View Video" : "View Album";

  return (
    <AptCard variant="interactive" className="overflow-hidden group">
      {/* Media: Only show embedded video for video projects, no cover image or play overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {isVideo && item.embedUrl ? (
          <iframe
            src={item.embedUrl}
            className="w-full h-full border-0"
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Gradient Overlay removed for cleaner video display */}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title, Location & Date Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
              {item.title}
            </h3>
            {item.date && (
              <span className="block text-xs text-muted-foreground mt-0.5">
                {item.date}
              </span>
            )}
          </div>
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
