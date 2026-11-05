import { setFrontmatterField } from './update-frontmatter';

export interface RawFile {
  path: string;
  raw: string;
}

export interface RefreshResult {
  updated: RawFile[];
  failed: { path: string; error: string }[];
}

const REPO = /^repo:\s*["']?([^\s"']+)["']?\s*$/m;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

export async function refreshAll(
  files: RawFile[],
  getStars: (repo: string) => Promise<number>,
): Promise<RefreshResult> {
  const result: RefreshResult = { updated: [], failed: [] };
  for (const file of files) {
    const fm = FRONTMATTER.exec(file.raw);
    const repo = fm ? REPO.exec(fm[1])?.[1] : undefined;
    if (!repo) continue;
    try {
      const raw = setFrontmatterField(file.raw, 'stars', await getStars(repo));
      if (raw !== file.raw) result.updated.push({ path: file.path, raw });
    } catch (err) {
      result.failed.push({ path: file.path, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return result;
}
