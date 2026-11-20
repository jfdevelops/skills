---
title: Update installed skills
description: Pin skill sources and review explicit updates to installed conventions.
order: 20
---

Pin a release when your project needs reproducible conventions. Review updates
before adopting changed instructions in your repository.

In this guide you will:

- Install from an explicit release tag.
- Check for available updates.
- Review updated files and preserve project exceptions.

## Pin a release

```bash
npx skills add jfdevelops/skills#v0.2.0
```

The repository creates `v<version>` release tags. The example selects the package
release recorded in this documentation's source manifest. Keep `skills-lock.json`
with your installed files to record their source and hashes.

## Check and update

```bash
npx skills check
npx skills update
```

Check first, then update deliberately. Review the resulting skill files and lock
file, especially instructions affecting names, formatting, commits, and docs.

Keep project-specific rules in your project instructions so they remain visible
when shared instructions are replaced. Preserve any existing local edits before
running an update.

## Migrate the Git skills

The unified `jf-git` skill replaces the former `jf-git-workflow` and
`jf-commit-conventions` registrations. Install `jf-git`, update project instruction
links to its `SKILL.md`, and remove unchanged managed copies of the old skills.
Preserve locally edited copies for review before removing them.

## Next steps

- [Check project instruction links](../quick-start.md).
- [Resolve installation problems](troubleshooting.md).
