# 09 · Handoff & Setup Report

**Goal:** End the wizard with a scannable setup report, an audit entry, and a clear pointer at *what to do next*. Do not stop at "setup complete" without a next step.

## Setup report

Output to chat (the founder will probably skim it on mobile). Format:

```
Setup complete.

In your brain now:
- Business identity: <one-line summary>
- Customers: <N segments>
- Offers: <N active>
- Voice: <2-3 anchor traits>
- Current state: <N priorities>
- Work map: <operating model> using <function|client|venture|mixed> areas
- External systems: <list of names>
- Autonomy stance: Green / Yellow / Red captured

Mining:
- <Source path> mined (if applicable) — see audit/migration-<date>.md
- Or: started fresh from interview

Pending:
- <secrets to populate in .env, if any>
- <MCPs to wire, if any>
- <integrations the founder mentioned but didn't connect>

Next move:
- Your first workflow: drop a call/podcast/video transcript in 01-inbox/ and I'll turn it into social posts. Run /new-area named "content" to give it a home.
- Or just start working — drop files in 01-inbox/, ask me to draft something, etc.
```

Keep it tight — no headers below this level, no walls of text.

## Audit entry

Append to `00-brain/audit/workos-audit.jsonl`:

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"setup-complete","path_before":null,"path_after":"00-brain/","reason":"wizard finished — <mining|fresh> + <N> interview sections","reversal":"n/a"}
```

This entry is what triggers refresh mode on future runs (the SKILL.md stage-1 check looks for it). Make sure the timestamp is current and the `actor` is exactly `setup-workos`.

## Update current-state

Edit `00-brain/current-state.md` to:

1. Refresh `last_updated` to today.
2. Add a `## Recent Migration` section if mining was done, pointing at the migration report.
3. Confirm active priorities reflect what came out of section 06.
4. Confirm `## Workspace Shape` reflects the selected operating model.

## Doctor

Run `python3 .claude/scripts/workos-doctor.py` and confirm clean. If it has warnings, list them under "Pending" in the setup report — don't silently swallow them.

## Handoff to first workflow

The wizard's last sentence to the founder must be a concrete next step, not a vague "you're all set". The first workflow is locked: turn a transcript into social posts. Point them straight at it:

> "Your first workflow is turning a transcript into social posts. Drop a call, podcast, or video transcript in `01-inbox/` and I'll draft the posts in your voice — run `/new-area` named \"content\" when you want a permanent home for it."

Hand them the one workflow; don't offer a menu. Do not start it autonomously.

## Verification

- Setup report was sent to chat.
- `workos-audit.jsonl` has a `setup-complete` entry with current timestamp and exact actor name.
- `current-state.md` has today's `last_updated` and reflects this week's priorities.
- Doctor ran and any warnings are surfaced in the report.
- The founder was pointed at the first workflow (transcript → social posts) or another concrete next step, not left with "setup complete".
