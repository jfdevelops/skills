---
title: Troubleshooting
description: Resolve missing skill discovery, broken resource links, and installation confusion.
order: 30
---

Check the installed files and your agent's instruction paths when conventions are not being applied. Discovery varies with agent version and configuration.

In this guide you will:

- Verify the installation location.
- Repair missing skill and reference paths.
- Distinguish consumer installation from repository tooling.

## Check an ignored skill

Confirm the skill exists under `.agents/skills/` or your chosen installation location. Verify that you selected the intended agent during installation and that its configuration supports that location. Add explicit links in your project instructions as shown in the [quick start](../quick-start.md).

An npm dependency alone does not activate agent skills. Use the installation workflow to place the instruction files where your agent reads them.

## Repair missing references

Copy the whole skill directory, including supporting resources. `jf-git`, `jf-docs-standards`, `jf-docs-write`, and `jf-docs-review` need their `references/` directories in addition to `SKILL.md`. `jf-docs` also needs the other five `jf-docs-*` skills installed next to it. Reinstall the selected skill if the installed copy is incomplete, preserving local edits first.

If symlinks are unavailable, use the install command's `--copy` option.

## Check a docs stage that cannot continue

If the orchestrator cannot find a stage skill, reinstall the complete [documentation set](../installation.md#install-the-documentation-set), preserving local edits first. If analysis or plans are stale, compare their recorded source revision with the target source before reusing them. A new target major needs fresh analysis.

A missing docs checker or unavailable example type checker is a verification limitation. The agent should report the missing command and what it could verify against source, rather than claim success or weaken checks. [Document a library](document-library.md) describes the expected handoff.

## Check an optional Claude Code agent

Skill installation does not install the separately shipped agent files. Check that the selected `docs-*.md` files exist in `.claude/agents/` or your user agent directory, then start a new session. The reviewer also needs the Codex CLI installed and signed in for its Codex review path. Its fallback report identifies when Claude performed the review instead. See [the agent setup guide](docs-agents.md).

## Resolve conflicting rules

Apply current user instructions first, then repository guidance, then shared defaults. Make project exceptions explicit in your repository instructions rather than relying on an agent to infer them from unrelated files.

## Avoid the repository bootstrap script

`scripts/sync-agent-skills.mjs` regenerates owned files in this repository. It is temporary maintainer tooling, is not a published installer, and must not be run against an arbitrary existing project. Use the documented consumer installation workflow instead.

## Next steps

- [Reinstall selected skills](../installation.md).
- [Review explicit updates](update-skills.md).
