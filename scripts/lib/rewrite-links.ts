import { mapOutsideCode } from './code-segments';

const IMAGE_EXT = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp)(?:[?#].*)?$/i;
const LEAVE_ALONE = /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i;

// `](target "judul")` dari link dan gambar Markdown.
const MD_TARGET = /\]\(\s*([^)\s]+)((?:\s+(?:"[^"]*"|'[^']*'))?)\s*\)/g;
const HTML_SRC = /(<(?:img|source)\b[^>]*?\bsrc=)(["'])(.*?)\2/gi;
const HTML_HREF = /(<a\b[^>]*?\bhref=)(["'])(.*?)\2/gi;

function repoRoot(base: string): string {
  const u = new URL(base);
  const keep = u.hostname === 'raw.githubusercontent.com' ? 3 : 4; // owner/repo[/blob]/ref
  const seg = u.pathname.split('/').filter(Boolean).slice(0, keep);
  return `${u.origin}/${seg.join('/')}/`;
}

function resolve(target: string, baseBlob: string, baseRaw: string): string {
  if (target === '' || LEAVE_ALONE.test(target)) return target;
  const base = IMAGE_EXT.test(target) ? baseRaw : baseBlob;
  try {
    return target.startsWith('/')
      ? new URL(target.slice(1), repoRoot(base)).toString()
      : new URL(target, base).toString();
  } catch {
    return target;
  }
}

/** Mengubah link dan gambar relatif menjadi URL absolut. Kode tidak disentuh. */
export function rewriteLinks(md: string, baseBlob: string, baseRaw: string): string {
  const fix = (t: string) => resolve(t, baseBlob, baseRaw);
  return mapOutsideCode(md, (text) =>
    text
      .replace(MD_TARGET, (_m, target: string, title: string) => `](${fix(target)}${title})`)
      .replace(HTML_SRC, (_m, head: string, q: string, v: string) => `${head}${q}${fix(v)}${q}`)
      .replace(HTML_HREF, (_m, head: string, q: string, v: string) => `${head}${q}${fix(v)}${q}`),
  );
}
