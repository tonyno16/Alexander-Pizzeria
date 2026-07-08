---
name: work-map
description: Generate and inspect the workspace map of areas, projects, and lab work. Use whenever the user asks what is active, what projects belong to what areas, wants a workspace dashboard/index, asks to fix area/project links, or wants to reconfigure from single-business to client/venture structure.
---

# Work Map

Use this to show the founder how active work is organized without hand-maintaining backlink tables.

`work-map` is a generated view. Canonical truth stays in each `_overview.md`, especially project `primary_area` and `related_areas` frontmatter.

## Canonical Inputs

- `02-areas/*/_overview.md`
- `03-projects/*/_overview.md`
- `90-lab/*/_overview.md`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/work-map/scripts/build_work_map.py`
- `.claude/rules/work-containers.md`

## Workflow

1. Run `python3 .claude/skills/work-map/scripts/build_work_map.py --json` to inspect current state.
2. If the user asked for a view, summarize the areas, projects, lab items, and warnings.
3. If the user asked to write the index, run with `--write`.
4. If warnings show missing or broken `primary_area`, propose the smallest fix. Ask only when ownership is ambiguous.
5. If the user asked to reconfigure structure, plan moves first. Do not move files until the mapping is obvious or approved.

## Outputs

- Chat summary for quick inspection.
- Optional generated `00-brain/workspace-index.md`.

## Housekeeping

- Do not update the generated index after every ordinary turn.
- Regenerate when setup runs, structure changes, cleanup asks for it, or the founder wants a current map.
- Keep project metadata canonical. Area backlinks are convenience, not source of truth.

## Verification

- Generated index says it should not be edited by hand.
- Active projects have `primary_area` or an explicit `none` reason.
- No nested `projects/` folder exists inside an area unless the founder intentionally made an exception.
