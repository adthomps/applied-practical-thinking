import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteConfig, authorConfig } from "@/data/site";
import { systems } from "../data/systems";
import { fetchContentIndex } from "@/src/services/contentIndex";
import { AptCard, AptButton, AptTag } from "@/components/apt";
import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Play,
  Book,
  Settings,
  User,
} from "lucide-react";

// Animated role text component
function AnimatedRole({ roles }: { roles: readonly string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      className={`text-primary transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {roles[currentIndex]}
    </span>
  );
}

export default function About() {
  const [labsCount, setLabsCount] = useState(0);

  useEffect(() => {
    fetchContentIndex("labs")
      .then((items) => setLabsCount(items.length))
      .catch(() => setLabsCount(0));
  }, []);

  const [insightsCount, setInsightsCount] = useState(0);
  useEffect(() => {
    fetchContentIndex("blog")
      .then((items) => setInsightsCount(items.length))
      .catch(() => setInsightsCount(0));
  }, []);

  const projectStats = [
    {
      label: "Labs",
      count: labsCount,
      icon: Play,
      path: "/labs",
      color: "text-primary",
    },
    {
      label: "Insights",
      count: insightsCount,
      icon: Book,
      path: "/insights",
      color: "text-accent",
    },
    {
      label: "Systems",
      count: systems.length,
      icon: Settings,
      path: "/systems",
      color: "text-muted-foreground",
    },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      icon: Github,
      url: authorConfig.social.github,
      color: "text-[#6e5494]", // GitHub purple
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: authorConfig.social.linkedin,
      color: "text-[#0077b5]", // LinkedIn blue
    },
    {
      label: "Flickr",
      icon: Globe, // Replace with a Flickr icon if available
      url: authorConfig.social.flickr,
      color: "text-[#ff0084]", // Flickr pink
    },
    {
      label: "Portfolio",
      icon: Globe,
      url: authorConfig.social.portfolio,
      color: "text-[#1ec773]", // Portfolio green
    },
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="relative mb-12">
        <AptCard variant="feature" padding="none" className="overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Photo */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted border-4 border-primary/50 overflow-hidden flex items-center justify-center">
                    <img
                      src={authorConfig.profileImage}
                      alt={authorConfig.name + " profile photo"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {authorConfig.name}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-3">
                  I'm a <AnimatedRole roles={authorConfig.roles} />
                </p>

                <p className="text-muted-foreground max-w-2xl mb-6">
                  {authorConfig.shortBio}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <AptButton variant="primary" size="lg" asChild>
                    <Link to="/labs">View My Work</Link>
                  </AptButton>
                  <AptButton variant="outline" size="lg" asChild>
                    <a href="#profile">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </a>
                  </AptButton>
                </div>
              </div>
            </div>
          </div>
        </AptCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="profile">
        {/* Left Column - Contact & Social */}
        <div className="space-y-6">
          {/* Contact Information */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Contact Information
            </h2>

            <div className="space-y-3">
              <a
                href={`mailto:${authorConfig.contact.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{authorConfig.contact.email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Social Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
                  >
                    <link.icon className={`h-4 w-4 ${link.color}`} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </AptCard>

          {/* Location & Joined */}
          <AptCard variant="subtle" padding="default">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{authorConfig.location}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {authorConfig.joinedDate}</span>
            </div>
          </AptCard>
        </div>

        {/* Right Column - Bio & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Full Bio */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-4">About Me</h2>
            <p className="text-muted-foreground leading-relaxed">
              {authorConfig.bio}
            </p>
          </AptCard>

          {/* Project Stats */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-2">Project Progress</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Current status across different project categories
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {projectStats.map((stat) => (
                <Link
                  key={stat.label}
                  to={stat.path}
                  className="group"
                >
                  <AptCard
                    variant="subtle"
                    padding="default"
                    className="hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <span className="font-medium">{stat.label}</span>
                      </div>
                      <AptTag variant="muted" className="text-xs">
                        {stat.count}
                      </AptTag>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all group-hover:bg-primary/80"
                        style={{ width: `${Math.min(stat.count * 20, 100)}%` }}
                      />
                    </div>
                  </AptCard>
                </Link>
              ))}
            </div>
          </AptCard>

          {/* Principles */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-4">Principles</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">→</span>
                <span>
                  <strong className="text-foreground">Systems over screens.</strong>{" "}
                  Focus on how things work together, not just how they look.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">→</span>
                <span>
                  <strong className="text-foreground">Decisions over demos.</strong>{" "}
                  The reasoning matters more than the result.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-medium">→</span>
                <span>
                  <strong className="text-foreground">Practical over perfect.</strong>{" "}
                  Working code with known limitations beats theoretical elegance.
                </span>
              </li>
            </ul>
          </AptCard>

          {/* Outside APT */}
          <AptCard variant="subtle" padding="large">
            <h2 className="text-lg font-semibold mb-4">Outside of APT</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Outside of software systems, I also keep a small nature and aerial
              photography gallery.
            </p>
            <AptButton variant="outline" size="sm" asChild>
              <a
                href={siteConfig.appliedGalleryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                {siteConfig.appliedGalleryLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </AptButton>
          </AptCard>
        </div>
      </div>
    </div>
  );
}
