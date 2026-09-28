export type AnalyticsEnvironment = 'production' | 'preview' | 'local';

const PRODUCTION_HOSTS = new Set(['pablokvitca.com', 'www.pablokvitca.com']);

// Keep in sync with the inline check in src/components/analytics/GoogleAnalytics.astro.
const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/;

/**
 * Classifies where the site is running so analytics can skip local development and tag
 * previews (workers.dev version/alias URLs) separately from production.
 */
export function getAnalyticsEnvironment(hostname: string): AnalyticsEnvironment {
  if (PRODUCTION_HOSTS.has(hostname)) return 'production';
  if (LOCAL_HOST.test(hostname)) return 'local';
  return 'preview';
}
