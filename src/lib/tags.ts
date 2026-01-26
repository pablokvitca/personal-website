export type TagType = 'technology' | 'language' | 'topic';

export interface ParsedTag {
  type: TagType;
  value: string;
  raw: string;
}

/**
 * Parse a single tag string into its type and value components
 */
export function parseTag(tag: string): ParsedTag | null {
  const match = tag.match(/^(technology|language|topic):([a-z0-9-]+)$/);
  if (!match) return null;

  return {
    type: match[1] as TagType,
    value: match[2],
    raw: tag,
  };
}

/**
 * Parse an array of tag strings
 */
export function parseTags(tags: string[]): ParsedTag[] {
  return tags.map(parseTag).filter((t): t is ParsedTag => t !== null);
}

/**
 * Filter parsed tags by type
 */
export function filterTagsByType(tags: ParsedTag[], type: TagType): ParsedTag[] {
  return tags.filter((t) => t.type === type);
}

/**
 * Get technology tags from a list of tag strings
 */
export function getTechnologyTags(tags: string[]): ParsedTag[] {
  return filterTagsByType(parseTags(tags), 'technology');
}

/**
 * Get topic tags from a list of tag strings
 */
export function getTopicTags(tags: string[]): ParsedTag[] {
  return filterTagsByType(parseTags(tags), 'topic');
}

/**
 * Get language tags from a list of tag strings
 */
export function getLanguageTags(tags: string[]): ParsedTag[] {
  return filterTagsByType(parseTags(tags), 'language');
}

/**
 * Format a tag value for display (capitalize, replace hyphens with spaces)
 */
export function formatTagValue(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all unique tags from a collection of items
 */
export function getUniqueTags(items: Array<{ tags: string[] }>): ParsedTag[] {
  const allTags = items.flatMap((item) => item.tags);
  const uniqueRaw = [...new Set(allTags)];
  return parseTags(uniqueRaw);
}
