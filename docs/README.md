# Documentation

This is the repository index for the framework-independent documentation of
`@jfdevelops/skills`. Pages for the current major live in `framework/agnostic/v0/`.

- [Overview](framework/agnostic/v0/overview.md)
- [Installation](framework/agnostic/v0/installation.md)
- [Quick start](framework/agnostic/v0/quick-start.md)
- [Choose skills](framework/agnostic/v0/guides/choose-skills.md)
- [Update installed skills](framework/agnostic/v0/guides/update-skills.md)
- [Troubleshooting](framework/agnostic/v0/guides/troubleshooting.md)
- [Package discovery](framework/agnostic/v0/package-discovery.md)

Public pages live under `docs/framework/<framework>/v<major>/` from the repository root.
Run the docs commands from this repository:

```sh
pnpm docs:generate
pnpm docs:check
```

The generator derives `docs/docs.json` and per-directory `meta.json` navigation from
page frontmatter. Generated files stay ignored; the website runs these commands
after checking out its pinned repository commit.

Generation skips the API reference. This package contains agent instructions and metadata rather than a JavaScript runtime API.

See `CONTRIBUTING.md` in the repository root before changing shared conventions or
repository tooling.
