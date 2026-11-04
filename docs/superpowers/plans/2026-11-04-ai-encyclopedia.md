# AI Encyclopedia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menggantikan aplikasi Express di `ai.toyspedia.fun` dengan situs statis Astro yang isinya berasal dari README terjemahan dan dikelola lewat skill `add-entry`.

**Architecture:** Entri adalah file Markdown di `src/content/<jenis>/`, divalidasi skema Astro. Build menghasilkan HTML statis dan indeks Pagefind. GitHub Actions menguji, membangun, lalu mengirim hasilnya ke server nginx yang ada lewat rsync dan symlink rilis.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4 (`@tailwindcss/vite`, `@tailwindcss/typography`), Pagefind 1, Vitest 5, Playwright 1, tsx, gray-matter. Node 24 di CI.

**Spec:** `docs/superpowers/specs/2026-11-04-ai-encyclopedia-design.md`

## Global Constraints

- Tampilan dan teks antarmuka berbahasa Indonesia. Kode, perintah, dan istilah teknis tetap asli.
- Tidak ada server aplikasi, database, akun, rating, favorit, komentar, jumlah tayangan, panel admin, atau multibahasa.
- Tiap halaman memuat `<meta name="robots" content="noindex">`. `robots.txt` tidak memblokir perayapan.
- Tampilan: font Inter, warna indigo, hero bergradasi indigo ke ungu, kartu putih bersudut membulat. Acuan warna: `#4f46e5` ke `#7e22ce`.
- Nilai `surfaces`: `claude-ai`, `claude-code`, `desktop`, `api`. Nilai `status`: `aktif`, `usang`. Nilai `auth`: `oauth`, `api-key`, `none`, `lainnya`.
- `install` dan `setup` berisi perintah atau konfigurasi yang bisa disalin, diambil persis dari sumber, dan hanya memakai placeholder seperti `<API_KEY>`.
- Build tidak boleh memanggil GitHub.
- Deploy hanya berjalan dari branch `main`.

## Review Focus

1. Perintah pasang beberapa baris: isi clipboard harus sama persis dengan perintah aslinya, termasuk baris baru (Task 6, `copy keeps multi-line commands`).
2. Clipboard tidak tersedia atau ditolak browser: tombol menampilkan "Gagal menyalin" dan teks tetap bisa dipilih manual, bukan diam saja (Task 6, `copy failure shows message`).
3. Link di README: blok kode, anchor `#x`, `mailto:`, URL absolut, dan URL rusak berakhiran `` ` `` (terlihat sebagai `%60` di situs lama) tidak boleh ikut dirusak (Task 3).
4. Bentuk URL masukan: akar repo, `blob` di branch selain `main`, `tree`, subfolder, dan `raw.githubusercontent.com` harus menghasilkan README yang benar (Task 3).
5. Pencarian tanpa hasil, dan Pagefind gagal dimuat: pengguna melihat pesan, bukan kotak kosong (Task 7, `search shows empty and error states`).

---

## Prasyarat

- Sebelum Task 1, pengelola harus mengatur `git config user.name` dan `user.email`. Spec dan `.gitignore` sudah di-stage dan harus di-commit lebih dulu dengan pesan `docs: add AI Encyclopedia design spec`.
- `origin` sudah menunjuk ke `https://github.com/bluenred17/aitoyspedia.git`. Rencana ini hanya melakukan push pada Task 10, setelah pengelola menyetujuinya.

## Struktur file

| File | Tanggung jawab |
|---|---|
| `src/data/categories.ts` | 16 kategori dan slug-nya |
| `src/data/entry-types.ts` | Lima jenis entri, label, rute, dan teks tombol salin |
| `src/data/legacy-redirects.ts` | Peta URL lama ke URL baru |
| `src/content.config.ts` | Skema per jenis |
| `src/lib/entries.ts` | Mengambil, mengurutkan, dan mengelompokkan entri |
| `src/lib/copy-text.ts` | Menentukan teks yang disalin dari sebuah entri |
| `scripts/lib/*.ts` | Logika murni yang bisa diuji |
| `scripts/*.ts` | Titik masuk CLI yang tipis |
| `src/layouts/Base.astro` | Header, font, noindex, gaya global |
| `src/components/` | `EntryCard`, `CopyButton`, `SearchBox`, `CategoryFilter`, `EntryMeta` |
| `.claude/skills/add-entry/SKILL.md` | Alur pengisian |
| `deploy/nginx-ai-encyclopedia.conf` | Blok nginx acuan |
| `docs/cutover.md` | Langkah pergantian untuk pengelola |
| `.github/workflows/deploy.yml` | Tes, build, deploy |

---

### Task 1: Fondasi proyek dan skema konten

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`
- Create: `src/content.config.ts`, `src/data/categories.ts`, `src/data/entry-types.ts`
- Create: `src/content/skills/lemo-opuscar.md`, `src/content/skills/claude-mem.md`
- Test: `tests/unit/categories.test.ts`

**Interfaces:**
- Produces: `CATEGORIES: readonly { slug: string; label: string }[]`, `CATEGORY_SLUGS`, `getCategoryLabel(slug: string): string`
- Produces: `ENTRY_TYPES: readonly { key: 'prompts'|'tools'|'skills'|'plugins'|'connectors'; label: string; singular: string; copyLabel: string }[]`
- Produces: koleksi Astro `prompts`, `tools`, `skills`, `plugins`, `connectors`
- Produces: skrip npm `dev`, `build`, `preview`, `test`, `test:e2e`, `check`

- [ ] **Step 1: Pasang dependensi**

Run: `npm init -y`, lalu pasang `astro@^7`, `tailwindcss@^4`, `@tailwindcss/vite@^4`, `@tailwindcss/typography`, `pagefind@^1`, serta dev dependency `typescript`, `vitest@^5`, `@playwright/test@^1`, `tsx`, `gray-matter`.
Expected: `package-lock.json` terbentuk tanpa error.

- [ ] **Step 2: Tulis tes kategori yang gagal**

```ts
test('has the 16 legacy categories', () => expect(CATEGORIES).toHaveLength(16));
test('slugs match legacy URLs', () => expect(CATEGORY_SLUGS).toEqual(expect.arrayContaining(
  ['audio','music-gen','voiceover','bisnis','coding','image','image-editing','text-to-image',
   'marketing','seo','productivity','video','image-to-video','text-to-video','writing','copywriting'])));
test('resolves labels', () => expect(getCategoryLabel('text-to-video')).toBe('Text to Video'));
```

Run: `npx vitest run tests/unit/categories.test.ts`. Expected: FAIL, modul belum ada.

- [ ] **Step 3: Buat `categories.ts` dan `entry-types.ts`**

Label kategori: Audio, Music Gen, Voiceover, Bisnis, Coding, Image, Image Editing, Text to Image, Marketing, SEO, Productivity, Video, Image to Video, Text to Video, Writing, Copywriting. `copyLabel` adalah "Salin prompt" untuk prompt dan "Salin pasang" untuk lainnya.

Run tes yang sama. Expected: PASS.

- [ ] **Step 4: Tulis `src/content.config.ts`**

Pakai `glob` loader untuk tiap folder. Skema dasar dan field khusus mengikuti spec §4: `license` adalah `z.string().nullable()`, wajib selain untuk prompt, `source_url` wajib selain untuk prompt, `added` dan `last_verified` adalah `z.coerce.date()`, `category` adalah `z.enum` dari `CATEGORY_SLUGS`, dan `surfaces` minimal satu item.

- [ ] **Step 5: Tulis dua entri awal**

`lemo-opuscar` (kategori `video`, repo `lemomo-ai/lemo-opuscar`) dan `claude-mem` (kategori `productivity`, repo `thedotmack/claude-mem`). Salin `install` persis dari README masing-masing. Isi badan cukup satu paragraf. Task 9 menggantinya dengan terjemahan penuh.

- [ ] **Step 6: Pastikan skema menolak entri rusak**

Tambahkan sementara `src/content/skills/rusak.md` tanpa `summary`, jalankan `npx astro sync`.
Expected: exit non-nol dan menyebut `summary`. Hapus file itu, lalu jalankan lagi. Expected: sukses. Jika `astro sync` tidak memvalidasi, pakai `astro build` pada skrip `check` di Task 2.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src tests
git commit -m "feat: add Astro project and content schema"
```

### Task 2: Pemeriksaan isi (`npm run check`)

**Files:**
- Create: `scripts/lib/scan-secrets.ts`, `scripts/lib/validate-related.ts`, `scripts/check.ts`
- Test: `tests/unit/scan-secrets.test.ts`, `tests/unit/validate-related.test.ts`

**Interfaces:**
- Produces: `scanText(text: string): { line: number; pattern: string }[]`
- Produces: `findBrokenRelated(entries: { id: string; related: string[] }[]): { id: string; target: string }[]`, dengan `id` berformat `<jenis>/<slug>`

- [ ] **Step 1: Tulis tes yang gagal**

```ts
test.each([
  'sk-ant-api03-abcdefghijklmnopqrstuv', 'sk-abcdefghijklmnopqrstuvwxyz123456',
  'ghp_abcdefghijklmnopqrstuvwxyz0123456789', 'github_pat_11ABCDEFG0abcdefghijkl',
  'AKIAIOSFODNN7EXAMPLE', 'xoxb-123456789-abcdefghij', 'xoxp-123456789-abcdefghij',
  '-----BEGIN RSA PRIVATE KEY-----',
])('flags %s', (s) => expect(scanText(s)).not.toEqual([]));

test('reports the line number', () => expect(scanText('aman\nghp_abcdefghijklmnopqrstuvwxyz0123456789')[0].line).toBe(2));
test('ignores placeholders and ordinary words', () => {
  expect(scanText('export KEY=<API_KEY>')).toEqual([]);
  expect(scanText('task-management-framework-for-agents')).toEqual([]);
  expect(scanText('sk-learn')).toEqual([]);
});
test('finds a missing related target', () => expect(findBrokenRelated([
  { id: 'skills/a', related: ['tools/tidak-ada'] },
])).toEqual([{ id: 'skills/a', target: 'tools/tidak-ada' }]));
```

Run: `npx vitest run tests/unit`. Expected: FAIL.

- [ ] **Step 2: Implementasikan kedua fungsi**

Pola `sk-` memakai batas kata dan minimal 20 karakter setelah awalan: `\bsk-[A-Za-z0-9_-]{20,}`.

Run tes. Expected: PASS.

- [ ] **Step 3: Tulis `scripts/check.ts`**

Membaca semua `src/content/**/*.md` dengan gray-matter, menjalankan kedua pemeriksaan, mencetak `file:baris pola` atau `id -> target`, dan keluar dengan kode 1 jika ada temuan. Isi skrip npm: `"check": "astro sync && tsx scripts/check.ts"`.

- [ ] **Step 4: Verifikasi**

Run: `npm run check`. Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add scripts tests package.json
git commit -m "feat: add content checks and secret scanning"
```

### Task 3: Skrip `fetch-readme`

**Files:**
- Create: `scripts/lib/github-url.ts`, `scripts/lib/rewrite-links.ts`, `scripts/lib/clean-readme.ts`, `scripts/fetch-readme.ts`
- Test: `tests/unit/github-url.test.ts`, `tests/unit/rewrite-links.test.ts`, `tests/unit/clean-readme.test.ts`

**Interfaces:**
- Produces: `parseGithubUrl(url: string): { owner: string; repo: string; ref: string | null; path: string }` dengan `path` berupa file README, dan melempar `Error` untuk URL non-GitHub
- Produces: `toRawUrl(p: ParsedGithubUrl, ref: string): string`
- Produces: `rewriteLinks(md: string, baseBlob: string, baseRaw: string): string`
- Produces: `cleanReadme(md: string): string`
- Produces CLI: `npx tsx scripts/fetch-readme.ts <url>`, mencetak JSON `{ source_url, repo, stars, license, default_branch, markdown }` ke stdout. Exit 1 dengan pesan penyebab jika gagal.

- [ ] **Step 1: Tulis tes URL yang gagal**

```ts
const P = (u: string) => parseGithubUrl(u);
test('blob', () => expect(P('https://github.com/a/b/blob/dev/docs/README.md')).toEqual({ owner:'a', repo:'b', ref:'dev', path:'docs/README.md' }));
test('repo root', () => expect(P('https://github.com/a/b')).toEqual({ owner:'a', repo:'b', ref:null, path:'README.md' }));
test('.git suffix', () => expect(P('https://github.com/a/b.git').repo).toBe('b'));
test('tree folder', () => expect(P('https://github.com/a/b/tree/main/plugin/skills/x').path).toBe('plugin/skills/x/README.md'));
test('raw', () => expect(P('https://raw.githubusercontent.com/a/b/main/README.md').ref).toBe('main'));
test('strips stray backtick', () => expect(P('https://github.com/a/b/blob/main/README.md`').path).toBe('README.md'));
test('rejects non-GitHub', () => expect(() => P('https://example.com/x')).toThrow());
```

- [ ] **Step 2: Tulis tes link dan pembersihan yang gagal**

```ts
const R = (m: string) => rewriteLinks(m, 'https://github.com/a/b/blob/main/sub/', 'https://raw.githubusercontent.com/a/b/main/sub/');
test('relative link', () => expect(R('[x](./docs/a.md)')).toBe('[x](https://github.com/a/b/blob/main/sub/docs/a.md)'));
test('parent path', () => expect(R('[x](../a.md)')).toBe('[x](https://github.com/a/b/blob/main/a.md)'));
test('image uses raw', () => expect(R('![x](img/a.png)')).toBe('![x](https://raw.githubusercontent.com/a/b/main/sub/img/a.png)'));
test('html img', () => expect(R('<img src="a.png">')).toContain('https://raw.githubusercontent.com/a/b/main/sub/a.png'));
test('leaves anchors, mail, absolute', () => { for (const s of ['[x](#y)','[x](mailto:a@b.c)','[x](https://z.io/a)']) expect(R(s)).toBe(s); });
test('skips fenced and inline code', () => { for (const s of ['```\n[x](./a.md)\n```','`[x](./a.md)`']) expect(R(s)).toBe(s); });

test('drops badges', () => expect(cleanReadme('[![CI](https://x/b.svg)](https://x)\n\n# Judul')).toBe('# Judul'));
test('drops TOC section', () => expect(cleanReadme('# A\n\n## Table of Contents\n- [B](#b)\n\n## B\nisi')).toBe('# A\n\n## B\nisi'));
test('keeps code', () => expect(cleanReadme('```\n[![a](b)](c)\n```')).toContain('[![a](b)](c)'));
```

Run: `npx vitest run tests/unit`. Expected: FAIL.

- [ ] **Step 3: Implementasikan modul**

`rewriteLinks` dan `cleanReadme` memecah Markdown menjadi segmen kode dan nonkode, lalu hanya mengubah segmen nonkode. `new URL(path, base)` dipakai untuk menyelesaikan path. Konversi sisa HTML ke Markdown adalah tugas Claude di Task 8.

Run tes. Expected: PASS.

- [ ] **Step 4: Tulis CLI**

Pakai `fetch` ke `https://api.github.com/repos/<owner>/<repo>` untuk `stargazers_count`, `license.spdx_id`, dan `default_branch`. Sertakan `Authorization` hanya jika `GITHUB_TOKEN` ada. `NOASSERTION` atau lisensi kosong menghasilkan `license: null`. Saat `ref` kosong, pakai `default_branch`.

- [ ] **Step 5: Uji pada repo nyata**

Run: `npx tsx scripts/fetch-readme.ts https://github.com/lemomo-ai/lemo-opuscar/blob/main/README.md`
Expected: JSON dengan `repo: "lemomo-ai/lemo-opuscar"`, `stars` berupa angka, dan `markdown` tanpa link relatif.

Run: `npx tsx scripts/fetch-readme.ts https://github.com/a/repo-yang-tidak-ada-xyz`
Expected: exit 1 dengan pesan yang menyebut repo tidak ditemukan.

- [ ] **Step 6: Commit**

```bash
git add scripts tests
git commit -m "feat: add README fetching and normalization"
```

### Task 4: `refresh-stars`

**Files:**
- Create: `scripts/lib/update-frontmatter.ts`, `scripts/refresh-stars.ts`
- Test: `tests/unit/update-frontmatter.test.ts`, `tests/unit/refresh-stars.test.ts`

**Interfaces:**
- Produces: `setFrontmatterField(raw: string, key: string, value: number): string`
- Produces: `refreshAll(files: { path: string; raw: string }[], getStars: (repo: string) => Promise<number>): Promise<{ updated: { path: string; raw: string }[]; failed: { path: string; error: string }[] }>`

- [ ] **Step 1: Tulis tes yang gagal**

```ts
test('replaces only stars and keeps the rest byte-identical', () => {
  const raw = '---\ntitle: "A: b"\nstars: 1\ninstall: |\n  x\n---\nbody\n';
  expect(setFrontmatterField(raw, 'stars', 9)).toBe(raw.replace('stars: 1', 'stars: 9'));
});
test('one failure keeps the old value and others proceed', async () => {
  const f = (repo: string, n: number) => ({ path: repo, raw: `---\nrepo: ${repo}\nstars: ${n}\n---\n` });
  const r = await refreshAll([f('a/ok', 1), f('a/bad', 2)], async (x) => { if (x === 'a/bad') throw new Error('502'); return 5; });
  expect(r.updated).toHaveLength(1);
  expect(r.updated[0].raw).toContain('stars: 5');
  expect(r.failed).toEqual([{ path: 'a/bad', error: '502' }]);
});
test('skips entries without repo', async () => {
  const r = await refreshAll([{ path: 'p', raw: '---\ntitle: x\n---\n' }], async () => 1);
  expect(r.updated).toEqual([]);
});
```

Run: `npx vitest run tests/unit`. Expected: FAIL.

- [ ] **Step 2: Implementasikan**

Ganti baris dengan regex di dalam blok frontmatter, jangan serialisasi ulang YAML. Jika `stars` belum ada, tambahkan tepat sebelum `---` penutup. CLI menulis file yang berubah, mencetak kegagalan, dan keluar dengan kode 1 jika ada yang gagal. Isi skrip npm: `"refresh-stars": "tsx scripts/refresh-stars.ts"`.

Run tes. Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add scripts tests package.json
git commit -m "feat: add GitHub stars refresh"
```

### Task 5: Layout, beranda, daftar, dan kategori

**Files:**
- Create: `src/layouts/Base.astro`, `src/styles/global.css`, `src/lib/entries.ts`, `src/lib/copy-text.ts`
- Create: `src/components/EntryCard.astro`, `src/components/CategoryFilter.astro`
- Create: `src/pages/index.astro`, `src/pages/404.astro`, `src/pages/[type]/index.astro`, `src/pages/categories/index.astro`, `src/pages/categories/[slug].astro`
- Create: `public/robots.txt`, `playwright.config.ts`
- Test: `tests/unit/copy-text.test.ts`, `tests/e2e/browse.spec.ts`

**Interfaces:**
- Consumes: `ENTRY_TYPES`, `CATEGORIES`, koleksi Astro
- Produces: `getAllEntries(): Promise<Entry[]>` dengan `Entry = { type, slug, url, data, render }`, urut `added` terbaru
- Produces: `getCopyText(type: string, data: Record<string, unknown>): string | null`
- Produces: `playwright.config.ts` menjalankan `npm run preview` setelah build dengan baseURL `http://localhost:4321`

- [ ] **Step 1: Tulis tes `getCopyText` yang gagal**

```ts
test('prompt', () => expect(getCopyText('prompts', { prompt: 'halo' })).toBe('halo'));
test('tool uses setup', () => expect(getCopyText('tools', { setup: 'npx x' })).toBe('npx x'));
test('skill uses install', () => expect(getCopyText('skills', { install: 'a\nb\n' })).toBe('a\nb'));
```

Run: `npx vitest run tests/unit/copy-text.test.ts`. Expected: FAIL. Implementasikan, buang hanya baris baru di akhir. Run lagi. Expected: PASS.

- [ ] **Step 2: Tulis tes e2e yang gagal**

```ts
test('home shows hero, categories and latest skills', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ensiklopedia Prompt & Tools AI');
  await expect(page.getByRole('link', { name: /Video/ }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Skills Terbaru' })).toBeVisible();
});
test('empty sections show a message', async ({ page }) => {
  await page.goto('/connectors');
  await expect(page.getByText('Belum ada connector.')).toBeVisible();
});
test('category filter narrows the list', async ({ page }) => {
  await page.goto('/skills');
  await page.getByLabel('Kategori').selectOption('video');
  await expect(page.getByRole('heading', { name: 'Lemo-Opuscar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Claude-Mem' })).toBeHidden();
});
test('category page lists its entries', async ({ page }) => {
  await page.goto('/categories/video');
  await expect(page.getByRole('heading', { name: 'Lemo-Opuscar' })).toBeVisible();
});
test('all pages carry noindex', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});
test('fits a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/skills');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
```

Run: `npx playwright install chromium`, lalu `npm run build && npx playwright test`. Expected: FAIL.

- [ ] **Step 3: Bangun layout dan halaman**

Ikuti spec §5 dan mockup `.superpowers/brainstorm/872-1793798841/content/layout-v2-toyspedia.html`. Header berisi logo "AI Encyclopedia" dan menu Prompt, Tools, Skills, Plugins, Connectors, Kategori. Hero memakai teks "Ensiklopedia Prompt & Tools AI". Kartu kategori di beranda hanya menampilkan delapan kategori dengan entri terbanyak, dengan link "Lihat semua". `[type]/index.astro` memakai `getStaticPaths` dari `ENTRY_TYPES`. Teks kosong: "Belum ada <singular>.". `robots.txt` berisi `User-agent: *` dan `Allow: /`. Halaman 404 berisi tautan ke beranda.

Kartu memuat badge kategori, judul, bintang, ringkasan, dan `CopyButton`. `CopyButton` dibuat di Task 6, jadi sementara kartu tanpa tombol.

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npx playwright test`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src public tests playwright.config.ts
git commit -m "feat: add layout, home, list and category pages"
```

### Task 6: Halaman detail dan tombol salin

**Files:**
- Create: `src/components/CopyButton.astro`, `src/components/EntryMeta.astro`, `src/pages/[type]/[slug].astro`, `src/scripts/copy.ts`
- Modify: `src/components/EntryCard.astro`, `src/layouts/Base.astro`
- Test: `tests/e2e/detail.spec.ts`

**Interfaces:**
- Consumes: `getAllEntries`, `getCopyText`
- Produces: `<CopyButton text={string} label={string} />` dengan atribut `data-copy`

- [ ] **Step 1: Tulis tes yang gagal**

Perintah berikut berasal dari README Lemo-Opuscar dan harus sama dengan isi entri.

```ts
const INSTALL = 'claude plugin marketplace add lemomo-ai/lemo-opuscar\nclaude plugin install lemo-opuscar@lemolab';
test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

test('detail shows install, source and verification date', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lemo-Opuscar');
  await expect(page.getByRole('link', { name: /sumber/i })).toHaveAttribute('href', /github\.com\/lemomo-ai/);
  await expect(page.getByText(/Terakhir dicek/)).toBeVisible();
});
test('copy keeps multi-line commands', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await page.getByRole('button', { name: 'Salin pasang' }).first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(INSTALL);
  await expect(page.getByRole('button', { name: 'Tersalin' })).toBeVisible();
});
test('card copy works from the list', async ({ page }) => {
  await page.goto('/skills');
  await page.locator('article', { hasText: 'Lemo-Opuscar' }).getByRole('button').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(INSTALL);
});
test('copy failure shows message', async ({ page }) => {
  await page.addInitScript(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('x')); });
  await page.goto('/skills/lemo-opuscar');
  await page.getByRole('button', { name: 'Salin pasang' }).first().click();
  await expect(page.getByRole('button', { name: 'Gagal menyalin' })).toBeVisible();
});
test('code blocks in the body get a copy button', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await expect(page.locator('article pre button')).not.toHaveCount(0);
});
```

Run: `npm run build && npx playwright test tests/e2e/detail.spec.ts`. Expected: FAIL.

- [ ] **Step 2: Buat halaman dan komponen**

Urutan halaman detail: kategori dan jenis, judul, bintang, peringatan jika `status: usang`, blok salin utama, isi README, `EntryMeta` (sumber, lisensi, `surfaces`, tanggal terakhir dicek), lalu entri terkait. Lisensi `null` ditampilkan sebagai "Tidak tercantum". Isi README memakai kelas `prose` dan dibungkus `<article>`. `src/scripts/copy.ts` memasang tombol pada tiap `article pre` dan menangani semua `[data-copy]`. Label kembali normal setelah 2 detik. Entri tanpa `source_url` tidak menampilkan baris sumber.

- [ ] **Step 3: Pasang `CopyButton` pada `EntryCard`**

Run: `npm run build && npx playwright test`. Expected: semua PASS. Tes yang memakai isi Lemo-Opuscar tetap berlaku setelah Task 9. Pastikan isinya masih memuat blok kode.

- [ ] **Step 4: Commit**

```bash
git add src tests
git commit -m "feat: add entry detail page and copy buttons"
```

### Task 7: Pencarian Pagefind

**Files:**
- Create: `src/components/SearchBox.astro`, `src/scripts/search.ts`
- Modify: `package.json`, `src/pages/index.astro`, `src/pages/[type]/index.astro`, `src/pages/[type]/[slug].astro`
- Test: `tests/e2e/search.spec.ts`

**Interfaces:**
- Consumes: halaman detail dari Task 6
- Produces: skrip `"build": "astro build && pagefind --site dist"`

- [ ] **Step 1: Tulis tes yang gagal**

```ts
test('search finds an entry while typing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('film pendek');
  await page.getByRole('link', { name: /Lemo-Opuscar/ }).first().click();
  await expect(page).toHaveURL(/\/skills\/lemo-opuscar/);
});
test('search shows empty and error states', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('zzzzqqqq');
  await expect(page.getByText('Tidak ada hasil.')).toBeVisible();
  await page.route('**/pagefind/**', (r) => r.abort());
  await page.reload();
  await page.getByRole('searchbox').fill('film');
  await expect(page.getByText('Pencarian tidak tersedia.')).toBeVisible();
});
test('list and category pages are not indexed as results', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('Skills');
  await expect(page.locator('[data-result-url="/skills/"]')).toHaveCount(0);
});
```

Run: `npm run build && npx playwright test tests/e2e/search.spec.ts`. Expected: FAIL.

- [ ] **Step 2: Implementasikan**

Tambahkan `data-pagefind-body` hanya pada halaman detail, dan `data-pagefind-ignore` pada `EntryMeta` serta entri terkait. Pasang `data-pagefind-meta` untuk jenis dan ringkasan. `search.ts` memakai `import('/pagefind/pagefind.js')` secara dinamis saat pertama mengetik, dengan debounce 200 ms, dan menampilkan sampai 8 hasil berisi judul, jenis, dan ringkasan. Tiap hasil memakai atribut `data-result-url` berisi URL entri. Input kosong menyembunyikan hasil. Kegagalan impor menampilkan "Pencarian tidak tersedia."

- [ ] **Step 3: Verifikasi**

Run: `npm run build && npx playwright test`. Expected: semua PASS.

- [ ] **Step 4: Commit**

```bash
git add src tests package.json
git commit -m "feat: add Pagefind search"
```

### Task 8: Skill `add-entry`

**Files:**
- Create: `.claude/skills/add-entry/SKILL.md`, `CLAUDE.md`

**Interfaces:**
- Consumes: `scripts/fetch-readme.ts`, `npm run check`, skema Task 1

- [ ] **Step 1: Tulis `SKILL.md`**

Frontmatter: `name: add-entry`, dan `description` yang memicu skill saat pengelola memberi URL README atau nama untuk ditambahkan ke ensiklopedia. Isinya mengikuti spec §6 persis, dalam urutan: masukan, pencarian nama dengan konfirmasi wajib, `fetch-readme`, pemeriksaan jenis, pemeriksaan lisensi dan perintah pasang, penerjemahan, penulisan, `npm run check`, laporan. Sertakan semua aturan terjemahan dan keamanan spec §6, contoh frontmatter lengkap untuk kelima jenis, aturan bahwa `install`, `setup`, dan `prompt` selalu memakai YAML block scalar `|` dan `title` serta `summary` selalu dikutip, serta aturan timpa: pertahankan `added`, perbarui `last_verified`. Slug diambil dari nama repo dalam huruf kecil.

- [ ] **Step 2: Tulis `CLAUDE.md`**

Maksimal 15 baris: tujuan proyek, perintah npm, arahan memakai `add-entry` untuk menambah entri, dan larangan data sensitif.

- [ ] **Step 3: Uji dengan Impeccable**

Ikuti skill untuk `https://github.com/pbakaus/impeccable/blob/main/README.md`.
Expected: `src/content/skills/impeccable.md` terbentuk dan `npm run check` lulus.

- [ ] **Step 4: Commit**

```bash
git add .claude CLAUDE.md src/content
git commit -m "feat: add add-entry skill"
```

### Task 9: Migrasi entri dan redirect

**Files:**
- Create: `src/data/legacy-redirects.ts`, `tests/e2e/redirects.spec.ts`, entri di `src/content/`
- Modify: `astro.config.mjs`, `src/content/skills/lemo-opuscar.md`, `src/content/skills/claude-mem.md`

**Interfaces:**
- Produces: `LEGACY_REDIRECTS: Record<string, string>`

- [ ] **Step 1: Tulis tes redirect yang gagal**

```ts
const MAP = { '/skills/582':'/skills/lemo-opuscar', '/skills/578':'/skills/claude-mem', '/tools/13':'/tools/headroom', '/auth/login':'/', '/auth/register':'/' };
for (const [from, to] of Object.entries(MAP)) test(`${from} redirects`, async ({ page }) => {
  await page.goto(from);
  await expect(page).toHaveURL(new RegExp(`${to}/?$`));
});
test('unknown old id shows the 404 page', async ({ page }) => {
  const r = await page.goto('/skills/999');
  expect(r?.status()).toBe(404);
});
```

Run: `npm run build && npx playwright test tests/e2e/redirects.spec.ts`. Expected: FAIL.

- [ ] **Step 2: Buat redirect**

Peta yang sudah diverifikasi terhadap situs lama: `skills/578` Claude-Mem, `579` Impeccable, `580` Taste Skill, `581` Understand Anything, `582` Lemo-Opuscar, `tools/13` Headroom, `14` HyperFrames, `15` FreeLLMAPI, `16` OmniRoute, serta `/auth/login` dan `/auth/register` ke `/`. Daftarkan lewat opsi `redirects` di `astro.config.mjs`. Target memakai slug akhir hasil Step 3.

- [ ] **Step 3: Buat ulang entri lewat `add-entry`**

| Entri | README |
|---|---|
| Taste Skill | `https://github.com/Leonxlnx/taste-skill/blob/main/README.md` |
| Understand Anything | `https://github.com/Egonex-AI/Understand-Anything/blob/main/README.md` |
| Lemo-Opuscar | `https://github.com/lemomo-ai/lemo-opuscar/blob/main/README.md` |
| Claude-Mem | `https://github.com/thedotmack/claude-mem/blob/main/README.md` |
| Headroom | `https://github.com/headroomlabs-ai/headroom/blob/main/README.md` |
| HyperFrames | `https://github.com/heygen-com/hyperframes/blob/main/README.md` |
| FreeLLMAPI | `https://github.com/tashfeenahmed/freellmapi/blob/main/README.md` |
| OmniRoute | `https://github.com/cheaper-inference/OmniRoute/blob/main/README.md` |

Impeccable sudah dibuat di Task 8. Pertahankan kategori dari situs lama. Keputusan pengelola diperlukan untuk repo tanpa lisensi dan untuk jenis Understand Anything. Jika jenisnya pindah ke plugin, targetkan redirect ke `/plugins/understand-anything`.

- [ ] **Step 4: Verifikasi**

Run: `npm run check && npm test && npm run build && npx playwright test`. Expected: semua PASS, dan `/skills` serta `/tools` memuat seluruh entri.

- [ ] **Step 5: Commit**

```bash
git add src tests astro.config.mjs
git commit -m "feat: migrate existing entries and legacy redirects"
```

### Task 10: Deploy dan panduan pergantian

**Files:**
- Create: `.github/workflows/deploy.yml`, `deploy/nginx-ai-encyclopedia.conf`, `docs/cutover.md`

**Interfaces:**
- Consumes: skrip `check`, `test`, `build`, `test:e2e`
- Produces: GitHub Secrets yang dibutuhkan: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`

- [ ] **Step 1: Tulis workflow**

Pemicu `push` ke `main`. Node 24. Langkah mengikuti spec §9 berurutan: `npm ci`, `npm run check`, `npm test`, `npm run build`, `npx playwright install --with-deps chromium`, `npm run test:e2e`. Deploy mengikuti urutan berikut, dengan `RELEASE=/var/www/ai-encyclopedia/releases/$GITHUB_SHA`:

```bash
rsync -az --delete dist/ "$USER@$HOST:$RELEASE/"
ssh "$USER@$HOST" "ln -sfn $RELEASE /var/www/ai-encyclopedia/current.tmp && mv -T /var/www/ai-encyclopedia/current.tmp /var/www/ai-encyclopedia/current && ls -1dt /var/www/ai-encyclopedia/releases/* | tail -n +4 | xargs -r rm -rf"
```

Hentikan workflow sebelum deploy jika satu langkah gagal.

- [ ] **Step 2: Tulis blok nginx acuan**

Berisi `root /var/www/ai-encyclopedia/current`, `index index.html`, `try_files $uri $uri/ $uri.html =404`, `error_page 404 /404.html`, dan `add_header X-Robots-Tag "noindex" always`. Beri komentar bahwa baris `listen` dan sertifikat TLS di blok lama dipertahankan.

- [ ] **Step 3: Tulis `docs/cutover.md`**

Berisi perintah salin-tempel untuk prasyarat dan enam langkah pergantian spec §9, ditambah pembuatan pengguna deploy yang hanya bisa menulis ke `/var/www/ai-encyclopedia`, pengujian lewat port sementara, cara rollback rilis lewat symlink, dan rollback pergantian ke Express. Sebelum menulis perintah akhir, cocokkan dengan keluaran `nginx -T` dan daftar proses dari pengelola.

- [ ] **Step 4: Validasi lokal**

Run: `npx yaml-lint .github/workflows/deploy.yml`, atau parse dengan paket `yaml`.
Expected: tidak ada error. Workflow sebenarnya baru bisa dibuktikan pada push pertama.

- [ ] **Step 5: Commit**

```bash
git add .github deploy docs/cutover.md
git commit -m "feat: add deploy workflow and cutover guide"
```

- [ ] **Step 6: Push setelah disetujui pengelola**

Minta persetujuan, lalu jalankan `git push -u origin main`. Setelah GitHub Secrets diisi, pastikan workflow hijau dan folder rilis muncul di server. Pergantian nginx tetap dijalankan pengelola mengikuti `docs/cutover.md`, lalu `https://ai.toyspedia.fun/skills/582` harus mengalihkan ke `/skills/lemo-opuscar/`.
