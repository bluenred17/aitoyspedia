const COPY_FIELD: Record<string, string> = {
  prompts: 'prompt',
  tools: 'setup',
};

/** Teks yang disalin tombol salin untuk sebuah entri, atau null jika tidak ada. */
export function getCopyText(type: string, data: Record<string, unknown>): string | null {
  const value = data[COPY_FIELD[type] ?? 'install'];
  return typeof value === 'string' ? value.replace(/\n+$/, '') : null;
}
