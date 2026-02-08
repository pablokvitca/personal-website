/**
 * Shared utilities for versioned content collections (blog posts and projects).
 */

/**
 * Check if a collection entry is a live file (not a snapshot).
 * Works with any collection entry that has an `id` property.
 */
export function isLiveEntry(entry: { id: string }): boolean {
  return entry.id.endsWith('/live');
}

/**
 * Extract slug from a versioned entry ID.
 * "welcome/live" -> "welcome"
 * "welcome/2026-02-07-12-00snapshot" -> "welcome"
 */
export function getSlugFromId(id: string): string {
  return id.split('/')[0];
}
