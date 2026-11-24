---
"@jfdevelops/skills": minor
---

Split `jf-docs` into six documentation skills. `jf-docs` is now the orchestrator: it picks the smallest workflow for a task and loads `jf-docs-standards` (the former layout, versioning, formatting, and link rules), `jf-docs-analyze`, `jf-docs-plan`, `jf-docs-write`, and `jf-docs-review` for each stage. Install the five new skills alongside `jf-docs`. The package also ships Claude Code subagents in `agents/claude/` that run analysis and planning on Opus, writing on Sonnet, and review on Codex.
