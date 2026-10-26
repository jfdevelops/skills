import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePackage } from './validate.mjs';
import { readSkillFiles } from './skill-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(tmpdir(), 'jf-skills-pack-'));

try {
  const entries = await validatePackage(root);
  const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts', '--cache', cache], { cwd: root, encoding: 'utf8' });
  const [pack] = JSON.parse(output);
  const paths = new Set(pack.files.map((file) => file.path));

  for (const entry of entries) {
    const resources = await readSkillFiles(join(root, entry.path));

    for (const path of resources.keys()) {
      assert(paths.has(`${entry.path.slice(2)}/${path}`), `Published package omits ${entry.name}/${path}`);
    }
  }

  assert(paths.has('schemas/package-skills.schema.json'));
  assert([...paths].every((path) => !path.startsWith('.agents/') && !path.startsWith('test/')));
  console.log(`Package contents verified: ${pack.files.length} files.`);
} finally {
  await rm(cache, { recursive: true, force: true });
}
