import { mapOutsideCode, markFenceLines } from './code-segments';

const LINKED_IMAGE = /\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g;
const BARE_BADGE = /!\[[^\]]*\]\([^)]*(?:shields\.io|badgen|badge)[^)]*\)/g;
const TOC_TITLE = /^(?:table of contents|contents|toc|daftar isi)$/i;
const LIST_ITEM = /^\s*(?:[-*+]|\d+[.)])\s/;
const CONTINUATION = /^\s{2,}\S/;

function isBadgeLine(line: string): boolean {
  if (line.trim() === '') return false;
  const rest = line.replace(LINKED_IMAGE, '').replace(BARE_BADGE, '');
  return rest !== line && rest.trim() === '';
}

/**
 * Membuang baris badge dan bagian daftar isi. Isi blok kode dibiarkan.
 * Daftar isi berakhir di baris pertama yang bukan item daftar, baris kosong, atau lanjutan item,
 * sehingga bagian setelahnya (Install, peringatan) tidak ikut terbuang apa pun tingkat judulnya.
 */
export function cleanReadme(md: string): string {
  const lines = md.split('\n');
  const fenced = markFenceLines(lines);
  const out: string[] = [];
  let skipping = false;

  lines.forEach((line, i) => {
    if (skipping) {
      if (line.trim() === '' || LIST_ITEM.test(line) || CONTINUATION.test(line)) return;
      skipping = false;
    }
    if (fenced[i]) {
      out.push(line);
      return;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading && TOC_TITLE.test(heading[2].replace(/[*_`]/g, '').trim())) {
      skipping = true;
      return;
    }
    if (!isBadgeLine(line)) out.push(line);
  });

  return mapOutsideCode(out.join('\n'), (t) => t.replace(/\n{3,}/g, '\n\n')).trim();
}
