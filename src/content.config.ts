import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tag schema: type:value format
const tagSchema = z.string().regex(
  /^(technology|language|topic):[a-z0-9-]+$/,
  'Tags must be in format type:value (e.g., technology:react)'
);

// Blog collection - live posts
const blog = defineCollection({
  loader: glob({
    pattern: '**/live.mdx',
    base: './src/content/blog',
  }),
  schema: z.object({
    // Required frontmatter
    title: z.string(),
    abstract: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(tagSchema),

    // Optional frontmatter
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO frontmatter
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// Blog snapshots collection - historical versions
const blogSnapshots = defineCollection({
  loader: glob({
    pattern: '**/*.snapshot.mdx',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    publishedAt: z.coerce.date(),
    snapshotDate: z.coerce.date(),
    tags: z.array(tagSchema),
  }),
});

// Projects collection
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
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
  }),
});

export const collections = { blog, blogSnapshots, projects };
