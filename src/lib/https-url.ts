import { z } from 'astro/zod';

/** URL yang hanya boleh berskema https. `z.string().url()` saja menerima `javascript:` dan `data:`. */
export const httpsUrl = z
  .string()
  .url()
  .refine((u) => u.startsWith('https://'), { message: 'URL harus diawali https://' });
