# 07 · External Pointers Migration

**Goal:** Replace local mirrors of external systems (Notion, Drive, Slack, CRM, GitHub) with links + short summaries in the owning `_overview.md`. Never copy external content as local truth.

**Audit signals:** `notion_mirror_files`, plus any URLs you find while reading source `CLAUDE.md` / `AGENTS.md` / `_overview.md` files.

## Why link, never copy

External systems are the source of truth for human-facing collaboration (Notion, Drive, Slack). Local mirror folders go stale within hours of being created, then mislead Claude into operating on outdated information.

## Source patterns to look for

- `_notion.md` files (one per area/project — sync markers from a previous Notion mirror).
- Folders like `circle-content/`, `helpscout-export/`, `slack-archive/` (exports from external tools).
- Top-of-file Notion URLs in `_overview.md` files (e.g., `Notion: https://www.notion.so/...`).
- Drive links in agent-docs or root README.
- Slack channel references.

## Procedure

For each detected external pointer:

1. Identify the **canonical URL** (Notion page, Drive folder, Slack channel, CRM record).
2. Identify the **owning area/project/lab** in target WorkOS. Create it via [`02-active-work.md`](02-active-work.md) if not already created.
3. Add the link to that `_overview.md` under a `## Canonical Links` section (create the section if missing):
   ```md
   ## Canonical Links

   - Notion area page: <URL>
   - Drive folder: <URL>
   - Slack channel: #<name>
   ```
4. If a short execution summary is useful (e.g., "Notion holds the customer list — query before creating new rows"), add it under the link. Keep it under 3 lines.
5. Do **not** copy the contents of the external system locally.
6. If the source had a Notion mirror folder (`_notion.md` or worse, a tree of synced files) — leave it in source. Add a single archive-reference entry to the migration report.

## Access verification

Many external links break after a migration (revoked tokens, deleted shares, lost OAuth). For each high-value link:

- Note in the report whether the founder still has access. Don't test access automatically — that may write to external systems. Ask the founder to confirm.

## Audit entries

```json
{"timestamp":"<ISO>","class":"green","actor":"migrate-existing-workspace","action":"add-external-link","path_before":"<source mirror or URL location>","path_after":"02-areas/<x>/_overview.md","reason":"<which external system>","reversal":"remove line from _overview.md"}

{"timestamp":"<ISO>","class":"green","actor":"migrate-existing-workspace","action":"skip-mirror","path_before":"<source mirror folder>","path_after":null,"reason":"mirror — linked instead","reversal":"n/a"}
```

## Verification

- No Notion / Drive / Slack mirror folder was copied into target.
- Every active area/project that depended on an external system has the canonical link in its `_overview.md`.
- The migration report's "External Links" table lists every pointer migrated.
- The report's "Must Re-Establish Manually" section lists any links the founder must re-test for access.
