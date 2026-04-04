import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AptCard, AptCardDescription, AptCardTitle } from "@apt/ui";

type BrowseCardAction = {
  label: string;
  href: string;
  icon?: ReactNode;
  external?: boolean;
};

type BrowseCardProps = {
  detailTo: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  media?: ReactNode;
  eyebrow?: ReactNode;
  status?: ReactNode;
  highlight?: ReactNode;
  metadata?: ReactNode;
  footerMeta?: ReactNode;
  action?: BrowseCardAction;
};

export function BrowseCard({
  detailTo,
  title,
  description,
  icon,
  media,
  eyebrow,
  status,
  highlight,
  metadata,
  footerMeta,
  action,
}: BrowseCardProps) {
  return (
    <div className="group">
      <AptCard variant="feature" padding="none" className="flex h-full flex-col overflow-hidden">
        {media ? (
          <Link to={detailTo} className="block focus:outline-none">
            {media}
          </Link>
        ) : null}

        <div className="flex flex-1 flex-col p-5">
          {(icon || status) && (
            <div className="mb-3 flex items-start justify-between gap-2">
              {icon ? (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icon}
                </div>
              ) : (
                <div />
              )}
              {status ? <div className="shrink-0">{status}</div> : null}
            </div>
          )}

          {eyebrow ? <div className="mb-3 flex flex-wrap items-center gap-2">{eyebrow}</div> : null}

          <div className="space-y-1.5">
            <Link to={detailTo} className="block transition-colors group-hover:text-primary focus:outline-none">
              <AptCardTitle className="text-lg">{title}</AptCardTitle>
            </Link>
            {highlight ? <div>{highlight}</div> : null}
          </div>

          {description ? (
            <AptCardDescription className="mt-3 line-clamp-2">{description}</AptCardDescription>
          ) : null}

          {metadata ? <div className="mt-4">{metadata}</div> : null}

          <div className="flex-1" />

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
            <div className="min-w-0 text-xs text-muted-foreground">{footerMeta}</div>

            {action ? (
              action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                >
                  {action.label}
                  {action.icon ?? <ArrowRight className="h-4 w-4" />}
                </a>
              ) : (
                <Link
                  to={action.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                >
                  {action.label}
                  {action.icon ?? <ArrowRight className="h-4 w-4" />}
                </Link>
              )
            ) : (
              <Link
                to={detailTo}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
              >
                View details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </AptCard>
    </div>
  );
}
