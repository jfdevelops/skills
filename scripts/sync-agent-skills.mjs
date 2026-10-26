import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePackage } from './validate.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
const target = resolve(process.argv[2] ?? source);
const check = process.argv.includes('--check');
const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
const entries = await validatePackage(source);
const files = new Map();
const skills = [];

for (const entry of entries) {
  const content = await readFile(resolve(source, entry.path, 'SKILL.md'), 'utf8');

  for (const directory of ['.agents/skills', '.claude/skills', '.cursor/skills', '.github/skills']) {
    files.set(`${directory}/${entry.name}/SKILL.md`, content);
  }

  skills.push({
    name: entry.name,
    required: true,
    source: { package: manifest.name, version: manifest.version, path: entry.path },
    sha256: createHash('sha256').update(content).digest('hex'),
  });
}

files.set('jfdevelops.json', `${JSON.stringify({ schemaVersion: 1, skills }, null, 2)}\n`);
files.set('AGENTS.md', `# Project agent instructions\n\nThese convention skills are required. Read them before the corresponding work:\n\n- Naming or renaming files, symbols, packages, or APIs: [.agents/skills/jf-naming-conventions/SKILL.md](.agents/skills/jf-naming-conventions/SKILL.md).\n- Implementing or reviewing code: [.agents/skills/jf-coding-conventions/SKILL.md](.agents/skills/jf-coding-conventions/SKILL.md).\n- Initializing Git or starting a section or idea: [.agents/skills/jf-git-workflow/SKILL.md](.agents/skills/jf-git-workflow/SKILL.md).\n- Staging or committing changes: [.agents/skills/jf-commit-conventions/SKILL.md](.agents/skills/jf-commit-conventions/SKILL.md).\n\nRead relevant repository instructions as well. These skills do not authorize commits, pushes, publishing, or deployments. Preserve existing user changes.\n\nRead CONTRIBUTING.md before changing shared conventions or repository tooling.\n`);
files.set('CLAUDE.md', '# Project instructions\n\nRead AGENTS.md and load each convention skill before its applicable task.\n');
files.set('GEMINI.md', '# Project instructions\n\nRead AGENTS.md and load each convention skill before its applicable task.\n');
files.set('.github/copilot-instructions.md', 'Read AGENTS.md at the repository root and load each convention skill before its applicable task.\n');
files.set('.cursor/rules/jfdevelops.mdc', '---\ndescription: Required jfdevelops project conventions\nalwaysApply: true\n---\n\nRead AGENTS.md at the repository root and load each convention skill before its applicable task.\n');

// Repository bootstrap tooling for these two repos, not an existing-project installer.
// It regenerates owned files. The future init flow must preserve and merge user files.
for (const [path, content] of files) {
  const destination = resolve(target, path);

  if (check) {
    if (await readFile(destination, 'utf8') !== content) {
      throw new Error(`Generated file differs: ${path}`);
    }
  } else {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
}

console.log(`${check ? 'Verified' : 'Generated'} ${files.size} convention and agent files in ${target}`);
