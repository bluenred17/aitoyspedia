/** 112504 menjadi "112.5K". Dipotong ke bawah, bukan dibulatkan. */
export function formatStars(n: number): string {
  const trim = (v: number) => String(v).replace(/\.0$/, '');
  if (n >= 1_000_000) return `${trim(Math.floor(n / 100_000) / 10)}M`;
  if (n >= 1000) return `${trim(Math.floor(n / 100) / 10)}K`;
  return String(n);
}
