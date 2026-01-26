/**
 * Technology metadata mapping
 * Maps technology tag values to their homepage URLs and icon identifiers
 */

export interface TechnologyInfo {
  name: string;
  url: string;
  icon: string; // Simple Icons identifier (slug)
  iconComponent: string; // PascalCase component name for simple-icons-astro
  color: string; // Recommended brand color from Simple Icons (hex format)
}

/**
 * Technology metadata lookup
 * Uses simple-icons-astro package for icons
 */
const technologyMap: Record<string, TechnologyInfo> = {
  astro: {
    name: 'Astro',
    url: 'https://astro.build',
    icon: 'astro',
    iconComponent: 'Astro',
    color: '#FF5D01',
  },
  react: {
    name: 'React',
    url: 'https://react.dev',
    icon: 'react',
    iconComponent: 'React',
    color: '#61DAFB',
  },
  typescript: {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    icon: 'typescript',
    iconComponent: 'Typescript',
    color: '#3178C6',
  },
  tailwind: {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    icon: 'tailwindcss',
    iconComponent: 'Tailwindcss',
    color: '#06B6D4',
  },
  'tailwind-css': {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    icon: 'tailwindcss',
    iconComponent: 'Tailwindcss',
    color: '#06B6D4',
  },
  javascript: {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: 'javascript',
    iconComponent: 'Javascript',
    color: '#F7DF1E',
  },
  nodejs: {
    name: 'Node.js',
    url: 'https://nodejs.org',
    icon: 'nodedotjs',
    iconComponent: 'Nodedotjs',
    color: '#339933',
  },
  python: {
    name: 'Python',
    url: 'https://www.python.org',
    icon: 'python',
    iconComponent: 'Python',
    color: '#3776AB',
  },
  rust: {
    name: 'Rust',
    url: 'https://www.rust-lang.org',
    icon: 'rust',
    iconComponent: 'Rust',
    color: '#000000',
  },
  go: {
    name: 'Go',
    url: 'https://go.dev',
    icon: 'go',
    iconComponent: 'Go',
    color: '#00ADD8',
  },
  docker: {
    name: 'Docker',
    url: 'https://www.docker.com',
    icon: 'docker',
    iconComponent: 'Docker',
    color: '#2496ED',
  },
  kubernetes: {
    name: 'Kubernetes',
    url: 'https://kubernetes.io',
    icon: 'kubernetes',
    iconComponent: 'Kubernetes',
    color: '#326CE5',
  },
  postgresql: {
    name: 'PostgreSQL',
    url: 'https://www.postgresql.org',
    icon: 'postgresql',
    iconComponent: 'Postgresql',
    color: '#4169E1',
  },
  mongodb: {
    name: 'MongoDB',
    url: 'https://www.mongodb.com',
    icon: 'mongodb',
    iconComponent: 'Mongodb',
    color: '#47A248',
  },
  redis: {
    name: 'Redis',
    url: 'https://redis.io',
    icon: 'redis',
    iconComponent: 'Redis',
    color: '#DC382D',
  },
  aws: {
    name: 'AWS',
    url: 'https://aws.amazon.com',
    icon: 'amazonaws',
    iconComponent: 'Amazonaws',
    color: '#232F3E',
  },
  gcp: {
    name: 'Google Cloud',
    url: 'https://cloud.google.com',
    icon: 'googlecloud',
    iconComponent: 'Googlecloud',
    color: '#4285F4',
  },
  azure: {
    name: 'Azure',
    url: 'https://azure.microsoft.com',
    icon: 'microsoftazure',
    iconComponent: 'Microsoftazure',
    color: '#0078D4',
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'github',
    iconComponent: 'Github',
    color: '#181717',
  },
  gitlab: {
    name: 'GitLab',
    url: 'https://gitlab.com',
    icon: 'gitlab',
    iconComponent: 'Gitlab',
    color: '#FC6D26',
  },
  nextjs: {
    name: 'Next.js',
    url: 'https://nextjs.org',
    icon: 'nextdotjs',
    iconComponent: 'Nextdotjs',
    color: '#000000',
  },
  vue: {
    name: 'Vue.js',
    url: 'https://vuejs.org',
    icon: 'vuedotjs',
    iconComponent: 'Vuedotjs',
    color: '#4FC08D',
  },
  svelte: {
    name: 'Svelte',
    url: 'https://svelte.dev',
    icon: 'svelte',
    iconComponent: 'Svelte',
    color: '#FF3E00',
  },
  graphql: {
    name: 'GraphQL',
    url: 'https://graphql.org',
    icon: 'graphql',
    iconComponent: 'Graphql',
    color: '#E10098',
  },
  prisma: {
    name: 'Prisma',
    url: 'https://www.prisma.io',
    icon: 'prisma',
    iconComponent: 'Prisma',
    color: '#2D3748',
  },
  vercel: {
    name: 'Vercel',
    url: 'https://vercel.com',
    icon: 'vercel',
    iconComponent: 'Vercel',
    color: '#000000',
  },
  cloudflare: {
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com',
    icon: 'cloudflare',
    iconComponent: 'Cloudflare',
    color: '#F38020',
  },
};

/**
 * Get technology information for a given technology tag value
 */
export function getTechnologyInfo(value: string): TechnologyInfo | null {
  return technologyMap[value.toLowerCase()] || null;
}

