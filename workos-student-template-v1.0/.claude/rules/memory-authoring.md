---
paths:
  - ".claude/skills/workos-reflect/**"
  - ".claude/skills/consolidate-memory/**"
---

# Memory Authoring

How to write Claude auto-memory entries so they stay useful, atomic, and cheap to recall. The memory *model* (Store / Inject / Recall) is canonical in [`workos-principles.md § Store, Inject, Recall`](../../00-brain/workos-principles.md#4-store-inject-recall); this rule is the *writing discipline*. Loads when working in the memory skills; also linked from [workos-reflect](../skills/workos-reflect/SKILL.md) and the end-of-turn capture nudge.

The harness owns the memory file format (frontmatter `name` / `description` / `metadata`, plus the `MEMORY.md` index). Do not invent a schema; follow the auto-memory instructions in the system prompt. This rule governs *what* to write and *whether* to write it.

## Behavior

- **Search before write.** Before adding a memory, scan existing entries (the `MEMORY.md` index and topic files) for one that already covers it. Update that file instead of stacking a near-duplicate. This is the primary defense against memory bloat — catching it at write time is far cheaper than consolidating later.
- **Declarative, not imperative.** Write facts about the user and the work, not commands to yourself. "User prefers concise replies" ✓ — "Always reply concisely" ✗. Imperative notes get re-read as standing directives in later sessions and can override the user's current request.
- **One fact per file.** Each memory holds a single durable idea, named for it. Aggregating unrelated facts makes them impossible to retire individually.
- **Stale-in-a-week → not a memory.** If a fact will be wrong or irrelevant within a week, it does not belong in memory. No task progress, PR/issue numbers, "done X", file counts, or one-off debug state. Those are episodic — leave them in the transcript/audit log.
- **Route by lifespan.** Durable business facts → `00-brain/`. Durable, general operating preferences → memory. Repeatable procedures → skills. Behavior rules → `.claude/rules/`. Episodic "what happened" → audit log, not memory.
- **Freshness comes from mtime, not a date field.** The harness does not write dates into memory frontmatter, so do not add one. A memory's file modification time is its "last confirmed" signal; consolidation re-validates entries whose mtime is old.

## When To Use

- Whenever the home for a captured lesson is Claude memory (typically via [workos-reflect](../skills/workos-reflect/SKILL.md)).
- During [consolidate-memory](../skills/consolidate-memory/SKILL.md) runs, to judge whether an entry still earns its place.

## Do Not

- Save a near-duplicate of an existing memory instead of updating it.
- Write imperative self-instructions ("always", "never", "from now on") as memory facts.
- Pack multiple unrelated facts into one memory file.
- Store anything that will be stale within a week.
- Add a date field to memory frontmatter — mtime already carries it.

## Verification

- The new/updated memory has no near-duplicate already in the store.
- The entry reads as a declarative fact, not a command.
- It will still be true and useful next week.
- The `MEMORY.md` index has a one-line pointer to it.
