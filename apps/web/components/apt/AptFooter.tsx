import { siteConfig } from "@/data/site";
import { ExternalLink } from "lucide-react";

export function AptFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">
              {siteConfig.name} — {siteConfig.fullName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {siteConfig.disclaimer}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.appliedGalleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {siteConfig.appliedGalleryLabel}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
