---
title: Run docs stages on chosen models
description: Install Claude Code subagents that run each jf-docs stage on its own model, with Codex reviewing.
order: 15
---

The docs skills name no model, so every stage runs on whatever model your session
uses. The package also ships three Claude Code subagents that pin a model and
reasoning effort to each stage, and hand review to Codex so a different model
checks the writer's work.

In this guide you will:

- See which agent runs each stage.
- Install the agents in a project or for your user.
- Tell Claude Code to delegate each stage.
- Understand what happens when Codex is unavailable.

## Choose the agents

| Agent | Stages | Model and effort |
| --- | --- | --- |
| `docs-analyzer` | `jf-docs-analyze`, `jf-docs-plan` | Claude Opus, high |
| `docs-writer` | `jf-docs-write`, including fixes from review | Claude Sonnet, medium |
| `docs-reviewer` | `jf-docs-review` | Codex `gpt-6.2-astra`, high, read-only |

`jf-docs` itself stays in your main session and decides which stages a task needs.
Each agent reads the docs skills from your project, so install all six docs skills
first, as [Installation](../installation.md) describes.

## Install the agents

The agents are Markdown files under `agents/claude/` in the published package. Add
the package as a development dependency:

```npm
npm i -D @jfdevelops/skills
```

```pnpm
pnpm add -D @jfdevelops/skills
```

```yarn
yarn add -D @jfdevelops/skills
```

```bun
bun add -D @jfdevelops/skills
```

Then copy the agents into the project's `.claude/agents/` directory:

```bash
mkdir -p .claude/agents
cp node_modules/@jfdevelops/skills/agents/claude/docs-*.md .claude/agents/
```

Commit them so everyone working on the project uses the same stages. To use them
in every project instead, copy them to `~/.claude/agents/`. Claude Code loads new
agents when a session starts.

## Delegate each stage

Claude Code delegates to an agent when the task matches its description. To make
delegation reliable, add this to the project's `CLAUDE.md`:

```text
## Documentation stages

`jf-docs` stays in the main session. Run its stages in subagents:

- `jf-docs-analyze` and `jf-docs-plan`: `docs-analyzer`.
- `jf-docs-write`, including fixing confirmed review findings: `docs-writer`.
- `jf-docs-review`: `docs-reviewer`.

Pass each stage the scope, the target version and the previous stage's output.
```

## Review with Codex

`docs-reviewer` runs the Codex CLI non-interactively with the `jf-docs-review`
skill. Install the Codex CLI and sign in before using it. The agent sets the model,
reasoning effort and a read-only sandbox on the command line, so Codex needs no
extra configuration.

> **Note:** If Codex is missing, signed out, out of usage or times out, the agent
> reviews the docs with Claude instead. Its report always starts by naming which
> model reviewed.

## Change a model

Edit the `model` and `effort` frontmatter in the copied agent file. For the
reviewer, change the `-m` and `model_reasoning_effort` values in its Codex command.
Recopying the files after an update replaces these edits, so keep a note of them.

## Next steps

- [Choose skills](choose-skills.md).
- [Update installed skills](update-skills.md).
