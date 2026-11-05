import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../data/categories';
import { ENTRY_TYPES, type EntryTypeKey } from '../data/entry-types';

export type AnyEntry = { [K in EntryTypeKey]: CollectionEntry<K> }[EntryTypeKey];

export interface Entry {
  type: EntryTypeKey;
  slug: string;
  url: string;
  data: AnyEntry['data'];
  entry: AnyEntry;
}

const byNewest = (a: Entry, b: Entry) =>
  b.data.added.getTime() - a.data.added.getTime() || a.data.title.localeCompare(b.data.title);

export async function getEntriesByType(type: EntryTypeKey): Promise<Entry[]> {
  const items = (await getCollection(type)) as AnyEntry[];
  return items
    .map((entry) => ({ type, slug: entry.id, url: `/${type}/${entry.id}/`, data: entry.data, entry }))
    .sort(byNewest);
}

export async function getAllEntries(): Promise<Entry[]> {
  const groups = await Promise.all(ENTRY_TYPES.map((t) => getEntriesByType(t.key)));
  return groups.flat().sort(byNewest);
}

export function countByCategory(entries: Entry[]): Map<string, number> {
  const counts = new Map<string, number>(CATEGORIES.map((c) => [c.slug, 0]));
  for (const e of entries) counts.set(e.data.category, (counts.get(e.data.category) ?? 0) + 1);
  return counts;
}
