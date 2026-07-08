---
name: cleanup-workos
description: Full WorkOS housekeeping sweep — file placement, stale overviews, duplicate brain facts, rule/skill drift, app promotion, and archive candidates. Use whenever the user says "cleanup", "tidy up", "audit the workspace", "things feel messy", "what's stale", "run the doctor", or asks to promote a lab app or archive old work — even if they don't say "cleanup".
---

# Cleanup WorkOS

Use this for active housekeeping. Passive housekeeping also happens during normal work when Green or Yellow fixes are obvious.

This is the Alfred maintenance loop. Its job is to remove workspace entropy without creating risk.

## Role In Skill System

`cleanup-workos` is the recurring self-maintenance skill. It keeps the OS alive after real work makes a mess.

It should:

- Clear obvious clutter.
- Keep canonical context fresh.
- Improve weak rules and skills.
- Archive stale work.
- Promote durable apps and dashboards.
- Surface only meaningful Red decisions to the founder.

## Canonical Inputs

- `CLAUDE.md`
- `.claude/rules/`
- `.claude/skills/`
- `00-brain/`
- `01-inbox/`
- `02-areas/`
- `03-projects/`
- `90-lab/`
- `99-archive/`
- `00-brain/audit/workos-audit.jsonl`
- `.claude/scripts/workos-doctor.py`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/cleanup-workos/scripts/cleanup_plan.py`
- `.claude/skills/cleanup-workos/scripts/atomicity_plan.py`
- `.claude/skills/work-map/scripts/build_work_map.py`
- `00-brain/canonical-concepts.md`

## Sweep Areas

- `01-inbox/` for unsorted files.
- `90-lab/` for stale experiments and promotable apps.
- `02-areas/` and `03-projects/` for missing `_overview.md` files.
- `00-brain/` for duplicate facts.
- `.claude/rules/` for vague, stale, contradictory, or overbroad rules.
- `.claude/skills/` for repeated workflows that should be improved.
- Broken internal links.
- Work-map relationship warnings: active projects missing `primary_area`, broken area links, and nested project folders inside areas.
- Root folder for stray files or `outputs/` dumps.
- Archive for original-path preservation.
- Auto memory candidates and stale relative dates in brain/current state.
- `workos-doctor` findings for placement, overview completeness, stale dates, broken links, audit schema, rule frontmatter, and symlink health.

## Actions

- Green: do automatically and log.
- Yellow: do automatically, log, and summarize.
- Red: ask first.

Never delete. Archive to `99-archive/` with the original path preserved.

## Workflow

1. Read `00-brain/workos-principles.md`.
2. Run `python3 .claude/skills/cleanup-workos/scripts/cleanup_plan.py` first.
3. Use the JSON output as the cleanup queue. Fix Green findings automatically, fix Yellow findings automatically when obvious, and ask for Red findings.
4. Run `python3 .claude/scripts/workos-doctor.py` directly when you need the full Markdown report. Treat exit code `0` as clean, `1` as warnings, and `2` as Red/security or required-structure problems.
5. Run a root-level scan for stray files, ignored secrets, and unexpected folders.
6. Process `01-inbox/` using the same logic as `process-inbox`.
7. Check every area/project/lab folder for `_overview.md`.
8. Check whether `_overview.md` files have owner, status, purpose, load-first context, active work/next action, housekeeping, and archive criteria.
9. Run the **Atomicity Audit** (see below) to catch paraphrased restatements the doctor's regex misses.
10. Consolidate duplicate facts into the canonical source when Green or Yellow.
11. Search for stale markers: `TBD`, old `last_updated`, broken links, empty folders, and completed work still marked active.
12. Review skills for repeated context copying, missing outputs, missing verification, missing human checkpoints, or overlap.
13. Review rules for drift, contradiction, vagueness, missing path-rule frontmatter, or behaviors that belong in skills.
14. Promote lab apps when durability criteria are met.
15. Archive stale scratch and completed inactive work.
16. Capture durable operating lessons into rules, skills, brain, or Claude memory as appropriate.
17. Run `python3 .claude/skills/work-map/scripts/build_work_map.py --json` when area/project relationship warnings appear or the founder asks for a current map.
18. Regenerate `00-brain/workspace-index.md` only when setup, reconfiguration, or cleanup changed the map, or when the founder asks for the generated file.
19. Run `workos-doctor` again when fixes were made.
20. Log every meaningful action.
21. Produce a cleanup report with Doctor Summary, Done, Yellow Summary, Red Decisions, and Suggested Next Improvements.

## Atomicity Audit

The `workos-doctor.py` restatement check is regex-only — it catches verbatim concept-name mentions without a link, but misses paraphrased restatements (different words, same behavior). The atomicity audit fills that gap using two cheap Haiku subagents, scoped to recently-changed files.

Design:

- **2 subagents, not 25.** One per sub-folder: `rules-and-constitution` (`.claude/rules/` + `AGENTS.md` + `CLAUDE.md`) and `brain` (`00-brain/` + integrations). Each subagent reads `00-brain/canonical-concepts.md` once, then scans its scoped files for restatements of any registered concept.
- **7-day mtime filter.** Only files modified within the window get scanned. Unchanged files won't produce new findings — we'd just be re-paying for the same paraphrases.
- **Haiku, not Opus/Sonnet.** Paraphrase detection is a pattern-matching task. Haiku handles it.
- **Weekly auto-run via routine** (see Scheduled Runs below). Manual triggers also work.

When to run:

- Weekly via the scheduled routine.
- Manually when the user says "audit atomicity", "check for duplicate rules", or after large rule/brain edits.
- As part of a full cleanup sweep (step 9 above).
- Skip if `atomicity_plan.py` returns `scope_count: 0` (no files changed in window).

How to run:

1. `python3 .claude/skills/cleanup-workos/scripts/atomicity_plan.py [--window-days N]` — outputs JSON with one dispatch entry per sub-folder. Default window is 7 days.
2. If `scope_count: 0`, exit — nothing to audit. Otherwise, in **one message**, fan out parallel `Agent` calls — one per dispatch entry:
   - `subagent_type: "research-reviewer"`
   - `model: "haiku"`
   - `prompt: <entry.prompt>` verbatim from the plan
   - `description`: short, e.g. `"Atomicity: <scope>"`
3. Aggregate JSON findings. Each finding: `{target_file, section_heading, restated_text, canonical_concept, canonical_home, suggested_fix}`.
4. Present the queue grouped by concept. Apply Green edits automatically (replace restated passages with a link to the canonical home). Ask before Yellow edits that change behavior meaning.
5. Log an `atomicity-audit` audit entry with `window_days`, `scope_count`, finding count, and which files were edited.

## Scheduled Runs (optional)

For an unattended weekly tidy, schedule this skill via the Claude scheduled-tasks MCP. Suggested cadence: weekly, off-hours.

- **Create:** `mcp__scheduled-tasks__create_scheduled_task` with a cron like `0 22 * * 0` (Sunday 22:00 local) and a self-contained prompt that invokes this skill. The prompt must include reversibility guardrails: apply Green automatically, apply obvious Yellow with logging, **never apply Red unattended** (security, publishing, deletion, strategy ambiguity).
- **Manage:** `mcp__scheduled-tasks__list_scheduled_tasks` to inspect; `update_scheduled_task` with `enabled: false` to pause.
- **Caveat:** the task fires only when the Claude app is open at the scheduled time, or at next launch if the app was closed.

## Skill And Rule Maintenance

When updating skills or rules:

- Prefer editing an existing file over creating a new one.
- Preserve canonical inputs.
- Add verification and audit behavior.
- Avoid giant skills.
- Keep agent behavior in rules and repeatable workflows in skills.
- If the change affects broad behavior, summarize it clearly.

## App Promotion Criteria

Promote a lab app when:

- It has been used more than once.
- It has a real business function.
- It has an owner.
- It has or needs maintenance.
- Leaving it in `90-lab/` would make it harder to find.

Promotion destinations:

- Area-owned durable tool: `02-areas/<area>/apps/<app-slug>/`
- Project-specific tool: `03-projects/<project>/apps/<app-slug>/`

## Memory Store / Inject / Recall

- **Store:** Stable operating preferences, repeated founder corrections, and durable housekeeping patterns should be saved through Claude's built-in memory when appropriate.
- **Inject:** Canonical business facts stay in `00-brain/`; workflow changes stay in `.claude/skills/`; behavioral changes stay in `.claude/rules/`.
- **Recall:** Before changing context, check existing files and audit logs so cleanup does not undo a deliberate prior decision.

## Human Checkpoints

Ask before:

- Deleting anything.
- Editing `.env`.
- Changing `security.md`.
- Publishing, sending, deploying, pushing, spending money, or writing to external systems.
- Archiving active strategic work.
- Resolving ambiguous canonical conflicts that affect strategy, customers, offers, or commitments.

Proceed automatically when:

- A move is obvious and reversible.
- A duplicate fact can be replaced with a canonical link.
- An overview file is missing and the owner/location is obvious.
- A stale scratch file can be archived without losing durable context.
- A non-security rule or skill clearly needs a small improvement.

## Report Format

```md
# Cleanup Report

## Doctor Summary

- Initial status:
- Final status:
- Remaining warnings/errors:

## Done Automatically

| Class | Action | Path | Reason | Reversal |
|---|---|---|---|---|

## Yellow Summary

- Change:
- Why:
- Reversal:

## Red Decisions Needed

- Decision:
- Risk:
- Recommended default:

## System Improvements Suggested

- Rule/skill:
- Pattern observed:
- Proposed change:
```

## Housekeeping

This skill *is* the housekeeping skill, but it has its own self-maintenance discipline:

- Refresh `last_updated` on every `_overview.md` and brain file touched.
- After consolidating duplicate facts, ensure the canonical source is linked from every former home.
- After archiving, preserve the original path under `99-archive/<original-top-level>/<old-path>/`.
- After promoting a lab app to an area/project, update both the lab's `_overview.md` (note the promotion) and the destination's.
- Do not hand-maintain area backlink tables after ordinary turns. Use `/work-map` for generated relationship views.

## Audit

Every meaningful housekeeping action gets a JSONL audit entry.

For reversible changes, include a reversal path or command. For rule/skill edits, note why the improvement belongs there.

## Failure Modes

- **Over-cleaning:** Do not archive active work just because it looks messy.
- **Silent strategy:** Do not resolve important business conflicts without asking.
- **Rule bloat:** If behavior is procedural, make or update a skill.
- **Skill sprawl:** If a workflow differs only by domain context, update canonical inputs instead of cloning the skill.
- **Archive black hole:** Preserve original paths and explain why something moved.
- **Memory junk:** Store durable preferences, not raw session noise.

## Verification

- No unexplained root clutter.
- `01-inbox/` is empty or intentionally blocked.
- Areas/projects/lab apps have `_overview.md`.
- `python3 .claude/skills/cleanup-workos/scripts/cleanup_plan.py` ran and findings were fixed or explained.
- `workos-doctor` has been run and remaining warnings/errors are explained.
- Duplicate facts were consolidated or flagged.
- Skills and rules still point to canonical sources.
- No secrets were exposed.
- Audit log entries exist.
- Yellow actions are summarized.
- Red decisions are clear and minimal.

## Quality Gate

The cleanup is successful when the founder has fewer decisions, Claude has better context, and no irreversible action happened silently.
