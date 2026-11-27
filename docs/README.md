# Documentation

This is the repository index for the framework-independent documentation of `@jfdevelops/skills`. Pages for the current major live in `framework/agnostic/v0/`.

- [Overview](framework/agnostic/v0/overview.md)
- [Installation](framework/agnostic/v0/installation.md)
- [Quick start](framework/agnostic/v0/quick-start.md)
- [How skills apply](framework/agnostic/v0/concepts.md)
- [Document a library](framework/agnostic/v0/guides/document-library.md)
- [Choose skills](framework/agnostic/v0/guides/choose-skills.md)
- [Run docs stages on chosen models](framework/agnostic/v0/guides/docs-agents.md)
- [Update installed skills](framework/agnostic/v0/guides/update-skills.md)
- [Troubleshooting](framework/agnostic/v0/guides/troubleshooting.md)
- [Package discovery](framework/agnostic/v0/package-discovery.md)

## Skill reference

- [jf-naming-conventions](framework/agnostic/v0/skills/jf-naming-conventions.md)
- [jf-coding-conventions](framework/agnostic/v0/skills/jf-coding-conventions.md)
- [jf-git](framework/agnostic/v0/skills/jf-git.md)
- [jf-docs](framework/agnostic/v0/skills/jf-docs.md)
- [jf-docs-standards](framework/agnostic/v0/skills/jf-docs-standards.md)
- [jf-docs-analyze](framework/agnostic/v0/skills/jf-docs-analyze.md)
- [jf-docs-plan](framework/agnostic/v0/skills/jf-docs-plan.md)
- [jf-docs-write](framework/agnostic/v0/skills/jf-docs-write.md)
- [jf-docs-review](framework/agnostic/v0/skills/jf-docs-review.md)

## Documentation tooling

Public pages live under `docs/framework/<framework>/v<major>/` from the repository root. Run the docs commands from this repository:

```bash
pnpm docs:generate
pnpm docs:check
```

The generator derives `docs/docs.json` and per-directory `meta.json` navigation from page frontmatter. Generated files stay ignored; the website runs these commands after checking out its pinned repository commit.

Generation skips the API reference. This package contains agent instructions and metadata rather than a JavaScript runtime API.

See `CONTRIBUTING.md` in the repository root before changing shared conventions or repository tooling.
