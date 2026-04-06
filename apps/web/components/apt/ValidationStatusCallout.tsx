import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { AptButton, AptCard, AptCardContent, AptCardDescription, AptCardHeader, AptCardTitle, AptTag } from "@apt/ui";
import { useValidationReport } from "@/hooks/useValidationReport";

type ValidationStatusCalloutProps = {
  title?: string;
  description?: string;
  showReviewBundleLink?: boolean;
};

export function ValidationStatusCallout({
  title = "Validation Status",
  description = "Public-safe snapshot for designSystem, architecture, and docsGovernance checks.",
  showReviewBundleLink = true,
}: ValidationStatusCalloutProps) {
  const { report, loading, error } = useValidationReport();
  const recommendation = report?.recommendation || "unavailable";
  const recommendationVariant = recommendation === "pass" ? "accent" : "outline";

  return (
    <AptCard variant="subtle" padding="large">
      <AptCardHeader>
        <AptCardTitle className="text-xl">{title}</AptCardTitle>
        <AptCardDescription>{description}</AptCardDescription>
      </AptCardHeader>
      <AptCardContent className="flex flex-wrap items-center gap-3">
        <AptTag variant={recommendationVariant}>{recommendation}</AptTag>
        {showReviewBundleLink ? (
          <AptButton variant="outline" asChild>
            <Link to="/design/review-bundle">
              Open AI Review Bundle
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        ) : null}
        <AptButton variant="outline" asChild>
          <a href="/docs/design/validation/LATEST.md" download>
            <Download className="h-4 w-4" />
            Download Markdown
          </a>
        </AptButton>
        <AptButton variant="outline" asChild>
          <a href="/docs/design/validation/LATEST.json" download>
            <Download className="h-4 w-4" />
            Download JSON
          </a>
        </AptButton>
        {loading ? <p className="w-full text-xs text-muted-foreground">Loading validation status…</p> : null}
        {error ? <p className="w-full text-xs text-muted-foreground">Validation status unavailable right now.</p> : null}
      </AptCardContent>
    </AptCard>
  );
}
