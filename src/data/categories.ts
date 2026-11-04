export const CATEGORIES = [
  { slug: 'audio', label: 'Audio' },
  { slug: 'music-gen', label: 'Music Gen' },
  { slug: 'voiceover', label: 'Voiceover' },
  { slug: 'bisnis', label: 'Bisnis' },
  { slug: 'coding', label: 'Coding' },
  { slug: 'image', label: 'Image' },
  { slug: 'image-editing', label: 'Image Editing' },
  { slug: 'text-to-image', label: 'Text to Image' },
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'seo', label: 'SEO' },
  { slug: 'productivity', label: 'Productivity' },
  { slug: 'video', label: 'Video' },
  { slug: 'image-to-video', label: 'Image to Video' },
  { slug: 'text-to-video', label: 'Text to Video' },
  { slug: 'writing', label: 'Writing' },
  { slug: 'copywriting', label: 'Copywriting' },
] as const;

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [
  (typeof CATEGORIES)[number]['slug'],
  ...(typeof CATEGORIES)[number]['slug'][],
];

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
