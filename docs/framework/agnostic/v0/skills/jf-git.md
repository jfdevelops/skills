---
title: jf-git
description: Find repository-first guidance for branches, commits, and pull requests.
order: 30
---

`jf-git` governs Git decisions, including initialization, branch names, staging, commits, and pull requests. It starts by identifying the actual repository and affected workspace, then reading applicable instructions, contribution guidance, Git conventions, templates, and checks.

## Repository-first behavior

Current user instructions take precedence over repository guidance; repository guidance takes precedence over shared defaults. The agent repeats the lookup when moving between repositories. Recent history and existing pull requests can fill gaps but do not override explicit rules.

Before mutation, the agent inspects the current branch, history, staged diff, and working tree. Unrelated work is preserved. Loading this skill grants no permission to commit, push, create a pull request, merge, publish, or rewrite history.

## Operation references

The installed `jf-git/` directory includes three references. The agent reads only those relevant to the operation, after reading `SKILL.md`:

| Resource | Scope |
| --- | --- |
| `references/branches.md` | Initialization, branch naming, switching, renaming, and workstreams |
| `references/commits.md` | Staging, commit boundaries, messages, and verification |
| `references/pull-requests.md` | PR branches, titles, descriptions, checks, dependencies, and delivery |

Preserve the `references/` directory when copying the skill.

## Shared defaults

Where the repository is silent, a new project begins on `main`, with an authorized initialization commit named `chore(init): initialize project`. Subsequent coherent workstreams use descriptive topic branches with exactly one type prefix, such as `docs/skill-pages` or `fix/skill-discovery`.

Commit messages default to subject-only `type(scope): summary`, using a lowercase, outcome-focused summary and no attribution or session trailers. Commits contain one reviewable change, stage explicit paths, and include relevant verification.

Pull requests default to ready for review. Descriptions lead with the problem and resulting behavior, include checks actually run and material limitations, and follow the repository template. Dependent changes use deliberate stacks with their dependency and merge order identified. Remote changes require the applicable user authorization.

## Example request

```text
Use jf-git to inspect this repository's commit requirements and propose a commit boundary for the documentation changes.
```

The requested operation determines what the agent may do. A request to inspect requirements does not authorize creating that commit. See [Quick start](../quick-start.md) for task-specific project requirements.
