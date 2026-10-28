import { resolve } from 'node:path';

export const inject = ['workspaceRegistry'];

// Allow headless installs to register a workspace without an OS folder dialog.
export async function apply(ctx) {
  const path = process.env.WORKBENCH_WORKSPACE?.trim();
  if (path) await ctx.workspaceRegistry.create(resolve(path));
}
