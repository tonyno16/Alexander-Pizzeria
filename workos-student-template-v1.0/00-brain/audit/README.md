# Audit Log

`workos-audit.jsonl` records automatic housekeeping and system changes.

The JSONL file is local-only and ignored by git. This README is the committed contract; the first Claude Code Stop hook or skill run creates the local log.

The hook writer is `.claude/scripts/audit-log.sh`.

The UserPromptSubmit repeatability nudge is `.claude/scripts/prompt-repeatability-nudge.py`. It injects skill-maintenance context when the prompt implies "next time", "from now on", a repeatable workflow, or feedback on a skill output.

The compact-continuity injector is `.claude/scripts/compact-continuity.py`. It runs only on `SessionStart` with the `compact` matcher and reminds Claude to reconstruct live state from WorkOS files after context compaction.

The script keeps only the most recent 1,000 entries to prevent local logs from becoming context bloat.

Each line should be JSON:

```json
{"timestamp":"2026-05-24T12:00:00Z","class":"Green","actor":"Claude","action":"move_file","paths":["01-inbox/example.md","03-projects/example/research/example.md"],"reason":"Research belongs to active project.","reversal":"Move file back to 01-inbox/example.md","source":"process-inbox"}
```

Required keys: `timestamp`, `class`, `actor`, `action`, `reason`, and `reversal`.

Recommended keys: `paths`, `source`, `cwd`, and `session_id` when available.

## Log These

- Green file moves, renames, link fixes, duplicate consolidation, missing overview creation.
- Yellow skill/rule updates, folder restructures, archive moves, canonical source changes.
- Red actions that require approval.
- Rule updates.
- Skill updates.
- Brain canonical changes.
- Archive actions.
- Blocked Red actions.
- Doctor findings that led to automatic fixes.

## Do Not Log

- Secrets.
- Raw customer data.
- Full private message contents.
- Large pasted source material.

## Examples

Rule update:

```json
{"timestamp":"2026-05-24T12:10:00Z","class":"Yellow","actor":"Claude","action":"update_rule","paths":[".claude/rules/context-routing.md"],"reason":"Added stale-context handling after repeated old-date confusion.","reversal":"Use git diff to revert this hunk.","source":"rule-management"}
```

Skill update:

```json
{"timestamp":"2026-05-24T12:20:00Z","class":"Yellow","actor":"Claude","action":"update_skill","paths":[".claude/skills/process-inbox/SKILL.md"],"reason":"Added destination recipes after repeated inbox routing ambiguity.","reversal":"Use git diff to revert this hunk.","source":"rule-management"}
```

Archive action:

```json
{"timestamp":"2026-05-24T12:30:00Z","class":"Green","actor":"Claude","action":"archive","paths":["90-lab/old-test","99-archive/90-lab/old-test"],"reason":"Stale lab scratch with no active owner.","reversal":"Move folder back to 90-lab/old-test.","source":"cleanup-workos"}
```

Audit logs are for reversibility, not performative bureaucracy.
