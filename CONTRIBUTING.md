# Contributing

Read the required convention skills linked from AGENTS.md before applicable work.

Edit canonical instructions in `skills/`, then run `node scripts/sync-agent-skills.mjs` to refresh this repository's agent copies and provenance. Keep shared instructions independent of any selected addon, local path, personal credential, or agent-specific tool. Project exceptions belong in the consuming project's instructions.

Run `pnpm check` before delivery. The source validator intentionally supports this repository's two plain, single-line YAML fields; it is not a general YAML parser for third-party skills. Package checks verify that every declared skill is included in npm's publish file list.

The package metadata schema is the discovery contract. Update its documentation and validation together when changing that contract. Content changes are versioned package changes; review their effect on consumers before publishing. CLI integration and automatic publishing are separate implementation steps.
