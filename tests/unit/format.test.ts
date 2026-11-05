import { expect, test } from 'vitest';
import { formatStars } from '../../src/lib/format';

test.each([
  [0, '0'],
  [999, '999'],
  [1000, '1K'],
  [12106, '12.1K'],
  [109800, '109.8K'],
  [112504, '112.5K'],
  [1234567, '1.2M'],
])('formats %i as %s', (n, out) => expect(formatStars(n)).toBe(out));
