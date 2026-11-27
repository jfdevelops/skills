---
title: jf-naming-conventions
description: Find the naming rules for files, symbols, packages, and public APIs.
order: 10
---

`jf-naming-conventions` keeps vocabulary consistent across source, tests, and documentation. It applies before adding or renaming files, directories, symbols, packages, or APIs.

## Project vocabulary and defaults

The agent inspects neighboring code, package names, and the project glossary first. Established conventions and framework-reserved filenames are preserved. For new projects, the defaults are:

| Element | Convention | Example |
| --- | --- | --- |
| Source files and directories | kebab-case | `skill-discovery.ts` |
| Functions and variables | camelCase | `discoverPackageSkills` |
| Types, classes, and React components | PascalCase | `SkillDeclaration` |
| Booleans | Predicate names | `isInstalled`, `hasChanges` |
| npm packages | Lowercase kebab-case | `@jfdevelops/skills` |

Functions describe an action and result. Types use meaningful domain nouns instead of generic suffixes such as `Data` or `Manager`. Filenames use their enclosing context: `skills/discover.ts` rather than `skills/discover-skills.ts`. Role suffixes such as `.test.ts` follow the project's conventions.

The `@jfdevelops/` scope applies to packages intended for that scope; consuming projects keep their own scope. Shared jfdevelops convention skills use the `jf-` prefix, with a directory matching the frontmatter name.

## Rename coverage

A rename includes imports, public entry points, tests, documentation, and configuration references. Public API and import-path compatibility changes must be identified explicitly. The skill does not call for unrelated renames when adopted by an existing project.

## Example request

```text
Use jf-naming-conventions to name the new skill discovery helper. Reuse the project's vocabulary and identify any public import paths affected by the rename.
```

## Related skills

[jf-coding-conventions](jf-coding-conventions.md) covers implementation style. [Quick start](../quick-start.md) shows how to require installed skills by task.
