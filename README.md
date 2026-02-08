# Personal Website for Pablo Kvitca

My personal website built with [Astro](https://astro.build/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). Features a blog with snapshot-based versioning, project showcase, and bilingual content (English and Spanish).

**Live:** [pablokvitca.com](https://pablokvitca.com)

## Technology Stack

### Framework & UI
- [Astro](https://astro.build/) with [islands architecture](https://docs.astro.build/en/concepts/islands/)
- [React](https://react.dev/) for interactive components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Starwind](https://starwind.dev/) for Astro-native UI components
- [MDX](https://mdxjs.com/) for content with JSX components

### Hosting & Infrastructure
- [Cloudflare Pages](https://pages.cloudflare.com/) for edge deployment
- [Terraform](https://www.terraform.io/) for infrastructure as code (managed in a separate repo)

### Security & Analytics
- [Arcjet](https://arcjet.com/) for application security
- [PostHog](https://posthog.com/) for product analytics

### Development
- [pnpm](https://pnpm.io/) as package manager
- [mise](https://mise.jdx.dev/) for runtime version management
- [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) and [Cursor](https://cursor.com/) for agentic coding

## Getting Started

```bash
# Install dependencies
mise exec pnpm install

# Start dev server
mise exec pnpm dev

# Build for production
mise exec pnpm build

# Type check
mise exec pnpm check
```

## Project Structure

```
src/
├── components/     # UI, blog, project, and layout components
├── content/        # Blog posts and projects (MDX, git-versioned)
├── layouts/        # Page layouts
├── lib/            # Utility functions
├── pages/          # Route pages
└── styles/         # Global styles
```

## History

The first version was built on Angular and Contentful. Then it got simplified to a GitHub readme for a while, and after that it lived on Squarespace. The current version is a ground-up rebuild with Astro.

## License

This project is not currently licensed for reuse. All rights reserved.
