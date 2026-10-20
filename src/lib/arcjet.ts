import arcjet, { shield, detectBot } from 'arcjet:client';

// Imported lazily by src/middleware.ts so the Arcjet WebAssembly analyzer is only loaded
// for routes that are actually protected.
export const aj = arcjet
  .withRule(
    shield({ mode: 'LIVE' }),
  )
  .withRule(
    detectBot({
      mode: 'DRY_RUN',
      deny: ['CATEGORY:TOOL'],
    }),
  );
