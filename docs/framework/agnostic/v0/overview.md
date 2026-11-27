---
title: Overview
description: Use shared agent conventions across projects and coding assistants.
order: 10
---

`@jfdevelops/skills` provides portable instructions for naming, coding, Git work, and library documentation. Install them in a project to give agents a shared set of conventions while retaining that project's own rules.

## Choose a convention

| Skill | Use before |
| --- | --- |
| [jf-naming-conventions](skills/jf-naming-conventions.md) | Naming or renaming files, symbols, packages, or APIs |
| [jf-coding-conventions](skills/jf-coding-conventions.md) | Implementing or reviewing JavaScript, TypeScript, or React |
| [jf-git](skills/jf-git.md) | Making Git decisions, including branches, commits, and pull requests |
| [jf-docs](skills/jf-docs.md) | Any user-facing library docs work; it loads the other docs skills |
| [jf-docs-standards](skills/jf-docs-standards.md) | Any docs change, for layout, versioning, formatting, and links |
| [jf-docs-analyze](skills/jf-docs-analyze.md) | Analyzing a library before documenting it |
| [jf-docs-plan](skills/jf-docs-plan.md) | Planning pages and their order |
| [jf-docs-write](skills/jf-docs-write.md) | Writing tutorials, guides, explanations, and reference pages |
| [jf-docs-review](skills/jf-docs-review.md) | Reviewing docs for accuracy, quality, and standards |

Each skill has a `SKILL.md` containing its name, description, and instructions. The Git skill also includes references for branches, commits, and pull requests. The six docs skills work together, with `jf-docs` as their entry point.

Each skill has a dedicated page linked above, covering its scope, behavior, resources, and example requests. Use [Choose skills](guides/choose-skills.md) to select a set for your project.

## Apply project rules first

Current user instructions take precedence over repository guidance, and repository guidance takes precedence over shared defaults. Installing these skills does not authorize commits, pushes, publication, or deployment.

The package does not select optional frameworks or integrations. Keep guidance for tools such as Convex, TanStack, or Portless in separately selected skills or your project's instructions.

## Understand the package

Use the `skills` CLI to install instructions for an agent. Installing the npm package alone does not activate them. There is no JavaScript runtime entry point; the package exposes discovery metadata and a JSON Schema for tooling.

## Find the right starting point

Use the [quick start](quick-start.md) for a complete first task, [How skills apply](concepts.md) for installation and instruction behavior, and [Document a library](guides/document-library.md) for the docs workflow. Individual skill pages describe exact scope and resources; package discovery is for tooling authors reading metadata.

## Next steps

- [Install the skills](installation.md).
- [Require the conventions in your project](quick-start.md).
- [Read package discovery metadata](package-discovery.md).
