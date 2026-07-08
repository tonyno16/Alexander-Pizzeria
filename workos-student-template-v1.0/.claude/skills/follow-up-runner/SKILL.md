---
name: follow-up-runner
description: Walk the local follow-up registry and execute any check whose due time has passed. Invoked by the 08:00 and 15:00 local scheduled task. Only acts on due rows; archives done tasks, leaves blockers in place, logs every run. Use when the user says "run follow-ups", "/follow-up-runner", "process the follow-up queue", or when the scheduled task fires.
---

# Follow-Up Runner

Walk `02-areas/follow-ups/tasklist.md`, execute due checks, archive done, log everything.

Contract: [`.claude/rules/follow-ups.md`](../../rules/follow-ups.md). Do not duplicate the contract here; follow it.

## Loop

1. **Read** `02-areas/follow-ups/tasklist.md`. Parse the table.
2. **Filter** rows where `Status == pending` AND `Due <= now (local)`.
3. **For each due row:**
   a. Load `02-areas/follow-ups/tasks/<id>.md`.
      - Missing → append `⚠ orphan <id>` to the run block, skip.
      - Malformed frontmatter → append `⚠ malformed <id>`, skip.
   b. Execute the check per `## How to check`.
   c. Match outcome against `## Decision tree`. Apply the named action:
      - **Done** → see "Archive done" below.
      - **Blocked** → set deep file frontmatter `status: blocked`, set row `Status: blocked` (do NOT remove the row), append `⚠ blocked <id> — <reason>` to the run block.
      - **Still pending with new due** → update `due` in deep file frontmatter AND `Due` in tasklist row.
4. **Skip** rows not yet due — do not log them individually. Count them.
5. **Append run block** to `02-areas/follow-ups/log.md` (newest on top — insert after the `# Runner Log` header).

## Archive Done

- Move `02-areas/follow-ups/tasks/<id>.md` → `99-archive/02-areas/follow-ups/tasks/<id>.md` (create the archive folder if needed).
- Set the archived file's frontmatter `status: done` before moving.
- Remove the row from `tasklist.md`.
- Append `✓ done <id>` to the run block.

## Run Block Shape

```markdown
## <YYYY-MM-DD HH:MM> — run

- ✓ done: <id> (<one-line result>)
- ⚠ blocked: <id> (<reason>)
- ⚠ orphan: <id>
- N pending not yet due
```

If nothing was due, still write a run block with `0 due, N pending not yet due`. The log is the audit trail.

## Reversibility

- Green and obvious Yellow per [`core.md`](../../rules/core.md) — apply automatically.
- Red — never unattended. If the decision tree says Red, mark `blocked` with reason `requires Red decision: <what>`.

## Verification

- After each pass, `tasklist.md` is still parseable as a table.
- Every row processed appears in the run block.
- Archive moves are atomic (no half-moved files).

## Do Not

- Re-execute a check whose row was already updated in this pass.
- Touch rows not yet due.
- Crash the run on any single malformed file. Log and continue.
- Add new work to the registry inside a run. The runner verifies; it does not create new follow-ups (those happen in normal sessions via `/check-later`).
