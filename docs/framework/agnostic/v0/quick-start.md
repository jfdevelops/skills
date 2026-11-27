---
title: Quick start
description: Install a naming skill and verify that your agent reads it for a concrete task.
order: 30
---

Install one skill, require it in project instructions, and use it to name a helper. This walkthrough uses Codex and a project-local copy so the instruction path is explicit. You need Node.js 22.20 or newer, an existing project, and an agent that reads its `AGENTS.md`.

## 1. Install the naming skill

Run this from your project root:

```bash
npx skills add jfdevelops/skills --skill jf-naming-conventions --agent codex --copy --yes
```

The installed skill is `.agents/skills/jf-naming-conventions/SKILL.md`. Confirm the file exists before continuing. The command installs instructions; it does not add a runtime dependency to your application.

## 2. Require it for naming work

Add this section to your project's `AGENTS.md`, preserving existing instructions:

```text
## Naming conventions

Before adding or renaming files, symbols, packages, or APIs, read [jf-naming-conventions](.agents/skills/jf-naming-conventions/SKILL.md).
Follow established project vocabulary and conventions before shared defaults.
Preserve existing user changes.
```

The relative link points at the installed file from the project root. The requirement makes the task trigger explicit instead of relying only on native discovery.

## 3. Try a naming task

In an agent session for that project, use this prompt:

```text
Read the required naming skill and inspect the project's existing vocabulary.
Propose a name for a helper that discovers skills declared by a package.
Explain which existing convention supports the name. Do not edit files.
```

The agent should read the installed skill and relevant project files before proposing a name. In a project using the skill's defaults, `discoverPackageSkills` is an example of an action-and-result name. Your project's established naming can lead to a different result.

## Check the result

You now have an installed skill, a task-specific requirement, and a concrete request that exercises it. Verify that the agent used the actual skill file and project vocabulary. A matching-looking name alone does not establish that the agent read the instructions. If it cannot find the file or ignores the requirement, use [Troubleshooting](guides/troubleshooting.md).

## Expand the setup

[Installation](installation.md) covers other agents, the full convention set, and the six documentation skills. Add instruction links only for installed skills, with requirements matching their scope. Git decisions use `jf-git`; JavaScript, TypeScript, and React implementation or review uses `jf-coding-conventions`; library docs work starts with `jf-docs`.

Project instructions should also preserve existing work and state that the skills do not authorize commits, pushes, publication, or deployment. Keep project exceptions in those instructions. Read [How skills apply](concepts.md) for the relationship between discovery, requirements, and authorization.
