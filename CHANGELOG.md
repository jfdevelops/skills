# @jfdevelops/skills

## 0.3.0

### Minor Changes

- 2b96a8f: Split `jf-docs` into six documentation skills. `jf-docs` is now the orchestrator: it picks the smallest workflow for a task and loads `jf-docs-standards` (the former layout, versioning, formatting, and link rules), `jf-docs-analyze`, `jf-docs-plan`, `jf-docs-write`, and `jf-docs-review` for each stage. Install the five new skills alongside `jf-docs`. The package also ships Claude Code subagents in `agents/claude/` that run analysis and planning on Opus, writing on Sonnet, and review on Codex.

## 0.2.1

### Patch Changes

- 3352879: Tell `jf-docs` to write each install command once per package manager, in `npm`, `pnpm`, `yarn`, and `bun` fences.
- 926bd55: Tell `jf-docs` that only the current major's API reference is generated, and how to keep the outgoing major's reference when a new major ships.

## 0.2.0

### Minor Changes

- c4e14c5: Add the `jf-docs` skill for writing, editing, moving, and reviewing user-facing library documentation.

## 0.1.1

### Patch Changes

- 5cb6b4f: Stop requiring a blank line after an opening brace before a leading `return` in the coding conventions.

## 0.1.0

### Minor Changes

- b6c4b37: Initial release with the `jf-naming-conventions`, `jf-coding-conventions`, and `jf-git` skills, discoverable through the `jfdevelops.skills` field in `package.json`.
