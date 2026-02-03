import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Extract slug from snapshot ID (e.g., "hello-world/2024-01-01-12-00.snapshot.mdx" -> "hello-world")
 */
export function getSlugFromId(id: string): string {
  return id.split('/')[0];
}

/**
 * Get the latest (live) version of each blog post
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const allSnapshots = await getCollection('blog', ({ data }) => !data.draft);

  // Group by slug
  const bySlug = new Map<string, BlogPost[]>();
  for (const snapshot of allSnapshots) {
    const slug = getSlugFromId(snapshot.id);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, []);
    }
    bySlug.get(slug)!.push(snapshot);
  }

  // Get latest snapshot for each slug
  const latestPosts: BlogPost[] = [];
  for (const [, snapshots] of bySlug) {
    // Sort by snapshotDate descending
    const sorted = snapshots.sort(
      (a, b) =>
        new Date(b.data.snapshotDate).getTime() -
        new Date(a.data.snapshotDate).getTime()
    );
    latestPosts.push(sorted[0]);
  }

  // Sort by publishedAt
  return latestPosts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/**
 * Get featured blog posts for homepage
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.data.featured);
}

/**
 * Get the latest (live) version of a blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const snapshots = await getCollection('blog', ({ id }) =>
    id.startsWith(slug + '/')
  );

  if (snapshots.length === 0) return undefined;

  // Sort by snapshotDate descending and return latest
  return snapshots.sort(
    (a, b) =>
      new Date(b.data.snapshotDate).getTime() -
      new Date(a.data.snapshotDate).getTime()
  )[0];
}

/**
 * Get all historical snapshots for a blog post (excluding the latest)
 */
export async function getBlogSnapshots(slug: string): Promise<BlogPost[]> {
  const allSnapshots = await getCollection('blog', ({ id }) =>
    id.startsWith(slug + '/')
  );

  // Sort by snapshotDate descending
  const sorted = allSnapshots.sort(
    (a, b) =>
      new Date(b.data.snapshotDate).getTime() -
      new Date(a.data.snapshotDate).getTime()
  );

  // Return all except the first (latest)
  return sorted.slice(1);
}

/**
 * Get a specific snapshot by slug and timestamp
 */
export async function getSnapshotByTimestamp(
  slug: string,
  timestamp: string
): Promise<BlogPost | undefined> {
  const allSnapshots = await getCollection('blog', ({ id }) =>
    id.startsWith(slug + '/')
  );

  return allSnapshots.find((s) => s.id.includes(timestamp));
}

/**
 * Paginate a list of posts
 */
export function paginatePosts<T>(
  posts: T[],
  page: number,
  perPage: number = 10
): {
  items: T[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    items: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / perPage),
    currentPage: page,
    hasNext: end < posts.length,
    hasPrev: page > 1,
  };
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Heading type from Astro's render()
 */
export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * Tree node for nested TOC structure
 */
export interface TocNode {
  heading: Heading;
  children: TocNode[];
}

/**
 * Filter headings by max depth
 */
export function filterHeadingsByDepth(headings: Heading[], maxDepth: number): Heading[] {
  return headings.filter((heading) => heading.depth <= maxDepth);
}

/**
 * Generate nested TOC tree from flat headings array
 */
export function generateTocTree(headings: Heading[]): TocNode[] {
  const tree: TocNode[] = [];
  const stack: TocNode[] = [];

  for (const heading of headings) {
    const node: TocNode = { heading, children: [] };

    // Find the parent node
    while (stack.length > 0 && stack[stack.length - 1].heading.depth >= heading.depth) {
      stack.pop();
    }

    // Add to parent's children or root
    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return tree;
}
