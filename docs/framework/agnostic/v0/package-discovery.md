---
title: Package discovery
description: Read and validate the package metadata that declares bundled agent skills.
order: 40
---

The `jfdevelops.skills` field in `package.json` declares the skills shipped by a
package. Tooling can use it to discover instruction directories in an installed
package version.

## Read the declaration

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

This is a jfdevelops convention, not an npm or Agent Skills standard. The fragment
shows one entry; the package declares all four bundled skills.

| Field | Requirement |
| --- | --- |
| `jfdevelops.skills` | Nonempty array of skill declarations |
| `name` | Unique lowercase kebab-case name, at most 64 characters |
| `path` | Package-relative directory beginning with `./`, containing `SKILL.md` |

The metadata object allows only `skills`; each declaration allows only `name` and
`path`. Names must match the directory name and the skill's frontmatter. Paths
must stay inside the package, including after resolving symbolic links.

## Validate the contract

The package exports the schema at
`@jfdevelops/skills/schemas/package-skills.schema.json`. It describes the
`jfdevelops` object, rather than the entire package manifest.

Schema validation checks structure and field syntax. Semantic validation must
also check uniqueness, file existence, matching names, and resolved path
containment. This repository's `pnpm validate` checks those conditions for its
bundled skills; `pnpm check` additionally verifies package contents and installation.

## Separate discovery from activation

The package has no JavaScript runtime entry point and runs no installer lifecycle
hooks. Its exports expose `package.json` and the schema. Installing the npm package
does not activate skills in an agent.

Integration with the future jfdevelops CLI is a separate implementation step.
Use the [documented installation workflow](installation.md) for agent setup today.

## Next steps

- [Understand the bundled conventions](overview.md).
- [Install skills for an agent](installation.md).
