import { markFenceLines } from './code-segments';

export interface HtmlHit {
  line: number;
  pattern: string;
}

// URL berbahaya hanya dicari di konteks link (`](...)`, href, src, action) agar kata "JavaScript:" di prosa aman.
const LINK_CTX = String.raw`(?:\]\(|\b(?:href|src|action)\s*=\s*["']?)\s*`;

const RULES: { name: string; re: RegExp }[] = [
  { name: 'script', re: /<\s*script\b/i },
  { name: 'iframe', re: /<\s*iframe\b/i },
  { name: 'object', re: /<\s*object\b/i },
  { name: 'embed', re: /<\s*embed\b/i },
  { name: 'form', re: /<\s*form\b/i },
  { name: 'event handler', re: /<[a-z][^>]*\son[a-z]+\s*=/i },
  { name: 'javascript: link', re: new RegExp(`${LINK_CTX}javascript\s*:`, 'i') },
  { name: 'data: link', re: new RegExp(`${LINK_CTX}data\s*:`, 'i') },
];

/** Mencari HTML dan URL yang bisa menjalankan skrip di luar kode. Isi README adalah data yang tidak tepercaya. */
export function scanUnsafeHtml(md: string): HtmlHit[] {
  const lines = md.split('\n');
  const fenced = markFenceLines(lines);
  const hits: HtmlHit[] = [];
  lines.forEach((raw, i) => {
    if (fenced[i]) return;
    const line = raw.replace(/`[^`\n]*`/g, '');
    for (const { name, re } of RULES) {
      if (re.test(line)) {
        hits.push({ line: i + 1, pattern: name });
        break;
      }
    }
  });
  return hits;
}
