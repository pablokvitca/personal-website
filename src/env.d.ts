/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
  readonly ARCJET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
