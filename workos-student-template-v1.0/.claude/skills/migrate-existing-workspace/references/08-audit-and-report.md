# 08 · Audit Report and Manual-Reset List

**Goal:** Write a single migration report at `00-brain/audit/migration-<YYYY-MM-DD>.md`, append structured audit entries to `00-brain/audit/workos-audit.jsonl`, and produce a clear "must do manually" list for the founder.

**Cadence — write early, append as you go (do NOT save it for the end):** A long migration can stop before a single final write, which is how a run finishes with no report at all. So the report is a living file from Stage 1 onward:

1. **Right after the Stage 1 audit**, create `00-brain/audit/migration-<YYYY-MM-DD>.md` from the template below and seed the `Active Work Migrated` table with **every `work_items` entry as a `pending` row** — that seeded table *is* the coverage ledger.
2. **As each category task completes, append its rows/sections immediately** — flip the relevant `pending` rows to their decision, fill the skill/MCP/memory/etc. sections. Never batch this for the end.
3. **The final task only finalizes** (Doctor Summary + founder summary). If the run truncates earlier, a partial-but-real report still exists with everything decided so far.

A run that reaches the end with no report file, or with `pending` rows never resolved, is a failed migration — the report is the proof of coverage, not a closing formality.

## Report file

Path: `00-brain/audit/migration-<YYYY-MM-DD>.md`

Template:

```md
# Workspace Migration Report — <YYYY-MM-DD>

## Source

- Path:
- Instruction files found:
- Structure observed:
- Auto-memory path:

## Migrated To Brain

| Source | Destination (00-brain/) | Action | Reason |
|---|---|---|---|

## Active Work Migrated

| Class | Source | Destination | Reason |
|---|---|---|---|

## Skill Decisions

| Source Skill | Decision | Target | Reason |
|---|---|---|---|

## Rule Decisions

| Source Rule | Decision | Target | Reason |
|---|---|---|---|

## Hook & Script Decisions

| Source | Decision | Target | Reason |
|---|---|---|---|

## MCP Servers

| Server | Action | Target Config | Re-establish In `.env` |
|---|---|---|---|

## Memory Migration

| Source Entry | Type | Destination | Notes |
|---|---|---|---|

## External Links

| Source | Linked From | Why Link Only |
|---|---|---|

## Skipped / Ignored

| Source | Reason |
|---|---|

## Red Decisions Pending Founder

| Decision | Risk | Recommended Default |
|---|---|---|

## Must Re-Establish Manually

- **Secrets in `.env`** (list every key the founder must populate):
- **OAuth / MCP credentials**:
- **External system access checks** (Notion, Drive, etc.):
- **Auto-memory entries** (if not auto-applied):
- **Hooks awaiting approval**:

## Doctor Summary

- Errors:
- Warnings:
- Next cleanup:
```

## Audit JSONL

Path: `00-brain/audit/workos-audit.jsonl`

Schema (one JSON object per line, no trailing comma):

```json
{
  "timestamp": "2026-05-25T14:00:00Z",
  "class": "green|yellow|red",
  "actor": "migrate-existing-workspace",
  "action": "extract-brain|create-area|create-project|create-lab|archive-reference|port-skill|merge-skill|rewrite-skill|split-skill|port-rule|merge-rule|port-hook|add-mcp-server|add-env-template-key|defer-secret|port-memory|extract-memory-to-brain|merge-constitution|add-external-link|skip-mirror|...",
  "path_before": "<source rel path or null>",
  "path_after": "<target rel path or null>",
  "reason": "<short — why this action>",
  "reversal": "<how to undo — git revert / rm / manual>"
}
```

Red decisions and conflicts that defer to the founder get `class:"red"` and `action:"deferred"`. They must still appear in the JSONL, with `path_after:null`.

## Linking from current-state

After writing the report, edit `00-brain/current-state.md` to add (under a `## Recent Migration` section, creating it if needed). Format:

```
## Recent Migration

- <YYYY-MM-DD>: Migrated from <source path>. See audit/migration-<YYYY-MM-DD>.md.
```

The link target is the report file written above. Use a relative markdown link from `00-brain/current-state.md` to `00-brain/audit/migration-<YYYY-MM-DD>.md`.

Update the `last_updated` frontmatter on `current-state.md` to today's date.

## Founder-facing summary

After writing the report and JSONL, output a short chat summary to the founder. Format:

```
Migration complete.

In WorkOS now:
- <N> brain fields populated
- <N> areas, <N> projects, <N> lab apps created
- <N> skills ported, <N> merged, <N> archived
- <N> MCP servers added (config shape only)

Linked back to source (not copied):
- Notion: <N>
- Drive: <N>
- Other: <N>

You must re-establish manually:
- <N> secrets in .env (see report § Must Re-Establish Manually)
- <N> OAuth / MCP credentials
- <count> conflicts waiting on your decision

Report: 00-brain/audit/migration-<date>.md
Doctor: <clean | N warnings>
```

Keep it scannable. The founder reads this on mobile.

## Verification

- Report exists at `00-brain/audit/migration-<YYYY-MM-DD>.md`.
- Report's "Must Re-Establish Manually" section is non-empty unless source genuinely had no secrets / MCPs / OAuth / memory.
- `00-brain/audit/workos-audit.jsonl` has one entry per Green/Yellow action and per Red deferral.
- `00-brain/current-state.md` links to the report and has fresh `last_updated`.
- `workos-doctor` reports clean (or remaining warnings are documented in the report).
- Founder-facing summary was sent to chat.
