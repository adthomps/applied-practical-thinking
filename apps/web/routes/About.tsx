import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteConfig, authorConfig } from "@/data/site";
import { systems } from "../data/systems";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useAboutExperimentsCountQuery, useAboutInsightsCountQuery } from "@/hooks/useContentAggregateQueries";
import { AptCard, AptButton, AptTag } from "@/components/apt";
import {
  ExternalLink,
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
  usePageMetadata({
    title: "About",
    description: siteConfig.nav.find((item) => item.path === "/about")?.description || siteConfig.description,
    image: authorConfig.profileImage,
    imageAlt: `${authorConfig.name} profile photo`,
  });

  const experimentsCountQuery = useAboutExperimentsCountQuery();
  const insightsCountQuery = useAboutInsightsCountQuery();

  const experimentsCount = experimentsCountQuery.data || 0;
  const insightsCount = insightsCountQuery.data || 0;

  const projectStats = [
    {
      label: "Labs",
      count: experimentsCount,
      icon: Play,
      path: "/labs",
      color: "text-primary",
      description: "Concepts, mocks, prototypes, and live demos",
    },
    {
      label: "Insights",
      count: insightsCount,
      icon: Book,
      path: "/insights",
      color: "text-primary",
      description: "Articles, podcasts, and practice material",
    },
    {
      label: "Proof",
      count: systems.length,
      icon: Settings,
      path: "/proof",
      color: "text-muted-foreground",
      description: "Stable references inside the design doctrine",
    },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      icon: Github,
      url: authorConfig.social.github,
      color: "text-primary",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: authorConfig.social.linkedin,
      color: "text-primary",
    },
    {
      label: "Flickr",
      icon: Globe, // Replace with a Flickr icon if available
      url: authorConfig.social.flickr,
      color: "text-foreground",
    },
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="relative mb-12">
        <AptCard variant="feature" padding="none" className="overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/30" />

          <div className="relative p-7 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Photo */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-muted border-2 border-primary/40 overflow-hidden flex items-center justify-center">
                    <img
                      src={authorConfig.profileImage}
                      alt={authorConfig.name + " profile photo"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/12 blur-lg -z-10" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-3 flex justify-center md:justify-start">
                  <AptTag variant="accent">About</AptTag>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {authorConfig.name}
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-2">
                  {authorConfig.title}
                </p>

                <p className="text-base md:text-lg text-muted-foreground mb-3">
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
                    <a href="#principles">
                      <User className="h-4 w-4 mr-2" />
                      View Principles
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
        {/* Main Column - Bio & Site Context */}
        <div className="lg:col-span-2 space-y-6">
          {/* Full Bio */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-4">About Me</h2>
            <p className="text-muted-foreground leading-relaxed">
              {authorConfig.bio}
            </p>
          </AptCard>

          {/* Principles */}
          <AptCard variant="default" padding="large" id="principles">
            <h2 className="text-lg font-semibold mb-2">Principles</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The core ideas that shape how I build, evaluate, and present work through APT.
            </p>
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

          {/* Site Snapshot */}
          <AptCard variant="default" padding="large">
            <h2 className="text-lg font-semibold mb-2">Site Snapshot</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The current public surfaces of APT and what each area is designed to help you do.
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
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <span className="font-medium">{stat.label}</span>
                      </div>
                      <ArrowCount count={stat.count} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {stat.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Open {stat.label.toLowerCase()}
                    </div>
                  </AptCard>
                </Link>
              ))}
            </div>
          </AptCard>

          {/* Outside of Work */}
          <AptCard variant="subtle" padding="large">
            <h2 className="text-lg font-semibold mb-4">Outside of Work</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Outside of software and systems work, I spend time with photography
              and drone flying. The gallery is where that visual practice shows up:
              attention to framing, limitation, observation, and perspective.
            </p>
            <AptButton variant="outline" size="sm" asChild>
              <Link to="/about/visual-gallery" className="inline-flex items-center gap-2">
                {siteConfig.appliedGalleryLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </AptButton>
          </AptCard>
        </div>

        {/* Sidebar - Profile Summary */}
        <div className="space-y-6">
          <AptCard variant="default" padding="large">
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  A quick view of the person, place, and channels behind APT.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {authorConfig.roles.map((role) => (
                  <AptTag key={role} variant="muted">
                    {role}
                  </AptTag>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-5">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{authorConfig.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Joined {authorConfig.joinedDate}</span>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Find me
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
            </div>
          </AptCard>
        </div>
      </div>
    </div>
  );
}

function ArrowCount({ count }: { count: number }) {
  return (
    <AptTag variant="muted" className="text-xs">
      {count}
    </AptTag>
  );
}
