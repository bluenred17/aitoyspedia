import { expect, test, type Page } from '@playwright/test';

const INSTALL =
  'claude plugin marketplace add lemomo-ai/lemo-opuscar\nclaude plugin install lemo-opuscar@lemolab';

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

// Clipboard Windows mengubah \n menjadi \r\n. Itu perilaku platform, bukan isi yang dikirim
// tombol, jadi pembacaan dinormalkan. Isi persisnya dikunci lewat atribut data-copy-text.
const readClipboard = async (page: Page) =>
  (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n');

test('detail shows install, source and verification date', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lemo-Opuscar');
  await expect(page.getByRole('link', { name: /sumber/i })).toHaveAttribute('href', /github\.com\/lemomo-ai/);
  await expect(page.getByText(/Terakhir dicek/)).toBeVisible();
  await expect(page.getByText('4 November 2026')).toBeVisible();
  await expect(page.getByText('MIT')).toBeVisible();
});

test('copy keeps multi-line commands', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  const button = page.getByRole('button', { name: 'Salin pasang' }).first();
  await expect(button).toHaveAttribute('data-copy-text', INSTALL);
  await button.click();
  expect(await readClipboard(page)).toBe(INSTALL);
  await expect(page.getByRole('button', { name: 'Tersalin' })).toBeVisible();
});

test('card copy works from the list', async ({ page }) => {
  await page.goto('/skills');
  await page.locator('article', { hasText: 'Lemo-Opuscar' }).getByRole('button').click();
  expect(await readClipboard(page)).toBe(INSTALL);
});

test('copy failure shows message', async ({ page }) => {
  await page.addInitScript(() => {
    navigator.clipboard.writeText = () => Promise.reject(new Error('ditolak'));
  });
  await page.goto('/skills/lemo-opuscar');
  await page.getByRole('button', { name: 'Salin pasang' }).first().click();
  await expect(page.getByRole('button', { name: 'Gagal menyalin' })).toBeVisible();
});

test('code blocks in the body get a copy button', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await expect(page.locator('article pre button')).not.toHaveCount(0);
});

test('body code block copies its own text', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar');
  await page.locator('article pre button').first().click();
  expect(await readClipboard(page)).toBe(INSTALL);
});

test('detail page fits a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/skills/lemo-opuscar');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
