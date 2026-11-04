import { expect, test } from 'vitest';
import { setFrontmatterField } from '../../scripts/lib/update-frontmatter';

test('replaces only stars and keeps the rest byte-identical', () => {
  const raw = '---\ntitle: "A: b"\nstars: 1\ninstall: |\n  x\n---\nbody\n';
  expect(setFrontmatterField(raw, 'stars', 9)).toBe(raw.replace('stars: 1', 'stars: 9'));
});

test('adds the field before the closing marker when missing', () => {
  expect(setFrontmatterField('---\ntitle: x\n---\nbody\n', 'stars', 3)).toBe(
    '---\ntitle: x\nstars: 3\n---\nbody\n',
  );
});

test('does not touch an indented line inside a block scalar', () => {
  const raw = '---\ninstall: |\n  stars: 5\n---\nbody';
  expect(setFrontmatterField(raw, 'stars', 7)).toBe('---\ninstall: |\n  stars: 5\nstars: 7\n---\nbody');
});

test('leaves the body alone even if it mentions stars', () => {
  const raw = '---\nstars: 1\n---\nstars: 1 di badan\n';
  expect(setFrontmatterField(raw, 'stars', 2)).toBe('---\nstars: 2\n---\nstars: 1 di badan\n');
});

test('keeps CRLF line endings', () => {
  expect(setFrontmatterField('---\r\nstars: 1\r\n---\r\nx', 'stars', 4)).toBe('---\r\nstars: 4\r\n---\r\nx');
});

test('throws without frontmatter', () => expect(() => setFrontmatterField('tanpa', 'stars', 1)).toThrow());

test('rejects a field name that is not a plain key', () =>
  expect(() => setFrontmatterField('---\nstars: 1\n---\n', 'st.rs', 2)).toThrow('Nama field tidak valid'));
