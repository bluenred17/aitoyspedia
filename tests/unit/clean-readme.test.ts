import { expect, test } from 'vitest';
import { cleanReadme } from '../../scripts/lib/clean-readme';

test('drops badges', () => expect(cleanReadme('[![CI](https://x/b.svg)](https://x)\n\n# Judul')).toBe('# Judul'));
test('drops a row of badges', () =>
  expect(cleanReadme('[![A](https://x/a.svg)](https://x) [![B](https://x/b.svg)](https://y)\n# J')).toBe('# J'));
test('keeps a screenshot', () => expect(cleanReadme('# J\n\n![layar](https://x/layar.png)')).toContain('![layar]'));
test('drops TOC section', () =>
  expect(cleanReadme('# A\n\n## Table of Contents\n- [B](#b)\n\n## B\nisi')).toBe('# A\n\n## B\nisi'));
test('drops a TOC in Indonesian', () =>
  expect(cleanReadme('# A\n\n## Daftar Isi\n- [B](#b)\n\n## B\nisi')).toBe('# A\n\n## B\nisi'));
test('keeps code', () => expect(cleanReadme('```\n[![a](b)](c)\n```')).toContain('[![a](b)](c)'));
test('keeps a heading that only looks like a TOC inside code', () =>
  expect(cleanReadme('```\n## Contents\nx\n```\nsisa')).toContain('## Contents'));
