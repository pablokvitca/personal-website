#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = './src/content/blog';

async function createSnapshot(shortname) {
  const postDir = path.join(BLOG_DIR, shortname);
  const livePath = path.join(postDir, 'live.mdx');

  // Check if live.mdx exists
  try {
    await fs.access(livePath);
  } catch {
    console.error(`Error: live.mdx not found for "${shortname}"`);
    console.error(`Expected path: ${livePath}`);
    process.exit(1);
  }

  // Generate timestamp in format YYYY-MM-DD-HH-mm-SS
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '-')
    .slice(0, 19);

  const snapshotName = `${timestamp}.snapshot.mdx`;
  const snapshotPath = path.join(postDir, snapshotName);

  // Read live content
  const content = await fs.readFile(livePath, 'utf-8');

  // Add snapshot metadata to frontmatter
  const snapshotDateLine = `snapshotDate: ${now.toISOString()}`;
  const updatedContent = content.replace(/^---\n/, `---\n${snapshotDateLine}\n`);

  // Write snapshot
  await fs.writeFile(snapshotPath, updatedContent);

  console.log(`Created snapshot: ${snapshotPath}`);
}

// CLI handling
const shortname = process.argv[2];
if (!shortname) {
  console.error('Usage: pnpm snapshot:blog <shortname>');
  console.error('Example: pnpm snapshot:blog hello-world');
  process.exit(1);
}

createSnapshot(shortname);
