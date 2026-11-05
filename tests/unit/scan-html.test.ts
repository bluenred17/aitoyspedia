import { expect, test } from 'vitest';
import { scanUnsafeHtml } from '../../scripts/lib/scan-html';

test.each([
  ['<script>alert(1)</script>', 'script'],
  ['<SCRIPT src="x"></SCRIPT>', 'script'],
  ['<iframe src="https://x"></iframe>', 'iframe'],
  ['<object data="x"></object>', 'object'],
  ['<embed src="x">', 'embed'],
  ['<img src="a.png" onerror="alert(1)">', 'event handler'],
  ['<a onclick=\'x()\'>hi</a>', 'event handler'],
  ['[klik](javascript:alert(1))', 'javascript: link'],
  ['<a href="javascript:alert(1)">x</a>', 'javascript: link'],
  ['[x](data:text/html;base64,PHNjcmlwdD4=)', 'data: link'],
  ['<form action="https://evil.example"></form>', 'form'],
])('flags %s', (md, name) => expect(scanUnsafeHtml(md)[0]?.pattern).toBe(name));

test('reports the line number', () => expect(scanUnsafeHtml('aman\n\n<script>x</script>')[0].line).toBe(3));
test('ignores the same text inside code', () => {
  expect(scanUnsafeHtml('```html\n<script>alert(1)</script>\n```')).toEqual([]);
  expect(scanUnsafeHtml('gunakan `<script>` dengan hati-hati')).toEqual([]);
});
test('allows ordinary links, images and https data', () => {
  expect(scanUnsafeHtml('[x](https://a.io) ![y](https://a.io/b.png) <img src="https://a.io/c.webp" alt="z"> <b>tebal</b>')).toEqual([]);
  expect(scanUnsafeHtml('online hover, onboarding, once=1')).toEqual([]);
});
