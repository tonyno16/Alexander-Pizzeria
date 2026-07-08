---
name: process-inbox
description: Clear `01-inbox/` by triaging unsorted files into canonical homes, extracting durable facts, updating links, and logging housekeeping. Use whenever the user mentions their inbox, says they dumped/dropped files, asks to sort/file/clean unsorted material, mentions `01-inbox`, or has a backlog of unfiled notes — even if they don't say "process inbox".
---

# Process Inbox

Use this to clear `01-inbox/`.

The inbox is not a knowledge base. It is a temporary loading dock. Anything left there should be Red, ambiguous, or intentionally waiting on a decision.

## Role In Skill System

`process-inbox` is the intake router. It turns raw inputs into organized context without making the founder manually file everything.

It should:

- Classify files quickly.
- Extract durable facts into canonical homes.
- Move working files to the right area/project/lab.
- Archive processed scratch.
- Leave only true decision items behind.

## Canonical Inputs

- `01-inbox/`
- `.claude/rules/file-placement.md`
- `.claude/rules/context-routing.md`
- `.claude/rules/security.md`
- `00-brain/_overview.md`
- `00-brain/workos-principles.md`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/process-inbox/scripts/inbox_plan.py`
- Existing area/project/lab `_overview.md` files.

## Triage Classes

- Durable business truth: extract into `00-brain/` and archive or move the source.
- Area work: move to `02-areas/<area>/`.
- Project work: move to `03-projects/<project>/`.
- Experiment/app/dashboard: move to `90-lab/<slug>/`.
- External SOP or shared human doc: store the URL pointer in the owning `_overview.md`.
- Duplicate or processed source: archive.
- Secret/customer-sensitive material: Red, ask first.

## Workflow

1. Run `python3 .claude/skills/process-inbox/scripts/inbox_plan.py`.
2. Use the JSON output to identify file type, likely owner, and sensitivity.
3. Read only enough content to confirm or correct each suggested destination.
4. Check for existing matching areas, projects, or lab apps.
5. Silently prefer project destinations for launch, campaign, migration, build, publish, deadline, deliverable, or other finish-line material.
6. Prefer area destinations for recurring context, ongoing operations, SOP pointers, and durable client/venture context.
7. For each Green file, move it to the correct home.
8. Before extracting a durable fact, search `00-brain/canonical-concepts.md` and existing brain/area/project files for an existing home. Edit the existing canonical file; create a new one only when no current file claims the concept.
9. For durable facts, update only the canonical brain file and avoid duplicating the source.
10. For moved files, update any links or pointers affected by the move.
11. For stale or processed files, archive to `99-archive/01-inbox/<original-path>` rather than deleting.
12. For Red items, leave them in place and list the decision needed.
13. Log each move, extraction, archive, or Red hold.
14. Report a concise table: file, action, destination, reason, remaining decision.

## Destination Recipes

- Raw research for active project: `03-projects/<project>/research/`
- Draft content for area: `02-areas/<area>/drafts/`
- Final deliverable: `03-projects/<project>/final/`
- Images or design files: owning `assets/`
- CSV/JSON/data: owning `data/`
- Script or automation: owning `scripts/`
- Local dashboard/app: `90-lab/<app-slug>/`

## Memory Store / Inject / Recall

- **Store:** Durable preferences discovered during triage go to Claude memory only when they are stable operating preferences.
- **Inject:** Durable business facts go to `00-brain/`; active execution context goes to the owning `_overview.md`.
- **Recall:** Before moving a file, load the likely owner overview so the file lands where future Claude threads will look.

## Human Checkpoints

Ask before:

- Touching secrets or private customer data.
- Deciding between multiple plausible canonical homes when it affects future strategy.
- Moving work outside the workspace.
- Writing to external systems.
- Deleting anything.

Proceed automatically when:

- File ownership is obvious.
- A source has already been processed and archiving is reversible.
- A duplicate fact can be replaced with a canonical link.

## Outputs And Handoffs

Report:

| File | Action | Destination | Reason | Decision Needed |
|---|---|---|---|---|

Also summarize:

- Durable facts extracted.
- Files left in inbox and why.
- Any suggested rule/skill improvements.

## Housekeeping

- After moving files, update any links or pointers affected by the move.
- Refresh `last_updated` on `_overview.md` files that received new content.
- Archive — never delete — processed source material to `99-archive/01-inbox/<original-path>`.
- Leave `01-inbox/` empty except for Red/ambiguous items.

## Audit

Log every meaningful move, extraction, archive, and Red hold.

Include:

- Timestamp.
- Skill name.
- Action.
- Source path.
- Destination path.
- Reason.
- Reversal path or command where possible.

## Failure Modes

- **Inbox as archive:** If a file is processed, archive or move it.
- **Over-reading:** Read enough to classify; do not spend deep research time unless needed.
- **Fact duplication:** Do not paste the same fact into a project, area, and brain file.
- **Secret exposure:** Do not quote secrets in reports or logs.
- **Root dump relocation:** Do not move clutter from inbox to another vague dump folder.
- **Area/project confusion:** Do not file finish-line work into an area just because the area is named in the input; create or use a linked project.

## Verification

- `01-inbox/` is empty or only contains Red/ambiguous items.
- `python3 .claude/skills/process-inbox/scripts/inbox_plan.py` ran and its classifications were confirmed or corrected.
- Every moved file has a clear owner.
- No root dumps or vague `outputs/` folders were created.
- Durable facts were extracted into one canonical home.
- Links were updated when paths changed.
- Audit log entries exist for all meaningful actions.

## Quality Gate

The inbox pass is done when a future Claude thread can ignore `01-inbox/` unless it is intentionally resolving a listed decision.
