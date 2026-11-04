import { expect, test } from '@playwright/test';

test('search finds an entry while typing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('film pendek');
  // Dibatasi ke panel hasil, supaya tidak mengenai kartu "Skills Terbaru" di beranda.
  const result = page.locator('[data-result-url]').filter({ hasText: 'Lemo-Opuscar' });
  await expect(result).toBeVisible();
  await result.getByRole('link').click();
  await expect(page).toHaveURL(/\/skills\/lemo-opuscar/);
});

test('search shows empty and error states', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('zzzzqqqq');
  await expect(page.getByText('Tidak ada hasil.')).toBeVisible();

  await page.route('**/pagefind/**', (route) => route.abort());
  await page.reload();
  await page.getByRole('searchbox').fill('film');
  await expect(page.getByText('Pencarian tidak tersedia.')).toBeVisible();
});

test('only entry pages are results, never list or category pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('Lemo-Opuscar');
  // Kata ini juga ada di beranda, /skills/ dan /categories/video/, jadi hanya halaman detail yang boleh muncul.
  await expect(page.locator('[data-result-url="/skills/lemo-opuscar/"]')).toBeVisible();
  const urls = await page.locator('[data-result-url]').evaluateAll((els) =>
    els.map((el) => (el as HTMLElement).dataset.resultUrl ?? ''),
  );
  expect(urls.length).toBeGreaterThan(0);
  for (const url of urls) expect(url).toMatch(/^\/(prompts|tools|skills|plugins|connectors)\/[^/]+\/$/);
});

test('clearing the box hides the results', async ({ page }) => {
  await page.goto('/skills');
  const box = page.getByRole('searchbox');
  await box.fill('film pendek');
  await expect(page.locator('[data-result-url]').first()).toBeVisible();
  await box.fill('');
  await expect(page.locator('[data-result-url]')).toHaveCount(0);
});

test('results are rendered as text, never as markup', async ({ page }) => {
  // Pagefind digantikan modul palsu supaya hasilnya deterministik dan memuat markup.
  const evil = '<img src=x onerror=window.__pwned=1>';
  await page.route('**/pagefind/pagefind.js', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `export async function search() {
        return { results: [{ data: async () => ({
          url: '/skills/x/',
          meta: { title: ${JSON.stringify(evil)}, summary: '<b>tebal</b>', type: '<i>Skills</i>' },
        }) }] };
      }`,
    }),
  );
  await page.goto('/');
  await page.getByRole('searchbox').fill('apa saja');

  const result = page.locator('[data-result-url]');
  await expect(result).toContainText(evil);
  await expect(result).toContainText('<b>tebal</b>');
  await expect(result.locator('img, b, i')).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
});