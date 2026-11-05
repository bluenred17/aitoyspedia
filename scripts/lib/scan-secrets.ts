export interface SecretHit {
  line: number;
  pattern: string;
}

const PATTERNS: { name: string; re: RegExp }[] = [
  { name: 'sk-ant-', re: /\bsk-ant-[A-Za-z0-9_-]{10,}/ },
  { name: 'sk-', re: /\bsk-[A-Za-z0-9_-]{20,}/ },
  { name: 'ghp_', re: /\bghp_[A-Za-z0-9]{36}\b/ },
  { name: 'github_pat_', re: /\bgithub_pat_[A-Za-z0-9_]{20,}/ },
  { name: 'AKIA', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'xoxb-/xoxp-', re: /\bxox[bp]-[A-Za-z0-9-]{10,}/ },
  { name: 'PRIVATE KEY', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

export function scanText(text: string): SecretHit[] {
  const hits: SecretHit[] = [];
  text.split(/\r?\n/).forEach((lineText, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(lineText)) hits.push({ line: i + 1, pattern: name });
    }
  });
  return hits;
}
