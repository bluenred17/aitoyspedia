import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { parse } from 'yaml';

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8');

interface Step {
  name?: string;
  run?: string;
  uses?: string;
  env?: Record<string, string>;
}
interface Workflow {
  on: Record<string, unknown>;
  permissions?: Record<string, string>;
  concurrency?: { group?: string; 'cancel-in-progress'?: boolean };
  jobs: Record<string, { steps: Step[]; env?: Record<string, string> }>;
}

const raw = read('.github/workflows/deploy.yml');
const wf = parse(raw) as Workflow;
const steps = Object.values(wf.jobs).flatMap((j) => j.steps);
const indexOf = (needle: string) => steps.findIndex((s) => (s.run ?? '').includes(needle));

describe('deploy workflow', () => {
  test('runs only on push to main, never on pull requests', () => {
    expect(Object.keys(wf.on)).toEqual(['push']);
    expect((wf.on.push as { branches: string[] }).branches).toEqual(['main']);
  });

  test('grants the token read-only access', () => {
    expect(wf.permissions).toEqual({ contents: 'read' });
  });

  test('never runs two deploys at once and never cancels one midway', () => {
    expect(wf.concurrency?.group).toBeTruthy();
    expect(wf.concurrency?.['cancel-in-progress']).toBe(false);
  });

  test('tests and builds before it deploys, in the order the spec gives', () => {
    const order = ['npm ci', 'npm run check', 'npm test', 'npm run build', 'npm run test:e2e', 'rsync'].map(indexOf);
    expect(order.every((i) => i >= 0), `a step is missing: ${order}`).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  test('verifies the server host key instead of trusting any host', () => {
    expect(raw).not.toMatch(/StrictHostKeyChecking[= ]+no/i);
    expect(raw).not.toMatch(/StrictHostKeyChecking[= ]+accept-new/i);
    expect(raw).toContain('StrictHostKeyChecking=yes');
    expect(raw).toContain('DEPLOY_KNOWN_HOSTS');
  });

  test('takes the host, user and key from secrets only', () => {
    for (const name of ['DEPLOY_HOST', 'DEPLOY_USER', 'DEPLOY_SSH_KEY', 'DEPLOY_KNOWN_HOSTS']) {
      expect(raw, name).toContain(`secrets.${name}`);
    }
    expect(raw).not.toMatch(/BEGIN [A-Z ]*PRIVATE KEY/);
  });

  test('deploys into a per-commit release and swaps a symlink atomically', () => {
    expect(raw).toContain('releases/${{ github.sha }}');
    // Path boleh diapit tanda kutip, jadi dicocokkan per kata, bukan dengan spasi tepat.
    expect(raw).toMatch(/ln -sfn \S+ \S*current\.tmp\S*/);
    expect(raw).toMatch(/mv -T \S*current\.tmp\S* \S*\/current\S*/);
  });

  test('keeps the three newest releases for rollback', () => {
    expect(raw).toContain('tail -n +4');
  });

  test('the SSH key file is not world readable', () => {
    expect(raw).toMatch(/chmod 600 .*deploy_key/);
  });
});

describe('nginx reference config', () => {
  const conf = read('deploy/nginx-ai-encyclopedia.conf');

  test('serves the current release with clean-URL fallbacks', () => {
    expect(conf).toContain('root /var/www/ai-encyclopedia/current');
    expect(conf).toContain('try_files $uri $uri/ $uri.html =404');
    expect(conf).toContain('error_page 404 /404.html');
  });

  test('blocks indexing on every response, including the ones from cached asset locations', () => {
    const locationBlocks = conf.match(/location [^{]+\{[^}]*\}/g) ?? [];
    expect(conf).toContain('add_header X-Robots-Tag "noindex" always;');
    // add_header dalam sebuah location menggantikan yang diwarisi, jadi tiap location harus mengulanginya.
    for (const block of locationBlocks.filter((b) => b.includes('add_header'))) {
      expect(block, block).toContain('X-Robots-Tag');
    }
  });

  test('does not proxy to the old Express app', () => {
    expect(conf).not.toContain('proxy_pass');
  });
});
