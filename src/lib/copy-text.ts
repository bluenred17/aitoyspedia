const COPY_FIELD: Record<string, string> = {
  prompts: 'prompt',
  tools: 'setup',
};

/** Teks yang disalin tombol salin untuk sebuah entri, atau null jika tidak ada. */
export function getCopyText(type: string, data: Record<string, unknown>): string | null {
  const value = data[COPY_FIELD[type] ?? 'install'];
  return typeof value === 'string' ? value.replace(/\n+$/, '') : null;
}

// Perintah yang mengunduh sesuatu lalu langsung menjalankannya: `... | bash`, `... | sudo sh`, `... | iex`.
const PIPE_TO_SHELL = /\|\s*(?:sudo\s+(?:-\S+\s+)*)?(?:(?:ba|z|da|k)?sh|iex|invoke-expression)\b/i;

/** True bila perintah menjalankan skrip hasil unduhan tanpa kesempatan membacanya dulu. */
export function needsShellWarning(text: string | null): boolean {
  return text !== null && PIPE_TO_SHELL.test(text);
}
