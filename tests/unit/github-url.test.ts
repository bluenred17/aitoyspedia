import { expect, test } from 'vitest';
import { parseGithubUrl, toRawUrl } from '../../scripts/lib/github-url';

const P = (u: string) => parseGithubUrl(u);

test('blob', () =>
  expect(P('https://github.com/a/b/blob/dev/docs/README.md')).toEqual({
    owner: 'a', repo: 'b', ref: 'dev', path: 'docs/README.md',
  }));
test('repo root', () =>
  expect(P('https://github.com/a/b')).toEqual({ owner: 'a', repo: 'b', ref: null, path: 'README.md' }));
test('.git suffix', () => expect(P('https://github.com/a/b.git').repo).toBe('b'));
test('tree folder', () =>
  expect(P('https://github.com/a/b/tree/main/plugin/skills/x').path).toBe('plugin/skills/x/README.md'));
test('tree root has default README', () => expect(P('https://github.com/a/b/tree/main').path).toBe('README.md'));
test('raw', () => expect(P('https://raw.githubusercontent.com/a/b/main/README.md').ref).toBe('main'));
test('strips stray backtick', () =>
  expect(P('https://github.com/a/b/blob/main/README.md`').path).toBe('README.md'));
test('strips encoded backtick', () =>
  expect(P('https://github.com/a/b/blob/main/README.md%60').path).toBe('README.md'));
test('rejects non-GitHub', () => expect(() => P('https://example.com/x')).toThrow());
test('rejects a bare owner', () => expect(() => P('https://github.com/a')).toThrow());
test('builds a raw URL', () =>
  expect(toRawUrl(P('https://github.com/a/b/blob/dev/docs/README.md'), 'dev')).toBe(
    'https://raw.githubusercontent.com/a/b/dev/docs/README.md',
  ));
