---
title: Choose skills
description: Understand each skill's purpose, its instructions, and why to use it.
order: 10
---

Select skills by the work an agent will perform. They provide shared defaults
without selecting a framework or an optional integration for your project.

In this guide you will:

- Match tasks to the bundled conventions.
- Understand what each skill asks an agent to do and why.
- Keep project exceptions in project instructions.
- Load Git references for the operation at hand.

## Match a task to a skill

| Skill | What it covers |
| --- | --- |
| `jf-naming-conventions` | Existing project vocabulary, filename conventions, symbols, package names, and compatibility when renaming |
| `jf-coding-conventions` | Functions, spacing, types, file organization, React composition, and verification |
| `jf-git` | Repository-first Git guidance with references for branches, commits, and pull requests |
| `jf-docs` | Entry point for docs work: scope, workflow choice, stage coordination, and completion |
| `jf-docs-standards` | Versioned docs layout, new-major rollover, frontmatter, formatting, links, and checks |
| `jf-docs-analyze` | Public API, mental model, type inference, and runtime behavior, from source |
| `jf-docs-plan` | Page kinds, learning path, and API coverage |
| `jf-docs-write` | Content for tutorials, how-to guides, explanations, and reference pages |
| `jf-docs-review` | Technical correctness, documentation quality, and standards compliance |

A task can require several skills. Adding a named public function and documenting
it calls for naming, coding, and docs guidance. Creating a commit also requires Git
guidance and the user's authorization for that operation.

## Use consistent names with jf-naming-conventions

### Purpose

Give the same concept the same name across source code, tests, and documentation.
Use this skill before adding or renaming files, directories, functions, types,
packages, or public APIs.

### What it does

The skill directs the agent to inspect neighboring code and the project's
vocabulary before choosing a name. It preserves established conventions and
framework-reserved filenames. For new projects, its defaults include kebab-case
files, camelCase functions and variables, and PascalCase types and components.

It asks for action-oriented function names, predicate names for booleans, and
specific domain names for types. It also requires a rename to update imports,
exports, tests, docs, and configuration, with public compatibility changes called
out explicitly.

### Why use it

Consistent vocabulary makes code easier to find and understand. Names such as
`isInstalled` communicate how a value is used, while a specific domain noun tells
readers more than a generic suffix such as `Data`. Checking all references during
a rename helps prevent broken imports and accidental public API changes.

For example, when adding skill discovery, the agent should reuse the project's
term “skill” and choose a name such as `discoverPackageSkills` rather than introduce
another term for the same concept.

## Keep implementation consistent with jf-coding-conventions

### Purpose

Give JavaScript, TypeScript, and React implementation and review a common baseline
that fits the project's installed tools and framework.

### What it does

The skill starts with the package manifest, formatter, compiler settings, and
relevant source. It defines function and callback styles, spacing, grouping, and
braces. It favors inferred types where appropriate, validation of unknown input
at boundaries, and fixing type errors at their source.

It keeps each file focused on one component, hook, or cohesive helper concern.
For React projects, it covers shared UI primitives, conditional classes through
the project's `cn` utility, and separating presentation from data fetching. It
also requires appropriate checks, meaningful regression coverage, and accurate
reporting of what was verified.

### Why use it

A consistent structure reduces the number of stylistic decisions needed during
implementation and review. Boundary validation and preserved type inference help
keep incorrect assumptions from spreading through the code. Focused files make
related behavior easier to locate and change.

For example, when handling an unknown response, the agent should validate and
narrow it before use rather than silence a mismatch with `any` or a broad cast.
The skill describes the policy; automatic enforcement requires configured and
verified formatter, lint, and project checks.

## Follow repository workflows with jf-git

### Purpose

Make Git work follow the repository being changed, while preserving existing work
and respecting the user's authorization.

### What it does

The skill requires the agent to identify the repository and read its instructions,
contribution guidance, checks, and relevant templates before making Git decisions.
It checks the current branch and staged and unstaged changes before mutation.

Its task-specific references cover initialization and coherent topic branches,
reviewable commit boundaries and messages, and pull request descriptions, checks,
and dependencies. Shared branch and commit formats apply only where the current
repository has no overriding rule.

### Why use it

Agents may work across repositories with different branch rules, commit formats,
and release processes. Reading the current repository prevents conventions from
another project from being applied by assumption. Inspecting the diff and staging
explicit paths helps keep unrelated work out of a commit.

For example, before committing a documentation change, the agent should inspect
the actual changes and repository requirements, include only the intended files,
and report checks actually run. Reading this skill does not grant permission to
commit, push, open a pull request, or merge.

## Write usable library docs with jf-docs

### Purpose

Help developers understand and use a library through accurate documentation for
the framework and release they use. Apply `jf-docs` before any user-facing library
documentation work. It is the entry point for six skills that work together, so
install all six.

### What it does

`jf-docs` establishes the scope, including the target version, and picks the
smallest workflow for the task: full documentation, a feature, an incremental
update, a review, a new major, or an editorial change. It then runs only the
stages that workflow needs, reading each stage's skill first:

| Stage | Skill | What the agent does |
| --- | --- | --- |
| Standards | `jf-docs-standards` | Applies the project's rules, then the shared layout, versioning, formatting, and link rules |
| Analyze | `jf-docs-analyze` | Learns the public API, the library's mental model, its type inference, and its runtime behavior from source |
| Plan | `jf-docs-plan` | Gives each page one kind (tutorial, how-to guide, explanation, or reference), orders the learning path, and maps every export to a page |
| Write | `jf-docs-write` | Writes each page for its kind, answering what a developer needs to know, with type-safe examples |
| Review | `jf-docs-review` | Checks technical correctness, documentation quality, and standards, against source |

For larger work, the stages keep their analysis and plans in a `.docs-workspace/`
directory outside the published docs. A later session compares the recorded source
revision with the current one and re-analyzes only what changed. Review runs
separately from writing, with a different agent or model when your environment
provides one.

### Why use it

Docs that are correctly formatted can still leave readers unable to use a feature.
Analyzing the library first, planning a learning path, and writing each kind of
page differently aim the docs at understanding, while the standards keep pages
correct for their release. An independent review catches assumptions the writer
didn't question.

For example, documenting a new step option starts with how steps and schemas
relate and what TypeScript infers, updates the affected guide and reference, and
ends with a review against source. A guide for an older major uses that release's
source and pinned dependencies. These skills cover documentation pages; they do
not prescribe README, changelog, or code-comment style except where those link
into the docs.

## Keep exceptions with the project

Document established naming, toolchain commands, docs contracts, and Git rules in
your repository instructions. Shared defaults apply where the project is silent.
Choose separate skills for integrations your project actually uses.

## Load the relevant Git reference

Read `jf-git/SKILL.md` first. It points to `references/branches.md` for branch work,
`references/commits.md` for staging and commits, and `references/pull-requests.md`
for pull request work. Preserve this directory when copying the skill.

`jf-docs-standards`, `jf-docs-write`, and `jf-docs-review` also keep references
under `references/`, which an agent reads only when the task needs them. Copy those
directories too.

## Next steps

- [Install your selected skills](../installation.md).
- [Require skills by task](../quick-start.md).
