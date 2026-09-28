import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import arcjet from '@arcjet/astro';
import compress from '@playform/compress';

export default defineConfig({
  site: 'https://pablokvitca.com',
  output: 'server',
  // Sessions are unused; without this the adapter wires up a SESSION KV binding.
  session: false,
  // Astro 7 defaults to 'jsx', which drops whitespace between inline elements.
  compressHTML: true,

  adapter: cloudflare({
    imageService: 'compile',
    // The workerd prerenderer only sees Wrangler bindings, not build env vars like ARCJET_KEY,
    // which the Arcjet middleware requires at module load even for prerendered routes.
    prerenderEnvironment: 'node',
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark',
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
    // Arcjet base client — rules are added per-route or in middleware via .withRule()
    arcjet({ rules: [] }),
    // compress must be last
    compress(),
  ],
});
