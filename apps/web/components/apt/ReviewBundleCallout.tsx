import { Link } from "react-router-dom";
import { AptButton, AptCard, AptCardDescription, AptCardFooter, AptCardHeader, AptCardTitle, AptTag } from "@apt/ui";
import { Bot, Download } from "lucide-react";

export function ReviewBundleCallout() {
  return (
    <section className="mt-16 pt-8 border-t border-border">
      <AptCard variant="subtle" padding="large">
        <AptCardHeader className="p-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <AptTag variant="primary">AI Review Bundle</AptTag>
          </div>
          <AptCardTitle className="text-lg">Need the review handoff?</AptCardTitle>
          <AptCardDescription>
            Open the public AI Review Bundle for the review standard, doctrine links, and the downloadable JSON manifest for tool-driven ingestion.
          </AptCardDescription>
        </AptCardHeader>
        <AptCardFooter className="flex-wrap border-0 px-0 pb-0">
          <AptButton variant="outline" asChild>
            <Link to="/design/review-bundle">Open AI Review Bundle</Link>
          </AptButton>
          <AptButton variant="ghost" asChild>
            <a href="/docs/design/APT-AI-REVIEW-BUNDLE.json" download>
              <Download className="h-4 w-4" />
              Download JSON Manifest
            </a>
          </AptButton>
        </AptCardFooter>
      </AptCard>
    </section>
  );
}