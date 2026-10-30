import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { hashSkillFiles } from '../scripts/skill-files.mjs';
import { validatePackage, validateSkill } from '../scripts/validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('the actual package registers every required convention skill', async () => {
  const entries = await validatePackage(root);

  assert.deepEqual(entries.map((entry) => entry.name).sort(), [
    'jf-coding-conventions',
    'jf-git',
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

for (const scenario of ['duplicate', 'traversal', 'missing', 'unregistered', 'symlink', 'missing-reference']) {
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

      if (scenario === 'missing-reference') {
        await writeFile(join(target, 'skills/sample/SKILL.md'), '---\nname: sample\ndescription: Sample skill.\n---\nRead [branches](references/missing.md).\n');
      }

      await writeFile(join(target, 'package.json'), JSON.stringify(manifest));
      await assert.rejects(validatePackage(target));
    } finally {
      await rm(target, { recursive: true, force: true });
    }
  });
}

test('sync preserves all Git references and detects edits to a generated reference', async () => {
  const target = await mkdtemp(join(tmpdir(), 'jf-skills-sync-'));
  const script = join(root, 'scripts/sync-agent-skills.mjs');

  try {
    execFileSync(process.execPath, [script, target]);
    execFileSync(process.execPath, [script, target]);
    execFileSync(process.execPath, [script, target, '--check']);

    for (const directory of ['.agents/skills', '.claude/skills', '.cursor/skills', '.github/skills']) {
      for (const name of ['branches', 'commits', 'pull-requests']) {
        const path = `references/${name}.md`;

        assert.equal(await readFile(join(target, directory, 'jf-git', path), 'utf8'), await readFile(join(root, 'skills/jf-git', path), 'utf8'));
      }
    }

    await writeFile(join(target, '.agents/skills/jf-git/references/commits.md'), 'Local change\n');
    assert.throws(() => execFileSync(process.execPath, [script, target, '--check'], { stdio: 'pipe' }));
  } finally {
    await rm(target, { recursive: true, force: true });
  }
});

test('the skill digest covers every resource, not only SKILL.md', () => {
  const skill = Buffer.from('---\nname: sample\ndescription: Sample skill.\n---\n# Sample\n');
  const notes = Buffer.from('Notes\n');
  const original = hashSkillFiles(new Map([['SKILL.md', skill], ['references/notes.md', notes]]));
  const edited = hashSkillFiles(new Map([['SKILL.md', skill], ['references/notes.md', Buffer.from('Edited\n')]]));
  const reordered = hashSkillFiles(new Map([['references/notes.md', notes], ['SKILL.md', skill]]));

  assert.equal(original.files['SKILL.md'], edited.files['SKILL.md']);
  assert.notEqual(original.sha256, original.files['SKILL.md']);
  assert.notEqual(original.sha256, edited.sha256);
  assert.equal(original.sha256, reordered.sha256);
});
