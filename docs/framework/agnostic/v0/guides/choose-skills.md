---
title: Choose skills
description: Select the conventions and documentation stages your project needs.
order: 10
---

Select skills by the work an agent will perform. Install the general conventions needed by your project and the complete docs set when agents work on library documentation.

## Match tasks to skills

| Task | Skill |
| --- | --- |
| Add or rename files, symbols, packages, or APIs | [jf-naming-conventions](../skills/jf-naming-conventions.md) |
| Implement or review JavaScript, TypeScript, or React | [jf-coding-conventions](../skills/jf-coding-conventions.md) |
| Make Git decisions | [jf-git](../skills/jf-git.md) |
| Write, update, migrate, or review library docs | [jf-docs](../skills/jf-docs.md) and its five supporting skills |

A task can require several skills. Adding a public function and documenting it involves naming, coding, and docs guidance. A Git operation also requires the applicable user authorization.

## Select the documentation set

Install all six docs skills together. Start with `jf-docs`, which chooses the smallest workflow and reads the stages needed for the task. You do not need every stage for a wording or link fix.

| Skill | Responsibility |
| --- | --- |
| [jf-docs](../skills/jf-docs.md) | Scope, workflow selection, coordination, and completion |
| [jf-docs-standards](../skills/jf-docs-standards.md) | Layout, versioning, formatting, links, and checks |
| [jf-docs-analyze](../skills/jf-docs-analyze.md) | Source-grounded public API and mental model |
| [jf-docs-plan](../skills/jf-docs-plan.md) | Page kinds, learning path, and API coverage |
| [jf-docs-write](../skills/jf-docs-write.md) | Content and examples for each page kind |
| [jf-docs-review](../skills/jf-docs-review.md) | Independent correctness, quality, and standards review |

The skills are portable and name no model or agent. The optional [Claude Code docs agents](docs-agents.md) configure which models run stages separately from the skills.

## Preserve resources and project rules

Keep each skill's entire directory when copying it. `jf-git`, `jf-docs-standards`, `jf-docs-write`, and `jf-docs-review` include references that agents read for specific tasks.

Put project exceptions, toolchain commands, and established conventions in your repository instructions. Shared defaults apply where the project is silent. Optional frameworks and integrations belong in separately selected skills or project instructions.

## Next steps

- [Document a library](document-library.md).
- [Install your selected skills](../installation.md).
- [Require skills by task](../quick-start.md).
- [Update installed skills](update-skills.md).
