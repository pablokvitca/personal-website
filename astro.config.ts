import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import compress from '@playform/compress';

export default defineConfig({
  site: 'https://pablokvitca.com',
  output: 'server',

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    // Disable React SSR to avoid React 19 MessageChannel incompatibility with Cloudflare Workers
    // All React components use client:* directives anyway (client:load, etc.)
    react({
      include: ['**/**.tsx'],
      experimentalReactChildren: true,
    }),
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
    // compress must be last
    compress(),
  ],
});
