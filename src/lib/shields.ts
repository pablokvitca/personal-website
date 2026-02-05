/**
 * Shields.io badge URL helpers for project links.
 *
 * All badges are rendered as static <img> SVGs — no client-side JS required.
 * See https://shields.io for the full badge catalogue.
 */

const SHIELDS_BASE = 'https://img.shields.io';

interface GitHubRepo {
  owner: string;
  repo: string;
}

/**
 * Parse a GitHub URL into owner and repo.
 * Accepts: https://github.com/owner/repo or https://github.com/owner/repo.git
 * Returns null for anything that doesn't match.
 */
export function parseGitHubUrl(url: string): GitHubRepo | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== 'github.com') return null;

    const parts = pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ''),
    };
  } catch {
    return null;
  }
}

interface GitHubBadgeUrls {
  stars: string;
  forks: string;
  license: string;
}

/**
 * Build shields.io badge URLs for a GitHub repo.
 * Each badge links back to the corresponding GitHub tab.
 */
export function getGitHubBadges(githubUrl: string): GitHubBadgeUrls | null {
  const repo = parseGitHubUrl(githubUrl);
  if (!repo) return null;

  const path = `${repo.owner}/${repo.repo}`;

  return {
    stars: `${SHIELDS_BASE}/github/stars/${path}?style=flat-square&logo=github&labelColor=#24292e&color=#0075ca`,
    forks: `${SHIELDS_BASE}/github/forks/${path}?style=flat-square&logo=github&labelColor=#24292e&color=#0075ca`,
    license: `${SHIELDS_BASE}/github/license/${path}?style=flat-square&labelColor=#24292e&color=#0075ca`,
  };
}

/**
 * Build a shields.io "website status" badge for a demo URL.
 * Uses the /website endpoint which pings the URL and reports up/down.
 */
export function getDemoStatusBadge(demoUrl: string): string {
  const encoded = encodeURIComponent(demoUrl);
  return `${SHIELDS_BASE}/website?url=${encoded}&style=flat-square&label=demo&upColor=%2300c853&downColor=%23d32f2f`;
}
