---
title: jf-docs-standards
description: Find the layout, versioning, formatting, and verification rules for library docs.
order: 50
---

`jf-docs-standards` defines deterministic rules for library documentation. It applies before every docs change, including editorial work. Passing its checks establishes standards compliance; accuracy and usefulness are also checked by [jf-docs-review](jf-docs-review.md).

## Project rules come first

The agent reads the docs README, content contract or style guide, generation and check scripts, and neighboring pages. It identifies public page locations, generated files, permitted frontmatter and Markdown features, and verification commands. Project rules override the shared defaults.

## Reference resources

| Resource | Read before |
| --- | --- |
| `references/layout.md` | Adding, moving, or deleting pages; changing navigation or API reference |
| `references/versioning.md` | Choosing a version directory, pinning installs, or documenting releases |
| `references/formatting.md` | Writing frontmatter, headings, callouts, code, install commands, or links |

These files ship with the skill and must remain available to the agent.

## Layout and formatting defaults

Public pages live under `docs/framework/<framework>/v<major>/`. Navigation is generated from pages. Workspace notes stay outside published docs, and public pages do not link to maintainer notes. Moving a page requires updating all incoming links, including those in READMEs.

Default frontmatter contains `title`, a one-sentence `description`, and an `order` unique within its directory, using increments of ten. The site supplies the page's `h1`, so content headings begin at `##`. Code fences have languages. Links between pages use relative `.md` paths with optional heading anchors.

Install commands use consecutive `npm`, `pnpm`, `yarn`, and `bun` fences, with matching dependency flags and version pins. Callouts use block quotes beginning with `**Note:**`, `**Tip:**`, or `**Warning:**`.

## Version boundaries

Pages describe the release in their version directory. Earlier-major corrections use that major's last release source and exact dependency pins. A page's own version is omitted from its title, description, and intro because navigation already supplies that context.

The current major's generated API reference is never edited by hand. Before a new major ships, the outgoing major receives a hand-written `reference/api.md` based on its last release, its links are updated, and generated outgoing reference pages are removed. This package skips API reference generation because it ships instructions and metadata rather than a JavaScript runtime API.

## Verification requirements

The agent runs project docs generation, docs checks, formatting, and lint commands where configured. It fixes pages rather than weakening checkers and removes unrelated line-ending-only changes caused by formatting.

For a request such as “fix this docs link,” [jf-docs](jf-docs.md) selects the editorial workflow and this skill provides the applicable rules. See [jf-docs-write](jf-docs-write.md) for content guidance.
