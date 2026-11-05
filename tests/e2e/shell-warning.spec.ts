import { expect, test } from '@playwright/test';

test('detail page warns when the command pipes a download into a shell', async ({ page }) => {
  await page.goto('/tools/freellmapi/');
  await expect(page.getByRole('note').filter({ hasText: 'langsung menjalankannya' })).toBeVisible();
  await expect(
    page.locator('pre', { hasText: 'curl -fsSL https://freellmapi.co/install.sh | bash' }).first(),
  ).toBeVisible();
});

test('a plain command gets no warning', async ({ page }) => {
  await page.goto('/skills/lemo-opuscar/');
  await expect(page.getByRole('note').filter({ hasText: 'langsung menjalankannya' })).toHaveCount(0);
});

test('the list card tells you to read the script before copying', async ({ page }) => {
  await page.goto('/tools/');
  await expect(page.locator('article', { hasText: 'FreeLLMAPI' }).getByText(/baca skripnya dulu/i)).toBeVisible();
  await expect(page.locator('article', { hasText: 'Headroom' }).getByText(/baca skripnya dulu/i)).toHaveCount(0);
});
