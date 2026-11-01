# Changesets

Every pull request needs a changeset describing its release impact. Run `pnpm changeset`, choose the bump, and write a consumer-facing summary. Changes to published skill or schema content are versioned package changes. Changes with no effect on the published package, such as CI, repository tooling, or generated agent copies, use `pnpm changeset --empty`.

Merging to `main` runs the release workflow. While changesets are pending, it opens or updates a `chore(release): version packages` pull request that applies them to `package.json` and `CHANGELOG.md`. Merging that pull request leaves no pending changesets, so the workflow runs `pnpm release` and publishes any version not yet on npm.
