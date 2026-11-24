---
title: Quick start
description: Require installed conventions for the work an agent performs in your project.
order: 30
---

Point your project's agent instructions at the installed skills to require them
before applicable work. Keep your existing project rules when adding these links.

In this guide you will:

- Install the conventions you need.
- Add task-specific requirements to your agent instructions.
- Check that the agent can read the installed resources.

## Install the conventions

Follow [Installation](installation.md) from the project root. The example below
assumes every skill is installed in `.agents/skills/`.

## Add project instructions

Merge this section into your project's `AGENTS.md` or equivalent instruction file:

```text
## Required conventions

Read the applicable skill before starting work:

- Naming or renaming: [.agents/skills/jf-naming-conventions/SKILL.md](.agents/skills/jf-naming-conventions/SKILL.md).
- Implementing or reviewing code: [.agents/skills/jf-coding-conventions/SKILL.md](.agents/skills/jf-coding-conventions/SKILL.md).
- Git decisions: [.agents/skills/jf-git/SKILL.md](.agents/skills/jf-git/SKILL.md).
- Library documentation: [.agents/skills/jf-docs/SKILL.md](.agents/skills/jf-docs/SKILL.md).

Read relevant repository instructions first. Preserve existing user changes.
These skills do not authorize commits, pushes, publishing, or deployments.
```

Adjust the paths if your installation uses another location, and include only the
skills you installed. Record project-specific exceptions alongside your project
rules so agents can apply them before shared defaults.

## Check discovery

Confirm each linked `SKILL.md` exists and that `jf-git/references/` contains its
supporting Markdown files. `jf-docs` loads the other `jf-docs-*` skills from the
same directory, so confirm those are installed next to it. Ask your agent to identify the applicable skill and
read it before a matching task, such as naming a helper or editing a guide.

Explicit instruction links help make the requirement clear, but native skill
discovery still depends on your agent's configuration.

## Next steps

- [Understand each skill's scope](guides/choose-skills.md).
- [Troubleshoot missing instructions](guides/troubleshooting.md).
