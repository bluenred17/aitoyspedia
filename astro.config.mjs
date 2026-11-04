import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ai.toyspedia.fun',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
