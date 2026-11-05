import { expect, test } from 'vitest';
import { rewriteLinks } from '../../scripts/lib/rewrite-links';

const BLOB = 'https://github.com/a/b/blob/main/sub/';
const RAW = 'https://raw.githubusercontent.com/a/b/main/sub/';
const R = (m: string) => rewriteLinks(m, BLOB, RAW);

test('relative link', () =>
  expect(R('[x](./docs/a.md)')).toBe('[x](https://github.com/a/b/blob/main/sub/docs/a.md)'));
test('parent path', () => expect(R('[x](../a.md)')).toBe('[x](https://github.com/a/b/blob/main/a.md)'));
test('image uses raw', () =>
  expect(R('![x](img/a.png)')).toBe('![x](https://raw.githubusercontent.com/a/b/main/sub/img/a.png)'));
test('image inside a link', () =>
  expect(R('[![x](img/a.png)](./b.md)')).toBe(
    '[![x](https://raw.githubusercontent.com/a/b/main/sub/img/a.png)](https://github.com/a/b/blob/main/sub/b.md)',
  ));
test('html img', () => expect(R('<img src="a.png">')).toContain(`${RAW}a.png`));
test('html anchor', () => expect(R('<a href="docs/x.md">x</a>')).toContain(`${BLOB}docs/x.md`));
test('keeps a link title', () =>
  expect(R('[x](./a.md "judul")')).toBe('[x](https://github.com/a/b/blob/main/sub/a.md "judul")'));
test('leaves anchors, mail, absolute', () => {
  for (const s of ['[x](#y)', '[x](mailto:a@b.c)', '[x](https://z.io/a)', '[x](//cdn.io/a.png)']) {
    expect(R(s)).toBe(s);
  }
});
test('skips fenced and inline code', () => {
  for (const s of ['```\n[x](./a.md)\n```', '~~~\n[x](./a.md)\n~~~', '`[x](./a.md)`']) {
    expect(R(s)).toBe(s);
  }
});
test('rewrites text after a code block', () =>
  expect(R('```\n[x](./a.md)\n```\n[y](./b.md)')).toBe(
    '```\n[x](./a.md)\n```\n[y](https://github.com/a/b/blob/main/sub/b.md)',
  ));

test('root-relative link resolves against the repo root', () =>
  expect(R('[x](/docs/a.md)')).toBe('[x](https://github.com/a/b/blob/main/docs/a.md)'));
test('root-relative image resolves against the raw repo root', () =>
  expect(R('![x](/img/a.png)')).toBe('![x](https://raw.githubusercontent.com/a/b/main/img/a.png)'));

test('a mid-line triple backtick does not stop later links from being rewritten', () =>
  expect(R('teks ``` sebaris\n[x](./after.md)')).toBe(
    'teks ``` sebaris\n[x](https://github.com/a/b/blob/main/sub/after.md)',
  ));
