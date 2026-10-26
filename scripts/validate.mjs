import assert from 'node:assert/strict';
import { readFile, readdir, realpath } from 'node:fs/promises';
import { basename, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));

// This repository deliberately uses two plain, single-line YAML scalars.
// This is a source validator, not a general-purpose YAML or third-party skill parser.
export function validateSkill(content, name) {
  const match = content.match(/^---\nname: ([a-z0-9-]+)\ndescription: ([^\n]+)\n---\n([\s\S]+)$/);

  assert(match, `${name}: expected name and description frontmatter and a body`);
  assert.equal(match[1], name, `${name}: directory and frontmatter names differ`);
  assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(name.length <= 64, `${name}: name is too long`);
  assert(match[2].trim().length > 0 && match[2].length <= 1024, `${name}: invalid description`);
  assert(!/[:#\[\]{}]/.test(match[2]), `${name}: description must be a plain YAML scalar`);
  assert(match[3].trim().length > 0, `${name}: empty body`);
}

export async function validatePackage(root) {
  const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const entries = manifest.jfdevelops?.skills;

  assert(Array.isArray(entries) && entries.length > 0, 'Expected a nonempty jfdevelops.skills array');
  assert.deepEqual(Object.keys(manifest.jfdevelops).sort(), ['skills']);

  const names = new Set();
  const paths = new Set();
  const realRoot = await realpath(root);

  for (const entry of entries) {
    assert.deepEqual(Object.keys(entry).sort(), ['name', 'path']);
    assert.equal(typeof entry.name, 'string');
    assert.equal(typeof entry.path, 'string');
    assert.match(entry.path, /^\.\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/);
    assert(!names.has(entry.name), `Duplicate skill name: ${entry.name}`);
    assert(!paths.has(entry.path), `Duplicate skill path: ${entry.path}`);
    names.add(entry.name);
    paths.add(entry.path);

    const directory = await realpath(resolve(root, entry.path));
    const file = await realpath(resolve(directory, 'SKILL.md'));

    for (const target of [directory, file]) {
      const local = relative(realRoot, target);

      assert(local !== '..' && !local.startsWith(`..${sep}`), 'Skill paths must remain inside the package');
    }

    assert.equal(basename(directory), entry.name);
    validateSkill(await readFile(file, 'utf8'), entry.name);
  }

  const directories = (await readdir(resolve(root, 'skills'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

  assert.deepEqual([...names].sort(), directories, 'Every bundled skill must be registered');

  return entries;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const entries = await validatePackage(packageRoot);

  console.log(`Validated ${entries.length} registered skills.`);
}
