# Development Guide

This guide covers how to set up and develop the personal website locally.

## Prerequisites

- [mise](https://mise.jdx.dev/) - Runtime version manager (manages Node.js and pnpm)
- Git

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pablokvitca/personal-website.git
   cd personal-website
   ```

2. **Trust and install runtimes with mise**
   ```bash
   mise trust
   mise install
   ```

3. **Install dependencies**
   ```bash
   mise exec -- pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual keys (see [Environment Variables](#environment-variables) below).

## Development Commands

All commands should be run with `mise exec --` prefix to ensure correct Node.js/pnpm versions, or you can run `mise shell` first to activate the environment.

### Start Development Server

```bash
mise exec -- pnpm dev
```

Opens at http://localhost:4321

### Type Checking

```bash
# Astro-specific type checking
mise exec -- pnpm check

# TypeScript type checking
mise exec -- pnpm typecheck
```

### Build for Production

```bash
mise exec -- pnpm build
```

Output goes to `dist/` directory.

### Preview Production Build

```bash
mise exec -- pnpm preview
```

### Create Blog Snapshot

Creates a timestamped snapshot of a blog post for version history:

```bash
mise exec -- pnpm snapshot:blog <shortname>
```

Example:
```bash
mise exec -- pnpm snapshot:blog hello-world
```

## Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `PUBLIC_POSTHOG_KEY` | PostHog project API key | [PostHog Dashboard](https://app.posthog.com) → Project Settings |
| `ARCJET_KEY` | Arcjet API key | [Arcjet Dashboard](https://app.arcjet.com) |

**Note:** The site will build and run without these keys, but analytics and security features will be disabled.

## Project Structure

```
src/
├── components/       # Astro and React components
│   ├── analytics/    # PostHog provider
│   ├── blog/         # Blog-related components
│   ├── common/       # Header, Footer, Navigation
│   ├── projects/     # Project-related components
│   └── ui/           # Starwind UI components
├── content/          # Content collections (MDX)
│   ├── blog/         # Blog posts
│   │   └── [slug]/
│   │       ├── live.mdx           # Current version
│   │       └── *.snapshot.mdx     # Historical versions
│   └── projects/     # Project pages
├── layouts/          # Page layouts
├── lib/              # Utility functions
├── pages/            # Astro pages (file-based routing)
├── styles/           # Global styles
├── content.config.ts # Content collection schemas
└── env.d.ts          # TypeScript environment types

scripts/
└── snapshot-blog.mjs # Blog snapshot CLI tool

public/
├── robots.txt        # Crawler instructions
├── agents.txt        # AI agent instructions
└── llms.txt          # LLM site information
```

## Content Authoring

### Blog Posts

1. Create a new directory: `src/content/blog/[shortname]/`
2. Add `live.mdx` with required frontmatter:

```mdx
---
title: "Post Title"
abstract: "Brief description of the post"
publishedAt: 2025-01-25
tags:
  - technology:astro
  - topic:web-development
  - language:english
draft: false
featured: false
seoTitle: "Optional custom SEO title"
seoDescription: "Optional custom meta description"
ogImage: "/og/custom-image.png"
---

Your content here...
```

### Projects

Create `src/content/projects/[project-name].mdx`:

```mdx
---
title: "Project Name"
description: "Brief project description"
tags:
  - technology:typescript
  - technology:react
featured: false
status: active  # active | completed | archived
startDate: 2025-01-01
endDate: 2025-06-01  # optional
links:
  github: "https://github.com/user/repo"
  demo: "https://example.com"
  docs: "https://docs.example.com"
---

Project details here...
```

### Tag Format

Tags follow the `type:value` format:
- `technology:react` - Technologies used
- `language:english` - Content language
- `topic:web-development` - Subject matter

## Deployment

### Cloudflare Pages (Recommended)

1. **Connect to GitHub**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project → Connect to Git
   - Select your repository

2. **Configure build settings**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Node.js version: 22 (or match `.mise.toml`)

3. **Add environment variables**
   - Settings → Environment variables
   - Add `PUBLIC_POSTHOG_KEY` and `ARCJET_KEY`

### Manual Deployment

```bash
mise exec -- pnpm build
mise exec -- pnpm dlx wrangler pages deploy dist/
```

## Troubleshooting

### "node: not found" errors

Make sure to use `mise exec --` prefix or run `mise shell` first:
```bash
mise shell
pnpm dev
```

### Content collection errors

After adding/modifying content, restart the dev server to regenerate types:
```bash
# Stop dev server (Ctrl+C), then:
mise exec -- pnpm dev
```

### Type errors

Run full type checking to see all issues:
```bash
mise exec -- pnpm check
mise exec -- pnpm typecheck
```

## Code Style

- **TypeScript**: Strict mode, no `any` types
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation changes
  - `style:` - Code style changes (formatting)
  - `refactor:` - Code refactoring
  - `test:` - Adding/updating tests
  - `chore:` - Maintenance tasks

See `AGENTS.md` for full development guidelines.
