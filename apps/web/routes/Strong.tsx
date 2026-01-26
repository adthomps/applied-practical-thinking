import { strongItems } from "@/data/strong";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  DecisionBlock,
} from "@/components/apt";

export default function Strong() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Strong</h1>
        <p className="text-muted-foreground max-w-2xl">
          Case studies of significant challenges and how they were addressed.
          Each includes the problem context, approach taken, and key decisions.
        </p>
      </div>

      <div className="space-y-6">
        {strongItems.map((item) => (
          <AptCard key={item.id} variant="default" padding="large">
            <AptCardHeader className="p-0">
              <div className="flex items-start justify-between">
                <AptCardTitle className="text-xl">{item.title}</AptCardTitle>
                <div className="flex gap-1.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <AptTag key={tag} variant="muted">
                      {tag}
                    </AptTag>
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium text-primary mt-2">
                Problem: {item.problem}
              </p>
            </AptCardHeader>

            <AptCardContent className="mt-4 p-0">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  Approach
                </h4>
                <AptCardDescription>{item.approach}</AptCardDescription>
              </div>

              <DecisionBlock decisions={item.decisions} />
            </AptCardContent>
          </AptCard>
        ))}
      </div>
    </div>
  );
}
