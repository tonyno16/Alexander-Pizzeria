---
name: migrate-existing-workspace
description: Audit and migrate an existing Claude/Codex/Cursor/local workspace into Claude WorkOS without recreating old folder debt. Use whenever the user mentions migrating, importing, porting, or moving from a previous workspace, PARA setup, basic-memory folder, old Notion mirror, agent-docs library, `.claude/` or `.agents/` config, MCP setup, auto-memory, or legacy Claude/Codex/Cursor folder — even if they don't say "migrate". Also trigger on "I already have a workspace", "help me move my old setup", "import my old folders", "bring my old skills/memory/context across", or when a founder points at a source path and asks to start fresh in WorkOS.
---

# Migrate Existing Workspace

Use this when a founder already has a Claude/Codex/Cursor/local workspace and wants to move into WorkOS without dragging old structure along.

This is an orchestrator skill. It audits the source read-only, then drives a checklist of atomic migration steps — one per category. Each step has its own reference doc with the procedure, decision matrix, and audit fields for that category. Load reference docs **just in time**, not all at once.

## Role In Skill System

`migrate-existing-workspace` is the import sibling of `setup-workos`. Setup builds a fresh WorkOS from interviews; migrate seeds it from an existing workspace.

It should:

- Audit the source workspace read-only.
- Drive a TaskCreate checklist with one task per migration category.
- For each category, load the matching reference doc and execute that procedure.
- Surface what cannot be migrated automatically (secrets, auto memory, OAuth, MCP keys) so the founder can re-establish them.
- Run `workos-doctor` after migration and report findings.
- Classify the source operating model before moving active work: single-business, client-work, multi-venture, or mixed.

## Canonical Inputs

**Target workspace (this WorkOS):**

- `00-brain/` (current canonical state — for duplicate/gap detection).
- `.claude/rules/file-placement.md`, `context-routing.md`, `rule-management.md`, `security.md`, `skill-authoring.md`.
- `.claude/scripts/workos-doctor.py`
- `.claude/scripts/workos-skill-tools.py`
- `.claude/skills/migrate-existing-workspace/scripts/migration_audit.py`
- `.claude/skills/migrate-existing-workspace/references/*.md` — per-category procedures, loaded on demand.

**Source workspace (provided by user, read-only):**

- Root: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `README.md`.
- `.claude/`, `.agents/`, `.codex/`, `.cursor/` folders.
- `.mcp.json`, `.mcp.json.example` (server names only — never values).
- `.env.example` (keys only — never `.env`).
- Knowledge folders: `.basic-memory/`, `brain/`, `context/`, `knowledge/`, `agent-docs/`, `03-resources/`, `05-context/`.
- PARA folders: `01-projects/`, `02-areas/`, `03-resources/`, `04-membership-items/`, `01-inbox/`, `99-archive/`.
- Auto-memory: `~/.claude-gael/projects/<source-slug>/memory/` (derived by audit).

## Safety Defaults

These apply to every phase. Per-category specifics live in the reference docs.

- Treat the source workspace as **read-only** unless the founder explicitly approves edits.
- **Secrets:** distinguish *echoing* from *copying*.
  - **Never echo, paste, summarize, or hash secret values** into chat, the migration report, audit log entries, brain files, or any committed file. Refer to secrets by key name only (`NOTION_API_TOKEN`) — never by value.
  - **Copying secrets between the founder's own gitignored files is expected and Yellow.** Source `.env` → target `.env`, source `.mcp.json` → target `.mcp.json`. Confirm once with the founder before the secrets phase, do the copy, log structurally (key count and names, never values). Confirm the target `.gitignore` covers `.env` before copying.
  - **Never put secret values** in `.env.example`, `settings.json`, brain files, the migration report, audit JSONL, or any file under version control.
- Do not recreate old folder structures (PARA numbering, `_notion.md` mirror trees, `outputs/` UUID dumps).
- Do not mirror nested PARA/client workspaces wholesale. Map durable client/venture context to `02-areas/`; map finish-line work to root `03-projects/` with `primary_area`.
- Skip dependency folders (`node_modules/`, `.venv/`, `dist/`, `build/`, `__pycache__/`, `.next/`), caches, run logs, generated outputs.
- **Migrate the files, not just an index.** For every area/project/lab classed *active*, copy its working files (drafts, research, assets, sub-structure) into the new home — a migration is a move that lets the founder shut the old workspace, not an `_overview.md` that points back at it. The skip list above is about leaving *debt* behind, not about leaving the founder with an empty overview. Procedure: [`references/02-active-work.md`](references/02-active-work.md) Step D.
- **Search before write**: before creating any `_overview.md` or `00-brain/` file, search existing canonical homes first. Update an existing match instead of duplicating.
- Ask before migrating sensitive customer data, broad active-work sets, or anything that conflicts with current brain truth.

## Classification

Every piece of source material falls into exactly one class. The migration report shows every decision.

`brain-truth` · `active-area` · `active-project` · `lab-app` · `workflow-skill` · `rule` · `hook` · `mcp-server` · `external-link` · `memory-preference` · `agent-doc` · `archive-reference` · `ignore`

Full definitions and which reference doc owns each: see [`references/00-classification.md`](references/00-classification.md).

## Workflow

The migration runs in three stages: audit → drive checklist → verify. Stages 1 and 3 are scripted. Stage 2 is where the per-category reference docs do the work.

### Stage 1 — Audit (one command)

```bash
python3 .claude/skills/migrate-existing-workspace/scripts/migration_audit.py "<source path>"
```

The JSON output includes `instruction_files`, `top_level`, `skill_files`, `rule_files`, `hook_files`, `script_files`, `command_files`, `mcp_servers`, `env_template_keys`, `knowledge_dirs`, `para_dirs` (container-level recency), `work_items` + `work_item_count` (the **itemized worklist** — one row per area/project/lab/membership folder, each with recency, file count, and `has_overview`), `notion_mirror_files`, `auto_memory_path`, `auto_memory_exists`, `red_flags`, and a `categories_detected` boolean summary.

Use `categories_detected` to decide which checklist items to create. Do not skip the audit — it is the single source of structural truth.

**Then immediately create the report skeleton** at `00-brain/audit/migration-<YYYY-MM-DD>.md`, seeding its Active Work table with every `work_items` entry as a `pending` row (per [`references/08-audit-and-report.md`](references/08-audit-and-report.md)). The report is built **incrementally from here on** and finalized in Stage 3 — never written in one pass at the end, because long migrations truncate before a final write.

### Stage 2 — Drive the checklist

Use the **TaskCreate** tool to add one task per category the audit detected. Process them **one at a time**. For each task: load its reference doc → execute the procedure → log audit entries → mark the task complete → move to the next.

Default task list (skip a task only if `categories_detected[...]` is false):

1. **Business context** → [`references/01-business-context.md`](references/01-business-context.md) *(includes a required brain-expansion scan — propose new `00-brain/<topic>.md` files for durable topics, don't just fill the 7 stubs)*
2. **Active work (areas / projects / lab apps)** → [`references/02-active-work.md`](references/02-active-work.md) *(uses `work_items` as a complete worklist and `migration-dispatch` to fan the per-folder read across subagents — this is what keeps big workspaces from being under-migrated)*
3. **Skills** → [`references/03-skills.md`](references/03-skills.md) *(the founder's automations — port them 1:1 by default and fix connections so they still run; consolidation is opt-in, only on explicit request)*
4. **Rules, hooks, scripts, and slash commands** → [`references/04-rules-hooks-scripts.md`](references/04-rules-hooks-scripts.md) *(commands are muscle memory — port 1:1 by default; offer skill-conversion only if the founder wants it)*
5. **MCP servers, `.env`, and `.env.example`** → [`references/05-mcps-and-secrets.md`](references/05-mcps-and-secrets.md) *(includes a one-shot founder confirmation to copy keys + MCP config across, so the new workspace boots with working integrations)*
6. **Memory and constitution docs** → [`references/06-memory-and-docs.md`](references/06-memory-and-docs.md)
7. **External pointers (Notion, Drive, Slack, CRM, GitHub)** → [`references/07-external-pointers.md`](references/07-external-pointers.md)
8. **Audit report + manual-reset list** → [`references/08-audit-and-report.md`](references/08-audit-and-report.md)

Do not load all reference docs upfront. Each is self-contained — load on demand when its task starts.

### Stage 3 — Verify

1. Run `python3 .claude/scripts/workos-doctor.py`. Resolve errors; document remaining warnings.
2. **Coverage check:** every `work_items` entry appears in the report's ledger with exactly one decision (migrated / linked / archived / ignored) — **no `pending` rows left**. Decisions count == `work_item_count`. A folder still `pending` or absent means the migration is incomplete — go back.
3. **Finalize** the migration report (created in Stage 1, appended throughout): add the Doctor Summary and confirm `00-brain/audit/migration-<YYYY-MM-DD>.md` exists and is complete.
4. Confirm `00-brain/current-state.md` links to it.
5. Confirm `00-brain/audit/workos-audit.jsonl` has entries for meaningful migrations.
6. Tell the founder what's now in WorkOS, what's linked back to source, what they must re-establish manually (secrets, MCP keys, OAuth, any memory entries not auto-applied), and what conflicts still need decisions.

## Failure Modes

- **Mirror migration** — copying Notion/Drive mirror folders into WorkOS as local truth.
- **Nested PARA migration** — recreating old client/workspace/project trees instead of flattening into areas plus root projects.
- **Workspace archaeology** — spending an hour cataloging dead folders. Cap exploration per category.
- **Zombie projects** — migrating stale work because files exist on disk.
- **Worklist drop (the big-workspace failure)** — surveying the source top-down, scaffolding the obvious few, and stopping while real folders never got classified. The `work_items` worklist + coverage ledger exist to prevent exactly this; never cap or defer the worklist.
- **Index, not migration** — creating an `_overview.md` for an active area/project but leaving its working files in the source. The founder gets a pointer to the old workspace instead of one they can operate from. Active folders carry their working files across — see [`references/02-active-work.md`](references/02-active-work.md) Step D.
- **Secret leakage** — echoing, pasting, summarizing, or hashing secret values into chat, the migration report, audit log, brain files, `.env.example`, or any committed file. (Copying values between the founder's own gitignored `.env` files is *not* leakage — that's the expected migration path.)
- **Refusing to migrate working integrations** — skipping the `.env` and `.mcp.json` copy because secrets are involved, leaving the founder to re-paste every key from a password manager. The one-shot confirmation in [`references/05-mcps-and-secrets.md`](references/05-mcps-and-secrets.md) covers this — use it.
- **Skill loss** — consolidating, merging, rewriting, or dropping the founder's skills/commands without asking. The default is a 1:1 port with connections fixed; consolidation is opt-in. A silently-dropped automation is a broken promise.
- **Thin brain** — stopping at the seven default `00-brain/` stubs when the source carries durable topics (a product line, a methodology, a channel playbook) that each deserve their own canonical file. Expand the brain to match what the source actually contains.
- **Duplicate truth** — copying the same fact into brain, area, and project files.
- **Committed secrets** — letting a value land in `.env.example`, `settings.json`, the migration report, audit JSONL, or anywhere git tracks. Always values to `.env`; key names everywhere else.
- **CLAUDE.md clobber** — overwriting the target's constitution with the source's.
- **Memory bloat** — copying every source auto-memory entry without filtering.
- **Hidden hook execution** — porting a source hook that quietly hits a network or writes outside the workspace.
- **Atomicity break** — handling multiple categories in one task. One category per todo, every time.

## Quality Gate

Migration is successful when the founder can shut the source workspace tomorrow and operate fully from WorkOS — with their durable business context in `00-brain/`, their active work scaffolded under `02-areas/` / `03-projects/` / `90-lab/`, their useful skills/rules/hooks/MCPs ported (and secrets re-established), and their old workspace standing as a labeled archive reference instead of a parallel reality.
