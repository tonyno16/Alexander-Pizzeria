---
name: refresh-brain
description: Full business-brain sync — scans every connected tool (Slack, Gmail, Google Drive, CRM, analytics, any connected MCP) for durable facts about the business, cross-checks them against 00-brain/, then hands the remaining gaps to setup-workos in refresh mode for a short interview. Use whenever the founder says the brain feels stale, out of date, or disconnected from reality; asks to "aggiorna il brain", "refresh del brain", "sync del brain", "la mia mente è diventata stantia"; says "molte cose sono cambiate" or "a lot has changed"; wants a periodic full brain update (e.g. monthly); or pastes a reminder like "interview me to bring the business brain up to date, scan my connected tools first." Do NOT use for a single new fact learned mid-conversation — that's workos-reflect. Do NOT use for first-time setup on an empty brain — that's setup-workos in first-run mode.
---

# Refresh Brain

A periodic full sync, not a drip feed. The founder shouldn't have to re-tell Claude things that already live in Slack, Gmail, or Drive — this skill reads those first, and only bothers the founder with what genuinely can't be found anywhere.

## Role In Skill System

This skill is the **scan-and-diff step that precedes `setup-workos` in refresh mode**. It does not run its own interview loop — `setup-workos` already owns that (one section at a time, references in `.claude/skills/setup-workos/references/`). Duplicating it here would mean two places to keep in sync.

- `workos-reflect` — captures 1-3 lessons after a single turn. Use that for "just learned this," not this skill.
- `setup-workos` (refresh mode) — the interview this skill hands off to for whatever it couldn't resolve.
- `cleanup-workos` — structural housekeeping (misfiled work, archive candidates). Not fact-gathering.

If the brain has never been filled at all, this skill is the wrong entry point — send the founder to `setup-workos` first-run instead.

## Canonical Inputs

- `00-brain/*.md` — the current canonical facts, read before scanning anything else.
- Whatever MCP tools are actually connected this session (check with a keyword `ToolSearch`, or note what showed up in `available_skills`/tool list — Slack, Gmail, Drive, CRM, analytics connectors vary per founder). Never assume a tool is connected; verify.
- `.claude/rules/brain-authoring.md` — the write discipline for step 4.
- `python3 .claude/scripts/workos-skill-tools.py setup-audit` — reuse this for structural gaps (placeholders, missing sections) instead of re-deriving it by hand.
- `00-brain/audit/workos-audit.jsonl` — recent entries, so you don't re-ask about something confirmed last week.

## Workflow

### 1. See what's actually there to scan

List the brain files and skim each one so you know current canonical facts before touching any external tool — otherwise you can't tell "new fact" from "already known." Run `setup-audit` for the structural gap list (placeholders, thin sections).

Then check which tools are actually connected this session. Don't guess — a founder who mentions "my CRM" may not have it connected here at all.

### 2. Scan connected tools, scoped

For each connected tool, pull **durable** facts across these categories: who we sell to, what we sell and at what price, current priorities, recent wins, how the business sounds. Search scoped and recent (e.g. last 60-90 days, relevant channels/senders) — this is a sync, not a full-mailbox archive dive. Never paste a raw thread, email, or transcript into a brain file; extract the fact and note where it came from, per `brain-authoring.md`.

Roughly, by tool type (adapt to what's actually connected — don't force a category that has no matching tool):

- **Chat tools (Slack, etc.)** — pinned messages, recent decisions, channel topics, anything read as a correction to an existing brain fact.
- **Email** — recent business threads: customer language, objections, wins, pricing questions. Search by relevance, not date-order through the whole inbox.
- **Docs/Drive** — recently modified files that look canonical (pricing sheets, brand guides, positioning docs), not every file in the drive.
- **CRM/analytics** — objective numbers (revenue, usage, top segments) rather than anecdote.

### 3. Diff against the brain

For every fact you found, bucket it as one of three things:

- **Matches what's already in the brain** — no action, don't mention it (don't pad the report with confirmations of things that were already right).
- **Contradicts or updates something in the brain** — a real candidate change. Note the old value, the new value, and the source (which tool, roughly when).
- **A genuine gap** — not found anywhere, brain or tools.

### 4. One quick confirmation pass, not a drip interview

Show the founder a short batch: "Here's what I found that looks different from what's in the brain — shout if any of these are wrong, otherwise I'll take them as confirmed." This is one message, not one question per fact — the point of scanning tools first is to *shrink* the interview, not replace it with an equally long confirmation loop. A tool-sourced fact is good evidence, not founder-confirmed truth, until they've had a chance to correct it — see `brain-authoring.md`'s rule against marking a guess as fact.

### 5. Hand off real gaps to setup-workos

Whatever's left — genuine gaps neither the brain nor any connected tool could answer — run through `setup-workos`'s refresh-mode wizard, section by section, using its existing `references/*.md` question sets. Skip any section your scan already filled. This is the "ask me only the gaps, one question at a time" part — let `setup-workos` do what it already does well instead of writing a second interview engine here.

### 6. Write the updates

Follow `.claude/rules/brain-authoring.md` for every change: search for the concept's canonical home first, update there (don't duplicate), bump `last_updated`, append an audit entry describing what was scanned and what changed.

### 7. Verify and report

Run `python3 .claude/scripts/workos-doctor.py --json`, resolve anything it flags. Then show the founder a short "what changed" summary — file by file, old → new, one line each. This is the artifact that matters; keep it scannable, not a wall of diffs.

## Human Checkpoints

- Ask before overwriting a fact the founder previously confirmed explicitly (in the brain or in a prior audit entry) with something merely inferred from a tool scan — flag the conflict instead of picking a side.
- Never write anything found in a DM, private channel, or personal email thread into the brain without the founder's explicit go-ahead — durable business facts belong in the brain; who-said-what-to-whom does not.
- Red per `.claude/rules/security.md` still applies: no secrets, no customer PII, no pasted credentials, ever.

## Failure Modes

- **Over-reading** — scrolling an entire inbox or drive instead of a scoped, relevant search. Wastes the founder's patience and your context budget.
- **False certainty** — writing a tool-scanned fact straight into the brain as canonical without the batch-confirm pass. A Slack message can be sarcastic, outdated, or from the wrong person.
- **Reinventing the interview** — asking the founder questions `setup-workos` already has a reference doc for, instead of handing off.
- **Report padding** — listing every fact that matched (no news) instead of only what changed or is missing. The founder wants the delta, not a full recap.
- **Skipping doctor/audit** — writing brain changes without running `workos-doctor.py` or logging the audit entry, leaving no trail for the next session.

## Quality Gate

Done when: every brain file that was actually stale is updated with today's date, the audit log has one entry describing what was scanned and changed, `workos-doctor.py` is clean (or warnings are documented as known), and the founder has seen a short before/after summary — not a transcript of the whole scan.
