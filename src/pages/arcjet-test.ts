import type { APIRoute } from 'astro';

// Server-rendered smoke-test route for the Arcjet middleware (see PROTECTED_ROUTES in
// src/middleware.ts). Arcjet runs before this handler, so a 200 means the request was allowed.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response('ok\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
