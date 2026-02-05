#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const PROJECT_DIR = './src/content/projects';

async function getLatestSnapshot(projectDir) {
  const files = await fs.readdir(projectDir);
  const snapshots = files
    .filter((f) => f.endsWith('.snapshot.mdx'))
    .sort()
    .reverse();

  return snapshots[0] || null;
}

async function createSnapshot(shortname) {
  const projectDir = path.join(PROJECT_DIR, shortname);

  // Check if project directory exists
  try {
    await fs.access(projectDir);
  } catch {
    console.error(`Error: Project directory not found for "${shortname}"`);
    console.error(`Expected path: ${projectDir}`);
    process.exit(1);
  }

  // Find latest snapshot
  const latestSnapshot = await getLatestSnapshot(projectDir);
  if (!latestSnapshot) {
    console.error(`Error: No snapshots found for "${shortname}"`);
    console.error('Create an initial snapshot manually first.');
    process.exit(1);
  }

  const latestPath = path.join(projectDir, latestSnapshot);

  // Generate timestamp in format YYYY-MM-DD-HH-mm (without seconds)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const timestamp = `${year}-${month}-${day}-${hour}-${minute}`;

  const snapshotName = `${timestamp}.snapshot.mdx`;
  const snapshotPath = path.join(projectDir, snapshotName);

  // Read latest snapshot content
  const content = await fs.readFile(latestPath, 'utf-8');

  // Update snapshotDate in frontmatter
  const snapshotDateLine = `snapshotDate: ${now.toISOString()}`;

  // Replace existing snapshotDate or add it
  let updatedContent;
  if (content.includes('snapshotDate:')) {
    updatedContent = content.replace(/snapshotDate:.*/, snapshotDateLine);
  } else {
    updatedContent = content.replace(/^---\n/, `---\n${snapshotDateLine}\n`);
  }

  // Write new snapshot
  await fs.writeFile(snapshotPath, updatedContent);

  console.log(`✓ Created new snapshot from: ${latestSnapshot}`);
  console.log(`✓ New snapshot: ${snapshotName}`);
  console.log(`\nYou can now edit: ${snapshotPath}`);
}

// CLI handling
const shortname = process.argv[2];
if (!shortname) {
  console.error('Usage: pnpm snapshot:project <shortname>');
  console.error('Example: pnpm snapshot:project personal-website');
  process.exit(1);
}

createSnapshot(shortname);
