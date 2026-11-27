---
title: Installation
description: Install the shared instructions for the agents used in your project.
order: 20
---

Install the skills from your project root with the `skills` CLI. The installation workflow requires Node.js 22.20 or newer.

## Install interactively

```bash
npx skills add jfdevelops/skills
```

Select the skills and agents you use when prompted. This installs agent instructions; it does not add a runtime dependency to your application.

## Install the documentation set

Install the orchestrator and all five supporting docs skills together. This example selects Codex and copies resources instead of creating symlinks:

```bash
npx skills add jfdevelops/skills --skill jf-docs jf-docs-standards jf-docs-analyze jf-docs-plan jf-docs-write jf-docs-review --agent codex --copy --yes
```

For required docs work, add a project instruction linking to `.agents/skills/jf-docs/SKILL.md`. The orchestrator reads the supporting stage skills as needed. [Document a library](guides/document-library.md) shows how to scope a request and review its result.

## Select skills and agents explicitly

```bash
npx skills add jfdevelops/skills --skill jf-naming-conventions jf-coding-conventions jf-git jf-docs jf-docs-standards jf-docs-analyze jf-docs-plan jf-docs-write jf-docs-review --agent claude-code cursor github-copilot codex --yes
```

Adjust the skill and agent lists for your project. Use `--copy` where symlinks are unavailable, or `--global` to install for every project instead of only this one.

`--global` makes this a user-level installation rather than the project-local layout used by the quick start. Use paths matching the actual installation when adding project requirements. The lock-file description below applies to project-local installs.

## Inspect the installed files

Skills are installed under `.agents/skills/` for agents that read that directory. Claude Code uses links under `.claude/skills/`. The CLI records sources and content hashes in `skills-lock.json`; keep that file with the installed skills in version control.

Agent discovery depends on the agent's version and configuration. Add explicit project instructions when reading a skill must be required for a task.

## Next steps

- [Add required project instructions](quick-start.md).
- [Choose a smaller set of skills](guides/choose-skills.md).
- [Pin and update installations](guides/update-skills.md).
