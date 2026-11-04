const FRONTMATTER = /^(---\r?\n)([\s\S]*?)(\r?\n---)/;

/**
 * Mengganti satu field angka di frontmatter tanpa menyerialisasi ulang YAML,
 * supaya sisa file tetap identik byte demi byte.
 */
export function setFrontmatterField(raw: string, key: string, value: number): string {
  const m = FRONTMATTER.exec(raw);
  if (!m) throw new Error('Frontmatter tidak ditemukan');
  if (!/^[A-Za-z_][\w-]*$/.test(key)) throw new Error(`Nama field tidak valid: ${key}`);
  const eol = m[1].endsWith('\r\n') ? '\r\n' : '\n';
  const line = new RegExp(`^${key}:.*$`, 'm');
  const block = line.test(m[2])
    ? m[2].replace(line, () => `${key}: ${value}`)
    : `${m[2]}${eol}${key}: ${value}`;
  return raw.slice(0, m.index) + m[1] + block + m[3] + raw.slice(m.index + m[0].length);
}
