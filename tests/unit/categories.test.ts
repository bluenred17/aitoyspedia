import { expect, test } from 'vitest';
import { CATEGORIES, CATEGORY_SLUGS, getCategoryLabel } from '../../src/data/categories';

test('has the 16 legacy categories plus keamanan', () => {
  expect(CATEGORIES).toHaveLength(17);
  expect(CATEGORY_SLUGS).toContain('keamanan');
  expect(getCategoryLabel('keamanan')).toBe('Keamanan');
});
test('slugs match legacy URLs', () =>
  expect(CATEGORY_SLUGS).toEqual(
    expect.arrayContaining([
      'audio', 'music-gen', 'voiceover', 'bisnis', 'coding', 'image', 'image-editing',
      'text-to-image', 'marketing', 'seo', 'productivity', 'video', 'image-to-video',
      'text-to-video', 'writing', 'copywriting',
    ]),
  ));
test('resolves labels', () => expect(getCategoryLabel('text-to-video')).toBe('Text to Video'));
