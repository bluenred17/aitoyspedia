import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { LEGACY_REDIRECTS } from './src/data/legacy-redirects.ts';

export default defineConfig({
  site: 'https://ai.toyspedia.fun',
  output: 'static',
  redirects: LEGACY_REDIRECTS,
  vite: { plugins: [tailwindcss()] },
});
