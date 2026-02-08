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

async function createNewProject(shortname) {
  const projectDir = path.join(PROJECT_DIR, shortname);

  // Check if directory already exists
  try {
    await fs.access(projectDir);
    console.error(`Error: Project directory already exists for "${shortname}"`);
    console.error(`Path: ${projectDir}`);
    process.exit(1);
  } catch {
    // Expected - directory should not exist
  }

  const now = new Date();
  const timestamp = formatTimestamp(now);
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Template for live.mdx (no snapshotDate)
  const liveContent = `---
title: "${shortname}"
description: ""
tags: []
status: active
startDate: ${dateStr}
draft: true
---

## Overview

Write your project description here.
`;

  // Template for initial snapshot (with snapshotDate)
  const snapshotContent = `---
snapshotDate: ${now.toISOString()}
title: "${shortname}"
description: ""
tags: []
status: active
startDate: ${dateStr}
draft: true
---

## Overview

Write your project description here.
`;

  // Create directory and files
  await fs.mkdir(projectDir, { recursive: true });

  const livePath = path.join(projectDir, 'live.mdx');
  const snapshotPath = path.join(projectDir, `${timestamp}.snapshot.mdx`);

  await fs.writeFile(livePath, liveContent);
  await fs.writeFile(snapshotPath, snapshotContent);

  console.log(`Created new project: ${shortname}`);
  console.log(`  ${livePath}`);
  console.log(`  ${snapshotPath}`);
  console.log(`\nEdit ${livePath} to write your project page.`);
  console.log(`Remember to update the title, description, and tags before publishing.`);
}

// CLI handling
const shortname = process.argv[2];
if (!shortname) {
  console.error('Usage: pnpm new:project <shortname>');
  console.error('Example: pnpm new:project my-awesome-project');
  process.exit(1);
}

createNewProject(shortname);
