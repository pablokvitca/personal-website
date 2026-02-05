import { defineMiddleware } from 'astro:middleware';
import arcjet, { shield, detectBot } from 'arcjet:client';

// Build the Arcjet client with global rules via .withRule(), following the
// pattern from https://github.com/arcjet/example-astro
const aj = arcjet
  .withRule(
    // Shield WAF — blocks DDoS and common attacks (OWASP Top 10) immediately.
    shield({ mode: 'LIVE' }),
  )
  .withRule(
    // Bot detection — DRY_RUN so decisions are recorded but nothing is blocked yet.
    // Flip to LIVE and adjust allow/deny once you've reviewed traffic in the Arcjet dashboard.
    // Full category list: ACADEMIC, ADVERTISING, AI, AMAZON, APPLE, ARCHIVE,
    // FEEDFETCHER, GOOGLE, META, MICROSOFT, MONITOR, OPTIMIZER, PREVIEW,
    // PROGRAMMATIC, SEARCH_ENGINE, SLACK, SOCIAL, TOOL, UNKNOWN, VERCEL, WEBHOOK, YAHOO
    detectBot({
      mode: 'DRY_RUN',
      deny: ['CATEGORY:TOOL'],
    }),
  );

export const onRequest = defineMiddleware(async (context, next) => {
  // Arcjet can only protect dynamic (server-rendered) routes; skip prerendered pages.
  if (context.isPrerendered) {
    return next();
  }

  const decision = await aj.protect(context.request);

  if (decision.isDenied()) {
    return new Response('Forbidden', { status: 403 });
  }

  return next();
});
