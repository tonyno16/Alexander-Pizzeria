---
name: workos-reflect
description: Lightweight WorkOS capture pass — decides what durable residue from recent work should survive and routes it to its canonical home. Use when the user says "capture this", "remember this", "make this reusable", "reflect", "what should we save"; when the end-of-turn hook flags that several turns passed without a capture; or proactively, on your own judgment, whenever a turn surfaced new business info, useful context from a document/transcript/URL you read, a project or area that visibly progressed, or a correction worth encoding. Routes to brain, overview, skill, rule, memory, or audit — or intentionally saves nothing.
---

# WorkOS Reflect

Capture the useful residue of work without turning every session into housekeeping. Stay light: load only what you need, write 1-3 things, stop.

The default answer can be "nothing to save." Silence is cheaper than a polluted WorkOS. But don't hide behind it — if something durable was shared, read, decided, or built this turn, catching it is your job, not the user's.

## Be Proactive

Do not wait for "capture this." After any turn that shared context or did approved work, scan for knowledge that just went stale somewhere in the WorkOS:

- **New business knowledge** surfaced in conversation — a customer fact, an offer/pricing detail, a competitor move, a process the business follows.
- **Context from a document, transcript, page, or dataset you read** that would sharpen the brain — extract the durable fact, note its source, leave the raw input behind.
- **A project or area visibly progressed** — a milestone hit, a decision made, a status change, a deliverable shipped → the owning `_overview.md` is now behind.
- **A correction to how a skill behaves**, or a workflow that repeated → the skill should learn it.
- **A new durable behavior rule** emerged, or an existing rule proved too vague.
- **A durable, general operating preference** the user stated or demonstrated.

The framing: *"I just learned or did something — does the brain, an overview, a skill, or a rule need to catch up?"*

## What To Inspect

Load only what is relevant to what actually changed:

- Recent changed files from `git status --short`.
- What you read or were shown this turn (documents, transcripts, URLs, query results).
- Recent audit entries from `00-brain/audit/workos-audit.jsonl`.
- The owning `_overview.md` for touched area/project/lab work.
- `.claude/rules/rule-management.md` when behavior changed; `.claude/rules/skill-authoring.md` when a repeatable workflow changed; `00-brain/workos-principles.md` when system structure changed.

## Routing Decision

For each candidate lesson, choose one home:

| Signal | Home |
|---|---|
| Durable business / customer / offer / competitor / voice fact | `00-brain/` (the canonical brain file) |
| Durable fact extracted from a document, transcript, or URL read this turn | `00-brain/` — record the fact and its source, not the raw input |
| A project or area progressed (status, decision, milestone, next action) | nearest `_overview.md` — bump status and `last_updated` |
| Durable, general operating preference | Claude memory, if it will still matter next week |
| Repeatable procedure, or a correction to how a skill behaves | existing skill first; new skill only if no owner |
| Broad behavior rule, or a vague rule that needs sharpening | existing `.claude/rules/` file first |
| One-off task detail, ephemeral progress, anything stale in a week | nowhere |
| Risk or future idea | `00-brain/workos-improvement-inventory.md` or owning overview |

## Workflow

1. Identify what changed, what you read, or what the user asked to capture.
2. Decide whether the signal is durable, reusable, and likely to help a future session. Stale-in-a-week → skip.
3. Search before writing — prefer updating an existing home over creating a new one:
   - `rg "<keyword>" 00-brain/ .claude/rules/ .claude/skills/`
4. Apply Green/Yellow updates when obvious and reversible.
5. Ask before Red changes: security, strategy, external systems, deletion, publishing, money, secrets, or a new `00-brain/` file.
6. Add or update an audit entry for meaningful WorkOS changes.
7. Report only what was saved and what was intentionally ignored.

## Memory Writing Discipline

When the home is Claude memory, follow [`.claude/rules/memory-authoring.md`](../../rules/memory-authoring.md): search before write, declarative not imperative, one fact per file, stale-in-a-week stays out.

## Small Nudge Standard

Do not run a full cleanup sweep. If the task smells like broad housekeeping (file placement, dedup across many files, archive candidates), hand off to `/cleanup-workos`. If memory itself needs gardening, that is `/consolidate-memory`, not this skill.

Use this skill for 1-3 concrete lessons. If there are more, write a queue in `00-brain/workos-improvement-inventory.md` and stop.

## Output

```md
Reflection:
- Saved:
- Updated:
- Ignored:
- Needs decision:
```

Keep it short. The artifact matters more than the ceremony.

## Verification

- Every saved lesson has one canonical home.
- No task progress or stale session trivia was saved as memory.
- Existing skills/rules were searched before new ones were created.
- No Red action happened unattended.
