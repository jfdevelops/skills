---
title: Update installed skills
description: Pin skill sources and review explicit updates to installed conventions.
order: 20
---

Pin a release when your project needs reproducible conventions. Review updates before adopting changed instructions in your repository.

In this guide you will:

- Install from an explicit release tag.
- Check for available updates.
- Review updated files and preserve project exceptions.

## Pin a release

```bash
npx skills add jfdevelops/skills#v0.2.0
```

The repository creates `v<version>` release tags. The example selects a specific historical release; it is not a claim that this tag contains every skill described in the current checkout. Select a release that includes the skills you need. Keep `skills-lock.json` with your installed files to record their source and hashes.

## Check and update

```bash
npx skills check
npx skills update
```

Check first, then update deliberately. Review the resulting skill files and lock file, especially instructions affecting names, formatting, commits, and docs.

Keep project-specific rules in your project instructions so they remain visible when shared instructions are replaced. Preserve any existing local edits before running an update.

## Add the documentation skills

`jf-docs` now coordinates five companion skills: `jf-docs-standards`, `jf-docs-analyze`, `jf-docs-plan`, `jf-docs-write`, and `jf-docs-review`. Its former rules moved to `jf-docs-standards`. Install all five alongside `jf-docs`; project instruction links to `jf-docs/SKILL.md` stay the same.

```bash
npx skills add jfdevelops/skills --skill jf-docs jf-docs-standards jf-docs-analyze jf-docs-plan jf-docs-write jf-docs-review
```

## Migrate the Git skills

The unified `jf-git` skill replaces the former `jf-git-workflow` and `jf-commit-conventions` registrations. Install `jf-git`, update project instruction links to its `SKILL.md`, and remove unchanged managed copies of the old skills. Preserve locally edited copies for review before removing them.

## Verify the updated setup

Confirm every required instruction link still points to an installed file, all supporting references are present, and the six docs skills are adjacent. Try a task that requires the changed skill and check that the agent reads the updated instructions. A successful installer run verifies file placement, not agent behavior or formatter enforcement.

For optional Claude Code docs agents, update the copied files separately from skill installation. Compare local model or effort edits before replacing them; see [Run docs stages on chosen models](docs-agents.md).

## Next steps

- [Check project instruction links](../quick-start.md).
- [Resolve installation problems](troubleshooting.md).
