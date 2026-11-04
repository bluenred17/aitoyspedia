interface PagefindData {
  url: string;
  meta: { title?: string; type?: string; summary?: string };
}
interface Pagefind {
  search(term: string): Promise<{ results: { data(): Promise<PagefindData> }[] }>;
}

const MAX_RESULTS = 8;
const DEBOUNCE_MS = 200;
const PAGEFIND_PATH = '/pagefind/pagefind.js';

const input = document.querySelector<HTMLInputElement>('#search-input');
const panel = document.querySelector<HTMLElement>('#search-results');

let pagefind: Promise<Pagefind> | null = null;
let latest = 0;
let timer: number | undefined;

function loadPagefind(): Promise<Pagefind> {
  // Indeks dibuat setelah `astro build`, jadi path ini sengaja tidak di-resolve oleh bundler.
  pagefind ??= import(/* @vite-ignore */ PAGEFIND_PATH).catch((err: unknown) => {
    pagefind = null; // izinkan percobaan ulang pada ketikan berikutnya
    throw err;
  });
  return pagefind;
}

function showMessage(text: string): void {
  if (!panel) return;
  const p = document.createElement('p');
  p.className = 'px-4 py-3 text-sm text-gray-600';
  p.textContent = text;
  panel.replaceChildren(p);
  panel.hidden = false;
}

function resultItem(item: PagefindData): HTMLElement {
  const row = document.createElement('div');
  row.dataset.resultUrl = item.url;
  row.className = 'px-4 py-3';

  const link = document.createElement('a');
  link.href = item.url;
  link.className = 'font-semibold text-indigo-600 hover:underline';
  link.textContent = item.meta.title ?? item.url;
  row.append(link);

  if (item.meta.type) {
    const badge = document.createElement('span');
    badge.className = 'ml-2 rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600';
    badge.textContent = item.meta.type;
    row.append(badge);
  }
  if (item.meta.summary) {
    const summary = document.createElement('p');
    summary.className = 'mt-0.5 text-sm text-gray-600';
    summary.textContent = item.meta.summary;
    row.append(summary);
  }
  return row;
}

async function run(term: string): Promise<void> {
  const id = ++latest;
  if (!panel) return;
  if (!term.trim()) {
    panel.hidden = true;
    panel.replaceChildren();
    return;
  }
  try {
    const search = await (await loadPagefind()).search(term);
    const items = await Promise.all(search.results.slice(0, MAX_RESULTS).map((r) => r.data()));
    if (id !== latest) return; // ada ketikan yang lebih baru
    if (items.length === 0) return showMessage('Tidak ada hasil.');
    panel.replaceChildren(...items.map(resultItem));
    panel.hidden = false;
  } catch {
    if (id === latest) showMessage('Pencarian tidak tersedia.');
  }
}

input?.addEventListener('input', () => {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => void run(input.value), DEBOUNCE_MS);
});
