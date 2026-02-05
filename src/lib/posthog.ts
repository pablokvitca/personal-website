import posthog from 'posthog-js';

let isInitialized = false;

/**
 * Initialize PostHog analytics
 */
export function initPostHog(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!posthogKey) {
    console.warn('PostHog key not configured');
    return;
  }

  const hostname = window.location.hostname;
  const isProduction = hostname === 'pablokvitca.com';
  const environment = isProduction ? 'production' : 'preview';

  posthog.init(posthogKey, {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  posthog.register({
    environment,
    deploy_url: `https://${hostname}`,
  });

  isInitialized = true;
}

/**
 * Track a custom event
 */
export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  posthog.capture(name, properties);
}

/**
 * Track a page view with additional metadata
 */
export function trackPageWithTags(
  path: string,
  tags: string[],
  metadata?: {
    blogSlug?: string;
    blogVersion?: string;
    projectSlug?: string;
  }
): void {
  if (typeof window === 'undefined') return;
  posthog.capture('page_view_with_tags', {
    path,
    tags,
    ...metadata,
  });
}

/**
 * Track a button click
 */
export function trackButtonClick(buttonId: string, path: string): void {
  if (typeof window === 'undefined') return;
  posthog.capture('button_click', {
    buttonId,
    path,
  });
}

/**
 * Identify a user (if needed in future)
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  posthog.identify(userId, properties);
}
