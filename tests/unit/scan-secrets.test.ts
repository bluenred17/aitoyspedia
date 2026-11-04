import { expect, test } from 'vitest';
import { scanText } from '../../scripts/lib/scan-secrets';

test.each([
  'sk-ant-api03-abcdefghijklmnopqrstuv',
  'sk-abcdefghijklmnopqrstuvwxyz123456',
  'ghp_abcdefghijklmnopqrstuvwxyz0123456789',
  'github_pat_11ABCDEFG0abcdefghijkl',
  'AKIAIOSFODNN7EXAMPLE',
  'xoxb-123456789-abcdefghij',
  'xoxp-123456789-abcdefghij',
  '-----BEGIN RSA PRIVATE KEY-----',
])('flags %s', (s) => expect(scanText(s)).not.toEqual([]));

test('reports the line number', () =>
  expect(scanText('aman\nghp_abcdefghijklmnopqrstuvwxyz0123456789')[0].line).toBe(2));

test('ignores placeholders and ordinary words', () => {
  expect(scanText('export KEY=<API_KEY>')).toEqual([]);
  expect(scanText('task-management-framework-for-agents')).toEqual([]);
  expect(scanText('sk-learn')).toEqual([]);
});
