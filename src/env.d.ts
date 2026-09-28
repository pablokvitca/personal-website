/// <reference path="../.astro/types.d.ts" />

// ISO timestamp of the build, injected by vite.define in astro.config.ts.
declare const __SITE_BUILD_TIME__: string;

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
  // Starwind UI namespace — set up by Toaster and used by heading-links
  __starwind__?: {
    toast?: import('./lib/starwind/toast-manager').StarwindToastManager | null;
  };
  // Last mouse position tracked by StarwindToastManager for focus-out collision detection
  __lastMousePosition?: { x: number; y: number };
}
