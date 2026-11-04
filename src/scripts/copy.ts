const RESET_MS = 2000;

async function copy(button: HTMLButtonElement): Promise<void> {
  const original = button.dataset.label ?? button.textContent ?? '';
  try {
    await navigator.clipboard.writeText(button.dataset.copyText ?? '');
    button.textContent = 'Tersalin';
  } catch {
    // Clipboard ditolak atau tidak tersedia: teks tetap bisa dipilih dan disalin manual.
    button.textContent = 'Gagal menyalin';
  }
  window.setTimeout(() => {
    button.textContent = original;
  }, RESET_MS);
}

// Tombol salin untuk setiap blok kode di isi entri.
document.querySelectorAll<HTMLElement>('article.prose pre').forEach((pre) => {
  const text = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
  if (!text.trim()) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Salin';
  button.dataset.label = 'Salin';
  button.dataset.copyText = text.replace(/\n+$/, '');
  button.className =
    'absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow hover:bg-white';
  pre.classList.add('relative');
  pre.append(button);
});

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-copy-text]');
  if (button) void copy(button);
});
