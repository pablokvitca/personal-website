import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;
export type BlogSnapshot = CollectionEntry<'blogSnapshots'>;

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/**
 * Get featured blog posts for homepage
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => data.featured && !data.draft
  );
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getCollection('blog');
  return posts.find((post) => post.id.startsWith(slug + '/'));
}

/**
 * Get all snapshots for a specific blog post
 */
export async function getBlogSnapshots(slug: string): Promise<BlogSnapshot[]> {
  const snapshots = await getCollection('blogSnapshots', ({ id }) =>
    id.startsWith(slug + '/')
  );
  return snapshots.sort(
    (a, b) =>
      new Date(b.data.snapshotDate).getTime() -
      new Date(a.data.snapshotDate).getTime()
  );
}

/**
 * Extract slug from post id (removes /live suffix)
 */
export function getSlugFromId(id: string): string {
  return id.replace(/\/live$/, '');
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
