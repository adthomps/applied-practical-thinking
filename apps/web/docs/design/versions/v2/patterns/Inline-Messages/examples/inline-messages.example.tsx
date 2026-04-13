import { AptCard, AptCardContent, AptCardHeader, AptCardTitle } from "@apt/ui";

export function InlineMessagesExample() {
  return (
    <AptCard variant="default" padding="default">
      <AptCardHeader>
        <AptCardTitle>Filter Label</AptCardTitle>
      </AptCardHeader>
      <AptCardContent className="space-y-3">
        <p className="text-sm text-muted-foreground" id="filter-help">
          Optional text that describes this filter label in more detail.
        </p>

        <p className="text-sm text-destructive" role="alert" id="filter-error">
          Error: Enter a valid range to continue.
        </p>

        <p className="text-sm text-muted-foreground" id="filter-empty">
          No results found for this view. Clear one or more filters to see data.
        </p>
      </AptCardContent>
    </AptCard>
  );
}
