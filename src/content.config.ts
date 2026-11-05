import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './data/categories';
import { httpsUrl } from './lib/https-url';

const surfaces = z.enum(['claude-ai', 'claude-code', 'desktop', 'api']);

const common = {
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.enum(CATEGORY_SLUGS),
  tags: z.array(z.string()).default([]),
  surfaces: z.array(surfaces).min(1),
  repo: z.string().regex(/^[^/\s]+\/[^/\s]+$/).optional(),
  stars: z.number().int().nonnegative().optional(),
  added: z.coerce.date(),
  last_verified: z.coerce.date(),
  status: z.enum(['aktif', 'usang']),
  related: z.array(z.string()).default([]),
};

// Entri dari repo wajib punya sumber dan lisensi. Prompt boleh berasal dari catatan sendiri.
const sourced = {
  source_url: httpsUrl,
  license: z.string().nullable(),
};

const collection = (dir: string, shape: z.ZodRawShape) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: z.object(shape).strict(),
  });

export const collections = {
  prompts: collection('prompts', {
    ...common,
    source_url: httpsUrl.optional(),
    license: z.string().nullable().optional(),
    prompt: z.string().min(1),
    variables: z.array(z.string()).default([]),
  }),
  tools: collection('tools', { ...common, ...sourced, setup: z.string().min(1) }),
  skills: collection('skills', {
    ...common,
    ...sourced,
    install: z.string().min(1),
    trigger: z.string().min(1),
  }),
  plugins: collection('plugins', {
    ...common,
    ...sourced,
    install: z.string().min(1),
    includes: z.array(z.string()).default([]),
  }),
  connectors: collection('connectors', {
    ...common,
    ...sourced,
    install: z.string().min(1),
    provider: z.string().min(1),
    auth: z.enum(['oauth', 'api-key', 'none', 'lainnya']),
  }),
};
