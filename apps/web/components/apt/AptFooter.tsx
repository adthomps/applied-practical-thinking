import { siteConfig } from "@/data/site";

export function AptFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="max-w-3xl text-center md:text-left">
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
      </div>
    </footer>
  );
}
