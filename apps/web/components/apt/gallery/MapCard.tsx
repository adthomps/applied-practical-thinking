import { MapPin, ExternalLink } from "lucide-react";
import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import type { MapItem } from "@/data/gallery";

interface MapCardProps {
  item: MapItem;
}

export function MapCard({ item }: MapCardProps) {
  return (
    <AptCard variant="default" className="overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{item.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>

      {/* Map Embed or Placeholder */}
      <div className="aspect-[4/3] bg-muted/50 relative">
        {item.embedUrl ? (
          <iframe
            src={item.embedUrl}
            title={item.title}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3 p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive map preview
              </p>
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AptButton variant="outline" size="sm" className="gap-2">
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </AptButton>
              </a>
            </div>
          </div>
        )}
      </div>
    </AptCard>
  );
}
