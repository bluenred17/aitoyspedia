const OPEN = /^ {0,3}(`{3,}|~{3,})/;

/**
 * Untuk tiap baris: true bila baris itu berada di dalam blok kode berpagar, termasuk baris pagarnya.
 * Mengikuti aturan Markdown: pagar harus di awal baris (maksimal 3 spasi), dan hanya ditutup oleh pagar
 * dengan karakter yang sama dan minimal sepanjang pembuka. Pagar yang tidak ditutup berlaku sampai akhir.
 */
export function markFenceLines(lines: string[]): boolean[] {
  const flags: boolean[] = [];
  let fence: { char: string; len: number } | null = null;
  for (const line of lines) {
    const text = line.replace(/\r$/, '');
    if (!fence) {
      const open = OPEN.exec(text);
      if (open) {
        fence = { char: open[1][0], len: open[1].length };
        flags.push(true);
      } else {
        flags.push(false);
      }
      continue;
    }
    flags.push(true);
    const close = new RegExp(`^ {0,3}${fence.char}{${fence.len},}[ \t]*$`);
    if (close.test(text)) fence = null;
  }
  return flags;
}

const applyOutsideInline = (text: string, fn: (t: string) => string) =>
  text
    .split(/(`[^`\n]*`)/)
    .map((part, i) => (i % 2 === 1 ? part : fn(part)))
    .join('');

/** Menerapkan `fn` hanya pada teks di luar kode (blok berpagar dan kode sebaris). Kode tidak berubah. */
export function mapOutsideCode(md: string, fn: (text: string) => string): string {
  const lines = md.split('\n');
  const fenced = markFenceLines(lines);
  const pieces: string[] = [];
  let run: string[] = [];
  const flush = () => {
    if (run.length > 0) pieces.push(applyOutsideInline(run.join('\n'), fn));
    run = [];
  };
  lines.forEach((line, i) => {
    if (fenced[i]) {
      flush();
      pieces.push(line);
    } else {
      run.push(line);
    }
  });
  flush();
  return pieces.join('\n');
}
