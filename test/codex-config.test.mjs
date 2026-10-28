import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

test('Codex backend composes from tracked configuration in a fresh data directory', () => {
  const home = mkdtempSync(join(tmpdir(), 'dsh-codex-config-'));
  const launcher = fileURLToPath(new URL('../scripts/dsh.mjs', import.meta.url));
  try {
    const result = spawnSync(process.execPath, [
      launcher, '--profile', 'web', '--patch', 'config/codex.patch.yml', '--dump-config',
    ], {
      env: { ...process.env, DSH_HOME: home },
      encoding: 'utf8',
      timeout: 30_000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /relay-dsh-plugin-codex/);
    assert.match(result.stdout, /relay-dsh-plugin-session-import/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test('the lockfile keeps every dsh component on the plugin-tested baseline', async () => {
  const { readFile } = await import('node:fs/promises');
  const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const packages = Object.entries(lock.packages).filter(([path]) => /(?:^|\/)node_modules\/@deepseek-ai\/dsh(?:-[^/]+)?$/.test(path));
  assert.ok(packages.length > 0);
  for (const [path, entry] of packages) assert.equal(entry.version, '0.1.6-alpha.1', path);
});
