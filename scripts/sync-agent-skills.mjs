import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePackage } from './validate.mjs';
import { hashSkillFiles, readSkillFiles } from './skill-files.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
const target = resolve(process.argv[2] ?? source);
const check = process.argv.includes('--check');
const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
const entries = await validatePackage(source);
const files = new Map();
const skills = [];

for (const entry of entries) {
  const resources = await readSkillFiles(resolve(source, entry.path));
  const { sha256, files: hashes } = hashSkillFiles(resources);

  for (const [path, content] of resources) {
    for (const directory of ['.agents/skills', '.claude/skills', '.cursor/skills', '.github/skills']) {
      files.set(`${directory}/${entry.name}/${path}`, content);
    }
  }

  skills.push({
    name: entry.name,
    required: true,
    source: { package: manifest.name, version: manifest.version, path: entry.path },
    sha256,
    files: hashes,
  });
}

files.set('jfdevelops.json', `${JSON.stringify({ schemaVersion: 1, skills }, null, 2)}\n`);
files.set('AGENTS.md', `# Project agent instructions\n\nThese convention skills are required. Read them before the corresponding work:\n\n- Naming or renaming files, symbols, packages, or APIs: [.agents/skills/jf-naming-conventions/SKILL.md](.agents/skills/jf-naming-conventions/SKILL.md).\n- Implementing or reviewing code: [.agents/skills/jf-coding-conventions/SKILL.md](.agents/skills/jf-coding-conventions/SKILL.md).\n- Any Git decision, including initialization, branch names, commits, and PRs: [.agents/skills/jf-git/SKILL.md](.agents/skills/jf-git/SKILL.md). Read the current repository conventions before applying its shared defaults.\n\nRead relevant repository instructions as well. These skills do not authorize commits, pushes, publishing, or deployments. Preserve existing user changes.\n\nRead CONTRIBUTING.md before changing shared conventions or repository tooling.\n`);
files.set('CLAUDE.md', '# Project instructions\n\nRead AGENTS.md and load each convention skill before its applicable task.\n');
files.set('GEMINI.md', '# Project instructions\n\nRead AGENTS.md and load each convention skill before its applicable task.\n');
files.set('.github/copilot-instructions.md', 'Read AGENTS.md at the repository root and load each convention skill before its applicable task.\n');
files.set('.cursor/rules/jfdevelops.mdc', '---\ndescription: Required jfdevelops project conventions\nalwaysApply: true\n---\n\nRead AGENTS.md at the repository root and load each convention skill before its applicable task.\n');

// Repository bootstrap tooling for these two repos, not an existing-project installer.
// It regenerates owned files. The future init flow must preserve and merge user files.
for (const [path, content] of files) {
  const destination = resolve(target, path);

  if (check) {
    const expected = Buffer.isBuffer(content) ? content : Buffer.from(content);

    if (!(await readFile(destination)).equals(expected)) {
      throw new Error(`Generated file differs: ${path}`);
    }
  } else {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
}

console.log(`${check ? 'Verified' : 'Generated'} ${files.size} convention and agent files in ${target}`);
