import { expect, test } from 'vitest';
import { findBrokenRelated } from '../../scripts/lib/validate-related';

test('finds a missing related target', () =>
  expect(
    findBrokenRelated([{ id: 'skills/a', related: ['tools/tidak-ada'] }]),
  ).toEqual([{ id: 'skills/a', target: 'tools/tidak-ada' }]));

test('accepts targets that exist', () =>
  expect(
    findBrokenRelated([
      { id: 'skills/a', related: ['tools/b'] },
      { id: 'tools/b', related: [] },
    ]),
  ).toEqual([]));
