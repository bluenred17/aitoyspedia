import { expect, test } from '@playwright/test';

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

test('category index lists every category with a count', async ({ page }) => {
  await page.goto('/categories');
  await expect(page.getByRole('link', { name: /Text to Video/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Video/ }).first()).toContainText('item');
});

test('all pages carry noindex', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('robots.txt does not block crawling', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).not.toMatch(/Disallow:\s*\//);
});

test('unknown page shows the 404 page', async ({ page }) => {
  const res = await page.goto('/halaman-tidak-ada');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('link', { name: /beranda/i }).first()).toBeVisible();
});

test('fits a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/skills');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
