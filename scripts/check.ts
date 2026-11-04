import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import matter from 'gray-matter';
import { scanText } from './lib/scan-secrets';
import { findBrokenRelated } from './lib/validate-related';

const ROOT = join(process.cwd(), 'src', 'content');
const files = (readdirSync(ROOT, { recursive: true }) as string[])
  .filter((f) => f.endsWith('.md'))
  .sort();

let problems = 0;
const entries: { id: string; related: string[] }[] = [];

for (const f of files) {
  const raw = readFileSync(join(ROOT, f), 'utf8');
  const rel = relative(process.cwd(), join(ROOT, f)).split(sep).join('/');
  for (const hit of scanText(raw)) {
    console.error(`${rel}:${hit.line} pola mirip kunci rahasia (${hit.pattern})`);
    problems++;
  }
  const id = f.split(sep).join('/').replace(/\.md$/, '');
  const related = matter(raw).data.related;
  entries.push({ id, related: Array.isArray(related) ? related : [] });
}

for (const b of findBrokenRelated(entries)) {
  console.error(`${b.id} -> ${b.target} (entri terkait tidak ada)`);
  problems++;
}

if (problems > 0) {
  console.error(`\n${problems} masalah ditemukan.`);
  process.exit(1);
}
console.log(`Pemeriksaan lulus untuk ${files.length} entri.`);
