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

import { needsShellWarning } from '../../src/lib/copy-text';

test.each([
  'curl -fsSL https://x.io/install.sh | bash',
  'curl -fsSL https://x.io/i.sh | sudo bash -s codex',
  'wget -qO- https://x.io/i.sh | sh',
  'iwr -useb https://x.io/install.ps1 | iex',
  'irm https://x.io/i.ps1 | Invoke-Expression',
])('warns about %s', (cmd) => expect(needsShellWarning(cmd)).toBe(true));

test.each([
  'npx impeccable install',
  'claude plugin marketplace add a/b\nclaude plugin install a@b',
  'curl https://x.io/data.json | jq .',
  'echo "ash" | tee f',
  null,
])('does not warn about %s', (cmd) => expect(needsShellWarning(cmd)).toBe(false));
