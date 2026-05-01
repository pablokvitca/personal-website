import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tag schema: type:value format
const tagSchema = z.string().regex(
  /^(technology|language|topic):[a-z0-9-]+$/,
  'Tags must be in format type:value (e.g., technology:react)'
);

// Blog collection - live.mdx is the current version, *.snapshot.mdx are historical milestones
const blog = defineCollection({
  loader: glob({
    pattern: '**/{live,*.snapshot}.mdx',
    base: './src/content/blog',
  }),
  schema: z.object({
    // Required frontmatter
    title: z.string(),
    abstract: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(tagSchema),

    // Versioning - only present on snapshot files
    snapshotDate: z.coerce.date().optional(),

    // Optional frontmatter
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // Table of Contents
    tocMaxDepth: z.number().min(1).max(6).default(3).optional(),

    // SEO frontmatter
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// Projects collection - live.mdx is the current version, *.snapshot.mdx are historical milestones
const projects = defineCollection({
  loader: glob({
    pattern: '**/{live,*.snapshot}.mdx',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(tagSchema),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'completed', 'archived']).default('active'),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        docs: z.string().url().optional(),
      })
      .optional(),

    // Versioning - only present on snapshot files
    snapshotDate: z.coerce.date().optional(),

    // Optional frontmatter
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    // Table of Contents
    tocMaxDepth: z.number().min(1).max(6).default(3).optional(),
  }),
});

// Pages collection - static pages like colophon
const pages = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/pages',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

// Glossary collection - concept definitions with optional extended MDX body
const glossary = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/glossary',
  }),
  schema: z.object({
    title: z.string(),
    alternativeNames: z.array(z.string()).default([]),
    shortDescription: z.string(),
    externalSources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
    relatedTerms: z.array(z.string()).default([]), // slugs of related entries
  }),
});

export const collections = { blog, projects, pages, glossary };
