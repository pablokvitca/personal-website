import { defineMiddleware } from 'astro:middleware';

// Server-rendered routes that Arcjet protects. Everything else (prerendered pages, the static
// 404, unmatched paths) skips it: each protect() call runs a WebAssembly analyzer and an
// Arcjet API request, which on bot traffic was most of the Worker's CPU time.
const PROTECTED_ROUTES: ReadonlySet<string> = new Set(['/arcjet-test']);

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered || !PROTECTED_ROUTES.has(context.routePattern)) {
    return next();
  }

  let decision;
  try {
    const { aj } = await import('@/lib/arcjet');
    decision = await aj.protect(context.request);
  } catch {
    return next();
  }

  if (decision.isDenied()) {
    return new Response('Forbidden', { status: 403 });
  }

  return next();
});
