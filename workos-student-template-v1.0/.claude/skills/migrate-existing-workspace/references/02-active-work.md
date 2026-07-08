# 02 · Active Work Migration

**Goal:** Scaffold `02-areas/`, `03-projects/`, and `90-lab/` with **only** the work that is currently active — but account for *every* source work folder so nothing is silently left behind. Leave zombies in source as archive references.

**Audit signals:** `work_items` (the complete, itemized worklist — one row per area/project/lab/membership folder, with `recent_activity_30d` / `recent_activity_90d`, `file_count`, `has_overview`); `para_dirs` for container-level recency; `top_level`; founder mentions.

## Why this step under-migrates on big workspaces (read first)

The failure mode this step is built to prevent: surveying the source top-down, scaffolding the few obvious folders, and declaring the migration done while a dozen real folders never got looked at. Two disciplines stop that:

1. **Enumerate before deciding.** `work_items` from the audit is the authoritative list. Every entry must end up with exactly one decision in the coverage ledger below — migrate, link, archive-reference, or ignore. A folder you didn't mention is a bug, not a default.
2. **Fan the deep read out.** On a large source, reading each folder's `_overview.md` + content in the main thread exhausts context and the read goes shallow. Hand the per-folder reading to subagents so judgment stays sharp across all of them.

## Active vs zombie heuristic

A folder is **active** if at least two of these are true:

- Modified in the last 30 days (`recent_activity_30d == true`).
- Contains a non-stale `_overview.md`, `status.md`, or task list pointing at current work.
- The founder mentions it in the current conversation.
- A scheduled run, cron, or recurring workflow targets it.

A folder is **zombie** if any of these are true:

- No edits in 90+ days (`recent_activity_90d == false`) and no founder mention.
- Folder name references a past date (`2024-Q1-launch`, `2025-spring-campaign`) with no current activity.
- Contents are only logs, generated outputs, transcripts.

Default: migrate active, archive-reference zombie, ignore everything in between unless asked.

## Source → target placement

| Source pattern | Target placement |
|---|---|
| `02-areas/<x>/` (ongoing function) | `02-areas/<x>/_overview.md` |
| `01-projects/<x>/`, `03-projects/<x>/` (time-bound) | `03-projects/<x>/_overview.md` |
| `04-membership-items/<x>/` (deliverables) | Owning area or project, plus link to Notion canonical row |
| `02-areas/<x>/apps/`, `90-lab/<x>/`, root `apps/`, prototypes | `90-lab/<x>/_overview.md` |
| `05-context/`, `outputs/`, raw transcripts | Skip (or link from owning project if it's actively being processed) |

## Procedure

### Step A — Build the worklist

Read `work_items` from the audit JSON. If it's empty, the source has no PARA work folders — note that and skip to external pointers. Otherwise this list is your spec: it has N folders and you owe N decisions.

### Step B — Classify every folder (fan out when N ≥ 6)

For **6 or more** work items, do not read them serially in the main thread. The audit already ran in Stage 1; now build the dispatch plan:

```bash
python3 .claude/scripts/workos-skill-tools.py migration-dispatch "<source path>" --batch-size 6
```

`migration-dispatch` batches the worklist and emits one ready-to-send prompt per batch. Fan out one **research-reviewer** subagent per batch in a single message (parallel), `model: sonnet`. Each subagent reads its folders **read-only** and returns a JSON decision per folder (`class`, `target_path`, `carry_context`, `provenance`, `evidence`, `confidence`). Aggregate all batches.

For **fewer than 6** items, classify them inline — same per-folder decision shape, no subagents needed.

Use the active-vs-zombie heuristic above to sanity-check each subagent verdict; you own the final call.

### Step C — Coverage ledger (the anti-drop check)

Before creating anything, build a ledger with one row per `work_items` entry and its class. **Assert the counts reconcile:** number of decisions == `work_item_count`, one decision per folder.

**Normalize paths before matching.** Subagents sometimes echo a folder as an absolute path even when asked for the relative one. Strip the source-root prefix from every returned `source_path` before comparing against `work_items` — otherwise identical folders look like a "missing" + an "extra" and the check falsely fails. Match on the relative path only.

If, after normalization, any folder is missing a decision, go back and classify it. This is the single check that makes a big-workspace migration thorough — surface the reconciled ledger to the founder.

### Step D — Materialize decisions

For each folder classed **active-area / active-project / lab-app**:

1. Search existing target areas/projects/labs. If a match exists, **update**; do not duplicate.
2. Use `new-area`, `new-project`, or the `workos-skill-tools.py new-area|new-project --write` helper to scaffold `_overview.md` with required fields: `status`, `owner`, `claude_role`, `last_updated`, `## Purpose`, `## Load First`, `## Housekeeping`, `## Archive Criteria`.
3. **Copy the working files into the new home.** A migration is a *move*, not an index — the founder must be able to operate from the new workspace and shut the old one. Copy the source folder's actual working content into the new `02-areas/<x>/` / `03-projects/<x>/` / `90-lab/<x>/`, **preserving its internal subfolder layout**. An `_overview.md` alone is not a migration.
   - **Do copy:** drafts, content, research docs, notes, assets/images, data the work needs, and the folder's own subfolders of working material.
   - **Skip the debt (don't drag it across):** `.git/`, `node_modules/`, `.venv/`, `__pycache__/`, `dist/`, `build/`, `.next/`, `*.log`, `logs/`, generated-output dumps (`outputs/`), caches, and `_notion.md` mirror stubs.
   - A clean way to do it — copy everything except the debt, preserving structure:
     ```bash
     rsync -a \
       --exclude='.git' --exclude='node_modules' --exclude='.venv' --exclude='__pycache__' \
       --exclude='dist' --exclude='build' --exclude='.next' \
       --exclude='*.log' --exclude='logs/' --exclude='outputs/' --exclude='_notion.md' \
       "<source>/02-areas/<x>/" "02-areas/<x>/"
     ```
   - If the subagent's `carry_context` flagged a sub-area as raw transcript dumps or stale, exclude that path too. When unsure, copy it — a spare draft is cheap; a missing one breaks the seamless transition.
4. **Make `_overview.md` the entry point on top of the copied files.** Write its `## Load First` to point at the **key copied files now in the new home**, not at the old workspace. Still record the source path once for provenance:
   > Migrated from `/Users/.../old-workspace/02-areas/sales/` on 2026-MM-DD. Working files copied; raw history/junk left in source.
5. If the source had a Notion mirror file (`_notion.md`), surface the Notion URL as the canonical row link in `_overview.md` (see [`07-external-pointers.md`](07-external-pointers.md)). Do not copy the mirror content — that's the one local file that stays a link.

For **external-link / archive-reference / ignore** folders: no scaffold — they appear in the ledger and the migration report with their reason, and the founder can see exactly what stayed behind and why.

## Bulk creation gate (replaces the old 3-folder cap)

Thoroughness is about complete *classification*, not auto-creating everything unattended. So:

- **Classify all N folders** regardless of count — never cap, defer, or drop the worklist.
- **Confirm once before bulk creation.** When the ledger calls for creating more than ~5 areas/projects/labs, show the founder the full ledger ("18 folders → scaffold 11 active, link 2, archive-reference 5") and get one approval, then create them all. One confirmation for the batch — not one per folder, and not "pick 5, defer the rest."
- Only genuinely ambiguous active-vs-archive folders (subagent `confidence: low`) need a per-folder check.

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"create-area|create-project|create-lab","path_before":"<source rel path>","path_after":"02-areas/<slug>/_overview.md","reason":"<short>","reversal":"rm -rf <path_after>"}
```

For zombies that become archive-references:

```json
{"timestamp":"<ISO>","class":"green","actor":"migrate-existing-workspace","action":"archive-reference","path_before":"<source rel path>","path_after":null,"reason":"no activity in 90d","reversal":"manual re-evaluation"}
```

## Verification

- The coverage ledger has one row per `work_items` entry — decisions count == `work_item_count`. Nothing dropped.
- Every new `_overview.md` has all required frontmatter fields and section headers.
- No zombie folder was migrated as active; no active folder was silently skipped.
- **Each active folder's working files were copied into the new home** (its subfolder layout preserved), not just an `_overview.md`. Debt classes (deps, caches, logs, generated output, `_notion.md`) were excluded.
- `_overview.md` `## Load First` points at the copied files in the new home, not back at the source.
- Bulk creation happened under a single founder confirmation, not a 3-folder cap.
- All migrated folders record a source path for provenance.
