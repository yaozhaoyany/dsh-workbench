import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const launcher = fileURLToPath(new URL('../scripts/dsh.mjs', import.meta.url));

test('launcher works outside the repository and forwards arguments without initializing user data', () => {
  const temporary = mkdtempSync(join(tmpdir(), 'dsh workbench '));
  const home = join(temporary, 'isolated home');
  try {
    const result = spawnSync(process.execPath, [launcher, '--help'], {
      cwd: temporary,
      env: { ...process.env, DSH_HOME: home },
      encoding: 'utf8',
      timeout: 30_000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Usage:.*dsh/);
    assert.equal(existsSync(home), false);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('missing profile returns a failure to the caller', () => {
  const result = spawnSync(process.execPath, [launcher], {
    encoding: 'utf8',
    timeout: 30_000,
  });
  assert.ifError(result.error);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--profile <name> is required/);
});
