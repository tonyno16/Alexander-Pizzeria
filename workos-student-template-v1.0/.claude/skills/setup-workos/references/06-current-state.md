# 06 · Current State

**Goal:** Fill `00-brain/current-state.md` so every future Claude session starts by knowing *what matters this week* without needing the founder to re-brief.

**Brain file:** `00-brain/current-state.md`

## Pre-check

Read the file. Note its current `last_updated`. If stale (>30 days), treat as empty and re-ask. If filled and fresh, confirm:

> "Brain says this week's priorities are: <list>. Still right, or has the focus shifted?"

## Questions (only for empty / stale)

Ask 2–3:

1. **What are you working on right now?** Top 3 active priorities (one line each).
2. **Open decisions.** What's stuck waiting on you to decide?
3. **Deadlines you care about.** Dates Claude should know.
4. **Recent shifts.** What changed in the last 2 weeks that future sessions should know about?
5. **Risks / blockers.** What might derail this week's plan.

## Writing the brain file

Required sections:

- `## Active Priorities` — top 3 with status + owner.
- `## Open Decisions` — list of decisions awaiting answers.
- `## Upcoming Deadlines` — dated list (use ISO `YYYY-MM-DD`).
- `## Recent Shifts` — last 2 weeks of meaningful changes.
- `## Risks / Blockers` — current threats to the plan.

Update `last_updated` to today.

## Staleness handling

`current-state.md` is the file most likely to go stale. Add a note at the top:

```md
> Refresh this file at the start of any session where focus has shifted, or whenever cleanup-workos flags it.
```

This makes it less likely to be ignored.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/current-state.md","path_after":"00-brain/current-state.md","reason":"this-week priorities captured","reversal":"git revert <file>"}
```

## Verification

- `current-state.md` has at least 2 active priorities with status.
- `last_updated` is today's date.
- Deadlines (if any) use ISO format.
- The file is short — current state is meant to be a snapshot, not a history.
