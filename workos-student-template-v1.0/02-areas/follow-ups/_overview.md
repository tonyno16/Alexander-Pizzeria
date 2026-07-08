---
status: active
owner: System
container_type: area
area_type: function
claude_role: registry-and-runner
last_updated: 2026-07-08
---

# Follow-Ups

## Purpose

Local registry of pending follow-up checks. One cron (08:00 + 15:00 local) walks [tasklist.md](tasklist.md), executes any check whose `due` has passed, archives done tasks, and surfaces blockers. Replaces ad-hoc "remember to check this later" with structured registry.

Contract and behavior: [`.claude/rules/follow-ups.md`](../../.claude/rules/follow-ups.md).

## Load First

- [tasklist.md](tasklist.md) — current pending checks
- [log.md](log.md) — recent runner output
- [`.claude/rules/follow-ups.md`](../../.claude/rules/follow-ups.md) — contract
- [`.claude/skills/follow-up-runner/SKILL.md`](../../.claude/skills/follow-up-runner/SKILL.md) — what the runner does
- [`.claude/skills/check-later/SKILL.md`](../../.claude/skills/check-later/SKILL.md) — how follow-ups get created

## Housekeeping

- Done tasks → move deep file to `99-archive/02-areas/follow-ups/tasks/<id>.md` + drop row from `tasklist.md`.
- Blocked tasks → leave row, set `Status: blocked`, set deep file frontmatter `status: blocked`.
- Orphan rows (row without deep file) → flagged in `log.md`, left for human.

## Archive Criteria

Never archive this area itself — it is the live registry. Only individual tasks archive.

## Scheduled Task

Creato il 2026-07-08 durante `/setup-workos` via scheduled-tasks MCP:
- Task ID: `workos-follow-up-runner` (gestibile dalla sezione "Scheduled" dell'app)
- Cron: `0 8,15 * * *` (08:00 e 15:00 locali, jitter ~5 min)
- Calls: `/follow-up-runner`
- Working directory: root di questo workspace.

Il task gira solo quando l'app Claude è aperta; se era chiusa all'orario previsto, parte al prossimo avvio.
