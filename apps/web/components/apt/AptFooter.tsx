import { Link } from "react-router-dom";
import { authorConfig, siteConfig } from "@/data/site";
import { AptEmblem } from "./AptEmblem";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Labs", href: "/labs" },
      { label: "Proof", href: "/proof" },
      { label: "Principles", href: "/principles" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
      { label: siteConfig.appliedGalleryLabel, href: siteConfig.appliedGalleryUrl, external: true },
    ],
  },
] as const;

export function AptFooter() {
  const currentYear = new Date().getFullYear();
  const joinedYearMatch = authorConfig.joinedDate.match(/\d{4}/);
  const startYear = joinedYearMatch ? Number(joinedYearMatch[0]) : currentYear;
  const yearLabel = startYear < currentYear ? `${startYear}-${currentYear}` : `${currentYear}`;

  return (
    <footer className="border-t border-border/60 bg-card/55 backdrop-blur">
      <div className="container px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-3 flex items-center gap-3 transition-opacity duration-200 hover:opacity-90">
              <AptEmblem size="sm" glow="none" animated={false} className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">{siteConfig.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{siteConfig.fullName}</p>
              </div>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="transition-colors duration-200 hover:text-foreground">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-6 border-border/60" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p>
              © {yearLabel} {authorConfig.name}. {siteConfig.fullName}. All rights reserved.
            </p>
            <p className="text-xs">{siteConfig.disclaimer}</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed sm:text-right">
            <strong className="font-semibold text-foreground">Note on AI:</strong> I use AI tools for brainstorming,
            writing assistance, and media workflow acceleration.
          </p>
        </div>
      </div>
    </footer>
  );
}
