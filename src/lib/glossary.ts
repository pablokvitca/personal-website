import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { isLiveEntry, getSlugFromId } from '@/lib/content';

export type GlossaryEntry = CollectionEntry<'glossary'>;

export interface GlossaryTermData {
  slug: string;
  title: string;
  alternativeNames: string[];
  shortDescription: string;
}

export interface GlossaryUsage {
  slug: string;
  type: 'blog' | 'project';
  title: string;
  date: Date;
}

/**
 * Get all glossary entries sorted alphabetically by title.
 */
export async function getAllGlossaryEntries(): Promise<GlossaryEntry[]> {
  const entries = await getCollection('glossary');
  return entries.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * Get a single glossary entry by slug.
 */
export async function getGlossaryEntry(slug: string): Promise<GlossaryEntry | undefined> {
  const entries = await getCollection('glossary', ({ id }) => id === `${slug}.mdx`);
  return entries[0];
}

/**
 * Get serializable term data for client-side highlighting.
 */
export async function getGlossaryTermData(): Promise<GlossaryTermData[]> {
  const entries = await getAllGlossaryEntries();
  return entries.map((entry) => ({
    slug: entry.id.replace(/\.mdx$/, ''),
    title: entry.data.title,
    alternativeNames: entry.data.alternativeNames,
    shortDescription: entry.data.shortDescription,
  }));
}

/**
 * Find all blog posts and projects that reference a glossary term.
 * Searches the raw body content of each live entry (case-insensitive).
 */
export async function getUsagesForTerm(
  _slug: string,
  title: string,
  alternativeNames: string[]
): Promise<GlossaryUsage[]> {
  const allTerms = [title, ...alternativeNames];
  const patterns = allTerms.map(
    (term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
  );

  function mentionsTerm(body: string | undefined): boolean {
    if (!body) return false;
    return patterns.some((re) => re.test(body));
  }

  const [blogEntries, projectEntries] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('projects', ({ data }) => !data.draft),
  ]);

  const usages: GlossaryUsage[] = [];

  for (const entry of blogEntries.filter(isLiveEntry)) {
    if (mentionsTerm(entry.body)) {
      usages.push({
        slug: getSlugFromId(entry.id),
        type: 'blog',
        title: entry.data.title,
        date: entry.data.publishedAt,
      });
    }
  }

  for (const entry of projectEntries.filter(isLiveEntry)) {
    if (mentionsTerm(entry.body)) {
      usages.push({
        slug: getSlugFromId(entry.id),
        type: 'project',
        title: entry.data.title,
        date: entry.data.startDate ?? new Date(0),
      });
    }
  }

  // Sort by date descending
  return usages.sort((a, b) => b.date.getTime() - a.date.getTime());
}
