import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePackage } from './validate.mjs';
import { readSkillFiles } from './skill-files.mjs';

// Installs this checkout with the pinned `skills` CLI, the documented GitHub-based
// installer, and verifies every registered skill arrives intact.
const root = fileURLToPath(new URL('../', import.meta.url));
const cli = resolve(root, 'node_modules/skills/bin/cli.mjs');
const project = await mkdtemp(join(tmpdir(), 'jf-skills-install-'));

try {
  const entries = await validatePackage(root);
  const names = entries.map((entry) => entry.name);

  execFileSync(process.execPath, [cli, 'add', root, '--skill', ...names, '--agent', 'codex', '--copy', '--yes'], {
    cwd: project,
    env: { ...process.env, DISABLE_TELEMETRY: '1' },
    stdio: 'pipe',
  });

  const installed = resolve(project, '.agents/skills');

  assert.deepEqual((await readdir(installed)).sort(), [...names].sort());

  for (const entry of entries) {
    const expected = await readSkillFiles(resolve(root, entry.path));
    const actual = await readSkillFiles(resolve(installed, entry.name));

    assert.deepEqual([...actual.keys()].sort(), [...expected.keys()].sort(), `Installed files differ: ${entry.name}`);

    for (const [path, content] of expected) {
      assert(content.equals(await readFile(resolve(installed, entry.name, path))), `Installed content differs: ${entry.name}/${path}`);
    }
  }

  console.log(`Installer verified: ${names.length} skills.`);
} finally {
  await rm(project, { recursive: true, force: true });
}
