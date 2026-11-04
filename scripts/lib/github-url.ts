export interface ParsedGithubUrl {
  owner: string;
  repo: string;
  ref: string | null;
  path: string;
}

const stripGit = (repo: string) => repo.replace(/\.git$/i, '');

export function parseGithubUrl(input: string): ParsedGithubUrl {
  // URL di situs lama kadang berakhiran backtick (%60) akibat salah ketik.
  const cleaned = input.trim().replace(/(?:`|%60)+$/i, '');
  let url: URL;
  try {
    url = new URL(cleaned);
  } catch {
    throw new Error(`URL tidak valid: ${input}`);
  }
  const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);

  if (url.hostname === 'raw.githubusercontent.com') {
    const [owner, repo, ref, ...rest] = parts;
    if (!owner || !repo || !ref || rest.length === 0) throw new Error(`URL raw tidak lengkap: ${input}`);
    return { owner, repo: stripGit(repo), ref, path: rest.join('/') };
  }
  if (url.hostname !== 'github.com' && url.hostname !== 'www.github.com') {
    throw new Error(`Bukan URL GitHub: ${input}`);
  }

  const [owner, repo, kind, ref, ...rest] = parts;
  if (!owner || !repo) throw new Error(`URL GitHub harus memuat pemilik dan repo: ${input}`);
  const base = { owner, repo: stripGit(repo) };
  if (!kind) return { ...base, ref: null, path: 'README.md' };
  if (kind === 'blob' && ref && rest.length > 0) return { ...base, ref, path: rest.join('/') };
  if (kind === 'tree' && ref) return { ...base, ref, path: [...rest, 'README.md'].join('/') };
  throw new Error(`Bentuk URL GitHub tidak dikenali: ${input}`);
}

export function toRawUrl(p: ParsedGithubUrl, ref: string): string {
  return `https://raw.githubusercontent.com/${p.owner}/${p.repo}/${ref}/${p.path}`;
}
