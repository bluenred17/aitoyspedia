import { expect, test } from 'vitest';
import { getCopyText } from '../../src/lib/copy-text';

test('prompt', () => expect(getCopyText('prompts', { prompt: 'halo' })).toBe('halo'));
test('tool uses setup', () => expect(getCopyText('tools', { setup: 'npx x' })).toBe('npx x'));
test('skill uses install', () => expect(getCopyText('skills', { install: 'a\nb\n' })).toBe('a\nb'));
test('plugin and connector use install', () => {
  expect(getCopyText('plugins', { install: 'p' })).toBe('p');
  expect(getCopyText('connectors', { install: 'c' })).toBe('c');
});
test('keeps inner newlines intact', () =>
  expect(getCopyText('skills', { install: 'a\n\nb' })).toBe('a\n\nb'));
test('returns null when the field is missing', () => expect(getCopyText('skills', {})).toBeNull());
