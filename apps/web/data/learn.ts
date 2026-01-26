export type InsightType = "blog" | "podcast" | "guide";

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  content: string; // Full markdown/text content
  concepts: string[];
  relatedLabs?: string[];
  relatedSystems?: string[];
  publishedAt?: string;
  duration?: string; // For podcasts
  thumbnail?: string; // Thumbnail image URL
  media?: {
    audioUrl?: string;
    videoUrl?: string;
    embedUrl?: string; // For embedded players (YouTube, Spotify, etc.)
  };
}

export const insights: Insight[] = [
  {
    id: "decision-driven-development",
    type: "blog",
    title: "Decision-Driven Development",
    description:
      "Why documenting decisions is more valuable than documenting code, and how to build a decision log that actually gets used.",
    content: `
## The Problem with Code Documentation

Most teams focus on documenting *what* the code does. Comments explain functions, READMEs describe setup steps, and wikis outline architecture. But there's a critical gap: **why** decisions were made.

## Why Decisions Matter More

When you revisit code six months later, knowing *what* it does is usually obvious from reading it. What's not obvious is:

- Why this approach was chosen over alternatives
- What constraints influenced the decision
- What tradeoffs were accepted
- What the expected outcome was

## Building a Decision Log That Gets Used

A decision log only works if it's:

1. **Low friction** - Must be faster than "I'll remember this"
2. **Discoverable** - Easy to search and browse
3. **Contextual** - Linked to the code or system it affects
4. **Living** - Updated when decisions are revisited

### The Template

Each decision entry should capture:

- **Title**: A clear, searchable name
- **Status**: Proposed → Accepted → Superseded
- **Context**: What prompted this decision?
- **Options Considered**: What alternatives were evaluated?
- **Decision**: What was chosen and why?
- **Consequences**: What are the expected tradeoffs?

## Making It Stick

The key is making decision documentation part of your workflow, not an afterthought. Integrate it into:

- Pull request templates
- Architecture review meetings
- Onboarding documentation

When new team members can understand *why* things are the way they are, they make better decisions themselves.
    `,
    concepts: ["architecture", "documentation", "teams"],
    relatedLabs: ["decision-log"],
    publishedAt: "2024-01-15",
  },
  {
    id: "edge-first-thinking",
    type: "guide",
    title: "Edge-First Thinking",
    description:
      "A practical guide to designing applications with edge computing in mind, from caching strategies to data locality.",
    content: `
## What is Edge-First Thinking?

Edge-first thinking means designing your application architecture with edge computing as a primary consideration, not an afterthought. It's about bringing computation and data closer to users.

## Why Edge Matters

Traditional architectures route all requests through centralized servers. This creates:

- **Latency**: Every request travels to a distant data center
- **Single points of failure**: One region down affects everyone
- **Scaling challenges**: Traffic spikes hit one location

Edge computing distributes your application across global points of presence (PoPs), typically 200+ locations worldwide.

## Core Principles

### 1. Cache Aggressively

The best request is one that never hits your origin. Design your caching strategy first:

- **Static assets**: Immutable, long cache times
- **Dynamic content**: Short TTL with stale-while-revalidate
- **Personalized data**: Edge-side personalization when possible

### 2. Compute at the Edge

Modern edge platforms (Cloudflare Workers, Deno Deploy) let you run code at the edge:

- API routing and validation
- A/B testing and feature flags
- Authentication and authorization
- Response transformation

### 3. Data Locality

Keep data close to where it's needed:

- Read replicas in multiple regions
- Edge key-value stores for session data
- Smart routing to nearest data source

## Implementation Patterns

### The Cache-First Pattern

\`\`\`
Request → Edge Cache → (miss) → Origin → Cache → Response
                    → (hit) → Response
\`\`\`

### The Compute-at-Edge Pattern

\`\`\`
Request → Edge Worker → (simple) → Response
                     → (complex) → Origin → Response
\`\`\`

## Getting Started

1. Audit your current architecture for edge opportunities
2. Identify your most latency-sensitive paths
3. Start with static asset caching
4. Gradually move logic to the edge
    `,
    concepts: ["performance", "edge", "architecture"],
    relatedLabs: ["edge-caching-patterns", "api-contract-first"],
    relatedSystems: ["apt-site"],
    publishedAt: "2024-02-20",
  },
  {
    id: "systems-thinking-podcast",
    type: "podcast",
    title: "Systems Over Screens",
    description:
      "A discussion on why thinking in systems rather than features leads to better products and happier teams.",
    content: `
## Episode Summary

In this episode, we explore why feature-focused development often leads to fragmented products and burned-out teams. The alternative? Systems thinking.

## Key Topics Discussed

### The Feature Trap (00:00 - 12:30)

We discuss how most product roadmaps are feature lists, and why this creates problems:

- Features compete for priority
- No coherent vision emerges
- Teams become feature factories
- Technical debt accumulates

### What is Systems Thinking? (12:30 - 28:00)

Systems thinking means understanding how parts interact to create emergent behavior:

- Feedback loops
- Unintended consequences
- Leverage points
- Mental models

### Applying Systems Thinking to Product (28:00 - 45:00)

Practical techniques for product teams:

- Map the system before adding features
- Identify feedback loops (positive and negative)
- Find leverage points for maximum impact
- Design for emergence, not just function

## Quotes from the Episode

> "A feature is a solution. A system is an understanding of the problem space."

> "The best products don't have the most features—they have the most coherent systems."

> "When you think in systems, you stop asking 'what should we build?' and start asking 'how should this work?'"

## Resources Mentioned

- "Thinking in Systems" by Donella Meadows
- "The Fifth Discipline" by Peter Senge
- Systems Dynamics modeling tools
    `,
    concepts: ["systems-thinking", "product", "teams"],
    publishedAt: "2024-03-10",
    duration: "45 min",
    media: {
      audioUrl: "https://example.com/podcast/systems-over-screens.mp3",
      embedUrl: "https://open.spotify.com/embed/episode/example",
    },
  },
  {
    id: "auth-security-guide",
    type: "guide",
    title: "Auth Security Patterns",
    description:
      "Comprehensive guide to implementing secure authentication with practical examples and common pitfalls to avoid.",
    content: `
## Authentication Security Fundamentals

Authentication is the front door to your application. Get it wrong, and nothing else matters.

## Common Pitfalls

### 1. Storing Passwords Incorrectly

**Wrong**: Plain text, MD5, SHA-1
**Right**: bcrypt, Argon2, scrypt with proper work factors

### 2. Session Management Issues

- Sessions that never expire
- Predictable session tokens
- Sessions not invalidated on logout
- No session binding to user agent/IP

### 3. JWT Mistakes

- Using "none" algorithm
- Symmetric keys in distributed systems
- No token expiration
- Storing sensitive data in payload

## Secure Authentication Patterns

### Password Authentication

1. Enforce minimum complexity requirements
2. Check against known breached passwords
3. Implement account lockout (with care)
4. Use constant-time comparison

### Multi-Factor Authentication

Offer multiple second factors:
- TOTP (authenticator apps)
- WebAuthn/passkeys (preferred)
- SMS (last resort, vulnerable to SIM swap)

### OAuth/OIDC Integration

When integrating social login:
- Validate all tokens server-side
- Check the 'aud' claim matches your client
- Use PKCE for public clients
- Store refresh tokens securely

## Session Security

### Token Storage

- HttpOnly cookies for web (not localStorage)
- Secure flag always set
- SameSite=Strict or Lax
- Proper CORS configuration

### Token Refresh

Implement refresh token rotation:
1. Issue new refresh token on each use
2. Invalidate old refresh token
3. Detect and respond to reuse

## Monitoring and Response

- Log all authentication events
- Alert on suspicious patterns
- Have an incident response plan
- Regular security audits
    `,
    concepts: ["security", "auth", "best-practices"],
    relatedSystems: ["auth-patterns"],
    publishedAt: "2024-01-28",
  },
];
