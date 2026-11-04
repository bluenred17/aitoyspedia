import { mapOutsideCode } from './code-segments';

const LINKED_IMAGE = /\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g;
const BARE_BADGE = /!\[[^\]]*\]\([^)]*(?:shields\.io|badgen|badge)[^)]*\)/g;
const TOC_TITLE = /^(?:table of contents|contents|toc|daftar isi)$/i;

function isBadgeLine(line: string): boolean {
  if (line.trim() === '') return false;
  const rest = line.replace(LINKED_IMAGE, '').replace(BARE_BADGE, '');
  return rest !== line && rest.trim() === '';
}

/** Membuang baris badge dan bagian daftar isi. Isi blok kode dibiarkan. */
export function cleanReadme(md: string): string {
  const out: string[] = [];
  let inFence = false;
  let skipLevel: number | null = null;

  for (const line of md.split('\n')) {
    if (/^\s*(?:```|~~~)/.test(line)) {
      inFence = !inFence;
      if (skipLevel === null) out.push(line);
      continue;
    }
    if (inFence) {
      if (skipLevel === null) out.push(line);
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (skipLevel !== null && level <= skipLevel) skipLevel = null;
      if (skipLevel === null && TOC_TITLE.test(heading[2].replace(/[*_`]/g, '').trim())) {
        skipLevel = level;
        continue;
      }
    }
    if (skipLevel !== null || isBadgeLine(line)) continue;
    out.push(line);
  }

  return mapOutsideCode(out.join('\n'), (t) => t.replace(/\n{3,}/g, '\n\n')).trim();
}
