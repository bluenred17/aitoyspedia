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

test('a TOC under a top-level heading does not swallow the sections after it', () =>
  expect(cleanReadme('# Tool\n\n# Table of Contents\n- [a](#a)\n\n## Install\nnpx x')).toBe('# Tool\n\n## Install\nnpx x'));
test('a TOC does not swallow a deeper heading that follows it', () =>
  expect(cleanReadme('# Tool\n\n## Contents\n- [a](#a)\n\n### Install\nnpx x')).toBe('# Tool\n\n### Install\nnpx x'));
test('a TOC ends at the first non-list paragraph', () =>
  expect(cleanReadme('# T\n\n## Contents\n- [a](#a)\n- [b](#b)\n\nIni paragraf penting.\n\n## B\nisi')).toBe(
    '# T\n\nIni paragraf penting.\n\n## B\nisi',
  ));
test('a tilde line inside a backtick fence does not end the fence', () =>
  expect(cleanReadme('```\n~~~\n## Contents\nx\n```\nsisa')).toBe('```\n~~~\n## Contents\nx\n```\nsisa'));
test('numbered list items stay part of the TOC', () =>
  expect(cleanReadme('# T\n\n## Table of Contents\n1. [a](#a)\n2. [b](#b)\n\n## A\nisi')).toBe('# T\n\n## A\nisi'));
