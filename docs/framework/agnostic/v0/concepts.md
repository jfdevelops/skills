---
title: How skills apply
description: Understand installed instructions, project rules, supporting resources, and optional agents.
order: 35
---

A skill is a directory of instructions that an agent reads for a task. It does not execute application code or configure your formatter by itself. `SKILL.md` contains a name, a description used for discovery, and the instructions; some skills include supporting files under `references/`.

## Installation and use

The `skills` CLI puts instruction files where your selected agent can read them. Installing `@jfdevelops/skills` with a package manager makes the package files available, but does not activate those instructions in an agent. The npm package also exposes metadata and a schema for tooling; it has no JavaScript runtime entry point.

Native discovery depends on the agent's version and configuration. Explicit links in project instructions make task requirements clear: naming a public function calls for `jf-naming-conventions`, implementing it calls for `jf-coding-conventions`, and documenting it calls for `jf-docs`. The [quick start](quick-start.md) demonstrates such a requirement.

## Project rules and shared defaults

Current user instructions take precedence over repository guidance, and repository guidance takes precedence over shared defaults. Existing projects retain their established vocabulary, toolchain, and framework choices. Project-specific exceptions belong in project instructions so they remain visible when installed skills are updated.

A skill requirement and authorization to act are separate. Reading `jf-git` before a Git decision does not authorize a commit or push. Coding conventions describe the expected style, while configured and verified project tools provide automatic enforcement.

## Skills and supporting resources

The naming and coding skills each provide their main guidance in `SKILL.md`. The Git skill loads branch, commit, or pull request references for the operation at hand. The documentation set has six skills: `jf-docs` coordinates the workflow, standards apply to every docs change, and analysis, planning, writing, and review run as needed.

An individual skill and its supporting references form one installation unit. The documentation stages are separate skills that should be installed together. Copying only the orchestrator's `SKILL.md` leaves the stage instructions unavailable.

## Skills and optional agents

The skills select no model or agent. The separately shipped Claude Code agents assign models to documentation stages. They still read the installed docs skills; installing agent files does not replace installing the six-skill set.

See [Choose skills](guides/choose-skills.md) for task coverage, [Document a library](guides/document-library.md) for the workflow, and [Run docs stages on chosen models](guides/docs-agents.md) for optional delegation.
