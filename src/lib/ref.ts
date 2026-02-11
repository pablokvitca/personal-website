export interface TrackingParams {
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const SESSION_KEY = 'tracking-params';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

/**
 * Read stored TrackingParams from sessionStorage.
 * Returns an empty object if nothing is stored or parsing fails.
 */
export function getStoredTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: TrackingParams = {};
    const obj = parsed as Record<string, unknown>;
    if (typeof obj['ref'] === 'string') result.ref = obj['ref'];
    for (const key of UTM_KEYS) {
      if (typeof obj[key] === 'string') result[key] = obj[key] as string;
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Parse tracking params from the current URL, merge with stored params
 * (URL params take priority), and persist to sessionStorage.
 * Safe to call multiple times — idempotent when URL has no params.
 */
export function parseAndStoreTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};
  const search = new URLSearchParams(window.location.search);
  const stored = getStoredTrackingParams();
  const merged: TrackingParams = { ...stored };
  const refFromUrl = search.get('ref');
  if (refFromUrl !== null) merged.ref = refFromUrl;
  for (const key of UTM_KEYS) {
    const val = search.get(key);
    if (val !== null) merged[key as UtmKey] = val;
  }
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage may be unavailable in some environments
  }
  return merged;
}

/**
 * Returns all currently tracked params as a flat Record<string, string>
 * suitable for spreading into analytics properties.
 * Only includes keys that have actual values (no undefined keys emitted).
 */
export function getTrackingParamsForAnalytics(): Record<string, string> {
  const params = getStoredTrackingParams();
  const result: Record<string, string> = {};
  if (params.ref !== undefined) result['ref'] = params.ref;
  for (const key of UTM_KEYS) {
    const val = params[key];
    if (val !== undefined) result[key] = val;
  }
  return result;
}
