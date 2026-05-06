import { Link } from "react-router-dom";
import { authorConfig, siteConfig } from "@/data/site";
import { AptEmblem } from "./AptEmblem";

const footerNavigationLinks = [
  { label: "Home", href: "/" },
  { label: "Labs", href: "/labs" },
  { label: "Proof", href: "/proof" },
  { label: "Principles", href: "/principles" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

const footerResourceLinks = [
  { label: siteConfig.appliedGalleryLabel, href: siteConfig.appliedGalleryUrl, external: true },
  { label: "GitHub", href: authorConfig.social.github, external: true },
  { label: "LinkedIn", href: authorConfig.social.linkedin, external: true },
] as const;

export function AptFooter() {
  const currentYear = new Date().getFullYear();
  const joinedYearMatch = authorConfig.joinedDate.match(/\d{4}/);
  const startYear = joinedYearMatch ? Number(joinedYearMatch[0]) : currentYear;
  const yearLabel = startYear < currentYear ? `${startYear}-${currentYear}` : `${currentYear}`;

  return (
    <footer className="border-t border-border/60 bg-card text-card-foreground">
      <div className="container px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <section aria-label="About Applied Practical Thinking">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <AptEmblem size="sm" glow="none" animated={false} className="h-8 w-8" />
              <div className="space-y-0.5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{siteConfig.footerEyebrow}</p>
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  {siteConfig.name}
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{siteConfig.footerDescription}</p>
          </section>

          <nav aria-labelledby="footer-navigation">
            <h3 id="footer-navigation" className="mb-3 text-sm font-semibold text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-resources">
            <h3 id="footer-resources" className="mb-3 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerResourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
            <p>
              © {yearLabel} {authorConfig.name}. {siteConfig.fullName}. All rights reserved.
            </p>
            <p className="text-xs md:text-sm">{siteConfig.disclaimer}</p>
            <p className="text-xs leading-relaxed md:text-sm lg:text-right">{siteConfig.footerSystemNote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
