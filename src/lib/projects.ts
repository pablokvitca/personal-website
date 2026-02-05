import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Extract slug from a project snapshot ID.
 * Versioned: "personal-website/2026-02-05-10-30.snapshot.mdx" -> "personal-website"
 * Legacy flat: "personal-website.mdx" -> "personal-website"
 */
export function getProjectSlugFromId(id: string): string {
  if (id.includes('/')) {
    return id.split('/')[0];
  }
  return id.replace(/\.mdx$/, '');
}

/**
 * Get the latest (live) version of each project.
 * Groups all snapshots by slug and picks the one with the most recent snapshotDate.
 * Sorted: featured first, then startDate descending.
 */
export async function getAllProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);

  const bySlug = new Map<string, Project[]>();
  for (const entry of all) {
    const slug = getProjectSlugFromId(entry.id);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, []);
    }
    bySlug.get(slug)!.push(entry);
  }

  const latest: Project[] = [];
  for (const [, entries] of bySlug) {
    if (entries.length === 1) {
      latest.push(entries[0]);
    } else {
      const sorted = entries.sort(
        (a, b) =>
          new Date(b.data.snapshotDate ?? 0).getTime() -
          new Date(a.data.snapshotDate ?? 0).getTime()
      );
      latest.push(sorted[0]);
    }
  }

  return latest.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const aDate = a.data.startDate?.getTime() ?? 0;
    const bDate = b.data.startDate?.getTime() ?? 0;
    return bDate - aDate;
  });
}

/**
 * Get all historical snapshots for a project (excluding the latest).
 * Returns an empty array for single-version projects.
 */
export async function getProjectSnapshots(slug: string): Promise<Project[]> {
  const all = await getCollection('projects', ({ id }) =>
    id.startsWith(slug + '/')
  );

  if (all.length <= 1) return [];

  const sorted = all.sort(
    (a, b) =>
      new Date(b.data.snapshotDate ?? 0).getTime() -
      new Date(a.data.snapshotDate ?? 0).getTime()
  );

  return sorted.slice(1);
}
