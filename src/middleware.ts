import { defineMiddleware } from 'astro:middleware';

// Basic middleware - Arcjet will be configured via astro.config.ts integration
export const onRequest = defineMiddleware(async (_context, next) => {
  return next();
});
