export type EntryTypeKey = 'prompts' | 'tools' | 'skills' | 'plugins' | 'connectors';

export interface EntryType {
  key: EntryTypeKey;
  label: string;
  singular: string;
  copyLabel: string;
}

export const ENTRY_TYPES: readonly EntryType[] = [
  { key: 'prompts', label: 'Prompt', singular: 'prompt', copyLabel: 'Salin prompt' },
  { key: 'tools', label: 'Tools', singular: 'tool', copyLabel: 'Salin pasang' },
  { key: 'skills', label: 'Skills', singular: 'skill', copyLabel: 'Salin pasang' },
  { key: 'plugins', label: 'Plugins', singular: 'plugin', copyLabel: 'Salin pasang' },
  { key: 'connectors', label: 'Connectors', singular: 'connector', copyLabel: 'Salin pasang' },
];

export function getEntryType(key: string): EntryType | undefined {
  return ENTRY_TYPES.find((t) => t.key === key);
}
