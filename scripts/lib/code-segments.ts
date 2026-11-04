// Pola kode: blok berpagar (``` atau ~~~, termasuk yang tidak ditutup) dan kode sebaris.
const CODE = /(```[\s\S]*?(?:```|$)|~~~[\s\S]*?(?:~~~|$)|`[^`\n]*`)/g;

/** Menerapkan `fn` hanya pada teks di luar kode. Bagian kode tidak berubah. */
export function mapOutsideCode(md: string, fn: (text: string) => string): string {
  return md
    .split(CODE)
    .map((part, i) => (i % 2 === 1 ? part : fn(part)))
    .join('');
}
