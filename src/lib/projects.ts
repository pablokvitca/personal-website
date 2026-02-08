import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { isLiveEntry, getSlugFromId } from '@/lib/content';

export type Project = CollectionEntry<'projects'>;
export { isLiveEntry };

/**
 * Extract slug from a project entry ID.
 * "personal-website/live" -> "personal-website"
 * "personal-website/2026-02-05-10-30snapshot" -> "personal-website"
 * Legacy flat: "personal-website.mdx" -> "personal-website"
 */
export function getProjectSlugFromId(id: string): string {
  if (id.includes('/')) {
    return getSlugFromId(id);
  }
  return id.replace(/\.mdx$/, '');
}

/**
 * Get the latest (live) version of each project.
 * Sorted: featured first, then startDate descending.
 */
export async function getAllProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);

  // Return only live entries
  const liveProjects = all.filter(isLiveEntry);

  return liveProjects.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const aDate = a.data.startDate?.getTime() ?? 0;
    const bDate = b.data.startDate?.getTime() ?? 0;
    return bDate - aDate;
  });
}

/**
 * Get all historical snapshots for a project, excluding the most recent one.
 * The most recent snapshot represents the current live state and is redundant
 * with live.mdx, so it's hidden from version history.
 */
export async function getProjectSnapshots(slug: string): Promise<Project[]> {
  const all = await getCollection('projects', ({ id }) =>
    id.startsWith(slug + '/') && !id.endsWith('/live')
  );

  if (all.length <= 1) return [];

  const sorted = all.sort(
    (a, b) =>
      new Date(b.data.snapshotDate ?? 0).getTime() -
      new Date(a.data.snapshotDate ?? 0).getTime()
  );

  // Return all except the most recent snapshot (it matches current live)
  return sorted.slice(1);
}
