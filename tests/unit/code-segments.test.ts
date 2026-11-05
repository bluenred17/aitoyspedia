import { expect, test } from 'vitest';
import { mapOutsideCode } from '../../scripts/lib/code-segments';

const up = (s: string) => mapOutsideCode(s, (t) => t.toUpperCase());

test('changes text outside code only', () => expect(up('a `b` c')).toBe('A `b` C'));
test('keeps a fenced block untouched', () => expect(up('x\n```\nkode\n```\ny')).toBe('X\n```\nkode\n```\nY'));
test('keeps a tilde fence untouched', () => expect(up('x\n~~~\nkode\n~~~\ny')).toBe('X\n~~~\nkode\n~~~\nY'));
test('a triple backtick in the middle of a line does not open a fence', () =>
  expect(up('teks ``` sebaris\nsesudahnya')).toBe('TEKS ``` SEBARIS\nSESUDAHNYA'));
test('a longer fence is closed only by an equal or longer one', () =>
  expect(up('````\n```\nmasih kode\n```\n````\nluar')).toBe('````\n```\nmasih kode\n```\n````\nLUAR'));
test('a tilde line inside a backtick fence does not close it', () =>
  expect(up('```\n~~~\nmasih kode\n```\nluar')).toBe('```\n~~~\nmasih kode\n```\nLUAR'));
test('an unclosed fence runs to the end, like Markdown does', () =>
  expect(up('luar\n```\nkode tanpa penutup')).toBe('LUAR\n```\nkode tanpa penutup'));
test('an indented fence of up to three spaces still counts', () =>
  expect(up('  ```\nkode\n  ```\nluar')).toBe('  ```\nkode\n  ```\nLUAR'));
test('keeps CRLF line endings', () => expect(up('a\r\n```\r\nb\r\n```\r\nc')).toBe('A\r\n```\r\nb\r\n```\r\nC'));
