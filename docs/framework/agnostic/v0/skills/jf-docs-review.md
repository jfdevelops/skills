---
title: jf-docs-review
description: Find the review modes, evidence requirements, and finding format for library docs.
order: 90
---

`jf-docs-review` checks documentation against the library at the target version. It receives the documentation scope, package, framework, version, project rules, and [jf-docs-standards](jf-docs-standards.md). Analysis and plans are leads to verify, rather than evidence to trust.

## Modes

| Mode | Result |
| --- | --- |
| Audit (default) | Findings without file edits |
| Fix | Targeted corrections to confirmed findings, only when asked |
| Coverage | Missing or insufficient public API documentation |

In audit mode, changes made by generation commands are not retained; they are reported. Fix mode keeps useful explanations, updates affected links and navigation, and revalidates changes. It does not authorize library source changes.

## Review dimensions

Technical correctness includes exports, signatures, types, defaults, behavior, lifecycle, versions, and examples, checked against source and tests. `references/technical-accuracy.md` supplies the detailed checks.

Documentation quality includes the first-use path, page kinds, prerequisites, terminology, explanations, common mistakes, coverage, and navigation. `references/documentation-quality.md` supplies those checks. Standards compliance uses the standards skill and project generation, checking, formatting, and lint commands.

The reviewer checks complete, partial, illustrative, and deliberate-error examples according to their intended use. Passing compilation alone does not establish runtime correctness. Review is independent of writing; the reviewer verifies claims itself.

## Findings and report

| Severity | Meaning |
| --- | --- |
| Critical | Data loss, security problems, or fundamentally wrong behavior |
| High | Wrong API usage, broken examples, or significant technical errors |
| Medium | Missing explanations, workflows, or limitations needed by readers |
| Low | Wording, structure, navigation, or minor standards issues |

Each finding includes severity, dimension, file and line, the issue, source evidence, and the expected fix. Confirmed findings are separated from suspected ones. The report also includes coverage, example validation, commands and results, unavailable verification, and next steps. With a workspace, the report is saved to `reviews/latest.md` and review status is recorded in `state.yaml`.

## Example request

```text
Use jf-docs-review in audit mode to review the validation guide against the current package source. Report technical errors, missing workflows, and broken navigation without editing files.
```

[jf-docs](jf-docs.md) coordinates review and resolution in the larger workflow. [Run docs stages on chosen models](../guides/docs-agents.md) describes the optional agent setup.
