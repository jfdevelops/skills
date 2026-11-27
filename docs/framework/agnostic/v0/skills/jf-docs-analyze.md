---
title: jf-docs-analyze
description: Understand the source analysis that establishes API facts and a library mental model.
order: 60
---

`jf-docs-analyze` establishes the evidence for documentation before pages are planned or written. It analyzes the library at the target version and does not write pages or change library source.

## Inputs and evidence

The stage receives the package, framework, and version from [jf-docs](jf-docs.md). It starts with public package entry points, then follows source, type declarations, tests, and examples. Existing docs and comments are claims to verify. Earlier majors use source at their last release tag.

When workspace analysis exists, the agent reads its state first and re-analyzes stale packages and affected concepts. A changed target major requires fresh analysis.

## Analysis coverage

| Area | Facts established |
| --- | --- |
| Public surface | Import paths, kinds, parameters, defaults, returns, errors, limitations, and related exports |
| Mental model | Concepts, relationships, state flow, lifecycle, integrations, and prerequisites |
| Type behavior | Generic inference, overloads, narrowing, schema-derived types, and what developers see |
| Runtime | Initialization, call order, side effects, transitions, edge cases, and integration requirements |
| Workflows | Basic use, advanced use, and extension points |

Internal symbols are not documented as supported API. Stability, deprecation, dates, release facts, and performance characteristics require evidence. Disagreements between docs, tests, and implementation are recorded rather than silently resolved by assumption.

## Output and handoff

The output identifies the target and source revision, package map, public API inventory, mental model, type and runtime behavior, workflows, gaps, and open questions. Important facts cite a source file and symbol; inferences are labeled.

In a documentation workspace, package analysis lives in `analysis/<package>.md`, concepts in `concepts.md`, and exports in `api-inventory.json`. Each inventory entry records `name`, `importPath`, `kind`, `package`, `source`, and `documentedIn`. `state.yaml` records the source revision and package status.

## Example request

```text
Use jf-docs-analyze to establish how the current package's step schemas determine field values. Record public exports, inference behavior, lifecycle requirements, and gaps before planning pages.
```

[jf-docs-plan](jf-docs-plan.md) consumes the analysis. [jf-docs-review](jf-docs-review.md) later checks documentation against source independently.
