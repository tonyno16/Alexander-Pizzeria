---
name: setup-workos
description: First-run setup for the Claude WorkOS template. Run as an interactive wizard that auto-detects existing workspaces, offers to mine them, then interviews the founder only for the gaps. Use whenever a founder is initializing the workspace for the first time, says "set up the workos", "first run", "initialize my workspace", "I just cloned this", "onboard me", "let's get started", or asks where to start. Also use when refreshing brain context, verifying secret handling, or bootstrapping `00-brain/` from scratch.
---

# Setup WorkOS

Use this when setting up or refreshing the WorkOS foundation.

This is not a folder-init command. It is a wizard: greet the founder, detect existing workspaces they may want to mine, walk through one short interview section at a time, and leave the workspace with enough canonical context for every other skill to operate without re-asking the same questions.

Setup has three modes:

- **first-run:** initialize the workspace from scratch.
- **refresh:** update stale or missing brain context without rebuilding structure.
- **reconfigure-work-map:** change how areas and projects are organized when the business shifts, such as moving from single-business work to client/venture work.

## Role In Skill System

`setup-workos` is the root onboarding skill. It pairs with `migrate-existing-workspace` — if the founder has a previous workspace, this skill detects it and hands off mining to migrate before interviewing. It also pairs with `refresh-brain`, which scans connected tools (Slack, Gmail, Drive, etc.) before a refresh-mode run so this skill's interview only covers what scanning couldn't answer.

It should leave the workspace with:

- A usable `00-brain/` populated either from mining, interview, or both.
- A clear founder/operator profile.
- A current-state file Claude can use at the start of future sessions.
- A smallest-useful work map: function areas for most single-business users, client areas for broad agency/client work, or venture areas for multi-brand operators.
- Secret handling verified.
- A first audit trail.
- Obvious missing context listed as decisions, not silent gaps.

## Canonical Inputs

- `CLAUDE.md`
- `.claude/rules/core.md`, `context-routing.md`, `file-placement.md`, `security.md`, `rule-management.md`
- `.gitignore`
- `.env.example`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/setup-workos/scripts/setup_audit.py`
- `.claude/skills/setup-workos/references/*.md` — wizard sections, loaded on demand.
- `00-brain/_overview.md`, `workos-principles.md`, existing `00-brain/*.md` files.

Never read or edit `.env` unless the founder explicitly approves it for the current task.

## Safety Defaults

- Confirm presence of secrets by name only — never by value.
- Search before write. Before creating or editing any `00-brain/` file, read its current state. If a field is already filled, refresh or merge — do not overwrite.
- One canonical home per fact. Link instead of duplicating.
- Ask before publishing, sending, deleting, or writing to external systems.
- Do not silently install MCPs, packages, or hooks.

## Workflow

The setup runs in three stages: detect → wizard → wrap-up. Use **TaskCreate** to add one task per stage-2 section and process them one at a time. Do not bulk-ask all interview questions in one message.

### Stage 1 — Detect prior state (one command)

1. Check if setup has run before: if `00-brain/current-state.md` has a `last_updated` within the last 30 days **and** `00-brain/audit/workos-audit.jsonl` contains a `setup-workos` entry, switch to **refresh mode**: show only brain gaps and skip filled sections. The founder can override with "run full setup again".
2. Run `python3 .claude/skills/setup-workos/scripts/setup_audit.py` for the safety/brain inventory.
3. Run `python3 .claude/scripts/workos-skill-tools.py discover-workspaces` for the mineable-workspace list.
4. Show the founder a short summary of both: what's missing in brain, and which existing workspaces might be worth mining.

### Stage 2 — Wizard

Use **TaskCreate** to add one task per reference doc below. Process **one at a time**. For each: load the reference → ask its scoped questions → update the matching brain file → mark complete → move on.

Default task list (skip a section only if it's already filled and the founder agrees):

1. **Discovery & mining handoff** → [`references/00-discovery.md`](references/00-discovery.md)
2. **Safety & secrets** → [`references/01-safety-and-secrets.md`](references/01-safety-and-secrets.md)
3. **Business identity** → [`references/02-business-identity.md`](references/02-business-identity.md)
4. **Founder profile** → [`references/03-founder-profile.md`](references/03-founder-profile.md)
5. **Customers & offers** → [`references/04-customers-and-offers.md`](references/04-customers-and-offers.md)
6. **Brand voice** (the business's writing voice) → [`references/05-brand-voice.md`](references/05-brand-voice.md)
7. **Assistant chat voice** (how Claude talks to the founder — separate from brand voice) → [`references/05a-voice-picker.md`](references/05a-voice-picker.md)
8. **Current state** → [`references/06-current-state.md`](references/06-current-state.md)
9. **Work map** → [`references/06a-work-map.md`](references/06a-work-map.md)
10. **External systems & Claude posture** → [`references/07-external-and-posture.md`](references/07-external-and-posture.md)
11. **Schedule recurring tasks** (weekly cleanup + twice-daily follow-up runner) → [`references/08-cleanup-schedule.md`](references/08-cleanup-schedule.md)
12. **Handoff & setup report** → [`references/09-handoff-and-report.md`](references/09-handoff-and-report.md)

**Wizard rules** (apply to every section):

- Ask **2–3 focused questions per section**, not a flood. The founder is a busy operator, not a survey respondent.
- Before asking, check if the answer exists in mining output, an existing brain file, prior memory, or local context.
- If an answer is partially known, confirm rather than ask cold ("Looks like your audience is X — is that still right?").
- Skip optional sections the founder doesn't need yet ("We can fill voice later — skip for now?").
- Update the matching brain file immediately after each section, not at the end. The founder sees progress.
- Mark each TaskCreate item complete only after the brain file is updated and verified.
- For work-map reconfiguration, plan first. Move files only when ownership is obvious or the founder approves the proposed mapping.

**Never auto-skip the assistant chat voice (step 7).** `.claude/rules/voice.md` ships filled with the house default voice — that is NOT founder choice. Only skip step 7 if `00-brain/audit/workos-audit.jsonl` already contains a `set-assistant-voice` entry (the signal that the founder has explicitly picked). Otherwise always run it. The reference doc's Pre-check enforces this; do not override it with the general skip-when-filled rule.

### Stage 3 — Wrap-up

After all wizard tasks complete:

1. Run `python3 .claude/scripts/workos-doctor.py`. Resolve errors; document warnings.
2. Confirm `00-brain/current-state.md` has today's `last_updated` and lists active priorities.
3. Append a `setup-workos` entry to `00-brain/audit/workos-audit.jsonl` per [`references/09-handoff-and-report.md`](references/09-handoff-and-report.md).
4. Send the founder a scannable setup report (template in handoff doc) and hand them straight to their first real workflow: turning a call/podcast/video transcript into social posts.

## Failure Modes

- **Generic brain** — if the brain could describe any business, keep mining or interviewing.
- **Duplicate truth** — same fact appearing in multiple files. Pick one canonical home and link.
- **Over-questioning** — asking for non-essential info that mining could have surfaced.
- **Mining skipped** — proceeding to interview without checking for existing workspaces first.
- **Bulk-asking** — flooding the founder with 8 sections of questions in one message. One section at a time, always.
- **Secret leakage** — secret value appearing anywhere outside `.env`.
- **False certainty** — extracting a fact from mining and writing it as canonical without confirmation.
- **Setup-without-handoff** — finishing without pointing the founder at their first real workflow.
- **Taxonomy theater** — creating client/venture/function structures the founder does not yet need.

## Quality Gate

Setup is done when Claude can answer all of:

- Who is the business for?
- What does the business sell?
- What sounds like the business and what doesn't?
- What matters this week?
- What should Claude load before any work?
- What can Claude do automatically?
- What requires founder approval?
- Where does the team's shared truth live (Notion, Drive, Slack, etc.)?
- What operating model the workspace is using, and how to reconfigure it later?

If any answer is "I don't know" or "TBD", setup is not done — re-open the matching wizard section.
