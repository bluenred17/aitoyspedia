import { expect, test } from 'vitest';
import { httpsUrl } from '../../src/lib/https-url';

test('accepts an https URL', () => expect(httpsUrl.safeParse('https://github.com/a/b/blob/main/README.md').success).toBe(true));
test.each(['http://github.com/a', 'javascript:alert(1)', 'data:text/html,x', 'ftp://x.io/a', 'github.com/a', ''])(
  'rejects %s',
  (u) => expect(httpsUrl.safeParse(u).success).toBe(false),
);
