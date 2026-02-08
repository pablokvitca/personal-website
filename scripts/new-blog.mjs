#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = './src/content/blog';

function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}-${hour}-${minute}`;
}

async function createNewPost(shortname) {
  const postDir = path.join(BLOG_DIR, shortname);

  // Check if directory already exists
  try {
    await fs.access(postDir);
    console.error(`Error: Post directory already exists for "${shortname}"`);
    console.error(`Path: ${postDir}`);
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
abstract: ""
publishedAt: ${dateStr}
tags:
  - language:english
draft: true
featured: false
---

## Overview

Write your post content here.
`;

  // Template for initial snapshot (with snapshotDate)
  const snapshotContent = `---
snapshotDate: ${now.toISOString()}
title: "${shortname}"
abstract: ""
publishedAt: ${dateStr}
tags:
  - language:english
draft: true
featured: false
---

## Overview

Write your post content here.
`;

  // Create directory and files
  await fs.mkdir(postDir, { recursive: true });

  const livePath = path.join(postDir, 'live.mdx');
  const snapshotPath = path.join(postDir, `${timestamp}.snapshot.mdx`);

  await fs.writeFile(livePath, liveContent);
  await fs.writeFile(snapshotPath, snapshotContent);

  console.log(`Created new blog post: ${shortname}`);
  console.log(`  ${livePath}`);
  console.log(`  ${snapshotPath}`);
  console.log(`\nEdit ${livePath} to write your post.`);
  console.log(`Remember to update the title, abstract, and tags before publishing.`);
}

// CLI handling
const shortname = process.argv[2];
if (!shortname) {
  console.error('Usage: pnpm new:blog <shortname>');
  console.error('Example: pnpm new:blog hello-world');
  process.exit(1);
}

createNewPost(shortname);
