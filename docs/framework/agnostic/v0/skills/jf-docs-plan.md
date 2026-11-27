---
title: jf-docs-plan
description: Understand how documentation plans map reader needs and public APIs to pages.
order: 70
---

`jf-docs-plan` turns source analysis into a learning path and page specifications. It does not write full pages or change library source. Its input is the current output of [jf-docs-analyze](jf-docs-analyze.md); missing or stale analysis must be resolved before relying on it.

## Page kinds

Each page has one reader need and one kind. Kinds determine writing style, without requiring a separate directory for each kind.

| Kind | Reader need | Example |
| --- | --- | --- |
| Tutorial | Learn through a complete guided experience | Build a first multi-step form |
| How-to guide | Complete a specific task | Validate a step asynchronously |
| Explanation | Understand a concept or design | How schema inference works |
| Reference | Look up precise API facts | Schema configuration options |

## Learning path and coverage

The plan moves from the problem and installation to a meaningful first result, concepts, common tasks, advanced use, extensions, and troubleshooting. It keeps useful existing pages and chooses the fewest pages that cover the scope.

Every public export maps to a page that teaches it. Exact signatures belong in the API reference where generated; guides explain when and why to use an API and link to that reference. Shared concepts have one home with links from other pages. In monorepos, shared concepts and cross-package workflows are distinguished from package-specific pages; private packages receive no public pages.

## Page specifications and output

Each new or changed page records its title, path, kind, reader outcome, prerequisites, concepts and APIs, examples, related links, priority, and source references. The plan also includes navigation order, an export coverage matrix, cross-linking, writing order, and blockers.

When a workspace exists, these decisions live in `plan.md`; `progress.md` lists outstanding pages, and `state.yaml` records the planning stage status.

## Example request

```text
Use jf-docs-plan with the completed API inventory. Plan a first-use path and a guide for asynchronous validation, and map every public export to its documentation page.
```

[jf-docs-write](jf-docs-write.md) uses the page specifications. [jf-docs-standards](jf-docs-standards.md) determines layout and version rules.
