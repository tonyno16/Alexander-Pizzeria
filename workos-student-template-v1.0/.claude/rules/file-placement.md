# File Placement

Decide a file's home before creating it. The folder structure is the context router.

## First-Write Rule

Before the **first** `Write` of a new piece of work, classify it: inbox, area, project, or lab. Every file you create lives inside this workspace under a PARA folder.

- Writing to the repo root, **above** the repo (a sibling path in `~/Code/`), or into another repo is the exception — it needs a stated reason, never a default.
- If the work is project-shaped (finish line, deliverable, multi-step) and no `03-projects/<project>/` home exists, **offer to spin one up** before scattering files. Same for an ongoing function with no area.
- When a deliverable spans two repos, pick one as home and link — don't drop it in the shared parent directory.
- [`placement-guard.py`](../scripts/placement-guard.py) nudges (non-blocking) when a new file lands outside PARA, at the root, or above the repo. Treat the nudge as a prompt to re-classify, not noise.

## Top-Level Folders

- `00-brain/`: business identity, customers, offers, voice, glossary, operating context, audit.
- `01-inbox/`: flat drop zone for unsorted inputs. Temporary, never a knowledge base.
- `02-areas/`: ongoing business functions that do not finish.
- `03-projects/`: time-bound work with a finish line.
- `90-lab/`: experiments, prototypes, vibe-coded apps, dashboards, scratch tools.
- `99-archive/`: rollback buffer for inactive work. Archive rather than delete.

## Overview Files

Every area, project, and lab app starts with `_overview.md`.

Required frontmatter (`status`, `owner`, `claude_role`, `last_updated`) and sections (`## Purpose`, `## Load First`, `## Housekeeping`, `## Archive Criteria`) are checked by [`workos-doctor.py`](../scripts/workos-doctor.py) `OVERVIEW_REQUIRED`. A *missing* `_overview.md` blocks the stop hook; a *malformed* one (missing field/section) warns rather than blocks. Add canonical links, active decisions, next action, next decision, success criteria, risks when they add signal.

Every active `_overview.md` should carry current status, `last_updated`, next action, and next decision — enough for another session to pick up cold.

## Area vs Project

- **Area** when work is ongoing and does not finish (marketing, sales, support, finance, ops, product, content).
- **Project** when work has a finish line (launch a course, migrate a workspace, publish a campaign).
- If both could fit: prefer project for time-bound outcomes, area for recurring operations.
- Active projects should link to their accountable area with `primary_area` frontmatter. Use `primary_area: none` only when there is an explicit reason.
- Do not create nested PARA/workspace folders by default. Client or venture context is an `area_type`; finish-line work still lives in `03-projects/`.

## Inbox

`01-inbox/` is flat, processed frequently. Useful files move to their owning area/project/lab folder; durable facts move into the canonical brain file; stale inputs go to `99-archive/`.

## Lazy Subfolders

Create subfolders only when files exist or are about to exist: `drafts/`, `research/`, `assets/`, `final/`, `scripts/`, `data/`, `apps/`. No empty folder theater.

## Archive

`99-archive/<original-top-level>/<old-path>/` mirrors the original location. Never empty archive automatically — it is a rollback buffer.

## Progressive Disclosure

- Lab/app conventions, promotion criteria → [lab-apps.md](lab-apps.md) (auto-loads in `90-lab/` and app folders).
- Area & project conventions (overview discipline, area-vs-project) → [work-containers.md](work-containers.md).
- Generated cross-workspace view → `/work-map`.
- Follow-up registry (autonomous "check this later" + 2x/day runner) → [follow-ups.md](follow-ups.md).
- Shared SOPs, team docs, collaboration artifacts: the connected external system (Notion, Linear, Asana, shared Drive, etc.). Local files store pointers, execution summaries, drafts.
