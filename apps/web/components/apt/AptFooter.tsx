import { siteConfig } from "@/data/site";
import { ExternalLink } from "lucide-react";

export function AptFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="text-center md:text-left w-full">
            <p className="text-sm font-medium text-foreground">
              {siteConfig.name} — {siteConfig.fullName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {siteConfig.disclaimer} &copy; {year} {siteConfig.fullName}. All rights reserved.
            </p>
            <hr className="my-4 border-border/60" />
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Note on AI:</strong> To explore ideas and accelerate my
              workflow, I use AI tools like OpenAI, Gemini, and NotebookLM for
              brainstorming, writing assistance, and generating audio/video
              content.
            </p>
          </div>

          <a
            href={siteConfig.appliedGalleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {siteConfig.appliedGalleryLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
