---
title: Overview
description: Use shared agent conventions across projects and coding assistants.
order: 10
---

`@jfdevelops/skills` provides portable instructions for naming, coding, Git work,
and library documentation. Install them in a project to give agents a shared set
of conventions while retaining that project's own rules.

## Choose a convention

| Skill | Use before |
| --- | --- |
| `jf-naming-conventions` | Naming or renaming files, symbols, packages, or APIs |
| `jf-coding-conventions` | Implementing or reviewing JavaScript, TypeScript, or React |
| `jf-git` | Making Git decisions, including branches, commits, and pull requests |
| `jf-docs` | Writing, editing, moving, or reviewing user-facing library docs |

Each skill has a `SKILL.md` containing its name, description, and instructions.
The Git skill also includes references for branches, commits, and pull requests.

Read [Choose skills](guides/choose-skills.md) for each skill's purpose, the
instructions it gives an agent, and the reasons for using it.

## Apply project rules first

Current user instructions take precedence over repository guidance, and repository
guidance takes precedence over shared defaults. Installing these skills does not
authorize commits, pushes, publication, or deployment.

The package does not select optional frameworks or integrations. Keep guidance for
tools such as Convex, TanStack, or Portless in separately selected skills or your
project's instructions.

## Understand the package

Use the `skills` CLI to install instructions for an agent. Installing the npm
package alone does not activate them. There is no JavaScript runtime entry point;
the package exposes discovery metadata and a JSON Schema for tooling.

## Next steps

- [Install the skills](installation.md).
- [Require the conventions in your project](quick-start.md).
- [Read package discovery metadata](package-discovery.md).
