# 08 · Schedule Recurring Tasks

**Goal:** Wire two local scheduled tasks so the workspace stays tidy and the follow-up registry actually runs.

1. **Weekly cleanup** — `/cleanup-workos` produces a non-destructive audit report.
2. **Twice-daily follow-up runner** — `/follow-up-runner` walks `02-areas/follow-ups/tasklist.md` and acts on any check whose `due` has passed.

Both are local desktop schedules. Both are optional but recommended.

## Pre-check

Check if a scheduled-tasks MCP (or equivalent) is wired in `.mcp.json`:

```bash
grep -i "scheduled-tasks\|cron\|schedule" .mcp.json 2>/dev/null
```

The state determines the next action:

- **MCP wired** → propose both schedules and create them.
- **MCP not wired** → record the intent in the setup report; do not install anything.

## Propose to the founder

> "I can wire two recurring tasks for this workspace:
>
> 1. **Weekly cleanup** — every Monday morning in your timezone, `/cleanup-workos` audits stale files, dead drafts, missing `_overview.md` fields, and folders that should be archived. Produces a report; never deletes.
> 2. **Twice-daily follow-up runner** — at 08:00 and 15:00 local, `/follow-up-runner` processes any 'check this later' tasks you've queued via `/check-later`. Most days this does nothing visible; the value shows up the day you queue something and it runs without you remembering.
>
> Want me to schedule both, just one, or neither?"

Capture timezone from `00-brain/founder-profile.md` if it's there; otherwise ask once.

## If founder approves a schedule and MCP is wired

For each approved task, create the schedule via the scheduled-tasks MCP.

### Weekly cleanup

- Cron: `0 9 * * 1` (Mondays 09:00 local; adjust hour to founder's preference)
- Runs: `/cleanup-workos`
- Output: `00-brain/audit/cleanup-<YYYY-MM-DD>.md`
- Mode: non-destructive — the schedule produces a checklist, never deletes.

### Follow-up runner

- Cron: `0 8,15 * * *` (08:00 and 15:00 local)
- Runs: `/follow-up-runner`
- Output: append a run block to `02-areas/follow-ups/log.md`.
- Working directory: this repo's root.

Confirm next run time with the founder for each task created.

## If founder approves but MCP is not wired

1. Do not install an MCP — that's Red per `security.md`.
2. Write a clear note in the setup report under "Pending Setup":
   > "Scheduled-tasks MCP not wired. Once you connect one, ask me to schedule the cleanup and follow-up runner."
3. Log each deferred task in the audit JSONL.

## If founder declines

Note which task was declined in the setup report. Both can still be triggered manually (`/cleanup-workos`, `/follow-up-runner`).

## Audit entries

One entry per scheduled (or deferred) task:

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"schedule-cleanup","path_before":null,"path_after":"<MCP schedule id or 'pending'>","reason":"weekly cleanup scheduled / deferred","reversal":"delete schedule from MCP"}
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"schedule-follow-up-runner","path_before":null,"path_after":"<MCP schedule id or 'pending'>","reason":"twice-daily follow-up runner scheduled / deferred","reversal":"delete schedule from MCP"}
```

## Verification

- For each approved task: schedule exists, next run time was confirmed, OR the setup report lists a clear pending item.
- No MCP was silently installed.
- The cleanup schedule never has destructive permissions — it produces a report, never deletes.
- The follow-up runner has Green + obvious Yellow allowed, Red blocked — matches the contract in `.claude/rules/follow-ups.md`.
