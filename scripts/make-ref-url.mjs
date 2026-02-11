#!/usr/bin/env node

/**
 * Generate a ref-tagged URL for sharing / attribution tracking.
 *
 * Usage:
 *   pnpm ref:url <RefName> [base-url]
 *
 * Examples:
 *   pnpm ref:url BluedotSlackIntro
 *   → https://pablokvitca.com/?ref=BluedotSlackIntro
 *
 *   pnpm ref:url BluedotSlackIntro https://pablokvitca.com/blog/my-post
 *   → https://pablokvitca.com/blog/my-post?ref=BluedotSlackIntro
 *
 *   pnpm ref:url NewsletterApr2025 https://pablokvitca.com/projects/my-project
 *   → https://pablokvitca.com/projects/my-project?ref=NewsletterApr2025
 */

const DEFAULT_BASE = 'https://pablokvitca.com';

const refName = process.argv[2];
const rawBase = process.argv[3];

if (!refName) {
  console.error('Error: ref name is required.');
  console.error('');
  console.error('Usage:   pnpm ref:url <RefName> [base-url]');
  console.error('Example: pnpm ref:url BluedotSlackIntro');
  console.error('Example: pnpm ref:url BluedotSlackIntro https://pablokvitca.com/blog/my-post');
  process.exit(1);
}

// Validate ref name: only alphanumerics, hyphens, and underscores
if (!/^[A-Za-z0-9_-]+$/.test(refName)) {
  console.error(`Error: ref name "${refName}" is invalid.`);
  console.error('Allowed characters: letters, numbers, hyphens, underscores.');
  process.exit(1);
}

const baseUrl = rawBase ?? DEFAULT_BASE;

// Validate the base URL
let parsed;
try {
  parsed = new URL(baseUrl);
} catch {
  console.error(`Error: "${baseUrl}" is not a valid URL.`);
  process.exit(1);
}

parsed.searchParams.set('ref', refName);

console.log(parsed.toString());
