export interface RelatedEntry {
  id: string;
  related: string[];
}

export function findBrokenRelated(entries: RelatedEntry[]): { id: string; target: string }[] {
  const ids = new Set(entries.map((e) => e.id));
  return entries.flatMap((e) =>
    e.related.filter((t) => !ids.has(t)).map((target) => ({ id: e.id, target })),
  );
}
