---
title: jf-docs
description: Understand the entry point that scopes and coordinates library documentation work.
order: 40
---

`jf-docs` coordinates user-facing library documentation, from a wording fix to a comprehensive rewrite. Its scope is Markdown pages for a docs site. READMEs, code comments, changelogs, and maintainer notes are outside that scope except where they link into the docs.

## Scope and workflow selection

The agent identifies the affected library and packages, framework, target version, existing structure, requested behavior, related pages, and verification tooling. It reads project rules before applying shared defaults and never assumes the latest major.

| Work | Stages |
| --- | --- |
| Full documentation | Analyze, plan, write, review, resolve findings, verify |
| Feature documentation | Analyze affected APIs, identify pages, plan where needed, write, review, verify |
| Incremental update | Inspect affected pages and source, find related changes, write, review, verify |
| Documentation audit | Establish scope, analyze relevant source, review, report without editing |
| New major | Analyze both majors, preserve outgoing docs, plan migration, update, review, generate and verify |
| Editorial change | Read rules and standards, edit, run docs checks |

## The six-skill workflow

Install the full docs set so the orchestrator can read the instructions for each required stage. Referencing another skill does not load it automatically; the agent opens its `SKILL.md` before using it.

| Skill | Responsibility |
| --- | --- |
| [jf-docs-standards](jf-docs-standards.md) | Project-aware layout, versioning, formatting, links, and checks |
| [jf-docs-analyze](jf-docs-analyze.md) | Source-grounded API and mental model |
| [jf-docs-plan](jf-docs-plan.md) | Page kinds, learning path, and coverage |
| [jf-docs-write](jf-docs-write.md) | Content suited to each reader need |
| [jf-docs-review](jf-docs-review.md) | Independent correctness, quality, and standards review |

## Continuity and completion

Substantial work keeps analysis, inventory, concepts, plans, progress, and reviews outside published docs in the project's documentation workspace, defaulting to `.docs-workspace/`. A recorded source revision allows later sessions to re-analyze changed packages while reusing current analysis. Small changes need no workspace files.

Review runs in a context that did not write the pages when available. Otherwise, a separate review pass rereads source. Completion requires supported technical claims, usable explanations, valid examples, updated related pages, resolved findings, and passing generation and checks. Library source and checks must not be changed merely to make docs pass.

## Example request

```text
Use jf-docs to document the new validation option for the current major. Update related guides, verify examples against source, and review the result.
```

The skills name no model or agent. [Run docs stages on chosen models](../guides/docs-agents.md) covers the separately shipped Claude Code agents. [Installation](../installation.md) covers installing the skills themselves.
