---
title: jf-coding-conventions
description: Find the implementation and review rules for JavaScript, TypeScript, and React.
order: 20
---

`jf-coding-conventions` provides an implementation and review baseline for JavaScript, TypeScript, and React. The agent reads the target manifest, formatter, compiler configuration, and relevant source before editing, uses installed APIs and configured commands, and preserves existing user changes.

## Functions and spacing

Top-level functions and React components use `function` declarations. A function-valued `const` is appropriate for the result of a higher-order function. Callbacks and function-valued props use arrows, except that callbacks defining React components use named functions for identification in React DevTools.

The spacing rules require separation between functions and brace-delimited code blocks, no padding immediately inside braces, and a blank line before a `return` that follows another statement in its block. Related declarations stay grouped. Every `if`, `for`, and `while` body uses braces.

```ts
function describeSkill(name: string) {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return 'Unnamed skill';
  }

  return normalizedName;
}
```

Formatter choices may control indentation, quotes, and semicolons, while retaining the required spacing policy. The skill describes a policy; automatic enforcement requires configured and verified formatter, lint, and project checks.

## Types and organization

Return types are inferred unless a public contract, overload, assertion signature, recursion, or inference limitation requires annotation. Unknown input is validated and narrowed at boundaries. Type mismatches are fixed at their source rather than hidden with broad casts, `any`, or disabled checks.

Files contain one component, hook, or cohesive helper concern. Apps import from defining files; libraries may expose deliberate public entry points. Framework-independent logic stays separate from adapters. Route-private components and utilities stay beside their route in `components/` and `utils/`, respecting the router's non-route directory convention.

## React and verification

React projects reuse existing UI primitives, keep presentation independent of data fetching, and place conditional class-name logic in the project's `cn` utility. Framework-specific guidance applies only when the project uses that framework.

Verification uses configured checks and meaningful regression coverage. Changes to library public types also require consumer compilation. Reports distinguish checks actually run from verification that could not be completed. The skill does not select optional dependencies or authorize commits, publication, or deployment.

## Example request

```text
Implement the response parser using jf-coding-conventions. Validate unknown input at the boundary and run the project's relevant checks.
```

See [jf-naming-conventions](jf-naming-conventions.md) for naming and [jf-git](jf-git.md) for Git operations.
