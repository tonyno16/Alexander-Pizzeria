# 06 · Memory and Constitution Docs Migration

**Goal:** Transplant useful Claude Code auto-memory entries into the target's memory path, and merge source `CLAUDE.md` / `AGENTS.md` posture into target rules and `00-brain/founder-profile.md` — without overwriting the target's constitution.

**Audit signals:** `auto_memory_path`, `auto_memory_exists`, `instruction_files`.

## Auto-memory migration

Auto-memory lives at `~/.claude-gael/projects/<slug>/memory/`. The audit gives you the source path. The target slug is derived the same way from the target workspace path.

### Procedure

1. If `auto_memory_exists == false` → no auto-memory to migrate. Skip to the constitution docs section.
2. Read source `MEMORY.md` index. It's the canonical list of memory entries.
3. For each entry (read the individual `*.md` file):
   - **Durable business fact** (offer, customer segment, voice rule) → extract to the matching `00-brain/` file (handoff to [`01-business-context.md`](01-business-context.md)). Do **not** copy as memory.
   - **Recurring operating preference** (style, defaults, autonomy stance, corrections) → re-write into target auto-memory. Keep the structure: frontmatter, **Why**, **How to apply**, links to other entries.
   - **Stale / one-off / personal-task / contradicted** → ignore.
4. If the founder agreed, write the cleaned-up entries to the target memory path. Otherwise, list them in the migration report's "Memory Migration" table and let the founder re-establish through normal workspace use.
5. Always rewrite frontmatter `name:` to kebab-case if it isn't already; verify the entry meets the WorkOS memory shape (slug, description, type).

### What NOT to migrate as memory

- Anything that belongs in `00-brain/` (durable business truth).
- Secrets, API keys, customer PII.
- Task-specific corrections that only mattered in one moment.
- Memory entries about workspace structure (they describe an old workspace — they will mislead in the new one).

## Constitution docs (`CLAUDE.md`, `AGENTS.md`)

**Hard rule:** never overwrite the target's `CLAUDE.md` or `AGENTS.md`. The target constitution is canonical for WorkOS posture.

### Procedure

1. Read source `CLAUDE.md` and `AGENTS.md` (one read each — they're usually <500 lines).
2. Identify three classes of content in source:
   - **Workspace-wide operating posture** (autonomy, tone, decision rules) → merge into target `00-brain/founder-profile.md` if it describes founder preference, or into target `.claude/rules/core.md` if it's general WorkOS posture.
   - **Path-specific behavior** → consider as a candidate rule (handoff to [`04-rules-hooks-scripts.md`](04-rules-hooks-scripts.md)).
   - **Business facts** → extract to `00-brain/` (handoff to [`01-business-context.md`](01-business-context.md)).
3. Once content is merged into the right canonical homes, link source `CLAUDE.md` / `AGENTS.md` from `99-archive/` for provenance. Do not edit the target constitution unless the founder explicitly approves a constitution change.

## `GEMINI.md` and other agent docs

Treat similarly: extract durable claims, link the source for provenance, do not overwrite target equivalents.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"port-memory|extract-memory-to-brain","path_before":"<source memory file>","path_after":"<target memory file or 00-brain/*.md>","reason":"<short>","reversal":"rm <path_after>"}

{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"merge-constitution","path_before":"<source CLAUDE.md or AGENTS.md>","path_after":"00-brain/founder-profile.md or .claude/rules/*.md","reason":"<which posture rule>","reversal":"git revert"}
```

## Verification

- Target `CLAUDE.md` and `AGENTS.md` are untouched (unless founder explicitly approved).
- Every ported memory entry has WorkOS-shape frontmatter.
- Durable business facts went to `00-brain/`, not memory.
- No secrets, PII, or task-specific corrections were migrated as memory.
- The migration report lists every memory decision.
