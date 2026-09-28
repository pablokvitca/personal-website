import { defineMiddleware } from 'astro:middleware';
import arcjet, { shield, detectBot } from 'arcjet:client';

const aj = arcjet
  .withRule(
    shield({ mode: 'LIVE' }),
  )
  .withRule(
    detectBot({
      mode: 'DRY_RUN',
      deny: ['CATEGORY:TOOL'],
    }),
  );

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) {
    return next();
  }

  let decision;
  try {
    decision = await aj.protect(context.request);
  } catch {
    return next();
  }

  if (decision.isDenied()) {
    return new Response('Forbidden', { status: 403 });
  }

  return next();
});
