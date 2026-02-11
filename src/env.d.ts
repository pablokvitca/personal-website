/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
  readonly ARCJET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// GA Consent Mode — gtag is set up via is:inline in GoogleAnalytics.astro
interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
