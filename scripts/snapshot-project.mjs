#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const PROJECT_DIR = './src/content/projects';

function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}-${hour}-${minute}`;
}

async function createSnapshot(shortname) {
  const projectDir = path.join(PROJECT_DIR, shortname);
  const livePath = path.join(projectDir, 'live.mdx');

  // Check if live.mdx exists
  try {
    await fs.access(livePath);
  } catch {
    console.error(`Error: live.mdx not found for "${shortname}"`);
    console.error(`Expected path: ${livePath}`);
    process.exit(1);
  }

  const now = new Date();
  const timestamp = formatTimestamp(now);

  const snapshotName = `${timestamp}.snapshot.mdx`;
  const snapshotPath = path.join(projectDir, snapshotName);

  // Read live.mdx content
  const content = await fs.readFile(livePath, 'utf-8');

  // Add snapshotDate to frontmatter
  const snapshotDateLine = `snapshotDate: ${now.toISOString()}`;

  // Replace existing snapshotDate or add it after the opening ---
  let updatedContent;
  if (content.includes('snapshotDate:')) {
    updatedContent = content.replace(/snapshotDate:.*/, snapshotDateLine);
  } else {
    updatedContent = content.replace(/^---\n/, `---\n${snapshotDateLine}\n`);
  }

  // Write new snapshot
  await fs.writeFile(snapshotPath, updatedContent);

  const tagName = `project-snapshot:${shortname}:${timestamp}`;

  console.log(`Created snapshot from: live.mdx`);
  console.log(`New snapshot: ${snapshotName}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Stage the snapshot: git add ${snapshotPath}`);
  console.log(`  2. Commit your changes`);
  console.log(`  3. Tag the commit: git tag "${tagName}"`);
}

// CLI handling
const shortname = process.argv[2];
if (!shortname) {
  console.error('Usage: pnpm snapshot:project <shortname>');
  console.error('Example: pnpm snapshot:project personal-website');
  process.exit(1);
}

createSnapshot(shortname);
