import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const cli = join(dirname(require.resolve('@deepseek-ai/dsh/package.json')), 'lib', 'bin.js');
const child = spawn(process.execPath, [cli, ...process.argv.slice(2)], {
  cwd: root,
  env: {
    ...process.env,
    DSH_HOME: resolve(root, process.env.DSH_HOME || '.dsh-codex'),
  },
  stdio: 'inherit',
});

// Forward service-manager termination to the process that owns the server.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', (error) => {
  console.error(`Unable to start dsh: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal === 'SIGINT' ? 130 : 1);
});
