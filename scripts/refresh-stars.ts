import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { refreshAll } from './lib/refresh-all';

const ROOT = join(process.cwd(), 'src', 'content');

async function getStars(repo: string): Promise<number> {
  const headers: Record<string, string> = { 'User-Agent': 'ai-encyclopedia-refresh-stars' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} untuk ${repo}`);
  return ((await res.json()) as { stargazers_count: number }).stargazers_count;
}

const files = (readdirSync(ROOT, { recursive: true }) as string[])
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ path: join(ROOT, f), raw: readFileSync(join(ROOT, f), 'utf8') }));

const { updated, failed } = await refreshAll(files, getStars);
for (const f of updated) writeFileSync(f.path, f.raw);
console.log(`Bintang diperbarui di ${updated.length} entri.`);
for (const f of failed) console.error(`Gagal: ${f.path} (${f.error}). Nilai lama dipertahankan.`);
if (failed.length > 0) process.exit(1);
