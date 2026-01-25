/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string;
  readonly ARCJET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
