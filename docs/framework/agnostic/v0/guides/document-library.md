---
title: Document a library
description: Give an agent the scope and evidence needed to write and verify library documentation.
order: 12
---

Use `jf-docs` to create, update, migrate, or review user-facing library documentation. This guide assumes the [six docs skills are installed](../installation.md) and the agent can read the target library's source.

## Provide the target and outcome

Name the package, framework, target release, and reader outcome. Point to existing docs rules and verification commands when available. For example:

```text
Use jf-docs to document asynchronous step validation in our form library.
Target the React docs for the current major in this checkout.
Readers should be able to validate a step and handle a rejected validation.
Check the exported API and tests before writing examples.
Keep existing docs rules and update related pages.
Review against source, resolve findings, and run the configured docs checks.
```

The feature name is illustrative; replace it with an API that exists in your library. For an earlier major, identify the release tag to use as evidence. Do not infer older behavior from current source.

## Let the scope determine the stages

`jf-docs` chooses the smallest applicable workflow. A new documentation set needs analysis and a page plan before writing. A feature needs analysis of affected APIs and related pages. A link or wording correction uses the editorial workflow and does not need a full API inventory.

For substantial work, the agent establishes the public surface, mental model, page kinds, learning path, and coverage before writing. [jf-docs-analyze](../skills/jf-docs-analyze.md) and [jf-docs-plan](../skills/jf-docs-plan.md) describe those outputs.

## Keep work reusable

The default workspace is `.docs-workspace/` outside published docs. A project can configure another location. Analysis records a source revision, concepts, API inventory, and package status; the plan and progress record what remains to write and review.

When resuming work, have the agent read the recorded state and compare source changes before reusing analysis. Changed packages and affected concepts need fresh analysis. A changed target major requires discarding the old analysis. Small changes can keep context in the session instead of creating workspace files.

```text
Resume the jf-docs work from .docs-workspace/state.yaml.
Compare the recorded revision with the current source, refresh stale analysis,
and finish outstanding pages and review findings for the same target major.
```

## Require a verified handoff

The final result should name changed pages, APIs covered, examples added, checks actually run, unresolved findings, and verification limits. Review checks source independently of the writer, with a separate reviewer when available or a separate source-reading pass otherwise.

Generation and formatting checks alone do not establish that a page teaches its feature correctly. Examples also need signature and runtime checks, plus type checking where supported. Missing tooling must be reported rather than counted as a successful check. Library source and checks must not be weakened just to make documentation pass.

## Request an audit without edits

```text
Use jf-docs-review in audit mode for the current major's React docs.
Verify claims against exported APIs and tests, assess the first-use path,
and report findings with file locations and source evidence. Do not edit files.
```

Audit is the review skill's default mode. Ask explicitly for fixes when you want confirmed findings corrected. See [jf-docs-review](../skills/jf-docs-review.md) for report contents or [Run docs stages on chosen models](docs-agents.md) for optional agent setup.
