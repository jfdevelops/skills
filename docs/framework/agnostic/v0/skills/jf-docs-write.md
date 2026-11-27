---
title: jf-docs-write
description: Find the content and example requirements for each documentation page kind.
order: 80
---

`jf-docs-write` writes and updates library documentation for developer understanding. It uses the page plan, analysis, current source, relevant tests and examples, neighboring pages, and [jf-docs-standards](jf-docs-standards.md). If source changed after analysis, source takes precedence.

## Writing by page kind

The skill ships a reference for each kind defined by [jf-docs-plan](jf-docs-plan.md):

| Resource | Content requirements |
| --- | --- |
| `references/tutorials.md` | One guided experience with a complete result |
| `references/guides.md` | Task-focused steps, variations, and failure cases |
| `references/explanations.md` | Concepts, relationships, and design decisions |
| `references/reference.md` | Exact API facts, behavior, limitations, and short examples |

The agent reads the matching reference before writing. A page need not use the same structure as every other page; its structure follows the reader's need.

## Content requirements

Pages explain the problem, purpose, prerequisites, relevant interactions, and likely mistakes where applicable. TypeScript explanations describe what developers write and what is inferred. Implementation details belong only where they affect usage.

The style uses direct, active sentences, introduces terms before relying on them, and links to existing explanations instead of repeating them. Concrete examples support unfamiliar concepts. Claims such as “simple” or “powerful” are replaced by useful details.

## Examples and verification

Examples use public imports and source-backed signatures at the target version. Complete examples are runnable; partial examples identify their surrounding context. They use realistic names and preserve inference, with no invented helpers, `any`, `@ts-ignore`, or casts that hide errors. Deliberate type errors use an explanatory `@ts-expect-error`.

The agent checks imports, signatures, defaults, and runtime behavior against source and tests, and type-checks examples with project tooling where available. It never changes library source or weakens compiler settings merely to make an example compile.

## Example request and result

```text
Use jf-docs-write to write the planned asynchronous validation guide. Start with the smallest useful example, explain failure handling, and link to the existing schema explanation.
```

The handoff lists pages and APIs covered, examples added, checks actually run, unavailable verification, and remaining gaps. Workspace progress is marked written. [jf-docs-review](jf-docs-review.md) then reviews the result against source.
