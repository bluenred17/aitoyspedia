import { posix } from 'node:path';
import { cleanReadme } from './lib/clean-readme';
import { parseGithubUrl, toRawUrl } from './lib/github-url';
import { rewriteLinks } from './lib/rewrite-links';

interface RepoInfo {
  stargazers_count: number;
  default_branch: string;
  license: { spdx_id: string | null } | null;
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'User-Agent': 'ai-encyclopedia-fetch-readme', Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function getRepo(owner: string, repo: string): Promise<RepoInfo> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers: headers() });
  if (res.status === 404) throw new Error(`Repo tidak ditemukan: ${owner}/${repo}`);
  if (res.status === 403 || res.status === 429) {
    throw new Error('Batas permintaan GitHub tercapai. Atur GITHUB_TOKEN atau coba lagi nanti.');
  }
  if (!res.ok) throw new Error(`GitHub API mengembalikan ${res.status} untuk ${owner}/${repo}`);
  return (await res.json()) as RepoInfo;
}

async function main(): Promise<void> {
  const input = process.argv[2];
  if (!input) throw new Error('Pemakaian: tsx scripts/fetch-readme.ts <url>');

  const parsed = parseGithubUrl(input);
  const info = await getRepo(parsed.owner, parsed.repo);
  const ref = parsed.ref ?? info.default_branch;

  const rawUrl = toRawUrl(parsed, ref);
  const res = await fetch(rawUrl, { headers: { 'User-Agent': headers()['User-Agent'] } });
  if (res.status === 404) throw new Error(`README tidak ditemukan: ${rawUrl}`);
  if (!res.ok) throw new Error(`Gagal mengambil README (${res.status}): ${rawUrl}`);
  const raw = await res.text();

  const dir = posix.dirname(parsed.path);
  const dirPart = dir === '.' ? '' : `${dir}/`;
  const slug = `${parsed.owner}/${parsed.repo}`;
  const baseBlob = `https://github.com/${slug}/blob/${ref}/${dirPart}`;
  const baseRaw = `https://raw.githubusercontent.com/${slug}/${ref}/${dirPart}`;

  const spdx = info.license?.spdx_id;
  const result = {
    source_url: `https://github.com/${slug}/blob/${ref}/${parsed.path}`,
    repo: slug,
    stars: info.stargazers_count,
    license: spdx && spdx !== 'NOASSERTION' ? spdx : null,
    default_branch: info.default_branch,
    markdown: rewriteLinks(cleanReadme(raw), baseBlob, baseRaw),
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
