---
name: new-project
description: Create a time-bound project with an `_overview.md` entrypoint, success criteria, canonical inputs, and archive rules. Use whenever the user wants to launch, ship, build, migrate, rebuild, publish, or finish anything with a deadline — course launches, campaigns, migrations, dashboards, rebuilds. Use even when the user doesn't say "project" — if there's a finish line, this is the skill.
---

# New Project

Use this when work has a finish line.

Projects are temporary containers for outcomes. They may touch many areas, but they should not become permanent homes for evergreen business truth. Every active project should link to the area accountable for moving it forward.

## Role In Skill System

`new-project` creates an execution container. It gives Claude a clear target, the context needed to act, and the conditions for completion or archive.

It should prevent:

- Work hiding inside area folders.
- Repeated context re-explaining.
- Finished work lingering as active.
- Project decisions leaking into global rules or brain files.
- Floating projects with no accountable area.

## Canonical Inputs

- `00-brain/current-state.md`
- `00-brain/business-profile.md`
- `02-areas/*/_overview.md` for related areas.
- `.claude/rules/file-placement.md`
- `.claude/rules/context-routing.md`
- `.claude/rules/security.md`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/new-project/scripts/plan_project.py`
- Existing `03-projects/*/_overview.md`
- External specs, Notion tasks, Drive docs, Slack threads, or customer evidence.

## Create vs Reuse

Before creating a project, check if one already exists for the same outcome.

Create a project only when:

- There is a deliverable, decision, launch, build, migration, campaign, or finish line.
- The work needs its own context and artifacts.
- It will not be cleaner as an area note or lab app.

An active project needs a `primary_area` unless there is an explicit reason it
has no owning area yet. `primary_area` is accountability; `related_areas` are
additional context.

Do not create a project for:

- A recurring business function.
- A single quick task that can be completed now.
- A raw idea with no owner or outcome.

## Workflow

1. Identify the intended outcome.
2. Infer the accountable area from the request and existing `02-areas/*/_overview.md`.
3. Run `python3 .claude/skills/new-project/scripts/plan_project.py "<project name>"` with `--area "<area>"` when known.
4. Use the JSON output to check slug, target path, duplicate candidates, related area candidates, and template.
5. Search existing projects for overlap if the helper shows possible duplicates.
6. Ask for `primary_area` only when multiple areas are plausible or none can be inferred.
7. Choose a slug, preferably `YYYY-MM-short-name` when timing matters.
8. Create `03-projects/<project-slug>/_overview.md`, or rerun the helper with `--write` only when creation is Green.
9. Fill the overview from the template below.
10. Link canonical external specs instead of copying them.
11. Add only subfolders needed for current work: `research/`, `drafts/`, `assets/`, `data/`, `scripts/`, `apps/`, `final/`.
12. Move or link obvious related files when Green or Yellow.
13. Update `00-brain/current-state.md` if this project changes active priorities.
14. Log creation and meaningful context routing.
15. Report project path, primary area, open decisions, and immediate next action.

## `_overview.md` Template

```md
---
status: active
owner: <person or team>
container_type: project
primary_area: <area overview link or none>
related_areas: []
claude_role: <how Claude should behave in this project>
last_updated: YYYY-MM-DD
---

# <Project Name>

## Purpose

What will be true when this project is done.

## Success Criteria

- ...

## Load First

- Canonical brain links:
- Area links:
- External source-of-truth links:
- Relevant files:

## Current Plan

- ...

## Decisions

- ...

## Risks And Constraints

- ...

## Artifacts

- Drafts:
- Research:
- Assets:
- Apps:
- Final:

## Handoff

What another Claude thread or teammate needs to know before continuing.

## Housekeeping

- Subfolder discipline: create `research/`, `drafts/`, `assets/`, `data/`, `scripts/`, `apps/`, `final/` only when there is real work to put inside.
- Link external specs and long docs instead of copying them locally.
- Refresh `last_updated` after meaningful progress.

## Archive Criteria

Archive when:

- ...
```

## Memory Store / Inject / Recall

- **Store:** Durable project decisions live in the project overview. Stable founder preferences may go to Claude memory. Evergreen business truth moves to `00-brain/`.
- **Inject:** Keep the project overview current enough for multi-thread work.
- **Recall:** At the start of project work, load this overview, related area overview, and linked canonical docs.

## Human Checkpoints

Ask before:

- Choosing strategy when multiple valid paths exist.
- Changing scope, success criteria, launch timing, budget, customer promise, or external commitments.
- Moving work across project boundaries when ownership is ambiguous.
- Archiving an active project.

Proceed automatically when:

- Creating a project explicitly requested by the founder.
- Filling the overview with known context.
- Updating status or handoff after work done in the current thread.

## Outputs And Handoffs

Report:

- Project path.
- Related area.
- Primary area.
- Success criteria.
- Canonical inputs.
- Files moved/linked.
- Immediate next execution step.

## Housekeeping

- After creating the project, relocate any obviously related files in `01-inbox/` or the wrong area into the project's owning subfolders.
- Update `last_updated` whenever you change status, success criteria, decisions, or handoff content.
- Link external specs/long docs in `## Load First` rather than copying them locally.

## Audit

Log:

- Project creation.
- Changes to status, success criteria, archive criteria, or canonical inputs.
- File moves and app promotions.

## Failure Modes

- **Permanent project:** If it has no finish line, it is an area.
- **Floating project:** Active projects should have `primary_area` or an explicit `none` reason.
- **Strategy hidden in docs:** Put decisions in `_overview.md`; link long docs.
- **Context drift:** Update `last_updated` and handoff after meaningful progress.
- **Local mirror trap:** Do not duplicate Notion/Drive docs locally unless local execution requires a working copy.

## Verification

- The project has `_overview.md`.
- `python3 .claude/skills/new-project/scripts/plan_project.py "<project name>"` ran before creation.
- Outcome and success criteria are clear.
- `primary_area` is linked or the absence is intentional.
- Load-first context is complete enough for a new thread.
- Archive criteria exist.
- Audit log entries exist for meaningful changes.

## Quality Gate

A good project lets Claude answer: "What are we trying to ship, what do I load first, and how do I know it is done?"
