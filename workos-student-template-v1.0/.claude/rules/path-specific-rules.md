---
paths:
  - ".claude/rules/**"
---

# Path-Specific Rules

How to use Claude Code's path-scoped rule mechanic. Decision tree and quality gate live in [rule-authoring.md](rule-authoring.md).

## How They Load

- All markdown files under `.claude/rules/` are discovered recursively.
- A rule without `paths` frontmatter loads unconditionally at session start.
- A rule with `paths` frontmatter loads only when Claude works with files matching those glob patterns.
- Path-scoped rules trigger when Claude reads matching files, not on every tool use.
- User-level rules in `~/.claude/rules/` load before project rules, so project rules can be more specific.
- `.claude/rules/` supports symlinks for shared rules.
- Use `/memory` to inspect which `CLAUDE.md`, local memory, and rules files are currently loaded.

## When To Create One

- The instruction applies only to a folder, app, project, area, or file type.
- The rule would add noise if loaded for every session.
- A subfolder needs durable behavior but does not need its own nested `CLAUDE.md`.
- A coding or content convention depends on path, such as `90-lab/**`, `02-areas/email/**`, or `03-projects/*/apps/**/*.{ts,tsx}`.
- An area or project has repeated behavior that should follow the files wherever they are opened.
- A client or venture area needs specific behavior. Use a scoped rule like `paths: ["02-areas/acme-client/**"]` instead of creating nested PARA folders or nested `CLAUDE.md` files.
- A lab/app convention should apply before promotion into an area or project.

## When Not To

- The behavior applies everywhere → global rule.
- The behavior is a multi-step repeatable workflow → skill.
- The information is business truth → `00-brain/` or the relevant `_overview.md`.
- The instruction is a one-off project decision → project `_overview.md`.
- The behavior must be technically enforced → settings, permissions, hooks, tests, or scripts.

## Template

```md
---
paths:
  - "02-areas/email/**"
  - "03-projects/*/apps/**/*.{js,ts,tsx}"
---

# <Rule Name>

Use this rule when working with files matched by the `paths` frontmatter.

## Behavior

- ...

## Canonical Context

- Link to the relevant brain, area, project, or external source.

## Do Not

- ...

## Verification

- ...
```

## Maintenance

- Keep the filename descriptive: `email-area.md`, `lab-apps.md`, `frontend-apps.md`.
- Store path-specific rules in `.claude/rules/`; subfolders are for human organization only, not scope.
- Use glob patterns relative to the project root.
- Prefer a small number of high-signal patterns over broad `**/*` catches.
- Include multiple patterns when one rule truly applies to several related locations.
- Do not duplicate global rules inside path-specific rules. Link or reference the global rule instead.
- If a path-specific rule grows into a procedure, convert the procedure into a skill and leave only routing/behavior in the rule.
- If a path-specific rule starts applying to most of the workspace, promote it into a global rule.
- If a path-specific rule is no longer useful, archive it under `99-archive/` with its original path preserved instead of deleting it.
- After changing a path-specific rule, run a quick search for overlapping rules and contradictions, then log the update in `00-brain/audit/workos-audit.jsonl`.
- During cleanup, review whether active areas/projects/lab apps have repeated corrections that deserve a path-specific rule.
- During new-area or new-project setup, do not create a path-specific rule by default; create one only when the overview cannot carry the behavior cleanly or the behavior needs to apply across many files.

Source: Anthropic Claude Code memory documentation, especially `.claude/rules/`, path-specific rules, `/memory`, and rule loading behavior.
