import { expect, test } from '@playwright/test';

const MAP: Record<string, string> = {
  '/skills/578': '/plugins/claude-mem/',
  '/skills/579': '/skills/impeccable/',
  '/skills/580': '/skills/taste-skill/',
  '/skills/581': '/plugins/understand-anything/',
  '/skills/582': '/skills/lemo-opuscar/',
  '/tools/13': '/tools/headroom/',
  '/tools/14': '/tools/hyperframes/',
  '/tools/15': '/tools/freellmapi/',
  '/tools/16': '/tools/omniroute/',
  '/auth/login': '/',
  '/auth/register': '/',
};

for (const [from, to] of Object.entries(MAP)) {
  test(`${from} redirects to ${to}`, async ({ page }) => {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('an unknown old id shows the 404 page', async ({ page }) => {
  const res = await page.goto('/skills/999');
  expect(res?.status()).toBe(404);
});
