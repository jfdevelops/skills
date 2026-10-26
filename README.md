# @jfdevelops/skills

Shared agent conventions, versioned independently of the jfdevelops CLI. This initial release contains naming, coding, and commit conventions. Each skill uses a portable `SKILL.md` with `name` and `description` frontmatter; its body uses ordinary project tools instead of agent-specific APIs.

## Bundled skills

| Skill | Applies before |
| --- | --- |
| [jf-naming-conventions](skills/jf-naming-conventions/SKILL.md) | Naming files, directories, symbols, packages, or APIs |
| [jf-coding-conventions](skills/jf-coding-conventions/SKILL.md) | Implementing or reviewing JavaScript, TypeScript, or React |
| [jf-commit-conventions](skills/jf-commit-conventions/SKILL.md) | Staging for a commit or preparing a commit |

These skills choose no optional integrations. Portless, Convex, TanStack, and jfdevelops library guidance belongs to separately selected addons or package-owned skills.

## Package discovery

`package.json` declares the public discovery contract:

```json
{
  "jfdevelops": {
    "skills": [
      {
        "name": "jf-naming-conventions",
        "path": "./skills/jf-naming-conventions"
      }
    ]
  }
}
```

This is a jfdevelops convention, not an npm or Agent Skills standard. Each path names a directory containing `SKILL.md` inside the published package. Names are unique and match the directory and frontmatter; paths remain within the package. The [JSON Schema](schemas/package-skills.schema.json) describes the `jfdevelops` object. File existence, name agreement, and uniqueness also require semantic validation.

The future CLI will read this metadata from the installed package version, offer its skills for selection, and record provenance. No installer lifecycle hooks run in this package. Installing the npm package alone does not activate skills in an agent. The package has no JavaScript runtime entry point.

## Development

Requires Node.js 22 or newer and pnpm 10.28.1.

```sh
pnpm install --frozen-lockfile
pnpm check
node scripts/sync-agent-skills.mjs
node scripts/sync-agent-skills.mjs . --check
```

Canonical skill content lives in `skills/`. Agent discovery copies in `.agents/skills`, `.claude/skills`, `.cursor/skills`, and `.github/skills` are generated for this repository. Root instruction files require applicable skills explicitly; Gemini and other Markdown readers can follow those pointers. Native discovery still depends on the agent version and configuration; automated behavioral testing across all agent products has not been performed.

`sync-agent-skills.mjs` is temporary repository bootstrap tooling that regenerates owned files. It is not published as an installer and must not be run against an arbitrary existing project. The future CLI's `init` flow will preview changes and preserve existing instructions.

## Release status

Version `0.1.0` is prepared locally, not published. CI validates metadata, tests invalid declarations, checks generated copies, and inspects npm package contents. Publishing is a separate authorized action. Consumers should pin a released version; updates should be explicit.
