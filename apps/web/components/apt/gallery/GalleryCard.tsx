import { ExternalLink } from "lucide-react";
import { AptCard } from "@/components/apt/AptCard";
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
  const buttonLabel = isVideo ? "Open motion piece" : "Open gallery";

  return (
    <AptCard variant="interactive" className="group relative overflow-hidden">
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
      </div>

      <div className="p-4 space-y-3">
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
          <AptTag variant="muted" size="sm" className="shrink-0">
            {item.platform === "youtube" ? "Motion" : item.platform === "flickr" ? "Gallery" : item.platform}
          </AptTag>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-muted-foreground">{item.location}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            {buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>

        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={buttonLabel}
        >
          <span className="sr-only">{buttonLabel}</span>
        </a>
      </div>
    </AptCard>
  );
}
