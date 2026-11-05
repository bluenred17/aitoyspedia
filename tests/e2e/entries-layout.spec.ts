import { expect, test } from '@playwright/test';

// Semua entri hasil migrasi. README panjang punya tabel lebar dan baris kode panjang.
const ENTRIES = [
  '/skills/taste-skill/',
  '/skills/impeccable/',
  '/skills/lemo-opuscar/',
  '/plugins/understand-anything/',
  '/plugins/claude-mem/',
  '/tools/headroom/',
  '/tools/hyperframes/',
  '/tools/freellmapi/',
  '/tools/omniroute/',
];

for (const url of ENTRIES) {
  test(`${url} fits a phone width and has one h1`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(url);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  });
}

test('every entry has a primary copy button with a non-empty command', async ({ page }) => {
  for (const url of ENTRIES) {
    await page.goto(url);
    const text = await page.locator('main [data-copy-text]').first().getAttribute('data-copy-text');
    expect(text?.trim().length, `${url} has no copy text`).toBeGreaterThan(5);
  }
});

test('inline code is not wrapped in literal backticks', async ({ page }) => {
  await page.goto('/skills/impeccable/');
  const content = await page
    .locator('article :not(pre) > code')
    .first()
    .evaluate((el) => [getComputedStyle(el, '::before').content, getComputedStyle(el, '::after').content]);
  for (const c of content) expect(['none', 'normal', '""']).toContain(c);
});
