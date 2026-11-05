import { expect, test } from 'vitest';
import { refreshAll } from '../../scripts/lib/refresh-all';

const f = (repo: string, n: number) => ({ path: repo, raw: `---\nrepo: ${repo}\nstars: ${n}\n---\n` });

test('one failure keeps the old value and others proceed', async () => {
  const r = await refreshAll([f('a/ok', 1), f('a/bad', 2)], async (x) => {
    if (x === 'a/bad') throw new Error('502');
    return 5;
  });
  expect(r.updated).toHaveLength(1);
  expect(r.updated[0].raw).toContain('stars: 5');
  expect(r.failed).toEqual([{ path: 'a/bad', error: '502' }]);
});

test('skips entries without repo', async () => {
  const r = await refreshAll([{ path: 'p', raw: '---\ntitle: x\n---\n' }], async () => 1);
  expect(r.updated).toEqual([]);
  expect(r.failed).toEqual([]);
});

test('does not report an unchanged count as updated', async () => {
  const r = await refreshAll([f('a/same', 5)], async () => 5);
  expect(r.updated).toEqual([]);
});
