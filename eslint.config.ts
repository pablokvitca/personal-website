import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['dist/', '.astro/', '.wrangler/', 'node_modules/']),

  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs['flat/recommended'],
  astro.configs['flat/jsx-a11y-recommended'],

  {
    files: ['src/**/*.{ts,tsx,astro}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.tsx'],
    ...jsxA11y.configs.recommended,
  },
  {
    files: ['**/*.tsx'],
    ...reactHooks.configs.flat.recommended,
  },

  {
    // Vendored Starwind components, managed by the Starwind CLI (starwind.config.json);
    // edits here would be overwritten or conflict on the next `starwind update`.
    files: ['src/components/ui/starwind/**'],
    rules: {
      // Starwind exports each component's variants from its .astro file by design.
      'astro/no-exports-from-components': 'off',
      // Upstream typings use `any` in a few spots.
      '@typescript-eslint/no-explicit-any': 'off',
      // Upstream declares Props interfaces that aren't always referenced.
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // Ambient declarations must stay a script (an `import` would make it a module and
    // drop the global ImportMetaEnv/Window augmentations); this is Astro's documented pattern.
    files: ['src/env.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
);
