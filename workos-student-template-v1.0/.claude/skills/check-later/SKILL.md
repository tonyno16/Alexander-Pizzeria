---
name: check-later
description: Create a follow-up check in the local registry — both the explicit path ("/check-later", "remind me to check X on Friday", "follow up on Y by Tuesday") and the autonomous path I take when work I just finished needs verifying later (a queued broadcast, an external ask, a background sync, a Yellow action that needs a sanity check). Writes the tasklist row + deep task file per the registry contract.
---

# Check Later

Create one follow-up entry in the local registry. The runner (`/follow-up-runner`) will pick it up at the next 08:00 or 15:00 run after `due`.

## When To Use

- User explicitly asks ("remind me to check X", "follow up on Y by date").
- This turn produced a verification obligation per the triggers in [`.claude/rules/follow-ups.md`](../../rules/follow-ups.md#creation). Surface in turn summary.

## Search Before Write

```bash
rg -F "<keyword>" 02-areas/follow-ups/tasklist.md
```

If a row already covers this check, update its `Due` instead of creating a duplicate.

## Inputs Needed

Minimum to write a usable follow-up:

- **What to check** — one sentence.
- **How to check** — concrete steps (tool calls, file reads, MCP commands).
- **Decision tree** — what to do for each plausible outcome (done / blocked / re-check). The runner needs this to know when to archive vs leave vs escalate.
- **Due** — when the check should run. Infer from context (e.g. "Friday" → next Friday 08:00, "in 3 days" → today+3 08:00).

Optional but useful:

- **Owner** — the project or area this check belongs to (relative path).
- **Context** — links, prior decisions, anything the runner cannot re-derive from current state.

If any of the three required body sections cannot be filled, stop and ask. A check with no decision tree is worse than no check.

## Workflow

1. Compose `id`: `<YYYY-MM-DD>-<short-slug>` (today's date + 2-5 word slug, lowercase, hyphenated).
2. Write `02-areas/follow-ups/tasks/<id>.md` with frontmatter + body:

```markdown
---
id: <id>
created: <ISO8601 local>
session_id: <if known, else omit>
due: <ISO8601 local>
owner: <relative path or omit>
status: pending
---

## What to check
...

## How to check
1. ...
2. ...

## Decision tree
- <outcome A> → done, log result
- <outcome B> → blocked, escalate
- <outcome C> → re-check in N days (set new due)

## Context
(optional)
```

3. Append a row to `02-areas/follow-ups/tasklist.md`, keeping rows sorted by `Due` ascending:

```markdown
| <Due YYYY-MM-DD HH:MM> | <id> | <Title> | <Owner or —> | pending |
```

4. If this was an autonomous creation (not user-requested), include one line in the turn summary so the user can veto:

```
Created follow-up: <id> — <title>, due <date>.
```

## Verification

- `rg "^\| <id> " 02-areas/follow-ups/tasklist.md` returns 1 line.
- `test -f 02-areas/follow-ups/tasks/<id>.md` succeeds.
- Frontmatter has all required fields.

## Do Not

- Create a follow-up for trivial chat or one-off debugging.
- Mirror to external systems automatically.
- Write a check without a decision tree.
- Use a `Due` more than 90 days out without surfacing it — that is a memory leak, not a check.
