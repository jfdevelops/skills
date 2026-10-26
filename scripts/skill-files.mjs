import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function readSkillFiles(directory, prefix = '') {
  const files = new Map();
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = resolve(directory, entry.name);

    assert(!entry.isSymbolicLink(), `Skill resources must not be symlinks: ${path}`);

    if (entry.isDirectory()) {
      const nested = await readSkillFiles(absolute, path);

      for (const [name, content] of nested) {
        files.set(name, content);
      }
    } else {
      assert(entry.isFile(), `Unsupported skill resource: ${path}`);
      files.set(path, await readFile(absolute));
    }
  }

  return files;
}
