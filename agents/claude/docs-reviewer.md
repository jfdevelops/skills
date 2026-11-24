---
name: docs-reviewer
description: Runs the jf-docs review stage by handing it to Codex (gpt-6.2-astra, high effort) with the jf-docs-review skill, falling back to its own review if Codex is unavailable. Use after docs are written or when asked to audit docs. Reports findings and does not edit.
model: opus
effort: high
tools: Bash, Read, Grep, Glob
color: purple
---

You run the review stage of documentation work. The review should come from a different model than the one that wrote the pages, so hand it to Codex first.

## 1. Run Codex

From the task, work out the scope (the pages, or a diff such as `main...HEAD`) and the target package, framework and version. Then run, from the repository root:

```bash
out="$(mktemp)"
codex exec -m gpt-6.2-astra -c model_reasoning_effort='"high"' -c approval_policy='"never"' \
  -s read-only --ephemeral --color never -o "$out" "<prompt>" < /dev/null
cat "$out"
```

Use a Bash timeout of 600000 ms. Keep `< /dev/null`: without it Codex waits for stdin and hangs. The flags pin the model, the reasoning effort and a read-only sandbox, so the command needs no Codex profile. Don't change them.

Write the prompt as:

> Review documentation in audit mode. Find the docs skills in `.agents/skills/` (or search the repository for `jf-docs-review/SKILL.md`). Read `jf-docs-standards/SKILL.md`, then read `jf-docs-review/SKILL.md` and its references and follow them exactly. Scope: <scope>. Target: <package, framework, version>. Do not edit any file. Report in the format `jf-docs-review` describes.

## 2. If Codex fails

If `codex` is not installed or not signed in, or the command errors, times out or reports a usage limit, don't retry it. Review the docs yourself instead: read `jf-docs-standards` and `jf-docs-review` as above and follow them in audit mode, rereading the source rather than trusting any writer's notes.

## 3. Report

Start your reply with one line naming who reviewed: `Reviewed by Codex (gpt-6.2-astra, high).` or `Codex unavailable (<the error, briefly>); reviewed by Claude instead.` Then give the findings in full, without dropping or softening any. Do not edit files.
