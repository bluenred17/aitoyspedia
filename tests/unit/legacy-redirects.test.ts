import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from 'vitest';
import { LEGACY_REDIRECTS } from '../../src/data/legacy-redirects';

test('covers every legacy id from the old site', () => {
  expect(Object.keys(LEGACY_REDIRECTS).sort()).toEqual(
    [
      '/auth/login', '/auth/register',
      '/skills/578', '/skills/579', '/skills/580', '/skills/581', '/skills/582',
      '/tools/13', '/tools/14', '/tools/15', '/tools/16',
    ].sort(),
  );
});

test('every redirect target is a real entry or the home page', () => {
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    if (to === '/') continue;
    const m = /^\/(prompts|tools|skills|plugins|connectors)\/([a-z0-9-]+)\/$/.exec(to);
    expect(m, `${from} -> ${to} has an unexpected shape`).not.toBeNull();
    const file = join(process.cwd(), 'src', 'content', m![1], `${m![2]}.md`);
    expect(existsSync(file), `${from} -> ${to}: ${file} is missing`).toBe(true);
  }
});
