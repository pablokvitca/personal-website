import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { isLiveEntry, getSlugFromId } from '@/lib/content';

export type BlogPost = CollectionEntry<'blog'>;
export { isLiveEntry, getSlugFromId };

/**
 * Get the latest (live) version of each blog post
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const allEntries = await getCollection('blog', ({ data }) => !data.draft);

  // Return only live entries
  const livePosts = allEntries.filter(isLiveEntry);

  // Sort by publishedAt descending
  return livePosts.sort(
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
 * Get the live version of a blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const entries = await getCollection('blog', ({ id }) =>
    id === `${slug}/live`
  );

  return entries[0];
}

/**
 * Get all historical snapshots for a blog post, excluding the most recent one.
 * The most recent snapshot represents the current live state and is redundant
 * with live.mdx, so it's hidden from version history.
 */
export async function getBlogSnapshots(slug: string): Promise<BlogPost[]> {
  const allSnapshots = await getCollection('blog', ({ id }) =>
    id.startsWith(slug + '/') && !id.endsWith('/live')
  );

  if (allSnapshots.length <= 1) return [];

  // Sort by snapshotDate descending
  const sorted = allSnapshots.sort(
    (a, b) =>
      new Date(b.data.snapshotDate ?? 0).getTime() -
      new Date(a.data.snapshotDate ?? 0).getTime()
  );

  // Return all except the most recent snapshot (it matches current live)
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
    id.startsWith(slug + '/') && !id.endsWith('/live')
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
