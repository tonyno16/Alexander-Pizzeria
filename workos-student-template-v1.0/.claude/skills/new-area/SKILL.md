---
name: new-area
description: Create a clean ongoing business area with an `_overview.md` entrypoint, canonical links, and housekeeping rules. Use whenever the user wants to set up a recurring business function (marketing, sales, support, ops, finance, content, hiring), says "set up an area for X", "I need a place to track ongoing X", or describes a function with no finish line — even if they don't say "area".
---

# New Area

Use this when the business needs a new ongoing function.

Areas are durable parts of the business: marketing, sales, operations, product, support, finance, community, content, hiring, analytics. They can also represent durable client or venture context when that is the real operating boundary. If the work has a finish line, use `new-project` instead.

## Role In Skill System

`new-area` creates the stable context router for recurring work. It prevents projects, dashboards, docs, and SOP links from becoming scattered across the workspace.

An area should make future sessions faster by telling Claude:

- What this function owns.
- What it does not own.
- Which canonical sources to load.
- Which projects and apps relate to it.
- What stale work should eventually be archived.
- Whether this is a function, client, or venture area.

## Canonical Inputs

- `00-brain/business-profile.md`
- `00-brain/current-state.md`
- `.claude/rules/file-placement.md`
- `.claude/rules/context-routing.md`
- `.claude/rules/security.md`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/new-area/scripts/plan_area.py`
- Existing `02-areas/*/_overview.md`
- Relevant external source-of-truth links.

## Create vs Reuse

Before creating an area, check if an existing area already owns the work.

Create a new area only when:

- The function is ongoing.
- It will accumulate recurring context.
- It has durable ownership.
- Folding it into an existing area would make that area less clear.

Reuse or update an existing area when:

- The name differs but the function is the same.
- The work is a temporary campaign or initiative.
- The request is really a project inside an area.

Silently route to `new-project` instead when the request describes a launch,
campaign, migration, build, publish, deadline, deliverable, or finish line.
Ask only when the classification is genuinely ambiguous.

## Workflow

1. Identify the durable business function.
2. Classify `area_type`: `function`, `client`, or `venture`. Default to `function` unless the user clearly described client/venture context.
3. Run `python3 .claude/skills/new-area/scripts/plan_area.py "<area name>" --type "<area_type>"`.
4. Use the JSON output to check slug, target path, duplicate candidates, related projects, and template.
5. Search `02-areas/` for overlapping areas if the helper shows possible duplicates.
6. Search `03-projects/` and `90-lab/` for related active work.
7. Choose a clear slug: lowercase, hyphenated, boring.
8. Create `02-areas/<area-slug>/_overview.md`, or rerun the helper with `--write` only when creation is Green.
9. Fill the overview from the template below.
10. Add only needed subfolders. Do not create empty folder theater.
11. Link external human SOPs rather than copying them locally.
12. Move obvious existing files into the area only when Green or Yellow under the reversibility model.
13. Log creation and any moves.
14. Report what was created, what was linked, and what still needs a decision.

## `_overview.md` Template

```md
---
status: active
owner: <person or team>
container_type: area
area_type: function
claude_role: <how Claude should behave in this area>
last_updated: YYYY-MM-DD
---

# <Area Name>

## Purpose

What this area exists to operate.

## Scope

Owns:

- ...

Does not own:

- ...

## Load First

- Canonical brain links:
- External source-of-truth links:
- Related projects:
- Related apps:

## Operating Context

Recurring constraints, preferences, metrics, audiences, systems, and known pitfalls.

## Active Work

- ...

## Decisions

- ...

## Housekeeping

- Review cadence:
- Common misfiles:
- Subfolder discipline: only create folders when there is real work to put inside.

## Archive Criteria

Archive when:

- ...

## Notes

Use this section sparingly. Promote durable facts to `00-brain/` or a canonical external doc.
```

## Memory Store / Inject / Recall

- **Store:** If the founder clarifies a durable area preference, add it to the area overview or Claude memory depending on whether it is business context or operating behavior.
- **Inject:** Keep the area overview concise so Claude can load it before area work.
- **Recall:** Before creating projects/apps inside this area, load the area overview and linked canonical sources.

## Human Checkpoints

Ask before:

- Creating an area that changes business taxonomy.
- Moving customer-sensitive or strategic files.
- Deciding ownership when multiple teams/functions could own the area.
- Writing to external systems.

Proceed automatically when:

- The area is clearly missing and requested by the founder.
- Adding missing overview fields from known context.
- Moving obviously misfiled, reversible files.

## Outputs And Handoffs

Report:

- Area path.
- Canonical links added.
- Related projects/apps discovered.
- Files moved or intentionally left alone.
- Next suggested action, usually `new-project`, `process-inbox`, or `cleanup-workos`.

## Audit

Log:

- Area creation.
- Moved files.
- Updated links.
- Yellow classification decisions.

Each audit entry should include path, reason, and reversal.

## Failure Modes

- **Department sprawl:** Do not create a new area for every idea, campaign, client, or dashboard.
- **Project disguised as area:** If there is a finish line, create a project.
- **Premature client/venture taxonomy:** Do not create client or venture areas unless real work needs that boundary.
- **Copied SOPs:** Shared human-readable SOPs belong in Notion/Google Docs; link them locally.
- **Context landfill:** Do not dump random files into area root. Use purpose folders only when needed.

## Verification

- The area has `_overview.md`.
- `python3 .claude/skills/new-area/scripts/plan_area.py "<area name>"` ran before creation.
- Frontmatter includes `container_type: area` and `area_type`.
- The overview explains purpose, scope, owner, status, load-first context, and housekeeping.
- The area does not duplicate facts already owned by `00-brain/`.
- Related active projects or apps are linked.
- Audit log entries exist for meaningful changes.

## Quality Gate

A good area lets Claude start area work in under a minute without asking, "what is this folder for?"
