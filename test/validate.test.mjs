import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { validatePackage, validateSkill } from '../scripts/validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('the actual package registers every required convention skill', async () => {
  const entries = await validatePackage(root);

  assert.deepEqual(entries.map((entry) => entry.name).sort(), [
    'jf-coding-conventions',
    'jf-commit-conventions',
    'jf-git-workflow',
    'jf-naming-conventions',
  ]);
});

test('a skill must have matching metadata and substantive content', () => {
  const skill = '---\nname: sample\ndescription: Sample skill.\n---\n# Sample\n';

  validateSkill(skill, 'sample');
  assert.throws(() => validateSkill(skill, 'different'));
  assert.throws(() => validateSkill(skill.replace('# Sample', ''), 'sample'));
  assert.throws(() => validateSkill(skill.replace('Sample skill.', 'Sample: unsafe YAML'), 'sample'));
});

for (const scenario of ['duplicate', 'traversal', 'missing', 'unregistered', 'symlink']) {
  test(`rejects ${scenario} package skill declarations`, async () => {
    const target = await mkdtemp(join(tmpdir(), 'jf-skills-test-'));

    try {
      const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));

      manifest.jfdevelops.skills = [{ name: 'sample', path: './skills/sample' }];
      await mkdir(join(target, 'skills/sample'), { recursive: true });
      await writeFile(join(target, 'skills/sample/SKILL.md'), '---\nname: sample\ndescription: Sample skill.\n---\n# Sample\n');

      if (scenario === 'duplicate') {
        manifest.jfdevelops.skills.push({ ...manifest.jfdevelops.skills[0] });
      }

      if (scenario === 'traversal') {
        manifest.jfdevelops.skills[0].path = './../outside';
      }

      if (scenario === 'missing') {
        await rm(join(target, 'skills/sample/SKILL.md'));
      }

      if (scenario === 'unregistered') {
        await mkdir(join(target, 'skills/extra'));
      }

      if (scenario === 'symlink') {
        await rm(join(target, 'skills/sample/SKILL.md'));
        await symlink(join(root, 'skills/jf-coding-conventions/SKILL.md'), join(target, 'skills/sample/SKILL.md'));
      }

      await writeFile(join(target, 'package.json'), JSON.stringify(manifest));
      await assert.rejects(validatePackage(target));
    } finally {
      await rm(target, { recursive: true, force: true });
    }
  });
}
