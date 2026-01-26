# AI Agent Rules for Personal Website

This document provides guidelines for AI agents assisting with development on this project.

## Project Overview

Personal website for Pablo Kvitca built with Astro, React, TypeScript, and Tailwind CSS.
Hosted on Cloudflare Pages.

## Type Safety Requirements

- **No JavaScript files** - All code must be TypeScript (`.ts`, `.tsx`, `.astro`)
- Use `astro/tsconfigs/strictest` as the base TypeScript configuration
- **No `any` types** unless absolutely necessary with documented justification
- Use Zod schemas for runtime validation of content frontmatter
- All props must be explicitly typed
- Prefer `unknown` over `any` when type is truly unknown

## Project Tooling
- Use the upgraded project tooling CLIs: `mise`, `pnpm`, and `astro`; don't interact with legacy `npm` or `yarn` unless absolutely necessary.
- Prefer Astro-native Starwind UI components, fallback to shadcn components

## Post Versioning Pattern

Blog posts support versioning for edit history tracking.

### File Structure
```
src/content/blog/[shortname]/
├── live.mdx                           # Current published version
└── YYYY-MM-DD-HH-mm-SS.snapshot.mdx   # Historical snapshots
```

### Creating Snapshots
```bash
pnpm snapshot:blog <shortname>
```

This copies `live.mdx` to a timestamped snapshot file.

### URL Structure
- Current version: `/blog/[slug]`
- Historical version: `/blog/[slug]/[version]`

## Tag Format

Tags follow a `type:value` format for categorization and filtering.

### Tag Types
- `technology:` - Technologies used (e.g., `technology:react`, `technology:typescript`)
- `language:` - Content language (e.g., `language:english`, `language:spanish`)
- `topic:` - Subject matter (e.g., `topic:machine-learning`, `topic:web-development`)

### Tag Validation
Tags are validated via Zod regex: `/^(technology|language|topic):[a-z0-9-]+$/`

### Examples
```yaml
tags:
  - technology:astro
  - technology:react
  - topic:web-development
  - language:english
```

## Required Frontmatter

### Blog Posts (`live.mdx`)
```yaml
---
title: string          # Required - Post title
abstract: string       # Required - Brief description/TLDR
publishedAt: date      # Required - Publication date
tags: string[]         # Required - Array of type:value tags
updatedAt: date        # Optional - Last update date
draft: boolean         # Optional - Default: false
featured: boolean      # Optional - Default: false (show on homepage)
seoTitle: string       # Optional - Custom SEO title
seoDescription: string # Optional - Custom meta description
ogImage: string        # Optional - Open Graph image path
---
```

### Projects
```yaml
---
title: string          # Required - Project title
description: string    # Required - Project description
tags: string[]         # Required - Array of type:value tags
featured: boolean      # Optional - Default: false
status: enum           # Optional - 'active' | 'completed' | 'archived'
startDate: date        # Optional - Project start date
endDate: date          # Optional - Project end date
links:                 # Optional - Related links
  github: url
  demo: url
  docs: url
---
```

## UI Components

### Starwind (Astro Components)
Located in `src/components/ui/` - Static Astro components for non-interactive UI.
- Preferred for static content
- Zero JavaScript by default

### shadcn/ui (React Components)
Located in `src/components/ui/*.tsx` - Interactive React components.
- Use with `client:load` or `client:visible` directives
- Only use when interactivity is required

### Component Selection
1. Default to Astro components for static content
2. Use React components only for interactive elements
3. Prefer `client:visible` over `client:load` for below-the-fold content
4. Prefer `client:idle` for non-critical interactive elements

## Git Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style/formatting (no logic changes)
- `refactor:` - Code refactoring (no feature/fix)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (deps, config, etc.)

### Examples
```
feat: add blog search functionality
fix: correct tag filtering on mobile
docs: update README with deployment instructions
style: format components with prettier
refactor: extract tag utilities to lib/tags.ts
chore: update dependencies
```

## Security Requirements

### Secrets Management
- **NEVER** commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Required env vars:
  - `ARCJET_KEY` - Arcjet security key
  - `POSTHOG_KEY` / `PUBLIC_POSTHOG_KEY` - PostHog analytics

### Environment Files
- `.env` - Local development (gitignored)
- `.env.example` - Template for required variables (committed)

### Security Practices
- Arcjet Shield is enabled for all routes
- Validate all user input
- Sanitize content before rendering
- Use HTTPS for all external requests

## Package Manager

This project uses **pnpm**. Do not use npm or yarn.

```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add dependency
pnpm add -D <package> # Add dev dependency
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm check            # Run Astro check
pnpm typecheck        # Run TypeScript check
```

## File Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── blog/         # Blog-specific components
│   ├── projects/     # Project-specific components
│   ├── common/       # Shared layout components
│   └── analytics/    # Analytics components
├── content/
│   ├── blog/         # Blog posts (MDX)
│   └── projects/     # Project entries (MDX)
├── layouts/          # Page layouts
├── lib/              # Utility functions
├── pages/            # Route pages
└── styles/           # Global styles
```

## Testing Changes

Before committing:
1. Run `pnpm check` - Verify Astro configuration and TypeScript types
2. Run `pnpm build` - Verify production build succeeds
3. Test in browser with `pnpm dev`

Note: `pnpm check` (astro check) is the primary type checker for this project as it has full Astro compiler context. The `pnpm typecheck` command (tsc --noEmit) may report false positives on Astro component imports and should be considered supplementary.

## Deployment

Deployed to Cloudflare Pages via GitHub integration.

- Build command: `pnpm build`
- Output directory: `dist/`
- Environment variables set in Cloudflare dashboard
