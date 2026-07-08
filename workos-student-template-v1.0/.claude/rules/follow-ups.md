---
paths:
  - "02-areas/follow-ups/**"
  - ".claude/skills/check-later/**"
  - ".claude/skills/follow-up-runner/**"
---

# Follow-Ups

Contract for the local follow-up registry. System overview: [`02-areas/follow-ups/_overview.md`](../../02-areas/follow-ups/_overview.md).

## Files

- `02-areas/follow-ups/tasklist.md` — index, one row per pending/blocked check, sorted by `Due` ascending.
- `02-areas/follow-ups/tasks/<YYYY-MM-DD>-<slug>.md` — deep file per check.
- `02-areas/follow-ups/log.md` — append-only runner log, newest on top.

## `tasklist.md` row

`| Due | ID | Title | Owner | Status |`

- **Due:** `YYYY-MM-DD HH:MM` (24h local) or `YYYY-MM-DD` (= 08:00 that day).
- **ID:** `<YYYY-MM-DD>-<slug>`, matches deep file's `id`.
- **Owner:** relative path to owning project/area, or `—`.
- **Status:** `pending` or `blocked`. Done rows are removed.

## Deep file

Frontmatter required: `id`, `created` (ISO8601), `due` (ISO8601), `status`. Optional: `session_id`, `owner`.

Body required: `## What to check`, `## How to check`, `## Decision tree`. Optional: `## Context`. The decision tree must define what the runner does for each plausible outcome — the runner is not allowed to improvise Red actions.

## Creation

**Autonomous (Alfred default):** create when this turn produced a verification obligation — queued email/broadcast/post, external ask, background sync kicked off, promise of "by date Y", Yellow action needing downstream sanity check. Use `/check-later`. Surface every autonomous creation in the turn summary for veto.

**Explicit:** `/check-later <description>` or natural-language equivalents.

Before adding a row, `rg -F "<keyword>" 02-areas/follow-ups/tasklist.md` — if a row already covers this check, update its `Due` instead of duplicating.

## Runner (`/follow-up-runner`, 08:00 + 15:00 local)

Processes only rows where `Status == pending` AND `Due <= now`. For each due row:

- **Done** → archive deep file to `99-archive/02-areas/follow-ups/tasks/<id>.md`, drop row.
- **Blocked** → set both row and deep file `status: blocked`, leave in place.
- **Re-check** → if deep file specifies new `due`, update both. Otherwise leave.

Applies Green and obvious Yellow per [`core.md`](core.md). Never Red unattended. Missing deep file → `⚠ orphan`. Malformed frontmatter → `⚠ malformed`. Never crashes the run.

## Do Not

- Treat the runner as a place to do new work. It verifies and cleans up.
- Create follow-ups for trivial chat or transient debugging.
- Mirror to external systems automatically. Local-only by design.
