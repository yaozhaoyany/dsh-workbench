import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { apply } from '../plugins/workspace/index.mjs';

test('workspace bootstrap only registers an explicitly configured directory', async () => {
  const previous = process.env.WORKBENCH_WORKSPACE;
  const calls = [];
  const ctx = { workspaceRegistry: { async create(path) { calls.push(path); } } };
  try {
    delete process.env.WORKBENCH_WORKSPACE;
    await apply(ctx);
    assert.deepEqual(calls, []);
    process.env.WORKBENCH_WORKSPACE = ' ./test ';
    await apply(ctx);
    assert.deepEqual(calls, [resolve('./test')]);
  } finally {
    if (previous === undefined) delete process.env.WORKBENCH_WORKSPACE;
    else process.env.WORKBENCH_WORKSPACE = previous;
  }
});
